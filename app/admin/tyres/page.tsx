// app/admin/tyres/page.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, Truck, Gauge, Fuel, Calendar, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface Tyre {
    id: string;
    brand: string;
    model: string;
    category: string;
    size: string;
    loadIndex: string;
    speedRating: string;
    price: string;
    stock: number;
    status: "active" | "inactive";
    imageUrl?: string;
}

const sampleTyres: Tyre[] = [
    { id: "1", brand: "Apollo", model: "Alnac 4G", category: "Passenger", size: "185/65 R15", loadIndex: "88H", speedRating: "H", price: "₹4,500", stock: 45, status: "active" },
    { id: "2", brand: "MRF", model: "ZLO", category: "Passenger", size: "195/60 R15", loadIndex: "88V", speedRating: "V", price: "₹5,200", stock: 32, status: "active" },
    { id: "3", brand: "Bridgestone", model: "Turanza T005", category: "Premium", size: "205/55 R16", loadIndex: "91V", speedRating: "V", price: "₹7,800", stock: 18, status: "active" },
    { id: "4", brand: "CEAT", model: "SecuraDrive", category: "SUV", size: "235/65 R17", loadIndex: "108H", speedRating: "H", price: "₹8,500", stock: 12, status: "active" },
    { id: "5", brand: "JK Tyre", model: "UX Royale", category: "Premium", size: "225/45 R17", loadIndex: "91W", speedRating: "W", price: "₹9,200", stock: 8, status: "inactive" },
    { id: "6", brand: "Continental", model: "UltraContact UC6", category: "Premium", size: "205/55 R16", loadIndex: "91V", speedRating: "V", price: "₹8,900", stock: 15, status: "active" },
];

const categories = ["All", "Passenger", "SUV", "Premium", "Truck/Bus", "Two-Wheeler", "Off-Road"];

export default function TyresPage() {
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");

    const filteredTyres = sampleTyres.filter(tyre => {
        const matchesSearch = tyre.brand.toLowerCase().includes(search.toLowerCase()) ||
            tyre.model.toLowerCase().includes(search.toLowerCase());
        const matchesCategory = categoryFilter === "All" || tyre.category === categoryFilter;
        return matchesSearch && matchesCategory;
    });

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Tyre Products</h1>
                    <p className="text-gray-400 mt-1">Manage all tyre products in the exhibition</p>
                </div>
                <Link
                    href="/admin/tyres/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Tyre
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Truck size={16} />
                        <span className="text-sm">Total Tyres</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleTyres.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleTyres.filter(t => t.status === "active").length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Gauge size={16} />
                        <span className="text-sm">Categories</span>
                    </div>
                    <p className="text-2xl font-bold text-white">6</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Fuel size={16} />
                        <span className="text-sm">Brands</span>
                    </div>
                    <p className="text-2xl font-bold text-white">6</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by brand or model..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <div className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
                        {categories.map((cat) => (
                            <button
                                key={cat}
                                onClick={() => setCategoryFilter(cat)}
                                className={`px-4 py-2 rounded-lg text-sm font-medium transition whitespace-nowrap ${categoryFilter === cat
                                        ? "bg-orange-500 text-white"
                                        : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                                    }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Tyres Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredTyres.map((tyre) => (
                    <div key={tyre.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500/30 transition-all">
                        <div className="p-5">
                            <div className="flex justify-between items-start mb-3">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <span className="text-xs px-2 py-0.5 bg-orange-500/20 text-orange-400 rounded-full">{tyre.category}</span>
                                        <span className={`text-xs px-2 py-0.5 rounded-full ${tyre.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                            {tyre.status}
                                        </span>
                                    </div>
                                    <h3 className="text-lg font-semibold text-white">{tyre.brand} {tyre.model}</h3>
                                </div>
                                <div className="flex gap-1">
                                    <Link href={`/admin/tyres/${tyre.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Eye size={16} />
                                    </Link>
                                    <Link href={`/admin/tyres/${tyre.id}/edit`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                        <Edit size={16} />
                                    </Link>
                                    <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                        <Trash2 size={16} />
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-2 mt-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Size:</span>
                                    <span className="text-white font-medium">{tyre.size}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Load Index:</span>
                                    <span className="text-white">{tyre.loadIndex}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Speed Rating:</span>
                                    <span className="text-white">{tyre.speedRating}</span>
                                </div>
                                <div className="flex justify-between text-sm">
                                    <span className="text-gray-400">Stock:</span>
                                    <span className={`font-medium ${tyre.stock < 10 ? "text-red-400" : "text-green-400"}`}>{tyre.stock} units</span>
                                </div>
                            </div>

                            <div className="mt-4 pt-4 border-t border-gray-700 flex justify-between items-center">
                                <span className="text-xl font-bold text-orange-400">{tyre.price}</span>
                                <span className="text-sm text-gray-500">per tyre</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredTyres.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <Truck className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No tyre products found</p>
                </div>
            )}
        </div>
    );
}