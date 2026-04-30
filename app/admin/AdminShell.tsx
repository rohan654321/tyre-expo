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
    Wrench,
    Shield,
    Bell,
    User,
    BarChart3,
    Globe,
    CreditCard,
    PieChart,
    Camera,
    ClipboardCheck,
    Home,
    Sparkles,
    Bolt,
    Droplet,
    Tv,
    Wind,
    Banknote,
} from "lucide-react";
import toast from "react-hot-toast";

const navigation = [
    { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard, color: "text-orange-500" },
    { name: "Exhibitors", icon: Users, color: "text-blue-500", href: "/admin/exhibitors" },
    { name: "Floor Plan", icon: Globe, color: "text-indigo-500", href: "/admin/floor-plan" },
    { name: "Bookings", icon: ClipboardCheck, color: "text-cyan-500", href: "/admin/bookings" },
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
                ]
            }
        ]
    },
    { name: "Media", icon: Camera, color: "text-pink-500", href: "/admin/media" },
    { name: "Reports", icon: BarChart3, color: "text-teal-500", href: "/admin/reports" },
];

export default function AdminShell({ children }: { children: React.ReactNode }) {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const [openMenus, setOpenMenus] = useState<Set<string>>(new Set());
    const [mobileOpenMenus, setMobileOpenMenus] = useState<Set<string>>(new Set());
    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [user, setUser] = useState<any>(null);
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        const userStr = localStorage.getItem("adminUser");
        if (userStr) {
            try {
                setUser(JSON.parse(userStr));
            } catch (e) {
                console.error("Failed to parse user:", e);
            }
        }
    }, []);

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

    const handleLogout = () => {
        localStorage.removeItem("adminToken");
        localStorage.removeItem("adminUser");
        toast.success("Logged out successfully");
        window.location.href = "/admin/login";
    };

    const handleNavigation = (href: string) => {
        router.push(href);
        setSidebarOpen(false);
    };

    const renderNavItem = (item: any, level: number = 0, isMobile: boolean = false) => {
        const hasSubItems = item.subItems && item.subItems.length > 0;
        const isOpen = isMobile ? mobileOpenMenus.has(item.name) : openMenus.has(item.name);

        if (hasSubItems) {
            return (
                <div key={item.name} className={`${level > 0 ? 'ml-4' : ''}`}>
                    <button
                        onClick={() => toggleMenu(item.name, isMobile)}
                        className={`w-full flex items-center px-4 py-3 text-sm rounded-xl transition-all ${isOpen ? 'bg-orange-500/20 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
                    >
                        <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                        <span className="flex-1 text-left">{item.name}</span>
                        <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
                    </button>
                    {isOpen && (
                        <div className="ml-6 pl-4 border-l border-gray-700 space-y-1 mt-1">
                            {item.subItems.map((subItem: any) => renderNavItem(subItem, level + 1, isMobile))}
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
                className={`w-full flex items-center px-4 py-3 text-sm rounded-xl transition-all ${pathname === item.href ? 'bg-orange-500/20 text-white' : 'text-gray-400 hover:text-white hover:bg-gray-800/50'}`}
            >
                <item.icon className={`h-5 w-5 mr-3 ${item.color}`} />
                <span>{item.name}</span>
                {pathname === item.href && <ChevronRight className="h-4 w-4 ml-auto text-orange-500" />}
            </button>
        );
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
            {/* Mobile Sidebar */}
            {sidebarOpen && <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm lg:hidden" onClick={() => setSidebarOpen(false)} />}
            <div className={`fixed inset-y-0 left-0 z-50 w-80 bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700 transform transition-all duration-300 lg:hidden ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
                <div className="px-6 py-5 flex items-center justify-between border-b border-gray-700">
                    <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                            <Truck className="h-5 w-5 text-white" />
                        </div>
                        <div>
                            <span className="font-bold text-lg text-white">TyreExpo</span>
                            <p className="text-xs text-gray-400">Admin Panel</p>
                        </div>
                    </div>
                    <button onClick={() => setSidebarOpen(false)} className="p-2 hover:bg-gray-800 rounded-xl">
                        <X className="h-5 w-5 text-gray-400" />
                    </button>
                </div>
                <div className="px-4 py-6 border-b border-gray-700">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50">
                        <div className="h-12 w-12 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                            <User className="h-6 w-6 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-white truncate">{user?.name || 'Admin'}</p>
                            <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@example.com'}</p>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto h-[calc(100vh-14rem)] py-4">
                    {navigation.map((item) => renderNavItem(item, 0, true))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white py-3 hover:bg-gray-800/50 rounded-xl">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                </div>
            </div>

            {/* Desktop Sidebar */}
            <div className="hidden lg:fixed lg:inset-y-0 lg:flex lg:w-72 lg:flex-col bg-gradient-to-b from-gray-900 to-gray-800 border-r border-gray-700">
                <div className="px-6 py-6 flex items-center gap-3 border-b border-gray-700">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                        <Truck className="h-6 w-6 text-white" />
                    </div>
                    <div>
                        <h1 className="font-bold text-xl text-white">TyreExpo</h1>
                        <p className="text-xs text-gray-400">Management System</p>
                    </div>
                </div>
                <div className="px-4 py-6 border-b border-gray-700">
                    <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-800/50 border border-gray-700">
                        <div className="h-14 w-14 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                            <User className="h-7 w-7 text-white" />
                        </div>
                        <div className="flex-1">
                            <p className="font-semibold text-white">{user?.name || 'Admin'}</p>
                            <p className="text-sm text-gray-400">{user?.email || 'admin@example.com'}</p>
                            <span className="px-2 py-0.5 bg-orange-500/20 text-orange-400 text-xs rounded-full mt-1 inline-block">Admin</span>
                        </div>
                    </div>
                </div>
                <nav className="flex-1 px-3 space-y-1 overflow-y-auto py-6">
                    {navigation.map((item) => renderNavItem(item, 0, false))}
                </nav>
                <div className="p-4 border-t border-gray-700">
                    <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 text-sm text-gray-400 hover:text-white py-3 hover:bg-gray-800/50 rounded-xl">
                        <LogOut className="h-4 w-4" />
                        Sign Out
                    </button>
                    <div className="mt-4 px-3 pt-4 border-t border-gray-700/50">
                        <p className="text-xs text-gray-500 text-center">© 2024 TyreExpo</p>
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="lg:pl-72">
                <header className="h-16 bg-gray-900/90 backdrop-blur-xl border-b border-gray-700/50 flex items-center px-6 justify-between sticky top-0 z-40">
                    <button className="lg:hidden p-2 hover:bg-gray-800 rounded-xl" onClick={() => setSidebarOpen(true)}>
                        <Menu className="h-5 w-5 text-gray-400" />
                    </button>
                    <div className="hidden md:flex items-center gap-3">
                        <div className="h-2 w-2 rounded-full bg-green-500 animate-pulse"></div>
                        <span className="text-sm text-gray-400">
                            Welcome back, <span className="text-white font-medium">{user?.name?.split(' ')[0] || 'Admin'}</span>
                        </span>
                    </div>
                    <div className="relative">
                        <button onClick={() => setUserMenuOpen(!userMenuOpen)} className="flex items-center gap-3 px-4 py-2 rounded-xl hover:bg-gray-800">
                            <div className="h-9 w-9 rounded-full bg-gradient-to-br from-orange-500 to-red-600 flex items-center justify-center">
                                <User className="h-5 w-5 text-white" />
                            </div>
                            <span className="hidden lg:block text-sm font-semibold text-white">{user?.name || 'Admin'}</span>
                            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${userMenuOpen ? 'rotate-180' : ''}`} />
                        </button>
                        {userMenuOpen && (
                            <div className="absolute right-0 top-full mt-2 w-48 bg-gray-800 border border-gray-700 rounded-xl shadow-2xl py-2 z-50">
                                <div className="px-4 py-3 border-b border-gray-700">
                                    <p className="text-sm font-medium text-white">{user?.name || 'Admin'}</p>
                                    <p className="text-xs text-gray-400 truncate">{user?.email || 'admin@example.com'}</p>
                                </div>
                                <button onClick={handleLogout} className="w-full flex items-center gap-2 px-4 py-2.5 text-sm text-red-400 hover:text-white hover:bg-red-500/20">
                                    <LogOut className="h-4 w-4" />
                                    Sign Out
                                </button>
                            </div>
                        )}
                    </div>
                </header>
                <main className="p-6">
                    <div className="bg-gray-800/30 backdrop-blur-sm rounded-2xl border border-gray-700/30 shadow-xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}