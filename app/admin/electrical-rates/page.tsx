"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Save, X, BoltIcon, Calendar, CheckCircle, XCircle, Eye, Power, Zap } from "lucide-react";
import { getElectricalRates, deleteElectricalRate, toggleElectricalRateStatus, ElectricalRate, updateElectricalRate, createElectricalRate } from "@/lib/api/electricalRates";
import toast from "react-hot-toast";

export default function AdminElectricalRatesPage() {
    const [rates, setRates] = useState<ElectricalRate[]>([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [editingRate, setEditingRate] = useState<ElectricalRate | null>(null);
    // Calculate stats from rates instead of API
    const [statistics, setStatistics] = useState({ total: 0, active: 0, exhibition: 0, temporary: 0 });
    const [formData, setFormData] = useState({
        type: 'both' as 'temporary' | 'exhibition' | 'both',
        ratePerKW: '',
        effectiveFrom: '',
        effectiveTo: '',
        description: '',
    });

    // Calculate statistics locally from rates array
    const calculateLocalStatistics = (ratesList: ElectricalRate[]) => {
        const total = ratesList.length;
        const active = ratesList.filter(rate => rate.isActive).length;
        const exhibition = ratesList.filter(rate => rate.type === 'exhibition' || rate.type === 'both').length;
        const temporary = ratesList.filter(rate => rate.type === 'temporary' || rate.type === 'both').length;

        setStatistics({ total, active, exhibition, temporary });
    };

    const fetchRates = async () => {
        try {
            setLoading(true);
            const response = await getElectricalRates();
            if (response.success) {
                const fetchedRates = response.data || [];
                setRates(fetchedRates);
                calculateLocalStatistics(fetchedRates);
            } else {
                toast.error(response.message || "Failed to load electrical rates");
            }
        } catch (error) {
            console.error("Failed to fetch electrical rates:", error);
            toast.error("Failed to load electrical rates");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRates();
    }, []);

    const handleDelete = async (id: string, ratePerKW: number) => {
        if (confirm(`Are you sure you want to delete the rate ₹${ratePerKW}/KW?`)) {
            try {
                const response = await deleteElectricalRate(id);
                if (response.success) {
                    toast.success("Electrical rate deleted successfully");
                    fetchRates();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete electrical rate");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await toggleElectricalRateStatus(id);
            if (response.success) {
                toast.success(`Rate ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                // Update local state immediately for better UX
                const updatedRates = rates.map(rate =>
                    rate.id === id ? { ...rate, isActive: !currentStatus } : rate
                );
                setRates(updatedRates);
                calculateLocalStatistics(updatedRates);
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Toggle status error:", error);
            toast.error("Failed to update status");
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    const getTypeBadge = (type: string) => {
        switch (type) {
            case 'exhibition':
                return <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-400 flex items-center gap-1"><Eye size={12} /> Exhibition</span>;
            case 'temporary':
                return <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-400 flex items-center gap-1"><Zap size={12} /> Temporary</span>;
            default:
                return <span className="px-2 py-1 text-xs rounded-full bg-green-500/20 text-green-400 flex items-center gap-1"><Power size={12} /> Both</span>;
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-orange-500/20 rounded-xl flex items-center justify-center">
                        <BoltIcon className="h-6 w-6 text-orange-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Electrical Rates Configuration</h1>
                        <p className="text-gray-400 mt-1">Set pricing for electrical requirements per KW</p>
                    </div>
                </div>
                <button
                    onClick={() => {
                        setEditingRate(null);
                        setFormData({
                            type: 'both',
                            ratePerKW: '',
                            effectiveFrom: '',
                            effectiveTo: '',
                            description: '',
                        });
                        setShowModal(true);
                    }}
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Rate
                </button>
            </div>

            {/* Statistics Cards - Calculated locally */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{statistics.total}</p>
                    <p className="text-xs text-gray-400">Total Rates</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{statistics.active}</p>
                    <p className="text-xs text-gray-400">Active Rates</p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                    <p className="text-2xl font-bold text-blue-400">{statistics.exhibition}</p>
                    <p className="text-xs text-gray-400">Exhibition Rates</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-2xl font-bold text-purple-400">{statistics.temporary}</p>
                    <p className="text-xs text-gray-400">Temporary Rates</p>
                </div>
            </div>

            {/* Rates Table */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
            ) : rates.length === 0 ? (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                    <BoltIcon className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Electrical Rates Configured</h3>
                    <p className="text-gray-400 mb-6">Add your first electrical rate configuration</p>
                    <button
                        onClick={() => setShowModal(true)}
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition"
                    >
                        <Plus size={18} />
                        Add Rate
                    </button>
                </div>
            ) : (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/80">
                                <tr>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Type</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Rate per KW</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Effective From</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Effective To</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                    <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {rates.map((rate) => (
                                    <tr key={rate.id} className="hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4">
                                            {getTypeBadge(rate.type)}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className="text-xl font-bold text-orange-400">{formatCurrency(rate.ratePerKW)}</span>
                                            <span className="text-xs text-gray-500 ml-1">/KW</span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Calendar size={14} className="text-gray-500" />
                                                <span className="text-white">{formatDate(rate.effectiveFrom)}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            {rate.effectiveTo ? (
                                                <div className="flex items-center gap-2">
                                                    <Calendar size={14} className="text-gray-500" />
                                                    <span className="text-white">{formatDate(rate.effectiveTo)}</span>
                                                </div>
                                            ) : (
                                                <span className="text-gray-500">No expiry</span>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${rate.isActive ? 'bg-green-500/20 text-green-400' : 'bg-gray-500/20 text-gray-400'}`}>
                                                {rate.isActive ? <CheckCircle size={12} /> : <XCircle size={12} />}
                                                {rate.isActive ? 'Active' : 'Inactive'}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <button
                                                    onClick={() => handleToggleStatus(rate.id, rate.isActive)}
                                                    className={`p-1.5 rounded-lg transition ${rate.isActive
                                                            ? 'text-gray-400 hover:text-red-400 hover:bg-red-500/20'
                                                            : 'text-gray-400 hover:text-green-400 hover:bg-green-500/20'
                                                        }`}
                                                    title={rate.isActive ? "Deactivate" : "Activate"}
                                                >
                                                    {rate.isActive ? <XCircle size={16} /> : <CheckCircle size={16} />}
                                                </button>
                                                <button
                                                    onClick={() => {
                                                        setEditingRate(rate);
                                                        setFormData({
                                                            type: rate.type,
                                                            ratePerKW: rate.ratePerKW.toString(),
                                                            effectiveFrom: rate.effectiveFrom,
                                                            effectiveTo: rate.effectiveTo || '',
                                                            description: rate.description || '',
                                                        });
                                                        setShowModal(true);
                                                    }}
                                                    className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                                                >
                                                    <Edit size={16} />
                                                </button>
                                                <button
                                                    onClick={() => handleDelete(rate.id, rate.ratePerKW)}
                                                    className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                                >
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
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
                                {editingRate ? 'Edit Electrical Rate' : 'Add New Electrical Rate'}
                            </h3>
                            <button onClick={() => setShowModal(false)} className="p-1 hover:bg-gray-700 rounded-lg transition">
                                <X size={20} className="text-gray-400" />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Rate Type <span className="text-red-400">*</span>
                                </label>
                                <select
                                    value={formData.type}
                                    onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                >
                                    <option value="both">Both (Exhibition & Temporary)</option>
                                    <option value="exhibition">Exhibition Only</option>
                                    <option value="temporary">Temporary Only</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Rate per KW (₹) <span className="text-red-400">*</span>
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={formData.ratePerKW}
                                        onChange={(e) => setFormData({ ...formData, ratePerKW: e.target.value })}
                                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                        placeholder="3500"
                                        required
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Effective From <span className="text-red-400">*</span>
                                </label>
                                <input
                                    type="date"
                                    value={formData.effectiveFrom}
                                    onChange={(e) => setFormData({ ...formData, effectiveFrom: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    required
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Effective To (Optional)
                                </label>
                                <input
                                    type="date"
                                    value={formData.effectiveTo}
                                    onChange={(e) => setFormData({ ...formData, effectiveTo: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                                <p className="text-xs text-gray-500 mt-1">Leave empty for no expiry</p>
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
                                    placeholder="Additional notes about this rate"
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
                                    if (!formData.ratePerKW || !formData.effectiveFrom) {
                                        toast.error("Please fill all required fields");
                                        return;
                                    }

                                    try {
                                        if (editingRate) {
                                            const response = await updateElectricalRate(editingRate.id, {
                                                type: formData.type,
                                                ratePerKW: parseInt(formData.ratePerKW),
                                                effectiveFrom: formData.effectiveFrom,
                                                effectiveTo: formData.effectiveTo || null,
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Electrical rate updated successfully");
                                                setShowModal(false);
                                                fetchRates();
                                            } else {
                                                toast.error(response.message || "Failed to update");
                                            }
                                        } else {
                                            const response = await createElectricalRate({
                                                type: formData.type,
                                                ratePerKW: parseInt(formData.ratePerKW),
                                                effectiveFrom: formData.effectiveFrom,
                                                effectiveTo: formData.effectiveTo || null,
                                                description: formData.description,
                                            });
                                            if (response.success) {
                                                toast.success("Electrical rate created successfully");
                                                setShowModal(false);
                                                fetchRates();
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
                                {editingRate ? 'Update Rate' : 'Create Rate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}