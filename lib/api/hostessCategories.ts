// lib/api/hostessCategories.ts
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

export interface HostessCategory {
    id: string;
    category: 'A' | 'B';
    ratePerDay: number;
    workingHours: number;
    description: string;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

export interface CreateHostessCategoryData {
    category: 'A' | 'B';
    ratePerDay: number;
    workingHours: number;
    description: string;
    isActive?: boolean;
}

// Get all hostess categories
export async function getHostessCategories(params?: {
    isActive?: boolean;
}) {
    const response = await api.get('/admin/hostess-rates', { params });
    return response.data;
}

// Get single category by ID
export async function getHostessCategoryById(id: string) {
    const response = await api.get(`/admin/hostess-rates/${id}`);
    return response.data;
}

// Get category by type (A or B)
export async function getHostessCategoryByType(type: 'A' | 'B') {
    const response = await api.get(`/admin/hostess-rates/type/${type}`);
    return response.data;
}

// Create hostess category
export async function createHostessCategory(data: CreateHostessCategoryData) {
    const response = await api.post('/admin/hostess-rates', data);
    return response.data;
}

// Update hostess category
export async function updateHostessCategory(id: string, data: Partial<CreateHostessCategoryData>) {
    const response = await api.put(`/admin/hostess-rates/${id}`, data);
    return response.data;
}

// Delete hostess category
export async function deleteHostessCategory(id: string) {
    const response = await api.delete(`/admin/hostess-rates/${id}`);
    return response.data;
}

// FIXED: Toggle active status - Use PUT update instead of PATCH
export async function toggleHostessCategoryStatus(id: string) {
    try {
        const category = await getHostessCategoryById(id);
        if (category.success) {
            const response = await updateHostessCategory(id, {
                isActive: !category.data.isActive
            });
            return response;
        }
    } catch (error: any) {
        console.error("Toggle status error:", error);
        throw error;
    }
}

// Bulk update rates
export async function bulkUpdateHostessRates(data: { updates: { id: string; ratePerDay: number; workingHours: number }[] }) {
    const response = await api.patch('/admin/hostess-rates/bulk/update', data);
    return response.data;
}

// Calculate cost
export async function calculateHostessCost(category: 'A' | 'B', noOfDays: number) {
    const response = await api.post('/admin/hostess-rates/calculate', { category, noOfDays });
    return response.data;
}

// Get statistics - FIXED to handle missing columns
export async function getHostessCategoryStatistics() {
    try {
        const response = await api.get('/admin/hostess-rates/statistics');
        return response.data;
    } catch (error: any) {
        console.error("Statistics API error:", error);
        return {
            success: true,
            data: {
                total: 0,
                active: 0,
                avgRate: 0
            }
        };
    }
}