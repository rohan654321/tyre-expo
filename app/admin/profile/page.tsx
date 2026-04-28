// app/admin/profile/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Save, User, Mail, Phone, Shield, Camera, Upload } from "lucide-react";

export default function AdminProfilePage() {
    const router = useRouter();
    const [saving, setSaving] = useState(false);
    const [formData, setFormData] = useState({
        name: "Admin User",
        email: "admin@tyreexpo.com",
        phone: "+91 98765 43210",
        role: "Super Admin",
        department: "Exhibition Management",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
        }, 1000);
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">My Profile</h1>
                <p className="text-gray-400 mt-1">Manage your account information</p>
            </div>

            <div className="max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Profile Image */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <div className="h-24 w-24 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                    <User className="h-10 w-10 text-white" />
                                </div>
                                <button className="absolute bottom-0 right-0 p-1.5 bg-gray-700 rounded-full hover:bg-gray-600 transition">
                                    <Camera size={14} className="text-gray-300" />
                                </button>
                            </div>
                            <div>
                                <h3 className="text-white font-medium">Profile Photo</h3>
                                <p className="text-sm text-gray-400">JPG, PNG or GIF. Max 2MB.</p>
                                <button className="mt-2 px-3 py-1.5 bg-gray-700 rounded-lg text-sm text-gray-300 hover:bg-gray-600 transition flex items-center gap-1">
                                    <Upload size={14} />
                                    Upload Photo
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Personal Information */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <User size={18} className="text-orange-400" />
                            Personal Information
                        </h2>
                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Full Name
                                </label>
                                <input
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Phone Number
                                </label>
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Role Information */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <h2 className="text-lg font-semibold text-white mb-6 flex items-center gap-2">
                            <Shield size={18} className="text-orange-400" />
                            Role & Permissions
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Role
                                </label>
                                <input
                                    type="text"
                                    value={formData.role}
                                    disabled
                                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-300 mb-2">
                                    Department
                                </label>
                                <input
                                    type="text"
                                    value={formData.department}
                                    disabled
                                    className="w-full px-4 py-2.5 bg-gray-700/50 border border-gray-600 rounded-lg text-gray-400 cursor-not-allowed"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Change Password Link */}
                    <div className="bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <h3 className="text-white font-medium">Change Password</h3>
                                <p className="text-sm text-gray-400">Update your password regularly for security</p>
                            </div>
                            <button className="px-4 py-2 bg-gray-700 rounded-lg text-gray-300 hover:bg-gray-600 transition">
                                Change Password
                            </button>
                        </div>
                    </div>

                    {/* Save Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={saving}
                            className="px-6 py-2.5 bg-gradient-to-r from-orange-500 to-red-600 text-white rounded-lg hover:from-orange-600 hover:to-red-700 transition flex items-center gap-2"
                        >
                            {saving ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            ) : (
                                <Save size={18} />
                            )}
                            {saving ? "Saving..." : "Save Changes"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}