// app/dashboard/brochures/page.tsx
'use client';

import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import { DocumentTextIcon, PlusIcon, TrashIcon, EyeIcon, ArrowDownTrayIcon, XMarkIcon } from '@heroicons/react/24/outline';
import { brochuresAPI } from '@/lib/api/exhibitorClient'; const API_BASE = 'https://localhost:5000/api';

interface Brochure {
    id: string;
    name: string;
    title: string;
    description: string;
    fileUrl: string;
    fileSize: number;
    downloads: number;
    createdAt: string;
}

interface FormData {
    title: string;
    description: string;
    file: File | null;
}

export default function BrochuresPage() {
    const [brochures, setBrochures] = useState<Brochure[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [uploading, setUploading] = useState(false);
    const [formData, setFormData] = useState<FormData>({ title: '', description: '', file: null });

    useEffect(() => {
        fetchBrochures();
    }, []);

    const fetchBrochures = async () => {
        try {
            const result = await brochuresAPI.getAll();
            if (result.success) {
                setBrochures(result.data);
            }
        } catch (error) {
            console.error('Error fetching brochures:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleFileUpload = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        if (file.type !== 'application/pdf') {
            alert('Please upload a PDF file');
            return;
        }
        if (file.size > 10 * 1024 * 1024) {
            alert('File size should be less than 10MB');
            return;
        }
        setFormData({ ...formData, file });
    };

    const handleSubmit = async (e: FormEvent) => {
        e.preventDefault();
        if (!formData.file) {
            alert('Please select a file');
            return;
        }

        setUploading(true);
        try {
            const result = await brochuresAPI.upload(
                formData.title,
                formData.description,
                formData.file
            );

            if (result.success) {
                fetchBrochures();
                setShowModal(false);
                setFormData({ title: '', description: '', file: null });
            }
        } catch (error) {
            console.error('Error uploading brochure:', error);
            alert('Failed to upload brochure');
        } finally {
            setUploading(false);
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this brochure?')) return;
        try {
            const result = await brochuresAPI.delete(id);
            if (result.success) fetchBrochures();
        } catch (error) {
            console.error('Error deleting brochure:', error);
        }
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
                    <h1 className="text-2xl font-bold text-gray-900">Brochures</h1>
                    <p className="text-gray-500 text-sm">Manage your company brochures and catalogs</p>
                </div>
                <button
                    onClick={() => setShowModal(true)}
                    className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
                >
                    <PlusIcon className="h-4 w-4" />
                    Upload Brochure
                </button>
            </div>

            <div className="space-y-4">
                {brochures.map((brochure) => (
                    <div key={brochure.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5 hover:shadow-md transition">
                        <div className="flex items-start justify-between">
                            <div className="flex items-start gap-4">
                                <div className="h-12 w-12 bg-red-50 rounded-lg flex items-center justify-center">
                                    <DocumentTextIcon className="h-6 w-6 text-red-500" />
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-900">{brochure.title || brochure.name}</h3>
                                    <p className="text-gray-600 text-sm mt-1">{brochure.description}</p>
                                    <div className="flex items-center gap-4 mt-2">
                                        <span className="text-xs text-gray-400">
                                            Uploaded: {new Date(brochure.createdAt).toLocaleDateString()}
                                        </span>
                                        <span className="text-xs text-gray-400">
                                            Size: {Math.round((brochure.fileSize || 0) / 1024)} KB
                                        </span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <a
                                    href={brochure.fileUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="p-2 text-gray-400 hover:text-blue-600"
                                >
                                    <EyeIcon className="h-5 w-5" />
                                </a>
                                <a
                                    href={brochure.fileUrl}
                                    download
                                    className="p-2 text-gray-400 hover:text-green-600"
                                >
                                    <ArrowDownTrayIcon className="h-5 w-5" />
                                </a>
                                <button
                                    onClick={() => handleDelete(brochure.id)}
                                    className="p-2 text-gray-400 hover:text-red-600"
                                >
                                    <TrashIcon className="h-5 w-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {brochures.length === 0 && (
                <div className="text-center py-12 bg-white rounded-2xl border border-gray-100">
                    <DocumentTextIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No brochures uploaded yet</p>
                    <button onClick={() => setShowModal(true)} className="mt-4 text-amber-500 hover:text-amber-600">
                        Upload your first brochure
                    </button>
                </div>
            )}

            {/* Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl max-w-md w-full">
                        <div className="flex items-center justify-between p-6 border-b border-gray-100">
                            <h2 className="text-xl font-semibold">Upload Brochure</h2>
                            <button onClick={() => setShowModal(false)} className="text-gray-400 hover:text-gray-600">
                                <XMarkIcon className="h-6 w-6" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.title}
                                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                    placeholder="e.g., Product Catalog 2024"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                                    placeholder="Brief description of the brochure"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">PDF File *</label>
                                <input
                                    type="file"
                                    accept=".pdf"
                                    onChange={handleFileUpload}
                                    className="w-full px-3 py-2 border border-gray-200 rounded-lg"
                                />
                                <p className="text-xs text-gray-400 mt-1">PDF files only, max 10MB</p>
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
                                    disabled={uploading}
                                    className="flex-1 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 disabled:opacity-50"
                                >
                                    {uploading ? 'Uploading...' : 'Upload'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}