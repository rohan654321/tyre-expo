// app/admin/security-guard/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Save, Pencil, Shield, RefreshCw, AlertCircle, History, TrendingUp } from "lucide-react";
import toast from "react-hot-toast";
import {
    getSecurityGuardConfig,
    updateSecurityGuardConfig,
    resetSecurityGuardConfig,
    validateSecurityGuardRate,
    getSecurityGuardRateHistory,
    type SecurityGuardConfig
} from "@/lib/api/securityGuard";

export default function AdminSecurityGuardPage() {
    const [rate, setRate] = useState(2500);
    const [editing, setEditing] = useState(false);
    const [tempRate, setTempRate] = useState("2500");
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);
    const [resetting, setResetting] = useState(false);
    const [validationError, setValidationError] = useState<string | null>(null);
    const [rateHistory, setRateHistory] = useState<any[]>([]);
    const [showHistory, setShowHistory] = useState(false);

    // Fetch current configuration on component mount
    useEffect(() => {
        fetchConfig();
        fetchRateHistory();
    }, []);

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const config = await getSecurityGuardConfig();
            setRate(config.ratePerGuardPerDay);
            setTempRate(config.ratePerGuardPerDay.toString());
        } catch (error: any) {
            console.error('Failed to fetch config:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to load configuration');
        } finally {
            setLoading(false);
        }
    };

    const fetchRateHistory = async () => {
        try {
            const history = await getSecurityGuardRateHistory();
            if (history.success) {
                setRateHistory(history.data || []);
            }
        } catch (error) {
            console.error('Failed to fetch rate history:', error);
        }
    };

    const handleRateChange = (value: string) => {
        setTempRate(value);
        const numValue = parseInt(value) || 0;
        const validation = validateSecurityGuardRate(numValue);
        setValidationError(validation.valid ? null : validation.message || null);
    };

    const handleSave = async () => {
        const newRate = parseInt(tempRate) || 0;

        const validation = validateSecurityGuardRate(newRate);
        if (!validation.valid) {
            toast.error(validation.message || 'Invalid rate');
            return;
        }

        try {
            setUpdating(true);
            const updatedConfig = await updateSecurityGuardConfig(newRate);
            setRate(updatedConfig.ratePerGuardPerDay);
            setEditing(false);
            setValidationError(null);
            toast.success(`Security guard rate updated to ₹${newRate.toLocaleString()} per day`);
            fetchRateHistory();
        } catch (error: any) {
            console.error('Failed to update rate:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to update rate');
        } finally {
            setUpdating(false);
        }
    };

    const handleReset = async () => {
        if (!confirm('Are you sure you want to reset to default rate (₹2500 per day)? This action cannot be undone.')) {
            return;
        }

        try {
            setResetting(true);
            const config = await resetSecurityGuardConfig();
            setRate(config.ratePerGuardPerDay);
            setTempRate(config.ratePerGuardPerDay.toString());
            toast.success('Rate reset to default successfully');
            fetchRateHistory();
        } catch (error: any) {
            console.error('Failed to reset rate:', error);
            toast.error(error.response?.data?.message || error.message || 'Failed to reset rate');
        } finally {
            setResetting(false);
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;
    const formatDate = (dateString: string) => {
        if (!dateString) return 'N/A';
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
            <div className="max-w-2xl mx-auto p-6">
                <div className="flex items-center justify-center h-64">
                    <div className="text-center">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500 mx-auto"></div>
                        <p className="text-gray-400 mt-4">Loading configuration...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-amber-500/20 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-amber-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Security Guard Configuration</h1>
                    <p className="text-gray-400 mt-1">Set rate per security guard per day</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Current Rate</p>
                            <p className="text-2xl font-bold text-orange-400">{formatCurrency(rate)}</p>
                            <p className="text-xs text-gray-500">per guard per day</p>
                        </div>
                        <Shield className="h-8 w-8 text-gray-500" />
                    </div>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Rate History</p>
                            <p className="text-2xl font-bold text-white">{rateHistory.length}</p>
                            <p className="text-xs text-gray-500">total updates</p>
                        </div>
                        <History className="h-8 w-8 text-gray-500" />
                    </div>
                </div>
            </div>

            {/* Main Configuration Card */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                {!editing ? (
                    <div className="text-center">
                        <div className="inline-flex items-center justify-center w-20 h-20 bg-amber-500/20 rounded-full mb-4">
                            <Shield className="h-10 w-10 text-amber-400" />
                        </div>
                        <p className="text-gray-400 mb-2">Current Rate per Security Guard</p>
                        <p className="text-5xl font-bold text-orange-400">{formatCurrency(rate)}</p>
                        <p className="text-sm text-gray-500 mt-2">per guard per day</p>

                        <div className="flex gap-3 justify-center mt-6">
                            <button
                                onClick={() => { setEditing(true); setTempRate(rate.toString()); setValidationError(null); }}
                                className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 transition-colors"
                                disabled={updating}
                            >
                                <Pencil size={16} /> Edit Rate
                            </button>

                            <button
                                onClick={handleReset}
                                className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 flex items-center gap-2 transition-colors"
                                disabled={resetting}
                            >
                                {resetting ? (
                                    <RefreshCw size={16} className="animate-spin" />
                                ) : (
                                    <RefreshCw size={16} />
                                )}
                                Reset to Default
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Rate per Guard per Day (₹)
                            </label>
                            <input
                                type="number"
                                value={tempRate}
                                onChange={(e) => handleRateChange(e.target.value)}
                                className={`w-full px-4 py-2.5 bg-gray-700 border rounded-lg text-white focus:outline-none focus:border-orange-500 transition-colors ${validationError ? 'border-red-500' : 'border-gray-600'
                                    }`}
                                placeholder="Enter rate in INR"
                                min="0"
                                step="100"
                            />
                            {validationError && (
                                <p className="text-xs text-red-400 mt-1 flex items-center gap-1">
                                    <AlertCircle size={12} />
                                    {validationError}
                                </p>
                            )}
                            <p className="text-xs text-gray-500 mt-1">
                                Recommended range: ₹500 - ₹10,000 per day
                            </p>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => setEditing(false)}
                                className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700 transition-colors"
                                disabled={updating}
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleSave}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2 hover:bg-green-700 disabled:opacity-50 transition-colors"
                                disabled={updating || !!validationError}
                            >
                                {updating ? (
                                    <>
                                        <RefreshCw size={16} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        <Save size={16} />
                                        Save
                                    </>
                                )}
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {/* Rate History Section */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden mb-6">
                <button
                    onClick={() => setShowHistory(!showHistory)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-700/50 transition"
                >
                    <div className="flex items-center gap-2">
                        <History className="h-5 w-5 text-amber-400" />
                        <h3 className="text-lg font-semibold text-white">Rate History</h3>
                        <span className="text-xs text-gray-500">Last updates</span>
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
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Rate per Day</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Updated At</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-gray-700">
                                        {rateHistory.map((item, index) => (
                                            <tr key={index} className="hover:bg-gray-700/50 transition">
                                                <td className="px-6 py-3">
                                                    <span className="text-orange-400 font-bold">{formatCurrency(item.ratePerGuardPerDay)}</span>
                                                    <span className="text-xs text-gray-500 ml-1">per day</span>
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
            <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                <p className="text-sm text-blue-300 flex items-start gap-2">
                    <span>📌</span>
                    <span>This rate will be shown to exhibitors when they request security guards</span>
                </p>
                <p className="text-xs text-blue-300/70 mt-2 ml-5">
                    Total cost = Quantity × Number of Days × Rate per day (₹{rate.toLocaleString()})
                </p>
            </div>

            {/* Preview Section */}
            <div className="mt-6 bg-gray-800/30 rounded-xl p-4 border border-gray-700">
                <h3 className="text-sm font-semibold text-gray-300 mb-3 flex items-center gap-2">
                    <TrendingUp size={14} />
                    Cost Calculator Preview
                </h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                    <div className="p-2 bg-gray-700/30 rounded">
                        <p className="text-gray-500">Per Guard (1 day)</p>
                        <p className="text-white font-semibold text-lg">{formatCurrency(rate)}</p>
                    </div>
                    <div className="p-2 bg-gray-700/30 rounded">
                        <p className="text-gray-500">2 Guards × 3 Days</p>
                        <p className="text-white font-semibold text-lg">{formatCurrency(rate * 2 * 3)}</p>
                    </div>
                    <div className="p-2 bg-gray-700/30 rounded">
                        <p className="text-gray-500">5 Guards × 5 Days</p>
                        <p className="text-white font-semibold text-lg">{formatCurrency(rate * 5 * 5)}</p>
                    </div>
                    <div className="p-2 bg-gray-700/30 rounded">
                        <p className="text-gray-500">10 Guards × 7 Days</p>
                        <p className="text-white font-semibold text-lg">{formatCurrency(rate * 10 * 7)}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}