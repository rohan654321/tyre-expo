// app/admin/financial/payments/page.tsx
"use client";

import { useState } from "react";
import { Search, Eye, Download, Filter, CheckCircle, XCircle, Clock, DollarSign, Receipt, CreditCard, Banknote } from "lucide-react";
import Link from "next/link";

interface Payment {
    id: string;
    invoiceId: string;
    company: string;
    boothNumber: string;
    amount: string;
    method: "card" | "bank" | "cash" | "upi";
    status: "completed" | "pending" | "failed" | "refunded";
    transactionId: string;
    date: string;
}

const samplePayments: Payment[] = [
    { id: "PAY001", invoiceId: "INV-2024-001", company: "Apollo Tyres", boothNumber: "A-101", amount: "₹1,50,000", method: "card", status: "completed", transactionId: "TXN123456", date: "2024-01-15" },
    { id: "PAY002", invoiceId: "INV-2024-002", company: "MRF Tyres", boothNumber: "B-205", amount: "₹2,00,000", method: "bank", status: "pending", transactionId: "TXN123457", date: "2024-01-14" },
    { id: "PAY003", invoiceId: "INV-2024-003", company: "Bridgestone", boothNumber: "C-312", amount: "₹2,50,000", method: "upi", status: "completed", transactionId: "TXN123458", date: "2024-01-13" },
    { id: "PAY004", invoiceId: "INV-2024-004", company: "CEAT Tyres", boothNumber: "D-408", amount: "₹1,50,000", method: "card", status: "failed", transactionId: "TXN123459", date: "2024-01-12" },
    { id: "PAY005", invoiceId: "INV-2024-005", company: "JK Tyres", boothNumber: "E-515", amount: "₹2,00,000", method: "bank", status: "completed", transactionId: "TXN123460", date: "2024-01-11" },
    { id: "PAY006", invoiceId: "INV-2024-006", company: "Continental", boothNumber: "F-620", amount: "₹2,50,000", method: "cash", status: "completed", transactionId: "TXN123461", date: "2024-01-10" },
    { id: "PAY007", invoiceId: "INV-2024-007", company: "Goodyear", boothNumber: "G-725", amount: "₹1,80,000", method: "upi", status: "refunded", transactionId: "TXN123462", date: "2024-01-09" },
];

const getMethodIcon = (method: string) => {
    switch (method) {
        case "card": return <CreditCard size={14} />;
        case "bank": return <Banknote size={14} />;
        case "cash": return <DollarSign size={14} />;
        case "upi": return <CreditCard size={14} />;
        default: return <Receipt size={14} />;
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "completed": return "bg-green-500/20 text-green-400";
        case "pending": return "bg-yellow-500/20 text-yellow-400";
        case "failed": return "bg-red-500/20 text-red-400";
        case "refunded": return "bg-orange-500/20 text-orange-400";
        default: return "bg-gray-500/20 text-gray-400";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "completed": return <CheckCircle size={14} />;
        case "pending": return <Clock size={14} />;
        case "failed": return <XCircle size={14} />;
        case "refunded": return <XCircle size={14} />;
        default: return <Clock size={14} />;
    }
};

export default function PaymentsPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");
    const [methodFilter, setMethodFilter] = useState("all");

    const filteredPayments = samplePayments.filter(payment => {
        const matchesSearch = payment.company.toLowerCase().includes(search.toLowerCase()) ||
            payment.invoiceId.toLowerCase().includes(search.toLowerCase()) ||
            payment.transactionId.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || payment.status === statusFilter;
        const matchesMethod = methodFilter === "all" || payment.method === methodFilter;
        return matchesSearch && matchesStatus && matchesMethod;
    });

    const totalAmount = filteredPayments.reduce((sum, p) => {
        const amountNum = parseInt(p.amount.replace(/[^0-9]/g, ""));
        return sum + amountNum;
    }, 0);

    const completedAmount = filteredPayments.filter(p => p.status === "completed").reduce((sum, p) => {
        const amountNum = parseInt(p.amount.replace(/[^0-9]/g, ""));
        return sum + amountNum;
    }, 0);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Payments</h1>
                    <p className="text-gray-400 mt-1">Manage all payment transactions</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2">
                    <Download size={18} />
                    Export Report
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{samplePayments.length}</p>
                    <p className="text-xs text-gray-400">Total Transactions</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">₹{(completedAmount / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-400">Completed Amount</p>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                    <p className="text-2xl font-bold text-yellow-400">{samplePayments.filter(p => p.status === "pending").length}</p>
                    <p className="text-xs text-gray-400">Pending</p>
                </div>
                <div className="bg-blue-500/10 rounded-xl p-4 border border-blue-500/30">
                    <p className="text-2xl font-bold text-blue-400">₹{(totalAmount / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-400">Total Amount</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by company, invoice, or transaction..."
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
                        <option value="completed">Completed</option>
                        <option value="pending">Pending</option>
                        <option value="failed">Failed</option>
                        <option value="refunded">Refunded</option>
                    </select>
                    <select
                        value={methodFilter}
                        onChange={(e) => setMethodFilter(e.target.value)}
                        className="px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                    >
                        <option value="all">All Methods</option>
                        <option value="card">Card</option>
                        <option value="bank">Bank Transfer</option>
                        <option value="upi">UPI</option>
                        <option value="cash">Cash</option>
                    </select>
                </div>
            </div>

            {/* Payments Table */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/80">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Payment ID</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Invoice</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Method</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredPayments.map((payment) => (
                                <tr key={payment.id} className="hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 font-mono text-sm text-orange-400">{payment.id}</td>
                                    <td className="px-6 py-4 text-gray-300">{payment.invoiceId}</td>
                                    <td className="px-6 py-4">
                                        <p className="text-white">{payment.company}</p>
                                        <p className="text-xs text-gray-500">Booth: {payment.boothNumber}</p>
                                    </td>
                                    <td className="px-6 py-4 text-white font-medium">{payment.amount}</td>
                                    <td className="px-6 py-4">
                                        <span className="inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium bg-gray-700 text-gray-300">
                                            {getMethodIcon(payment.method)}
                                            {payment.method.toUpperCase()}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(payment.status)}`}>
                                            {getStatusIcon(payment.status)}
                                            {payment.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{payment.date}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link href={`/admin/financial/payments/${payment.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                <Eye size={16} />
                                            </Link>
                                            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                <Download size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredPayments.length === 0 && (
                    <div className="text-center py-12">
                        <DollarSign className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No payments found</p>
                    </div>
                )}
            </div>
        </div>
    );
}