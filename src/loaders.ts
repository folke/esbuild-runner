import { Loader } from "esbuild"
import path from "path"

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

export function loadersSupport(filename: string) {
  if (filename.includes("node_modules")) return false
  return path.extname(filename) in loaders
}
