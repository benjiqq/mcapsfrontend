import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { VisibilityProvider } from './contexts/VisibilityContext'
import { useAuth } from './contexts/AuthContext'
import './App.css'
import Sidebar from './components/Sidebar'
import DashboardWidget from './pages/DashboardWidget'
import Settings from './pages/Settings'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import TwitterAuth from './pages/TwitterAuth'
import TwitterInfo from './pages/TwitterInfo'
import AuthCallback from './pages/AuthCallback'

function App() {
  const { isAuthenticated, loading } = useAuth()

  // Show loading state while checking authentication
  if (loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        fontSize: '18px',
        color: '#666'
      }}>
        Loading...
      </div>
    )
  }

  // If not authenticated, app is blank (only show login when navigating to /login)
  if (!isAuthenticated) {
    return (
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/twitter-login" element={<TwitterAuth />} />
          <Route path="/auth/callback" element={<AuthCallback />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </Router>
    )
  }

  // If authenticated, show the full app
  return (
    <VisibilityProvider>
      <Router>
        <div className="app-container">
          <Sidebar />

          <div className="main-content">
            <Routes>
              <Route path="/" element={<Navigate to="/twitter-info" replace />} />
              <Route path="/dashboardwidget" element={<ProtectedRoute element={<DashboardWidget />} />} />
              <Route path="/settings" element={<ProtectedRoute element={<Settings />} />} />
              <Route path="/login" element={<Login />} />
              <Route path="/twitter-info" element={<ProtectedRoute element={<TwitterInfo />} />} />
              <Route path="/twitter-login" element={<TwitterAuth />} />
              <Route path="/auth/callback" element={<AuthCallback />} />
            </Routes>
          </div>
        </div>
      </Router>
    </VisibilityProvider>
  )
}

export default App

