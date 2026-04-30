// app/dashboard/brands/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { TagIcon, PlusIcon, PencilIcon, TrashIcon, XMarkIcon } from '@heroicons/react/24/outline';

const API_BASE = 'http://localhost:5000/api';

interface Brand {
    id: string;
    name: string;
    description: string;
    logoUrl: string;
    createdAt?: string;
    updatedAt?: string;
}

interface FormData {
    name: string;
    description: string;
    logoUrl: string;
}

export default function BrandsPage() {
    const [brands, setBrands] = useState<Brand[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingBrand, setEditingBrand] = useState<Brand | null>(null);
    const [formData, setFormData] = useState<FormData>({ name: '', description: '', logoUrl: '' });

    useEffect(() => {
        fetchBrands();
    }, []);

    const fetchBrands = async () => {
        try {
            const token = localStorage.getItem('tyre_expo_token');
            const response = await fetch(`${API_BASE}/exhibitorDashboard/brands`, {
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) {
                setBrands(data.data);
            }
        } catch (error) {
            console.error('Error fetching brands:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('tyre_expo_token');
            const url = editingBrand
                ? `${API_BASE}/exhibitorDashboard/brands/${editingBrand.id}`
                : `${API_BASE}/exhibitorDashboard/brands`;
            const method = editingBrand ? 'PUT' : 'POST';

            const response = await fetch(url, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`,
                },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            if (data.success) {
                fetchBrands();
                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error saving brand:', error);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this brand?')) return;
        try {
            const token = localStorage.getItem('tyre_expo_token');
            const response = await fetch(`${API_BASE}/exhibitorDashboard/brands/${id}`, {
                method: 'DELETE',
                headers: { 'Authorization': `Bearer ${token}` },
            });
            const data = await response.json();
            if (data.success) fetchBrands();
        } catch (error) {
            console.error('Error deleting brand:', error);
        }
    };

    const resetForm = () => {
        setFormData({ name: '', description: '', logoUrl: '' });
        setEditingBrand(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Brands</h1>
                    <p className="text-gray-500 text-sm">Manage your brand portfolio</p>
                </div>
                <button
                    onClick={() => { resetForm(); setShowModal(true); }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Brand
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {brands.map((brand) => (
                    <div key={brand.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition">
                        <div className="flex items-start gap-4">
                            {brand.logoUrl ? (
                                <div className="h-16 w-16 rounded-lg bg-gray-100 overflow-hidden">
                                    <img src={brand.logoUrl} alt={brand.name} className="h-full w-full object-cover" />
                                </div>
                            ) : (
                                <div className="h-16 w-16 rounded-lg bg-gradient-to-r from-amber-100 to-orange-100 flex items-center justify-center">
                                    <TagIcon className="h-8 w-8 text-amber-500" />
                                </div>
                            )}
                            <div className="flex-1">
                                <h3 className="font-semibold text-gray-900">{brand.name}</h3>
                                <p className="text-gray-600 text-sm mt-1">{brand.description || 'No description'}</p>
                            </div>
                            <div className="flex gap-2">
                                <button
                                    onClick={() => {
                                        setEditingBrand(brand);
                                        setFormData({
                                            name: brand.name,
                                            description: brand.description || '',
                                            logoUrl: brand.logoUrl || ''
                                        });
                                        setShowModal(true);
                                    }}
                                    className="p-2 text-gray-400 hover:text-gray-600"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                </button>
                                <button
                                    onClick={() => handleDelete(brand.id)}
                                    className="p-2 text-gray-400 hover:text-red-600"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {brands.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <TagIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No brands added yet</p>
                    <button onClick={() => setShowModal(true)} className="mt-4 text-amber-500 hover:text-amber-600">
                        Add your first brand
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold">{editingBrand ? 'Edit Brand' : 'Add New Brand'}</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Brand Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Logo URL</label>
                                <input
                                    type="url"
                                    value={formData.logoUrl}
                                    onChange={(e) => setFormData({ ...formData, logoUrl: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                    placeholder="https://example.com/logo.png"
                                />
                            </div>
                            <div className="flex gap-3 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setShowModal(false)}
                                    className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600"
                                >
                                    {editingBrand ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}