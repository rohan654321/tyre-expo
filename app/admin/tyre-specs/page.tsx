// app/admin/tyre-specs/page.tsx
"use client";

import { useState } from "react";
import { Plus, Edit, Trash2, Search, Gauge, Ruler, Weight, Thermometer, CheckCircle, XCircle } from "lucide-react";
import Link from "next/link";

interface TyreSpecification {
    id: string;
    name: string;
    unit: string;
    description: string;
    values: string[];
    isRequired: boolean;
    status: "active" | "inactive";
}

const sampleSpecs: TyreSpecification[] = [
    { id: "1", name: "Tyre Size", unit: "mm", description: "Width/Profile/Rim diameter", values: ["185/65 R15", "195/60 R15", "205/55 R16", "215/60 R16", "225/45 R17"], isRequired: true, status: "active" },
    { id: "2", name: "Load Index", unit: "", description: "Maximum load capacity", values: ["88", "91", "94", "97", "100"], isRequired: true, status: "active" },
    { id: "3", name: "Speed Rating", unit: "", description: "Maximum speed capability", values: ["H (210 km/h)", "V (240 km/h)", "W (270 km/h)", "Y (300 km/h)"], isRequired: true, status: "active" },
    { id: "4", name: "Tread Depth", unit: "mm", description: "Initial tread depth", values: ["7.5", "8.0", "8.5", "9.0"], isRequired: true, status: "active" },
    { id: "5", name: "UTQG Rating", unit: "", description: "Uniform Tire Quality Grading", values: ["500 A A", "400 A A", "300 A A"], isRequired: false, status: "active" },
    { id: "6", name: "Max Pressure", unit: "PSI", description: "Maximum inflation pressure", values: ["44", "51", "55"], isRequired: true, status: "active" },
    { id: "7", name: "Treadwear Warranty", unit: "km", description: "Manufacturer warranty", values: ["40000", "50000", "60000", "80000"], isRequired: false, status: "inactive" },
];

export default function TyreSpecsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredSpecs = sampleSpecs.filter(spec => {
        const matchesSearch = spec.name.toLowerCase().includes(search.toLowerCase()) ||
            spec.description.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || spec.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Tyre Specifications</h1>
                    <p className="text-gray-400 mt-1">Manage tyre specification attributes</p>
                </div>
                <Link
                    href="/admin/tyre-specs/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Specification
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Gauge size={16} />
                        <span className="text-sm">Total Specs</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleSpecs.length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Active</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleSpecs.filter(s => s.status === "active").length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Ruler size={16} />
                        <span className="text-sm">Required</span>
                    </div>
                    <p className="text-2xl font-bold text-orange-400">{sampleSpecs.filter(s => s.isRequired).length}</p>
                </div>
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Weight size={16} />
                        <span className="text-sm">Optional</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{sampleSpecs.filter(s => !s.isRequired).length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search specifications..."
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

            {/* Specs Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {filteredSpecs.map((spec) => (
                    <div key={spec.id} className={`bg-gray-800/50 rounded-xl border ${spec.status === "active" ? "border-gray-700" : "border-gray-700 opacity-70"} overflow-hidden hover:border-orange-500/30 transition-all`}>
                        <div className="p-5">
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500/20 to-red-500/20 flex items-center justify-center">
                                        {spec.name === "Tyre Size" && <Ruler className="h-6 w-6 text-orange-400" />}
                                        {spec.name === "Load Index" && <Weight className="h-6 w-6 text-orange-400" />}
                                        {spec.name === "Speed Rating" && <Gauge className="h-6 w-6 text-orange-400" />}
                                        {spec.name === "Tread Depth" && <Ruler className="h-6 w-6 text-orange-400" />}
                                        {!["Tyre Size", "Load Index", "Speed Rating", "Tread Depth"].includes(spec.name) && <Thermometer className="h-6 w-6 text-orange-400" />}
                                    </div>
                                    <div>
                                        <div className="flex items-center gap-2">
                                            <h3 className="text-lg font-semibold text-white">{spec.name}</h3>
                                            {spec.isRequired && (
                                                <span className="px-1.5 py-0.5 bg-red-500/20 text-red-400 rounded text-xs">Required</span>
                                            )}
                                            <span className={`px-1.5 py-0.5 rounded-full text-xs ${spec.status === "active" ? "bg-green-500/20 text-green-400" : "bg-gray-500/20 text-gray-400"}`}>
                                                {spec.status}
                                            </span>
                                        </div>
                                        <p className="text-sm text-gray-400">{spec.description}</p>
                                        {spec.unit && <p className="text-xs text-gray-500 mt-1">Unit: {spec.unit}</p>}
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

                            <div className="mt-4">
                                <p className="text-xs text-gray-500 mb-2">Common Values</p>
                                <div className="flex flex-wrap gap-2">
                                    {spec.values.slice(0, 5).map((value, idx) => (
                                        <span key={idx} className="px-2 py-1 bg-gray-700 rounded-lg text-sm text-gray-300">{value}</span>
                                    ))}
                                    {spec.values.length > 5 && (
                                        <span className="px-2 py-1 bg-gray-700 rounded-lg text-sm text-gray-400">+{spec.values.length - 5} more</span>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {filteredSpecs.length === 0 && (
                <div className="text-center py-12 bg-gray-800/50 rounded-xl border border-gray-700">
                    <Gauge className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                    <p className="text-gray-400">No specifications found</p>
                </div>
            )}
        </div>
    );
}