// app/admin/hostess-rates/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, Pencil, Sparkles, Users, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import {
    getHostessCategories,
    createHostessCategory,
    updateHostessCategory,
    deleteHostessCategory,
    toggleHostessCategoryStatus,
    getHostessCategoryStatistics,
    HostessCategory
} from "@/lib/api/hostessCategories";
import toast from "react-hot-toast";

export default function AdminHostessRatesPage() {
    const [categories, setCategories] = useState<HostessCategory[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingCategory, setEditingCategory] = useState<HostessCategory | null>(null);
    const [statistics, setStatistics] = useState({ total: 0, active: 0, avgRate: 0 });
    const [formData, setFormData] = useState({
        category: 'A' as 'A' | 'B',
        ratePerDay: '',
        workingHours: '8',
        description: '',
    });

    const fetchCategories = async () => {
        try {
            setLoading(true);
            const response = await getHostessCategories();
            if (response.success) {
                setCategories(response.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch hostess categories:", error);
            toast.error("Failed to load hostess categories");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await getHostessCategoryStatistics();
            if (response.success) {
                setStatistics({
                    total: response.data.total || 0,
                    active: response.data.active || 0,
                    avgRate: response.data.avgRate || 0,
                });
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
        fetchStatistics();
    }, []);

    const handleDelete = async (id: string, category: string) => {
        if (confirm(`Are you sure you want to delete Category ${category}?`)) {
            try {
                const response = await deleteHostessCategory(id);
                if (response.success) {
                    toast.success("Hostess category deleted successfully");
                    fetchCategories();
                    fetchStatistics();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                toast.error("Failed to delete hostess category");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await toggleHostessCategoryStatus(id);
            if (response.success) {
                toast.success(`Category ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                fetchCategories();
                fetchStatistics();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-pink-500/20 rounded-xl flex items-center justify-center">
                        <Sparkles className="h-6 w-6 text-pink-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Hostess Services Configuration</h1>
                        <p className="text-gray-400 mt-1">Set rates and working hours for hostess categories</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setEditingCategory(null);
                        setFormData({
                            category: 'A',
                            ratePerDay: '',
                            workingHours: '8',
                            description: '',
                        });
                        setShowModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Category
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{statistics.total}</p>
                    <p className="text-xs text-gray-400">Total Categories</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{statistics.active}</p>
                    <p className="text-xs text-gray-400">Active Categories</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-2xl font-bold text-purple-400">{formatCurrency(statistics.avgRate)}</p>
                    <p className="text-xs text-gray-400">Average Rate/Day</p>
                </div>
            </div>

            {/* Categories Grid */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
            ) : categories.length === 0 ? (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                    <Users className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Hostess Categories Configured</h3>
                    <p className="text-gray-400 mb-6">Add your first hostess category</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition"
                    >
                        <Plus size={18} />
                        Add Category
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {categories.map((cat) => (
                        <div key={cat.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500/30 transition-all">
                            <div className="p-6">
                                <div className="flex justify-between items-start mb-4">
                                    <div>
                                        <div className="flex items-center gap-2 mb-2">
                                            <h2 className="text-xl font-bold text-white">Category {cat.category}</h2>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${cat.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {cat.isActive ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                                {cat.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{cat.description}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleToggleStatus(cat.id, cat.isActive)}
                                            className={`p-1.5 rounded-lg transition ${cat.isActive
                                                    ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20'
                                                    : 'text-gray-400 hover:text-green-400 hover:bg-green-500/20'
                                                }`}
                                            title={cat.isActive ? "Deactivate" : "Activate"}
                                        >
                                            {cat.isActive ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingCategory(cat);
                                                setFormData({
                                                    category: cat.category,
                                                    ratePerDay: cat.ratePerDay.toString(),
                                                    workingHours: cat.workingHours.toString(),
                                                    description: cat.description,
                                                });
                                                setShowModal(true);
                                            }}
                                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(cat.id, cat.category)}
                                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                    <div>
                                        <span className="text-xs text-gray-500">Daily Rate</span>
                                        <p className="text-2xl font-bold text-orange-400">{formatCurrency(cat.ratePerDay)}</p>
                                    </div>
                                    <div className="text-right">
                                        <span className="text-xs text-gray-500">Working Hours</span>
                                        <p className="text-white font-medium">{cat.workingHours} hours/day</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {editingCategory ? 'Edit Hostess Category' : 'Add New Hostess Category'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-700 rounded-lg transition">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Category <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.category}
                                    onChange={(e) => setFormData({ ...formData, category: e.target.value as 'A' | 'B' })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    disabled={!!editingCategory}
                                >
                                    <option value="A">Category A (Premium)</option>
                                    <option value="B">Category B (Standard)</option>
                                </select>
                                {editingCategory && (
                                    <p className="text-xs text-gray-500 mt-1">Category cannot be changed after creation</p>
                                )}
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Rate per Day (₹) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={formData.ratePerDay}
                                        onChange={(e) => setFormData({ ...formData, ratePerDay: e.target.value })}
                                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                        placeholder="5000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Working Hours per Day <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    value={formData.workingHours}
                                    onChange={(e) => setFormData({ ...formData, workingHours: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="8"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description <span className="text-red-400">*</span>
                                </label>
                                <textarea
                                    rows={3}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="Describe the hostess services included"
                                    required
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6 pt-4 border-t border-gray-700">
                            <button
                                onClick={() => setShowModal(false)}
                                className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={async () => {
                                    if (!formData.ratePerDay || !formData.workingHours || !formData.description) {
                                        toast.error("Please fill all required fields");
                                        return;
                                    }

                                    try {
                                        if (editingCategory) {
                                            const response = await updateHostessCategory(editingCategory.id, {
                                                ratePerDay: parseInt(formData.ratePerDay),
                                                workingHours: parseInt(formData.workingHours),
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Hostess category updated successfully");
                                                setShowModal(false);
                                                fetchCategories();
                                                fetchStatistics();
                                            }
                                        } else {
                                            const response = await createHostessCategory({
                                                category: formData.category,
                                                ratePerDay: parseInt(formData.ratePerDay),
                                                workingHours: parseInt(formData.workingHours),
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Hostess category created successfully");
                                                setShowModal(false);
                                                fetchCategories();
                                                fetchStatistics();
                                            }
                                        }
                                    } catch (error: any) {
                                        toast.error(error.response?.data?.message || "Operation failed");
                                    }
                                }}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center justify-center gap-2"
                            >
                                <Save size={16} />
                                {editingCategory ? 'Update Category' : 'Create Category'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}