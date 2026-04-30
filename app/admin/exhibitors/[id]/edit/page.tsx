// app/admin/exhibitors/[id]/edit/page.tsx
"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, Save, Building, User, Mail, Phone, MapPin, CreditCard, Lock, Eye, EyeOff, AlertCircle } from "lucide-react";
import { getExhibitor, updateExhibitor, Exhibitor } from "@/lib/api/exhibitors";
import toast from "react-hot-toast";

export default function EditExhibitorPage() {
    const params = useParams();
    const router = useRouter();
    const exhibitorId = params.id as string;

    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const [showPassword, setShowPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        company: "",
        sector: "",
        boothNumber: "",
        status: "pending",
        boothSize: "",
        boothType: "",
        boothDimensions: "",
        boothNotes: "",
        boothPrice: "",
        address: "",
        website: "",
        newPassword: "",
        confirmNewPassword: "",
    });

    const [errors, setErrors] = useState<Record<string, string>>({});

    // Fetch exhibitor data on load
    useEffect(() => {
        const fetchExhibitor = async () => {
            try {
                setFetching(true);
                const response = await getExhibitor(exhibitorId);

                if (response.success) {
                    const exhibitor = response.data;

                    // Parse stallDetails if exists
                    let boothSize = "";
                    let boothType = "";
                    let boothDimensions = "";
                    let boothNotes = "";
                    let boothPrice = "";

                    if (exhibitor.stallDetails) {
                        boothSize = exhibitor.stallDetails.size || "";
                        boothType = exhibitor.stallDetails.type || "";
                        boothDimensions = exhibitor.stallDetails.dimensions || "";
                        boothNotes = exhibitor.stallDetails.notes || "";
                        boothPrice = exhibitor.stallDetails.price || "";
                    }

                    // Map backend status to frontend
                    const frontendStatus = exhibitor.status === "approved" ? "active" : exhibitor.status;

                    setFormData({
                        name: exhibitor.name || "",
                        email: exhibitor.email || "",
                        phone: exhibitor.phone || "",
                        company: exhibitor.company || "",
                        sector: exhibitor.sector || "",
                        boothNumber: exhibitor.boothNumber || "",
                        status: frontendStatus,
                        boothSize: boothSize,
                        boothType: boothType,
                        boothDimensions: boothDimensions,
                        boothNotes: boothNotes,
                        boothPrice: boothPrice,
                        address: exhibitor.address || "",
                        website: exhibitor.website || "",
                        newPassword: "",
                        confirmNewPassword: "",
                    });
                } else {
                    toast.error("Failed to load exhibitor data");
                    router.push("/admin/exhibitors");
                }
            } catch (error) {
                console.error("Fetch exhibitor error:", error);
                toast.error("Failed to load exhibitor data");
                router.push("/admin/exhibitors");
            } finally {
                setFetching(false);
            }
        };

        fetchExhibitor();
    }, [exhibitorId, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        // Clear error for this field
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

        // Only validate password if user wants to change it
        if (formData.newPassword) {
            if (formData.newPassword.length < 6) {
                newErrors.newPassword = "Password must be at least 6 characters";
            }
            if (formData.newPassword !== formData.confirmNewPassword) {
                newErrors.confirmNewPassword = "Passwords do not match";
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            toast.error("Please fix the errors in the form");
            return;
        }

        setLoading(true);

        try {
            const updateData: any = {
                name: formData.name.trim(),
                email: formData.email.toLowerCase().trim(),
                phone: formData.phone,
                company: formData.company.trim(),
                sector: formData.sector,
                boothNumber: formData.boothNumber,
                status: formData.status === "active" ? "approved" : formData.status,
                boothSize: formData.boothSize,
                boothType: formData.boothType,
                boothDimensions: formData.boothDimensions,
                boothNotes: formData.boothNotes,
                boothPrice: formData.boothPrice,
                address: formData.address,
                website: formData.website,
            };

            // Only include password if user wants to change it
            if (formData.newPassword) {
                updateData.password = formData.newPassword;
            }

            const response = await updateExhibitor(exhibitorId, updateData);

            if (response.success) {
                toast.success("Exhibitor updated successfully!");

                // Show password info if password was changed
                if (formData.newPassword) {
                    toast.success(`New password: ${formData.newPassword} (saved to clipboard)`, {
                        duration: 8000,
                    });
                    navigator.clipboard.writeText(formData.newPassword);
                }

                router.push(`/admin/exhibitors/${exhibitorId}`);
            } else {
                toast.error(response.error || "Failed to update exhibitor");
            }
        } catch (error: any) {
            console.error("Update exhibitor error:", error);
            toast.error(error.response?.data?.error || "Failed to update exhibitor");
        } finally {
            setLoading(false);
        }
    };

    const boothTypes = ["standard", "corner", "double", "island", "premium"];
    const boothSizes = ["3m x 3m", "6m x 6m", "9m x 9m", "12m x 12m", "15m x 15m"];

    if (fetching) {
        return (
            <div className="flex items-center justify-center min-h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div className="flex items-center gap-4">
                <button onClick={() => router.back()} className="p-2 hover:bg-gray-800 rounded-lg transition">
                    <ArrowLeft className="h-5 w-5 text-gray-400" />
                </button>
                <div>
                    <h1 className="text-2xl font-bold text-white">Edit Exhibitor</h1>
                    <p className="text-gray-400 mt-1">Update exhibitor information</p>
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

                {/* Change Password Section */}
                <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6 mb-6">
                    <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                        <Lock size={18} className="text-orange-400" />
                        Change Password (Optional)
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                New Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showNewPassword ? "text" : "password"}
                                    name="newPassword"
                                    value={formData.newPassword}
                                    onChange={handleChange}
                                    className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.newPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-orange-500 pr-10`}
                                    placeholder="Leave blank to keep current password"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowNewPassword(!showNewPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showNewPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                            {errors.newPassword && <p className="text-red-400 text-sm mt-1">{errors.newPassword}</p>}
                            <p className="text-gray-500 text-xs mt-1">Minimum 6 characters</p>
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Confirm New Password
                            </label>
                            <input
                                type="password"
                                name="confirmNewPassword"
                                value={formData.confirmNewPassword}
                                onChange={handleChange}
                                className={`w-full px-4 py-2.5 bg-gray-700 border ${errors.confirmNewPassword ? 'border-red-500' : 'border-gray-600'} rounded-lg text-white focus:outline-none focus:border-orange-500`}
                                placeholder="Confirm new password"
                            />
                            {errors.confirmNewPassword && <p className="text-red-400 text-sm mt-1">{errors.confirmNewPassword}</p>}
                        </div>
                    </div>

                    <div className="mt-4 p-3 bg-yellow-500/10 border border-yellow-500/30 rounded-lg">
                        <div className="flex items-start gap-2">
                            <AlertCircle size={16} className="text-yellow-400 mt-0.5" />
                            <p className="text-sm text-yellow-300">
                                Leave password fields empty to keep the current password. If you change the password, the exhibitor will need to use the new password to login.
                            </p>
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
                                <option value="active">Active (Approved)</option>
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
                        {loading ? "Saving..." : "Save Changes"}
                    </button>
                </div>
            </form>
        </div>
    );
}