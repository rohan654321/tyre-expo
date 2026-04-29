// app/admin/hostess-rates/page.tsx - Admin manages hostess categories
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Save, Pencil, Sparkles, Users } from "lucide-react";
import toast from "react-hot-toast";

interface HostessCategory {
    id: string;
    category: "A" | "B";
    ratePerDay: number;
    workingHours: number;
    description: string;
    isActive: boolean;
}

const sampleCategories: HostessCategory[] = [
    { id: "1", category: "A", ratePerDay: 5000, workingHours: 8, description: "Professional hostess - English & Hindi speaking", isActive: true },
    { id: "2", category: "B", ratePerDay: 4000, workingHours: 8, description: "Bilingual hostess - English + Regional language", isActive: true },
];

export default function AdminHostessRatesPage() {
    const [categories, setCategories] = useState(sampleCategories);
    const [editing, setEditing] = useState<string | null>(null);
    const [editForm, setEditForm] = useState({ ratePerDay: 0, workingHours: 8, description: "" });

    const handleSave = (id: string) => {
        setCategories(categories.map(cat => cat.id === id ? { ...cat, ratePerDay: editForm.ratePerDay, workingHours: editForm.workingHours, description: editForm.description } : cat));
        setEditing(null);
        toast.success("Hostess rate updated");
    };

    const formatCurrency = (amount: number) => `₹${amount.toLocaleString()}`;

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="flex items-center gap-3 mb-6">
                <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center">
                    <Sparkles className="h-6 w-6 text-pink-600" />
                </div>
                <div>
                    <h1 className="text-2xl font-bold text-white">Hostess Services Configuration</h1>
                    <p className="text-gray-400 mt-1">Set rates for hostess categories</p>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((cat) => (
                    <div key={cat.id} className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <div className="flex justify-between items-start mb-4">
                            <div>
                                <div className="flex items-center gap-2">
                                    <h2 className="text-xl font-bold text-white">Category {cat.category}</h2>
                                    <span className={`px-2 py-0.5 rounded-full text-xs ${cat.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                        {cat.isActive ? "Active" : "Inactive"}
                                    </span>
                                </div>
                                {editing === cat.id ? (
                                    <input type="text" value={editForm.description} onChange={(e) => setEditForm({ ...editForm, description: e.target.value })} className="mt-2 w-full px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white text-sm" />
                                ) : (
                                    <p className="text-sm text-gray-400 mt-1">{cat.description}</p>
                                )}
                            </div>
                            {editing !== cat.id && <button onClick={() => { setEditing(cat.id); setEditForm({ ratePerDay: cat.ratePerDay, workingHours: cat.workingHours, description: cat.description }); }} className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg"><Pencil size={16} /></button>}
                        </div>

                        {editing === cat.id ? (
                            <div className="space-y-4">
                                <div className="grid grid-cols-2 gap-3">
                                    <div><label className="block text-sm text-gray-400 mb-1">Rate per Day (₹)</label><input type="number" value={editForm.ratePerDay} onChange={(e) => setEditForm({ ...editForm, ratePerDay: parseInt(e.target.value) })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                                    <div><label className="block text-sm text-gray-400 mb-1">Working Hours</label><input type="number" value={editForm.workingHours} onChange={(e) => setEditForm({ ...editForm, workingHours: parseInt(e.target.value) })} className="w-full px-3 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white" /></div>
                                </div>
                                <div className="flex justify-end gap-2"><button onClick={() => setEditing(null)} className="px-3 py-1.5 border border-gray-600 rounded-lg text-gray-300">Cancel</button><button onClick={() => handleSave(cat.id)} className="px-3 py-1.5 bg-green-600 text-white rounded-lg">Save</button></div>
                            </div>
                        ) : (
                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                <div><span className="text-xs text-gray-500">Daily Rate</span><p className="text-2xl font-bold text-orange-400">{formatCurrency(cat.ratePerDay)}</p></div>
                                <div className="text-right"><span className="text-xs text-gray-500">Working Hours</span><p className="text-white font-medium">{cat.workingHours} hours/day</p></div>
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}