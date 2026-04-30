// hooks/useAuth.ts
import { useState, useEffect } from 'react';
import { getAdminToken, getAdminUser } from '@/lib/api/auth';

export function useAuth() {
    const [user, setUser] = useState<any>(null);
    const [token, setToken] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Simply check if token exists in localStorage
        const storedToken = getAdminToken();
        const storedUser = getAdminUser();

        console.log('🔐 useAuth - Token exists:', !!storedToken);
        console.log('🔐 useAuth - User exists:', !!storedUser);

        if (storedToken && storedUser) {
            setToken(storedToken);
            setUser(storedUser);
            setIsAuthenticated(true);
        } else {
            setToken(null);
            setUser(null);
            setIsAuthenticated(false);
        }

        setIsLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api'}/auth/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            });

            const data = await response.json();
            console.log('📡 Login response:', data);

            if (data.success) {
                const { token, user } = data.data;

                // Store in localStorage
                localStorage.setItem('adminToken', token);
                localStorage.setItem('adminUser', JSON.stringify(user));

                setToken(token);
                setUser(user);
                setIsAuthenticated(true);

                return { success: true, user };
            } else {
                throw new Error(data.error || 'Login failed');
            }
        } catch (error: any) {
            console.error('Login error:', error);
            throw new Error(error.message || 'Login failed');
        }
    };

    const logout = () => {
        localStorage.removeItem('adminToken');
        localStorage.removeItem('adminUser');
        setToken(null);
        setUser(null);
        setIsAuthenticated(false);
    };

    return {
        user,
        token,
        isAuthenticated,
        isLoading,
        login,
        logout,
    };
}