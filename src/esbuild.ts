import { buildSync, Loader, transformSync, CommonOptions } from "esbuild"
import fs from "fs"
import path from "path"
import { PackageJson } from "type-fest"
import cache from "./cache"

export type TranspileOptions = { type: "bundle" | "transform"; debug: boolean }
const defaultOptions: TranspileOptions = { type: "bundle", debug: false }

const commonOptions: CommonOptions = {
  format: "cjs",
  logLevel: "error",
  target: [`node${process.version.slice(1)}`],
  minify: false,
  sourcemap: "inline",
}

const pkgPath = path.resolve(".", "package.json")
let externals: string[] = []
if (fs.existsSync(pkgPath)) {
  const pkg = JSON.parse(
    fs.readFileSync(pkgPath, { encoding: "utf-8" })
  ) as PackageJson
  externals = [
    ...Object.keys(pkg.dependencies ?? {}),
    ...Object.keys(pkg.devDependencies ?? {}),
  ]
}

export const loaders: Record<string, Loader> = {
  ".js": "js",
  ".mjs": "js",
  ".cjs": "js",
  ".jsx": "jsx",
  ".ts": "ts",
  ".tsx": "tsx",
  // ".css": "css",
  ".json": "json",
  // ".txt": "text",
}

export function supports(filename: string) {
  if (filename.includes("node_modules")) return false
  return path.extname(filename) in loaders
}

function _transform(code: string, filename: string): string {
  const ret = transformSync(code, {
    ...commonOptions,
    ...{
      loader: loaders[path.extname(filename)],
      sourcefile: filename,
    },
  })
  return ret.code
}

function _bundle(code: string, filename: string): string {
  const ext = path.extname(filename)
  return buildSync({
    ...commonOptions,
    ...{
      loader: loaders,
      bundle: true,
      platform: "node",
      stdin: {
        sourcefile: filename,
        contents: code,
        resolveDir: path.dirname(filename),
        loader: loaders[ext],
      },
      external: externals,
      write: false,
    },
  })
    .outputFiles.map((f) => f.text)
    .join("\n")
}

export function transpile(
  code: string,
  filename: string,
  _options?: Partial<TranspileOptions>
): string {
  const options: TranspileOptions = { ...defaultOptions, ..._options }
  if (options.type == "bundle") {
    if (options.debug) console.log(`📦 ${filename}`)
    return _bundle(code, filename)
  } else if (options.type == "transform") {
    return cache.get(filename, () => {
      if (options.debug) console.log(`📦 ${filename}`)
      return _transform(code, filename)
    })
  }
  throw new Error(`Invalid transpilation option ${options.type}`)
}
