// app/admin/reports/page.tsx
"use client";

import { useState } from "react";
import { Download, Calendar, TrendingUp, Users, Package, DollarSign, BarChart3, PieChart, FileText, Printer } from "lucide-react";

interface ReportCard {
    title: string;
    value: string;
    change: string;
    icon: any;
    color: string;
}

const reportStats: ReportCard[] = [
    { title: "Total Exhibitors", value: "156", change: "+12%", icon: Users, color: "blue" },
    { title: "Booths Booked", value: "89", change: "+8%", icon: Package, color: "green" },
    { title: "Revenue Generated", value: "₹45.2L", change: "+23%", icon: DollarSign, color: "orange" },
    { title: "Products Listed", value: "1,284", change: "+18%", icon: TrendingUp, color: "purple" },
];

const recentReports = [
    { id: 1, name: "Exhibitor Registration Report", date: "2024-01-15", size: "2.4 MB", type: "PDF" },
    { id: 2, name: "Booth Booking Summary", date: "2024-01-14", size: "1.8 MB", type: "PDF" },
    { id: 3, name: "Revenue Report - January", date: "2024-01-13", size: "3.2 MB", type: "PDF" },
    { id: 4, name: "Product Category Analysis", date: "2024-01-12", size: "1.5 MB", type: "PDF" },
    { id: 5, name: "Visitor Traffic Report", date: "2024-01-11", size: "2.1 MB", type: "PDF" },
];

export default function ReportsPage() {
    const [dateRange, setDateRange] = useState("month");

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Reports & Analytics</h1>
                    <p className="text-gray-400 mt-1">Generate and download exhibition reports</p>
                </div>
                <div className="flex gap-3">
                    <select
                        value={dateRange}
                        onChange={(e) => setDateRange(e.target.value)}
                        className="px-4 py-2 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="week">This Week</option>
                        <option value="month">This Month</option>
                        <option value="quarter">This Quarter</option>
                        <option value="year">This Year</option>
                    </select>
                    <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2">
                        <Download size={18} />
                        Generate Report
                    </button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {reportStats.map((stat) => {
                    const Icon = stat.icon;
                    const colorClasses = {
                        blue: "bg-blue-500/20 text-blue-400",
                        green: "bg-green-500/20 text-green-400",
                        orange: "bg-orange-500/20 text-orange-400",
                        purple: "bg-purple-500/20 text-purple-400",
                    };
                    return (
                        <div key={stat.title} className="bg-gray-800/50 rounded-xl p-5 border border-gray-700">
                            <div className="flex items-center justify-between mb-3">
                                <div className={`p-2 rounded-xl ${colorClasses[stat.color as keyof typeof colorClasses]}`}>
                                    <Icon size={18} />
                                </div>
                                <span className="text-sm text-green-400">{stat.change}</span>
                            </div>
                            <p className="text-2xl font-bold text-white">{stat.value}</p>
                            <p className="text-sm text-gray-400 mt-1">{stat.title}</p>
                        </div>
                    );
                })}
            </div>

            {/* Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Revenue Chart */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Revenue Trend</h3>
                        <BarChart3 className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="h-64 flex items-center justify-center">
                        <div className="text-center text-gray-500">
                            <TrendingUp size={48} className="mx-auto mb-3 opacity-50" />
                            <p>Revenue chart visualization</p>
                            <div className="flex justify-center gap-4 mt-4">
                                <div className="text-center">
                                    <div className="h-24 w-12 bg-orange-500/30 rounded-t-lg mx-auto"></div>
                                    <p className="text-xs mt-2">Week 1</p>
                                </div>
                                <div className="text-center">
                                    <div className="h-32 w-12 bg-orange-500/40 rounded-t-lg mx-auto"></div>
                                    <p className="text-xs mt-2">Week 2</p>
                                </div>
                                <div className="text-center">
                                    <div className="h-40 w-12 bg-orange-500/50 rounded-t-lg mx-auto"></div>
                                    <p className="text-xs mt-2">Week 3</p>
                                </div>
                                <div className="text-center">
                                    <div className="h-48 w-12 bg-orange-500/60 rounded-t-lg mx-auto"></div>
                                    <p className="text-xs mt-2">Week 4</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Category Distribution */}
                <div className="bg-gray-800/50 rounded-xl p-6 border border-gray-700">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="text-lg font-semibold text-white">Booth Category Distribution</h3>
                        <PieChart className="h-5 w-5 text-gray-400" />
                    </div>
                    <div className="space-y-4">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Standard Booths</span>
                                <span className="text-gray-400">42%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: "42%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Corner Booths</span>
                                <span className="text-gray-400">28%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-green-500 rounded-full" style={{ width: "28%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Double Booths</span>
                                <span className="text-gray-400">18%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-yellow-500 rounded-full" style={{ width: "18%" }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-300">Island Booths</span>
                                <span className="text-gray-400">12%</span>
                            </div>
                            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                                <div className="h-full bg-purple-500 rounded-full" style={{ width: "12%" }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Available Reports */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-700 flex justify-between items-center">
                    <h3 className="text-lg font-semibold text-white">Available Reports</h3>
                    <button className="text-orange-400 text-sm hover:text-orange-300 flex items-center gap-1">
                        <Printer size={14} /> Print All
                    </button>
                </div>
                <div className="divide-y divide-gray-700">
                    {recentReports.map((report) => (
                        <div key={report.id} className="flex items-center justify-between p-4 hover:bg-gray-700/50 transition">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-gray-700 rounded-lg">
                                    <FileText className="h-5 w-5 text-orange-400" />
                                </div>
                                <div>
                                    <p className="font-medium text-white">{report.name}</p>
                                    <div className="flex items-center gap-3 mt-1">
                                        <span className="text-xs text-gray-400 flex items-center gap-1">
                                            <Calendar size={12} /> {report.date}
                                        </span>
                                        <span className="text-xs text-gray-500">{report.size}</span>
                                        <span className="text-xs text-gray-500">{report.type}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                    <Download size={16} />
                                </button>
                                <button className="p-2 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                    <Printer size={16} />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}