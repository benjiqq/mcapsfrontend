import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// Vite configuration for React app
export default defineConfig({
  plugins: [
    react(),
    {
      name: 'app-rewrite',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          if ((req.url.startsWith('/app') || req.url.startsWith('/admin')) && !req.url.includes('.')) {
            req.url = '/app/index.html'
          }
          next()
        })
      }
    }
  ],
  server: {
    port: 5173,
    strictPort: true,
    proxy: {
      // Proxy API calls to backend server
      '/snapshots': 'https://api.mcaps.com',
      '/coins': 'https://api.mcaps.com',
      '/assets': 'https://api.mcaps.com',
      '/chat': 'https://api.mcaps.com',
      '/analyze': 'https://api.mcaps.com',
      '/health': 'https://api.mcaps.com',
      '/x': 'https://api.mcaps.com',
      '/watchlist': 'https://api.mcaps.com',
      '/coingecko': 'https://api.mcaps.com',
      '/coinstats': 'https://api.mcaps.com'
    },
    // Configure proxy to handle /assets/count properly
  },
  define: {
    'process.env': {},
    '__GOOGLE_CLIENT_ID__': JSON.stringify('730685688668-hd4cgfo1cv9a7gii4ao5l2234abm3uvn.apps.googleusercontent.com')
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        // app: resolve(__dirname, 'app/index.html'),
      }
    },
  }
})

