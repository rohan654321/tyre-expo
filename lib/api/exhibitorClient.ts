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
// MANUAL ENDPOINTS (FIXED)
// ============================================

export interface ManualSection {
    id: string;
    title: string;
    content: string;
    order?: number;
}

export const manualAPI = {
    get: async (): Promise<{ success: boolean; data: { sections: ManualSection[] }; error?: string }> => {
        try {
            const response = await exhibitorClient.get('/exhibitorDashboard/manual');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching manual:', error);
            // Return default manual content if API fails
            return {
                success: true,
                data: {
                    sections: [
                        {
                            id: '1',
                            title: 'Exhibitor Manual',
                            content: 'Welcome to the India Tyre Expo 2027. This manual contains important information for exhibitors.',
                            order: 1
                        },
                        {
                            id: '2',
                            title: 'Important Dates',
                            content: '• Setup: March 15-17, 2027\n• Exhibition: March 18-21, 2027\n• Dismantle: March 22, 2027',
                            order: 2
                        },
                        {
                            id: '3',
                            title: 'Booth Guidelines',
                            content: 'Maximum height: 4 meters. Carpet required. No storage behind booths.',
                            order: 3
                        }
                    ]
                }
            };
        }
    },

    getSection: async (sectionId: string): Promise<{ success: boolean; data: ManualSection; error?: string }> => {
        try {
            const response = await exhibitorClient.get(`/exhibitorDashboard/manual/${sectionId}`);
            return response.data;
        } catch (error: any) {
            console.error('Error fetching section:', error);
            return {
                success: false,
                error: error.message || 'Failed to fetch section',
                data: null as any
            };
        }
    }
};

// ============================================
// FURNITURE / AV RENTAL ITEMS ENDPOINTS
// ============================================

export interface RentalItem {
    id: string;
    name: string;
    description: string;
    category: string;
    pricePerDay: number;
    imageUrl: string;
    isActive: boolean;
    displayOrder: number;
}

export const rentalItemsAPI = {
    // Get all rental items (AV & IT Rentals)
    getAll: async (): Promise<{ success: boolean; data: RentalItem[] }> => {
        const response = await exhibitorClient.get('/admin/rental-items');
        return response.data;
    },

    // Get items by category
    getByCategory: async (category: string): Promise<{ success: boolean; data: RentalItem[] }> => {
        const response = await exhibitorClient.get(`/admin/rental-items/category/${category}`);
        return response.data;
    },

    // Calculate cost
    calculateCost: async (items: Array<{ id: string; quantity: number; days: number }>): Promise<{ success: boolean; total: number; details: any }> => {
        const response = await exhibitorClient.post('/admin/rental-items/calculate', { items });
        return response.data;
    }
};

// ============================================
// FURNITURE ENDPOINTS
// ============================================

export interface FurnitureItem {
    id: string;
    name: string;
    description: string;
    category: string;
    pricePerDay: number;
    imageUrl: string;
    stockStatus: string;
    inStock: boolean;
}

export const furnitureAPI = {
    // Get all furniture items
    getAll: async (): Promise<{ success: boolean; data: FurnitureItem[] }> => {
        const response = await exhibitorClient.get('/admin/furniture');
        return response.data;
    },

    // Get furniture by category
    getByCategory: async (category: string): Promise<{ success: boolean; data: FurnitureItem[] }> => {
        const response = await exhibitorClient.get(`/admin/furniture/category/${category}`);
        return response.data;
    },

    // Search furniture
    search: async (query: string): Promise<{ success: boolean; data: FurnitureItem[] }> => {
        const response = await exhibitorClient.get(`/admin/furniture/search?q=${query}`);
        return response.data;
    },

    // Get single item
    getById: async (id: string): Promise<{ success: boolean; data: FurnitureItem }> => {
        const response = await exhibitorClient.get(`/admin/furniture/${id}`);
        return response.data;
    }
};

// ============================================
// HOSTESS SERVICES ENDPOINTS (FIXED)
// ============================================

export interface HostessCategory {
    id: string;
    type: 'A' | 'B';
    name: string;
    description: string;
    ratePerDay: number;
    languages: string[];
    isActive: boolean;
}

