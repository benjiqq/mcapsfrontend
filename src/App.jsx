import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import Affiliate from './pages/Affiliate'
import Login from './pages/Login'
import Account from './pages/Account'
import ProtectedRoute from './components/ProtectedRoute'

function AppContent() {
  const { loading } = useAuth()

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-muted">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  return (
    <div className="app-container">
      <Navbar />
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/affiliate" element={<ProtectedRoute element={<Affiliate />} />} />
          <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router basename="/app">
      <AppContent />
    </Router>
  )
}

export default App
