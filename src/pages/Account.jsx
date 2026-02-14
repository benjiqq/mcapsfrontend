import { useAuth } from '../contexts/AuthContext';
import './Home.css'; // Reuse some basic styles or create Account.css

const Account = () => {
    const { user, logout } = useAuth();

    if (!user) return null;

    return (
        <div className="home-container" style={{ padding: '40px' }}>
            <div className="hero-section" style={{ textAlign: 'center', maxWidth: '800px', margin: '0 auto' }}>
                <h1 className="hero-title" style={{ marginBottom: '20px' }}>
                    My <span>Account</span>
                </h1>

                <div style={{
                    background: 'rgba(255, 255, 255, 0.05)',
                    padding: '40px',
                    borderRadius: '24px',
                    border: '1px solid rgba(255, 255, 255, 0.1)',
                    marginTop: '40px'
                }}>
                    {user.picture && (
                        <img
                            src={user.picture}
                            alt={user.nickname || user.name}
                            style={{ width: '100px', height: '100px', borderRadius: '50%', marginBottom: '20px', border: '4px solid var(--primary)' }}
                        />
                    )}
                    <h2 style={{ color: 'var(--text)', marginBottom: '10px' }}>{user.name || user.username}</h2>
                    <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>{user.email}</p>

                    <button
                        className="nav-auth-btn logout"
                        onClick={logout}
                        style={{ padding: '12px 32px' }}
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Account;
