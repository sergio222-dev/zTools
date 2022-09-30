import {defineConfig, loadEnv, UserConfigExport} from "vite";
import handlebars from "vite-plugin-handlebars";

// @ts-ignore
export default defineConfig(({mode}) => {
  const env = loadEnv(mode, process.cwd());

  // @ts-ignore
  const config: UserConfigExport = {
    base: './',
    server: {
      port: 9000,
    },
    build: {
      rollupOptions: {
        input: {
          index: './index.html',
          'root-config': './src/SpAuto-root-config.ts',
        },
        output: {
          format: "system",
          entryFileNames: '[name].js',
          assetFileNames: 'assets/[name][ext]',
          globals: {
            'single-spa': 'singleSpa'
          }
        },
        preserveEntrySignatures: "strict",
        external: ['single-spa']
      }
    },
    plugins: [
      // @ts-ignore
      handlebars({
        context: {
          isLocal: mode === 'development'
        }
      })
    ]
  };

  return config;

});
