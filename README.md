# esbuild-solid

Plugin to compile solid jsx components with esbuild.

## Install

`solid-js` and `esbuild` are peer dependencies

```bash
# For npm
npm install solid-js
npm install -D esbuild esbuild-solid

# For pnpm
pnpm add solid-js
pnpm add -D esbuild esbuild-solid

# For yarn
yarn add solid-js
yarn add -D esbuild esbuild-solid
```

## Usage

Once installed you need to configure `esbuild` to use this plugin.

```js
const { build } = require('esbuild');
const { solidPlugin } = require('esbuild-solid');

build({
  entryPoints: ['app.jsx'],
  bundle: true,
  outfile: 'out.js',
  plugins: [solidPlugin()],
}).catch(() => process.exit(1))
```

## Configuration

There's no configuration as of now.

## How it works

This is a 30 lines of code plugin. All it does is parse every import source code, check if JSX syntax is present using a dumb regex and transforming the file with `@babel/core`, `@babel/preset-typescript` and `babel-preset-solid`.

Out of the box it checks every `/(t|j)sx?/` files and only transforms the one with JSX syntax in it.

## Contributing

This package uses [pnpm](https://pnpm.js.org/) so you might want to install it if you don't have it.

Once done, you can just `pnpm build` & `pnpm test` to build & test your changes.

`pnpm test` [will build](./scripts/test.js) a [dumb module](./tests/index.tsx) with the plugin and open a local web server serving the `tests` folder for you to check if things still work.