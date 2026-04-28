// app/admin/financial/revenue/page.tsx
"use client";

import { useState } from "react";
import { TrendingUp, TrendingDown, DollarSign, Calendar, Download, Filter, PieChart, BarChart3 } from "lucide-react";

interface RevenueMetric {
    title: string;
    value: string;
    change: string;
    trend: "up" | "down";
    color: string;
}

const metrics: RevenueMetric[] = [
    { title: "Total Revenue", value: "₹45,20,000", change: "+23%", trend: "up", color: "green" },
    { title: "Booth Sales", value: "₹32,50,000", change: "+18%", trend: "up", color: "blue" },
    { title: "Add-on Sales", value: "₹8,70,000", change: "+35%", trend: "up", color: "orange" },
    { title: "Pending Payments", value: "₹3,50,000", change: "-12%", trend: "down", color: "yellow" },
];

const monthlyRevenue = [
    { month: "Jan", amount: 320000, addons: 65000 },
    { month: "Feb", amount: 280000, addons: 58000 },
    { month: "Mar", amount: 350000, addons: 72000 },
    { month: "Apr", amount: 420000, addons: 85000 },
    { month: "May", amount: 380000, addons: 78000 },
    { month: "Jun", amount: 450000, addons: 92000 },
];

const revenueByCategory = [
    { category: "Standard Booths", percentage: 35, amount: "₹15,82,000" },
    { category: "Corner Booths", percentage: 25, amount: "₹11,30,000" },
    { category: "Double Booths", percentage: 20, amount: "₹9,04,000" },
    { category: "Island Booths", percentage: 12, amount: "₹5,42,400" },
    { category: "Add-ons", percentage: 8, amount: "₹3,61,600" },
];

export default function RevenuePage() {
    const [period, setPeriod] = useState("year");

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Revenue Analytics</h1>
                    <p className="text-gray-400 mt-1">Track and analyze exhibition revenue</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={period}
                        onChange={(e) => setPeriod(e.target.value)}
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                    <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition flex items-center gap-2">
                        <Download size={18} />
                        Export
                    </button>
                </div>
            </div>

            {/* Metrics Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {metrics.map((metric) => (
                    <div key={metric.title} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                        <div className="flex items-center justify-between mb-3">
                            <p className="text-gray-400 text-sm">{metric.title}</p>
                            <div className={`p-2 rounded-xl bg-${metric.color}-500/20`}>
                                <DollarSign className={`h-4 w-4 text-${metric.color}-400`} />
                            </div>
                        </div>
                        <p className="text-2xl font-bold text-white">{metric.value}</p>
                        <div className="flex items-center gap-1 mt-2">
                            {metric.trend === "up" ? (
                                <TrendingUp size={14} className="text-green-400" />
                            ) : (
                                <TrendingDown size={14} className="text-red-400" />
                            )}
                            <span className={`text-sm ${metric.trend === "up" ? "text-green-400" : "text-red-400"}`}>
                                {metric.change}
                            </span>
                            <span className="text-xs text-gray-500 ml-2">vs last period</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Revenue Chart */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
                        <BarChart3 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="h-80">
                        <div className="h-full flex flex-col justify-end">
                            <div className="flex justify-around items-end h-64">
                                {monthlyRevenue.map((data, idx) => (
                                    <div key={idx} className="flex flex-col items-center gap-2 w-16">
                                        <div className="relative w-full">
                                            <div
                                                className="absolute bottom-0 left-0 w-full bg-orange-500/60 rounded-t"
                                                style={{ height: `${(data.amount / 500000) * 100}px` }}
                                            ></div>
                                            <div
                                                className="absolute bottom-0 left-0 w-full bg-blue-500/40 rounded-t"
                                                style={{ height: `${(data.addons / 500000) * 100}px`, marginTop: `${(data.amount / 500000) * 100}px` }}
                                            ></div>
                                        </div>
                                        <span className="text-xs text-gray-400">{data.month}</span>
                                    </div>
                                ))}
                            </div>
                            <div className="flex justify-center gap-6 mt-6 pt-4 border-t border-gray-700">
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-orange-500"></div>
                                    <span className="text-xs text-gray-400">Booth Sales</span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                                    <span className="text-xs text-gray-400">Add-ons</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Revenue by Category */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Revenue by Category</h3>
                        <PieChart className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        {revenueByCategory.map((item, idx) => (
                            <div key={idx}>
                                <div className="flex justify-between text-sm mb-1">
                                    <span className="text-gray-300">{item.category}</span>
                                    <div className="flex gap-4">
                                        <span className="text-gray-400">{item.percentage}%</span>
                                        <span className="text-orange-400">{item.amount}</span>
                                    </div>
                                </div>
                                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-gradient-to-r from-orange-500 to-red-500 rounded-full"
                                        style={{ width: `${item.percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Total Summary */}
                    <div className="mt-6 pt-4 border-t border-gray-700">
                        <div className="flex justify-between items-center">
                            <span className="text-gray-400">Total Revenue</span>
                            <span className="text-2xl font-bold text-white">₹45,20,000</span>
                        </div>
                        <div className="flex justify-between items-center mt-2">
                            <span className="text-gray-400">Average per Exhibitor</span>
                            <span className="text-white">₹2,89,743</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Recent Transactions */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700">
                    <h3 className="text-lg font-semibold text-white">Recent Transactions</h3>
                </div>
                <div className="divide-y divide-gray-700">
                    {[
                        { company: "Apollo Tyres", amount: "₹1,77,000", date: "2024-01-15", status: "completed" },
                        { company: "Bridgestone", amount: "₹2,95,000", date: "2024-01-13", status: "completed" },
                        { company: "MRF Tyres", amount: "₹2,36,000", date: "2024-01-14", status: "pending" },
                        { company: "CEAT Tyres", amount: "₹1,77,000", date: "2024-01-12", status: "failed" },
                    ].map((transaction, idx) => (
                        <div key={idx} className="flex items-center justify-between p-4 hover:bg-gray-700/50 transition">
                            <div>
                                <p className="font-medium text-white">{transaction.company}</p>
                                <p className="text-xs text-gray-400">{transaction.date}</p>
                            </div>
                            <div className="text-right">
                                <p className="font-bold text-orange-400">{transaction.amount}</p>
                                <span className={`text-xs ${transaction.status === "completed" ? "text-green-400" : transaction.status === "pending" ? "text-yellow-400" : "text-red-400"}`}>
                                    {transaction.status}
                                </span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}