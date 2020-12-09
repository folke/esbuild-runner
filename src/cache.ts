import os from "os"
import fs from "fs"
import path from "path"
import crypto from "crypto"

const tmpPath = path.resolve(os.tmpdir(), "esbuild-runner-cache")
if (!fs.existsSync(tmpPath)) fs.mkdirSync(tmpPath, { recursive: true })

function clear() {
  if (fs.existsSync(tmpPath)) {
    fs.rmSync(tmpPath, { recursive: true, force: true })
    fs.mkdirSync(tmpPath, { recursive: true })
  }
}

function get(filename: string, transpiler: () => string) {
  const hash = crypto
    .createHash("md5")
    .update(path.resolve(filename))
    .digest("hex")

  const compiledPath = path.resolve(tmpPath, `${hash}.js`)
  if (
    !fs.existsSync(compiledPath) ||
    fs.statSync(compiledPath).mtime < fs.statSync(filename).mtime
  ) {
    const code = transpiler()
    fs.writeFileSync(compiledPath, code, { encoding: "utf-8" })
    return code
  }
  return fs.readFileSync(compiledPath, { encoding: "utf-8" })
}

export default { get, clear, tmpPath }
