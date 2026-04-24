'use client';

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
  ArrowLeftIcon,
} from '@heroicons/react/24/outline';

const requirementTypes = [
  { id: 'electrical', name: 'Electrical Load', icon: BoltIcon, description: 'Power connections for machinery and lighting', color: 'from-blue-500 to-cyan-500', bgColor: 'bg-blue-50', textColor: 'text-blue-600', href: '/dashboard/requirements/electrical' },
  { id: 'machinery', name: 'Machinery Setup', icon: WrenchScrewdriverIcon, description: 'Heavy equipment installation and handling', color: 'from-slate-500 to-gray-500', bgColor: 'bg-slate-50', textColor: 'text-slate-600', href: '/dashboard/requirements/machinery' },
  { id: 'personnel', name: 'Personnel Passes', icon: UserGroupIcon, description: 'Exhibitor passes for your staff', color: 'from-green-500 to-emerald-500', bgColor: 'bg-green-50', textColor: 'text-green-600', href: '/dashboard/requirements/personnel' },
  { id: 'furniture', name: 'Furniture Rental', icon: ComputerDesktopIcon, description: 'Tables, chairs, display counters', color: 'from-purple-500 to-violet-500', bgColor: 'bg-purple-50', textColor: 'text-purple-600', href: '/dashboard/requirements/furniture' },
  { id: 'hostess', name: 'Hostess Services', icon: SparklesIcon, description: 'Professional hostesses for your booth', color: 'from-pink-500 to-rose-500', bgColor: 'bg-pink-50', textColor: 'text-pink-600', href: '/dashboard/requirements/hostess' },
  { id: 'compressed-air', name: 'Compressed Air', icon: WifiIcon, description: 'Air connections for pneumatic tools', color: 'from-cyan-500 to-teal-500', bgColor: 'bg-cyan-50', textColor: 'text-cyan-600', href: '/dashboard/requirements/compressed-air' },
  { id: 'water', name: 'Water Connection', icon: TruckIcon, description: 'Water supply for your booth', color: 'from-teal-500 to-emerald-500', bgColor: 'bg-teal-50', textColor: 'text-teal-600', href: '/dashboard/requirements/water' },
  { id: 'security', name: 'Security Guards', icon: ShieldCheckIcon, description: 'Security personnel for your booth', color: 'from-amber-500 to-orange-500', bgColor: 'bg-amber-50', textColor: 'text-amber-600', href: '/dashboard/requirements/security' },
  { id: 'housekeeping', name: 'Housekeeping', icon: HomeModernIcon, description: 'Cleaning and maintenance staff', color: 'from-indigo-500 to-blue-500', bgColor: 'bg-indigo-50', textColor: 'text-indigo-600', href: '/dashboard/requirements/housekeeping' },
];

export default function NewRequirementPage() {
  const router = useRouter();

  return (
    <div className="max-w-5xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">New Requirement</h1>
          <p className="text-gray-500 text-sm">Select the type of requirement you want to submit</p>
        </div>
      </div>

      {/* Requirement Types Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {requirementTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.id}
              onClick={() => router.push(type.href)}
              className="group bg-white rounded-2xl shadow-sm border border-gray-100 p-6 text-left hover:shadow-lg transition-all hover:-translate-y-1"
            >
              <div className={`h-14 w-14 rounded-xl ${type.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <Icon className={`h-7 w-7 ${type.textColor}`} />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-1">{type.name}</h3>
              <p className="text-sm text-gray-500">{type.description}</p>
              <div className="mt-4 flex items-center gap-1 text-sm font-medium text-amber-600 group-hover:gap-2 transition-all">
                <span>Submit Request</span>
                <span>→</span>
              </div>
            </button>
          );
        })}
      </div>

      {/* Help Section */}
      <div className="mt-8 bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-6">
        <h3 className="font-semibold text-gray-800 mb-2">Need Help Choosing?</h3>
        <p className="text-sm text-gray-600">
          If you're unsure about which requirement to select or need assistance with your setup,
          please contact our exhibition support team at <strong className="text-amber-600">support@tyre-expo.com</strong> or call <strong className="text-amber-600">+91 22 1234 5678</strong>
        </p>
      </div>
    </div>
  );
}