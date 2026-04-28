// app/admin/layout.tsx - UPDATED FIXED VERSION
"use client";

import { useAuth } from "@/hooks/useAuth";
import { useRouter, usePathname } from "next/navigation";
import { useEffect } from "react";
import AdminShell from "./AdminShell";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const { isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        console.log("AdminLayout - isAuthenticated:", isAuthenticated);
        console.log("AdminLayout - loading:", loading);
        console.log("AdminLayout - pathname:", pathname);

        // Don't redirect if we're on login page
        if (pathname === "/admin/login") {
            return;
        }

        if (!loading && !isAuthenticated) {
            console.log("Redirecting to login...");
            router.replace("/admin/login");
        }
    }, [loading, isAuthenticated, router, pathname]);

    if (loading) {
        return (
            <div className="flex items-center justify-center h-screen bg-gradient-to-br from-gray-900 to-gray-800">
                <div className="text-center">
                    <div className="relative">
                        <div className="h-16 w-16 rounded-full border-4 border-orange-500/20"></div>
                        <div className="absolute top-0 left-0 h-16 w-16 rounded-full border-4 border-orange-500 border-t-transparent animate-spin"></div>
                    </div>
                    <p className="mt-4 text-gray-400 font-medium">Loading admin panel...</p>
                </div>
            </div>
        );
    }

    // Show login page without shell
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // If not authenticated and not on login page, show nothing while redirecting
    if (!isAuthenticated) {
        return null;
    }

    // Show shell with children for authenticated users
    return <AdminShell>{children}</AdminShell>;
}