import InternalModule from "module"
import { loaders, transpile, supports, TranspileOptions } from "./esbuild"
import { install as installSourceMapSupport } from "source-map-support"

type PatchedModule = InternalModule & {
  _extensions: Record<string, (mod: PatchedModule, filename: string) => void>
  _compile: (code: string, filename: string) => unknown
}

const Module = (InternalModule as unknown) as PatchedModule

export function install(options: TranspileOptions = { type: "bundle" }) {
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
