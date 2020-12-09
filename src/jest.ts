import { transpile } from "./esbuild"
import "./register"

export function process(src: string, filename: string) {
  return transpile(src, filename, { type: "transform" })
}
