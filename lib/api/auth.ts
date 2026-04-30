// lib/api/auth.ts
import axios from 'axios';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export async function adminLogin(email: string, password: string) {
    try {
        console.log("📡 Login API call to:", `${API_BASE_URL}/auth/login`);
        const response = await api.post('/auth/login', { email, password });

        console.log("📡 Login response:", response.data);

        if (response.data.success) {
            const { token, user } = response.data.data;
            localStorage.setItem('adminToken', token);
            localStorage.setItem('adminUser', JSON.stringify(user));
            console.log("✅ Token stored in localStorage");
            return { success: true, data: { token, user } };
        }
        return { success: false, error: response.data.error };
    } catch (error: any) {
        console.error("❌ Login error:", error);
        return { success: false, error: error.response?.data?.error || 'Login failed' };
    }
}

export async function adminLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminUser');
}

export function getAdminToken() {
    if (typeof window !== 'undefined') {
        return localStorage.getItem('adminToken');
    }
    return null;
}

export function getAdminUser() {
    if (typeof window !== 'undefined') {
        const user = localStorage.getItem('adminUser');
        return user ? JSON.parse(user) : null;
    }
    return null;
}

export function isAuthenticated() {
    return !!getAdminToken();
}