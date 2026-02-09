import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useWatchlist } from '../contexts/WatchlistContext'
import { useAuth } from '../contexts/AuthContext'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
  const { watchlist } = useWatchlist()
  const { user, logout } = useAuth()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Mcaps</h2>
      </div>

      <nav className="sidebar-nav">
        <Link to="/dashboardwidget" className={`nav-item ${location.pathname === '/dashboardwidget' ? 'active' : ''}`}>
          <span className="nav-icon">📊</span>
          <span className="nav-label">Dashboard</span>
        </Link>
        <Link to="/settings" className={`nav-item ${location.pathname === '/settings' ? 'active' : ''}`}>
          <span className="nav-icon">⚙️</span>
          <span className="nav-label">Settings</span>
        </Link>
        {user && user.isXUser ? (
          <Link to="/twitter-info" className={`nav-item ${location.pathname === '/twitter-info' ? 'active' : ''}`}>
            <span className="nav-icon">𝕏</span>
            <span className="nav-label">X Info</span>
          </Link>
        ) : (
          <Link to="/twitter-login" className={`nav-item ${location.pathname === '/twitter-login' ? 'active' : ''}`}>
            <span className="nav-icon">𝕏</span>
            <span className="nav-label">Connect X</span>
          </Link>
        )}
      </nav>

      {/* User Account Section */}
      {user && (
        <div className="sidebar-section">
          <h3 className="section-title">Account</h3>
          <div className="user-info">
            <div className="user-details">
              {user.picture && (
                <img src={user.picture} alt="Profile" className="user-avatar" />
              )}
              <div className="user-text">
                <div className="user-name">{user.name}</div>
                <div className="user-email">{user.email}</div>
              </div>
            </div>
            <button
              onClick={handleLogout}
              className="logout-button"
              type="button"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </aside>
  )
}

export default Sidebar


