import {defineConfig} from "vite";
import {resolve} from "path";
import dynamicImport from 'vite-plugin-dynamic-import'


export default defineConfig({
  build: {
    lib: {
      entry: {
        zauth: resolve(__dirname, 'lib/main.ts')
      },
      name: 'ZAuth',
      formats: ["es"],
    },
    emptyOutDir: true,
  },
  plugins: [
    dynamicImport(),
  ]
});
