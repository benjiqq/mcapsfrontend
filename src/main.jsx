console.log('Main.jsx is executing');
import React from 'react'
import ReactDOM from 'react-dom/client'
import { GoogleOAuthProvider } from '@react-oauth/google';
import { AuthProvider } from './contexts/AuthContext'
import { BrowserRouter as Router } from 'react-router-dom'
import App from './App.jsx'
import './index.css'



import * as Sentry from "@sentry/react";

Sentry.init({
  dsn: "https://1169712dee45bdf518268e74d9fe5780@o4510899016695808.ingest.de.sentry.io/4510899018203216",
  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true
});

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* <PrivyProvider
      appId={PRIVY_APP_ID}
      config={{
        loginMethods: ['email', 'wallet', 'google', 'apple', 'farcaster'],
        appearance: {
          theme: 'dark',
          accentColor: '#38bdf8',
        },
      }}
    > */}
    <GoogleOAuthProvider clientId="274625475064-19i6t9n82di0k1qkhfhd3bn4vjsgr8o7.apps.googleusercontent.com">
      <Router future={{ v7_relativeSplatPath: true, v7_startTransition: true }}>
        <AuthProvider>
          <App />
        </AuthProvider>
      </Router>
    </GoogleOAuthProvider>
    {/* </PrivyProvider> */}
  </React.StrictMode>,
)

