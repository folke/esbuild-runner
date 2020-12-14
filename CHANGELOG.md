### [1.3.2](https://github.com/folke/esbuild-runner/compare/1.3.1...1.3.2) (2020-12-14)


### Bug Fixes

* 🐛 use rmdirSync instead of rmSync for compatibility with older nodejs versions ([a57482a](https://github.com/folke/esbuild-runner/commit/a57482a86345be3adb1f1598828de82261ce08a6))

### [1.3.1](https://github.com/folke/esbuild-runner/compare/1.3.0...1.3.1) (2020-12-09)


### Bug Fixes

* 🐛 show message and exit, after clearing cache ([91aafc0](https://github.com/folke/esbuild-runner/commit/91aafc00b552a7f665f1bce25363c412cf153f92))

## [1.3.0](https://github.com/folke/esbuild-runner/compare/1.2.0...1.3.0) (2020-12-09)


### Features

* ✨ added esbuild transform --cache ([4ca2415](https://github.com/folke/esbuild-runner/commit/4ca241533d52b7a94388293ad26087f6bbfa0c32))
* ✨ added option to use transform with caching instead of bundling to the API ([9345b78](https://github.com/folke/esbuild-runner/commit/9345b7838a9733c6b567aefe34aabf6500597674))
* ✨ enable support for nextjs by transpiling .js files ([5bcc8be](https://github.com/folke/esbuild-runner/commit/5bcc8bef1213f078550701d2c874bc4f37ba7b94))

## [1.2.0](https://github.com/folke/esbuild-runner/compare/1.1.1...1.2.0) (2020-12-09)


### Features

* ✨ added support for source maps ([3435f7e](https://github.com/folke/esbuild-runner/commit/3435f7ea02102da8612ba95d9590f0772d58db4d))

### [1.1.1](https://github.com/folke/esbuild-runner/compare/1.1.0...1.1.1) (2020-12-07)


### Bug Fixes

* 🐛 renamed esn.js to esr.js ([4caeafd](https://github.com/folke/esbuild-runner/commit/4caeafd768f0d88dfb1dda5d5ab5d9076ce7acde))

## 1.1.0 (2020-12-07)


### Features

* ✨ added Jest transform module ([6122523](https://github.com/folke/esbuild-runner/commit/61225232f2c7371afb1dd5aefd38229f14ec2e3a))
* ✨ allow `node -r es-node/register` to automatically transpile source code ([7a05c58](https://github.com/folke/esbuild-runner/commit/7a05c58c033537a8da5c1b00464ea3f6adb50870))
* ✨ initial version 🎉 ([4669746](https://github.com/folke/esbuild-runner/commit/466974606b4b727f54f1fb12adb01573c6e13b16))

