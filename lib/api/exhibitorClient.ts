import axios from 'axios';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const exhibitorClient = axios.create({
    baseURL: API_BASE,
    headers: {
        'Content-Type': 'application/json',
    },
});

// Add auth token
exhibitorClient.interceptors.request.use((config) => {
    const token = localStorage.getItem('tyre_expo_token') || localStorage.getItem('exhibitorToken');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

// Handle 401
exhibitorClient.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('tyre_expo_token');
            localStorage.removeItem('exhibitorToken');
            localStorage.removeItem('exhibitorData');
            window.location.href = '/exhibitor/login';
        }
        return Promise.reject(error);
    }
);

// ============================================
// AUTH ENDPOINTS
// ============================================

export const authAPI = {
    login: async (email: string, password: string) => {
        const response = await exhibitorClient.post('/auth/exhibitor/login', { email, password });
        return response.data;
    },
    register: async (data: any) => {
        const response = await exhibitorClient.post('/auth/exhibitor/register', data);
        return response.data;
    },
    forgotPassword: async (email: string) => {
        const response = await exhibitorClient.post('/auth/exhibitor/forgot-password', { email });
        return response.data;
    },
    resetPassword: async (token: string, password: string) => {
        const response = await exhibitorClient.post('/auth/exhibitor/reset-password', { token, password });
        return response.data;
    },
    changePassword: async (oldPassword: string, newPassword: string) => {
        const response = await exhibitorClient.post('/auth/exhibitor/change-password', { oldPassword, newPassword });
        return response.data;
    },
};

// ============================================
// DASHBOARD ENDPOINTS
// ============================================

export const dashboardAPI = {
    getProfile: async () => {
        const response = await exhibitorClient.get('/exhibitorDashboard/profile');
        return response.data;
    },
    getProducts: async () => {
        const response = await exhibitorClient.get('/exhibitorDashboard/products');
        return response.data;
    },
    getBrands: async () => {
        const response = await exhibitorClient.get('/exhibitorDashboard/brands');
        return response.data;
    },
    getBrochures: async () => {
        const response = await exhibitorClient.get('/exhibitorDashboard/brochures');
        return response.data;
    },
    getRequirements: async () => {
        const response = await exhibitorClient.get('/exhibitorDashboard/requirements');
        return response.data;
    },
    getStats: async () => {
        try {
            const [products, brands, brochures, requirements] = await Promise.all([
                exhibitorClient.get('/exhibitorDashboard/products'),
                exhibitorClient.get('/exhibitorDashboard/brands'),
                exhibitorClient.get('/exhibitorDashboard/brochures'),
                exhibitorClient.get('/exhibitorDashboard/requirements'),
            ]);

            return {
                success: true,
                data: {
                    products: products.data?.data?.length || 0,
                    brands: brands.data?.data?.length || 0,
                    brochures: brochures.data?.data?.length || 0,
                    pendingRequirements: requirements.data?.data?.filter((r: any) => r.status === 'pending').length || 0,
                }
            };
        } catch (error) {
            console.error('Error fetching stats:', error);
            return {
                success: false,
                data: {
                    products: 0,
                    brands: 0,
                    brochures: 0,
                    pendingRequirements: 0,
                }
            };
        }
    },
};

// ============================================
// PROFILE ENDPOINTS (UPDATED)
// ============================================

export interface CompanyProfile {
    id: string;
    name: string;
    email: string;
    phone: string;
    company: string;
    boothNumber?: string;
    status: string;
    website?: string;
    address?: string;
    description?: string;
    logoUrl?: string;
    shortName?: string;
    registrationNumber?: string;
    yearEstablished?: string;
    companySize?: string;
    companyType?: string;
    gstNumber?: string;
    businessNature?: string;
    contactPersonName?: string;
    contactPersonJobTitle?: string;
    alternatePhone?: string;
    city?: string;
    state?: string;
    pincode?: string;
    country?: string;
    metadata?: any;
}


export const profileAPI = {
    get: async (): Promise<{ success: boolean; data: CompanyProfile }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/profile');
        return response.data;
    },
    update: async (data: any): Promise<{ success: boolean; data: CompanyProfile; message?: string; error?: string }> => {
        const response = await exhibitorClient.put('/exhibitorDashboard/profile', data);
        return response.data;
    },
    // Use the new upload endpoint that accepts file directly
    uploadLogo: async (file: File): Promise<{ success: boolean; data: { logoUrl: string; publicId: string }; error?: string }> => {
        const formData = new FormData();
        formData.append('logo', file);
        const response = await exhibitorClient.post('/exhibitorDashboard/profile/logo/upload', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
    deleteLogo: async (): Promise<{ success: boolean; message: string; error?: string }> => {
        const response = await exhibitorClient.delete('/exhibitorDashboard/profile/logo');
        return response.data;
    },
};

// ============================================
// PRODUCTS ENDPOINTS
// ============================================

export interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    specifications: string;
    imageUrl: string;
    price?: string;
    createdAt?: string;
    updatedAt?: string;
}

