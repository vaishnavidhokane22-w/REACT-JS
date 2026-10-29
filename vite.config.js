import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/dairy': {
        target: 'https://a2zithub.org',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})