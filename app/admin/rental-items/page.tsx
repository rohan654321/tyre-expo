"use client";

import { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, Package, Tv, Printer, CheckCircle, XCircle, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getRentalItems, deleteRentalItem, updateRentalItemStatus, RentalItem } from "@/lib/api/rentalItems";
import toast from "react-hot-toast";

const categories = [
    { value: "All", label: "All Categories" },
    { value: "AV", label: "AV Equipment", icon: Tv },
    { value: "IT", label: "IT Equipment", icon: Printer },
    { value: "Other", label: "Other", icon: Package }
];

const getCategoryIcon = (category: string) => {
    switch (category) {
        case "AV": return <Tv size={16} />;
        case "IT": return <Printer size={16} />;
        default: return <Package size={16} />;
    }
};

const getCategoryLabel = (category: string) => {
    switch (category) {
        case "AV": return "AV Equipment";
        case "IT": return "IT Equipment";
        default: return "Other";
    }
};

export default function AdminRentalItemsPage() {
    const [items, setItems] = useState<RentalItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [categoryFilter, setCategoryFilter] = useState("All");
    const [statusFilter, setStatusFilter] = useState("all");
    const [statistics, setStatistics] = useState({ total: 0, active: 0, inactive: 0, categories: 0 });

    const calculateLocalStatistics = (itemsList: RentalItem[]) => {
        const total = itemsList.length;
        const active = itemsList.filter(item => item.isActive).length;
        const inactive = total - active;
        const uniqueCategories = new Set(itemsList.map(item => item.category)).size;

        setStatistics({ total, active, inactive, categories: uniqueCategories });
    };

    const fetchItems = async () => {
        try {
            setLoading(true);
            const response = await getRentalItems({
                category: categoryFilter !== "All" ? categoryFilter : undefined,
                isActive: statusFilter !== "all" ? (statusFilter === "active" ? true : false) : undefined,
                search: search || undefined
            });

            if (response.success) {
                const fetchedItems = response.data || [];
                setItems(fetchedItems);
                calculateLocalStatistics(fetchedItems);
            } else {
                toast.error(response.message || "Failed to load rental items");
            }
        } catch (error) {
            console.error("Failed to fetch rental items:", error);
            toast.error("Failed to load rental items");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchItems();
    }, [categoryFilter, statusFilter]);

    const handleSearch = () => {
        fetchItems();
    };

    const handleDelete = async (id: string, name: string) => {
        if (confirm(`Are you sure you want to delete "${name}"?`)) {
            try {
                const response = await deleteRentalItem(id);
                if (response.success) {
                    toast.success("Rental item deleted successfully");
                    fetchItems();
                } else {
                    toast.error(response.message || "Failed to delete");
                }
            } catch (error) {
                console.error("Delete error:", error);
                toast.error("Failed to delete rental item");
            }
        }
    };

    const handleToggleStatus = async (id: string, currentStatus: boolean) => {
        try {
            const response = await updateRentalItemStatus(id, !currentStatus);
            if (response.success) {
                toast.success(`Item ${!currentStatus ? 'activated' : 'deactivated'} successfully`);
                const updatedItems = items.map(item =>
                    item.id === id ? { ...item, isActive: !currentStatus } : item
                );
                setItems(updatedItems);
                calculateLocalStatistics(updatedItems);
            } else {
                toast.error(response.message || "Failed to update status");
            }
        } catch (error) {
            console.error("Status update error:", error);
            toast.error("Failed to update status");
        }
    };

    return (
        <div className="space-y-6 p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">AV & IT Rental Catalog</h1>
                    <p className="text-gray-400 mt-1">Manage rental items visible to exhibitors</p>
                </div>
                <Link href="/admin/rental-items/new" className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2">
                    <Plus size={18} />
                    Add Rental Item
                </Link>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{statistics.total}</p>
                    <p className="text-xs text-gray-400">Total Items</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{statistics.active}</p>
                    <p className="text-xs text-gray-400">Active</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <p className="text-2xl font-bold text-red-400">{statistics.inactive}</p>
                    <p className="text-xs text-gray-400">Inactive</p>
                </div>
                <div className="bg-purple-500/10 rounded-xl p-4 border border-purple-500/30">
                    <p className="text-2xl font-bold text-purple-400">{statistics.categories}</p>
                    <p className="text-xs text-gray-400">Categories</p>
                </div>
            </div>

            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by name or code..."
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
                        {categories.map(cat => (
                            <option key={cat.value} value={cat.value}>{cat.label}</option>
                        ))}
                    </select>
                    <select
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">All Status</option>
                        <option value="active">Active</option>
                        <option value="inactive">Inactive</option>
                    </select>
                    <button
                        onClick={fetchItems}
                        className="px-4 py-2.5 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition flex items-center gap-2"
                    >
                        <RefreshCw size={18} />
                        Refresh
                    </button>
                </div>
            </div>

            {loading ? (
                <div className="flex items-center justify-center min-h-[400px]">
                    <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
                </div>
            ) : items.length === 0 ? (
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-12 text-center">
                    <Package className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold text-white mb-2">No Rental Items Found</h3>
                    <p className="text-gray-400 mb-6">Add your first rental item to get started</p>
                    <Link href="/admin/rental-items/new" className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition">
                        <Plus size={18} />
                        Add Rental Item
                    </Link>
                </div>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {items.map((item) => (
                        <div key={item.id} className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden hover:border-orange-500/30 transition-all">
                            <div className="h-48 bg-gray-700 relative">
                                {item.imageUrl ? (
                                    <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        {getCategoryIcon(item.category)}
                                    </div>
                                )}
                                <span className={`absolute top-3 right-3 px-2 py-1 text-xs rounded-full ${item.isActive ? "bg-green-500/90 text-white" : "bg-gray-500/90 text-white"}`}>
                                    {item.isActive ? "Active" : "Inactive"}
                                </span>
                            </div>

                            <div className="p-5">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="flex items-center gap-1 text-xs px-2 py-0.5 bg-gray-700 rounded-full text-gray-300">
                                                {getCategoryIcon(item.category)} {getCategoryLabel(item.category)}
                                            </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-white">{item.name}</h3>
                                        <p className="text-xs text-gray-500 font-mono mt-1">{item.code}</p>
                                    </div>
                                    <div className="flex gap-1">
                                        <button
                                            onClick={() => handleToggleStatus(item.id, item.isActive)}
                                            className={`p-1.5 rounded-lg transition ${item.isActive
                                                    ? 'text-green-400 hover:text-red-400 hover:bg-red-500/20'
                                                    : 'text-gray-400 hover:text-green-400 hover:bg-green-500/20'
                                                }`}
                                            title={item.isActive ? "Deactivate" : "Activate"}
                                        >
                                            {item.isActive ? <CheckCircle size={16} /> : <XCircle size={16} />}
                                        </button>
                                        <Link href={`/admin/rental-items/${item.id}/edit`}>
                                            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                <Edit size={16} />
                                            </button>
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(item.id, item.name)}
                                            className="p-1.5 text-gray-400 hover:text-red-400 hover:bg-red-500/20 rounded-lg transition"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>
                                <p className="text-sm text-gray-400 mb-3 line-clamp-2">{item.description}</p>
                                <div className="flex justify-between items-center pt-3 border-t border-gray-700">
                                    <div>
                                        <span className="text-xs text-gray-500">Rental (3 days)</span>
                                        <p className="text-xl font-bold text-orange-400">₹{item.costFor3Days.toLocaleString()}</p>
                                    </div>
                                    <Link href={`/admin/rental-items/${item.id}/edit`}>
                                        <button className="px-3 py-1.5 bg-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-600 transition">
                                            Edit
                                        </button>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}