export const productsAPI = {
    getAll: async (): Promise<{ success: boolean; data: Product[] }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/products');
        return response.data;
    },
    getById: async (id: string): Promise<{ success: boolean; data: Product }> => {
        const response = await exhibitorClient.get(`/exhibitorDashboard/products/${id}`);
        return response.data;
    },
    create: async (data: any): Promise<{ success: boolean; data: Product; error?: string }> => {
        const response = await exhibitorClient.post('/exhibitorDashboard/products', data);
        return response.data;
    },
    update: async (id: string, data: any): Promise<{ success: boolean; data: Product; error?: string }> => {
        const response = await exhibitorClient.put(`/exhibitorDashboard/products/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<{ success: boolean; message: string; error?: string }> => {
        const response = await exhibitorClient.delete(`/exhibitorDashboard/products/${id}`);
        return response.data;
    },
};

// ============================================
// BRANDS ENDPOINTS
// ============================================

export interface Brand {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
    logoPath?: string;
    isPublic?: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export const brandsAPI = {
    getAll: async (): Promise<{ success: boolean; data: Brand[] }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/brands');
        return response.data;
    },
    getById: async (id: string): Promise<{ success: boolean; data: Brand }> => {
        const response = await exhibitorClient.get(`/exhibitorDashboard/brands/${id}`);
        return response.data;
    },
    create: async (data: any): Promise<{ success: boolean; data: Brand; error?: string }> => {
        const response = await exhibitorClient.post('/exhibitorDashboard/brands', data);
        return response.data;
    },
    update: async (id: string, data: any): Promise<{ success: boolean; data: Brand; error?: string }> => {
        const response = await exhibitorClient.put(`/exhibitorDashboard/brands/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<{ success: boolean; message: string; error?: string }> => {
        const response = await exhibitorClient.delete(`/exhibitorDashboard/brands/${id}`);
        return response.data;
    },
    uploadLogo: async (id: string, file: File): Promise<{ success: boolean; data: { logoUrl: string }; error?: string }> => {
        const formData = new FormData();
        formData.append('logo', file);
        const response = await exhibitorClient.put(`/exhibitorDashboard/brands/${id}/logo`, formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
};

// ============================================
// BROCHURES ENDPOINTS
// ============================================

export interface Brochure {
    id: string;
    name: string;
    title: string;
    description: string;
    fileUrl: string;
    filePath?: string;
    fileName?: string;
    fileSize: number;
    fileType?: string;
    downloads: number;
    isPublic?: boolean;
    createdAt: string;
    updatedAt?: string;
}

export const brochuresAPI = {
    getAll: async (): Promise<{ success: boolean; data: Brochure[] }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/brochures');
        return response.data;
    },
    getById: async (id: string): Promise<{ success: boolean; data: Brochure }> => {
        const response = await exhibitorClient.get(`/exhibitorDashboard/brochures/${id}`);
        return response.data;
    },
    upload: async (title: string, description: string, file: File): Promise<{ success: boolean; data: Brochure; error?: string }> => {
        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('file', file);
        const response = await exhibitorClient.post('/exhibitorDashboard/brochures', formData, {
            headers: { 'Content-Type': 'multipart/form-data' },
        });
        return response.data;
    },
    update: async (id: string, data: any): Promise<{ success: boolean; data: Brochure; error?: string }> => {
        const response = await exhibitorClient.put(`/exhibitorDashboard/brochures/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<{ success: boolean; message: string; error?: string }> => {
        const response = await exhibitorClient.delete(`/exhibitorDashboard/brochures/${id}`);
        return response.data;
    },
};

// ============================================
// REQUIREMENTS ENDPOINTS
// ============================================

export interface Requirement {
    id: string;
    type: string;
    title?: string;
    description: string;
    quantity?: number;
    category?: string;
    priority?: string;
    status: 'pending' | 'in-progress' | 'completed' | 'rejected';
    exhibitorId?: string;
    data?: any;
    createdAt: string;
    updatedAt?: string;
}

export const requirementsAPI = {
    getAll: async (): Promise<{ success: boolean; data: Requirement[] }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/requirements');
        return response.data;
    },
    getById: async (id: string): Promise<{ success: boolean; data: Requirement }> => {
        const response = await exhibitorClient.get(`/exhibitorDashboard/requirements/${id}`);
        return response.data;
    },
    create: async (data: any): Promise<{ success: boolean; data: Requirement; error?: string }> => {
        const response = await exhibitorClient.post('/exhibitorDashboard/requirements', data);
        return response.data;
    },
    update: async (id: string, data: any): Promise<{ success: boolean; data: Requirement; error?: string }> => {
        const response = await exhibitorClient.put(`/exhibitorDashboard/requirements/${id}`, data);
        return response.data;
    },
    delete: async (id: string): Promise<{ success: boolean; message: string; error?: string }> => {
        const response = await exhibitorClient.delete(`/exhibitorDashboard/requirements/${id}`);
        return response.data;
    },
};

// ============================================
// BOOTH ENDPOINTS (UPDATED)
// ============================================

export interface BoothDetails {
    boothNo: string;
    sqMtrBooked: string;
    organisation: string;
    contactPerson: string;
    designation: string;
    mobile: string;
    email: string;
    contractorCompany: string;
    contractorPerson: string;
    contractorMobile: string;
    contractorEmail: string;
    contractorGST: string;
    contractorPAN: string;
    status?: 'pending' | 'approved' | 'rejected';
    submittedAt?: string;
    approvedAt?: string;
}

export interface StallDetailsResponse {
    boothNumber: string;
    size: string;
    type: string;
    dimensions: string;
    notes: string;
    price: string;
    status: 'pending' | 'approved' | 'rejected' | 'confirmed';
    stallDetails?: {
        size: string;
        type: string;
        dimensions: string;
        notes: string;
        price: string;
    };
}

export const boothAPI = {
    getDetails: async (): Promise<{ success: boolean; data: StallDetailsResponse }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/booth');
        return response.data;
    },
    saveDetails: async (data: any): Promise<{ success: boolean; data?: any; error?: string }> => {
        const response = await exhibitorClient.post('/exhibitorDashboard/booth', data);
        return response.data;
    },
    updateContractor: async (data: Partial<BoothDetails>): Promise<{ success: boolean; data?: any; error?: string }> => {
        const response = await exhibitorClient.put('/exhibitorDashboard/booth/contractor', data);
        return response.data;
    },
    getGuidelines: async (): Promise<{ success: boolean; data: any; error?: string }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/booth/guidelines');
        return response.data;
    },
    submitForApproval: async (): Promise<{ success: boolean; message: string; error?: string }> => {
        const response = await exhibitorClient.post('/exhibitorDashboard/booth/submit');
        return response.data;
    },
};

// ============================================
// FLOOR PLAN ENDPOINTS
// ============================================

export interface FloorPlan {
    id: string;
    name: string;
    floor: string;
    gridSize: { rows: number; cols: number };
    booths: any[];
    isActive: boolean;
    createdAt?: string;
    updatedAt?: string;
}

export interface Booth {
    boothNumber: string;
    status: 'available' | 'booked' | 'reserved' | 'maintenance';
    size: string;
    price: number;
    position: { x: number; y: number };
    exhibitorId?: string;
    exhibitorName?: string;
}

export const floorPlanAPI = {
    get: async (): Promise<{ success: boolean; data: FloorPlan; error?: string }> => {
        const response = await exhibitorClient.get('/floor-plan');
        return response.data;
    },
    getActive: async (): Promise<{ success: boolean; data: FloorPlan; error?: string }> => {
        const response = await exhibitorClient.get('/floor-plan/active');
        return response.data;
    },
    getStatistics: async (): Promise<{ success: boolean; data: any; error?: string }> => {
        const response = await exhibitorClient.get('/floor-plan/statistics');
        return response.data;
    },
    getBoothByNumber: async (boothNumber: string): Promise<{ success: boolean; data: Booth; error?: string }> => {
        const response = await exhibitorClient.get(`/floor-plan/booth/${boothNumber}`);
        return response.data;
    },
    requestBooth: async (boothNumber: string): Promise<{ success: boolean; message: string; error?: string }> => {
        const response = await exhibitorClient.post('/floor-plan/request-booth', { boothNumber });
        return response.data;
    },
    getAllBooths: async (): Promise<{ success: boolean; data: Booth[]; error?: string }> => {
        const response = await exhibitorClient.get('/floor-plan/booths');
        return response.data;
    },
};

// ============================================
// INVOICE ENDPOINTS
// ============================================

export interface Invoice {
    id: string;
    invoiceNumber: string;
    amount: number;
    status: 'pending' | 'paid' | 'overdue' | 'cancelled';
    dueDate: string;
    issueDate: string;
    paidDate?: string;
    exhibitorId: string;
    items: any[];
    createdAt: string;
    updatedAt: string;
}

export const invoiceAPI = {
    getAll: async (): Promise<{ success: boolean; data: Invoice[]; error?: string }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/invoices');
        return response.data;
    },
    getById: async (id: string): Promise<{ success: boolean; data: Invoice; error?: string }> => {
        const response = await exhibitorClient.get(`/exhibitorDashboard/invoices/${id}`);
        return response.data;
    },
    downloadPdf: async (id: string): Promise<Blob> => {
        const response = await exhibitorClient.get(`/exhibitorDashboard/invoices/${id}/pdf`, {
            responseType: 'blob',
        });
        return response.data;
    },
    pay: async (id: string, method: string, transactionId?: string): Promise<{ success: boolean; data: any; error?: string }> => {
        const response = await exhibitorClient.post(`/exhibitorDashboard/invoices/${id}/pay`, { method, transactionId });
        return response.data;
    },
};

// ============================================
// MANUAL ENDPOINTS
// ============================================

export interface ManualSection {
    id: string;
    title: string;
    content: string;
    order?: number;
}

export const manualAPI = {
    get: async (): Promise<{ success: boolean; data: { sections: ManualSection[] }; error?: string }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/manual');
        return response.data;
    },
    getSection: async (sectionId: string): Promise<{ success: boolean; data: ManualSection; error?: string }> => {
        const response = await exhibitorClient.get(`/exhibitorDashboard/manual/${sectionId}`);
        return response.data;
    },
};

export default exhibitorClient;