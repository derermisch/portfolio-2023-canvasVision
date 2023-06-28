// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vitejs.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })

import { resolve } from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
// import json from "@rollup/plugin-json"

const root = resolve(__dirname, "src")
const outDir = resolve(__dirname, "dist")

// https://vitejs.dev/config/
export default defineConfig({
  root,
  plugins: [react()],
  build: {
    outDir,
    emptyOutDir: true,
    rollupOptions: {
      input: {
        main: resolve(root, "index.html"),
        ballsy: resolve(root, "ballsy.html")
      },
    }
  }
})