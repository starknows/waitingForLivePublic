import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { join, parse, resolve } from "path";

function entryPoints(...paths) {
  const entries = paths.map(parse).map(entry => {
    const { dir, base, name, ext } = entry;
    const key = join(dir, name);
    const path = resolve(__dirname, dir, base);
    return [key, path];
  });

  const config = Object.fromEntries(entries);
  return config;
}
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      input: entryPoints(
        "index.html",
        "404.html",
      ),
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://service.starknows.tw",
        changeOrigin: true,
      },
      "/auth": {
        target: "http://service.starknows.tw",
        changeOrigin: true,
      }
    },
  },
  plugins: [
    vue(),
  ],
  esbuild: {
    pure: ["console.log"],
    minify: true,
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})
