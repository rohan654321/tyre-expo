// app/admin/exhibitors/page.tsx
"use client";

import { useState } from "react";
import { Search, Plus, Eye, Edit, Trash2, Mail, Phone, Building, CheckCircle, Clock, XCircle, MoreVertical } from "lucide-react";
import Link from "next/link";

interface Exhibitor {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    boothNumber: string;
    status: "confirmed" | "pending" | "cancelled";
    tyreBrands: string[];
    createdAt: string;
}

const sampleExhibitors: Exhibitor[] = [
    { id: "1", companyName: "Apollo Tyres Ltd", contactPerson: "Rajesh Kumar", email: "rajesh@apollotyres.com", phone: "+91 98765 43210", boothNumber: "A-101", status: "confirmed", tyreBrands: ["Apollo", "Vredestein"], createdAt: "2024-01-15" },
    { id: "2", companyName: "MRF Tyres", contactPerson: "Sundar P", email: "sundar@mrf.com", phone: "+91 87654 32109", boothNumber: "B-205", status: "pending", tyreBrands: ["MRF"], createdAt: "2024-01-14" },
    { id: "3", companyName: "Bridgestone India", contactPerson: "Kenji Tanaka", email: "kenji@bridgestone.com", phone: "+91 76543 21098", boothNumber: "C-312", status: "confirmed", tyreBrands: ["Bridgestone", "Firestone"], createdAt: "2024-01-13" },
    { id: "4", companyName: "CEAT Tyres", contactPerson: "Anil Sharma", email: "anil@ceat.com", phone: "+91 65432 10987", boothNumber: "D-408", status: "pending", tyreBrands: ["CEAT"], createdAt: "2024-01-12" },
    { id: "5", companyName: "JK Tyre & Industries", contactPerson: "Vikram Singh", email: "vikram@jktyre.com", phone: "+91 54321 09876", boothNumber: "E-515", status: "confirmed", tyreBrands: ["JK Tyre", "Vikrant"], createdAt: "2024-01-11" },
    { id: "6", companyName: "Continental Tyres", contactPerson: "Mark Weber", email: "mark@continental.com", phone: "+91 43210 98765", boothNumber: "F-620", status: "confirmed", tyreBrands: ["Continental"], createdAt: "2024-01-10" },
    { id: "7", companyName: "Goodyear India", contactPerson: "Sarah Johnson", email: "sarah@goodyear.com", phone: "+91 32109 87654", boothNumber: "G-725", status: "pending", tyreBrands: ["Goodyear"], createdAt: "2024-01-09" },
];

const getStatusBadge = (status: string) => {
    switch (status) {
        case "confirmed": return { icon: CheckCircle, color: "bg-green-500/20 text-green-400" };
        case "pending": return { icon: Clock, color: "bg-yellow-500/20 text-yellow-400" };
        default: return { icon: XCircle, color: "bg-red-500/20 text-red-400" };
    }
};

export default function ExhibitorsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredExhibitors = sampleExhibitors.filter(ex => {
        const matchesSearch = ex.companyName.toLowerCase().includes(search.toLowerCase()) ||
            ex.contactPerson.toLowerCase().includes(search.toLowerCase()) ||
            ex.email.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || ex.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Exhibitors</h1>
                    <p className="text-gray-400 mt-1">Manage all tyre exhibition exhibitors</p>
                </div>
                <Link
                    href="/admin/exhibitors/new"
                    className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                >
                    <Plus size={18} />
                    Add Exhibitor
                </Link>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search exhibitors..."
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
                        <option value="confirmed">Confirmed</option>
                        <option value="pending">Pending</option>
                        <option value="cancelled">Cancelled</option>
                    </select>
                </div>
            </div>

            {/* Exhibitors Table */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/80">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Booth</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Tyre Brands</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredExhibitors.map((exhibitor) => {
                                const StatusIcon = getStatusBadge(exhibitor.status).icon;
                                return (
                                    <tr key={exhibitor.id} className="hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                                    <Building className="h-5 w-5 text-orange-400" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-white">{exhibitor.companyName}</p>
                                                    <p className="text-xs text-gray-400">ID: {exhibitor.id}</p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <p className="text-white">{exhibitor.contactPerson}</p>
                                            <div className="flex items-center gap-2 mt-1">
                                                <Mail className="h-3 w-3 text-gray-500" />
                                                <span className="text-xs text-gray-400">{exhibitor.email}</span>
                                            </div>
                                            <div className="flex items-center gap-2">
                                                <Phone className="h-3 w-3 text-gray-500" />
                                                <span className="text-xs text-gray-400">{exhibitor.phone}</span>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-white font-medium">{exhibitor.boothNumber}</td>
                                        <td className="px-6 py-4">
                                            <div className="flex flex-wrap gap-1">
                                                {exhibitor.tyreBrands.map((brand, idx) => (
                                                    <span key={idx} className="px-2 py-0.5 bg-gray-700 rounded-full text-xs text-gray-300">{brand}</span>
                                                ))}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(exhibitor.status).color}`}>
                                                <StatusIcon size={12} />
                                                {exhibitor.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-2">
                                                <Link href={`/admin/exhibitors/${exhibitor.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                    <Eye size={16} />
                                                </Link>
                                                <Link href={`/admin/exhibitors/${exhibitor.id}/edit`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                    <Edit size={16} />
                                                </Link>
                                                <button className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredExhibitors.length === 0 && (
                    <div className="text-center py-12">
                        <Building className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No exhibitors found</p>
                    </div>
                )}
            </div>
        </div>
    );
}