'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  BoltIcon,
  WrenchScrewdriverIcon,
  UserGroupIcon,
  ComputerDesktopIcon,
  SparklesIcon,
  WifiIcon,
  TruckIcon,
  ShieldCheckIcon,
  HomeModernIcon,
  PlusIcon,
  EyeIcon,
  TrashIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  DocumentTextIcon,
  ArrowPathIcon,
  CurrencyDollarIcon,
  BanknotesIcon,
  CubeIcon,
} from '@heroicons/react/24/outline';
import { MapPinIcon, UserIcon } from 'lucide-react';

interface Requirement {
  id: string;
  type: string;
  title: string;
  description: string;
  status: 'pending' | 'approved' | 'rejected' | 'in-progress';
  submittedDate: string;
  category: string;
  amount?: number;
}

export default function RequirementsPage() {
  const router = useRouter();
  const [requirements, setRequirements] = useState<Requirement[]>([
    {
      id: '1',
      type: 'electrical',
      title: '3-Phase Power Connection',
      description: '50 KVA power connection for tyre curing press and machinery',
      status: 'approved',
      submittedDate: '2024-03-10',
      category: 'Electrical',
      amount: 25000
    },
    {
      id: '2',
      type: 'machinery',
      title: 'Heavy Machinery Setup',
      description: 'Forklift and crane for tyre curing press installation (5 ton capacity)',
      status: 'pending',
      submittedDate: '2024-03-12',
      category: 'Machinery',
      amount: 15000
    },
    {
      id: '3',
      type: 'personnel',
      title: 'Exhibitor Passes',
      description: '5 personnel passes for exhibition staff including 2 technicians',
      status: 'approved',
      submittedDate: '2024-03-08',
      category: 'Personnel',
      amount: 5000
    },
  ]);

  const requirementCategories = [
     { id: 'basic-info', name: 'Basic Information', icon: UserIcon, color: 'from-blue-500 to-indigo-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600', description: 'Company & contact details (Required)', href: '/dashboard/requirements/basic-info' },
  { id: 'booth-details', name: 'Booth Details', icon: MapPinIcon, color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600', description: 'Booth & contractor info (Required)', href: '/dashboard/requirements/booth-details' },
    { id: 'electrical', name: 'Electrical Load', icon: BoltIcon, color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600', description: 'Power connections for machinery', href: '/dashboard/requirements/electrical' },
    { id: 'machinery', name: 'Machinery Setup', icon: WrenchScrewdriverIcon, color: 'from-slate-500 to-gray-500', bgColor: 'bg-slate-50', textColor: 'text-slate-600', description: 'Heavy equipment installation', href: '/dashboard/requirements/machinery' },
    { id: 'personnel', name: 'Personnel Passes', icon: UserGroupIcon, color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600', description: 'Staff & exhibitor passes', href: '/dashboard/requirements/personnel' },
    { id: 'furniture', name: 'Furniture Rental', icon: ComputerDesktopIcon, color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600', description: 'Tables, chairs, displays', href: '/dashboard/requirements/furniture' },
    { id: 'hostess', name: 'Hostess Services', icon: SparklesIcon, color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50', textColor: 'text-pink-600', description: 'Event hostesses', href: '/dashboard/requirements/hostess' },
    { id: 'compressed-air', name: 'Compressed Air', icon: WifiIcon, color: 'from-cyan-500 to-teal-500', bgColor: 'bg-cyan-50', textColor: 'text-cyan-600', description: 'Air connections for tools', href: '/dashboard/requirements/compressed-air' },
    { id: 'water', name: 'Water Connection', icon: TruckIcon, color: 'from-teal-500 to-emerald-500', bgColor: 'bg-teal-50', textColor: 'text-teal-600', description: 'Water supply for booth', href: '/dashboard/requirements/water' },
    { id: 'security', name: 'Security Guards', icon: ShieldCheckIcon, color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600', description: 'Security personnel', href: '/dashboard/requirements/security' },
    { id: 'housekeeping', name: 'Housekeeping', icon: HomeModernIcon, color: 'from-indigo-500 to-blue-500', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600', description: 'Cleaning staff', href: '/dashboard/requirements/housekeeping' },
     { id: 'security-deposit', name: 'Security Deposit', icon: BanknotesIcon, color: 'from-emerald-500 to-teal-500', bgColor: 'bg-emerald-50', textColor: 'text-emerald-600', description: 'Contractor security deposit', href: '/dashboard/requirements/security-deposit' },
  { id: 'machine-display', name: 'Machine Display', icon: CubeIcon, color: 'from-slate-500 to-gray-500', bgColor: 'bg-slate-50', textColor: 'text-slate-600', description: 'Heavy machinery details', href: '/dashboard/requirements/machine-display' },
  { id: 'rental-items', name: 'AV & IT Rental', icon: ComputerDesktopIcon, color: 'from-purple-500 to-pink-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600', description: 'Audio/Video equipment', href: '/dashboard/requirements/rental-items' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon className="h-4 w-4 text-green-500" />;
      case 'pending': return <ClockIcon className="h-4 w-4 text-yellow-500" />;
      case 'rejected': return <XCircleIcon className="h-4 w-4 text-red-500" />;
      case 'in-progress': return <ArrowPathIcon className="h-4 w-4 text-blue-500 animate-spin" />;
      default: return <ClockIcon className="h-4 w-4 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      case 'in-progress': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const totalAmount = requirements.reduce((sum, req) => sum + (req.amount || 0), 0);
  const pendingCount = requirements.filter(r => r.status === 'pending').length;
  const approvedCount = requirements.filter(r => r.status === 'approved').length;

  // Handle New Requirement - Open category selection modal or navigate to selection page
  const handleNewRequirement = () => {
    router.push('/dashboard/requirements/new');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exhibition Requirements</h1>
          <p className="text-gray-500 mt-1">Manage all your booth and setup requirements</p>
        </div>
        <button
          onClick={handleNewRequirement}
          className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-amber-500 to-orange-500 text-white rounded-xl font-medium hover:from-amber-600 hover:to-orange-600 transition shadow-sm"
        >
          <PlusIcon className="h-5 w-5" />
          New Requirement
        </button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Total Requirements</p>
              <p className="text-2xl font-bold text-gray-900 mt-1">{requirements.length}</p>
            </div>
            <div className="h-12 w-12 bg-blue-50 rounded-xl flex items-center justify-center">
              <DocumentTextIcon className="h-6 w-6 text-blue-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Pending</p>
              <p className="text-2xl font-bold text-yellow-600 mt-1">{pendingCount}</p>
            </div>
            <div className="h-12 w-12 bg-yellow-50 rounded-xl flex items-center justify-center">
              <ClockIcon className="h-6 w-6 text-yellow-500" />
            </div>
          </div>
        </div>
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Approved</p>
              <p className="text-2xl font-bold text-green-600 mt-1">{approvedCount}</p>
            </div>
            <div className="h-12 w-12 bg-green-50 rounded-xl flex items-center justify-center">
              <CheckCircleIcon className="h-6 w-6 text-green-500" />
            </div>
          </div>
        </div>
        <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-white/80">Total Estimated</p>
              <p className="text-2xl font-bold text-white mt-1">₹{totalAmount.toLocaleString()}</p>
            </div>
            <div className="h-12 w-12 bg-white/20 rounded-xl flex items-center justify-center">
              <CurrencyDollarIcon className="h-6 w-6 text-white" />
            </div>
          </div>
        </div>
      </div>

      {/* Quick Categories Grid */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Quick Add Requirements</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {requirementCategories.map((category) => {
            const Icon = category.icon;
            return (
              <button
                key={category.id}
                onClick={() => router.push(category.href)}
                className="group text-left p-4 rounded-xl border border-gray-100 hover:shadow-md transition-all hover:-translate-y-0.5 bg-white"
              >
                <div className={`h-12 w-12 rounded-xl ${category.bgColor} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                  <Icon className={`h-6 w-6 ${category.textColor}`} />
                </div>
                <h3 className="font-semibold text-gray-800 text-sm">{category.name}</h3>
                <p className="text-xs text-gray-400 mt-1">{category.description}</p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Requirements List - Click to view details */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-100">
          <h2 className="text-lg font-semibold text-gray-800">Your Requirements</h2>
          <p className="text-sm text-gray-500 mt-0.5">Click on any requirement to view details</p>
        </div>

        <div className="divide-y divide-gray-100">
          {requirements.map((req) => (
            <div
              key={req.id}
              onClick={() => router.push(`/dashboard/requirements/${req.id}`)}
              className="p-5 hover:bg-gray-50 transition cursor-pointer"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 flex-wrap mb-2">
                    <h3 className="font-semibold text-gray-800">{req.title}</h3>
                    <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${getStatusColor(req.status)}`}>
                      {getStatusIcon(req.status)}
                      <span className="capitalize">{req.status}</span>
                    </span>
                    {req.amount && (
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600">
                        ₹{req.amount.toLocaleString()}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{req.description}</p>
                  <div className="flex items-center gap-4 text-xs text-gray-400">
                    <span>Category: {req.category}</span>
                    <span>Submitted: {new Date(req.submittedDate).toLocaleDateString()}</span>
                  </div>
                </div>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    router.push(`/dashboard/requirements/${req.id}`);
                  }}
                  className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
                >
                  <EyeIcon className="h-5 w-5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Info Box */}
      <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
        <div className="flex items-start gap-3">
          <div className="p-2 bg-amber-100 rounded-lg">
            <svg className="h-5 w-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h4 className="font-semibold text-amber-800">Important Notes</h4>
            <p className="text-sm text-amber-700 mt-1">
              • All requirements must be submitted at least 15 days before the exhibition start date.<br />
              • Rush orders may incur additional charges.<br />
              • For any queries, contact support at <strong>support@tyre-expo.com</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}