import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useAuth } from './contexts/AuthContext'
import './App.css'
import Home from './pages/Home'
import About from './pages/About'
import Navbar from './components/Navbar'
import AdminNavbar from './components/AdminNavbar'
import Packages from './pages/Packages'
import Orders from './pages/Orders'
import SubmitOrder from './pages/SubmitOrder'
import Monitor from './pages/Monitor'
import Affiliate from './pages/Affiliate'
import Login from './pages/Login'
import Account from './pages/Account'
import Admin from './pages/Admin'
import OrderDetail from './pages/OrderDetail'
import ProtectedRoute from './components/ProtectedRoute'
import AdminRoute from './components/AdminRoute'

function AppContent() {
  const { loading, user } = useAuth()
  const location = useLocation();
  console.log('AppContent rendering. Loading:', loading, 'User:', user, 'Path:', location.pathname);

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100 bg-dark text-muted">
        <div className="spinner-border text-primary" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    )
  }

  const isAdmin = location.pathname.startsWith('/admin');

  return (
    <div className="app-container">
      {isAdmin ? <AdminNavbar /> : <Navbar />}
      <div className="main-content">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={<ProtectedRoute element={<Home />} />} />
          <Route path="/about" element={<ProtectedRoute element={<About />} />} />
          <Route path="/affiliate" element={<ProtectedRoute element={<Affiliate />} />} />
          <Route path="/account" element={<ProtectedRoute element={<Account />} />} />
          <Route path="/admin" element={<Navigate to="/admin/monitor" replace />} />
          <Route path="/admin/packages" element={<Packages />} />
          <Route path="/admin/orders" element={<Orders />} />
          <Route path="/admin/orders/:orderId" element={<OrderDetail />} />
          <Route path="/admin/submit-order" element={<SubmitOrder />} />
          <Route path="/admin/monitor" element={<Monitor />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </div>
  )
}

function App() {
  return (
    <AppContent />
  )
}

export default App
