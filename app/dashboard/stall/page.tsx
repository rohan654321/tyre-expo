// app/dashboard/my-stalls/page.tsx
'use client';

import { useState, useEffect } from 'react';
import {
  ShoppingCartIcon,
  MapPinIcon,
  CurrencyDollarIcon,
  CalendarIcon,
  CheckCircleIcon,
  ClockIcon,
  ExclamationTriangleIcon,
  ArrowPathIcon,
  BuildingOfficeIcon,
  UserIcon
} from '@heroicons/react/24/outline';
import { boothAPI } from '@/lib/api/exhibitorClient';

// Match the actual backend response structure
interface StallData {
  boothNumber: string;
  size: string;
  type: string;
  dimensions: string;
  notes: string;
  price: string;
  status: 'pending' | 'approved' | 'rejected' | 'confirmed';
  stallDetails?: {
    size: string;
    type: string;
    dimensions: string;
    notes: string;
    price: string;
  };
}

interface BoothDetailsResponse {
  success: boolean;
  data: StallData;
}

export default function MyStallsPage() {
  const [stall, setStall] = useState<StallData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchStallDetails();
  }, []);

  const fetchStallDetails = async () => {
    try {
      setLoading(true);
      setError(null);

      const result = await boothAPI.getDetails() as BoothDetailsResponse;
      console.log('Stall details response:', result);

      if (result.success && result.data) {
        setStall(result.data);
      } else {
        setStall(null);
      }
    } catch (err: any) {
      console.error('Error fetching stall details:', err);
      // If 404 or no data found, that's fine - just means no stall booked
      if (err.response?.status === 404) {
        setStall(null);
      } else {
        setError(err.response?.data?.error || err.message || 'Failed to load stall details');
      }
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'confirmed':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'rejected':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'confirmed':
        return <CheckCircleIcon className="h-4 w-4 inline mr-1" />;
      case 'pending':
        return <ClockIcon className="h-4 w-4 inline mr-1" />;
      case 'rejected':
        return <ExclamationTriangleIcon className="h-4 w-4 inline mr-1" />;
      default:
        return null;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status?.toLowerCase()) {
      case 'approved':
      case 'confirmed':
        return "✓ Your stall has been confirmed! You can now proceed with booth setup.";
      case 'pending':
        return "⏳ Your stall booking is pending approval. We'll notify you once confirmed.";
      case 'rejected':
        return "✗ Your stall booking was not approved. Please contact the administration for more details.";
      default:
        return "Your stall details have been submitted for review.";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading stall details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <ExclamationTriangleIcon className="h-12 w-12 text-red-500 mx-auto mb-3" />
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchStallDetails}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition inline-flex items-center gap-2"
        >
          <ArrowPathIcon className="h-4 w-4" />
          Retry
        </button>
      </div>
    );
  }

  if (!stall) {
    return (
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
        <ShoppingCartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-900 mb-2">No Stalls Booked Yet</h3>
        <p className="text-gray-500 mb-4">You haven't booked any exhibition stalls.</p>
        <button
          onClick={() => window.location.href = '/dashboard/floor-layout'}
          className="px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
        >
          Browse Available Stalls
        </button>
      </div>
    );
  }

  // Use stallDetails if available, otherwise use main stall properties
  const stallInfo = stall.stallDetails || stall;
  const size = stallInfo.size || stall.size;
  const stallType = stallInfo.type || stall.type;
  const stallPrice = stallInfo.price || stall.price;
  const stallNotes = stallInfo.notes || stall.notes;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Booked Stall</h1>
        <p className="text-gray-500 mt-1">View your confirmed exhibition stall details</p>
      </div>

      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
          {/* Header */}
          <div className="bg-gradient-to-r from-amber-600 to-orange-600 px-6 py-5 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold">{stall.boothNumber || 'Stall Not Assigned'}</h2>
                <p className="text-sm text-amber-100 mt-1">Tyre Pavilion, Hall A</p>
              </div>
              <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stall.status)}`}>
                {getStatusIcon(stall.status)}
                {stall.status?.charAt(0).toUpperCase() + stall.status?.slice(1) || 'Pending'}
              </span>
            </div>
          </div>

          {/* Details */}
          <div className="p-6 space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div className="flex items-start gap-3">
                <MapPinIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Stall Size</p>
                  <p className="font-semibold text-gray-800">{size || 'Not specified'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <BuildingOfficeIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Stall Type</p>
                  <p className="font-semibold text-gray-800">{stallType || 'Standard'}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CurrencyDollarIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Price</p>
                  <p className="font-semibold text-gray-800">₹{parseInt(stallPrice || '0').toLocaleString()}</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CalendarIcon className="h-5 w-5 text-amber-500 mt-0.5" />
                <div>
                  <p className="text-xs text-gray-500 uppercase tracking-wide">Exhibition Dates</p>
                  <p className="font-semibold text-gray-800">15-17 March, 2025</p>
                </div>
              </div>
            </div>

            {/* Dimensions if available */}
            {stall.dimensions && (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Dimensions</p>
                    <p className="text-gray-800">{stall.dimensions}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Notes if available */}
            {stallNotes && (
              <div className="border-t border-gray-100 pt-4">
                <div className="flex items-start gap-3">
                  <div className="h-5 w-5" />
                  <div>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Additional Notes</p>
                    <p className="text-gray-600 text-sm">{stallNotes}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Status Message */}
            <div className={`rounded-lg p-4 mt-2 ${stall.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
                stall.status === 'approved' || stall.status === 'confirmed' ? 'bg-green-50 border border-green-200' :
                  stall.status === 'rejected' ? 'bg-red-50 border border-red-200' :
                    'bg-gray-50 border border-gray-200'
              }`}>
              <p className={`text-sm ${stall.status === 'pending' ? 'text-yellow-800' :
                  stall.status === 'approved' || stall.status === 'confirmed' ? 'text-green-800' :
                    stall.status === 'rejected' ? 'text-red-800' :
                      'text-gray-800'
                }`}>
                {getStatusMessage(stall.status)}
              </p>
            </div>

            {/* Amenities / Included Items */}
            <div className="border-t border-gray-100 pt-4">
              <p className="text-sm font-medium text-gray-700 mb-3">Included Amenities</p>
              <div className="flex flex-wrap gap-2">
                {[
                  'Standard Booth Structure',
                  'Carpet Flooring',
                  '3-Phase Power Connection',
                  'WiFi Internet',
                  '2 Chairs & Table',
                  'Waste Bin'
                ].map((amenity, idx) => (
                  <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                    {amenity}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3 pt-2">
              <button
                onClick={() => window.location.href = '/dashboard/booth-details'}
                className="flex-1 py-2.5 bg-amber-500 text-white rounded-lg text-sm font-medium hover:bg-amber-600 transition"
              >
                Edit Stall Details
              </button>
              <button
                onClick={() => window.location.href = '/dashboard/layout'}
                className="flex-1 py-2.5 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 transition"
              >
                View Floor Plan
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}