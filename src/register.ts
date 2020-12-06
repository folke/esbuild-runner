import InternalModule from "module"
import { loaders, transpile, supports } from "./esbuild"

type PatchedModule = InternalModule & {
  _extensions: Record<string, (mod: PatchedModule, filename: string) => void>
  _compile: (code: string, filename: string) => unknown
}

const Module = (InternalModule as unknown) as PatchedModule

function register() {
  const defaultLoaderJS = Module._extensions[".js"]
  for (const ext in loaders) {
    const defaultLoader = Module._extensions[ext] || defaultLoaderJS

    Module._extensions[ext] = (mod: PatchedModule, filename: string) => {
      if (supports(filename)) {
        // console.log(filename)
        const defaultCompile = mod._compile
        mod._compile = (code: string) => {
          mod._compile = defaultCompile
          return mod._compile(
            transpile(code, filename, { bundle: true, cache: false }),
            filename
          )
        }
      }
      defaultLoader(mod, filename)
    }
  }
}
register()
