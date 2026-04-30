// app/admin/exhibitors/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Search, Plus, Eye, Edit, Trash2, Mail, Phone, Building, CheckCircle, Clock, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getExhibitors, deleteExhibitor, resendCredentials, Exhibitor } from "@/lib/api/exhibitors";
import toast from "react-hot-toast";

const getStatusBadge = (status: string) => {
    const statusMap: Record<string, { icon: any; color: string; label: string }> = {
        approved: { icon: CheckCircle, color: "bg-green-500/20 text-green-400", label: "Active" },
        active: { icon: CheckCircle, color: "bg-green-500/20 text-green-400", label: "Active" },
        pending: { icon: Clock, color: "bg-yellow-500/20 text-yellow-400", label: "Pending" },
        rejected: { icon: XCircle, color: "bg-red-500/20 text-red-400", label: "Rejected" },
        inactive: { icon: XCircle, color: "bg-gray-500/20 text-gray-400", label: "Inactive" },
    };
    return statusMap[status] || statusMap.pending;
};

export default function ExhibitorsPage() {
    const [exhibitors, setExhibitors] = useState<Exhibitor[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [pagination, setPagination] = useState({ total: 0, page: 1, limit: 10, totalPages: 0 });

    const fetchExhibitors = async () => {
        try {
            setLoading(true);
            const response = await getExhibitors({
                page: pagination.page,
                limit: pagination.limit,
                search: search || undefined,
                status: statusFilter !== "all" ? statusFilter : undefined,
            });

            if (response.success) {
                setExhibitors(response.data);
                setPagination(response.pagination);
            }
        } catch (error) {
            console.error("Failed to fetch exhibitors:", error);
            toast.error("Failed to load exhibitors");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExhibitors();
    }, [pagination.page, statusFilter]);

    const handleSearch = () => {
        setPagination(prev => ({ ...prev, page: 1 }));
        fetchExhibitors();
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete ${name}?`)) {
            try {
                await deleteExhibitor(id);
                toast.success("Exhibitor deleted successfully");
                fetchExhibitors();
            } catch (error) {
                toast.error("Failed to delete exhibitor");
            }
        }
    };

    const handleResendCredentials = async (id: string, email: string) => {
        try {
            const response = await resendCredentials(id);
            if (response.success) {
                toast.success(`Credentials sent to ${email}`);
            }
        } catch (error) {
            toast.error("Failed to send credentials");
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Exhibitors</h1>
                    <p className="text-gray-400 mt-1">Manage all exhibition exhibitors</p>
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
                            placeholder="Search by name, company, or email..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <select
                        value={statusFilter}
                        onChange={(e) => {
                            setStatusFilter(e.target.value);
                            setPagination(prev => ({ ...prev, page: 1 }));
                        }}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">All Status</option>
                        <option value="approved">Active</option>
                        <option value="pending">Pending</option>
                        <option value="rejected">Rejected</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button
                        onClick={fetchExhibitors}
                        className="px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
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
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {loading ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <div className="animate-spin rounded-full h-8 w-8 border-2 border-orange-500 border-t-transparent mx-auto"></div>
                                        <p className="text-gray-400 mt-2">Loading exhibitors...</p>
                                    </td>
                                </tr>
                            ) : exhibitors.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-12 text-center">
                                        <Building className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                                        <p className="text-gray-400">No exhibitors found</p>
                                    </td>
                                </tr>
                            ) : (
                                exhibitors.map((exhibitor) => {
                                    const StatusIcon = getStatusBadge(exhibitor.status).icon;
                                    return (
                                        <tr key={exhibitor.id} className="hover:bg-gray-700/50 transition">
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-3">
                                                    <div className="h-10 w-10 rounded-lg bg-orange-500/20 flex items-center justify-center">
                                                        <Building className="h-5 w-5 text-orange-400" />
                                                    </div>
                                                    <div>
                                                        <p className="font-medium text-white">{exhibitor.company}</p>
                                                        <p className="text-xs text-gray-400">ID: {exhibitor.id.slice(0, 8)}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <p className="text-white">{exhibitor.name}</p>
                                                <div className="flex items-center gap-2 mt-1">
                                                    <Mail className="h-3 w-3 text-gray-500" />
                                                    <span className="text-xs text-gray-400">{exhibitor.email}</span>
                                                </div>
                                                {exhibitor.phone && (
                                                    <div className="flex items-center gap-2">
                                                        <Phone className="h-3 w-3 text-gray-500" />
                                                        <span className="text-xs text-gray-400">{exhibitor.phone}</span>
                                                    </div>
                                                )}
                                            </td>
                                            <td className="px-6 py-4 text-white font-medium">
                                                {exhibitor.boothNumber || "Not assigned"}
                                            </td>
                                            <td className="px-6 py-4">
                                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusBadge(exhibitor.status).color}`}>
                                                    <StatusIcon size={12} />
                                                    {getStatusBadge(exhibitor.status).label}
                                                </span>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex items-center gap-2">
                                                    <Link
                                                        href={`/admin/exhibitors/${exhibitor.id}`}
                                                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                                                        title="View Details"
                                                    >
                                                        <Eye size={16} />
                                                    </Link>
                                                    <Link
                                                        href={`/admin/exhibitors/${exhibitor.id}/edit`}
                                                        className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition"
                                                        title="Edit"
                                                    >
                                                        <Edit size={16} />
                                                    </Link>
                                                    <button
                                                        onClick={() => handleResendCredentials(exhibitor.id, exhibitor.email)}
                                                        className="p-1.5 text-gray-400 hover:text-blue-400 hover:bg-blue-500/20 rounded-lg transition"
                                                        title="Resend Credentials"
                                                    >
                                                        <Mail size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(exhibitor.id, exhibitor.company)}
                                                        className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                                        title="Delete"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    );
                                })
                            )}
                        </tbody>
                    </table>
                </div>

                {/* Pagination */}
                {pagination.totalPages > 1 && (
                    <div className="flex justify-between items-center px-6 py-4 border-t border-gray-700">
                        <span className="text-sm text-gray-400">
                            Showing {((pagination.page - 1) * pagination.limit) + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total}
                        </span>
                        <div className="flex gap-2">
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page - 1 }))}
                                disabled={pagination.page === 1}
                                className="px-3 py-1 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
                            >
                                Previous
                            </button>
                            <span className="px-3 py-1 bg-orange-500/20 text-orange-400 rounded-lg">
                                {pagination.page}
                            </span>
                            <button
                                onClick={() => setPagination(prev => ({ ...prev, page: prev.page + 1 }))}
                                disabled={pagination.page === pagination.totalPages}
                                className="px-3 py-1 bg-gray-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-600 transition"
                            >
                                Next
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}