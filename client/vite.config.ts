import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
  server: {
    port: 5173,
    open: true,
    proxy: {
      '/api': {
        target: 'http://localhost:10000',
        secure: false,
        changeOrigin: true,
      },
      '/graphql': {
        target: 'http://localhost:10000',
        secure: false,
        changeOrigin: true,
      },
    },
  },
});