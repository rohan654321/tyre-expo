// app/admin/electrical-rates/page.tsx - Admin configures electrical rates
"use client";

import { useState, useEffect } from "react";
import { Save, Pencil, CheckCircle, XCircle, BoltIcon, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

interface ElectricalConfig {
    costPerKW: number;
    socketCost: number;
    lightingCost: number;
    createdAt: string;
    updatedAt: string;
}

const defaultConfig: ElectricalConfig = {
    costPerKW: 3500,
    socketCost: 1500,
    lightingCost: 800,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
};

export default function AdminElectricalRatesPage() {
    const [config, setConfig] = useState<ElectricalConfig>(defaultConfig);
    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        costPerKW: "3500",
        socketCost: "1500",
        lightingCost: "800",
    });

    const handleSave = async () => {
        setLoading(true);
        const newConfig = {
            ...config,
            costPerKW: parseInt(formData.costPerKW) || 0,
            socketCost: parseInt(formData.socketCost) || 0,
            lightingCost: parseInt(formData.lightingCost) || 0,
            updatedAt: new Date().toISOString(),
        };
        setConfig(newConfig);
        setEditing(false);
        toast.success("Electrical rates updated successfully");
        setLoading(false);
    };

    const handleReset = () => {
        setFormData({
            costPerKW: defaultConfig.costPerKW.toString(),
            socketCost: defaultConfig.socketCost.toString(),
            lightingCost: defaultConfig.lightingCost.toString(),
        });
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
                    <BoltIcon className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Electrical Rates Configuration</h1>
                    <p className="text-gray-400 mt-1">Set pricing for electrical requirements</p>
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                {!editing ? (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                <p className="text-sm text-gray-400 mb-1">Cost per KW</p>
                                <p className="text-2xl font-bold text-orange-400">{formatCurrency(config.costPerKW)}</p>
                                <p className="text-xs text-gray-500 mt-1">per kilowatt</p>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                <p className="text-sm text-gray-400 mb-1">Power Socket</p>
                                <p className="text-2xl font-bold text-orange-400">{formatCurrency(config.socketCost)}</p>
                                <p className="text-xs text-gray-500 mt-1">per socket</p>
                            </div>
                            <div className="bg-gray-700/50 rounded-lg p-4 text-center">
                                <p className="text-sm text-gray-400 mb-1">Lighting Point</p>
                                <p className="text-2xl font-bold text-orange-400">{formatCurrency(config.lightingCost)}</p>
                                <p className="text-xs text-gray-500 mt-1">per point</p>
                            </div>
                        </div>
                        <div className="flex justify-end">
                            <button onClick={() => setEditing(true)} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2">
                                <Pencil size={16} /> Edit Rates
                            </button>
                        </div>
                    </div>
                ) : (
                    <div className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Cost per KW (₹)</label>
                                <input type="number" value={formData.costPerKW} onChange={(e) => setFormData({ ...formData, costPerKW: e.target.value })} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Power Socket Cost (₹)</label>
                                <input type="number" value={formData.socketCost} onChange={(e) => setFormData({ ...formData, socketCost: e.target.value })} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">Lighting Point Cost (₹)</label>
                                <input type="number" value={formData.lightingCost} onChange={(e) => setFormData({ ...formData, lightingCost: e.target.value })} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" />
                            </div>
                        </div>
                        <div className="flex justify-end gap-3">
                            <button onClick={() => { setEditing(false); handleReset(); }} className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-700">Cancel</button>
                            <button onClick={handleSave} disabled={loading} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 flex items-center gap-2">
                                {loading ? <div className="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent"></div> : <Save size={16} />}
                                Save Changes
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}