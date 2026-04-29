// app/admin/AdminShell.tsx
"use client";

import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import {
    LayoutDashboard,
    FileText,
    Users,
    Settings,
    DollarSign,
    Menu,
    X,
    LogOut,
    ChevronRight,
    ChevronDown,
    Truck,
    Package,
    Warehouse,
    Route,
    Fuel,
    Gauge,
    Wrench,
    Shield,
    Bell,
    User,
    BarChart3,
    Globe,
    Key,
    Mail,
    Home,
    Layers,
    BookOpen,
    CreditCard,
    PieChart,
    Camera,
    Handshake,
    Sparkles,
    Clock,
    QrCode,
    AlertTriangle,
    ClipboardCheck,
    TrendingUp,
    Banknote,
    Bolt,
    Droplet,
    Tv,
    Wind,
} from "lucide-react";
import { useAuth } from "@/hooks/useAuth";
import toast from "react-hot-toast";

const navigation = [
    {
        name: "Dashboard",
        href: "/admin/dashboard",
        icon: LayoutDashboard,
        color: "text-orange-500"
    },
    {
        name: "Exhibitors",
        icon: Users,
        color: "text-blue-500",
        href: "/admin/exhibitors",
    },
    // {
    //     name: "Tyre Brands",
    //     icon: Package,
    //     color: "text-emerald-500",
    //     subItems: [
    //         { name: "All Brands", href: "/admin/tyre-brands", icon: Package },
    //         { name: "Categories", href: "/admin/tyre-categories", icon: Layers },
    //         { name: "Add New Brand", href: "/admin/tyre-brands/new", icon: Package },
    //     ],
    // },
    // {
    //     name: "Tyre Products",
    //     icon: Truck,
    //     color: "text-purple-500",
    //     subItems: [
    //         { name: "All Tyres", href: "/admin/tyres", icon: Truck },
    //         { name: "Categories", href: "/admin/tyre-categories", icon: Layers },
    //         { name: "Specifications", href: "/admin/tyre-specs", icon: Gauge },
    //         { name: "Add New Tyre", href: "/admin/tyres/new", icon: Truck },
    //     ],
    // },
    {
        name: "Floor Plan",
        icon: Globe,
        color: "text-indigo-500",
        href: "/admin/floor-plan",
    },
    {
        name: "Bookings",
        icon: ClipboardCheck,
        color: "text-cyan-500",
        href: "/admin/bookings",
    },
    {
        name: "Financial",
        icon: DollarSign,
        color: "text-amber-500",
        subItems: [
            { name: "Payments", href: "/admin/financial/payments", icon: CreditCard },
            { name: "Invoices", href: "/admin/financial/invoices", icon: FileText },
            { name: "Revenue Analytics", href: "/admin/financial/revenue", icon: PieChart },
        ],
    },
    {
        name: "Extra Requirements",
        icon: Wrench,
        color: "text-emerald-500",
        subItems: [
            { name: "Received", href: "/admin/received", icon: ClipboardCheck },
            {
                name: "Settings",
                icon: Settings,
                color: "text-gray-500",
                subItems: [
                    { name: "Furniture Catalog", href: "/admin/furniture", icon: Package },
                    { name: "AV & IT Rentals", href: "/admin/rental-items", icon: Tv },
                    { name: "Electrical Rates", href: "/admin/electrical-rates", icon: Bolt },
                    { name: "Hostess Rates", href: "/admin/hostess-rates", icon: Sparkles },
                    { name: "Compressed Air", href: "/admin/compressed-air", icon: Wind },
                    { name: "Water Connection", href: "/admin/water-connection", icon: Droplet },
                    { name: "Security Guard", href: "/admin/security-guard", icon: Shield },
                    { name: "Housekeeping", href: "/admin/housekeeping", icon: Home },
                    { name: "Security Deposit", href: "/admin/security-deposit", icon: Banknote },
                    { name: "Booth Categories", href: "/admin/booth-categories", icon: LayoutDashboard },
                    { name: "Booth Add-ons", href: "/admin/booth-addons", icon: Package },
                ]
            }
        ]
    },
    {
        name: "Media",
        icon: Camera,
        color: "text-pink-500",
        href: "/admin/media",
    },
    {
        name: "Reports",
        icon: BarChart3,
        color: "text-teal-500",
        href: "/admin/reports",
    },
];

