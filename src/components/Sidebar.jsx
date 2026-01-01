import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useWatchlist } from '../contexts/WatchlistContext'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  const { watchlist } = useWatchlist()
  
  // X login functionality commented out
  // Track X authentication state
  // const [xUser, setXUser] = useState(null)

  // Check for logged-in user on component mount and when returning from auth
  // useEffect(() => {
  //   const checkUser = () => {
  //     const username = localStorage.getItem('x_username')
  //     const userId = localStorage.getItem('x_user_id')
  //     
  //     if (username && userId) {
  //       setXUser({ username, userId })
  //     } else {
  //       setXUser(null)
  //     }
  //   }
  //   
  //   // Check on mount
  //   checkUser()
  //   
  //   // Listen for login events
  //   window.addEventListener('x-user-login', checkUser)
  //   
  //   // Cleanup
  //   return () => {
  //     window.removeEventListener('x-user-login', checkUser)
  //   }
  // }, [])

  // Handle X login click
  // Redirect to backend OAuth endpoint which handles the full OAuth flow securely
  // const handleXLogin = () => {
  //   // Use local backend when running locally, production API otherwise
  //   const isLocalDevelopment = 
  //     window.location.hostname === 'localhost' || 
  //     window.location.hostname === '127.0.0.1' ||
  //     window.location.port === '5173' ||
  //     window.location.port === '3000';
  //   const backendUrl = isLocalDevelopment
  //     ? 'http://localhost:8080'
  //     : 'https://api.mcaps.com';
  //   
  //   // Store the return URL so we can redirect back after authentication
  //   localStorage.setItem('x_oauth_return_url', window.location.href)
  //   
  //   // Redirect to backend OAuth login endpoint
  //   // Backend will handle state generation, PKCE, and redirect to Twitter
  //   window.location.href = `${backendUrl}/auth/login`
  // }

  // Handle logout
  // const handleXLogout = () => {
  //   localStorage.removeItem('x_username')
  //   localStorage.removeItem('x_user_id')
  //   setXUser(null)
  // }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Mcaps</h2>        
      </div>

      <nav className="sidebar-nav">
        {/* Commented out original nav items */}
        {/* <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="nav-icon">📊</span>
          <span className="nav-label">Markets</span>
        </Link>
        <Link to="/search" className={`nav-item ${location.pathname === '/search' ? 'active' : ''}`}>
          <span className="nav-icon">🔍</span>
          <span className="nav-label">Search</span>
        </Link>
        <Link to="/watchlist" className={`nav-item ${location.pathname === '/watchlist' ? 'active' : ''}`}>
          <span className="nav-icon">⭐</span>
          <span className="nav-label">Watchlist</span>
          {watchlist.length > 0 && (
            <span className="nav-badge">{watchlist.length}</span>
          )}
        </Link>
        <Link to="/chat" className={`nav-item ${location.pathname === '/chat' ? 'active' : ''}`}>
          <span className="nav-icon">💬</span>
          <span className="nav-label">Agent Analyst</span>
        </Link>
        <Link to="/social" className={`nav-item ${location.pathname === '/social' ? 'active' : ''}`}>
          <span className="nav-icon">📱</span>
          <span className="nav-label">Social Data</span>
        </Link> */}
        
        <Link to="/dashboardwidget" className={`nav-item ${location.pathname === '/dashboardwidget' ? 'active' : ''}`}>
          <span className="nav-icon">📊</span>
          <span className="nav-label">Dashboard</span>
        </Link>
        <Link to="/settings" className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}>
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Settings</span>
        </Link>
      </nav>

      {/* X login section commented out */}
      {/* <div className="sidebar-section">
        <h3 className="section-title">Account</h3>
        {xUser ? (
          <div className="x-user-info">
            <div className="x-user-details">
              <span className="x-icon">𝕏</span>
              <div className="x-user-text">
                <div className="x-username">@{xUser.username}</div>
                <div className="x-status">Logged in</div>
              </div>
            </div>
            <button 
              onClick={handleXLogout}
              className="x-logout-button"
              type="button"
            >
              Logout
            </button>
          </div>
        ) : (
          <button 
            onClick={handleXLogin}
            className="x-login-button"
            type="button"
          >
            <span className="login-icon">𝕏</span>
            <span className="login-label">Login with X</span>
          </button>
        )}
      </div> */}
    </aside>
  )
}

export default Sidebar

