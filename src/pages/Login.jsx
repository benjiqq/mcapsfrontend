import React from 'react'
import { GoogleLogin } from '@react-oauth/google'
import { useAuth } from '../contexts/AuthContext'
import './Login.css'

const Login = () => {
  const { handleLoginSuccess, handleLoginError } = useAuth()

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <h1>Welcome to MCaps</h1>
          <p>Track cryptocurrency market caps and insights</p>
        </div>

        <div className="login-content">
          {/* 
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            size="large"
            text="signin_with"
            theme="outline"
          /> 
          */}

          <button
            onClick={() => window.location.href = 'https://api.mcaps.com/auth/login'}
            style={{
              backgroundColor: 'black',
              color: 'white',
              border: 'none',
              padding: '12px 24px',
              borderRadius: '24px',
              fontSize: '16px',
              fontWeight: 'bold',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              transition: 'background-color 0.2s',
              margin: '0 auto'
            }}
            onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#333'}
            onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'black'}
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"></path>
            </svg>
            Sign in with X
          </button>
        </div>

        <div className="login-footer">
          <p>Sign in with your X account to continue</p>
        </div>
      </div>
    </div>
  )
}

export default Login

