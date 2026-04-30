// app/admin/exhibitors/[id]/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Edit, Mail, Phone, MapPin, Building, Calendar, CheckCircle, Clock, XCircle, Package, FileText, CreditCard, Lock, RefreshCw } from "lucide-react";
import Link from "next/link";
import { getExhibitor, getExhibitorProducts, getExhibitorBrands, getExhibitorBrochures, Exhibitor, StallDetails, resendCredentials } from "@/lib/api/exhibitors";
import toast from "react-hot-toast";

const getStatusColor = (status: string) => {
    switch (status) {
        case "approved": return "bg-green-500/20 text-green-400 border-green-500/30";
        case "active": return "bg-green-500/20 text-green-400 border-green-500/30";
        case "pending": return "bg-yellow-500/20 text-yellow-400 border-yellow-500/30";
        case "rejected": return "bg-red-500/20 text-red-400 border-red-500/30";
        case "inactive": return "bg-gray-500/20 text-gray-400 border-gray-500/30";
        default: return "bg-gray-500/20 text-gray-400";
    }
};

const getStatusIcon = (status: string) => {
    switch (status) {
        case "approved":
        case "active": return <CheckCircle size={16} />;
        case "pending": return <Clock size={16} />;
        case "rejected": return <XCircle size={16} />;
        default: return <Clock size={16} />;
    }
};

const getStatusLabel = (status: string) => {
    switch (status) {
        case "approved": return "Active";
        case "active": return "Active";
        case "pending": return "Pending";
        case "rejected": return "Rejected";
        case "inactive": return "Inactive";
        default: return status;
    }
};