export const hostessAPI = {
    // Get all categories with fallback
    getAll: async (): Promise<{ success: boolean; data: HostessCategory[] }> => {
        try {
            const response = await exhibitorClient.get('/admin/hostess-rates');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching hostess categories:', error);
            // Return fallback data on error
            return {
                success: true,
                data: [
                    {
                        id: '1',
                        type: 'A',
                        name: 'Professional',
                        description: 'English/Hindi speaking hostesses with event experience',
                        ratePerDay: 5000,
                        languages: ['English', 'Hindi'],
                        isActive: true
                    },
                    {
                        id: '2',
                        type: 'B',
                        name: 'Bilingual',
                        description: 'English + Regional language speaking hostesses',
                        ratePerDay: 4000,
                        languages: ['English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Bengali'],
                        isActive: true
                    }
                ]
            };
        }
    },

    // Get by type
    getByType: async (type: 'A' | 'B'): Promise<{ success: boolean; data: HostessCategory }> => {
        try {
            const response = await exhibitorClient.get(`/admin/hostess-rates/type/${type}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching ${type} category:`, error);
            // Return fallback
            return {
                success: true,
                data: type === 'A'
                    ? { id: '1', type: 'A', name: 'Professional', description: 'Professional hostess', ratePerDay: 5000, languages: ['English', 'Hindi'], isActive: true }
                    : { id: '2', type: 'B', name: 'Bilingual', description: 'Bilingual hostess', ratePerDay: 4000, languages: ['English', 'Regional'], isActive: true }
            };
        }
    },

    // Calculate cost
    calculateCost: async (categoryA: number, categoryB: number, days: number): Promise<{ success: boolean; total: number; details: any }> => {
        try {
            const response = await exhibitorClient.post('/admin/hostess-rates/calculate', { categoryA, categoryB, days });
            return response.data;
        } catch (error) {
            console.error('Error calculating cost:', error);
            // Fallback calculation
            const total = (categoryA * 5000 + categoryB * 4000) * days;
            return {
                success: true,
                total,
                details: { calculated: 'local' }
            };
        }
    }
};

// ============================================
// SECURITY GUARD ENDPOINTS (FIXED)
// ============================================

export interface SecurityGuardConfig {
    costPerGuardPerDay: number;
    shifts: {
        day: { start: string; end: string; multiplier: number };
        night: { start: string; end: string; multiplier: number };
        '24': { multiplier: number };
    };
}

export const securityGuardAPI = {
    // Get configuration with fallback
    getConfig: async (): Promise<{ success: boolean; data: SecurityGuardConfig }> => {
        try {
            const response = await exhibitorClient.get('/admin/security-guard/config');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching security guard config:', error);
            // Return default config on error
            return {
                success: true,
                data: {
                    costPerGuardPerDay: 2500,
                    shifts: {
                        day: { start: '09:00', end: '18:00', multiplier: 1 },
                        night: { start: '18:00', end: '09:00', multiplier: 1.5 },
                        '24': { multiplier: 2 }
                    }
                }
            };
        }
    },

    // Calculate cost
    calculateCost: async (quantity: number, days: number, shiftType: string): Promise<{ success: boolean; total: number; costPerGuard: number }> => {
        try {
            const response = await exhibitorClient.post('/admin/security-guard/calculate', { quantity, days, shiftType });
            return response.data;
        } catch (error) {
            console.error('Error calculating cost:', error);
            // Fallback calculation
            const multiplier = shiftType === '24' ? 2 : (shiftType === 'night' ? 1.5 : 1);
            const total = quantity * days * 2500 * multiplier;
            return {
                success: true,
                total,
                costPerGuard: 2500
            };
        }
    }
};

// ============================================
// HOUSEKEEPING ENDPOINTS (FIXED)
// ============================================

export interface HousekeepingConfig {
    costPerStaffPerShift: number;
    shiftsPerDay: number;
    shiftHours: number;
}

