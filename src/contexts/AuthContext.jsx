import { createContext, useContext, useState, useEffect } from 'react';
import { usePrivy } from '@privy-io/react-auth';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const API_BASE_URL = window.location.hostname === 'localhost'
    ? 'http://localhost:9000'
    : 'https://api.libertyroam.com';

export function AuthProvider({ children }) {
    const { ready, authenticated, user: privyUser, login, logout: privyLogout, getAccessToken } = usePrivy();
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Sync Privy user with context user
    useEffect(() => {
        if (ready) {
            if (authenticated && privyUser) {
                // Initialize user from Privy data
                // We'll normalize these fields to match what the app expects
                const userInfo = {
                    id: privyUser.id,
                    email: privyUser.email?.address || (privyUser.google?.email) || (privyUser.apple?.email) || '',
                    username: privyUser.email?.address?.split('@')[0] || (privyUser.google?.name) || 'User',
                    picture: privyUser.google?.picture || null,
                    is_admin: false, // Will be updated if backend session exists
                };

                // Check for existing backend session to get extra info like is_admin
                const stored = localStorage.getItem('auth_data');
                if (stored) {
                    try {
                        const { user: backendUser, expires_at } = JSON.parse(stored);
                        if (Date.now() / 1000 < expires_at) {
                            setUser({ ...userInfo, ...backendUser });
                        } else {
                            setUser(userInfo);
                        }
                    } catch (e) {
                        setUser(userInfo);
                    }
                } else {
                    setUser(userInfo);
                }
            } else {
                setUser(null);
                localStorage.removeItem('auth_data');
            }
            setLoading(false);
        }
    }, [ready, authenticated, privyUser]);

    const loginWithPrivy = async () => {
        try {
            await login();
        } catch (error) {
            console.error('Privy login error:', error);
            throw error;
        }
    };

    const logout = async () => {
        await privyLogout();
        localStorage.removeItem('auth_data');
        setUser(null);
    };

    const value = {
        user,
        loading: loading || !ready,
        isAuthenticated: authenticated,
        login: loginWithPrivy,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
