// hooks/useAuth.ts - UPDATED FIXED VERSION
"use client";

import { useState, useEffect, createContext, useContext } from "react";

interface User {
    id: string;
    name: string;
    email: string;
    role: string;
}

interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    loading: boolean;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Check for existing session on mount
        const token = localStorage.getItem("admin_token");
        const userData = localStorage.getItem("admin_user");

        console.log("Auth check - token:", token);
        console.log("Auth check - userData:", userData);

        if (token && userData) {
            try {
                setUser(JSON.parse(userData));
            } catch {
                localStorage.removeItem("admin_token");
                localStorage.removeItem("admin_user");
            }
        }
        setLoading(false);
    }, []);

    const login = async (email: string, password: string) => {
        setLoading(true);
        try {
            // For UI demo, accept any credentials
            const userData = { id: "1", name: "Admin User", email, role: "admin" };
            localStorage.setItem("admin_token", "demo-token-tyre-expo");
            localStorage.setItem("admin_user", JSON.stringify(userData));
            setUser(userData);
            console.log("Login successful - user set:", userData);
        } catch (error) {
            console.error("Login error:", error);
        } finally {
            setLoading(false);
        }
    };

    const logout = async () => {
        localStorage.removeItem("admin_token");
        localStorage.removeItem("admin_user");
        setUser(null);
        console.log("Logout successful");
    };

    return (
        <AuthContext.Provider value={{ user, isAuthenticated: !!user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}