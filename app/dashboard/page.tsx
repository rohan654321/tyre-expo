// app/dashboard/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { dashboardAPI, profileAPI } from '@/lib/api/exhibitorClient';
import {
  BuildingStorefrontIcon,
  CubeIcon,
  TagIcon,
  PhotoIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';

interface DashboardStats {
  products: number;
  brands: number;
  brochures: number;
  pendingRequirements: number;
  boothStatus: string;
}

interface ExhibitorData {
  id: string;
  name: string;
  company: string;
  boothNumber: string;
  status: string;
}

export default function DashboardPage() {
  const [stats, setStats] = useState<DashboardStats>({
    products: 0,
    brands: 0,
    brochures: 0,
    pendingRequirements: 0,
    boothStatus: 'pending',
  });
  const [loading, setLoading] = useState(true);
  const [exhibitor, setExhibitor] = useState<ExhibitorData | null>(null);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // Fetch profile using the original endpoint
      const profileResult = await profileAPI.get();
      console.log('Profile data:', profileResult);

      if (profileResult.success) {
        const profileData = profileResult.data as any; // Use any to access properties dynamically

        setExhibitor({
          id: profileData.id || '',
          // Handle both data structures (original vs new)
          name: profileData.name || profileData.contactPersonName || profileData.contactPerson?.name || 'Exhibitor',
          company: profileData.company || profileData.companyName || profileData.businessName || 'Your company',
          boothNumber: profileData.boothNumber || profileData.booth?.number || 'Not assigned',
          status: profileData.status || profileData.approvalStatus || 'pending',
        });

        setStats(prev => ({
          ...prev,
          boothStatus: profileData.boothStatus || profileData.booth?.status || profileData.status || 'pending',
        }));
      }

      // Fetch stats using the dashboard API
      const statsResult = await dashboardAPI.getStats();
      console.log('Stats data:', statsResult);

      if (statsResult.success) {
        setStats(prev => ({
          ...prev,
          products: statsResult.data.products || 0,
          brands: statsResult.data.brands || 0,
          brochures: statsResult.data.brochures || 0,
          pendingRequirements: statsResult.data.pendingRequirements || 0,
        }));
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  const statCards = [
    { name: 'Products', value: stats.products, icon: CubeIcon, color: 'bg-blue-500', href: '/dashboard/products' },
    { name: 'Brands', value: stats.brands, icon: TagIcon, color: 'bg-purple-500', href: '/dashboard/brands' },
    { name: 'Brochures', value: stats.brochures, icon: PhotoIcon, color: 'bg-green-500', href: '/dashboard/brochures' },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Welcome Section */}
      <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome back, {exhibitor?.name || 'Exhibitor'}!
        </h1>
        <p className="text-amber-100 mt-1">
          {exhibitor?.company || 'Your company'} - Booth #{exhibitor?.boothNumber || 'Not assigned'}
        </p>
        <div className="mt-4 flex items-center gap-2">
          {stats.boothStatus === 'approved' ? (
            <>
              <CheckCircleIcon className="h-5 w-5" />
              <span className="text-sm">Booth confirmed</span>
            </>
          ) : stats.boothStatus === 'pending' ? (
            <>
              <ClockIcon className="h-5 w-5" />
              <span className="text-sm">Booth pending confirmation</span>
            </>
          ) : (
            <>
              <ExclamationTriangleIcon className="h-5 w-5" />
              <span className="text-sm">Booth requires action</span>
            </>
          )}
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div
            key={stat.name}
            onClick={() => window.location.href = stat.href}
            className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 hover:shadow-md transition cursor-pointer"
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-500">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`h-12 w-12 ${stat.color} rounded-xl flex items-center justify-center`}>
                <stat.icon className="h-6 w-6 text-white" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button
            onClick={() => window.location.href = '/dashboard/products'}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition"
          >
            <CubeIcon className="h-8 w-8 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Add Product</span>
          </button>
          <button
            onClick={() => window.location.href = '/dashboard/brands'}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition"
          >
            <TagIcon className="h-8 w-8 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Add Brand</span>
          </button>
          <button
            onClick={() => window.location.href = '/dashboard/brochures'}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition"
          >
            <PhotoIcon className="h-8 w-8 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Upload Brochure</span>
          </button>
          <button
            onClick={() => window.location.href = '/dashboard/requirements'}
            className="flex flex-col items-center gap-2 p-4 rounded-xl border border-gray-200 hover:border-amber-300 hover:bg-amber-50 transition"
          >
            <BuildingStorefrontIcon className="h-8 w-8 text-amber-500" />
            <span className="text-sm font-medium text-gray-700">Submit Requirement</span>
          </button>
        </div>
      </div>
    </div>
  );
}