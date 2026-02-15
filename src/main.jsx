import React from 'react'
import ReactDOM from 'react-dom/client'
import { PrivyProvider } from '@privy-io/react-auth'
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'

const PRIVY_APP_ID = 'cmlm4c5fl00ha0ci6q96a6l3a'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'apple', 'farcaster'],
        appearance: {
          theme: 'dark',
          accentColor: '#38bdf8',
        },
      }}
    >
      <Router basename="/app">
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </PrivyProvider>
  </React.StrictMode>,
)