export default function ExhibitorDetailPage() {
    const params = useParams();
    const router = useRouter();
    const exhibitorId = params.id as string;

    const [exhibitor, setExhibitor] = useState<Exhibitor | null>(null);
    const [products, setProducts] = useState<any[]>([]);
    const [brands, setBrands] = useState<any[]>([]);
    const [brochures, setBrochures] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [resending, setResending] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            try {
                setLoading(true);
                const [exhibitorRes, productsRes, brandsRes, brochuresRes] = await Promise.all([
                    getExhibitor(exhibitorId),
                    getExhibitorProducts(exhibitorId).catch(() => ({ data: [] })),
                    getExhibitorBrands(exhibitorId).catch(() => ({ data: [] })),
                    getExhibitorBrochures(exhibitorId).catch(() => ({ data: [] })),
                ]);

                if (exhibitorRes.success) {
                    setExhibitor(exhibitorRes.data);
                } else {
                    toast.error("Failed to load exhibitor data");
                    router.push("/admin/exhibitors");
                }

                if (productsRes.success) setProducts(productsRes.data || []);
                if (brandsRes.success) setBrands(brandsRes.data || []);
                if (brochuresRes.success) setBrochures(brochuresRes.data || []);

            } catch (error) {
                console.error("Fetch error:", error);
                toast.error("Failed to load exhibitor data");
                router.push("/admin/exhibitors");
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [exhibitorId, router]);

    const handleResendCredentials = async () => {
        if (!exhibitor) return;

        setResending(true);
        try {
            const response = await resendCredentials(exhibitor.id);
            if (response.success) {
                toast.success(`Credentials sent to ${exhibitor.email}`);
                if (response.data?.note) {
                    toast.success(response.data.note);
                }
            } else {
                toast.error("Failed to send credentials");
            }
        } catch (error) {
            toast.error("Failed to send credentials");
        } finally {
            setResending(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    if (!exhibitor) {
        return (
            <div className="text-center py-12">
                <p className="text-gray-400">Exhibitor not found</p>
            </div>
        );
    }

    const stallDetails: StallDetails = exhibitor.stallDetails || {};
    const statusLabel = getStatusLabel(exhibitor.status);
    const statusColor = getStatusColor(exhibitor.status);

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center justify-between flex-wrap gap-4">
                <div className="flex items-center gap-4">
                    <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                        <ArrowLeft className="h-5 w-5 text-gray-400" />
                    </button>
                    <div>
                        <h1 className="text-2xl font-bold text-white">{exhibitor.company}</h1>
                        <p className="text-gray-400 mt-1">Exhibitor ID: {exhibitor.id.slice(0, 8)}</p>
                    </div>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={handleResendCredentials}
                        disabled={resending}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition flex items-center gap-2 disabled:opacity-50"
                    >
                        {resending ? <RefreshCw size={18} className="animate-spin" /> : <Mail size={18} />}
                        Resend Credentials
                    </button>
                    <Link href={`/admin/exhibitors/${exhibitor.id}/edit`} className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition flex items-center gap-2">
                        <Edit size={18} />
                        Edit Exhibitor
                    </Link>
                </div>
            </div>

            {/* Status Banner */}
            <div className={`flex items-center justify-between p-4 rounded-xl border ${statusColor}`}>
                <div className="flex items-center gap-3">
                    {getStatusIcon(exhibitor.status)}
                    <span className="font-medium">{statusLabel}</span>
                    <span className="text-sm text-gray-400">
                        Registered on {new Date(exhibitor.createdAt).toLocaleDateString()}
                    </span>
                </div>
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
                                <p className="text-white font-medium">{exhibitor.company}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Sector</p>
                                <p className="text-white">{exhibitor.sector || "Not specified"}</p>
                            </div>
                            {exhibitor.website && (
                                <div className="md:col-span-2">
                                    <p className="text-sm text-gray-400">Website</p>
                                    <a href={exhibitor.website} target="_blank" rel="noopener noreferrer" className="text-orange-400 hover:underline">
                                        {exhibitor.website}
                                    </a>
                                </div>
                            )}
                            {exhibitor.address && (
                                <div className="md:col-span-2">
                                    <p className="text-sm text-gray-400">Address</p>
                                    <p className="text-white">{exhibitor.address}</p>
                                </div>
                            )}
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
                                <p className="text-white font-medium">{exhibitor.name}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-400">Email</p>
                                <p className="text-white">{exhibitor.email}</p>
                            </div>
                            {exhibitor.phone && (
                                <div>
                                    <p className="text-sm text-gray-400">Phone</p>
                                    <p className="text-white">{exhibitor.phone}</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Products */}
                    {products.length > 0 && (
                        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <Package size={18} className="text-orange-400" />
                                Products
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {products.map((product: any) => (
                                    <span key={product.id} className="px-3 py-1.5 bg-gray-700 rounded-lg text-sm text-gray-300">
                                        {product.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Brands */}
                    {brands.length > 0 && (
                        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <CreditCard size={18} className="text-orange-400" />
                                Brands
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {brands.map((brand: any) => (
                                    <span key={brand.id} className="px-3 py-1.5 bg-gray-700 rounded-lg text-sm text-gray-300">
                                        {brand.name}
                                    </span>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Brochures */}
                    {brochures.length > 0 && (
                        <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                            <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                                <FileText size={18} className="text-orange-400" />
                                Brochures
                            </h2>
                            <div className="space-y-2">
                                {brochures.map((brochure: any) => (
                                    <a
                                        key={brochure.id}
                                        href={brochure.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 p-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition"
                                    >
                                        <FileText size={16} />
                                        {brochure.title || "Brochure"}
                                    </a>
                                ))}
                            </div>
                        </div>
                    )}
                </div>

                {/* Right Column - Booth & Actions */}
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
                                <span className="text-white font-medium">{exhibitor.boothNumber || "Not assigned"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Booth Type:</span>
                                <span className="text-white">{stallDetails.type || "Not specified"}</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-gray-400">Booth Size:</span>
                                <span className="text-white">{stallDetails.size || "Not specified"}</span>
                            </div>
                            {stallDetails.dimensions && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Dimensions:</span>
                                    <span className="text-white">{stallDetails.dimensions}</span>
                                </div>
                            )}
                            {stallDetails.price && (
                                <div className="flex justify-between">
                                    <span className="text-gray-400">Price:</span>
                                    <span className="text-white">₹{parseInt(stallDetails.price).toLocaleString()}</span>
                                </div>
                            )}
                            <div className="flex justify-between">
                                <span className="text-gray-400">Status:</span>
                                <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-xs font-medium ${statusColor}`}>
                                    {getStatusIcon(exhibitor.status)}
                                    {statusLabel}
                                </span>
                            </div>
                        </div>
                        {stallDetails.notes && (
                            <div className="mt-4 p-3 bg-gray-700/50 rounded-lg">
                                <p className="text-sm text-gray-400">Notes:</p>
                                <p className="text-sm text-gray-300">{stallDetails.notes}</p>
                            </div>
                        )}
                    </div>

                    {/* Quick Actions */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-4">Quick Actions</h2>
                        <div className="space-y-2">
                            <button
                                onClick={() => window.location.href = `mailto:${exhibitor.email}`}
                                className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition"
                            >
                                <span>Send Email</span>
                                <Mail size={16} />
                            </button>
                            {exhibitor.phone && (
                                <button
                                    onClick={() => window.location.href = `tel:${exhibitor.phone}`}
                                    className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition"
                                >
                                    <span>Call Contact</span>
                                    <Phone size={16} />
                                </button>
                            )}
                            <button
                                onClick={handleResendCredentials}
                                disabled={resending}
                                className="w-full flex items-center justify-between px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition"
                            >
                                <span>Resend Credentials</span>
                                <Lock size={16} />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}