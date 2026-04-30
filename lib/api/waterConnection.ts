// lib/api/waterConnection.ts
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

export interface WaterConnectionConfig {
    id: string;
    costPerConnection: number;
    createdAt: string;
    updatedAt: string;
}

export interface CalculateCostResponse {
    costPerConnection: number;
    numberOfConnections: number;
    totalCost: number;
}

export interface BulkCalculateItem {
    name: string;
    quantity: number;
}

export interface BulkCalculateResponse {
    items: (BulkCalculateItem & {
        costPerConnection: number;
        totalCost: number;
    })[];
    grandTotal: number;
    rateApplied: number;
}

export interface RateHistoryItem {
    costPerConnection: number;
    updatedAt: string;
}

export interface StatisticsData {
    currentRate: number;
    createdAt: string;
    lastUpdated: string;
    totalUpdates: number;
}

// Get current configuration
export async function getWaterConnectionConfig() {
    const response = await api.get('/admin/water-connection/config');
    return response.data;
}

// Update configuration (Admin only)
export async function updateWaterConnectionConfig(costPerConnection: number) {
    const response = await api.put('/admin/water-connection/config', { costPerConnection });
    return response.data;
}

// Reset to default rate (Admin only)
export async function resetWaterConnectionToDefault() {
    const response = await api.post('/admin/water-connection/reset');
    return response.data;
}

// Calculate cost for connections
export async function calculateWaterConnectionCost(connections: number) {
    const response = await api.post('/admin/water-connection/calculate', { connections });
    return response.data;
}

// Bulk calculate for multiple connection types
export async function bulkCalculateWaterConnectionCost(connections: BulkCalculateItem[]) {
    const response = await api.post('/admin/water-connection/calculate/bulk', { connections });
    return response.data;
}

// Get rate history
export async function getWaterConnectionRateHistory() {
    const response = await api.get('/admin/water-connection/history');
    return response.data;
}

// Get statistics
export async function getWaterConnectionStatistics() {
    const response = await api.get('/admin/water-connection/statistics');
    return response.data;
}