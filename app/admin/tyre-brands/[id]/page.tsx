// app/admin/tyre-brands/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Package, Globe, Calendar, Users, CheckCircle, XCircle, TrendingUp } from "lucide-react";
import Link from "next/link";

interface BrandDetail {
    id: string;
    name: string;
    logo: string;
    country: string;
    yearFounded: number;
    description: string;
    tyreCount: number;
    exhibitorCount: number;
    status: "active" | "inactive";
    products: { id: string; name: string; category: string }[];
}

const sampleBrand: BrandDetail = {
    id: "1",
    name: "Apollo Tyres",
    logo: "A",
    country: "India",
    yearFounded: 1972,
    description: "Apollo Tyres is a leading tyre manufacturer based in India. The company produces a wide range of tyres for passenger cars, commercial vehicles, and off-road vehicles.",
    tyreCount: 24,
    exhibitorCount: 3,
    status: "active",
    products: [
        { id: "p1", name: "Alnac 4G", category: "Passenger" },
        { id: "p2", name: "Amazer", category: "Passenger" },
        { id: "p3", name: "Apterra", category: "SUV" },
        { id: "p4", name: "Apterra HT", category: "SUV" },
    ],
};

export default function BrandDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [brand] = useState(sampleBrand);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                        <ArrowLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <div className="flex items-center gap-4">
                        <div className="h-16 w-16 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center border border-orange-500/30">
                            <span className="text-2xl font-bold text-orange-400">{brand.logo}</span>
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold text-white">{brand.name}</h1>
                            <p className="text-gray-400 mt-1">Brand ID: {params.id}</p>
                        </div>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href={`/admin/tyre-brands/${params.id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                        <Edit size={18} />
                        Edit Brand
                    </Link>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                        <Trash2 size={18} />
                        Delete
                    </button>
                </div>
            </div>

            {/* Status Banner */}
            <div className={`flex items-center p-4 rounded-xl border ${brand.status === "active" ? "bg-green-500/10 border-green-500/30" : "bg-gray-500/10 border-gray-500/30"}`}>
                <div className="flex items-center gap-3">
                    {brand.status === "active" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="font-medium text-white">{brand.status.toUpperCase()}</span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Company Info */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Globe size={18} className="text-orange-400" />
                            Company Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">Country</p>
                                <p className="text-white">{brand.country}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Year Founded</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar size={14} className="text-gray-500" />
                                    <span className="text-white">{brand.yearFounded}</span>
                                </div>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-400">Description</p>
                                <p className="text-white mt-1 leading-relaxed">{brand.description}</p>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Package size={18} className="text-orange-400" />
                                Tyre Products ({brand.tyreCount})
                            </h2>
                            <Link href="/admin/tyres/new" className="text-sm text-orange-400 hover:text-orange-300">
                                + Add Product
                            </Link>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {brand.products.map((product) => (
                                <div key={product.id} className="flex justify-between items-center p-3 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-white font-medium">{product.name}</p>
                                        <p className="text-xs text-gray-400">{product.category}</p>
                                    </div>
                                    <Link href={`/admin/tyres/${product.id}`} className="text-orange-400 hover:text-orange-300 text-sm">
                                        View →
                                    </Link>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Stats */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Statistics</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Package size={14} />
                                    <span>Total Products</span>
                                </div>
                                <span className="text-white font-bold text-xl">{brand.tyreCount}</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Users size={14} />
                                    <span>Exhibitors</span>
                                </div>
                                <span className="text-white">{brand.exhibitorCount}</span>
                            </div>
                            <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <TrendingUp size={14} />
                                    <span>Exhibition Status</span>
                                </div>
                                <span className="text-green-400">Participating</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                View All Products
                            </button>
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                Add New Product
                            </button>
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                View Exhibitors
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}