// app/admin/booth-addons/page.tsx
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, Package, CheckCircle, XCircle, Wifi, Plug, Coffee, Shield, Tv, Fan, Mic, Refrigerator,DollarSign } from "lucide-react";
import Link from "next/link";

interface BoothAddon {
    id: string;
    name: string;
    description: string;
    price: string;
    category: string;
    isRequired: boolean;
    status: "active" | "inactive";
    icon: string;
}

const sampleAddons: BoothAddon[] = [
    { id: "1", name: "WiFi Connection", description: "High-speed internet connection", price: "₹5,000", category: "Technology", isRequired: false, status: "active", icon: "Wifi" },
    { id: "2", name: "Extra Power Supply", description: "Additional 15A power outlet", price: "₹3,000", category: "Electrical", isRequired: false, status: "active", icon: "Plug" },
    { id: "3", name: "Furniture Package", description: "Table, chairs, storage cabinet", price: "₹8,000", category: "Furniture", isRequired: false, status: "active", icon: "Package" },
    { id: "4", name: "Security Service", description: "24/7 booth security", price: "₹12,000", category: "Security", isRequired: false, status: "active", icon: "Shield" },
    { id: "5", name: "LED Display Screen", description: "55\" LED display for presentations", price: "₹15,000", category: "AV Equipment", isRequired: false, status: "active", icon: "Tv" },
    { id: "6", name: "Coffee Machine", description: "Commercial coffee machine", price: "₹7,000", category: "Catering", isRequired: false, status: "active", icon: "Coffee" },
    { id: "7", name: "Air Conditioning", description: "Additional AC unit", price: "₹10,000", category: "HVAC", isRequired: false, status: "inactive", icon: "Fan" },
    { id: "8", name: "Refrigerator", description: "Mini fridge for refreshments", price: "₹6,000", category: "Appliances", isRequired: false, status: "active", icon: "Fridge" },
    { id: "9", name: "PA System", description: "Public address system", price: "₹9,000", category: "AV Equipment", isRequired: false, status: "active", icon: "Mic" },
];

const getIconComponent = (iconName: string) => {
    switch (iconName) {
        case "Wifi": return <Wifi className="h-5 w-5" />;
        case "Plug": return <Plug className="h-5 w-5" />;
        case "Package": return <Package className="h-5 w-5" />;
        case "Shield": return <Shield className="h-5 w-5" />;
        case "Tv": return <Tv className="h-5 w-5" />;
        case "Coffee": return <Coffee className="h-5 w-5" />;
        case "Fan": return <Fan className="h-5 w-5" />;
        case "Fridge": return <Refrigerator className="h-5 w-5" />;
        case "Mic": return <Mic className="h-5 w-5" />;
        default: return <Package className="h-5 w-5" />;
    }
};

export default function BoothAddonsPage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("all");
    const [statusFilter, setStatusFilter] = useState("all");

    const categories = ["all", "Technology", "Electrical", "Furniture", "Security", "AV Equipment", "Catering", "HVAC", "Appliances"];

    const filteredAddons = sampleAddons.filter(addon => {
        const matchesSearch = addon.name.toLowerCase().includes(search.toLowerCase()) ||
            addon.description.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "all" || addon.category === categoryFilter;
        const matchesStatus = statusFilter === "all" || addon.status === statusFilter;
        return matchesSearch && matchesCategory && matchesStatus;
    });

    const totalRevenue = filteredAddons.reduce((acc, addon) => {
        const priceNum = parseInt(addon.price.replace(/[^0-9]/g, ""));
        return acc + priceNum;
    }, 0);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Booth Add-ons</h1>
                    <p className="text-gray-400 mt-1">Manage additional services and equipment for booths</p>
                </div>
                <Link
                    href="/admin/booth-addons/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Add-on
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Package size={16} />
                        <span className="text-sm">Total Add-ons</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleAddons.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleAddons.filter(a => a.status === "active").length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Package size={16} />
                        <span className="text-sm">Categories</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">8</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <DollarSign size={16} />
                        <span className="text-sm">Total Value</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-400">₹{(totalRevenue / 1000).toFixed(0)}K</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search add-ons..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        {categories.map(cat => (
                            <option key={cat} value={cat}>{cat === "all" ? "All Categories" : cat}</option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                </div>
            </div>

            {/* Add-ons Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAddons.map((addon) => (
                    <div key={addon.id} className={`bg-gray-800/50 rounded-xl border ${addon.status === "active" ? "border-gray-700" : "border-gray-700 opacity-70"} overflow-hidden hover:border-orange-500/30 transition-all`}>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center text-orange-400">
                                        {getIconComponent(addon.icon)}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-white">{addon.name}</h3>
                                            {addon.isRequired && (
                                                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">Required</span>
                                            )}
                                        </div>
                                        <p className="text-xs text-gray-400">{addon.category}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 mb-4">{addon.description}</p>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                <div>
                                    <span className="text-xs text-gray-500">Price</span>
                                    <p className="text-xl font-bold text-orange-400">{addon.price}</p>
                                </div>
                                <span className={`px-2 py-1 rounded-full text-xs font-medium ${addon.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                    {addon.status}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredAddons.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <Package className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No add-ons found</p>
                </div>
            )}
        </div>
    );
}