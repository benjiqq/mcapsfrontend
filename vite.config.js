import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React app
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
    proxy: {
      // Proxy API calls to backend server
      '/snapshots': 'http://localhost:8000',
      '/coins': 'http://localhost:8000',
      '/assets': 'http://localhost:8000',
      '/chat': 'http://localhost:8000',
      '/analyze': 'http://localhost:8000',
      '/health': 'http://localhost:8000'
    },
    // Configure proxy to handle /assets/count properly
    define: {
      'process.env': {}
    }
  }
})

