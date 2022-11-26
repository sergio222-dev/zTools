import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
// import react from "@vitejs/plugin-react";
import dynamicImport from "vite-plugin-dynamic-import";
import mkcert from "vite-plugin-mkcert";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import tsConfigPaths from "vite-plugin-tsconfig-paths";

export default defineConfig(() => {
  // const publicAssetsBaseUrl = mode === "production" ? process.env.VITE_MF_LOGIN_PROD + "/" : "http://localhost:3001/";

  return {
    root: "./src",
    server: {
      port: 3001,
      https: true,
    },
    preview: {
      port: 3001,
      https: true,
    },
    build: {
      outDir: "../dist",
      emptyOutDir: true,
      cssCodeSplit: false,
      manifest: true,
      rollupOptions: {
        input: {
          "ztools-mf-authorization": "./src/ztools-mf-authorization.ts",
        },
        preserveEntrySignatures: "strict",
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "assets/[name].[ext]",
          globals: {
            Reflect: "reflect-metadata",
          },
        },
        plugins: [
          // enable tree shaking
          nodeResolve(),
        ],
        external: [
          "single-spa-react",
          "react",
          "react-dom",
          "@emotion/react",
          "@emotion/styled",
          "@mui/material",
          "zauth-utility-module",
        ],
      },
    },
    plugins: [
      reactRefresh(),
      // react(),
      tsConfigPaths(),
      dynamicImport(),
      // Create and install CERT for dev env, enable to use https
      // https://github.com/liuweiGL/vite-plugin-mkcert
      mkcert(),
    ],
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"],
  };
});
