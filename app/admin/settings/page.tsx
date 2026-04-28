// app/admin/settings/page.tsx
"use client";

import { useState } from "react";
import { Save, Globe, Bell, Shield, Palette, Mail, Lock, Users, Database, Server, MailCheck } from "lucide-react";

interface SettingSection {
    id: string;
    title: string;
    icon: any;
    description: string;
}

const sections: SettingSection[] = [
    { id: "general", title: "General Settings", icon: Globe, description: "Site title, description, and basic info" },
    { id: "notifications", title: "Notifications", icon: Bell, description: "Email and push notification preferences" },
    { id: "security", title: "Security", icon: Shield, description: "Authentication and access control" },
    { id: "appearance", title: "Appearance", icon: Palette, description: "Theme, colors, and branding" },
    { id: "email", title: "Email Settings", icon: Mail, description: "SMTP and email templates" },
    { id: "users", title: "User Management", icon: Users, description: "Admin roles and permissions" },
];

export default function SettingsPage() {
    const [activeSection, setActiveSection] = useState("general");
    const [saving, setSaving] = useState(false);

    const handleSave = () => {
        setSaving(true);
        setTimeout(() => {
            setSaving(false);
        }, 1000);
    };

    return (
        <div className="space-y-6 p-6">
            {/* Header */}
            <div>
                <h1 className="text-2xl font-bold text-white">Settings</h1>
                <p className="text-gray-400 mt-1">Manage your admin panel configuration</p>
            </div>

            <div className="flex flex-col lg:flex-row gap-6">
                {/* Sidebar */}
                <div className="lg:w-64 space-y-1">
                    {sections.map((section) => {
                        const Icon = section.icon;
                        return (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition ${activeSection === section.id
                                        ? "bg-orange-500/20 text-orange-400 border border-orange-500/30"
                                        : "text-gray-400 hover:text-white hover:bg-gray-800"
                                    }`}
                            >
                                <Icon size={18} />
                                <span className="text-sm">{section.title}</span>
                            </button>
                        );
                    })}
                </div>

                {/* Content */}
                <div className="flex-1 bg-gray-800/50 rounded-xl border border-gray-700 p-6">
                    {/* General Settings */}
                    {activeSection === "general" && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-6">General Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Exhibition Name
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="TyreExpo 2024"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Exhibition Tagline
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="The Ultimate Tyre Exhibition"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Exhibition Dates
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="March 15-20, 2024"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Venue
                                    </label>
                                    <input
                                        type="text"
                                        defaultValue="India Expo Centre, Greater Noida"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Contact Email
                                    </label>
                                    <input
                                        type="email"
                                        defaultValue="info@tyreexpo.com"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Contact Phone
                                    </label>
                                    <input
                                        type="tel"
                                        defaultValue="+91 98765 43210"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Notifications Settings */}
                    {activeSection === "notifications" && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-6">Notification Settings</h2>
                            <div className="space-y-4">
                                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-white font-medium">New Exhibitor Registration</p>
                                        <p className="text-sm text-gray-400">Send email when new exhibitor registers</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-white font-medium">New Payment Received</p>
                                        <p className="text-sm text-gray-400">Send notification on successful payment</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-white font-medium">Booking Confirmation</p>
                                        <p className="text-sm text-gray-400">Send confirmation when booth is booked</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" defaultChecked className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-white font-medium">Daily Digest</p>
                                        <p className="text-sm text-gray-400">Receive daily summary of activities</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Security Settings */}
                    {activeSection === "security" && (
                        <div>
                            <h2 className="text-lg font-semibold text-white mb-6">Security Settings</h2>
                            <div className="space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Current Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-300 mb-2">
                                        Confirm New Password
                                    </label>
                                    <input
                                        type="password"
                                        placeholder="••••••••"
                                        className="w-full px-4 py-2.5 bg-gray-700 border border-gray-600 rounded-lg text-white focus:outline-none focus:border-orange-500"
                                    />
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-white font-medium">Two-Factor Authentication</p>
                                        <p className="text-sm text-gray-400">Add an extra layer of security</p>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" />
                                        <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-orange-500"></div>
                                    </label>
                                </div>
                                <div className="flex items-center justify-between p-4 bg-gray-700/50 rounded-lg">
                                    <div>
                                        <p className="text-white font-medium">Session Timeout</p>
                                        <p className="text-sm text-gray-400">Auto logout after inactivity</p>
                                    </div>
                                    <select className="px-3 py-1.5 bg-gray-700 border border-gray-600 rounded-lg text-white">
                                        <option>30 minutes</option>
                                        <option>1 hour</option>
                                        <option>2 hours</option>
                                        <option>Never</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Save Button */}
                    <div className="mt-8 pt-6 border-t border-gray-700 flex justify-end">
                        <button
                            onClick={handleSave}
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
                </div>
            </div>
        </div>
    );
}