// lib/api/securityGuard.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("adminToken") || localStorage.getItem("exhibitorToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export interface SecurityGuardConfig {
    id: string;
    ratePerGuardPerDay: number;
    createdAt?: string;
    updatedAt?: string;
}

export interface CalculateCostRequest {
    quantity: number;
    noOfDays: number;
}

export interface CalculateCostResponse {
    quantity: number;
    noOfDays: number;
    ratePerDay: number;
    totalCost: number;
}

// Get current security guard configuration - FIXED ROUTE
export async function getSecurityGuardConfig(): Promise<SecurityGuardConfig> {
    const response = await api.get('/admin/security-guard/config');
    return response.data.data || response.data;
}

// Update security guard configuration (admin only) - FIXED ROUTE
export async function updateSecurityGuardConfig(ratePerGuardPerDay: number): Promise<SecurityGuardConfig> {
    const response = await api.put('/admin/security-guard/config', { ratePerGuardPerDay });
    return response.data.data || response.data;
}

// Reset security guard configuration to default (admin only) - FIXED ROUTE
export async function resetSecurityGuardConfig(): Promise<SecurityGuardConfig> {
    const response = await api.post('/admin/security-guard/reset');
    return response.data.data || response.data;
}

// Calculate cost for security guards (exhibitors)
export async function calculateSecurityGuardCost(quantity: number, noOfDays: number): Promise<CalculateCostResponse> {
    const response = await api.post('/admin/security-guard/calculate', { quantity, noOfDays });
    return response.data.data || response.data;
}

// Get rate per day only (convenience function)
export async function getSecurityGuardRatePerDay(): Promise<number> {
    const config = await getSecurityGuardConfig();
    return config.ratePerGuardPerDay;
}

// Validate security guard rate - SYNCHRONOUS function
export function validateSecurityGuardRate(ratePerGuardPerDay: number): { valid: boolean; message?: string } {
    if (ratePerGuardPerDay < 0) {
        return { valid: false, message: 'Rate cannot be negative' };
    }
    if (ratePerGuardPerDay < 500) {
        return { valid: false, message: 'Rate seems too low. Minimum recommended rate is ₹500 per day' };
    }
    if (ratePerGuardPerDay > 10000) {
        return { valid: false, message: 'Rate seems too high. Maximum recommended rate is ₹10,000 per day' };
    }
    return { valid: true };
}

// Get rate history
export async function getSecurityGuardRateHistory() {
    const response = await api.get('/admin/security-guard/history');
    return response.data;
}