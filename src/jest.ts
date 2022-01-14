import "./register"
import { transpile } from "./transpile"

function process(src: string, filename: string) {
  return transpile(src, filename, { type: "transform" })
}

export default { process }
