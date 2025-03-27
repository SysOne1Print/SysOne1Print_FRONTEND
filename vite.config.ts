import { fileURLToPath, URL } from 'node:url'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
// https://vitejs.dev/config/
export default defineConfig({
  build: {
    assetsInlineLimit: 0, // Evita inline para arquivos maiores
  },
  plugins: [vue()],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  envDir: './',
  // vue3-quill
  // optimizeDeps: {
  //   include: ['quill']
  // }
})
