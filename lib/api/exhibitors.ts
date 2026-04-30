// lib/api/exhibitors.ts
import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

// Track if we're already redirecting
let isRedirecting = false;

api.interceptors.request.use(
    (config) => {
        if (typeof window !== "undefined") {
            const token = localStorage.getItem("adminToken");
            console.log("🔑 [Request] Token exists:", !!token);
            console.log("🔑 [Request] URL:", config.url);

            if (token) {
                config.headers.Authorization = `Bearer ${token}`;
                console.log("✅ [Request] Token added to headers");
            } else {
                console.log("❌ [Request] No token found");
            }
        }
        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => {
        console.log("✅ [Response]", response.status, response.config.url);
        return response;
    },
    (error) => {
        console.log("❌ [Response Error]", error.response?.status, error.response?.config?.url);
        console.log("❌ [Response Error Data]", error.response?.data);

        if (error.response?.status === 401 && typeof window !== "undefined" && !isRedirecting) {
            console.log("🔴 401 Unauthorized - Checking token...");
            const token = localStorage.getItem("adminToken");

            if (token) {
                console.log("⚠️ Token exists but was rejected by server");
                console.log("⚠️ Token value:", token.substring(0, 30) + "...");

                // Don't auto-redirect, just reject the promise
                // Let the component handle the error
                return Promise.reject(error);
            } else {
                console.log("❌ No token found, redirecting to login");
                isRedirecting = true;
                localStorage.removeItem("adminToken");
                localStorage.removeItem("adminUser");
                window.location.href = "/admin/login";
                setTimeout(() => { isRedirecting = false; }, 1000);
            }
        }
        return Promise.reject(error);
    }
);

// ============================================
// INTERFACES - ADD THESE EXPORTS
// ============================================

export interface StallDetails {
    size?: string;
    type?: string;
    dimensions?: string;
    notes?: string;
    price?: string;
}

export interface Exhibitor {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    sector?: string;
    boothNumber?: string;
    status: 'pending' | 'active' | 'approved' | 'inactive' | 'rejected';
    originalPassword?: string;
    stallDetails?: StallDetails;
    address?: string;
    website?: string;
    createdAt: string;
    updatedAt: string;
    lastLogin?: string;
}

export interface CreateExhibitorData {
    name: string;
    email: string;
    phone: string;
    company: string;
    sector?: string;
    boothNumber?: string;
    password: string;
    status?: string;
    boothSize?: string;
    boothType?: string;
    boothDimensions?: string;
    boothNotes?: string;
    boothPrice?: string;
    address?: string;
    website?: string;
}

// ============================================
// API FUNCTIONS
// ============================================

export async function getExhibitors(params?: {
    page?: number;
    limit?: number;
    search?: string;
    sector?: string;
    status?: string;
}) {
    const response = await api.get('/exhibitors', { params });
    return response.data;
}

export async function getExhibitor(id: string) {
    const response = await api.get(`/exhibitors/${id}`);
    return response.data;
}

export async function createExhibitor(data: CreateExhibitorData) {
    console.log("📡 [createExhibitor] Making request with data:", data);
    const response = await api.post("/exhibitors", data);
    return response.data;
}

export async function updateExhibitor(id: string, data: Partial<CreateExhibitorData>) {
    const response = await api.put(`/exhibitors/${id}`, data);
    return response.data;
}

export async function deleteExhibitor(id: string) {
    const response = await api.delete(`/exhibitors/${id}`);
    return response.data;
}

export async function bulkUpdateStatus(ids: string[], status: string) {
    const response = await api.post('/exhibitors/bulk/update-status', { ids, status });
    return response.data;
}

export async function resendCredentials(id: string) {
    const response = await api.post(`/exhibitors/${id}/resend-credentials`);
    return response.data;
}

export async function getExhibitorProducts(id: string) {
    const response = await api.get(`/exhibitors/${id}/products`);
    return response.data;
}

export async function getExhibitorBrands(id: string) {
    const response = await api.get(`/exhibitors/${id}/brands`);
    return response.data;
}

export async function getExhibitorBrochures(id: string) {
    const response = await api.get(`/exhibitors/${id}/brochures`);
    return response.data;
}