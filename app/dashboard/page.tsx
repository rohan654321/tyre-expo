'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BuildingStorefrontIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  DocumentCheckIcon,
  SparklesIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  UserCircleIcon,
  CreditCardIcon,
  ClipboardDocumentListIcon,
  PhoneIcon,
  EnvelopeIcon,
  ClockIcon,
  MapIcon,
  BuildingOfficeIcon,
  TrashIcon,
  CubeIcon,
  CalendarIcon,
} from "@heroicons/react/24/outline";
import { CheckCircleIcon } from "@heroicons/react/24/solid";

// Components
import StatsCard from '@/components/dashboard/StatsCard';
import QuickActionCard from '@/components/dashboard/QuickActionCard';
import ActivityItem from '@/components/dashboard/ActivityItem';
import DashboardSkeleton from '@/components/dashboard/DashboardSkeleton';
import StatusBadge from '@/components/dashboard/StatusBadge';
import InfoCard from '@/components/dashboard/InfoCard';

// Mock Data
const MOCK_DATA = {
  exhibitor: {
    id: '1',
    name: 'Rajesh Kumar',
    company: 'TyreTech Industries',
    email: 'rajesh@tyretech.com',
    phone: '+91 98765 43210',
    boothNumber: 'T-42',
    status: 'active',
    tyreBrands: ['RoadGrip', 'DuraTyre', 'EcoRoll', 'MileMaster'],
    logo: '/tyre-logo.png'
  },
  invoices: [
    { id: 'inv1', invoiceNumber: 'INV-2024-001', amount: 125000, status: 'paid', dueDate: '2024-03-15' },
    { id: 'inv2', invoiceNumber: 'INV-2024-002', amount: 75000, status: 'pending', dueDate: '2024-04-10' }
  ],
  requirements: [
    { id: 'req1', type: 'electrical', description: '3-phase power connection', status: 'approved' },
    { id: 'req2', type: 'machinery', description: 'Heavy machinery lift', status: 'pending' },
    { id: 'req3', type: 'personnel', description: '5 exhibitor passes', status: 'approved' }
  ],
  floorPlan: {
    name: 'Hall A - Tyre Section',
    floor: 'Ground Floor'
  },
  event: {
    name: 'India Tyre Expo 2024',
    venue: 'Bombay Exhibition Centre, Mumbai',
    exhibitionDay: '15th November, 2024',
    dismantleDay: '18th November, 2024'
  }
};

