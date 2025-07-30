import { build } from "esbuild";

build({
  entryPoints: ["main.ts"],
  bundle: true,
  minify: process.env.NODE_ENV === "production",
  sourcemap: process.env.NODE_ENV !== "production",
  outfile: "main.js",
  external: ["obsidian"],
  watch: process.env.NODE_ENV !== "production",
}).catch(() => process.exit(1));
