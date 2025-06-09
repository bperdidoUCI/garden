import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 10000, // Change this to your desired port for the frontend
    proxy: {
      '/api': {
        target: 'http://localhost:10000', // Change this to your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
});
