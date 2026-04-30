// app/dashboard/products/page.tsx
'use client';

import { useState, useEffect, FormEvent } from 'react';
import {
    CubeIcon,
    PlusIcon,
    PencilIcon,
    TrashIcon,
    XMarkIcon,
} from '@heroicons/react/24/outline';
import { productsAPI } from '@/lib/api/exhibitorClient';
const API_BASE = 'https://localhost:5000/api';

interface Product {
    id: string;
    name: string;
    description: string;
    category: string;
    specifications: string;
    imageUrl: string;
    price?: string;
    createdAt?: string;
}

interface FormData {
    name: string;
    description: string;
    category: string;
    specifications: string;
    imageUrl: string;
    price?: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    const [formData, setFormData] = useState<FormData>({
        name: '',
        description: '',
        category: '',
        specifications: '',
        imageUrl: '',
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const result = await productsAPI.getAll();
            if (result.success) {
                setProducts(result.data);
            }
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        try {
            let result;
            if (editingProduct) {
                result = await productsAPI.update(editingProduct.id, formData);
            } else {
                result = await productsAPI.create(formData);
            }
            if (result.success) {
                fetchProducts();
                setShowModal(false);
                resetForm();
            }
        } catch (error) {
            console.error('Error saving product:', error);
            alert('Failed to save product');
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this product?')) return;
        try {
            const result = await productsAPI.delete(id);
            if (result.success) {
                fetchProducts();
            }
        } catch (error) {
            console.error('Error deleting product:', error);
            alert('Failed to delete product');
        }
    };

    const resetForm = () => {
        setFormData({
            name: '',
            description: '',
            category: '',
            specifications: '',
            imageUrl: '',
        });
        setEditingProduct(null);
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
            </div>
        );
    }

    return (
        <div className="max-w-6xl mx-auto">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">Products</h1>
                    <p className="text-gray-500 text-sm">Manage your product catalog</p>
                </div>
                <button
                    onClick={() => {
                        resetForm();
                        setShowModal(true);
                    }}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                    <PlusIcon className="h-4 w-4" />
                    Add Product
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {products.map((product) => (
                    <div key={product.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                        {product.imageUrl && (
                            <div className="h-48 bg-gray-100">
                                <img src={product.imageUrl} alt={product.name} className="h-full w-full object-cover" />
                            </div>
                        )}
                        <div className="p-4">
                            <h3 className="font-semibold text-gray-900 mb-1">{product.name}</h3>
                            {product.category && (
                                <span className="inline-block px-2 py-1 text-xs bg-amber-100 text-amber-700 rounded-full mb-2">
                                    {product.category}
                                </span>
                            )}
                            <p className="text-gray-600 text-sm line-clamp-2">{product.description}</p>
                            {product.specifications && (
                                <div className="mt-2 text-xs text-gray-400">{product.specifications}</div>
                            )}
                            <div className="flex gap-2 mt-4 pt-3 border-t border-gray-100">
                                <button
                                    onClick={() => {
                                        setEditingProduct(product);
                                        setFormData({
                                            name: product.name,
                                            description: product.description,
                                            category: product.category || '',
                                            specifications: product.specifications || '',
                                            imageUrl: product.imageUrl || '',
                                        });
                                        setShowModal(true);
                                    }}
                                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
                                >
                                    <PencilIcon className="h-4 w-4" />
                                    Edit
                                </button>
                                <button
                                    onClick={() => handleDelete(product.id)}
                                    className="flex-1 inline-flex items-center justify-center gap-1 px-3 py-1.5 border border-red-300 rounded-lg text-red-600 hover:bg-red-50 transition"
                                >
                                    <TrashIcon className="h-4 w-4" />
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {products.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <CubeIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No products added yet</p>
                    <button onClick={() => setShowModal(true)} className="mt-4 text-amber-500 hover:text-amber-600">
                        Add your first product
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-lg w-full max-h-[90vh] overflow-y-auto">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold">
                                {editingProduct ? 'Edit Product' : 'Add New Product'}
                            </h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                                <input
                                    type="text"
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                    placeholder="e.g., Automotive, Industrial"
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
                                <label className="block text-sm font-medium text-gray-700 mb-1">Specifications</label>
                                <textarea
                                    rows={2}
                                    value={formData.specifications}
                                    onChange={(e) => setFormData({ ...formData, specifications: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                    placeholder="Technical specifications, dimensions, etc."
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
                                <input
                                    type="url"
                                    value={formData.imageUrl}
                                    onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                    placeholder="https://example.com/product-image.jpg"
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
                                    {editingProduct ? 'Update' : 'Create'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}