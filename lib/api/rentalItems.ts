import axios from "axios";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
    if (typeof window !== "undefined") {
        const token = localStorage.getItem("adminToken");
        if (token) config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface RentalItem {
    id: string;
    itemKey: string;
    code: string;
    name: string;
    description: string;
    costFor3Days: number;
    category: 'AV' | 'IT' | 'Other';
    isActive: boolean;
    imageUrl: string | null;
    cloudinaryPublicId: string | null;
    displayOrder: number;
    createdAt: string;
    updatedAt: string;
}

export interface CreateRentalItemData {
    code: string;
    name: string;
    description: string;
    costFor3Days: number;
    category: 'AV' | 'IT' | 'Other';
    isActive: boolean;
    displayOrder?: number;
}

const generateItemKey = () => `RENTAL_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

export async function getRentalItems(params?: { category?: string; isActive?: boolean; search?: string }) {
    const response = await api.get('/admin/rental-items', { params });
    return response.data;
}

export async function getRentalItemById(id: string) {
    const response = await api.get(`/admin/rental-items/${id}`);
    return response.data;
}

export async function createRentalItem(data: CreateRentalItemData, imageFile?: File) {
    const formData = new FormData();
    formData.append('itemKey', generateItemKey());
    formData.append('code', data.code);
    formData.append('name', data.name);
    formData.append('description', data.description);
    formData.append('costFor3Days', data.costFor3Days.toString());
    formData.append('category', data.category);
    formData.append('isActive', data.isActive.toString());
    if (data.displayOrder) formData.append('displayOrder', data.displayOrder.toString());
    if (imageFile) formData.append('image', imageFile);

    const response = await api.post('/admin/rental-items', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
}

export async function updateRentalItem(id: string, data: Partial<CreateRentalItemData>, imageFile?: File) {
    const formData = new FormData();
    if (data.code) formData.append('code', data.code);
    if (data.name) formData.append('name', data.name);
    if (data.description) formData.append('description', data.description);
    if (data.costFor3Days) formData.append('costFor3Days', data.costFor3Days.toString());
    if (data.category) formData.append('category', data.category);
    if (data.isActive !== undefined) formData.append('isActive', data.isActive.toString());
    if (data.displayOrder) formData.append('displayOrder', data.displayOrder.toString());
    if (imageFile) formData.append('image', imageFile);

    const response = await api.put(`/admin/rental-items/${id}`, formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
    });
    return response.data;
}

export async function deleteRentalItem(id: string) {
    const response = await api.delete(`/admin/rental-items/${id}`);
    return response.data;
}

export async function updateRentalItemStatus(id: string, isActive: boolean) {
    try {
        const response = await api.patch(`/admin/rental-items/${id}/status`, { isActive });
        return response.data;
    } catch (error: any) {
        if (error.response?.status === 404) {
            const item = await getRentalItemById(id);
            if (item.success) {
                const formData = new FormData();
                formData.append('code', item.data.code);
                formData.append('name', item.data.name);
                formData.append('description', item.data.description);
                formData.append('costFor3Days', item.data.costFor3Days.toString());
                formData.append('category', item.data.category);
                formData.append('isActive', isActive.toString());
                formData.append('displayOrder', item.data.displayOrder.toString());

                const response = await api.put(`/admin/rental-items/${id}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                return response.data;
            }
        }
        throw error;
    }
}