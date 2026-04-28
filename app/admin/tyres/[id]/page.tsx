// app/admin/tyres/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Trash2, Truck, Gauge, Ruler, Weight, Thermometer, CheckCircle, XCircle, DollarSign, TrendingUp, Users } from "lucide-react";
import Link from "next/link";

interface TyreDetail {
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
    description: string;
    specifications: { key: string; value: string }[];
    images: string[];
}

const sampleTyre: TyreDetail = {
    id: "1",
    brand: "Apollo",
    model: "Alnac 4G",
    category: "Passenger",
    size: "185/65 R15",
    loadIndex: "88H",
    speedRating: "H",
    price: "₹4,500",
    stock: 45,
    status: "active",
    description: "The Apollo Alnac 4G is a premium touring tyre designed for comfort and performance. It features an optimized tread pattern for reduced road noise and improved wet grip.",
    specifications: [
        { key: "Tread Depth", value: "8.5 mm" },
        { key: "UTQG Rating", value: "500 A A" },
        { key: "Max Pressure", value: "44 PSI" },
        { key: "Tyre Weight", value: "8.5 kg" },
        { key: "Warranty", value: "60,000 km" },
    ],
    images: [],
};

export default function TyreDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [tyre] = useState(sampleTyre);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                        <ArrowLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{tyre.brand} {tyre.model}</h1>
                        <p className="text-gray-400 mt-1">Product ID: {params.id}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href={`/admin/tyres/${params.id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                        <Edit size={18} />
                        Edit Product
                    </Link>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition flex items-center gap-2">
                        <Trash2 size={18} />
                        Delete
                    </button>
                </div>
            </div>

            {/* Status Banner */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${tyre.status === "active" ? "bg-green-500/10 border-green-500/30" : "bg-gray-500/10 border-gray-500/30"}`}>
                <div className="flex items-center gap-3">
                    {tyre.status === "active" ? (
                        <CheckCircle className="h-5 w-5 text-green-400" />
                    ) : (
                        <XCircle className="h-5 w-5 text-gray-400" />
                    )}
                    <span className="font-medium text-white">{tyre.status.toUpperCase()}</span>
                </div>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-gray-400">Stock: {tyre.stock} units</span>
                    <button className="text-sm text-orange-400 hover:underline">Update Stock</button>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Main Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Product Information */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Truck size={18} className="text-orange-400" />
                            Product Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">Brand</p>
                                <p className="text-white font-medium">{tyre.brand}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Model</p>
                                <p className="text-white">{tyre.model}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Category</p>
                                <p className="text-white">{tyre.category}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Size</p>
                                <p className="text-white">{tyre.size}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Load Index</p>
                                <p className="text-white">{tyre.loadIndex}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Speed Rating</p>
                                <p className="text-white">{tyre.speedRating}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Price</p>
                                <p className="text-orange-400 font-bold text-xl">{tyre.price}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Stock Status</p>
                                <p className={`font-medium ${tyre.stock > 10 ? "text-green-400" : tyre.stock > 0 ? "text-yellow-400" : "text-red-400"}`}>
                                    {tyre.stock > 10 ? "In Stock" : tyre.stock > 0 ? "Low Stock" : "Out of Stock"}
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Description</h2>
                        <p className="text-gray-300 leading-relaxed">{tyre.description}</p>
                    </div>

                    {/* Technical Specifications */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Gauge size={18} className="text-orange-400" />
                            Technical Specifications
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {tyre.specifications.map((spec, idx) => (
                                <div key={idx} className="flex justify-between py-2 border-b border-gray-700">
                                    <span className="text-gray-400">{spec.key}</span>
                                    <span className="text-white font-medium">{spec.value}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Stats */}
                <div className="space-y-6">
                    {/* Quick Stats */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Stats</h2>
                        <div className="space-y-3">
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <DollarSign size={14} />
                                    <span>Monthly Sales</span>
                                </div>
                                <span className="text-white">245 units</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <TrendingUp size={14} />
                                    <span>Revenue</span>
                                </div>
                                <span className="text-orange-400">₹11,02,500</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <div className="flex items-center gap-2 text-gray-400">
                                    <Users size={14} />
                                    <span>Exhibitors</span>
                                </div>
                                <span className="text-white">8 companies</span>
                            </div>
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                Update Stock
                            </button>
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                View Sales Report
                            </button>
                            <button className="w-full px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                Add to Promotion
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}