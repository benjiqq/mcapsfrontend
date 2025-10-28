import { Link, useLocation } from 'react-router-dom'
import { useWatchlist } from '../contexts/WatchlistContext'
import './Sidebar.css'

function Sidebar() {
  const location = useLocation()
  const { watchlist } = useWatchlist()

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
      </nav>
    </aside>
  )
}

export default Sidebar

