import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google'
import App from './App.jsx'
import { AuthProvider } from './contexts/AuthContext'
import { WatchlistProvider } from './contexts/WatchlistContext'
import { StatsProvider } from './contexts/StatsContext'
import './index.css'

// Google Client ID from client_secret.json
const GOOGLE_CLIENT_ID = '274625475064-19i6t9n82di0k1qkhfhd3bn4vjsgr8o7.apps.googleusercontent.com'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <AuthProvider googleClientId={GOOGLE_CLIENT_ID}>
        <StatsProvider>
          <WatchlistProvider>
            <App />
          </WatchlistProvider>
        </StatsProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  </React.StrictMode>,
)

