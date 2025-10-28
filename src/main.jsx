import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { WatchlistProvider } from './contexts/WatchlistContext'
import { StatsProvider } from './contexts/StatsContext'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <StatsProvider>
      <WatchlistProvider>
        <App />
      </WatchlistProvider>
    </StatsProvider>
  </React.StrictMode>,
)

