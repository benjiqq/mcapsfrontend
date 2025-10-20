import { Link, useLocation } from 'react-router-dom'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2>Mcaps</h2>        
      </div>

      <nav className="sidebar-nav">
        <Link to="/" className={`nav-item ${location.pathname === '/' ? 'active' : ''}`}>
          <span className="nav-icon">📊</span>
          <span className="nav-label">Markets</span>
        </Link>
        <Link to="/chat" className={`nav-item ${location.pathname === '/chat' ? 'active' : ''}`}>
          <span className="nav-icon">💬</span>
          <span className="nav-label">Agent Analyst</span>
        </Link>
        <Link to="/favorites" className={`nav-item ${location.pathname === '/favorites' ? 'active' : ''}`}>
          <span className="nav-icon">⭐</span>
          <span className="nav-label">Favorites</span>
        </Link>
        <Link to="/trending" className={`nav-item ${location.pathname === '/trending' ? 'active' : ''}`}>
          <span className="nav-icon">📈</span>
          <span className="nav-label">Trending</span>
        </Link>
      </nav>

      <div className="sidebar-section">
        <h3 className="section-title">Quick Stats</h3>
        <div className="stat-item">
          <span className="stat-label">Total Coins</span>
          <span className="stat-value">100</span>
        </div>
        <div className="stat-item">
          <span className="stat-label">Last Update</span>
          <span className="stat-value">Live</span>
        </div>
      </div>

      <div className="sidebar-footer">
        <div className="footer-item">
          <span>Powered by CoinGecko</span>
        </div>
      </div>
    </aside>
  )
}

export default Sidebar

