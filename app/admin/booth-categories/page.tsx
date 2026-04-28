// app/admin/booth-categories/page.tsx
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search, LayoutDashboard, CheckCircle, XCircle, DollarSign, Ruler } from "lucide-react";
import Link from "next/link";

interface BoothCategory {
    id: string;
    name: string;
    size: string;
    price: string;
    capacity: string;
    amenities: string[];
    description: string;
    availableCount: number;
    totalCount: number;
    status: "active" | "inactive";
}

const sampleCategories: BoothCategory[] = [
    { id: "1", name: "Standard Booth", size: "9x9 m", price: "₹1,50,000", capacity: "Standard setup", amenities: ["Basic lighting", "1 Table", "2 Chairs", "Power outlet"], description: "Standard exhibition booth with basic amenities", availableCount: 12, totalCount: 25, status: "active" },
    { id: "2", name: "Corner Booth", size: "12x12 m", price: "₹2,00,000", capacity: "Premium setup", amenities: ["Premium lighting", "2 Tables", "4 Chairs", "Power outlet", "WiFi"], description: "Corner booth with premium visibility", availableCount: 5, totalCount: 15, status: "active" },
    { id: "3", name: "Double Booth", size: "9x18 m", price: "₹2,50,000", capacity: "Double setup", amenities: ["Basic lighting", "2 Tables", "4 Chairs", "Power outlet", "Storage"], description: "Double-width booth for larger displays", availableCount: 3, totalCount: 10, status: "active" },
    { id: "4", name: "Island Booth", size: "15x15 m", price: "₹3,50,000", capacity: "Premium setup", amenities: ["Premium lighting", "4 Tables", "8 Chairs", "High power", "WiFi", "Catering area"], description: "Island booth with 360° visibility", availableCount: 2, totalCount: 8, status: "active" },
    { id: "5", name: "Premium Suite", size: "20x20 m", price: "₹5,00,000", capacity: "Executive setup", amenities: ["Premium lighting", "VIP lounge", "Meeting room", "Catering", "Dedicated staff"], description: "Premium suite with VIP amenities", availableCount: 1, totalCount: 4, status: "inactive" },
];

export default function BoothCategoriesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredCategories = sampleCategories.filter(cat => {
        const matchesSearch = cat.name.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || cat.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = filteredCategories.reduce((acc, cat) => {
        const priceNum = parseInt(cat.price.replace(/[^0-9]/g, ""));
        return acc + (priceNum * cat.totalCount);
    }, 0);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Booth Categories</h1>
                    <p className="text-gray-400 mt-1">Manage booth types and pricing</p>
                </div>
                <Link
                    href="/admin/booth-categories/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Category
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <LayoutDashboard size={16} />
                        <span className="text-sm">Categories</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleCategories.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Available Booths</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleCategories.reduce((acc, c) => acc + c.availableCount, 0)}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <LayoutDashboard size={16} />
                        <span className="text-sm">Total Booths</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleCategories.reduce((acc, c) => acc + c.totalCount, 0)}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <DollarSign size={16} />
                        <span className="text-sm">Potential Revenue</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-400">₹{(totalRevenue / 100000).toFixed(1)}L</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search categories..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
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

            {/* Categories Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredCategories.map((category) => (
                    <div key={category.id} className={`bg-gray-800/50 rounded-xl border ${category.status === "active" ? "border-gray-700" : "border-gray-700 opacity-70"} overflow-hidden hover:border-orange-500/30 transition-all`}>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <h3 className="text-xl font-bold text-white">{category.name}</h3>
                                        <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${category.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                            {category.status}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <span className="flex items-center gap-1 text-gray-400"><Ruler size={14} /> {category.size}</span>
                                        <span className="flex items-center gap-1 text-orange-400"><DollarSign size={14} /> {category.price}</span>
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

                            <p className="text-sm text-gray-400 mb-3">{category.description}</p>

                            <div className="flex flex-wrap gap-2 mb-4">
                                {category.amenities.map((amenity, idx) => (
                                    <span key={idx} className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">{amenity}</span>
                                ))}
                            </div>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                <div>
                                    <span className="text-xs text-gray-500">Availability</span>
                                    <p className="text-white font-semibold">
                                        <span className="text-green-400">{category.availableCount}</span> / {category.totalCount} booths
                                    </p>
                                </div>
                                <div className="w-32 h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                        style={{ width: `${(category.availableCount / category.totalCount) * 100}%` }}
                                    ></div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredCategories.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <LayoutDashboard className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No booth categories found</p>
                </div>
            )}
        </div>
    );
}