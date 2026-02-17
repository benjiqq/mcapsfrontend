import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const AdminNavbar = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    <img src="/encryptSIM.logo.green.svg" alt="EncryptSIM Logo" width="50" height="50" style={{ marginRight: '10px' }} />
                    EncryptSIM
                </Link>
                <div className="navbar-right">
                    <div className="navbar-links">
                        <NavLink
                            to="/admin/monitor"
                            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                        >
                            Monitor
                        </NavLink>
                        <NavLink
                            to="/admin/packages"
                            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                        >
                            Packages
                        </NavLink>
                        <NavLink
                            to="/admin/orders"
                            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                        >
                            Orders
                        </NavLink>
                        <NavLink
                            to="/admin/submit-order"
                            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                        >
                            Submit Order
                        </NavLink>
                    </div>

                    <div className="nav-profile-section">
                        {user ? (
                            <>
                                {user.picture && (
                                    <img src={user.picture} alt={user.username} className="nav-avatar" />
                                )}
                            </>
                        ) : (
                            <button className="nav-auth-btn" onClick={() => navigate('/login')}>
                                Log in
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default AdminNavbar;
