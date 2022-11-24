import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
import dynamicImport from "vite-plugin-dynamic-import";
import mkcert from "vite-plugin-mkcert";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import tsConfigPaths from "vite-plugin-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const publicAssetsBaseUrl = mode === "production" ? process.env.VITE_MF_LOGIN_PROD + "/" : "http://localhost:3001/";

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
          "mf-vite-react": "./src/mf-vite-react.ts",
        },
        preserveEntrySignatures: "strict",
        output: {
          entryFileNames: "[name].js",
          assetFileNames: "assets/[hash].[ext]",
          globals: {
            Reflect: "reflect-metadata",
          },
        },
        plugins: [
          nodeResolve(), // enable tree shaking apparently
        ],
        external: ["single-spa-react", "react", "react-dom"],
      },
    },
    plugins: [
      reactRefresh(), // new one is not working, TODO fix this
      tsConfigPaths(),
      dynamicImport(),
      // Create and install CERT for dev env, enable to use https
      // https://github.com/liuweiGL/vite-plugin-mkcert
      mkcert(),
    ],
    assetsInclude: ["**/*.png", "**/*.jpg", "**/*.svg"],
  };
});
