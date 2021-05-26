import InternalModule from "module"
import { loaders, transpile, supports, TranspileOptions } from "./esbuild"
import { install as installSourceMapSupport } from "source-map-support"
import fs from "fs"
import path from "path"

type PatchedModule = InternalModule & {
  _extensions: Record<string, (mod: PatchedModule, filename: string) => void>
  _compile: (code: string, filename: string) => unknown
}

const Module = InternalModule as unknown as PatchedModule

export function findUp(name: string, cwd = process.cwd()): string | undefined {
  let up = path.resolve(cwd)
  do {
    cwd = up
    const p = path.resolve(cwd, name)
    if (fs.existsSync(p)) return p
    up = path.resolve(cwd, "..")
  } while (up !== cwd)
}

function loadConfig() {
  const configFile = findUp("esbuild.config.js")
  if (configFile) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, unicorn/prefer-module
      const ret = require(configFile) as TranspileOptions
      return ret
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(`[esbuild-runner] could not load "esbuild.config.js"\n`)
      throw error
    }
  }
}

export function install(options?: Partial<TranspileOptions>) {
  options = { ...loadConfig(), ...options }
  installSourceMapSupport({ hookRequire: true })
  const defaultLoaderJS = Module._extensions[".js"]
  for (const ext in loaders) {
    const defaultLoader = Module._extensions[ext] || defaultLoaderJS

    Module._extensions[ext] = (mod: PatchedModule, filename: string) => {
      if (supports(filename)) {
        const defaultCompile = mod._compile
        mod._compile = (code: string) => {
          mod._compile = defaultCompile
          return mod._compile(transpile(code, filename, options), filename)
        }
      }
      defaultLoader(mod, filename)
    }
  }
}
