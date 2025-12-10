import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import AssetList from './pages/AssetList'
import Chat from './pages/Chat'
import Watchlist from './pages/Watchlist'
import Search from './pages/Search'
import AssetPage from './pages/AssetPage'
import AuthCallback from './pages/AuthCallback'
import SocialData from './pages/SocialData'
import DashboardWidget from './pages/DashboardWidget'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<AssetList />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/social" element={<SocialData />} />
            <Route path="/dashboardwidget" element={<DashboardWidget />} />
            <Route path="/asset/:coinId" element={<AssetPage />} />
            <Route path="/auth/callback" element={<AuthCallback />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

