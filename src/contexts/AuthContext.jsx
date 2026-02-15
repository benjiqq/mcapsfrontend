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

    const syncWithBackend = async (privyUser, token) => {
        try {
            const response = await fetch(`${API_BASE_URL}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ token })
            });

            if (response.ok) {
                const data = await response.json();
                const updatedUser = {
                    id: privyUser.id,
                    email: data.email,
                    username: data.username,
                    picture: data.picture,
                    is_admin: data.is_admin
                };
                setUser(updatedUser);
                localStorage.setItem('auth_data', JSON.stringify({
                    user: updatedUser,
                    expires_at: data.expires_at
                }));
            }
        } catch (error) {
            console.error('Failed to sync with backend:', error);
        }
    };

    // Sync Privy user with context user
    useEffect(() => {
        const handleSync = async () => {
            if (ready) {
                if (authenticated && privyUser) {
                    // Check if we already have synced data in localStorage
                    const stored = localStorage.getItem('auth_data');
                    let existingUser = null;
                    if (stored) {
                        try {
                            const { user: backendUser, expires_at } = JSON.parse(stored);
                            if (Date.now() / 1000 < expires_at) {
                                existingUser = backendUser;
                            }
                        } catch (e) { }
                    }

                    if (existingUser && existingUser.id === privyUser.id) {
                        setUser(existingUser);
                    } else {
                        // Initial partial user from Privy
                        const userInfo = {
                            id: privyUser.id,
                            email: privyUser.email?.address || (privyUser.google?.email) || (privyUser.apple?.email) || '',
                            username: privyUser.email?.address?.split('@')[0] || (privyUser.google?.name) || 'User',
                            picture: privyUser.google?.picture || null,
                            is_admin: false,
                        };
                        setUser(userInfo);

                        // Fetch real user info (including is_admin) from backend
                        const token = await getAccessToken();
                        if (token) {
                            await syncWithBackend(privyUser, token);
                        }
                    }
                } else {
                    setUser(null);
                    localStorage.removeItem('auth_data');
                }
                setLoading(false);
            }
        };

        handleSync();
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
