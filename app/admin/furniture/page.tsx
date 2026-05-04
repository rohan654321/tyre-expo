// app/admin/furniture/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Package, CheckCircle, XCircle, Eye, RefreshCw, Upload, Image as ImageIcon } from "lucide-react";
import Link from "next/link";
import { getFurniture, deleteFurniture, updateStockStatus, Furniture } from "@/lib/api/furniture";
import toast from "react-hot-toast";

const categories = ["All", "Tables", "Chairs", "Seating", "Counters", "Storage", "Display", "Decor"];

export default function AdminFurniturePage() {
    const [furniture, setFurniture] = useState<Furniture[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({ total: 0, inStock: 0, outOfStock: 0, categories: [] });

    const fetchFurniture = async () => {
        try {
            setLoading(true);
            const response = await getFurniture({
                category: categoryFilter !== "All" ? categoryFilter : undefined,
                inStock: statusFilter !== "all" ? (statusFilter === "active" ? true : false) : undefined,
                search: search || undefined
            });

            if (response.success) {
                setFurniture(response.data || []);
            } else {
                toast.error(response.message || "Failed to load furniture");
            }
        } catch (error) {
            console.error("Failed to fetch furniture:", error);
            toast.error("Failed to load furniture");
        } finally {
            setLoading(false);
        }
    };

    const fetchStatistics = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/furniture/statistics`, {
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('adminToken')}`
                }
            });
            const data = await response.json();
            if (data.success) {
                setStatistics({
                    total: data.data.totalItems || 0,
                    inStock: data.data.inStock || 0,
                    outOfStock: data.data.outOfStock || 0,
                    categories: data.data.categories || []
                });
            }
        } catch (error) {
            console.error("Failed to fetch statistics:", error);
        }
    };

    useEffect(() => {
        fetchFurniture();
        fetchStatistics();
    }, [categoryFilter, statusFilter]);

    const handleSearch = () => {
        fetchFurniture();
    };

    const handleDelete = async (id: string, code: string) => {
        if (confirm(`Are you sure you want to delete furniture item ${code}?`)) {
            try {
                const response = await deleteFurniture(id);
                if (response.success) {
                    toast.success("Furniture deleted successfully");
                    fetchFurniture();
                    fetchStatistics();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete furniture");
            }
        }
    };

    // FIXED: Handle stock toggle with better error handling
    const handleToggleStock = async (id: string, currentStatus: boolean) => {
        const newStatus = !currentStatus;
        const actionText = newStatus ? 'In Stock' : 'Out of Stock';

        try {
            console.log(`Updating stock status for ${id} to ${newStatus}`);
            const response = await updateStockStatus(id, newStatus);
            console.log("Stock update response:", response);

            if (response.success) {
                toast.success(`Stock status updated to ${actionText}`);
                // Refresh both furniture list and statistics
                await fetchFurniture();
                await fetchStatistics();
            } else {
                toast.error(response.message || "Failed to update stock status");
            }
        } catch (error: any) {
            console.error("Failed to update stock status:", error);
            const errorMsg = error.response?.data?.message || error.message || "Failed to update stock status";
            toast.error(errorMsg);
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Furniture Catalog</h1>
                    <p className="text-gray-400 mt-1">Manage furniture items visible to exhibitors</p>
                </div>
                <Link href="/admin/furniture/new" className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2">
                    <Plus size={18} />
                    Add Furniture
                </Link>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{statistics.total}</p>
                    <p className="text-xs text-gray-400">Total Items</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{statistics.inStock}</p>
                    <p className="text-xs text-gray-400">In Stock</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <p className="text-2xl font-bold text-red-400">{statistics.outOfStock}</p>
                    <p className="text-xs text-gray-400">Out of Stock</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-2xl font-bold text-purple-400">{statistics.categories.length}</p>
                    <p className="text-xs text-gray-400">Categories</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by description or code..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                            onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                            className="w-full pl-10 pr-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                        />
                    </div>
                    <select
                        value={categoryFilter}
                        onChange={(e) => setCategoryFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">In Stock</option>
                        <option value="inactive">Out of Stock</option>
                    </select>
                    <button
                        onClick={fetchFurniture}
                        className="px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                </div>
            </div>

            {/* Furniture Grid */}
            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
            ) : furniture.length === 0 ? (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                    <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Furniture Found</h3>
                    <p className="text-gray-400 mb-6">Add your first furniture item to get started</p>
                    <Link href="/admin/furniture/new" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition">
                        <Plus size={18} />
                        Add Furniture
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {furniture.map((item) => (
                        <div key={item.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500/30 transition-all">
                            {/* Image */}
                            <div className="h-48 bg-gray-700 relative">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.code} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <ImageIcon className="h-12 w-12 text-gray-500" />
                                    </div>
                                )}
                                <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full ${item.inStock ? "bg-green-500/90 text-white" : "bg-red-500/90 text-white"}`}>
                                    {item.inStock ? "In Stock" : "Out of Stock"}
                                </span>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="text-xs px-2 py-0.5 bg-gray-700 rounded-full text-gray-300">
                                                {item.category}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{item.code}</h3>
                                        <p className="text-sm text-gray-400 mt-1 line-clamp-2">{item.description}</p>
                                        {item.size && (
                                            <p className="text-xs text-gray-500 mt-1">Size: {item.size}</p>
                                        )}
                                    </div>
                                </div>

                                <div className="flex justify-between items-center pt-3 mt-3 border-t border-gray-700">
                                    <div>
                                        <span className="text-xs text-gray-500">Rental (3 days)</span>
                                        <p className="text-xl font-bold text-orange-400">₹{item.cost3Days.toLocaleString()}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => handleToggleStock(item.id, item.inStock)}
                                            className={`p-2 rounded-lg transition ${item.inStock
                                                    ? 'text-green-400 hover:text-red-400 hover:bg-red-500/20'
                                                    : 'text-red-400 hover:text-green-400 hover:bg-green-500/20'
                                                }`}
                                            title={item.inStock ? "Mark as Out of Stock" : "Mark as In Stock"}
                                        >
                                            {item.inStock ? <CheckCircle size={18} /> : <XCircle size={18} />}
                                        </button>
                                        <Link href={`/admin/furniture/${item.id}/edit`}>
                                            <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                <Edit size={18} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id, item.code)}
                                            className="p-2 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                        >
                                            <Trash2 size={18} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}