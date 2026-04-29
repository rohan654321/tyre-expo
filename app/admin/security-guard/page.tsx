// app/admin/security-guard/page.tsx - Admin configures security guard rates
"use client";

import { useState } from "react";
import { Save, Pencil, Shield, Clock, DollarSign } from "lucide-react";
import toast from "react-hot-toast";

interface SecurityConfig {
    ratePerGuardPerDay: number;
}

export default function AdminSecurityGuardPage() {
    const [rate, setRate] = useState(2500);
    const [editing, setEditing] = useState(false);
    const [tempRate, setTempRate] = useState("2500");

    const handleSave = () => {
        setRate(parseInt(tempRate) || 0);
        setEditing(false);
        toast.success("Security guard rate updated");
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
                    <Shield className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Security Guard Configuration</h1>
                    <p className="text-gray-400 mt-1">Set rate per security guard per day</p>
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                {!editing ? (
                    <div className="text-center">
                        <p className="text-gray-400 mb-2">Current Rate</p>
                        <p className="text-4xl font-bold text-orange-400">{formatCurrency(rate)}</p>
                        <p className="text-sm text-gray-500 mt-1">per guard per day</p>
                        <button onClick={() => { setEditing(true); setTempRate(rate.toString()); }} className="mt-6 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2 mx-auto">
                            <Pencil size={16} /> Edit Rate
                        </button>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Rate per Guard per Day (₹)</label><input type="number" value={tempRate} onChange={(e) => setTempRate(e.target.value)} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                        <div className="flex justify-end gap-3"><button onClick={() => setEditing(false)} className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300">Cancel</button><button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"><Save size={16} /> Save</button></div>
                    </div>
                )}
            </div>

            <div className="mt-4 bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                <p className="text-sm text-blue-300">📌 This rate will be shown to exhibitors when they request security guards</p>
            </div>
        </div>
    );
}