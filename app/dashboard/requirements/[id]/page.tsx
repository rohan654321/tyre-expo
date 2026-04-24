'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import {
  ArrowLeftIcon,
  CheckCircleIcon,
  ClockIcon,
  XCircleIcon,
  PencilIcon,
  TrashIcon,
  DocumentTextIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  UserIcon,
  BoltIcon,
} from '@heroicons/react/24/outline';

// Mock data - in real app, fetch from API
const mockRequirements: Record<string, any> = {
  '1': {
    id: '1',
    type: 'electrical',
    title: '3-Phase Power Connection',
    description: '50 KVA power connection for tyre curing press and machinery',
    detailedDescription: 'We need a 3-phase power connection with 50 KVA capacity for our tyre curing press and other machinery. The equipment requires stable voltage and backup support.',
    status: 'approved',
    submittedDate: '2024-03-10',
    approvedDate: '2024-03-12',
    category: 'Electrical',
    amount: 25000,
    specifications: {
      voltage: '415V',
      phase: '3 Phase',
      load: '50 KVA',
      sockets: 4,
      lighting: 6,
    },
    remarks: 'Power connection approved. Please coordinate with site electrician.',
  },
  '2': {
    id: '2',
    type: 'machinery',
    title: 'Heavy Machinery Setup',
    description: 'Forklift and crane for tyre curing press installation (5 ton capacity)',
    detailedDescription: 'We need a 5-ton forklift and crane for installing our tyre curing press. The machine dimensions are 3m x 2.5m x 2m and weighs 4.5 tons.',
    status: 'pending',
    submittedDate: '2024-03-12',
    category: 'Machinery',
    amount: 15000,
    specifications: {
      weight: '4.5 tons',
      dimensions: '3m x 2.5m x 2m',
      equipment: 'Forklift + Crane',
    },
    remarks: 'Under review by operations team.',
  },
  '3': {
    id: '3',
    type: 'personnel',
    title: 'Exhibitor Passes',
    description: '5 personnel passes for exhibition staff including 2 technicians',
    detailedDescription: 'We need 5 exhibitor passes for our team - 3 sales representatives and 2 technicians who will be demonstrating our tyre products.',
    status: 'approved',
    submittedDate: '2024-03-08',
    approvedDate: '2024-03-09',
    category: 'Personnel',
    amount: 5000,
    specifications: {
      quantity: 5,
      types: 'Sales (3), Technicians (2)',
    },
    remarks: 'Passes ready for pickup at registration desk.',
  },
};

export default function RequirementDetailPage() {
  const router = useRouter();
  const params = useParams();
  const id = params.id as string;
  const [requirement, setRequirement] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch
    setTimeout(() => {
      setRequirement(mockRequirements[id] || null);
      setLoading(false);
    }, 500);
  }, [id]);

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'approved': return <CheckCircleIcon className="h-6 w-6 text-green-500" />;
      case 'pending': return <ClockIcon className="h-6 w-6 text-yellow-500" />;
      case 'rejected': return <XCircleIcon className="h-6 w-6 text-red-500" />;
      default: return <ClockIcon className="h-6 w-6 text-gray-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'approved': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  if (!requirement) {
    return (
      <div className="text-center py-12">
        <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
          <DocumentTextIcon className="h-12 w-12 text-gray-400" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900 mb-2">Requirement Not Found</h2>
        <p className="text-gray-500 mb-6">The requirement you're looking for doesn't exist.</p>
        <button onClick={() => router.push('/dashboard/requirements')} className="px-5 py-2 bg-amber-500 text-white rounded-lg">
          Back to Requirements
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <button
            onClick={() => router.back()}
            className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
          >
            <ArrowLeftIcon className="h-5 w-5" />
          </button>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">{requirement.title}</h1>
            <p className="text-gray-500 text-sm">Requirement ID: {requirement.id}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <button className="p-2 text-gray-500 hover:text-blue-600 rounded-lg hover:bg-blue-50 transition">
            <PencilIcon className="h-5 w-5" />
          </button>
          <button className="p-2 text-gray-500 hover:text-red-600 rounded-lg hover:bg-red-50 transition">
            <TrashIcon className="h-5 w-5" />
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-6">
          {/* Status Card */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="font-semibold text-gray-800">Status</h2>
              <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium ${getStatusColor(requirement.status)}`}>
                {getStatusIcon(requirement.status)}
                <span className="capitalize">{requirement.status}</span>
              </span>
            </div>
            {requirement.remarks && (
              <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-600">{requirement.remarks}</p>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="font-semibold text-gray-800 mb-3">Description</h2>
            <p className="text-gray-600 leading-relaxed">{requirement.detailedDescription || requirement.description}</p>
          </div>

          {/* Specifications */}
          {requirement.specifications && Object.keys(requirement.specifications).length > 0 && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="font-semibold text-gray-800 mb-4">Specifications</h2>
              <div className="grid grid-cols-2 gap-4">
                {Object.entries(requirement.specifications).map(([key, value]) => (
                  <div key={key} className="border-b border-gray-100 pb-2">
                    <p className="text-xs text-gray-500 capitalize">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                    <p className="text-sm font-medium text-gray-800 mt-0.5">{String(value)}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Cost Card */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
              <CurrencyDollarIcon className="h-5 w-5" />
              <h3 className="font-semibold">Estimated Cost</h3>
            </div>
            <p className="text-3xl font-bold">₹{requirement.amount?.toLocaleString()}</p>
            <p className="text-sm text-white/80 mt-2">* GST 18% extra as applicable</p>
          </div>

          {/* Timeline */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4">Timeline</h3>
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <CalendarIcon className="h-5 w-5 text-gray-400" />
                <div>
                  <p className="text-xs text-gray-500">Submitted</p>
                  <p className="text-sm font-medium">{new Date(requirement.submittedDate).toLocaleDateString()}</p>
                </div>
              </div>
              {requirement.approvedDate && (
                <div className="flex items-center gap-3">
                  <CheckCircleIcon className="h-5 w-5 text-green-500" />
                  <div>
                    <p className="text-xs text-gray-500">Approved</p>
                    <p className="text-sm font-medium">{new Date(requirement.approvedDate).toLocaleDateString()}</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Category */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-3">Category</h3>
            <div className="flex items-center gap-2">
              <div className="p-2 bg-gray-100 rounded-lg">
                <BoltIcon className="h-4 w-4 text-gray-600" />
              </div>
              <span className="text-sm font-medium text-gray-700">{requirement.category}</span>
            </div>
          </div>

          {/* Support */}
          <div className="bg-gray-50 rounded-2xl p-5">
            <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Contact our exhibition support team for assistance with this requirement.
            </p>
            <button
              onClick={() => window.location.href = 'mailto:support@tyre-expo.com'}
              className="w-full py-2 bg-white border border-gray-200 text-gray-700 rounded-lg text-sm font-medium hover:bg-gray-100 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}