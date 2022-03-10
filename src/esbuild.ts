import {
  buildSync,
  Loader,
  transformSync,
  CommonOptions,
  TransformOptions,
  BuildOptions,
} from "esbuild"
import fs from "fs"
import path from "path"
import { PackageJson } from "type-fest"
import cache from "./cache"

export type TranspileOptions = {
  type: "bundle" | "transform"
  debug: boolean
  esbuild?: CommonOptions & TransformOptions & BuildOptions,
  useCache: boolean,
}
const defaultOptions: TranspileOptions = { type: "bundle", debug: false, useCache: true }

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

function _transform(
  code: string,
  filename: string,
  options: TranspileOptions
): string {
  const loaders = getLoaders(options)
  const ret = transformSync(code, {
    ...commonOptions,
    ...(options.esbuild as TransformOptions | undefined),

    loader: loaders[path.extname(filename)],
    sourcefile: filename,
  })
  return ret.code
}

function getLoaders(options: TranspileOptions) {
  const ret = { ...loaders }
  if (typeof options.esbuild?.loader == "object") {
    for (const [e, l] of Object.entries(options.esbuild.loader))
      ret[e] = l as Loader
  }
  return ret
}

function _bundle(
  code: string,
  filename: string,
  options: TranspileOptions
): string {
  const ext = path.extname(filename)

  const loaders = getLoaders(options)

  return buildSync({
    ...commonOptions,
    platform: "node",
    ...(options.esbuild as BuildOptions | undefined),
    loader: loaders,
    bundle: true,
    stdin: {
      sourcefile: filename,
      contents: code,
      resolveDir: path.dirname(filename),
      loader: loaders[ext],
    },
    external: [...externals, ...(options?.esbuild?.external ?? [])],
    write: false,
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
    // eslint-disable-next-line no-console
    if (options.debug) console.log(`📦 ${filename}`)
    return _bundle(code, filename, options)
  } else if (options.type == "transform") {
    if (options.useCache) {
      return cache.get(filename, () => {
        // eslint-disable-next-line no-console
        if (options.debug) console.log(`📦 ${filename}`)
        return _transform(code, filename, options)
      })
    } else {
      return _transform(code, filename, options)
    }
  }
  throw new Error(`Invalid transpilation option ${options.type}`)
}
