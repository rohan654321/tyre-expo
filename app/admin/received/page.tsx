// app/admin/received/page.tsx
"use client";

import { useState } from "react";
import { Eye, CheckCircle, XCircle, Clock, Search, Package, Users, Wrench, Filter, Download } from "lucide-react";
import Link from "next/link";

interface Requirement {
    id: string;
    company: string;
    boothNumber: string;
    contactPerson: string;
    requestType: string;
    description: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "approved" | "rejected" | "completed";
    submittedAt: string;
}

const sampleRequirements: Requirement[] = [
    { id: "REQ001", company: "Apollo Tyres", boothNumber: "A-101", contactPerson: "Rajesh Kumar", requestType: "Extra Power Supply", description: "Need additional 15A power outlet", priority: "high", status: "pending", submittedAt: "2024-01-15" },
    { id: "REQ002", company: "MRF Tyres", boothNumber: "B-205", contactPerson: "Sundar P", requestType: "WiFi Setup", description: "Dedicated high-speed internet connection", priority: "medium", status: "approved", submittedAt: "2024-01-14" },
    { id: "REQ003", company: "Bridgestone", boothNumber: "C-312", contactPerson: "Kenji Tanaka", requestType: "LED Display", description: "55\" LED display for product showcase", priority: "high", status: "pending", submittedAt: "2024-01-13" },
    { id: "REQ004", company: "CEAT Tyres", boothNumber: "D-408", contactPerson: "Anil Sharma", requestType: "Furniture", description: "Additional tables and chairs", priority: "low", status: "completed", submittedAt: "2024-01-12" },
    { id: "REQ005", company: "JK Tyres", boothNumber: "E-515", contactPerson: "Vikram Singh", requestType: "Security Service", description: "24/7 security guard", priority: "high", status: "pending", submittedAt: "2024-01-11" },
    { id: "REQ006", company: "Continental", boothNumber: "F-620", contactPerson: "Mark Weber", requestType: "Air Conditioning", description: "Additional AC unit", priority: "medium", status: "approved", submittedAt: "2024-01-10" },
];

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high": return "bg-red-500/20 text-red-400";
        case "medium": return "bg-yellow-500/20 text-yellow-400";
        case "low": return "bg-green-500/20 text-green-400";
        default: return "bg-gray-500/20 text-gray-400";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "pending": return <Clock size={14} />;
        case "approved": return <CheckCircle size={14} />;
        case "rejected": return <XCircle size={14} />;
        case "completed": return <CheckCircle size={14} />;
        default: return <Clock size={14} />;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending": return "bg-yellow-500/20 text-yellow-400";
        case "approved": return "bg-green-500/20 text-green-400";
        case "rejected": return "bg-red-500/20 text-red-400";
        case "completed": return "bg-blue-500/20 text-blue-400";
        default: return "bg-gray-500/20 text-gray-400";
    }
};

export default function ReceivedRequirementsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredRequirements = sampleRequirements.filter(req => {
        const matchesSearch = req.company.toLowerCase().includes(search.toLowerCase()) ||
            req.requestType.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || req.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Extra Requirements</h1>
                    <p className="text-gray-400 mt-1">View and manage exhibitor requests</p>
                </div>
                <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition flex items-center gap-2">
                    <Download size={18} />
                    Export
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <div className="flex items-center gap-2 text-gray-400 mb-2">
                        <Package size={16} />
                        <span className="text-sm">Total Requests</span>
                    </div>
                    <p className="text-2xl font-bold text-white">{sampleRequirements.length}</p>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                    <div className="flex items-center gap-2 text-yellow-400 mb-2">
                        <Clock size={16} />
                        <span className="text-sm">Pending</span>
                    </div>
                    <p className="text-2xl font-bold text-yellow-400">{sampleRequirements.filter(r => r.status === "pending").length}</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <div className="flex items-center gap-2 text-green-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Approved</span>
                    </div>
                    <p className="text-2xl font-bold text-green-400">{sampleRequirements.filter(r => r.status === "approved").length}</p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                    <div className="flex items-center gap-2 text-blue-400 mb-2">
                        <CheckCircle size={16} />
                        <span className="text-sm">Completed</span>
                    </div>
                    <p className="text-2xl font-bold text-blue-400">{sampleRequirements.filter(r => r.status === "completed").length}</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by company or request..."
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
                        <option value="pending">Pending</option>
                        <option value="approved">Approved</option>
                        <option value="rejected">Rejected</option>
                        <option value="completed">Completed</option>
                    </select>
                </div>
            </div>

            {/* Requirements Table */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/80">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">ID</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Request Type</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Description</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Priority</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Submitted</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredRequirements.map((req) => (
                                <tr key={req.id} className="hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 font-mono text-sm text-orange-400">{req.id}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-white">{req.company}</p>
                                        <p className="text-xs text-gray-500">Booth: {req.boothNumber}</p>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <Wrench size={14} className="text-gray-500" />
                                            <span className="text-white">{req.requestType}</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-gray-300 max-w-xs truncate">{req.description}</td>
                                    <td className="px-6 py-4">
                                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(req.priority)}`}>
                                            {req.priority}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                                            {getStatusIcon(req.status)}
                                            {req.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{req.submittedAt}</td>
                                    <td className="px-6 py-4">
                                        <Link href={`/admin/received/${req.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                            <Eye size={16} />
                                        </Link>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredRequirements.length === 0 && (
                    <div className="text-center py-12">
                        <Package className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No requirements found</p>
                    </div>
                )}
            </div>
        </div>
    );
}