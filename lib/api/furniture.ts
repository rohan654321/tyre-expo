// lib/api/furniture.ts
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

export interface Furniture {
    id: string;
    code: string;
    description: string;
    size: string | null;
    cost3Days: number;
    category: string;
    inStock: boolean;
    imageUrl: string | null;
    cloudinaryPublicId: string | null;
    createdAt: string;
    updatedAt: string;
}

export interface CreateFurnitureData {
    code: string;
    description: string;
    size?: string;
    cost3Days: number;
    category: string;
    inStock: boolean;
}

// Get all furniture with filters
export async function getFurniture(params?: {
    category?: string;
    inStock?: boolean;
    search?: string;
}) {
    const response = await api.get('/admin/furniture', { params });
    return response.data;
}

// Get furniture by ID
export async function getFurnitureById(id: string) {
    const response = await api.get(`/admin/furniture/${id}`);
    return response.data;
}

// Create furniture with image
export async function createFurniture(data: CreateFurnitureData, imageFile?: File) {
    const formData = new FormData();
    formData.append('code', data.code);
    formData.append('description', data.description);
    if (data.size) formData.append('size', data.size);
    formData.append('cost3Days', data.cost3Days.toString());
    formData.append('category', data.category);
    formData.append('inStock', data.inStock.toString());
    if (imageFile) formData.append('image', imageFile);

    const response = await api.post('/admin/furniture', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

// Update furniture with image
export async function updateFurniture(id: string, data: Partial<CreateFurnitureData>, imageFile?: File) {
    const formData = new FormData();
    if (data.code) formData.append('code', data.code);
    if (data.description) formData.append('description', data.description);
    if (data.size) formData.append('size', data.size);
    if (data.cost3Days) formData.append('cost3Days', data.cost3Days.toString());
    if (data.category) formData.append('category', data.category);
    if (data.inStock !== undefined) formData.append('inStock', data.inStock.toString());
    if (imageFile) formData.append('image', imageFile);

    const response = await api.put(`/admin/furniture/${id}`, formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

// Delete furniture
export async function deleteFurniture(id: string) {
    const response = await api.delete(`/admin/furniture/${id}`);
    return response.data;
}

// Bulk delete furniture
export async function bulkDeleteFurniture(ids: string[]) {
    const response = await api.delete('/admin/furniture/bulk/delete', { data: { ids } });
    return response.data;
}

// Update stock status - FIXED: Using PATCH method with correct endpoint
export async function updateStockStatus(id: string, inStock: boolean) {
    const response = await api.patch(`/admin/furniture/${id}/stock`, { inStock });
    return response.data;
}

// Get furniture statistics
export async function getFurnitureStatistics() {
    const response = await api.get('/admin/furniture/statistics');
    return response.data;
}

// Get furniture by category
export async function getFurnitureByCategory(category: string) {
    const response = await api.get(`/admin/furniture/category/${category}`);
    return response.data;
}

// Search furniture
export async function searchFurniture(query: string) {
    const response = await api.get('/admin/furniture/search', { params: { q: query } });
    return response.data;
}