# :zap: es-node

Super-fast on-the-fly transpilation of modern JS, TypeScript and JSX using [esbuild](https://github.com/evanw/esbuild).

**es-node** makes it easy to run arbitrary code or tests without needing to **build** your whole project. It's a great way to improve your development.

## ✨ Usage

The easiest way to use `es-node` is to install it globally and use the included `esn` binary.

```shell
$ esn hello-world.ts
```

Alternatively, you can *require* **es-node** within any nodejs process to include realtime transpilation:

```shell
$ node -r es-node/register hello-world.ts
```

In order to use **es-node** with Jest, you need to configure a [Jest transform](https://jestjs.io/docs/en/configuration.html#transform-objectstring-pathtotransformer--pathtotransformer-object) in your `jest.config.js`

```js
module.exports = {
  transform: {
    "\\.ts$": "es-node/jest",
  },
}
```

## 📦 Installation

Simply install the **es-node** npm package using your favorite package manager.

* globally ...
  
```shell
$ npm install -g es-node
```

* ... or locally in your project
  
```shell
$ npm add es-node
```

## 👋 Contributing

Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

## ⚖ License

[Apache 2.0](https://github.com/folke/es-node/blob/master/LICENSE)

<!-- markdownlint-disable-file MD014 MD033 -->
