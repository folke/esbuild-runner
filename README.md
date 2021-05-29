# :zap: Esbuild Runner (`esr`)

Super-fast on-the-fly transpilation of modern JS, TypeScript and JSX using [esbuild](https://github.com/evanw/esbuild).

**esr** makes it easy to run arbitrary code or tests without needing to **build** your whole project. It's a great way to improve your development workflow.

## ✨ Usage

The easiest way to use **esbuild-runner** is to install it globally and use the included `esr` binary.

```shell
$ esr hello-world.ts
```

Alternatively, you can _require_ **esbuild-runner** within any nodejs process to include realtime transpilation:

```shell
$ node -r esbuild-runner/register hello-world.ts
```

In order to use **esbuild-runner** with Jest, you need to configure a [Jest transform](https://jestjs.io/docs/en/configuration.html#transform-objectstring-pathtotransformer--pathtotransformer-object) in your `jest.config.js`

```js
module.exports = {
  transform: {
    "\\.ts$": "esbuild-runner/jest",
  },
}
```

VSCode Debugging

```JSON
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug with esbuild-runner",
      "program": "${workspaceFolder}/hello-world.ts",
      "runtimeArgs": [
        "-r",
        "esbuild-runner/register"
      ],
      "request": "launch",
      "sourceMaps": true,
      "skipFiles": [
        "<node_internals>/**"
      ],
      "type": "pwa-node"
    }
  ]
}
```

## ⚙️ Configuration

`esr` provides two different ways to transpile your code:

- **bundling** _(default)_: this transpiles the script and all its dependencies in typically one invocation of **esbuild**. Dependencies defined in `package.json` or `node_modules` will never be transpiled. Running `esr` will **always** transpile the code. No caching is used.
- **transform** _(`--cache`)_: this method will invoke **esbuild** for **every source file**, but will cache the result. This means that the initial run will be slower, but after that, only changed source files will be transpiled.

```shell
$ bin/esr.js --help
Usage: esr [options] <source-file> [file-options]

  --cache       Transform on a file per file basis and cache code
  --clearCache  Clear transform cache
  --help|-h     Display this help message

```

To customize the options passed to esbuild, you can create an `esbuild-runner.config.js` file in the current directory or one of the ancestor directories.

```js
// example esbuild-runner.config.js
module.exports = {
  type: "bundle", // bundle or transform (see description above)
  esbuild: {
    // Any esbuild build or transform options go here
    target: "esnext",
  },
}
```

## 📦 Installation

Simply install the **esbuild-runner** npm package using your favorite package manager.

- globally ...

```shell
$ npm install -g esbuild-runner
```

- ... or locally in your project

```shell
$ npm add --dev esbuild-runner
```

## 👋 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ⚖ License

[Apache 2.0](https://github.com/folke/esbuild-runner/blob/main/LICENSE)

<!-- markdownlint-disable-file MD014 MD033 -->