export default function TyreExpoDashboard() {
  const [dashboardData, setDashboardData] = useState(MOCK_DATA);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Simulate loading for demo
  useEffect(() => {
    setLoading(true);
    setTimeout(() => {
      setDashboardData(MOCK_DATA);
      setLoading(false);
    }, 800);
  }, []);

  const stats = [
    {
      title: "Company Profile",
      value: dashboardData.exhibitor.status === 'active' ? "Verified" : "Pending",
      change: dashboardData.exhibitor.status === 'active' ? "Active" : "Action Required",
      icon: BuildingStorefrontIcon,
      color: "from-emerald-500 to-teal-600",
      trend: "up" as const,
      href: "/dashboard/exhibitor",
    },
    {
      title: "Tyre Booth",
      value: dashboardData.exhibitor.boothNumber,
      change: dashboardData.floorPlan.name,
      icon: MapPinIcon,
      color: "from-blue-500 to-indigo-600",
      trend: "stable" as const,
      href: "/dashboard/layout",
    },
    {
      title: "Investment",
      value: `₹${(dashboardData.invoices.reduce((sum, inv) => sum + inv.amount, 0) / 100000).toFixed(1)}L`,
      change: `${dashboardData.invoices.filter(i => i.status === 'paid').length}/${dashboardData.invoices.length} Paid`,
      icon: CurrencyDollarIcon,
      color: "from-purple-500 to-violet-600",
      trend: "up" as const,
      href: "/dashboard/invoice",
    },
    {
      title: "Requirements",
      value: `${dashboardData.requirements.filter(r => r.status === 'pending').length} Pending`,
      change: `${dashboardData.requirements.length} Total`,
      icon: DocumentCheckIcon,
      color: "from-amber-500 to-orange-600",
      trend: "warning" as const,
      href: "/dashboard/requirements",
    },
  ];

  const quickActions = [
    {
      title: "Company Profile",
      description: "Update your tyre company info",
      icon: BuildingStorefrontIcon,
      color: "bg-blue-50 text-blue-600",
      onClick: () => router.push('/dashboard/exhibitor')
    },
    {
      title: "View Invoices",
      description: "Check and pay dues",
      icon: CreditCardIcon,
      color: "bg-green-50 text-green-600",
      onClick: () => router.push('/dashboard/invoice')
    },
    {
      title: "Stall Layout",
      description: "View your booth location",
      icon: MapIcon,
      color: "bg-purple-50 text-purple-600",
      onClick: () => router.push('/dashboard/layout')
    },
    {
      title: "Requirements",
      description: "Submit additional requests",
      icon: ClipboardDocumentListIcon,
      color: "bg-amber-50 text-amber-600",
      onClick: () => router.push('/dashboard/requirements')
    },
    {
      title: "Exhibitor Manual",
      description: "Event guidelines",
      icon: DocumentCheckIcon,
      color: "bg-cyan-50 text-cyan-600",
      onClick: () => router.push('/dashboard/manual')
    },
    {
      title: "Stall Booked",
      description: "View your booked stalls",
      icon: CubeIcon,
      color: "bg-rose-50 text-rose-600",
      onClick: () => router.push('/dashboard/stall')
    },
  ];

  const activities = [
    {
      title: "Profile Verified",
      description: `${dashboardData.exhibitor.company} has been verified`,
      time: "2 hours ago",
      icon: CheckCircleIcon,
      color: "bg-green-50 text-green-600"
    },
    {
      title: `Booth ${dashboardData.exhibitor.boothNumber} Assigned`,
      description: `Tyre section - ${dashboardData.floorPlan.name}`,
      time: "1 day ago",
      icon: MapPinIcon,
      color: "bg-blue-50 text-blue-600"
    },
    {
      title: `${dashboardData.invoices.length} Invoice(s) Generated`,
      description: "Check invoices for payment",
      time: "2 days ago",
      icon: CurrencyDollarIcon,
      color: "bg-purple-50 text-purple-600"
    },
    {
      title: `${dashboardData.requirements.filter(r => r.status === 'pending').length} Pending Requirements`,
      description: "Review and submit requirements",
      time: "3 days ago",
      icon: ExclamationTriangleIcon,
      color: "bg-orange-50 text-orange-600"
    },
  ];

  const upcomingEvents = [
    { title: "Expo Name", value: dashboardData.event.name, icon: BuildingOfficeIcon, color: "from-blue-500 to-indigo-500" },
    { title: "Venue", value: dashboardData.event.venue, icon: MapIcon, color: "from-purple-500 to-pink-500" },
    { title: "Exhibition Day", value: dashboardData.event.exhibitionDay, icon: CalendarIcon, color: "from-emerald-500 to-teal-500" },
    { title: "Dismantle Day", value: dashboardData.event.dismantleDay, icon: TrashIcon, color: "from-orange-500 to-red-500" },
  ];

  const contactInfo = [
    { type: "Tyre Expo Helpline", value: "+91 22 1234 5678", icon: PhoneIcon },
    { type: "Support Email", value: "support@tyre-expo.com", icon: EnvelopeIcon },
    { type: "Hours", value: "Mon-Fri, 9AM-6PM IST", icon: ClockIcon },
  ];

  if (loading) return <DashboardSkeleton />;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <div>
              <div className="flex items-center gap-3 mb-2">
                <div className="bg-gradient-to-r from-amber-600 to-orange-600 p-2 rounded-xl shadow-md">
                  <svg className="h-6 w-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                    <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 2v4M22 12h-4M12 20v4M4 12H2M20 12h2M6.343 6.343l2.828 2.828M14.829 14.829l2.828 2.828M17.657 6.343l-2.828 2.828M9.171 14.829l-2.828 2.828" />
                  </svg>
                </div>
                <div>
                  <h1 className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">
                    Welcome, {dashboardData.exhibitor.company}!
                  </h1>
                  <p className="text-gray-500 mt-1 flex items-center gap-2">
                    <span className="inline-block w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                    Your Tyre Expo dashboard is ready
                  </p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4 min-w-[200px]">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Expo Status</p>
                  <StatusBadge status={dashboardData.exhibitor.status === 'active' ? 'active' : 'pending'} size="sm" />
                </div>
                <button 
                  onClick={() => window.location.reload()} 
                  className="p-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100 rounded-xl transition"
                >
                  <ArrowPathIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {stats.map((stat) => (
            <StatsCard key={stat.title} {...stat} />
          ))}
        </div>

        {/* Tyre Brands Banner */}
        <div className="mb-8 bg-gradient-to-r from-slate-800 to-slate-900 rounded-2xl p-5 shadow-lg">
          <div className="flex items-center gap-3 mb-4">
            <CubeIcon className="h-6 w-6 text-amber-400" />
            <h3 className="text-white font-semibold">Your Tyre Brands</h3>
          </div>
          <div className="flex flex-wrap gap-3">
            {dashboardData.exhibitor.tyreBrands.map((brand, idx) => (
              <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl px-4 py-2">
                <span className="text-white text-sm font-medium">{brand}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Quick Actions */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Quick Actions</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Manage your tyre expo presence</p>
                </div>
                <SparklesIcon className="h-5 w-5 text-amber-400" />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                {quickActions.map((action) => (
                  <QuickActionCard key={action.title} {...action} />
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h2 className="text-lg font-semibold text-gray-800">Recent Activity</h2>
                  <p className="text-sm text-gray-500 mt-0.5">Latest updates on your account</p>
                </div>
              </div>
              <div className="space-y-3">
                {activities.map((activity, idx) => (
                  <ActivityItem key={idx} {...activity} />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            {/* Account Summary */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Account Summary</h2>
              <div className="space-y-3">
                <InfoCard
                  title="Contact Person"
                  value={dashboardData.exhibitor.name}
                  icon={UserCircleIcon}
                  color="from-blue-500 to-indigo-500"
                />
                <InfoCard
                  title="Payment Status"
                  value={`${dashboardData.invoices.filter(inv => inv.status === 'paid').length} of ${dashboardData.invoices.length} paid`}
                  icon={CreditCardIcon}
                  color="from-emerald-500 to-teal-500"
                />
                <InfoCard
                  title="Requirements Status"
                  value={`${dashboardData.requirements.filter(r => r.status === 'pending').length} pending`}
                  icon={ClipboardDocumentListIcon}
                  color="from-amber-500 to-orange-500"
                />
              </div>
            </div>

            {/* Event Details */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Tyre Expo 2024</h2>
              <div className="space-y-3">
                {upcomingEvents.map((event, idx) => (
                  <div key={idx} className="flex items-center gap-4 p-3 border border-gray-100 rounded-xl hover:bg-gray-50 transition">
                    <div className={`p-2 bg-gradient-to-r ${event.color} rounded-lg shadow-sm`}>
                      <event.icon className="h-5 w-5 text-white" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs text-gray-500">{event.title}</p>
                      <p className="text-sm font-medium text-gray-800 mt-0.5">{event.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Support Section */}
            <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white shadow-lg">
              <h3 className="font-bold text-lg mb-2">Need Help?</h3>
              <p className="text-sm text-white/80 mb-4">
                Contact our dedicated tyre expo support team.
              </p>
              <div className="space-y-3">
                {contactInfo.map((contact, idx) => (
                  <div key={idx} className="flex items-center gap-3">
                    <contact.icon className="h-4 w-4 text-white/70" />
                    <div>
                      <p className="text-xs text-white/60">{contact.type}</p>
                      <p className="text-sm font-medium">{contact.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-xs text-gray-400 border-t border-gray-200 pt-6">
          <p>© 2024 India Tyre Expo. All rights reserved. | Exhibitor Portal v2.0</p>
        </div>
      </div>
    </div>
  );
}