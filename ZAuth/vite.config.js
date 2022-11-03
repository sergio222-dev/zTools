import {defineConfig} from "vite";
import {resolve} from "path";
import dynamicImport from 'vite-plugin-dynamic-import'


export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'lib/main.ts'),
      name: 'ZAuth',
      filename: 'zauth',
      formats: ["es"],
    },
    emptyOutDir: true,
    rollupOptions: {},
  },
  plugins: [
    dynamicImport(),
  ]
});
