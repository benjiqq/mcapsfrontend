import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';

function Login() {
    const [error, setError] = useState(null);
    const { login, user } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        if (user) {
            navigate('/');
        }
    }, [user, navigate]);

    const handleLogin = async () => {
        try {
            await login();
        } catch (err) {
            setError('Login failed. Please try again.');
        }
    };

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            minHeight: '100vh',
            backgroundColor: '#0f172a',
            color: 'white'
        }}>
            <div style={{
                padding: '2.5rem',
                backgroundColor: '#1e293b',
                borderRadius: '12px',
                boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                width: '100%',
                maxWidth: '400px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center'
            }}>
                <h2 style={{ textAlign: 'center', marginBottom: '1rem', color: '#38bdf8' }}>Libroam</h2>
                <p style={{ textAlign: 'center', marginBottom: '2rem', color: '#94a3b8' }}>Sign in to access your dashboard</p>

                {error && (
                    <div style={{ color: '#ef4444', marginBottom: '1rem', fontSize: '0.875rem' }}>
                        {error}
                    </div>
                )}

                <button
                    onClick={handleLogin}
                    style={{
                        backgroundColor: '#38bdf8',
                        color: 'white',
                        border: 'none',
                        padding: '0.75rem 2rem',
                        borderRadius: '9999px',
                        fontSize: '1rem',
                        fontWeight: '600',
                        cursor: 'pointer',
                        transition: 'background-color 0.2s',
                        width: '100%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: '0.5rem'
                    }}
                    onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#0ea5e9'}
                    onMouseOut={(e) => e.currentTarget.style.backgroundColor = '#38bdf8'}
                >
                    Sign In
                </button>
            </div>
        </div>
    );
}

export default Login;
