## [2.2.0](https://github.com/folke/esbuild-runner/compare/2.1.0...2.2.0) (2021-06-04)


### Features

* ✨ added support for custom loaders [#24](https://github.com/folke/esbuild-runner/issues/24) ([ad3268e](https://github.com/folke/esbuild-runner/commit/ad3268e1936a350271bfd8706f473f0a8baf1be9))

## [2.1.0](https://github.com/folke/esbuild-runner/compare/2.0.0...2.1.0) (2021-06-01)


### Features

* ✨ allow overriding esbuild.external [#23](https://github.com/folke/esbuild-runner/issues/23) ([801eb20](https://github.com/folke/esbuild-runner/commit/801eb2015f2ba1f4aa4df06ec02308f6b7fab392))

## [2.0.0](https://github.com/folke/esbuild-runner/compare/1.4.0...2.0.0) (2021-05-29)


### ⚠ BREAKING CHANGES

* 💥 ♻️ renamed the config file from esbuild.config.js -> esbuild-runner.config.js

### Code Refactoring

* 💥 ♻️ renamed the config file from esbuild.config.js -> esbuild-runner.config.js ([728518d](https://github.com/folke/esbuild-runner/commit/728518d384389ae59dffb42fb1a41e48cabb12d6))

## [1.4.0](https://github.com/folke/esbuild-runner/compare/1.3.2...1.4.0) (2021-05-26)


### Features

* ✨ added config for passing build / transform options to the api [#14](https://github.com/folke/esbuild-runner/issues/14) ([200447e](https://github.com/folke/esbuild-runner/commit/200447e143d59cb263e2a7e51c10666fd1b05feb))
* ✨ esbuild.config.js [#14](https://github.com/folke/esbuild-runner/issues/14) [#19](https://github.com/folke/esbuild-runner/issues/19) ([9dfb19f](https://github.com/folke/esbuild-runner/commit/9dfb19f8fdead4d56abe4b70fe16bde745fd4d9c))


### Bug Fixes

* 🐛 added esbuild as a peer dependency. Fixes [#16](https://github.com/folke/esbuild-runner/issues/16) ([8656874](https://github.com/folke/esbuild-runner/commit/865687436b3a43c5c175d9c852cfc096c45e2735))

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

