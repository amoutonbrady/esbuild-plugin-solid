import { build } from "esbuild";
import { resolve } from "node:path";

import { solidPlugin } from "..";

const TESTS = resolve("tests");

build({
  platform: "browser",
  bundle: true,
  entryPoints: [resolve(TESTS, "index.tsx")],
  plugins: [solidPlugin()],
  target: "esnext",
  format: "esm",
  outfile: resolve(TESTS, "index.js"),
  minify: process.env.NODE_ENV === "production",
}).catch(() => process.exit(1));

build({
  platform: "node",
  bundle: true,
  entryPoints: [resolve(TESTS, "ssr.tsx")],
  plugins: [solidPlugin({ solid: { generate: "ssr" } })],
  target: "esnext",
  format: "esm",
  outfile: resolve(TESTS, "ssr.js"),
  // external: [
  //   "solid-js",
  //   "solid-js/web"
  // ],
  minify: process.env.NODE_ENV === "production",
}).catch(() => process.exit(1));

build({
  platform: "browser",
  bundle: true,
  entryPoints: [resolve(TESTS, "index.tsx")],
  plugins: [solidPlugin({ solid: { hydratable: true } })],
  target: "esnext",
  format: "esm",
  outfile: resolve(TESTS, "hydratable.js"),
  minify: process.env.NODE_ENV === "production",
}).catch(() => process.exit(1));

build({
  platform: "node",
  bundle: true,
  entryPoints: [resolve(TESTS, "ssr.tsx")],
  plugins: [solidPlugin({ solid: { generate: "ssr", hydratable: true } })],
  target: "esnext",
  format: "esm",
  // external: [
  //   "solid-js",
  //   "solid-js/web"
  // ],
  outfile: resolve(TESTS, "ssr-hydratable.js"),
  minify: process.env.NODE_ENV === "production",
}).catch(() => process.exit(1));