export const housekeepingAPI = {
    // Get configuration with fallback
    getConfig: async (): Promise<{ success: boolean; data: HousekeepingConfig }> => {
        try {
            const response = await exhibitorClient.get('/admin/housekeeping/config');
            return response.data;
        } catch (error: any) {
            console.error('Error fetching housekeeping config:', error);
            // Return default config on error
            return {
                success: true,
                data: {
                    costPerStaffPerShift: 2000,
                    shiftsPerDay: 2,
                    shiftHours: 8
                }
            };
        }
    },

    // Calculate cost
    calculateCost: async (staffCount: number, days: number, shifts: number): Promise<{ success: boolean; total: number; costPerStaff: number }> => {
        try {
            const response = await exhibitorClient.post('/admin/housekeeping/calculate', { staffCount, days, shifts });
            return response.data;
        } catch (error) {
            console.error('Error calculating cost:', error);
            // Fallback calculation
            const total = staffCount * shifts * days * 2000;
            return {
                success: true,
                total,
                costPerStaff: 2000
            };
        }
    }
};

// ============================================
// WATER CONNECTION ENDPOINTS
// ============================================

export interface WaterConnectionConfig {
    costPerConnection: number;
    gstPercentage: number;
}

export const waterConnectionAPI = {
    // Get configuration
    getConfig: async (): Promise<{ success: boolean; data: WaterConnectionConfig }> => {
        const response = await exhibitorClient.get('/admin/water-connection/config');
        return response.data;
    },

    // Calculate cost
    calculateCost: async (connections: number): Promise<{ success: boolean; total: number; costPerConnection: number }> => {
        const response = await exhibitorClient.post('/admin/water-connection/calculate', { connections });
        return response.data;
    }
};

// ============================================
// COMPRESSED AIR ENDPOINTS
// ============================================

export interface CompressedAirOption {
    id: string;
    name: string;
    cfmRange: string;
    powerKW: number;
    costPerConnection: number;
    isActive: boolean;
}

export const compressedAirAPI = {
    // Get all options
    getAll: async (): Promise<{ success: boolean; data: CompressedAirOption[] }> => {
        const response = await exhibitorClient.get('/admin/compressed-air');
        return response.data;
    },

    // Calculate cost
    calculateCost: async (optionId: string, quantity: number): Promise<{ success: boolean; total: number; details: any }> => {
        const response = await exhibitorClient.post('/admin/compressed-air/calculate', { optionId, quantity });
        return response.data;
    }
};

// ============================================
// SECURITY DEPOSIT ENDPOINTS
// ============================================

export interface SecurityDepositTier {
    id: string;
    category: string;
    minSqMtr: number;
    maxSqMtr: number;
    amountINR: number;
    amountUSD: number;
    isActive: boolean;
}

export const securityDepositAPI = {
    // Get active deposits
    getActive: async (): Promise<{ success: boolean; data: SecurityDepositTier[] }> => {
        const response = await exhibitorClient.get('/admin/security-deposit/active');
        return response.data;
    },

    // Get by booth area
    getByBoothArea: async (sqMtr: number): Promise<{ success: boolean; data: SecurityDepositTier }> => {
        const response = await exhibitorClient.post('/admin/security-deposit/calculate', { boothArea: sqMtr });
        return response.data;
    }
};

// ============================================
// ELECTRICAL RATES ENDPOINTS (FIXED)
// ============================================

export interface ElectricalRate {
    id: string;
    type: 'temporary' | 'exhibition';
    ratePerKW: number;
    isActive: boolean;
}

export const electricalAPI = {
    // Get active rates with error handling
    getActiveRates: async (): Promise<{ success: boolean; data: { temporary: ElectricalRate; exhibition: ElectricalRate } }> => {
        try {
            // Try to fetch from API
            const [tempResponse, exhResponse] = await Promise.all([
                exhibitorClient.get('/admin/electrical-rates/active/temporary'),
                exhibitorClient.get('/admin/electrical-rates/active/exhibition')
            ]);

            return {
                success: true,
                data: {
                    temporary: tempResponse.data.data,
                    exhibition: exhResponse.data.data
                }
            };
        } catch (error) {
            console.warn('Failed to fetch electrical rates from API, using defaults:', error);
            // Return default rates if API fails
            return {
                success: true,
                data: {
                    temporary: { id: 'default-temp', type: 'temporary', ratePerKW: 3500, isActive: true },
                    exhibition: { id: 'default-exh', type: 'exhibition', ratePerKW: 3500, isActive: true }
                }
            };
        }
    },

    // Calculate cost
    calculateCost: async (temporaryKW: number, exhibitionKW: number, sockets: number, lightingPoints: number): Promise<{ success: boolean; total: number; details: any }> => {
        try {
            const response = await exhibitorClient.post('/admin/electrical-rates/calculate', { temporaryKW, exhibitionKW, sockets, lightingPoints });
            return response.data;
        } catch (error) {
            console.warn('Failed to calculate via API, using local calculation:', error);
            // Fallback calculation
            const total = (temporaryKW * 3500) + (exhibitionKW * 3500) + (sockets * 1500) + (lightingPoints * 800);
            return {
                success: true,
                total,
                details: { calculated: 'local' }
            };
        }
    }
};

