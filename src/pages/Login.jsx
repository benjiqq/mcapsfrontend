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
          <GoogleLogin
            onSuccess={handleLoginSuccess}
            onError={handleLoginError}
            size="large"
            text="signin_with"
            theme="outline"
          />
        </div>

        <div className="login-footer">
          <p>Sign in with your Google account to continue</p>
        </div>
      </div>
    </div>
  )
}

export default Login

