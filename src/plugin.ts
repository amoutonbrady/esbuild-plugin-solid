import { parse } from "path";
import { Plugin } from "esbuild";
import { readFile } from "fs/promises";
import { transformAsync } from "@babel/core";

const JSX_RE = /<.+?>/gim;

export function solidPlugin(): Plugin {
  return {
    name: "esbuild:solid",

    setup(build) {
      build.onLoad({ filter: /\.(t|j)sx?$/ }, async (args) => {
        const source = await readFile(args.path, { encoding: "utf-8" });
        const isJsx = JSX_RE.test(source);

        if (!isJsx) return { contents: source, loader: "js" };
        const { name, ext } = parse(args.path);
        const filename = name + ext;

        const { code } = await transformAsync(source, {
          presets: ["solid", "@babel/preset-typescript"],
          filename,
          sourceMaps: "inline",
        });

        return { contents: code, loader: "js" };
      });
    },
  };
}
