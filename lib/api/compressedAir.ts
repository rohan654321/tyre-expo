// lib/api/compressedAir.ts
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

export interface CompressedAirOption {
    id: string;
    cfmRange: string;
    costPerConnection: number;
    powerKW: number;
    isActive: boolean;
    displayOrder: number;
    totalCost?: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateCompressedAirData {
    cfmRange: string;
    costPerConnection: number;
    powerKW: number;
    isActive?: boolean;
    displayOrder?: number;
}

// Get all compressed air options
export async function getCompressedAirOptions(params?: {
    isActive?: boolean;
    search?: string;
}) {
    const response = await api.get('/admin/compressed-air', { params });
    return response.data;
}

// Get single option by ID
export async function getCompressedAirOptionById(id: string) {
    const response = await api.get(`/admin/compressed-air/${id}`);
    return response.data;
}

// Create compressed air option
export async function createCompressedAirOption(data: CreateCompressedAirData) {
    const response = await api.post('/admin/compressed-air', data);
    return response.data;
}

// Update compressed air option
export async function updateCompressedAirOption(id: string, data: Partial<CreateCompressedAirData>) {
    const response = await api.put(`/admin/compressed-air/${id}`, data);
    return response.data;
}

// Delete compressed air option
export async function deleteCompressedAirOption(id: string) {
    const response = await api.delete(`/admin/compressed-air/${id}`);
    return response.data;
}

// Bulk delete options
export async function bulkDeleteCompressedAirOptions(ids: string[]) {
    const response = await api.delete('/admin/compressed-air/bulk/delete', { data: { ids } });
    return response.data;
}

// Toggle active status
export async function toggleCompressedAirStatus(id: string, isActive: boolean) {
    const response = await api.patch(`/admin/compressed-air/${id}/toggle-status`, { isActive });
    return response.data;
}

// Update display order
export async function updateCompressedAirDisplayOrder(updates: { id: string; displayOrder: number }[]) {
    const response = await api.patch('/admin/compressed-air/display-order/update', { updates });
    return response.data;
}

// Reorder all options
export async function reorderCompressedAirOptions() {
    const response = await api.post('/admin/compressed-air/reorder');
    return response.data;
}

// Get statistics
export async function getCompressedAirStatistics() {
    const response = await api.get('/admin/compressed-air/statistics');
    return response.data;
}