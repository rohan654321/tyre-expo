// app/admin/compressed-air/page.tsx
"use client";

import { useState, useEffect } from "react";
import {
    Plus, Edit, Trash2, Save, X, Wind, Gauge, Zap,
    CheckCircle, XCircle, RefreshCw, TrendingUp,
    DollarSign, MoveUp, MoveDown, Search
} from "lucide-react";
import {
    getCompressedAirOptions,
    createCompressedAirOption,
    updateCompressedAirOption,
    deleteCompressedAirOption,
    toggleCompressedAirStatus,
    getCompressedAirStatistics,
    CompressedAirOption
} from "@/lib/api/compressedAir";
import toast from "react-hot-toast";

export default function AdminCompressedAirPage() {
    const [options, setOptions] = useState<CompressedAirOption[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingOption, setEditingOption] = useState<CompressedAirOption | null>(null);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({
        totalOptions: 0,
        activeOptions: 0,
        inactiveOptions: 0,
        avgCost: 0,
        avgPower: 0
    });
    const [formData, setFormData] = useState({
        cfmRange: "",
        costPerConnection: "",
        powerKW: "",
        isActive: true,
        displayOrder: 1,
    });

    const fetchOptions = async () => {
        try {
            setLoading(true);
            const response = await getCompressedAirOptions({
                isActive: statusFilter !== "all" ? (statusFilter === "active" ? true : false) : undefined,
                search: search || undefined
            });

            if (response.success) {
                setOptions(response.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch compressed air options:", error);
            toast.error("Failed to load compressed air options");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await getCompressedAirStatistics();
            if (response.success) {
                const stats = response.data;
                setStatistics({
                    totalOptions: stats.totalOptions || 0,
                    activeOptions: stats.activeOptions || 0,
                    inactiveOptions: stats.inactiveOptions || 0,
                    avgCost: stats.costStats?.avgCost || 0,
                    avgPower: stats.powerStats?.avgPower || 0,
                });
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    useEffect(() => {
        fetchOptions();
        fetchStatistics();
    }, [statusFilter]);

    const handleSearch = () => {
        fetchOptions();
    };

    const handleDelete = async (id: string, cfmRange: string) => {
        if (confirm(`Are you sure you want to delete "${cfmRange}" option?`)) {
            try {
                const response = await deleteCompressedAirOption(id);
                if (response.success) {
                    toast.success("Compressed air option deleted successfully");
                    fetchOptions();
                    fetchStatistics();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                toast.error("Failed to delete compressed air option");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await toggleCompressedAirStatus(id, !currentStatus);
            if (response.success) {
                toast.success(`Option ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                fetchOptions();
                fetchStatistics();
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            toast.error("Failed to update status");
        }
    };

    const handleMoveOrder = async (id: string, currentOrder: number, direction: 'up' | 'down') => {
        const newOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
        const otherOption = options.find(opt => opt.displayOrder === newOrder);

        if (otherOption) {
            try {
                await updateCompressedAirOption(id, { displayOrder: newOrder });
                await updateCompressedAirOption(otherOption.id, { displayOrder: currentOrder });
                fetchOptions();
                toast.success("Order updated successfully");
            } catch (error) {
                toast.error("Failed to update order");
            }
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                        <Wind className="h-6 w-6 text-cyan-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Compressed Air Configuration</h1>
                        <p className="text-gray-400 mt-1">Manage CFM ranges and pricing for compressed air</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setEditingOption(null);
                        setFormData({
                            cfmRange: "",
                            costPerConnection: "",
                            powerKW: "",
                            isActive: true,
                            displayOrder: options.length + 1,
                        });
                        setShowModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add CFM Option
                </button>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-5 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{statistics.totalOptions}</p>
                    <p className="text-xs text-gray-400">Total Options</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{statistics.activeOptions}</p>
                    <p className="text-xs text-gray-400">Active</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <p className="text-2xl font-bold text-red-400">{statistics.inactiveOptions}</p>
                    <p className="text-xs text-gray-400">Inactive</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-2xl font-bold text-purple-400">{formatCurrency(statistics.avgCost)}</p>
                    <p className="text-xs text-gray-400">Avg Connection Cost</p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                    <p className="text-2xl font-bold text-blue-400">{statistics.avgPower} kW</p>
                    <p className="text-xs text-gray-400">Avg Power</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by CFM range..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
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
                        onClick={fetchOptions}
                        className="px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Options Table */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
            ) : options.length === 0 ? (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                    <Wind className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Compressed Air Options Configured</h3>
                    <p className="text-gray-400 mb-6">Add CFM ranges and pricing for compressed air connections</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition"
                    >
                        <Plus size={18} />
                        Add CFM Option
                    </button>
                </div>
            ) : (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Order</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">CFM Range</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Connection Cost</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Power (kW)</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Total Cost</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {options.map((option) => (
                                    <tr key={option.id} className="hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <span className="text-white font-medium">{option.displayOrder}</span>
                                                <div className="flex flex-col">
                                                    <button
                                                        onClick={() => handleMoveOrder(option.id, option.displayOrder, 'up')}
                                                        disabled={option.displayOrder === 1}
                                                        className="p-0.5 text-gray-400 hover:text-white disabled:opacity-30"
                                                    >
                                                        <MoveUp size={12} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleMoveOrder(option.id, option.displayOrder, 'down')}
                                                        disabled={option.displayOrder === options.length}
                                                        className="p-0.5 text-gray-400 hover:text-white disabled:opacity-30"
                                                    >
                                                        <MoveDown size={12} />
                                                    </button>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Gauge size={16} className="text-cyan-400" />
                                                <span className="text-white font-medium">{option.cfmRange}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-orange-400 font-bold">{formatCurrency(option.costPerConnection)}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-1">
                                                <Zap size={14} className="text-yellow-400" />
                                                <span className="text-white">{option.powerKW} kW</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-green-400 font-bold">{formatCurrency(option.costPerConnection + (option.powerKW * 3500))}</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${option.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'
                                                }`}>
                                                {option.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                                {option.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleStatus(option.id, option.isActive)}
                                                    className={`p-1.5 rounded-lg transition ${option.isActive
                                                            ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20'
                                                            : 'text-gray-400 hover:text-green-400 hover:bg-green-500/20'
                                                        }`}
                                                    title={option.isActive ? "Deactivate" : "Activate"}
                                                >
                                                    {option.isActive ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingOption(option);
                                                        setFormData({
                                                            cfmRange: option.cfmRange,
                                                            costPerConnection: option.costPerConnection.toString(),
                                                            powerKW: option.powerKW.toString(),
                                                            isActive: option.isActive,
                                                            displayOrder: option.displayOrder,
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(option.id, option.cfmRange)}
                                                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                        <td className="px-4 py-3 text-sm text-gray-300">
                                            {formatCurrency(parseInt(formData.costPerConnection) || 0)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

            {/* Add/Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-xl font-bold text-white">
                                {editingOption ? 'Edit CFM Option' : 'Add New CFM Option'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-700 rounded-lg transition">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    CFM Range <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="text"
                                    value={formData.cfmRange}
                                    onChange={(e) => setFormData({ ...formData, cfmRange: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="e.g., 0-100 CFM"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Connection Cost (₹) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={formData.costPerConnection}
                                        onChange={(e) => setFormData({ ...formData, costPerConnection: e.target.value })}
                                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                        placeholder="5000"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Power Required (kW) <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="number"
                                    step="0.1"
                                    value={formData.powerKW}
                                    onChange={(e) => setFormData({ ...formData, powerKW: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="5.5"
                                    required
                                />
                                <p className="text-xs text-gray-500 mt-1">Electrical load required for this connection</p>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Display Order
                                </label>
                                <input
                                    type="number"
                                    value={formData.displayOrder}
                                    onChange={(e) => setFormData({ ...formData, displayOrder: parseInt(e.target.value) })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="1"
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

                            {formData.costPerConnection && formData.powerKW && (
                                <div className="bg-gray-700/30 rounded-lg p-3">
                                    <p className="text-sm text-gray-400 mb-1">Total Cost Preview:</p>
                                    <p className="text-xl font-bold text-orange-400">
                                        {formatCurrency(parseInt(formData.costPerConnection) + (parseFloat(formData.powerKW) * 3500))}
                                    </p>
                                    <p className="text-xs text-gray-500">
                                        Connection: {formatCurrency(parseInt(formData.costPerConnection) || 0)} +
                                        Power: {formatCurrency((parseFloat(formData.powerKW) || 0) * 3500)}
                                    </p>
                                </div>
                            )}
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
                                    if (!formData.cfmRange || !formData.costPerConnection || !formData.powerKW) {
                                        toast.error("Please fill all required fields");
                                        return;
                                    }

                                    try {
                                        if (editingOption) {
                                            const response = await updateCompressedAirOption(editingOption.id, {
                                                cfmRange: formData.cfmRange,
                                                costPerConnection: parseInt(formData.costPerConnection),
                                                powerKW: parseFloat(formData.powerKW),
                                                isActive: formData.isActive,
                                                displayOrder: formData.displayOrder,
                                            });
                                            if (response.success) {
                                                toast.success("Compressed air option updated successfully");
                                                setShowModal(false);
                                                fetchOptions();
                                                fetchStatistics();
                                            }
                                        } else {
                                            const response = await createCompressedAirOption({
                                                cfmRange: formData.cfmRange,
                                                costPerConnection: parseInt(formData.costPerConnection),
                                                powerKW: parseFloat(formData.powerKW),
                                                isActive: formData.isActive,
                                                displayOrder: formData.displayOrder,
                                            });
                                            if (response.success) {
                                                toast.success("Compressed air option created successfully");
                                                setShowModal(false);
                                                fetchOptions();
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
                                {editingOption ? 'Update Option' : 'Create Option'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}