const renderNavItem = (
    item: any,
    pathname: string,
    handleNavigation: (href: string) => void,
    isMobile: boolean = false,
    level: number = 0,
    openMenus: Set<string>,
    mobileOpenMenus: Set<string>,
    toggleMenu: (name: string, isMobile: boolean) => void
) => {
    const hasSubItems = item.subItems && item.subItems.length > 0;
    const isOpen = isMobile
        ? mobileOpenMenus.has(item.name)
        : openMenus.has(item.name);

    if (hasSubItems) {
        return (
            <div key={item.name} className={`${level > 0 ? 'ml-4' : ''}`}>
                <button
                    onClick={() => toggleMenu(item.name, isMobile)}
                    className={`w-full flex items-center px-4 py-3.5 text-sm rounded-xl transition-all group ${level > 0 ? 'pl-8' : ''
                        } ${isOpen
                            ? 'bg-orange-500/20 text-white shadow-sm'
                            : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                        }`}
                >
                    {item.icon && <item.icon className={`h-5 w-5 mr-3 ${item.color || 'text-gray-400'}`} />}
                    <span className="flex-1 text-left">{item.name}</span>
                    <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''
                        }`} />
                </button>

                {isOpen && (
                    <div className={`${level > 0 ? 'ml-4' : 'ml-8'} pl-4 border-l border-gray-700 space-y-1 mt-1`}>
                        {item.subItems.map((subItem: any) =>
                            renderNavItem(subItem, pathname, handleNavigation, isMobile, level + 1, openMenus, mobileOpenMenus, toggleMenu)
                        )}
                    </div>
                )}
            </div>
        );
    }

    if (!item.href) return null;

    return (
        <button
            key={item.href}
            onClick={() => handleNavigation(item.href)}
            className={`w-full flex items-center px-4 py-3.5 text-sm rounded-xl transition-all group hover:translate-x-1 ${level > 0 ? 'pl-8' : ''
                } ${pathname === item.href
                    ? 'bg-orange-500/20 text-white shadow-sm'
                    : 'text-gray-400 hover:text-white hover:bg-gray-800/50'
                }`}
        >
            {item.icon && <item.icon className={`h-5 w-5 mr-3 ${item.color || 'text-gray-400'}`} />}
            <span>{item.name}</span>
            {pathname === item.href && (
                <ChevronRight className="h-4 w-4 ml-auto text-orange-500" />
            )}
        </button>
    );
};

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
    const [mobileOpenMenus, setMobileOpenMenus] = useState<Set<string>>(new Set());
    const [userMenuOpen, setUserMenuOpen] = useState(false);

    const { user, logout, isAuthenticated, loading } = useAuth();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            const target = event.target as HTMLElement;
            if (sidebarOpen && !target.closest('#mobile-sidebar') && !target.closest('[data-menu-button]')) {
                setSidebarOpen(false);
            }
            if (!target.closest('#user-menu')) {
                setUserMenuOpen(false);
            }
        };

        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [sidebarOpen]);

    useEffect(() => {
        if (!loading && !isAuthenticated && pathname !== '/admin/login') {
            router.push('/admin/login');
        }
    }, [loading, isAuthenticated, pathname, router]);

    const toggleMenu = (name: string, isMobile: boolean = false) => {
        if (isMobile) {
            const newSet = new Set(mobileOpenMenus);
            newSet.has(name) ? newSet.delete(name) : newSet.add(name);
            setMobileOpenMenus(newSet);
        } else {
            const newSet = new Set(openMenus);
            newSet.has(name) ? newSet.delete(name) : newSet.add(name);
            setOpenMenus(newSet);
        }
    };

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
            router.push('/admin/login');
        } catch (error) {
            toast.error('Failed to logout');
        }
    };

    const handleNavigation = (href: string) => {
        router.push(href);
        setSidebarOpen(false);
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center">
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

    if (pathname === "/admin/login") {
        return <>{children}</>;
    }

    if (!isAuthenticated) {
        return null;
    }

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* MOBILE SIDEBAR */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <div
                id="mobile-sidebar"
                className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 transform transition-all duration-300 ease-out lg:hidden ${sidebarOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full'
                    }`}
            >
                <div className="px-6 py-5 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                            <Truck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-lg text-white">TyreExpo</span>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </div>
                    <button
                        onClick={() => setSidebarOpen(false)}
                        className="p-2 hover:bg-gray-800 rounded-xl transition-all"
                    >
                        <X className="h-5 w-5 text-gray-400" />
                    </button>
                </div>

                <div className="px-4 py-6 border-b border-gray-700">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
                            <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-semibold text-white truncate">{user?.name || 'Admin User'}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@tyreexpo.com'}</p>
                            <div className="mt-1 flex items-center gap-1">
                                <div className="h-1.5 w-1.5 rounded-full bg-green-500 animate-pulse"></div>
                                <span className="text-xs text-gray-400">Online</span>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-1 overflow-y-auto h-[calc(100vh-14rem)] py-4">
                    {navigation.map((item) =>
                        renderNavItem(item, pathname, handleNavigation, true, 0, openMenus, mobileOpenMenus, toggleMenu)
                    )}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white py-3 hover:bg-gray-800/50 rounded-xl transition-all group"
                    >
                        <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                        <span>Sign Out</span>
                    </button>
                </div>
            </div>

            {/* DESKTOP SIDEBAR */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 shadow-2xl">
                <div className="px-6 py-6 flex items-center gap-3 border-b border-gray-700">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-lg">
                        <Truck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-white">TyreExpo</h1>
                        <p className="text-xs text-gray-400">Tyre Exhibition Management</p>
                    </div>
                </div>

                <div className="px-4 py-6 border-b border-gray-700">
                    <div className="relative group">
                        <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700 hover:border-orange-500/30 transition-all">
                            <div className="relative">
                                <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-md">
                                    <User className="h-7 w-7 text-white" />
                                </div>
                                <div className="absolute -bottom-1 -right-1 h-4 w-4 rounded-full bg-green-500 border-2 border-gray-900"></div>
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="font-semibold text-white truncate">{user?.name || 'Admin User'}</p>
                                <p className="text-sm text-gray-400 truncate">{user?.email || 'admin@tyreexpo.com'}</p>
                                <div className="flex items-center gap-2 mt-1">
                                    <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full">Super Admin</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-6">
                    {navigation.map((item) =>
                        renderNavItem(item, pathname, handleNavigation, false, 0, openMenus, mobileOpenMenus, toggleMenu)
                    )}
                </nav>

                <div className="p-4 border-t border-gray-700">
                    <div className="px-3">
                        <button
                            onClick={handleLogout}
                            className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white py-3.5 hover:bg-gray-800/50 rounded-xl transition-all group"
                        >
                            <LogOut className="h-4 w-4 group-hover:-translate-x-1 transition-transform" />
                            <span>Sign Out Session</span>
                        </button>
                    </div>
                    <div className="mt-4 px-3 pt-4 border-t border-gray-700/50">
                        <p className="text-xs text-gray-500 text-center">v2.0 • © 2024 TyreExpo</p>
                    </div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="lg:pl-72">
                <header className="h-16 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 flex items-center px-6 justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-4">
                        <button
                            data-menu-button
                            className="lg:hidden p-2 hover:bg-gray-800 rounded-xl transition-colors"
                            onClick={() => setSidebarOpen(true)}
                        >
                            <Menu className="h-5 w-5 text-gray-400" />
                        </button>

                        <div className="hidden md:flex items-center gap-3">
                            <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                            <span className="text-sm text-gray-400">
                                Welcome back, <span className="text-white font-medium">{user?.name?.split(' ')[0] || 'Admin'}</span>
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center gap-3">
                        <button className="relative p-2 hover:bg-gray-800 rounded-xl transition-all">
                            <Bell className="h-5 w-5 text-gray-400 hover:text-white" />
                            <span className="absolute -top-1 -right-1 h-5 w-5 bg-gradient-to-r from-orange-500 to-red-600 text-white text-xs rounded-full flex items-center justify-center shadow-lg">
                                3
                            </span>
                        </button>

                        <div className="h-8 w-px bg-gray-700"></div>

                        <div className="relative" id="user-menu">
                            <button
                                onClick={() => setUserMenuOpen(!userMenuOpen)}
                                className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-800 transition-all group"
                            >
                                <div className="relative">
                                    <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center shadow-sm">
                                        <User className="h-5 w-5 text-white" />
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 h-3 w-3 rounded-full bg-green-500 border border-gray-900"></div>
                                </div>
                                <div className="hidden lg:block text-left">
                                    <p className="text-sm font-semibold text-white">{user?.name || 'Admin User'}</p>
                                    <p className="text-xs text-gray-400">Administrator</p>
                                </div>
                                <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                            </button>

                            {userMenuOpen && (
                                <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                                    <div className="px-4 py-3 border-b border-gray-700">
                                        <p className="text-sm font-medium text-white">{user?.name || 'Admin User'}</p>
                                        <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@tyreexpo.com'}</p>
                                    </div>
                                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                                        <User className="h-4 w-4" />
                                        My Profile
                                    </button>
                                    <button className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-gray-400 hover:text-white hover:bg-gray-700 transition-colors">
                                        <Settings className="h-4 w-4" />
                                        Account Settings
                                    </button>
                                    <div className="px-4 py-2 border-t border-gray-700">
                                        <button
                                            onClick={handleLogout}
                                            className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white py-2.5 hover:bg-gray-700 rounded-lg transition-colors"
                                        >
                                            <LogOut className="h-4 w-4" />
                                            Sign Out
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </header>

                <main className="p-6">
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 shadow-xl">
                        {children}
                    </div>
                </main>

                <footer className="px-6 py-4 border-t border-gray-700/50 bg-gray-900/50 backdrop-blur-sm">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <div className="text-sm text-gray-500">
                            © 2024 TyreExpo Pro • Tyre Exhibition Management System v2.0
                        </div>
                        <div className="flex items-center gap-6 text-sm">
                            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors hover:underline">Help Center</a>
                            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors hover:underline">Documentation</a>
                            <a href="#" className="text-gray-500 hover:text-gray-300 transition-colors hover:underline">Support</a>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}