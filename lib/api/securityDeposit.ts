// lib/api/securityDeposit.ts
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
            const token = localStorage.getItem("adminToken");
            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

export interface SecurityDeposit {
    id: string;
    category: '0-36' | '37-100' | '101+';
    minSqMtr: number;
    maxSqMtr: number;
    amountINR: number;
    amountUSD: number;
    displayOrder: number;
    isActive: boolean;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateDepositData {
    category: '0-36' | '37-100' | '101+';
    minSqMtr: number;
    maxSqMtr: number;
    amountINR: number;
    amountUSD: number;
    displayOrder?: number;
    isActive?: boolean;
    description?: string;
}

// Get all security deposits (admin)
export async function getSecurityDeposits(params?: {
    isActive?: boolean;
    category?: string;
}) {
    const response = await api.get('/admin/security-deposit', { params });
    return response.data;
}

// Get active security deposits (public - for exhibitors)
export async function getActiveSecurityDeposits() {
    const response = await api.get('/admin/security-deposit/active');
    return response.data;
}

// Get single deposit by ID
export async function getSecurityDepositById(id: string) {
    const response = await api.get(`/admin/security-deposit/${id}`);
    return response.data;
}

// Get deposits by category
export async function getSecurityDepositsByCategory(category: string) {
    const response = await api.get(`/admin/security-deposit/category/${category}`);
    return response.data;
}

// Create security deposit
export async function createSecurityDeposit(data: CreateDepositData) {
    const response = await api.post('/admin/security-deposit', data);
    return response.data;
}

// Update security deposit
export async function updateSecurityDeposit(id: string, data: Partial<CreateDepositData>) {
    const response = await api.put(`/admin/security-deposit/${id}`, data);
    return response.data;
}

// Delete security deposit
export async function deleteSecurityDeposit(id: string) {
    const response = await api.delete(`/admin/security-deposit/${id}`);
    return response.data;
}

// Bulk delete deposits
export async function bulkDeleteSecurityDeposits(ids: string[]) {
    const response = await api.delete('/admin/security-deposit/bulk/delete', { data: { ids } });
    return response.data;
}

// FIXED: Toggle active status
export async function toggleSecurityDepositStatus(id: string, isActive: boolean) {
    const response = await api.patch(`/admin/security-deposit/${id}/toggle-status`, { isActive });
    return response.data;
}

// Update display order
export async function updateSecurityDepositDisplayOrder(updates: { id: string; displayOrder: number }[]) {
    const response = await api.patch('/admin/security-deposit/display-order/update', { updates });
    return response.data;
}

// Reorder all deposits
export async function reorderSecurityDeposits() {
    const response = await api.post('/admin/security-deposit/reorder');
    return response.data;
}

// Get statistics
export async function getSecurityDepositStatistics() {
    const response = await api.get('/admin/security-deposit/statistics');
    return response.data;
}