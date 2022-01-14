import InternalModule from "module"
import { install as installSourceMapSupport } from "source-map-support"
import { loaders, loadersSupport } from "./loaders"
import { transpile } from "./transpile"
import type { TranspileOptions } from "./types"

type PatchedModule = InternalModule & {
  _extensions: Record<string, (mod: PatchedModule, filename: string) => void>
  _compile: (code: string, filename: string) => unknown
}

const Module = InternalModule as unknown as PatchedModule

export function install(transpileOptions?: Partial<TranspileOptions>) {
  installSourceMapSupport({ hookRequire: true })
  const defaultLoaderJS = Module._extensions[".js"]
  for (const ext in loaders) {
    const defaultLoader = Module._extensions[ext] || defaultLoaderJS

    Module._extensions[ext] = (mod: PatchedModule, filename: string) => {
      if (loadersSupport(filename)) {
        const defaultCompile = mod._compile
        mod._compile = (code: string) => {
          mod._compile = defaultCompile
          return mod._compile(
            transpile(code, filename, transpileOptions),
            filename
          )
        }
      }
      defaultLoader(mod, filename)
    }
  }
}
