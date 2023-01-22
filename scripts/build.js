import { build } from "esbuild";
import { resolve } from "path";
import { deleteAsync } from "del";

const SRC = resolve("src");

deleteAsync([resolve("dist")])
  .then(() => {
    build({
      platform: "node",
      bundle: true,
      entryPoints: [resolve(SRC, "plugin.ts")],
      external: [
        "@babel/core",
        "babel-preset-solid",
        "@babel/preset-typescript",
      ],
      target: "es2021",
      outdir: "dist/cjs",
      outExtension: { ".js": ".cjs" },
      format: "cjs",
      sourcemap: true,
    });

    build({
      platform: "node",
      bundle: true,
      entryPoints: [resolve(SRC, "plugin.ts")],
      external: [
        "@babel/core",
        "babel-preset-solid",
        "@babel/preset-typescript",
      ],
      target: "es2021",
      outdir: "dist/esm",
      outExtension: { ".js": ".mjs" },
      format: "esm",
      sourcemap: true,
    });
  })
  .catch(() => process.exit(1));
