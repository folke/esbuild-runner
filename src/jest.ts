import { transpile } from "./esbuild"
import "./register"

function process(src: string, filename: string) {
  return transpile(src, filename, { type: "transform" })
}

export default { process }
