import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  const navigate = useNavigate()
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
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="nav-icon">🏠</span>
          <span className="nav-label">Home</span>
        </Link>
        {user && user.isXUser ? (
          <Link to="/twitter-info" className={`nav-item ${location.pathname === '/twitter-info' ? 'active' : ''}`}>
            <span className="nav-icon">𝕏</span>
            <span className="nav-label">X Trends</span>
          </Link>
        ) : (
          <Link to="/twitter-login" className={`nav-item ${location.pathname === '/twitter-login' ? 'active' : ''}`}>
            <span className="nav-icon">𝕏</span>
            <span className="nav-label">Connect X</span>
          </Link>
        )}
        <Link to="/help" className={`nav-item ${location.pathname === '/help' ? 'active' : ''}`}>
          <span className="nav-icon">❓</span>
          <span className="nav-label">Help</span>
        </Link>
        <Link to="/about" className={`nav-item ${location.pathname === '/about' ? 'active' : ''}`}>
          <span className="nav-icon">ℹ️</span>
          <span className="nav-label">About</span>
        </Link>
        <div className="nav-item" onClick={handleLogout} style={{ cursor: 'pointer', marginTop: '20px' }}>
          <span className="nav-icon">🚪</span>
          <span className="nav-label">Logout</span>
        </div>
      </nav>
    </aside>
  )
}

export default Sidebar


