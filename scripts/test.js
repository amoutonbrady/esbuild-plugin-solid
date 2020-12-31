const { build } = require("esbuild");
const { dirname, resolve } = require("path");
const { solidPlugin } = require("..");

const ROOT = dirname(__dirname);
const TESTS = resolve(ROOT, "tests");

build({
  platform: "browser",
  bundle: true,
  entryPoints: [resolve(TESTS, "index.tsx")],
  plugins: [solidPlugin()],
  target: "esnext",
  format: "esm",
  outfile: resolve(TESTS, "index.js"),
  minify: true,
}).catch(() => process.exit(1));
