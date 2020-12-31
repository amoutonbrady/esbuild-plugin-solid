const { build } = require("esbuild");
const { dirname, resolve } = require("path");
const del = require("del");

const ROOT = dirname(__dirname);
const SRC = resolve(ROOT, "src");

del([resolve(ROOT, "dist")])
  .then(() => {
    build({
      platform: "node",
      bundle: true,
      entryPoints: [resolve(SRC, "plugin.ts")],
      external: ["@babel/core"],
      target: "esnext",
      outdir: "dist/cjs",
      format: "cjs",
    });

    build({
      platform: "node",
      bundle: true,
      entryPoints: [resolve(SRC, "plugin.ts")],
      external: ["@babel/core"],
      target: "esnext",
      outdir: "dist/esm",
      format: "esm",
    });
  })
  .catch(() => process.exit(1));
