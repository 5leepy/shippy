import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // Target tetap server aslinya
        target: 'https://emsifa.github.io',
        changeOrigin: true,
        // Ini bagian yang salah sebelumnya. Sekarang kita ganti /api dengan path yang benar.
        rewrite: (path) => path.replace(/^\/api/, '/api-wilayah-indonesia/api'),
      },
    }
  }
})