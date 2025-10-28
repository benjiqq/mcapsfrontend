import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Sidebar from './components/Sidebar'
import Dashboard from './pages/Dashboard'
import Chat from './pages/Chat'
import Watchlist from './pages/Watchlist'
import Search from './pages/Search'
import AssetPage from './pages/AssetPage'

function App() {
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/search" element={<Search />} />
            <Route path="/watchlist" element={<Watchlist />} />
            <Route path="/chat" element={<Chat />} />
            <Route path="/asset/:coinId" element={<AssetPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  )
}

export default App

