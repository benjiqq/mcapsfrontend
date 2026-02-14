import { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:9000'
    : 'https://api.libertyroam.com';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const loginWithGoogle = async (idToken) => {
        setLoading(true);
        try {
            const response = await fetch(`${API_BASE_URL}/auth/google`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ id_token: idToken }),
            });

            if (!response.ok) throw new Error('Login failed');

            const data = await response.json();
            const { session_token, expires_at, ...userInfo } = data;

            const authData = {
                user: userInfo,
                token: session_token,
                expires_at
            };

            localStorage.setItem('auth_data', JSON.stringify(authData));
            setUser(userInfo);
            return userInfo;
        } catch (error) {
            console.error('Google login error:', error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        localStorage.removeItem('auth_data');
        setUser(null);
    };

    useEffect(() => {
        const checkAuth = async () => {
            const stored = localStorage.getItem('auth_data');
            if (stored) {
                try {
                    const { user, token, expires_at } = JSON.parse(stored);
                    if (Date.now() / 1000 < expires_at) {
                        setUser(user);
                    } else {
                        localStorage.removeItem('auth_data');
                    }
                } catch (e) {
                    localStorage.removeItem('auth_data');
                }
            }
            setLoading(false);
        };
        checkAuth();
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        loginWithGoogle,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
