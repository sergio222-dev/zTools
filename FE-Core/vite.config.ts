import { defineConfig } from "vite";
import { ViteEjsPlugin } from "vite-plugin-ejs";
import dynamicImport from "vite-plugin-dynamic-import";
import handlebars from "vite-plugin-handlebars";

const path = require("path");

const { parsed } = require("dotenv").config({
  path: path.resolve(__dirname, "./src/.env")
});

// @ts-ignore
export default defineConfig(() => {
  return {
    root: "./src",
    rollupOptions: {
      input: "Ztools-root-config.ts",
      preserveEntrySignatures: "strict"
    },
    server: {
      port: 9000,
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
          "ztools-root-config": "./src/Ztools-root-config.ts"
        },
        preserveEntrySignatures: "strict",
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
          globals: {
            "single-spa": "SingleSpa"
          },
        },
        external: ["single-spa"]
      }
    },
    // resolve: {
    //   fullySpecified: false,
    //   modules: ["node_modules"]
    // },
    define: {
      define: "undefined",
      "global.TYPED_ARRAY_SUPPORT": undefined
    },
    plugins: [
      ViteEjsPlugin(config => ({
        isLocal: config.mode === "development",
        ...parsed
      })),
      handlebars(),
      dynamicImport()
    ]
  };
});