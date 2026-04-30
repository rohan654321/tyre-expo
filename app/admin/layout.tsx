// app/admin/layout.tsx
"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import AdminShell from "./AdminShell";

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    const pathname = usePathname();
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);

    useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem("adminToken");
            const user = localStorage.getItem("adminUser");

            const hasAuth = !!(token && user);
            setIsAuthenticated(hasAuth);

            // Only redirect if not on login page and not authenticated
            if (!hasAuth && pathname !== "/admin/login") {
                router.replace("/admin/login");
            }
        };

        checkAuth();
    }, [pathname, router]);

    // Don't wrap login page with AdminShell
    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    // Show nothing while checking auth
    if (isAuthenticated === null) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-4 border-orange-500 border-t-transparent"></div>
            </div>
        );
    }

    // Not authenticated, don't render shell
    if (!isAuthenticated) {
        return null;
    }

    // Authenticated, render shell
    return <AdminShell>{children}</AdminShell>;
}