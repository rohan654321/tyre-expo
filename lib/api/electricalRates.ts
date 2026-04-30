// lib/api/electricalRates.ts
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

export interface ElectricalRate {
    id: string;
    type: 'temporary' | 'exhibition' | 'both';
    ratePerKW: number;
    effectiveFrom: string;
    effectiveTo: string | null;
    isActive: boolean;
    description: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateElectricalRateData {
    type: 'temporary' | 'exhibition' | 'both';
    ratePerKW: number;
    effectiveFrom: string;
    effectiveTo?: string | null;
    description?: string;
}

// Get all electrical rates
export async function getElectricalRates(params?: {
    isActive?: boolean;
    type?: string;
}) {
    const response = await api.get('/admin/electrical-rates', { params });
    return response.data;
}

// Get single rate by ID
export async function getElectricalRateById(id: string) {
    const response = await api.get(`/admin/electrical-rates/${id}`);
    return response.data;
}

// Create electrical rate
export async function createElectricalRate(data: CreateElectricalRateData) {
    const response = await api.post('/admin/electrical-rates', data);
    return response.data;
}

// Update electrical rate
export async function updateElectricalRate(id: string, data: Partial<CreateElectricalRateData>) {
    const response = await api.put(`/admin/electrical-rates/${id}`, data);
    return response.data;
}

// Delete electrical rate
export async function deleteElectricalRate(id: string) {
    const response = await api.delete(`/admin/electrical-rates/${id}`);
    return response.data;
}

// Toggle active status
export async function toggleElectricalRateStatus(id: string) {
    const response = await api.patch(`/admin/electrical-rates/${id}/toggle-status`);
    return response.data;
}

// Get statistics
export async function getElectricalRateStatistics() {
    const response = await api.get('/admin/electrical-rates/statistics');
    return response.data;
}

// Get active rate by type
export async function getActiveElectricalRate(type: 'temporary' | 'exhibition') {
    const response = await api.get(`/admin/electrical-rates/active/${type}`);
    return response.data;
}