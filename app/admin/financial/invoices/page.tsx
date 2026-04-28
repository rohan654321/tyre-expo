// app/admin/financial/invoices/page.tsx
"use client";

import { useState } from "react";
import { Search, Eye, Download, Printer, CheckCircle, Clock, XCircle, FileText, DollarSign } from "lucide-react";
import Link from "next/link";

interface Invoice {
    id: string;
    invoiceNumber: string;
    company: string;
    boothNumber: string;
    amount: string;
    tax: string;
    total: string;
    status: "paid" | "pending" | "overdue" | "draft";
    issueDate: string;
    dueDate: string;
}

const sampleInvoices: Invoice[] = [
    { id: "1", invoiceNumber: "INV-2024-001", company: "Apollo Tyres", boothNumber: "A-101", amount: "₹1,50,000", tax: "₹27,000", total: "₹1,77,000", status: "paid", issueDate: "2024-01-01", dueDate: "2024-01-15" },
    { id: "2", invoiceNumber: "INV-2024-002", company: "MRF Tyres", boothNumber: "B-205", amount: "₹2,00,000", tax: "₹36,000", total: "₹2,36,000", status: "pending", issueDate: "2024-01-05", dueDate: "2024-01-20" },
    { id: "3", invoiceNumber: "INV-2024-003", company: "Bridgestone", boothNumber: "C-312", amount: "₹2,50,000", tax: "₹45,000", total: "₹2,95,000", status: "paid", issueDate: "2024-01-10", dueDate: "2024-01-25" },
    { id: "4", invoiceNumber: "INV-2024-004", company: "CEAT Tyres", boothNumber: "D-408", amount: "₹1,50,000", tax: "₹27,000", total: "₹1,77,000", status: "overdue", issueDate: "2024-01-15", dueDate: "2024-01-30" },
    { id: "5", invoiceNumber: "INV-2024-005", company: "JK Tyres", boothNumber: "E-515", amount: "₹2,00,000", tax: "₹36,000", total: "₹2,36,000", status: "draft", issueDate: "2024-01-20", dueDate: "2024-02-04" },
];

const getStatusColor = (status: string) => {
    switch (status) {
        case "paid": return "bg-green-500/20 text-green-400";
        case "pending": return "bg-yellow-500/20 text-yellow-400";
        case "overdue": return "bg-red-500/20 text-red-400";
        case "draft": return "bg-gray-500/20 text-gray-400";
        default: return "bg-gray-500/20 text-gray-400";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "paid": return <CheckCircle size={14} />;
        case "pending": return <Clock size={14} />;
        case "overdue": return <XCircle size={14} />;
        case "draft": return <FileText size={14} />;
        default: return <Clock size={14} />;
    }
};

export default function InvoicesPage() {
    const [search, setSearch] = useState("");
    const [statusFilter, setStatusFilter] = useState("all");

    const filteredInvoices = sampleInvoices.filter(invoice => {
        const matchesSearch = invoice.company.toLowerCase().includes(search.toLowerCase()) ||
            invoice.invoiceNumber.toLowerCase().includes(search.toLowerCase());
        const matchesStatus = statusFilter === "all" || invoice.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const totalRevenue = filteredInvoices.reduce((sum, inv) => {
        const totalNum = parseInt(inv.total.replace(/[^0-9]/g, ""));
        return sum + totalNum;
    }, 0);

    const paidRevenue = filteredInvoices.filter(inv => inv.status === "paid").reduce((sum, inv) => {
        const totalNum = parseInt(inv.total.replace(/[^0-9]/g, ""));
        return sum + totalNum;
    }, 0);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div>
                    <h1 className="text-2xl font-bold text-white">Invoices</h1>
                    <p className="text-gray-400 mt-1">Manage all exhibitor invoices</p>
                </div>
                <button className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2">
                    <FileText size={18} />
                    Create Invoice
                </button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                    <p className="text-2xl font-bold text-white">{sampleInvoices.length}</p>
                    <p className="text-xs text-gray-400">Total Invoices</p>
                </div>
                <div className="bg-green-500/10 rounded-xl p-4 border border-green-500/30">
                    <p className="text-2xl font-bold text-green-400">₹{(paidRevenue / 100000).toFixed(1)}L</p>
                    <p className="text-xs text-gray-400">Paid Amount</p>
                </div>
                <div className="bg-yellow-500/10 rounded-xl p-4 border border-yellow-500/30">
                    <p className="text-2xl font-bold text-yellow-400">{sampleInvoices.filter(i => i.status === "pending").length}</p>
                    <p className="text-xs text-gray-400">Pending</p>
                </div>
                <div className="bg-red-500/10 rounded-xl p-4 border border-red-500/30">
                    <p className="text-2xl font-bold text-red-400">{sampleInvoices.filter(i => i.status === "overdue").length}</p>
                    <p className="text-xs text-gray-400">Overdue</p>
                </div>
            </div>

            {/* Filters */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700">
                <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1 relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
                        <input
                            type="text"
                            placeholder="Search by company or invoice number..."
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
                        <option value="paid">Paid</option>
                        <option value="pending">Pending</option>
                        <option value="overdue">Overdue</option>
                        <option value="draft">Draft</option>
                    </select>
                </div>
            </div>

            {/* Invoices Table */}
            <div className="bg-gray-800/50 rounded-xl border border-gray-700 overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-800/80">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Invoice #</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Company</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Booth</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Amount</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Tax</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Total</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Status</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Due Date</th>
                                <th className="px-6 py-4 text-left text-xs font-medium text-gray-400 uppercase">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-700">
                            {filteredInvoices.map((invoice) => (
                                <tr key={invoice.id} className="hover:bg-gray-700/50 transition">
                                    <td className="px-6 py-4 font-mono text-sm text-orange-400">{invoice.invoiceNumber}</td>
                                    <td className="px-6 py-4 text-white">{invoice.company}</td>
                                    <td className="px-6 py-4 text-gray-300">{invoice.boothNumber}</td>
                                    <td className="px-6 py-4 text-gray-300">{invoice.amount}</td>
                                    <td className="px-6 py-4 text-gray-300">{invoice.tax}</td>
                                    <td className="px-6 py-4 text-white font-medium">{invoice.total}</td>
                                    <td className="px-6 py-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(invoice.status)}`}>
                                            {getStatusIcon(invoice.status)}
                                            {invoice.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-gray-400">{invoice.dueDate}</td>
                                    <td className="px-6 py-4">
                                        <div className="flex gap-2">
                                            <Link href={`/admin/financial/invoices/${invoice.id}`} className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                <Eye size={16} />
                                            </Link>
                                            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                <Download size={16} />
                                            </button>
                                            <button className="p-1.5 text-gray-400 hover:text-white hover:bg-gray-700 rounded-lg transition">
                                                <Printer size={16} />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {filteredInvoices.length === 0 && (
                    <div className="text-center py-12">
                        <FileText className="h-12 w-12 text-gray-500 mx-auto mb-3" />
                        <p className="text-gray-400">No invoices found</p>
                    </div>
                )}
            </div>
        </div>
    );
}