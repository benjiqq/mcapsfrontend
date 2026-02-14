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
            // Login navigation removed as requested
            console.log('Login clicked - link behavior removed');
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
                    </div>
                    <button className="nav-auth-btn" onClick={handleAuthAction}>
                        {user ? 'Log out' : 'Log in'}
                    </button>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
