import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

function AuthCallback() {
  const [status, setStatus] = useState('Processing...')
  const navigate = useNavigate()

  const { handleXLoginSuccess } = useAuth()

  useEffect(() => {
    // Get URL parameters from backend redirect
    const urlParams = new URLSearchParams(window.location.search)
    const success = urlParams.get('success')
    const username = urlParams.get('username')
    const userId = urlParams.get('user_id')
    const error = urlParams.get('error')

    // Check for errors
    if (error) {
      const errorMessages = {
        'missing_parameters': 'Missing required parameters',
        'invalid_state': 'Invalid state parameter (possible CSRF attack)',
        'no_access_token': 'Failed to get access token',
        'token_exchange_failed': 'Token exchange with Twitter failed',
        'callback_error': 'OAuth callback error occurred'
      }

      setStatus(`Authentication failed: ${errorMessages[error] || error}`)
      setTimeout(() => navigate('/'), 3000)
      return
    }

    // Check for success
    if (success === 'true' && username) {
      console.log('Logged in as:', username, 'User ID:', userId)

      // Update auth context
      handleXLoginSuccess(username, userId)

      setStatus(`Login successful! Welcome, @${username}`)

      // Get return URL or default to home
      const returnUrl = localStorage.getItem('x_oauth_return_url') || '/'
      localStorage.removeItem('x_oauth_return_url')

      // Redirect back to where user came from
      setTimeout(() => navigate(returnUrl), 2000)
    } else {
      setStatus('Authentication failed: Invalid response from server')
      setTimeout(() => navigate('/'), 3000)
    }
  }, [navigate, handleXLoginSuccess])

  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h2>X Authentication</h2>
      <p>{status}</p>
      <div style={{
        marginTop: '20px',
        padding: '10px',
        backgroundColor: '#f5f5f5',
        borderRadius: '8px',
        fontSize: '14px',
        color: '#666'
      }}>
        <strong>Note:</strong> In a production app, the authorization code would be sent to your backend server to exchange for an access token securely.
      </div>
    </div>
  )
}

export default AuthCallback
