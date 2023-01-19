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
      target: "esnext",
      outdir: "dist/cjs",
      format: "cjs",
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
      target: "esnext",
      outdir: "dist/esm",
      format: "esm",
    });
  })
  .catch(() => process.exit(1));
