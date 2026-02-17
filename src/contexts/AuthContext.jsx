import React, { createContext, useContext, useState, useEffect } from 'react';
import { googleLogout } from '@react-oauth/google';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

const API_BASE_URL = window.location.origin === 'http://localhost:5173'
    ? 'http://0.0.0.0:9000'
    : 'https://api.libertyroam.com';

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [ipData, setIpData] = useState(null);
    const navigate = useNavigate();

    // Fetch IP data on mount
    useEffect(() => {
        fetch('https://ipapi.co/json/')
            .then(res => res.json())
            .then(data => setIpData(data))
            .catch(err => console.error("Failed to fetch IP data", err));
    }, []);

    // Check for existing session on mount
    useEffect(() => {
        const checkAuth = async () => {
            const stored = localStorage.getItem('auth_data');
            if (stored) {
                try {
                    const { user: storedUser, expires_at } = JSON.parse(stored);
                    if (storedUser && Date.now() / 1000 < expires_at) {
                        setUser(storedUser);
                    } else {
                        // Session expired
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

    const loginWithGoogle = async (credentialResponse) => {
        try {
            const token = credentialResponse.credential;
            const response = await fetch(`${API_BASE_URL}/auth/google`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ id_token: token })
            });

            if (!response.ok) {
                throw new Error('Backend authentication failed');
            }

            const data = await response.json();

            // Backend returns:
            // { user_id, email, username, picture, is_admin, session_token, expires_at }

            const userData = {
                id: data.user_id,
                email: data.email,
                username: data.username,
                picture: data.picture,
                is_admin: data.is_admin
            };

            setUser(userData);

            // Store session in localStorage
            localStorage.setItem('auth_data', JSON.stringify({
                user: userData,
                session_token: data.session_token,
                expires_at: data.expires_at
            }));

            // Navigate to home
            navigate('/', { replace: true });

        } catch (error) {
            console.error('Login failed:', error);
            throw error;
        }
    };

    const logout = () => {
        googleLogout();
        localStorage.removeItem('auth_data');
        setUser(null);
        navigate('/login');
    };

    const value = {
        user,
        loading,
        ipData,
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
