// app/admin/furniture/page.tsx - Admin manages furniture catalog
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, Package, CheckCircle, XCircle, Eye, } from "lucide-react";
import Link from "next/link";

interface FurnitureItem {
    id: string;
    code: string;
    name: string;
    description: string;
    pricePerDay: number;
    category: string;
    isActive: boolean;
    imageUrl?: string;
}

const sampleFurniture: FurnitureItem[] = [
    { id: "1", code: "TBL-01", name: "Display Table", description: "Premium wooden display table 6ft x 3ft", pricePerDay: 800, category: "Tables", isActive: true },
    { id: "2", code: "TBL-02", name: "Round Conference Table", description: "Glass top conference table with 4 chairs", pricePerDay: 1200, category: "Tables", isActive: true },
    { id: "3", code: "CHR-01", name: "Executive Chair", description: "Leather executive chair with armrest", pricePerDay: 400, category: "Chairs", isActive: true },
    { id: "4", code: "CHR-02", name: "Visitor Chair", description: "Comfortable visitor chair with cushion", pricePerDay: 250, category: "Chairs", isActive: true },
    { id: "5", code: "SOF-01", name: "Lounge Sofa", description: "3-seater premium lounge sofa", pricePerDay: 1500, category: "Seating", isActive: true },
    { id: "6", code: "CTR-01", name: "Reception Counter", description: "Modern reception counter with logo space", pricePerDay: 2000, category: "Counters", isActive: false },
];

const categories = ["All", "Tables", "Chairs", "Seating", "Counters", "Storage", "Display", "Decor"];

export default function AdminFurniturePage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredItems = sampleFurniture.filter(item => {
        const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase()) ||
            item.code.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "All" || item.category === categoryFilter;
        const matchesStatus = statusFilter === "all" || (statusFilter === "active" ? item.isActive : !item.isActive);
        return matchesSearch && matchesCategory && matchesStatus;
    });

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Furniture Catalog</h1>
                    <p className="text-gray-400 mt-1">Manage furniture items visible to exhibitors</p>
                </div>
                <Link href="/admin/furniture/new" className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2">
                    <Plus size={18} />
                    Add Furniture
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{sampleFurniture.length}</p>
                    <p className="text-xs text-gray-400">Total Items</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{sampleFurniture.filter(i => i.isActive).length}</p>
                    <p className="text-xs text-gray-400">Active</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-2xl font-bold text-purple-400">{categories.length - 1}</p>
                    <p className="text-xs text-gray-400">Categories</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input type="text" placeholder="Search by name or code..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500" />
                    </div>
                    <select value={categoryFilter} onChange={(e) => setCategoryFilter(e.target.value)} className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white">
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Furniture Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                    <div key={item.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500/30 transition-all">
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs px-2 py-0.5 bg-gray-700 rounded-full text-gray-300">{item.category}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${item.isActive ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                            {item.isActive ? "Active" : "Inactive"}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                    <p className="text-xs text-gray-500 font-mono mt-1">{item.code}</p>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"><Edit size={16} /></button>
                                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition"><Trash2 size={16} /></button>
                                </div>
                            </div>
                            <p className="text-sm text-gray-400 mb-3">{item.description}</p>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                                <div>
                                    <span className="text-xs text-gray-500">Price per day</span>
                                    <p className="text-xl font-bold text-orange-400">₹{item.pricePerDay.toLocaleString()}</p>
                                </div>
                                <button className="px-3 py-1.5 bg-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-600 transition">Edit</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}