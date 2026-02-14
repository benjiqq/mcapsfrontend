import { NavLink, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import './Navbar.css';

const Navbar = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const handleAuthAction = () => {
        if (user) {
            logout();
        } else {
            navigate('/login');
        }
    };

    return (
        <nav className="navbar">
            <div className="navbar-container">
                <Link to="/" className="navbar-brand">
                    Lib<span>Roam</span>
                </Link>
                <div className="navbar-right">
                    <div className="navbar-links">
                        <NavLink
                            to="/"
                            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                            end
                        >
                            Home
                        </NavLink>
                        <NavLink
                            to="/about"
                            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                        >
                            About
                        </NavLink>
                        <NavLink
                            to="/affiliate"
                            className={({ isActive }) => (isActive ? 'nav-item active' : 'nav-item')}
                        >
                            Affiliate
                        </NavLink>
                    </div>

                    <div className="nav-profile-section">
                        {user && user.picture && (
                            <img src={user.picture} alt={user.username} className="nav-avatar" />
                        )}
                        <button className="nav-auth-btn" onClick={handleAuthAction}>
                            {user ? 'Log out' : 'Log in'}
                        </button>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
