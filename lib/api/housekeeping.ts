// lib/api/housekeeping.ts
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

export interface HousekeepingConfig {
    id: string;
    ratePerShift: number;  // Changed from ratePerStaffPerDay
    shiftHours: number;
    createdAt: string;
    updatedAt: string;
}

// Get current housekeeping configuration
export async function getHousekeepingConfig() {
    const response = await api.get('/admin/housekeeping/config');
    return response.data;
}

// Update housekeeping configuration - FIXED to match backend
export async function updateHousekeepingConfig(data: { ratePerShift: number; shiftHours: number }) {
    const response = await api.put('/admin/housekeeping/config', data);
    return response.data;
}

// Calculate cost for housekeeping staff
export async function calculateHousekeepingCost(quantity: number, days: number) {
    const response = await api.post('/admin/housekeeping/calculate', { quantity, days });
    return response.data;
}

// Calculate with shifts
export async function calculateWithShifts(shifts: number) {
    const response = await api.post('/admin/housekeeping/calculate/shifts', { shifts });
    return response.data;
}

// Calculate custom hours
export async function calculateCustomHours(hours: number, staff: number) {
    const response = await api.post('/admin/housekeeping/calculate/custom', { hours, staff });
    return response.data;
}

// Get rate history
export async function getHousekeepingRateHistory() {
    const response = await api.get('/admin/housekeeping/history');
    return response.data;
}

// Reset to default
export async function resetHousekeepingToDefault() {
    const response = await api.post('/admin/housekeeping/reset');
    return response.data;
}

// Get statistics
export async function getHousekeepingStatistics() {
    const response = await api.get('/admin/housekeeping/stats');
    return response.data;
}