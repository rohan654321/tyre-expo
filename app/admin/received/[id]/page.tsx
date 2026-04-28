// app/admin/received/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, CheckCircle, XCircle, Clock, Package, User, Mail, Phone, Calendar, FileText, Building } from "lucide-react";

interface RequirementDetail {
    id: string;
    company: string;
    boothNumber: string;
    contactPerson: string;
    email: string;
    phone: string;
    requestType: string;
    description: string;
    priority: "high" | "medium" | "low";
    status: "pending" | "approved" | "rejected" | "completed";
    submittedAt: string;
    adminNotes: string;
    items: { name: string; quantity: number; unitPrice: string; total: string }[];
}

const sampleRequirement: RequirementDetail = {
    id: "REQ001",
    company: "Apollo Tyres",
    boothNumber: "A-101",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@apollotyres.com",
    phone: "+91 98765 43210",
    requestType: "Extra Power Supply",
    description: "Need additional 15A power outlet for heavy machinery display",
    priority: "high",
    status: "pending",
    submittedAt: "2024-01-15",
    adminNotes: "",
    items: [
        { name: "Additional Power Outlet (15A)", quantity: 2, unitPrice: "₹3,000", total: "₹6,000" },
        { name: "Extension Cable (10m)", quantity: 2, unitPrice: "₹1,500", total: "₹3,000" },
        { name: "Voltage Stabilizer", quantity: 1, unitPrice: "₹5,000", total: "₹5,000" },
    ],
};

const getPriorityColor = (priority: string) => {
    switch (priority) {
        case "high": return "bg-red-500/20 text-red-400";
        case "medium": return "bg-yellow-500/20 text-yellow-400";
        case "low": return "bg-green-500/20 text-green-400";
        default: return "bg-gray-500/20 text-gray-400";
    }
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "pending": return "bg-yellow-500/20 text-yellow-400";
        case "approved": return "bg-green-500/20 text-green-400";
        case "rejected": return "bg-red-500/20 text-red-400";
        case "completed": return "bg-blue-500/20 text-blue-400";
        default: return "bg-gray-500/20 text-gray-400";
    }
};

export default function RequirementDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [requirement, setRequirement] = useState(sampleRequirement);
    const [status, setStatus] = useState(requirement.status);
    const [adminNotes, setAdminNotes] = useState(requirement.adminNotes);
    const [updating, setUpdating] = useState(false);

    const handleUpdateStatus = () => {
        setUpdating(true);
        setTimeout(() => {
            setRequirement(prev => ({ ...prev, status: status as any, adminNotes }));
            setUpdating(false);
        }, 1000);
    };

    const totalAmount = requirement.items.reduce((sum, item) => {
        const totalNum = parseInt(item.total.replace(/[^0-9]/g, ""));
        return sum + totalNum;
    }, 0);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                        <ArrowLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">Requirement Details</h1>
                        <p className="text-gray-400 mt-1">Request ID: {requirement.id}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleUpdateStatus}
                        disabled={updating}
                        className="px-4 py-2 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                    >
                        {updating ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        ) : (
                            <CheckCircle size={18} />
                        )}
                        {updating ? "Updating..." : "Update Status"}
                    </button>
                </div>
            </div>

            <div className="grid grid-cos\;1 lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Request Info */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <FileText size={18} className="text-orange-400" />
                            Request Information
                        </h2>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">Request Type</p>
                                <p className="text-white font-medium">{requirement.requestType}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Priority</p>
                                <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(requirement.priority)}`}>
                                    {requirement.priority}
                                </span>
                            </div>
                            <div className="col-span-2">
                                <p className="text-sm text-gray-400">Description</p>
                                <p className="text-white mt-1">{requirement.description}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Submitted On</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <Calendar size={14} className="text-gray-500" />
                                    <span className="text-white">{requirement.submittedAt}</span>
                                </div>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Current Status</p>
                                <span className={`inline-flex items-center gap-1.5 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(requirement.status)}`}>
                                    {requirement.status === "pending" && <Clock size={12} />}
                                    {requirement.status === "approved" && <CheckCircle size={12} />}
                                    {requirement.status === "rejected" && <XCircle size={12} />}
                                    {requirement.status}
                                </span>
                            </div>
                        </div>
                    </div>

                    {/* Items List */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Package size={18} className="text-orange-400" />
                            Requested Items
                        </h2>
                        <div className="overflow-x-auto">
                            <table className="w-full">
                                <thead className="bg-gray-700/50 rounded-lg">
                                    <tr>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Item</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Quantity</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Unit Price</th>
                                        <th className="px-4 py-3 text-left text-sm font-medium text-gray-300">Total</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-gray-700">
                                    {requirement.items.map((item, idx) => (
                                        <tr key={idx}>
                                            <td className="px-4 py-3 text-white">{item.name}</td>
                                            <td className="px-4 py-3 text-gray-300">{item.quantity}</td>
                                            <td className="px-4 py-3 text-gray-300">{item.unitPrice}</td>
                                            <td className="px-4 py-3 text-orange-400 font-medium">{item.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                                <tfoot className="bg-gray-700/30">
                                    <tr>
                                        <td colSpan={3} className="px-4 py-3 text-right font-medium text-white">Total Amount:</td>
                                        <td className="px-4 py-3 text-orange-400 font-bold">₹{totalAmount.toLocaleString()}</td>
                                    </tr>
                                </tfoot>
                            </table>
                        </div>
                    </div>
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    {/* Exhibitor Info */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Exhibitor Information</h2>
                        <div className="space-y-3">
                            <div className="flex items-center gap-2">
                                <Building size={14} className="text-gray-500" />
                                <span className="text-white">{requirement.company}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <User size={14} className="text-gray-500" />
                                <span className="text-white">{requirement.contactPerson}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Mail size={14} className="text-gray-500" />
                                <span className="text-gray-300">{requirement.email}</span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Phone size={14} className="text-gray-500" />
                                <span className="text-gray-300">{requirement.phone}</span>
                            </div>
                            <div className="pt-3 border-t border-gray-700">
                                <span className="text-sm text-gray-400">Booth Number:</span>
                                <p className="text-white font-medium">{requirement.boothNumber}</p>
                            </div>
                        </div>
                    </div>

                    {/* Status Update */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Update Status</h2>
                        <div className="space-y-4">
                            <select
                                value={status}
                                onChange={(e) => setStatus(e.target.value as any)}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved</option>
                                <option value="rejected">Rejected</option>
                                <option value="completed">Completed</option>
                            </select>
                            <textarea
                                placeholder="Add admin notes..."
                                rows={3}
                                value={adminNotes}
                                onChange={(e) => setAdminNotes(e.target.value)}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-orange-500"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}