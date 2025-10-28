import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Vite configuration for React app
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Proxy API calls to backend server
      '/snapshots': 'http://localhost:8080',
      '/coins': 'http://localhost:8080',
      '/assets': 'http://localhost:8080',
      '/chat': 'http://localhost:8080',
      '/analyze': 'http://localhost:8080',
      '/health': 'http://localhost:8080',
      '/x': 'http://localhost:8080',
      '/watchlist': 'http://localhost:8080'
    },
    // Configure proxy to handle /assets/count properly
    define: {
      'process.env': {}
    }
  }
})

