import fs from "fs"
import path from "path"
import type { TranspileOptions } from "./types"

export function loadConfig(): TranspileOptions | undefined {
  const configFile = findUp("esbuild-runner.config.js")
  if (configFile) {
    try {
      // eslint-disable-next-line @typescript-eslint/no-var-requires, unicorn/prefer-module
      const ret = require(configFile) as TranspileOptions
      return ret
    } catch (error) {
      // eslint-disable-next-line no-console
      console.error(
        `[esbuild-runner] could not load "esbuild-runner.config.js"\n`
      )
      throw error
    }
  }
}

function findUp(name: string, cwd = process.cwd()): string | undefined {
  let up = path.resolve(cwd)
  do {
    cwd = up
    const p = path.resolve(cwd, name)
    if (fs.existsSync(p)) return p
    up = path.resolve(cwd, "..")
  } while (up !== cwd)
}
