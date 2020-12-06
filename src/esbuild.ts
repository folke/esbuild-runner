import { buildSync, Loader, transformSync } from "esbuild"
import fs from "fs"
import path from "path"
import { PackageJson } from "type-fest"

export type TranspileOptions =
  | { bundle: true; cache: false }
  | { bundle: false; cache: boolean }

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
  // ".js": "js",
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
    loader: loaders[path.extname(filename)],
    format: "cjs",
    logLevel: "error",
    target: [`node${process.version.slice(1)}`],
    minify: false,
    sourcemap: true,
    sourcefile: filename,
  })
  return ret.code
}

function _bundle(code: string, filename: string): string {
  const ext = path.extname(filename)
  return buildSync({
    loader: loaders,
    bundle: true,
    platform: "node",
    logLevel: "error",
    stdin: {
      sourcefile: filename,
      contents: code,
      resolveDir: path.dirname(filename),
      loader: loaders[ext],
    },
    external: externals,
    format: "cjs",
    target: [`node${process.version.slice(1)}`],
    minify: false,
    sourcemap: true,
    write: false,
  })
    .outputFiles.map((f) => f.text)
    .join("\n")
}

function _transpile(code: string, filename: string, options: TranspileOptions) {
  return options.bundle ? _bundle(code, filename) : _transform(code, filename)
}

export function transpile(
  code: string,
  filename: string,
  options: TranspileOptions = { cache: false, bundle: true }
): string {
  if (options.cache) {
    const compiledPath = path.resolve(
      ".",
      ".build",
      path.relative(path.resolve("."), filename)
    )
    if (
      !fs.existsSync(compiledPath) ||
      fs.statSync(compiledPath).mtime < fs.statSync(filename).mtime
    ) {
      code = _transpile(code, filename, options)
      const compiledDir = path.dirname(compiledPath)
      if (!fs.existsSync(compiledDir))
        fs.mkdirSync(compiledDir, { recursive: true })
      fs.writeFileSync(compiledPath, code, { encoding: "utf-8" })
      return code
    }
    return fs.readFileSync(compiledPath, { encoding: "utf-8" })
  } else {
    return _transpile(code, filename, options)
  }
}
