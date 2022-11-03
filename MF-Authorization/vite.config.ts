import { defineConfig } from 'vite'
import reactRefresh from '@vitejs/plugin-react-refresh'
import dynamicImport from 'vite-plugin-dynamic-import'
import mkcert from'vite-plugin-mkcert'
import { nodeResolve } from '@rollup/plugin-node-resolve';



const path = require('path')
// const { parsed } = require('dotenv').config({
//   path: path.resolve(__dirname, './src/.env'),
// })

export default defineConfig(({ mode }) => {
  const publicAssetsBaseUrl =
    mode === 'production'
      ? process.env.VITE_MF_LOGIN_PROD + '/'
      : 'http://localhost:3001/'

  return {
    root: './src',
    server: {
      port: 3001,
      https: true,
    },
    preview: {
      port: 3001,
    },
    base: publicAssetsBaseUrl,
    // rollupOptions: {
    //   input: 'vite-single-spa-react.ts',
    //   format: 'system',
    //   preserveEntrySignatures: true,
    // },
    resolve: {
      alias: {
        '@organism' : path.resolve(__dirname, './src/app/components/organism'),
        '@styles' : path.resolve(__dirname, './src/app/styles')
      }
    },
    build: {
      outDir: '../dist',
      emptyOutDir: true,
      cssCodeSplit: false,
      manifest: true,
      rollupOptions: {
        input: {
          'ztools-mf-authorization': './src/Ztools-mf-authorization.ts'
        },
        preserveEntrySignatures: "strict",
        output: {
          // name: "ztools-mf-authorization",
          // format: "umd",
          // globals: {
          //   react: "React",
          //   "react-dom": "react-dom",
          //   "single-spa-react": "singleSpaReact",
          // },
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name].[ext]',
          globals: {
            Reflect: "reflect-metadata",
          }
          // preserveModules: true,
        },
        plugins: [
          // externalGlobals({
          //   react: "React",
          //   "react-dom": "ReactDom",
          // }),
          // enable tree shaking
          nodeResolve(),
        ],
        external: ["single-spa-react", "react", "react-dom", "@mui/material"]
      },
    },
    plugins: [
      reactRefresh(),
      // react(),
      dynamicImport(),
      // Create and install CERT for dev env, enable to use https
      // https://github.com/liuweiGL/vite-plugin-mkcert
      mkcert(),
    ],
    assetsInclude: ['**/*.png', '**/*.jpg', '**/*.svg'],
  }
})
