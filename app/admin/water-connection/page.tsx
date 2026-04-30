// app/admin/water-connection/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Save, Pencil, Droplet, DollarSign, RotateCcw, TrendingUp, Clock, History, Calculator, RefreshCw } from "lucide-react";
import {
    getWaterConnectionConfig,
    updateWaterConnectionConfig,
    resetWaterConnectionToDefault,
    getWaterConnectionStatistics,
    getWaterConnectionRateHistory,
    WaterConnectionConfig,
    RateHistoryItem,
    StatisticsData
} from "@/lib/api/waterConnection";
import toast from "react-hot-toast";

export default function AdminWaterConnectionPage() {
    const [config, setConfig] = useState<WaterConnectionConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [tempRate, setTempRate] = useState("");
    const [statistics, setStatistics] = useState<StatisticsData | null>(null);
    const [rateHistory, setRateHistory] = useState<RateHistoryItem[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const response = await getWaterConnectionConfig();
            console.log("Water connection config response:", response);

            if (response.success) {
                const configData = response.data;
                setConfig(configData);
                setTempRate(configData.costPerConnection.toString());
            }
        } catch (error) {
            console.error("Failed to fetch water connection config:", error);
            toast.error("Failed to load water connection configuration");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await getWaterConnectionStatistics();
            if (response.success) {
                setStatistics(response.data);
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    const fetchRateHistory = async () => {
        try {
            const response = await getWaterConnectionRateHistory();
            if (response.success) {
                setRateHistory(response.data || []);
            }
        } catch (error) {
            console.error("Failed to fetch rate history:", error);
        }
    };

    useEffect(() => {
        fetchConfig();
        fetchStatistics();
        fetchRateHistory();
    }, []);

    const handleSave = async () => {
        const newRate = parseInt(tempRate);

        if (isNaN(newRate) || newRate < 0) {
            toast.error("Please enter a valid rate");
            return;
        }

        try {
            const response = await updateWaterConnectionConfig(newRate);
            if (response.success) {
                setConfig(response.data);
                toast.success("Water connection rate updated successfully");
                setEditing(false);
                fetchStatistics();
                fetchRateHistory();
            } else {
                toast.error(response.message || "Failed to update");
            }
        } catch (error: any) {
            console.error("Update error:", error);
            const errorMsg = error.response?.data?.message || "Failed to update water connection rate";
            toast.error(errorMsg);
        }
    };

    const handleReset = async () => {
        if (confirm("Are you sure you want to reset to default value (₹15,000 per connection)?")) {
            try {
                const response = await resetWaterConnectionToDefault();
                if (response.success) {
                    setConfig(response.data);
                    setTempRate(response.data.costPerConnection.toString());
                    toast.success("Reset to default value successfully");
                    setEditing(false);
                    fetchStatistics();
                    fetchRateHistory();
                } else {
                    toast.error(response.message || "Failed to reset");
                }
            } catch (error) {
                toast.error("Failed to reset to default");
            }
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                    <Droplet className="h-6 w-6 text-cyan-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Water Connection Configuration</h1>
                    <p className="text-gray-400 mt-1">Set rate per water connection for exhibitors</p>
                </div>
            </div>

            {/* Statistics Cards */}
            {statistics && (
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Current Rate</p>
                                <p className="text-2xl font-bold text-orange-400">{formatCurrency(statistics.currentRate)}</p>
                            </div>
                            <DollarSign className="h-8 w-8 text-gray-500" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Total Updates</p>
                                <p className="text-2xl font-bold text-white">{statistics.totalUpdates}</p>
                            </div>
                            <History className="h-8 w-8 text-gray-500" />
                        </div>
                    </div>
                    <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-xs text-gray-400">Last Updated</p>
                                <p className="text-sm font-medium text-white">{formatDate(statistics.lastUpdated)}</p>
                            </div>
                            <Clock className="h-8 w-8 text-gray-500" />
                        </div>
                    </div>
                </div>
            )}

            {/* Main Configuration Card */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                {!editing ? (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-cyan-500/20 rounded-full mb-4">
                            <Droplet className="h-10 w-10 text-cyan-400" />
                        </div>
                        <p className="text-gray-400 mb-2">Current Rate per Water Connection</p>
                        <p className="text-5xl font-bold text-orange-400">{formatCurrency(config?.costPerConnection || 0)}</p>
                        <p className="text-sm text-gray-500 mt-2">per connection</p>
                        <div className="flex justify-center gap-3 mt-6">
                            <button
                                onClick={handleReset}
                                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition flex items-center gap-2"
                            >
                                <RotateCcw size={16} />
                                Reset to Default
                            </button>
                            <button
                                onClick={() => setEditing(true)}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition flex items-center gap-2"
                            >
                                <Pencil size={16} />
                                Edit Rate
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div className="text-center mb-4">
                            <p className="text-gray-400 mb-2">Edit Water Connection Rate</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Rate per Connection (₹)
                            </label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                <input
                                    type="number"
                                    value={tempRate}
                                    onChange={(e) => setTempRate(e.target.value)}
                                    className="w-full pl-8 pr-4 py-3 bg-gray-700 border border-gray-600 rounded-lg text-white text-lg focus:outline-none focus:border-orange-500"
                                    placeholder="15000"
                                />
                            </div>
                            <p className="text-xs text-gray-500 mt-1">Cost per water connection for exhibitors</p>
                        </div>
                        <div className="flex justify-end gap-3 pt-2">
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    if (config) {
                                        setTempRate(config.costPerConnection.toString());
                                    }
                                }}
                                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2"
                            >
                                <Save size={16} />
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Rate History Section */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition"
                >
                    <div className="flex items-center gap-2">
                        <History className="h-5 w-5 text-cyan-400" />
                        <h3 className="text-lg font-semibold text-white">Rate History</h3>
                        <span className="text-xs text-gray-500">Last 10 updates</span>
                    </div>
                    <RefreshCw size={16} className={`text-gray-400 transition-transform ${showHistory ? 'rotate-180' : ''}`} />
                </button>

                {showHistory && (
                    <div className="border-t border-gray-700">
                        {rateHistory.length === 0 ? (
                            <div className="p-6 text-center text-gray-400">
                                No rate history available
                            </div>
                        ) : (
                            <div className="overflow-x-auto">
                                <table className="w-full">
                                    <thead className="bg-gray-800/80">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Rate per Connection</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Updated At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {rateHistory.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-700/50 transition">
                                                <td className="px-6 py-3">
                                                    <span className="text-orange-400 font-bold">{formatCurrency(item.costPerConnection)}</span>
                                                </td>
                                                <td className="px-6 py-3">
                                                    <span className="text-gray-300 text-sm">{formatDate(item.updatedAt)}</span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        )}
                    </div>
                )}
            </div>

            {/* Info Card */}
            <div className="mt-6 bg-blue-500/10 rounded-xl border border-blue-500/30 p-4">
                <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Calculator className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-blue-400">Cost Calculation</h3>
                        <p className="text-xs text-gray-400 mt-1">
                            Total cost = Number of connections × Rate per connection.
                            Current rate: {formatCurrency(config?.costPerConnection || 0)} per water connection.
                            For multiple connections, the cost is calculated proportionally.
                        </p>
                    </div>
                </div>
            </div>

            {/* Sample Calculation Preview */}
            <div className="mt-4 bg-gray-800/30 rounded-lg p-4">
                <h4 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                    <Calculator size={14} />
                    Sample Calculations
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                        <span className="text-gray-400">1 connection:</span>
                        <span className="text-orange-400 font-bold">{formatCurrency(config?.costPerConnection || 0)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                        <span className="text-gray-400">2 connections:</span>
                        <span className="text-orange-400 font-bold">{formatCurrency((config?.costPerConnection || 0) * 2)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                        <span className="text-gray-400">5 connections:</span>
                        <span className="text-orange-400 font-bold">{formatCurrency((config?.costPerConnection || 0) * 5)}</span>
                    </div>
                    <div className="flex justify-between items-center p-2 bg-gray-700/30 rounded">
                        <span className="text-gray-400">10 connections:</span>
                        <span className="text-orange-400 font-bold">{formatCurrency((config?.costPerConnection || 0) * 10)}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}