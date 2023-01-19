# esbuild-plugin-solid

Plugin to compile [solid-js](https://github.com/ryansolid/solid) jsx components with [esbuild](https://esbuild.github.io/).

/!\ **Disclaimer** /!\

At the time of writing this, `esbuild` is not AS performant in term of dead code elimination as `rollup` is.

Rollup is the preferred way to bundle solid apps as it generally produce smaller code.

In my tests, a hello world :

* `rollup`: 5.95kb
* `esbuild`: 9.65kb

## Install

`solid-js` and `esbuild` are peer dependencies

```bash
# For npm
npm install solid-js
npm install -D esbuild esbuild-plugin-solid

# For pnpm
pnpm add solid-js
pnpm add -D esbuild esbuild-plugin-solid

# For yarn
yarn add solid-js
yarn add -D esbuild esbuild-plugin-solid
```

## Usage

Once installed you need to configure `esbuild` to use this plugin.

```js
const { build } = require('esbuild');
const { solidPlugin } = require('esbuild-plugin-solid');

build({
  entryPoints: ['app.jsx'],
  bundle: true,
  outfile: 'out.js',
  plugins: [solidPlugin()],
}).catch(() => process.exit(1))
```

## Configuration

The following options are available and can be passed to the plugin:

```ts
/** Configuration options for esbuild-plugin-solid */
export interface Options {
  /** The options to use for @babel/preset-typescript @default {} */
  typescript: object
  /**
   * Pass any additional babel transform options. They will be merged with
   * the transformations required by Solid.
   *
   * @default {}
   */
  babel:
    | TransformOptions
    | ((source: string, id: string, ssr: boolean) => TransformOptions)
    | ((source: string, id: string, ssr: boolean) => Promise<TransformOptions>);
  /**
   * Pass any additional [babel-plugin-jsx-dom-expressions](https://github.com/ryansolid/dom-expressions/tree/main/packages/babel-plugin-jsx-dom-expressions#plugin-options).
   * They will be merged with the defaults sets by [babel-preset-solid](https://github.com/solidjs/solid/blob/main/packages/babel-preset-solid/index.js#L8-L25).
   *
   * @default {}
   */
  solid: {
    /**
     * The name of the runtime module to import the methods from.
     *
     * @default "solid-js/web"
     */
    moduleName?: string;

    /**
     * The output mode of the compiler.
     * Can be:
     * - "dom" is standard output
     * - "ssr" is for server side rendering of strings.
     * - "universal" is for using custom renderers from solid-js/universal
     *
     * @default "dom"
     */
    generate?: 'ssr' | 'dom' | 'universal';

    /**
     * Indicate whether the output should contain hydratable markers.
     *
     * @default false
     */
    hydratable?: boolean;

    /**
     * Boolean to indicate whether to enable automatic event delegation on camelCase.
     *
     * @default true
     */
    delegateEvents?: boolean;

    /**
     * Boolean indicates whether smart conditional detection should be used.
     * This optimizes simple boolean expressions and ternaries in JSX.
     *
     * @default true
     */
    wrapConditionals?: boolean;

    /**
     * Boolean indicates whether to set current render context on Custom Elements and slots.
     * Useful for seemless Context API with Web Components.
     *
     * @default true
     */
    contextToCustomElements?: boolean;

    /**
     * Array of Component exports from module, that aren't included by default with the library.
     * This plugin will automatically import them if it comes across them in the JSX.
     *
     * @default ["For","Show","Switch","Match","Suspense","SuspenseList","Portal","Index","Dynamic","ErrorBoundary"]
     */
    builtIns?: string[];
  };
}
```

## How it works

This is a 30 lines of code plugin. All it does is parse every import source code, check if JSX syntax is present using a dumb regex and transforming the file with `@babel/core`, `@babel/preset-typescript` and `babel-preset-solid`.

Out of the box it checks every `/(t|j)sx?/` files and only transforms the one with JSX syntax in it.

## Contributing

This package uses [pnpm](https://pnpm.js.org/) so you might want to install it if you don't have it.

Once done, you can just `pnpm build` & `pnpm test` to build & test your changes.

`pnpm test` [will build](./scripts/test.js) a [dumb module](./tests/index.tsx) with the plugin and open a local web server serving the `tests` folder for you to check if things still work.
