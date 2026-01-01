import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { VisibilityProvider } from './contexts/VisibilityContext'
import './App.css'
import Sidebar from './components/Sidebar'
import DashboardWidget from './pages/DashboardWidget'
import Settings from './pages/Settings'

function App() {
  return (
    <VisibilityProvider>
      <Router>
        <div className="app-container">
          <Sidebar />
          
          <div className="main-content">
            <Routes>
              <Route path="/" element={<DashboardWidget />} />
              <Route path="/dashboardwidget" element={<DashboardWidget />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </Router>
    </VisibilityProvider>
  )
}

export default App

