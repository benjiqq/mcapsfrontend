import { createContext, useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Mock login function for now
    const login = async (role = 'user') => {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 500));
        setUser({ id: '1', name: 'Demo User', email: 'magnusvig@toolbase.ai', role, isXUser: true });
    };

    const logout = () => {
        setUser(null);
    };

    useEffect(() => {
        // Simulate checking auth status
        const checkAuth = async () => {
            await new Promise(resolve => setTimeout(resolve, 500));
            setLoading(false);
        };
        checkAuth();
    }, []);

    const value = {
        user,
        loading,
        isAuthenticated: !!user,
        login,
        logout
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
