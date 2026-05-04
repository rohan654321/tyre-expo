"use client";

import { useState, useEffect } from "react";
import {
    Plus, Edit, Trash2, Save, X, Shield, DollarSign,
    CheckCircle, XCircle, RefreshCw, TrendingUp,
    MoveUp, MoveDown, Search, Eye, EyeOff
} from "lucide-react";
import {
    getSecurityDeposits,
    createSecurityDeposit,
    updateSecurityDeposit,
    deleteSecurityDeposit,
    toggleSecurityDepositStatus,
    SecurityDeposit
} from "@/lib/api/securityDeposit";
import toast from "react-hot-toast";

const categoryOptions = [
    { value: '0-36', label: '0-36 sq.m', min: 0, max: 36 },
    { value: '37-100', label: '37-100 sq.m', min: 37, max: 100 },
    { value: '101+', label: '101+ sq.m', min: 101, max: 9999 }
];

export default function AdminSecurityDepositPage() {
    const [deposits, setDeposits] = useState<SecurityDeposit[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingDeposit, setEditingDeposit] = useState<SecurityDeposit | null>(null);
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({
        totalDeposits: 0,
        activeDeposits: 0,
        inactiveDeposits: 0,
        avgINR: 0,
        avgUSD: 0
    });
    const [formData, setFormData] = useState({
        category: '0-36' as '0-36' | '37-100' | '101+',
        minSqMtr: 0,
        maxSqMtr: 36,
        amountINR: '',
        amountUSD: '',
        isActive: true,
        displayOrder: 1,
        description: '',
    });

    // Calculate statistics locally from deposits
    const calculateLocalStatistics = (depositsList: SecurityDeposit[]) => {
        const totalDeposits = depositsList.length;
        const activeDeposits = depositsList.filter(d => d.isActive).length;
        const inactiveDeposits = totalDeposits - activeDeposits;
        const avgINR = depositsList.length > 0
            ? depositsList.reduce((sum, d) => sum + d.amountINR, 0) / depositsList.length
            : 0;
        const avgUSD = depositsList.length > 0
            ? depositsList.reduce((sum, d) => sum + d.amountUSD, 0) / depositsList.length
            : 0;

        setStatistics({
            totalDeposits,
            activeDeposits,
            inactiveDeposits,
            avgINR,
            avgUSD
        });
    };

    const fetchDeposits = async () => {
        try {
            setLoading(true);
            const response = await getSecurityDeposits({
                isActive: statusFilter !== "all" ? (statusFilter === "active" ? true : false) : undefined,
            });

            if (response.success) {
                const fetchedDeposits = response.data || [];
                setDeposits(fetchedDeposits);
                calculateLocalStatistics(fetchedDeposits);
            } else {
                toast.error(response.message || "Failed to load security deposits");
            }
        } catch (error) {
            console.error("Failed to fetch security deposits:", error);
            toast.error("Failed to load security deposits");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchDeposits();
    }, [statusFilter]);

    const handleDelete = async (id: string, category: string) => {
        if (confirm(`Are you sure you want to delete the "${category}" deposit tier?`)) {
            try {
                const response = await deleteSecurityDeposit(id);
                if (response.success) {
                    toast.success("Security deposit tier deleted successfully");
                    fetchDeposits();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                toast.error("Failed to delete security deposit tier");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await toggleSecurityDepositStatus(id, !currentStatus);
            if (response.success) {
                toast.success(`Tier ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                // Update local state immediately
                const updatedDeposits = deposits.map(deposit =>
                    deposit.id === id ? { ...deposit, isActive: !currentStatus } : deposit
                );
                setDeposits(updatedDeposits);
                calculateLocalStatistics(updatedDeposits);
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Toggle status error:", error);
            toast.error("Failed to update status");
        }
    };

    const handleCategoryChange = (category: string) => {
        const selected = categoryOptions.find(opt => opt.value === category);
        if (selected) {
            setFormData({
                ...formData,
                category: category as any,
                minSqMtr: selected.min,
                maxSqMtr: selected.max,
            });
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
    const formatUSD = (amount: number) => `$${amount.toLocaleString()}`;

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-emerald-500/20 rounded-xl flex items-center justify-center">
                        <Shield className="h-6 w-6 text-emerald-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Security Deposit Tiers</h1>
                        <p className="text-gray-400 mt-1">Configure deposit amounts by booth area (sq.m)</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setEditingDeposit(null);
                        setFormData({
                            category: '0-36',
                            minSqMtr: 0,
                            maxSqMtr: 36,
                            amountINR: '',
                            amountUSD: '',
                            isActive: true,
                            displayOrder: deposits.length + 1,
                            description: '',
                        });
                        setShowModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Tier
                </button>
            </div>

            {/* Statistics Cards - Now calculated locally */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{statistics.totalDeposits}</p>
                    <p className="text-xs text-gray-400">Total Tiers</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{statistics.activeDeposits}</p>
                    <p className="text-xs text-gray-400">Active</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <p className="text-2xl font-bold text-red-400">{statistics.inactiveDeposits}</p>
                    <p className="text-xs text-gray-400">Inactive</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-2xl font-bold text-purple-400">{formatCurrency(statistics.avgINR)}</p>
                    <p className="text-xs text-gray-400">Avg Deposit (INR)</p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                    <p className="text-2xl font-bold text-blue-400">{formatUSD(statistics.avgUSD)}</p>
                    <p className="text-xs text-gray-400">Avg Deposit (USD)</p>
                </div>
            </div>

            {/* Filter */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active Only</option>
                        <option value="inactive">Inactive Only</option>
                    </select>
                    <button
                        onClick={fetchDeposits}
                        className="px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Tiers Grid */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
            ) : deposits.length === 0 ? (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                    <Shield className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Security Deposit Tiers Configured</h3>
                    <p className="text-gray-400 mb-6">Add deposit tiers based on booth area</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition"
                    >
                        <Plus size={18} />
                        Add Tier
                    </button>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {deposits.map((deposit) => (
                        <div key={deposit.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500/30 transition-all">
                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <h3 className="text-xl font-bold text-white">{deposit.category} sq.m</h3>
                                            <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium ${deposit.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                                {deposit.isActive ? <CheckCircle size={10} /> : <XCircle size={10} />}
                                                {deposit.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{deposit.minSqMtr} - {deposit.maxSqMtr === 9999 ? "Above" : deposit.maxSqMtr} sq.m</p>
                                        {deposit.description && (
                                            <p className="text-xs text-gray-500 mt-1">{deposit.description}</p>
                                        )}
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleToggleStatus(deposit.id, deposit.isActive)}
                                            className={`p-1.5 rounded-lg transition ${deposit.isActive
                                                ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20'
                                                : 'text-gray-400 hover:text-green-400 hover:bg-green-500/20'
                                                }`}
                                            title={deposit.isActive ? "Deactivate" : "Activate"}
                                        >
                                            {deposit.isActive ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                        </button>
                                        <button
                                            onClick={() => {
                                                setEditingDeposit(deposit);
                                                setFormData({
                                                    category: deposit.category,
                                                    minSqMtr: deposit.minSqMtr,
                                                    maxSqMtr: deposit.maxSqMtr,
                                                    amountINR: deposit.amountINR.toString(),
                                                    amountUSD: deposit.amountUSD.toString(),
                                                    isActive: deposit.isActive,
                                                    displayOrder: deposit.displayOrder,
                                                    description: deposit.description || '',
                                                });
                                                setShowModal(true);
                                            }}
                                            className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                                        >
                                            <Edit size={16} />
                                        </button>
                                        <button
                                            onClick={() => handleDelete(deposit.id, deposit.category)}
                                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <div className="pt-3 mt-3 border-t border-gray-700">
                                    <div className="flex justify-between items-center">
                                        <div>
                                            <p className="text-xs text-gray-500">Security Deposit</p>
                                            <p className="text-2xl font-bold text-orange-400">{formatCurrency(deposit.amountINR)}</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-gray-500">USD Equivalent</p>
                                            <p className="text-lg font-semibold text-blue-400">{formatUSD(deposit.amountUSD)}</p>
                                        </div>
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
                                {editingDeposit ? 'Edit Deposit Tier' : 'Add New Deposit Tier'}
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
                                    onChange={(e) => handleCategoryChange(e.target.value)}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    disabled={!!editingDeposit}
                                >
                                    {categoryOptions.map(opt => (
                                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                                    ))}
                                </select>
                                {editingDeposit && (
                                    <p className="text-xs text-gray-500 mt-1">Category cannot be changed after creation</p>
                                )}
                            </div>

                            <div className="grid grid-cols-2 gap-3">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Min (sq.m)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.minSqMtr}
                                        readOnly
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Max (sq.m)
                                    </label>
                                    <input
                                        type="number"
                                        value={formData.maxSqMtr}
                                        readOnly
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Deposit Amount (INR) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={formData.amountINR}
                                        onChange={(e) => setFormData({ ...formData, amountINR: e.target.value })}
                                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                        placeholder="25000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Deposit Amount (USD) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">$</span>
                                    <input
                                        type="number"
                                        value={formData.amountUSD}
                                        onChange={(e) => setFormData({ ...formData, amountUSD: e.target.value })}
                                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                        placeholder="300"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Description (Optional)
                                </label>
                                <textarea
                                    rows={2}
                                    value={formData.description}
                                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="Additional notes about this deposit tier"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Status
                                </label>
                                <select
                                    value={formData.isActive ? "active" : "inactive"}
                                    onChange={(e) => setFormData({ ...formData, isActive: e.target.value === "active" })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                >
                                    <option value="active">Active (Visible to exhibitors)</option>
                                    <option value="inactive">Inactive (Hidden from exhibitors)</option>
                                </select>
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
                                    if (!formData.amountINR || !formData.amountUSD) {
                                        toast.error("Please fill all required fields");
                                        return;
                                    }

                                    try {
                                        if (editingDeposit) {
                                            const response = await updateSecurityDeposit(editingDeposit.id, {
                                                amountINR: parseInt(formData.amountINR),
                                                amountUSD: parseInt(formData.amountUSD),
                                                isActive: formData.isActive,
                                                displayOrder: formData.displayOrder,
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Security deposit tier updated successfully");
                                                setShowModal(false);
                                                fetchDeposits();
                                            } else {
                                                toast.error(response.message || "Failed to update");
                                            }
                                        } else {
                                            const response = await createSecurityDeposit({
                                                category: formData.category,
                                                minSqMtr: formData.minSqMtr,
                                                maxSqMtr: formData.maxSqMtr,
                                                amountINR: parseInt(formData.amountINR),
                                                amountUSD: parseInt(formData.amountUSD),
                                                isActive: formData.isActive,
                                                displayOrder: formData.displayOrder,
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Security deposit tier created successfully");
                                                setShowModal(false);
                                                fetchDeposits();
                                            } else {
                                                toast.error(response.message || "Failed to create");
                                            }
                                        }
                                    } catch (error: any) {
                                        console.error("Operation error:", error);
                                        toast.error(error.response?.data?.message || "Operation failed");
                                    }
                                }}
                                className="flex-1 px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center justify-center gap-2"
                            >
                                <Save size={16} />
                                {editingDeposit ? 'Update Tier' : 'Create Tier'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}