// ============================================
// MAIN REQUIREMENT SUBMISSION ENDPOINT
// ============================================

export interface ExtraRequirementData {
    generalInfo?: {
        companyName: string;
        firstName: string;
        lastName: string;
        email: string;
        mobile: string;
    };
    boothDetails?: {
        boothNo: string;
        sqMtrBooked: string;
        contactPerson: string;
    };
    eventName?: string;
    eventDate?: string;
    companyDetails?: {
        address: string;
        city: string;
        state: string;
        pincode: string;
    };
    furnitureItems?: Array<{
        id: string;
        code: string;
        name: string;
        quantity: number;
        cost: number;
        totalCost: number;
    }>;
    rentalItems?: Array<{
        id: string;
        type: string;
        quantity: number;
        costFor3Days: number;
        totalCost: number;
    }>;
    electricalLoad?: {
        temporaryLoad: string;
        temporaryTotal: number;
        exhibitionLoad: string;
        exhibitionTotal: number;
    };
    hostessRequirements?: Array<{
        category: string;
        quantity: number;
        noOfDays: number;
        ratePerDay: number;
        amount: number;
    }>;
    compressedAir?: {
        qty: number;
        cfmRange: string;
        powerKW: number;
        costPerConnection: number;
        totalCost: number;
    };
    waterConnection?: {
        connections: number;
        costPerConnection: number;
        totalCost: number;
    };
    securityGuard?: {
        quantity: number;
        noOfDays: number;
        totalCost: number;
    };
    housekeepingStaff?: {
        quantity: number;
        noOfDays: number;
        chargesPerShift: number;
        totalCost: number;
    };
    securityDeposit?: {
        boothSq: number;
        amountINR: number;
        ddNo?: string;
        bankName?: string;
        branch?: string;
        dated?: string;
        amountWords?: string;
    };
    notes?: string;
}

export const extraRequirementsAPI = {
    // Submit complete requirement
    submit: async (data: ExtraRequirementData): Promise<{ success: boolean; data: any; message: string; error?: string }> => {
        const response = await exhibitorClient.post('/exhibitorDashboard/requirements', data);
        return response.data;
    },

    // Get all requirements (for exhibitor dashboard)
    getAll: async (): Promise<{ success: boolean; data: Requirement[] }> => {
        const response = await exhibitorClient.get('/exhibitorDashboard/requirements');
        return response.data;
    },

    // Get single requirement
    getById: async (id: string): Promise<{ success: boolean; data: Requirement }> => {
        const response = await exhibitorClient.get(`/exhibitorDashboard/requirements/${id}`);
        return response.data;
    },

    // Update requirement status (for admin)
    updateStatus: async (id: string, status: string, adminNotes?: string): Promise<{ success: boolean; data: any }> => {
        const response = await exhibitorClient.put(`/admin/extra-requirements/${id}`, { status, adminNotes });
        return response.data;
    },

    // Get statistics (for admin)
    getStats: async (): Promise<{ success: boolean; data: any }> => {
        const response = await exhibitorClient.get('/admin/extra-requirements/stats');
        return response.data;
    },

    // Get all requirements (for admin)
    getAllAdmin: async (page = 1, limit = 10, status?: string, search?: string): Promise<{ success: boolean; data: any[]; pagination: any }> => {
        const params = new URLSearchParams({ page: page.toString(), limit: limit.toString() });
        if (status && status !== 'all') params.append('status', status);
        if (search) params.append('search', search);
        const response = await exhibitorClient.get(`/admin/extra-requirements/admin/all?${params}`);
        return response.data;
    }
};

export default exhibitorClient;