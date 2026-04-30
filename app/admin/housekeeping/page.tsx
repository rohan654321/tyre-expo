// app/admin/housekeeping/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Save, Pencil, Home, Clock, Users, RotateCcw, DollarSign, TrendingUp, Calculator } from "lucide-react";
import {
    getHousekeepingConfig,
    updateHousekeepingConfig,
    resetHousekeepingToDefault,
    getHousekeepingStatistics,
    HousekeepingConfig
} from "@/lib/api/housekeeping";
import toast from "react-hot-toast";

export default function AdminHousekeepingPage() {
    const [config, setConfig] = useState<HousekeepingConfig | null>(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [statistics, setStatistics] = useState({ totalConfigs: 0, currentRate: 0, averageRate: 0 });
    const [tempConfig, setTempConfig] = useState({ ratePerShift: "", shiftHours: "" });

    const fetchConfig = async () => {
        try {
            setLoading(true);
            const response = await getHousekeepingConfig();
            console.log("Housekeeping config response:", response);

            if (response && response.success !== false) {
                const configData = response.data || response;
                setConfig(configData);
                setTempConfig({
                    ratePerShift: configData.ratePerShift?.toString() || "2000",
                    shiftHours: configData.shiftHours?.toString() || "10",
                });
            } else {
                // Use default values
                setTempConfig({
                    ratePerShift: "2000",
                    shiftHours: "10",
                });
            }
        } catch (error) {
            console.error("Failed to fetch housekeeping config:", error);
            toast.error("Failed to load housekeeping configuration");
            setTempConfig({
                ratePerShift: "2000",
                shiftHours: "10",
            });
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await getHousekeepingStatistics();
            console.log("Statistics response:", response);

            if (response && response.success) {
                const statsData = response.data;
                setStatistics({
                    totalConfigs: statsData?.totalConfigs || 0,
                    currentRate: statsData?.currentRate || 2000,
                    averageRate: statsData?.averageRate || 2000,
                });
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    useEffect(() => {
        fetchConfig();
        fetchStatistics();
    }, []);

    const handleSave = async () => {
        const newRate = parseInt(tempConfig.ratePerShift);
        const newHours = parseInt(tempConfig.shiftHours);

        if (isNaN(newRate) || newRate < 0) {
            toast.error("Please enter a valid rate");
            return;
        }
        if (isNaN(newHours) || newHours < 1 || newHours > 24) {
            toast.error("Shift hours must be between 1 and 24");
            return;
        }

        try {
            const response = await updateHousekeepingConfig({
                ratePerShift: newRate,  // Changed from ratePerStaffPerDay
                shiftHours: newHours,
            });
            console.log("Update response:", response);

            if (response && response.success !== false) {
                const updatedData = response.data || response;
                setConfig(updatedData);
                toast.success("Housekeeping rates updated successfully");
                setEditing(false);
                fetchStatistics();
            } else {
                toast.error(response?.message || response?.error || "Failed to update");
            }
        } catch (error: any) {
            console.error("Update error:", error);
            const errorMsg = error.response?.data?.message || error.response?.data?.error || "Failed to update housekeeping rates";
            toast.error(errorMsg);
        }
    };

    const handleReset = async () => {
        if (confirm("Are you sure you want to reset to default values (₹2000 per day, 10 hours shift)?")) {
            try {
                const response = await resetHousekeepingToDefault();
                if (response && response.success !== false) {
                    const resetData = response.data || response;
                    setConfig(resetData);
                    setTempConfig({
                        ratePerShift: resetData.ratePerShift?.toString() || "2000",
                        shiftHours: resetData.shiftHours?.toString() || "10",
                    });
                    toast.success("Reset to default values successfully");
                    setEditing(false);
                    fetchStatistics();
                } else {
                    toast.error(response?.message || "Failed to reset");
                }
            } catch (error) {
                toast.error("Failed to reset to default");
            }
        }
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            {/* Header */}
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-indigo-500/20 rounded-xl flex items-center justify-center">
                    <Home className="h-6 w-6 text-indigo-400" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Housekeeping Configuration</h1>
                    <p className="text-gray-400 mt-1">Set rates and working hours for housekeeping staff</p>
                </div>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Total Configurations</p>
                            <p className="text-2xl font-bold text-white">{statistics.totalConfigs}</p>
                        </div>
                        <TrendingUp className="h-8 w-8 text-gray-500" />
                    </div>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Current Rate</p>
                            <p className="text-2xl font-bold text-green-400">{formatCurrency(statistics.currentRate)}</p>
                        </div>
                        <DollarSign className="h-8 w-8 text-green-500/50" />
                    </div>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-xs text-gray-400">Average Rate</p>
                            <p className="text-2xl font-bold text-purple-400">{formatCurrency(statistics.averageRate)}</p>
                        </div>
                        <Calculator className="h-8 w-8 text-purple-500/50" />
                    </div>
                </div>
            </div>

            {/* Main Configuration Card */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                {!editing ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="text-center p-6 bg-gray-700/30 rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <DollarSign className="h-5 w-5 text-orange-400" />
                                    <p className="text-gray-400">Rate per Shift</p>
                                </div>
                                <p className="text-3xl font-bold text-orange-400">
                                    {formatCurrency(config?.ratePerShift || 2000)}
                                </p>
                                <p className="text-xs text-gray-500 mt-1">per staff per shift</p>
                            </div>
                            <div className="text-center p-6 bg-gray-700/30 rounded-lg">
                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <Clock className="h-5 w-5 text-orange-400" />
                                    <p className="text-gray-400">Shift Hours</p>
                                </div>
                                <p className="text-3xl font-bold text-white">{config?.shiftHours || 10} hours</p>
                                <p className="text-xs text-gray-500 mt-1">per shift</p>
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
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
                                Edit Rates
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Rate per Shift (₹)
                                </label>
                                <div className="relative">
                                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">₹</span>
                                    <input
                                        type="number"
                                        value={tempConfig.ratePerShift}
                                        onChange={(e) => setTempConfig({ ...tempConfig, ratePerShift: e.target.value })}
                                        className="w-full pl-8 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                        placeholder="2000"
                                    />
                                </div>
                                <p className="text-xs text-gray-500 mt-1">Cost per housekeeping staff member per shift</p>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Shift Hours
                                </label>
                                <input
                                    type="number"
                                    value={tempConfig.shiftHours}
                                    onChange={(e) => setTempConfig({ ...tempConfig, shiftHours: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    placeholder="10"
                                />
                                <p className="text-xs text-gray-500 mt-1">Hours per shift (1-24 hours)</p>
                            </div>
                        </div>

                        {/* Preview calculated costs */}
                        <div className="bg-gray-700/30 rounded-lg p-4">
                            <h3 className="text-sm font-medium text-gray-300 mb-3 flex items-center gap-2">
                                <Calculator size={16} />
                                Cost Preview
                            </h3>
                            <div className="grid grid-cols-2 gap-4 text-sm">
                                <div>
                                    <span className="text-gray-400">For 1 staff, 1 day (1 shift):</span>
                                    <p className="text-lg font-bold text-orange-400">
                                        {formatCurrency(parseInt(tempConfig.ratePerShift) || 0)}
                                    </p>
                                </div>
                                <div>
                                    <span className="text-gray-400">For 2 staff, 3 days:</span>
                                    <p className="text-lg font-bold text-orange-400">
                                        {formatCurrency((parseInt(tempConfig.ratePerShift) || 0) * 2 * 3)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                onClick={() => {
                                    setEditing(false);
                                    if (config) {
                                        setTempConfig({
                                            ratePerShift: config.ratePerShift?.toString() || "2000",
                                            shiftHours: config.shiftHours?.toString() || "10",
                                        });
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

            {/* Info Card */}
            <div className="mt-6 bg-blue-500/10 rounded-xl border border-blue-500/30 p-4">
                <div className="flex items-start gap-3">
                    <div className="h-8 w-8 bg-blue-500/20 rounded-lg flex items-center justify-center flex-shrink-0">
                        <Users className="h-4 w-4 text-blue-400" />
                    </div>
                    <div>
                        <h3 className="text-sm font-medium text-blue-400">Housekeeping Staff Information</h3>
                        <p className="text-xs text-gray-400 mt-1">
                            Rate applies per staff member per shift. Each shift lasts {config?.shiftHours || 10} hours.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}