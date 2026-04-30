// lib/api/floorPlan.ts
import axios from 'axios';
import { getAdminToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
    const token = getAdminToken();
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export interface Booth {
    id: string;
    number: string;
    status: 'available' | 'booked' | 'reserved';
    company?: string;
    exhibitorId?: string;
    x: number;
    y: number;
    width: number;
    height: number;
    type?: string;
    size?: string;
    price?: number;
}

export interface FloorPlanData {
    success: boolean;
    data: {
        floorPlan: {
            imageUrl: string | null;
            booths: Booth[];
        };
    };
}

// Get floor plan (matches your existing GET /api/floor-plan)
export async function getFloorPlan() {
    const response = await api.get('/floor-plan');
    return response.data;
}

// Get active floor plan - use the same endpoint since your backend returns active by default
export async function getActiveFloorPlan() {
    const response = await api.get('/floor-plan');
    return response.data;
}

// Upload floor plan image (matches your POST /api/floor-plan/upload-image)
export async function uploadFloorPlanImage(file: File) {
    const formData = new FormData();
    formData.append('image', file);
    const response = await api.post('/floor-plan/upload-image', formData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
}

// Reset floor plan (matches your POST /api/floor-plan/reset)
export async function resetFloorPlan() {
    const response = await api.post('/floor-plan/reset');
    return response.data;
}

// Save floor plan (matches your POST /api/floor-plan/save-floor-plan)
export async function saveFloorPlan(booths: Booth[]) {
    const response = await api.post('/floor-plan/save-floor-plan', { booths });
    return response.data;
}

// Add booth (matches your POST /api/floor-plan/booth)
export async function addBooth(boothData: Partial<Booth>) {
    const response = await api.post('/floor-plan/booth', boothData);
    return response.data;
}

// Update booth (matches your PUT /api/floor-plan/booth/:boothId)
export async function updateBooth(boothId: string, data: Partial<Booth>) {
    const response = await api.put(`/floor-plan/booth/${boothId}`, data);
    return response.data;
}

// Delete booth (matches your DELETE /api/floor-plan/booth/:boothId)
export async function deleteBooth(boothId: string) {
    const response = await api.delete(`/floor-plan/booth/${boothId}`);
    return response.data;
}

// Get booth statistics (matches your GET /api/floor-plan/statistics)
export async function getBoothStatistics() {
    const response = await api.get('/floor-plan/statistics');
    return response.data;
}

// Get available exhibitors for booth assignment
export async function getAvailableExhibitors() {
    const response = await api.get('/exhibitors', {
        params: { status: 'approved', limit: 100 }
    });
    return response.data;
}