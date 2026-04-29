// app/admin/housekeeping/page.tsx - Admin configures housekeeping rates
"use client";

import { useState } from "react";
import { Save, Pencil, Home, Clock, Users } from "lucide-react";
import toast from "react-hot-toast";

interface HousekeepingConfig {
    chargesPerShift: number;
    shiftHours: number;
}

export default function AdminHousekeepingPage() {
    const [config, setConfig] = useState({ chargesPerShift: 2000, shiftHours: 8 });
    const [editing, setEditing] = useState(false);
    const [tempConfig, setTempConfig] = useState({ chargesPerShift: "2000", shiftHours: "8" });

    const handleSave = () => {
        setConfig({ chargesPerShift: parseInt(tempConfig.chargesPerShift) || 0, shiftHours: parseInt(tempConfig.shiftHours) || 8 });
        setEditing(false);
        toast.success("Housekeeping rates updated");
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="max-w-2xl mx-auto p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center">
                    <Home className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Housekeeping Configuration</h1>
                    <p className="text-gray-400 mt-1">Set rates for housekeeping staff</p>
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                {!editing ? (
                    <div className="grid grid-cols-2 gap-6">
                        <div className="text-center p-4 bg-gray-700/30 rounded-lg"><p className="text-gray-400 mb-1">Charge per Shift</p><p className="text-2xl font-bold text-orange-400">{formatCurrency(config.chargesPerShift)}</p><p className="text-xs text-gray-500">per staff per shift</p></div>
                        <div className="text-center p-4 bg-gray-700/30 rounded-lg"><p className="text-gray-400 mb-1">Shift Hours</p><p className="text-2xl font-bold text-white">{config.shiftHours} hours</p><p className="text-xs text-gray-500">per shift</p></div>
                        <div className="col-span-2"><button onClick={() => { setEditing(true); setTempConfig({ chargesPerShift: config.chargesPerShift.toString(), shiftHours: config.shiftHours.toString() }); }} className="w-full px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center justify-center gap-2"><Pencil size={16} /> Edit Rates</button></div>
                    </div>
                ) : (
                    <div className="space-y-4">
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Charge per Shift (₹)</label><input type="number" value={tempConfig.chargesPerShift} onChange={(e) => setTempConfig({ ...tempConfig, chargesPerShift: e.target.value })} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                        <div><label className="block text-sm font-medium text-gray-300 mb-2">Shift Hours</label><input type="number" value={tempConfig.shiftHours} onChange={(e) => setTempConfig({ ...tempConfig, shiftHours: e.target.value })} className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                        <div className="flex justify-end gap-3"><button onClick={() => setEditing(false)} className="px-4 py-2 border border-gray-600 rounded-lg text-gray-300">Cancel</button><button onClick={handleSave} className="px-4 py-2 bg-green-600 text-white rounded-lg flex items-center gap-2"><Save size={16} /> Save</button></div>
                    </div>
                )}
            </div>
        </div>
    );
}