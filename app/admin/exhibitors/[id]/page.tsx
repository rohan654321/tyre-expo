// app/admin/exhibitors/[id]/page.tsx
"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Mail, Phone, MapPin, Building, Calendar, CheckCircle, Clock, XCircle, Package, FileText, CreditCard } from "lucide-react";
import Link from "next/link";

interface ExhibitorDetail {
    id: string;
    companyName: string;
    contactPerson: string;
    email: string;
    phone: string;
    alternatePhone: string;
    address: string;
    city: string;
    state: string;
    country: string;
    pincode: string;
    gstNumber: string;
    boothNumber: string;
    boothType: string;
    boothSize: string;
    status: "confirmed" | "pending" | "cancelled";
    registeredAt: string;
    tyreBrands: string[];
    products: { id: string; name: string }[];
}

const sampleExhibitor: ExhibitorDetail = {
    id: "1",
    companyName: "Apollo Tyres Ltd",
    contactPerson: "Rajesh Kumar",
    email: "rajesh@apollotyres.com",
    phone: "+91 98765 43210",
    alternatePhone: "+91 87654 32109",
    address: "123, Industrial Area, Sector 62",
    city: "Gurugram",
    state: "Haryana",
    country: "India",
    pincode: "122001",
    gstNumber: "06AAACA1234E1Z",
    boothNumber: "A-101",
    boothType: "Corner Booth",
    boothSize: "12x12 m",
    status: "confirmed",
    registeredAt: "2024-01-15",
    tyreBrands: ["Apollo", "Vredestein"],
    products: [
        { id: "p1", name: "Apollo Alnac 4G" },
        { id: "p2", name: "Apollo Amazer" },
        { id: "p3", name: "Apollo Apterra" },
    ],
};

const getStatusColor = (status: string) => {
    switch (status) {
        case "confirmed": return "bg-green-500/20 text-green-400";
        case "pending": return "bg-yellow-500/20 text-yellow-400";
        case "cancelled": return "bg-red-500/20 text-red-400";
        default: return "bg-gray-500/20 text-gray-400";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "confirmed": return <CheckCircle size={16} />;
        case "pending": return <Clock size={16} />;
        case "cancelled": return <XCircle size={16} />;
        default: return <Clock size={16} />;
    }
};

export default function ExhibitorDetailPage() {
    const params = useParams();
    const router = useRouter();
    const [exhibitor] = useState(sampleExhibitor);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                        <ArrowLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{exhibitor.companyName}</h1>
                        <p className="text-gray-400 mt-1">Exhibitor ID: {exhibitor.id}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <Link href={`/admin/exhibitors/${exhibitor.id}/edit`} className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
                        <Edit size={18} />
                        Edit Exhibitor
                    </Link>
                    <button className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition">
                        Deactivate
                    </button>
                </div>
            </div>

            {/* Status Banner */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${getStatusColor(exhibitor.status)}`}>
                <div className="flex items-center gap-3">
                    {getStatusIcon(exhibitor.status)}
                    <span className="font-medium">{exhibitor.status.toUpperCase()}</span>
                    <span className="text-sm text-gray-400">Registered on {exhibitor.registeredAt}</span>
                </div>
                <button className="text-sm hover:underline">View Registration Timeline</button>
            </div>

            {/* Main Content */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {/* Left Column - Company Info */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Company Information */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Building size={18} className="text-orange-400" />
                            Company Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">Company Name</p>
                                <p className="text-white font-medium">{exhibitor.companyName}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">GST Number</p>
                                <p className="text-white">{exhibitor.gstNumber}</p>
                            </div>
                            <div className="md:col-span-2">
                                <p className="text-sm text-gray-400">Address</p>
                                <p className="text-white">{exhibitor.address}</p>
                                <p className="text-gray-400 text-sm">{exhibitor.city}, {exhibitor.state} - {exhibitor.pincode}</p>
                                <p className="text-gray-400 text-sm">{exhibitor.country}</p>
                            </div>
                        </div>
                    </div>

                    {/* Contact Information */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Mail size={18} className="text-orange-400" />
                            Contact Information
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-sm text-gray-400">Contact Person</p>
                                <p className="text-white font-medium">{exhibitor.contactPerson}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="text-white">{exhibitor.email}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Phone</p>
                                <p className="text-white">{exhibitor.phone}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Alternate Phone</p>
                                <p className="text-white">{exhibitor.alternatePhone}</p>
                            </div>
                        </div>
                    </div>

                    {/* Products */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <Package size={18} className="text-orange-400" />
                            Products / Tyre Models
                        </h2>
                        <div className="flex flex-wrap gap-2">
                            {exhibitor.products.map((product) => (
                                <span key={product.id} className="px-3 py-1.5 bg-gray-700 rounded-lg text-sm text-gray-300">
                                    {product.name}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Right Column - Booth & Financial */}
                <div className="space-y-6">
                    {/* Booth Information */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <MapPin size={18} className="text-orange-400" />
                            Booth Details
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Booth Number:</span>
                                <span className="text-white font-medium">{exhibitor.boothNumber}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Booth Type:</span>
                                <span className="text-white">{exhibitor.boothType}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Booth Size:</span>
                                <span className="text-white">{exhibitor.boothSize}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(exhibitor.status)}`}>
                                    {getStatusIcon(exhibitor.status)}
                                    {exhibitor.status}
                                </span>
                            </div>
                        </div>
                        <button className="w-full mt-4 px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                            View Floor Plan
                        </button>
                    </div>

                    {/* Financial Summary */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                            <CreditCard size={18} className="text-orange-400" />
                            Financial Summary
                        </h2>
                        <div className="space-y-3">
                            <div className="flex justify-between">
                                <span className="text-gray-400">Booth Cost:</span>
                                <span className="text-white">₹2,50,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Add-ons:</span>
                                <span className="text-white">₹35,000</span>
                            </div>
                            <div className="flex justify-between border-t border-gray-700 pt-3 mt-2">
                                <span className="text-gray-400">Total Amount:</span>
                                <span className="text-orange-400 font-bold">₹2,85,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Paid:</span>
                                <span className="text-green-400">₹2,85,000</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Balance:</span>
                                <span className="text-green-400">₹0</span>
                            </div>
                        </div>
                        <button className="w-full mt-4 px-4 py-2 bg-orange-600 text-white rounded-lg hover:bg-orange-700 transition">
                            View Invoices
                        </button>
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                <span>Send Email</span>
                                <Mail size={16} />
                            </button>
                            <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                <span>Call Contact</span>
                                <Phone size={16} />
                            </button>
                            <button className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                <span>Generate Invoice</span>
                                <FileText size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}