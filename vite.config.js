import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Checker from "vite-plugin-checker";


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Checker({ typescript: true }),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
    extensions: [".mjs", ".js", ".ts", ".jsx", ".tsx", ".json", ".vue", ".svg"],
  },
  esbuild: {
    loader: "ts",
    include: /\.ts?$/,
    exclude: /node_modules/,
  },
  optimizeDeps: {
    esbuildOptions: {
      loader: {
        ".js": "jsx",
      },
    },
  },
  css: {
    loaderOptions: {
        sass: {
            data: `@import "@/assets/variables.scss";`,
        },
    },
  },
})


