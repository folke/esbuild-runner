# :zap: Esbuild Runner (`esr`)

Super-fast on-the-fly transpilation of modern JS, TypeScript and JSX using [esbuild](https://github.com/evanw/esbuild).

**esr** makes it easy to run arbitrary code or tests without needing to **build** your whole project. It's a great way to improve your development workflow.

## ✨ Usage

The easiest way to use **esbuild-runner** is to install it globally and use the included `esr` binary.

```shell
$ esr hello-world.ts
```

Alternatively, you can *require* **esbuild-runner** within any nodejs process to include realtime transpilation:

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

## 📦 Installation

Simply install the **esbuild-runner** npm package using your favorite package manager.

* globally ...
  
```shell
$ npm install -g esbuild-runner
```

* ... or locally in your project
  
```shell
$ npm add --dev esbuild-runner
```

## 👋 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ⚖ License

[Apache 2.0](https://github.com/folke/esbuild-runner/blob/main/LICENSE)

<!-- markdownlint-disable-file MD014 MD033 -->
