// app/admin/exhibitors/new/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, Save, Building, User, Mail, Phone, MapPin, CreditCard, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { createExhibitor } from "@/lib/api/exhibitors";
import { getAdminToken, isAuthenticated } from "@/lib/api/auth";
import toast from "react-hot-toast";

export default function AddExhibitorPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        sector: "",
        boothNumber: "",
        password: "",
        confirmPassword: "",
        status: "pending",
        boothSize: "",
        boothType: "",
        boothDimensions: "",
        boothNotes: "",
        boothPrice: "",
        address: "",
        website: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Check authentication
    useEffect(() => {
        const token = getAdminToken();
        if (!token) {
            console.log("❌ No token found, redirecting to login");
            router.push("/admin/login");
        }
    }, [router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        if (errors[name]) {
            setErrors(prev => ({ ...prev, [name]: "" }));
        }
    };

    const validateForm = () => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = "Name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.company.trim()) newErrors.company = "Company name is required";
        if (!formData.password) {
            newErrors.password = "Password is required";
        } else if (formData.password.length < 6) {
            newErrors.password = "Password must be at least 6 characters";
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = "Passwords do not match";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // app/admin/exhibitors/new/page.tsx - Update handleSubmit
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setLoading(true);

        try {
            const submitData = {
                name: formData.name.trim(),
                email: formData.email.toLowerCase().trim(),
                phone: formData.phone,
                company: formData.company.trim(),
                sector: formData.sector,
                boothNumber: formData.boothNumber,
                password: formData.password,
                status: formData.status,
                boothSize: formData.boothSize,
                boothType: formData.boothType,
                boothDimensions: formData.boothDimensions,
                boothNotes: formData.boothNotes,
                boothPrice: formData.boothPrice,
                address: formData.address,
                website: formData.website,
            };

            console.log("📡 Creating exhibitor with token:", getAdminToken()?.substring(0, 30));
            const response = await createExhibitor(submitData);

            if (response.success) {
                toast.success("Exhibitor created successfully!");
                if (response.data.originalPassword) {
                    toast.success(`Password: ${response.data.originalPassword}`, { duration: 10000 });
                }
                router.push("/admin/exhibitors");
            } else {
                toast.error(response.error || "Failed to create exhibitor");
            }
        } catch (error: any) {
            console.error("Create exhibitor error:", error);

            // Handle 401 specifically
            if (error.response?.status === 401) {
                console.log("🔴 Got 401 error. Token might be invalid.");
                const currentToken = getAdminToken();
                console.log("Current token:", currentToken);

                toast.error("Session issue. Please logout and login again.");
                // Don't auto-redirect, let user decide
            } else {
                toast.error(error.response?.data?.error || "Failed to create exhibitor");
            }
        } finally {
            setLoading(false);
        }
    };

    const boothTypes = ["standard", "corner", "double", "island", "premium"];
    const boothSizes = ["3m x 3m", "6m x 6m", "9m x 9m", "12m x 12m", "15m x 15m"];

    return (
        <div className="space-y-6 p-6">
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                    <ArrowLeft className="h-5 w-5 text-gray-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Add New Exhibitor</h1>
                    <p className="text-gray-400 mt-1">Register a new exhibitor for the exhibition</p>
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-4xl">
                {/* Company Information */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Building size={18} className="text-orange-400" />
                        Company Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Company Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="company"
                                required
                                value={formData.company}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.company ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-orange-500`}
                                placeholder="e.g., Apollo Tyres Ltd"
                            />
                            {errors.company && <p className="text-red-400 text-sm mt-1">{errors.company}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Sector/Industry
                            </label>
                            <input
                                type="text"
                                name="sector"
                                value={formData.sector}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., Tyre Manufacturing"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Website
                            </label>
                            <input
                                type="url"
                                name="website"
                                value={formData.website}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="https://example.com"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Address
                            </label>
                            <textarea
                                name="address"
                                rows={2}
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="Street address"
                            />
                        </div>
                    </div>
                </div>

                {/* Contact Information */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <User size={18} className="text-orange-400" />
                        Contact Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Contact Person Name <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.name ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-orange-500`}
                                placeholder="Full name"
                            />
                            {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="email"
                                name="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.email ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-orange-500`}
                                placeholder="email@company.com"
                            />
                            {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Phone
                            </label>
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="+91 XXXXXXXXXX"
                            />
                        </div>
                    </div>
                </div>

                {/* Login Credentials */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Lock size={18} className="text-orange-400" />
                        Login Credentials
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password <span className="text-red-400">*</span>
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    required
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.password ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-orange-500 pr-10`}
                                    placeholder="Enter password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-400 text-sm mt-1">{errors.password}</p>}
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm Password <span className="text-red-400">*</span>
                            </label>
                            <input
                                type="password"
                                name="confirmPassword"
                                required
                                value={formData.confirmPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.confirmPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-orange-500`}
                                placeholder="Confirm password"
                            />
                            {errors.confirmPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmPassword}</p>}
                        </div>
                    </div>
                </div>

                {/* Booth Information */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <MapPin size={18} className="text-orange-400" />
                        Booth Information
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Booth Number
                            </label>
                            <input
                                type="text"
                                name="boothNumber"
                                value={formData.boothNumber}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., A-101"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Booth Type
                            </label>
                            <select
                                name="boothType"
                                value={formData.boothType}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                            >
                                <option value="">Select booth type</option>
                                {boothTypes.map(type => (
                                    <option key={type} value={type}>{type.charAt(0).toUpperCase() + type.slice(1)}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Booth Size
                            </label>
                            <select
                                name="boothSize"
                                value={formData.boothSize}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                            >
                                <option value="">Select booth size</option>
                                {boothSizes.map(size => (
                                    <option key={size} value={size}>{size}</option>
                                ))}
                            </select>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Booth Price (₹)
                            </label>
                            <input
                                type="text"
                                name="boothPrice"
                                value={formData.boothPrice}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="e.g., 250000"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Booth Dimensions / Notes
                            </label>
                            <textarea
                                name="boothNotes"
                                rows={2}
                                value={formData.boothNotes}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                placeholder="Special requirements or notes about the booth"
                            />
                        </div>
                    </div>
                </div>

                {/* Status */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <CreditCard size={18} className="text-orange-400" />
                        Account Status
                    </h2>

                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Status
                            </label>
                            <select
                                name="status"
                                value={formData.status}
                                onChange={handleChange}
                                className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                            >
                                <option value="pending">Pending</option>
                                <option value="approved">Approved (Active)</option>
                                <option value="rejected">Rejected</option>
                                <option value="inactive">Inactive</option>
                            </select>
                        </div>
                    </div>
                </div>

                {/* Form Actions */}
                <div className="flex justify-end gap-4">
                    <button
                        type="button"
                        onClick={() => router.back()}
                        className="px-6 py-2.5 border border-gray-600 rounded-lg text-gray-300 hover:bg-gray-800 transition"
                    >
                        Cancel
                    </button>
                    <button
                        type="submit"
                        disabled={loading}
                        className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                        {loading ? (
                            <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                        ) : (
                            <Save size={18} />
                        )}
                        {loading ? "Creating..." : "Register Exhibitor"}
                    </button>
                </div>
            </form>
        </div>
    );
}