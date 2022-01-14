import { BuildOptions, CommonOptions, TransformOptions } from "esbuild"

export type EsbuildOptions = CommonOptions & TransformOptions & BuildOptions

export type TranspileOptions = {
  type: "bundle" | "transform"
  debug: boolean
  esbuild?: EsbuildOptions
}
