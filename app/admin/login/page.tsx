// app/admin/login/page.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, LogIn, Truck, AlertCircle } from "lucide-react";
import { adminLogin } from "@/lib/api/auth";

export default function AdminLoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("admin@example.com");
    const [password, setPassword] = useState("admin123");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            console.log("📡 Attempting login...");

            const result = await adminLogin(email, password);

            if (result.success) {
                console.log("✅ Login successful!");

                // Verify token was stored
                const storedToken = localStorage.getItem('adminToken');
                const storedUser = localStorage.getItem('adminUser');
                console.log("🔑 Token stored:", storedToken ? "Yes" : "No");
                console.log("👤 User stored:", storedUser ? "Yes" : "No");

                // Redirect to dashboard
                router.push("/admin/dashboard");
            } else {
                setError(result.error || "Login failed");
            }
        } catch (err: any) {
            console.error("❌ Login error:", err);
            setError(err.message || "Login failed. Please check your credentials.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center p-4">
            <div className="max-w-md w-full">
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center p-4 bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl shadow-lg mb-4">
                        <Truck className="h-10 w-10 text-white" />
                    </div>
                    <h1 className="text-3xl font-bold text-white">TyreExpo Admin</h1>
                    <p className="text-gray-400 mt-2">Tyre Exhibition Management System</p>
                </div>

                <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl p-8 border border-white/20">
                    <h2 className="text-2xl font-semibold text-white mb-6">Welcome Back</h2>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition"
                                placeholder="admin@example.com"
                                required
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full px-4 py-3 bg-white/5 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition pr-12"
                                    placeholder="••••••••"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-white"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500 rounded-lg p-3 flex items-start gap-2">
                                <AlertCircle size={18} className="text-red-400 mt-0.5 flex-shrink-0" />
                                <span className="text-red-300 text-sm">{error}</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 bg-gradient-to-r from-orange-500 to-red-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-red-700 transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? (
                                <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent"></div>
                            ) : (
                                <>
                                    <LogIn size={18} />
                                    Sign In
                                </>
                            )}
                        </button>
                    </form>

                    <div className="mt-6 pt-4 border-t border-gray-700">
                        <p className="text-gray-400 text-sm text-center">
                            Use: <span className="text-orange-400">admin@example.com</span> / <span className="text-orange-400">admin123</span>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}