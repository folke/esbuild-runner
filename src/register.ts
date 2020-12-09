import { install as installSourceMapSupport } from "source-map-support"
import { install } from "./hook"

installSourceMapSupport({ hookRequire: true })
install()
