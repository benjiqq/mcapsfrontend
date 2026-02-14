import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'

// Inner component to use AuthContext
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
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <Router basename="/app">
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </Router>
  )
}

export default App
