// app/admin/security-deposit/page.tsx - Admin configures security deposit tiers
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Save, Pencil, Shield, DollarSign, X } from "lucide-react";
import toast from "react-hot-toast";

interface DepositTier {
    id: string;
    category: string;
    minSqMtr: number;
    maxSqMtr: number;
    amountINR: number;
    amountUSD: number;
    isActive: boolean;
}

const sampleTiers: DepositTier[] = [
    { id: "1", category: "0-36", minSqMtr: 0, maxSqMtr: 36, amountINR: 25000, amountUSD: 300, isActive: true },
    { id: "2", category: "37-100", minSqMtr: 37, maxSqMtr: 100, amountINR: 50000, amountUSD: 600, isActive: true },
    { id: "3", category: "101+", minSqMtr: 101, maxSqMtr: 9999, amountINR: 100000, amountUSD: 1200, isActive: true },
];

export default function AdminSecurityDepositPage() {
    const [tiers, setTiers] = useState(sampleTiers);
    const [showModal, setShowModal] = useState(false);
    const [editingTier, setEditingTier] = useState<DepositTier | null>(null);
    const [formData, setFormData] = useState({ category: "", minSqMtr: 0, maxSqMtr: 0, amountINR: 0, amountUSD: 0 });

    const handleSave = () => {
        if (editingTier) {
            setTiers(tiers.map(t => t.id === editingTier.id ? { ...t, ...formData, category: formData.category } : t));
            toast.success("Tier updated");
        } else {
            setTiers([...tiers, { id: Date.now().toString(), ...formData, category: formData.category, isActive: true }]);
            toast.success("Tier added");
        }
        setShowModal(false);
        setEditingTier(null);
        setFormData({ category: "", minSqMtr: 0, maxSqMtr: 0, amountINR: 0, amountUSD: 0 });
    };

    const handleDelete = (id: string) => {
        setTiers(tiers.filter(t => t.id !== id));
        toast.success("Tier deleted");
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="max-w-5xl mx-auto p-6">
            <div className="flex justify-between items-center mb-6">
                <div className="flex items-center gap-3">
                    <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center"><Shield className="h-6 w-6 text-emerald-600" /></div>
                    <div><h1 className="text-2xl font-bold text-white">Security Deposit Tiers</h1><p className="text-gray-400 mt-1">Configure deposit amounts by booth area</p></div>
                </div>
                <button onClick={() => { setEditingTier(null); setFormData({ category: "", minSqMtr: 0, maxSqMtr: 0, amountINR: 0, amountUSD: 0 }); setShowModal(true); }} className="px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 flex items-center gap-2"><Plus size={18} /> Add Tier</button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {tiers.map((tier) => (
                    <div key={tier.id} className="bg-gray-800/50 rounded-xl border border-gray-700 p-5">
                        <div className="flex justify-between items-start mb-3">
                            <div><h3 className="text-xl font-bold text-white">{tier.category} sq.m</h3><p className="text-sm text-gray-400">{tier.minSqMtr} - {tier.maxSqMtr === 9999 ? "Above" : tier.maxSqMtr} sq.m</p></div>
                            <div className="flex gap-1"><button onClick={() => { setEditingTier(tier); setFormData({ category: tier.category, minSqMtr: tier.minSqMtr, maxSqMtr: tier.maxSqMtr, amountINR: tier.amountINR, amountUSD: tier.amountUSD }); setShowModal(true); }} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"><Edit size={16} /></button><button onClick={() => handleDelete(tier.id)} className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg"><Trash2 size={16} /></button></div>
                        </div>
                        <div className="pt-3 border-t border-gray-700"><p className="text-xs text-gray-500">Security Deposit</p><p className="text-2xl font-bold text-orange-400">{formatCurrency(tier.amountINR)}</p><p className="text-xs text-gray-500">USD {tier.amountUSD}</p></div>
                    </div>
                ))}
            </div>

            {showModal && (
                <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
                    <div className="bg-gray-800 rounded-2xl max-w-md w-full p-6 border border-gray-700">
                        <div className="flex justify-between items-center mb-4"><h3 className="text-xl font-bold text-white">{editingTier ? "Edit Tier" : "Add New Tier"}</h3><button onClick={() => setShowModal(false)} className="p-1 text-gray-400 hover:text-white"><X size={20} /></button></div>
                        <div className="space-y-3">
                            <div><label className="block text-sm text-gray-300 mb-1">Category Name</label><input type="text" value={formData.category} onChange={(e) => setFormData({ ...formData, category: e.target.value })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" placeholder="e.g., 0-36" /></div>
                            <div className="grid grid-cols-2 gap-3">
                                <div><label className="block text-sm text-gray-300 mb-1">Min (sq.m)</label><input type="number" value={formData.minSqMtr} onChange={(e) => setFormData({ ...formData, minSqMtr: parseInt(e.target.value) })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                                <div><label className="block text-sm text-gray-300 mb-1">Max (sq.m)</label><input type="number" value={formData.maxSqMtr} onChange={(e) => setFormData({ ...formData, maxSqMtr: parseInt(e.target.value) })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                            </div>
                            <div><label className="block text-sm text-gray-300 mb-1">Amount (INR)</label><input type="number" value={formData.amountINR} onChange={(e) => setFormData({ ...formData, amountINR: parseInt(e.target.value) })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                            <div><label className="block text-sm text-gray-300 mb-1">Amount (USD)</label><input type="number" value={formData.amountUSD} onChange={(e) => setFormData({ ...formData, amountUSD: parseInt(e.target.value) })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                        </div>
                        <div className="flex gap-3 mt-6"><button onClick={() => setShowModal(false)} className="flex-1 px-4 py-2 border border-gray-600 rounded-lg text-gray-300">Cancel</button><button onClick={handleSave} className="flex-1 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700">Save</button></div>
                    </div>
                </div>
            )}
        </div>
    );
}