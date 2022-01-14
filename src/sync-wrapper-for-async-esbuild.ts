import {
  build,
  BuildOptions,
  CommonOptions,
  Loader,
  transform,
  TransformOptions,
} from "esbuild"
import fs from "fs"
import path from "path"
import tempWrite from "temp-write"
import { PackageJson } from "type-fest"
import { loaders } from "./loaders"
import type { EsbuildOptions } from "./types"
import { loadConfig } from "./utils"

const esbuildCommonOptions: CommonOptions = {
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

transpile()
  // eslint-disable-next-line promise/always-return
  .then((result) => {
    const resultFilename = tempWrite.sync(result)
    // eslint-disable-next-line no-console
    console.log(resultFilename)
    // eslint-disable-next-line no-process-exit
    process.exit()
  })
  .catch((error) => {
    // eslint-disable-next-line no-console
    console.error(error)
    // eslint-disable-next-line no-process-exit
    process.exit(1)
  })

function transpile(): Promise<string> {
  const command = process.argv[2] as "bundle" | "transform"
  const filename = process.argv[3]
  const tempFilename = process.argv[4]
  const code = fs.readFileSync(tempFilename, "utf8")
  const esbuildOptions = loadConfig()?.esbuild
  return command === "bundle"
    ? _bundle(code, filename, esbuildOptions)
    : _transform(code, filename, esbuildOptions)
}

async function _bundle(
  code: string,
  filename: string,
  esbuildOptions?: EsbuildOptions
): Promise<string> {
  const loaders = getLoaders(esbuildOptions)
  const ext = path.extname(filename)
  const { outputFiles } = await build({
    ...esbuildCommonOptions,
    platform: "node",
    ...(esbuildOptions as BuildOptions | undefined),
    loader: loaders,
    bundle: true,
    stdin: {
      sourcefile: filename,
      contents: code,
      resolveDir: path.dirname(filename),
      loader: loaders[ext],
    },
    external: [...externals, ...(esbuildOptions?.external ?? [])],
    write: false,
  })
  return outputFiles.map((f) => f.text).join("\n")
}

async function _transform(
  code: string,
  filename: string,
  esbuildOptions?: EsbuildOptions
): Promise<string> {
  const loaders = getLoaders(esbuildOptions)
  const ret = await transform(code, {
    ...esbuildCommonOptions,
    ...(esbuildOptions as TransformOptions | undefined),
    loader: loaders[path.extname(filename)],
    sourcefile: filename,
  })
  return ret.code
}

function getLoaders(options?: EsbuildOptions) {
  const ret = { ...loaders }
  if (typeof options?.loader == "object") {
    for (const [e, l] of Object.entries(options.loader)) ret[e] = l as Loader
  }
  return ret
}
