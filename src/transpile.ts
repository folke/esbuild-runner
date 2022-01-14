import { spawnSync } from "child_process"
import fs from "fs"
import tempWrite from "temp-write"
import cache from "./cache"
import type { TranspileOptions } from "./types"
import { loadConfig } from "./utils"

const defaultTranspileOptions: TranspileOptions = {
  type: "bundle",
  debug: false,
}

export function transpile(
  code: string,
  filename: string,
  _transpileOptions?: Partial<TranspileOptions>
): string {
  const transpileOptions: TranspileOptions = {
    ...defaultTranspileOptions,
    ...loadConfig(),
    ..._transpileOptions,
  }
  if (transpileOptions.type == "bundle") {
    // eslint-disable-next-line no-console
    if (transpileOptions.debug) console.log(`📦 ${filename}`)
    return transpileSync("bundle", code, filename)
  } else if (transpileOptions.type == "transform") {
    return cache.get(filename, () => {
      // eslint-disable-next-line no-console
      if (transpileOptions.debug) console.log(`📦 ${filename}`)
      return transpileSync("transform", code, filename)
    })
  }
  throw new Error(`Invalid transpilation option ${transpileOptions.type}`)
}

function transpileSync(
  command: "bundle" | "transform",
  code: string,
  filename: string
): string {
  const tempFilename = tempWrite.sync(code)
  const result = spawnSync(
    process.execPath,
    [
      // eslint-disable-next-line unicorn/prefer-module
      `${__dirname}/sync-wrapper-for-async-esbuild.js`,
      command,
      filename,
      tempFilename,
    ],
    {
      cwd: process.cwd(),
    }
  )

  const resultFilename = result.stdout.toString().trim()
  const stderr = result.stderr.toString()

  if (stderr) {
    throw stderr
  }

  return fs.readFileSync(resultFilename, "utf8")
}
