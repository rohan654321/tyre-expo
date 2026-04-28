// app/admin/bookings/page.tsx
"use client";

import { useState } from "react";
import { Search, Eye, CheckCircle, Clock, XCircle, Download, Calendar, DollarSign, MapPin } from "lucide-react";
import Link from "next/link";

interface Booking {
    id: string;
    company: string;
    boothNumber: string;
    boothSize: string;
    bookingDate: string;
    amount: string;
    status: "confirmed" | "pending" | "cancelled" | "payment_due";
    paymentStatus: "paid" | "pending" | "overdue";
}

const sampleBookings: Booking[] = [
    { id: "B001", company: "Apollo Tyres", boothNumber: "A-101", boothSize: "9x9 m", bookingDate: "2024-01-15", amount: "₹1,50,000", status: "confirmed", paymentStatus: "paid" },
    { id: "B002", company: "MRF Tyres", boothNumber: "B-205", boothSize: "12x12 m", bookingDate: "2024-01-14", amount: "₹2,00,000", status: "pending", paymentStatus: "pending" },
    { id: "B003", company: "Bridgestone", boothNumber: "C-312", boothSize: "15x15 m", bookingDate: "2024-01-13", amount: "₹2,50,000", status: "confirmed", paymentStatus: "paid" },
    { id: "B004", company: "CEAT Tyres", boothNumber: "D-408", boothSize: "9x9 m", bookingDate: "2024-01-12", amount: "₹1,50,000", status: "cancelled", paymentStatus: "pending" },
    { id: "B005", company: "JK Tyres", boothNumber: "E-515", boothSize: "12x12 m", bookingDate: "2024-01-11", amount: "₹2,00,000", status: "confirmed", paymentStatus: "pending" },
    { id: "B006", company: "Continental", boothNumber: "F-620", boothSize: "15x15 m", bookingDate: "2024-01-10", amount: "₹2,50,000", status: "confirmed", paymentStatus: "paid" },
];

const statusColors = {
    confirmed: { bg: "bg-green-500/20", text: "text-green-400", icon: CheckCircle },
    pending: { bg: "bg-yellow-500/20", text: "text-yellow-400", icon: Clock },
    cancelled: { bg: "bg-red-500/20", text: "text-red-400", icon: XCircle },
    payment_due: { bg: "bg-orange-500/20", text: "text-orange-400", icon: DollarSign },
};

const paymentStatusColors = {
    paid: "bg-green-500/20 text-green-400",
    pending: "bg-yellow-500/20 text-yellow-400",
    overdue: "bg-red-500/20 text-red-400",
};

export default function BookingsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [paymentFilter, setPaymentFilter] = useState("all");

    const filteredBookings = sampleBookings.filter(booking => {
        const matchesSearch = booking.company.toLowerCase().includes(search.toLowerCase()) ||
            booking.boothNumber.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || booking.status === statusFilter;
        const matchesPayment = paymentFilter === "all" || booking.paymentStatus === paymentFilter;
        return matchesSearch && matchesStatus && matchesPayment;
    });

    const totalAmount = filteredBookings.reduce((sum, b) => sum + parseInt(b.amount.replace(/[^0-9]/g, "")), 0);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Booth Bookings</h1>
                    <p className="text-gray-400 mt-1">Manage all booth booking requests</p>
                </div>
                <button className="px-4 py-2 bg-gray-800 rounded-lg text-gray-300 hover:bg-gray-700 transition flex items-center gap-2">
                    <Download size={16} />
                    Export Report
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{sampleBookings.length}</p>
                    <p className="text-xs text-gray-400">Total Bookings</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">{sampleBookings.filter(b => b.status === "confirmed").length}</p>
                    <p className="text-xs text-gray-400">Confirmed</p>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                    <p className="text-2xl font-bold text-yellow-400">{sampleBookings.filter(b => b.status === "pending").length}</p>
                    <p className="text-xs text-gray-400">Pending</p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                    <p className="text-2xl font-bold text-blue-400">₹{totalAmount.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Total Revenue</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by company or booth..."
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
                        <option value="payment_due">Payment Due</option>
                    </select>
                    <select
                        value={paymentFilter}
                        onChange={(e) => setPaymentFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">All Payments</option>
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                    </select>
                </div>
            </div>

            {/* Bookings Table */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/80">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Booking ID</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Booth</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Booking Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Payment</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredBookings.map((booking) => {
                                const StatusIcon = statusColors[booking.status as keyof typeof statusColors]?.icon || Clock;
                                return (
                                    <tr key={booking.id} className="hover:bg-gray-700/50 transition">
                                        <td className="px-6 py-4 font-medium text-white">{booking.id}</td>
                                        <td className="px-6 py-4 text-white">{booking.company}</td>
                                        <td className="px-6 py-4">
                                            <div>
                                                <p className="text-white">{booking.boothNumber}</p>
                                                <p className="text-xs text-gray-400">{booking.boothSize}</p>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 text-orange-400 font-medium">{booking.amount}</td>
                                        <td className="px-6 py-4 text-gray-300">{booking.bookingDate}</td>
                                        <td className="px-6 py-4">
                                            <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${statusColors[booking.status as keyof typeof statusColors]?.bg || "bg-gray-500/20"} ${statusColors[booking.status as keyof typeof statusColors]?.text || "text-gray-400"}`}>
                                                <StatusIcon size={12} />
                                                {booking.status}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${paymentStatusColors[booking.paymentStatus as keyof typeof paymentStatusColors]}`}>
                                                {booking.paymentStatus}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Link href={`/admin/bookings/${booking.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                <Eye size={16} />
                                            </Link>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>

                {filteredBookings.length === 0 && (
                    <div className="text-center py-12">
                        <Calendar className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No bookings found</p>
                    </div>
                )}
            </div>
        </div>
    );
}