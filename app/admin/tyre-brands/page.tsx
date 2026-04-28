// app/admin/tyre-brands/page.tsx
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Eye, Search, Package, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface TyreBrand {
    id: string;
    name: string;
    logo: string;
    country: string;
    yearFounded: number;
    description: string;
    tyreCount: number;
    status: "active" | "inactive";
}

const sampleBrands: TyreBrand[] = [
    { id: "1", name: "Apollo Tyres", logo: "A", country: "India", yearFounded: 1972, description: "Leading tyre manufacturer in India", tyreCount: 24, status: "active" },
    { id: "2", name: "MRF", logo: "M", country: "India", yearFounded: 1946, description: "India's largest tyre manufacturer", tyreCount: 32, status: "active" },
    { id: "3", name: "Bridgestone", logo: "B", country: "Japan", yearFounded: 1931, description: "World's largest tyre manufacturer", tyreCount: 18, status: "active" },
    { id: "4", name: "CEAT", logo: "C", country: "India", yearFounded: 1958, description: "Leading tyre brand in India", tyreCount: 20, status: "active" },
    { id: "5", name: "JK Tyre", logo: "J", country: "India", yearFounded: 1974, description: "Leading tyre manufacturer", tyreCount: 15, status: "inactive" },
    { id: "6", name: "Continental", logo: "Co", country: "Germany", yearFounded: 1871, description: "Premium German tyre brand", tyreCount: 12, status: "active" },
    { id: "7", name: "Goodyear", logo: "G", country: "USA", yearFounded: 1898, description: "American tyre giant", tyreCount: 10, status: "active" },
];

export default function TyreBrandsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredBrands = sampleBrands.filter(brand => {
        const matchesSearch = brand.name.toLowerCase().includes(search.toLowerCase()) ||
            brand.country.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || brand.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Tyre Brands</h1>
                    <p className="text-gray-400 mt-1">Manage tyre brands participating in the exhibition</p>
                </div>
                <Link
                    href="/admin/tyre-brands/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Brand
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Package size={16} />
                        <span className="text-sm">Total Brands</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleBrands.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleBrands.filter(b => b.status === "active").length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Package size={16} />
                        <span className="text-sm">Total Tyres</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleBrands.reduce((acc, b) => acc + b.tyreCount, 0)}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search brands..."
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

            {/* Brands Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredBrands.map((brand) => (
                    <div key={brand.id} className={`bg-gray-800/50 rounded-xl border ${brand.status === "active" ? "border-gray-700" : "border-gray-700 opacity-70"} overflow-hidden hover:border-orange-500/30 transition-all`}>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-14 w-14 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
                                        <span className="text-xl font-bold text-orange-400">{brand.logo}</span>
                                    </div>
                                    <div>
                                        <h3 className="text-lg font-semibold text-white">{brand.name}</h3>
                                        <p className="text-sm text-gray-400">{brand.country}</p>
                                    </div>
                                </div>
                                <div className="flex gap-1">
                                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Eye size={16} />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Edit size={16} />
                                    </button>
                                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <p className="text-sm text-gray-400 line-clamp-2 mb-4">{brand.description}</p>

                            <div className="flex justify-between items-center pt-4 border-t border-gray-700">
                                <div>
                                    <span className="text-xs text-gray-500">Founded</span>
                                    <p className="text-white">{brand.yearFounded}</p>
                                </div>
                                <div className="text-center">
                                    <span className="text-xs text-gray-500">Tyre Models</span>
                                    <p className="text-white font-semibold">{brand.tyreCount}</p>
                                </div>
                                <div>
                                    <span className={`px-2 py-1 rounded-full text-xs font-medium ${brand.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                        {brand.status}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredBrands.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <Package className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No tyre brands found</p>
                </div>
            )}
        </div>
    );
}