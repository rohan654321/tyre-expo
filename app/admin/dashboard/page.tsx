// app/admin/dashboard/page.tsx
"use client";

import {
    TrendingUp, TrendingDown, Users, Package, Truck, DollarSign, Calendar,
    ArrowUpRight, ArrowDownRight, Eye, MoreHorizontal, Download, Filter,
    ShoppingBag, UserCheck, Clock, AlertTriangle, CheckCircle, XCircle,
} from "lucide-react";
import { useState } from "react";

const stats = [
    { name: "Total Exhibitors", value: "156", change: "+12%", changeType: "increase", icon: Users, color: "bg-blue-500" },
    { name: "Tyre Brands", value: "48", change: "+5%", changeType: "increase", icon: Package, color: "bg-emerald-500" },
    { name: "Products Listed", value: "1,284", change: "+18%", changeType: "increase", icon: Truck, color: "bg-purple-500" },
    { name: "Total Revenue", value: "₹45.2L", change: "+23%", changeType: "increase", icon: DollarSign, color: "bg-amber-500" },
];

const recentExhibitors = [
    { id: 1, company: "Apollo Tyres", contact: "Rajesh Kumar", email: "rajesh@apollotyres.com", status: "confirmed", date: "2024-01-15" },
    { id: 2, company: "MRF Tyres", contact: "Sundar P", email: "sundar@mrf.com", status: "pending", date: "2024-01-14" },
    { id: 3, company: "Bridgestone", contact: "Kenji Tanaka", email: "kenji@bridgestone.com", status: "confirmed", date: "2024-01-13" },
    { id: 4, company: "CEAT Tyres", contact: "Anil Sharma", email: "anil@ceat.com", status: "pending", date: "2024-01-12" },
    { id: 5, company: "JK Tyres", contact: "Vikram Singh", email: "vikram@jktyre.com", status: "confirmed", date: "2024-01-11" },
];

const recentBookings = [
    { id: 1, company: "Apollo Tyres", booth: "A-101", amount: "₹1,50,000", status: "paid", date: "2024-01-15" },
    { id: 2, company: "MRF Tyres", booth: "B-205", amount: "₹1,20,000", status: "pending", date: "2024-01-14" },
    { id: 3, company: "Bridgestone", booth: "C-312", amount: "₹2,00,000", status: "paid", date: "2024-01-13" },
    { id: 4, company: "CEAT Tyres", booth: "D-408", amount: "₹1,80,000", status: "pending", date: "2024-01-12" },
];

const topTyreCategories = [
    { name: "Passenger Car Tyres", count: 342, percentage: 35 },
    { name: "Truck/Bus Tyres", count: 286, percentage: 28 },
    { name: "Two-Wheeler Tyres", count: 198, percentage: 19 },
    { name: "Off-Road Tyres", count: 124, percentage: 12 },
    { name: "Agricultural Tyres", count: 78, percentage: 6 },
];

export default function DashboardPage() {
    const [selectedPeriod, setSelectedPeriod] = useState("week");

    const getStatusColor = (status: string) => {
        switch (status) {
            case "confirmed": return "bg-green-500/20 text-green-400";
            case "pending": return "bg-yellow-500/20 text-yellow-400";
            case "paid": return "bg-green-500/20 text-green-400";
            default: return "bg-gray-500/20 text-gray-400";
        }
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Dashboard</h1>
                    <p className="text-gray-400 mt-1">Welcome to TyreExpo Admin Dashboard</p>
                </div>
                <div className="flex gap-2">
                    <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition flex items-center gap-2">
                        <Download size={16} />
                        Export Report
                    </button>
                    <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition flex items-center gap-2">
                        <Filter size={16} />
                        Filter
                    </button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                        <div key={stat.name} className="bg-gray-800/50 rounded-xl p-6 border border-gray-700 hover:border-orange-500/30 transition-all">
                            <div className="flex items-center justify-between">
                                <div className={`p-3 rounded-xl ${stat.color}/20`}>
                                    <Icon className={`h-6 w-6 ${stat.color}`} />
                                </div>
                                <span className={`flex items-center gap-1 text-sm ${stat.changeType === 'increase' ? 'text-green-400' : 'text-red-400'}`}>
                                    {stat.changeType === 'increase' ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                                    {stat.change}
                                </span>
                            </div>
                            <div className="mt-4">
                                <p className="text-gray-400 text-sm">{stat.name}</p>
                                <p className="text-2xl font-bold text-white mt-1">{stat.value}</p>
                            </div>
                        </div>
                    );
                })}
            </div>

            {/* Charts Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Revenue Overview</h3>
                        <select className="bg-gray-700 border border-gray-600 rounded-lg px-3 py-1.5 text-sm text-gray-300">
                            <option value="week">This Week</option>
                            <option value="month">This Month</option>
                            <option value="year">This Year</option>
                        </select>
                    </div>
                    <div className="h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <TrendingUp size={48} className="mx-auto mb-3 opacity-50" />
                            <p>Revenue chart will appear here</p>
                            <p className="text-sm">Weekly revenue: ₹8.2L → ₹10.5L → ₹12.8L → ₹14.2L</p>
                        </div>
                    </div>
                </div>

                {/* Tyre Categories Distribution */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <h3 className="text-lg font-semibold text-white mb-6">Tyre Categories Distribution</h3>
                    <div className="space-y-4">
                        {topTyreCategories.map((cat) => (
                            <div key={cat.name}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">{cat.name}</span>
                                    <span className="text-gray-400">{cat.count} products ({cat.percentage}%)</span>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full" style={{ width: `${cat.percentage}%` }}></div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Recent Exhibitors & Bookings */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Exhibitors */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Recent Exhibitors</h3>
                        <button className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1">
                            View All <ArrowUpRight size={14} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/80">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Contact</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {recentExhibitors.map((exhibitor) => (
                                    <tr key={exhibitor.id} className="hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4">
                                            <p className="font-medium text-white">{exhibitor.company}</p>
                                            <p className="text-xs text-gray-400">{exhibitor.email}</p>
                                        </td>
                                        <td className="px-6 py-4 text-gray-300">{exhibitor.contact}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(exhibitor.status)}`}>
                                                {exhibitor.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-gray-400">{exhibitor.date}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                {/* Recent Bookings */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                    <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                        <h3 className="text-lg font-semibold text-white">Recent Bookings</h3>
                        <button className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1">
                            View All <ArrowUpRight size={14} />
                        </button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead className="bg-gray-800/80">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Company</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Booth</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-700">
                                {recentBookings.map((booking) => (
                                    <tr key={booking.id} className="hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4 font-medium text-white">{booking.company}</td>
                                        <td className="px-6 py-4 text-gray-300">{booking.booth}</td>
                                        <td className="px-6 py-4 text-orange-400 font-medium">{booking.amount}</td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
}