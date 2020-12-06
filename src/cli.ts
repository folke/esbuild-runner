import Module from "module"
import path from "path"
import "./register"
import fs from "fs"

process.argv.splice(1, 1)
if (process.argv.length > 1 && fs.existsSync(process.argv[1])) {
  process.argv[1] = path.resolve(process.argv[1])
  Module.runMain()
} else {
  console.log("Usage: esn file [params]")
  // eslint-disable-next-line no-process-exit
  process.exit(1)
}
