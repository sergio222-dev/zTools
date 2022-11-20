import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import dynamicImport from "vite-plugin-dynamic-import";
import handlebars from "vite-plugin-handlebars";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import mkcert from "vite-plugin-mkcert";

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export default defineConfig(() => {
  return {
    root: "./src",
    rollupOptions: {
      input: "ztools-root-config.ts",
      preserveEntrySignatures: "strict",
    },
    server: {
      port: 9000,
      https: true,
    },
    preview: {
      port: 9000,
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      rollupOptions: {
        input: {
          main: "./src/index.html",
          "ztools-root-config": "./src/ztools-root-config.ts",
        },
        preserveEntrySignatures: "strict",
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
          globals: {
            "single-spa": "SingleSpa",
          },
        },
        external: ["single-spa", "zauth-utility-module"],
        plugins: [
          // enable tree shaking
          nodeResolve(),
        ],
      },
    },
    define: {
      define: "undefined",
      "global.TYPED_ARRAY_SUPPORT": undefined,
    },
    plugins: [
      ViteEjsPlugin(config => ({
        isLocal: config.mode === "development",
        ...process.env,
      })),
      handlebars(),
      dynamicImport(),
      mkcert(),
    ],
  };
});
