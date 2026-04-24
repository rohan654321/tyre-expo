'use client';

import { useState } from 'react';
import { ShoppingCartIcon, MapPinIcon, CurrencyDollarIcon, CalendarIcon, CheckCircleIcon, ClockIcon } from '@heroicons/react/24/outline';

const mockStalls = [
  {
    id: '1',
    stallNumber: 'T-42',
    location: 'Hall A, Tyre Pavilion',
    size: '8m x 6m (48 sq.m)',
    type: 'Premium Corner',
    price: 125000,
    bookedDate: '2024-02-15',
    status: 'confirmed',
    amenities: ['3-Phase Power', 'WiFi', 'Carpet Flooring', 'Storage Room', 'Display Lighting'],
  },
];

export default function MyStallsPage() {
  const [stalls] = useState(mockStalls);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'confirmed': return 'bg-green-100 text-green-800';
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">My Booked Stalls</h1>
        <p className="text-gray-500 mt-1">View your confirmed exhibition stalls</p>
      </div>

      {stalls.length === 0 ? (
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 text-center py-12">
          <ShoppingCartIcon className="h-16 w-16 text-gray-300 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">No Stalls Booked Yet</h3>
          <p className="text-gray-500 mb-4">You haven't booked any exhibition stalls.</p>
          <button className="px-5 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600">
            Browse Available Stalls
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {stalls.map((stall) => (
            <div key={stall.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 px-6 py-4 text-white">
                <div className="flex justify-between items-center">
                  <div>
                    <h2 className="text-xl font-bold">{stall.stallNumber}</h2>
                    <p className="text-sm text-blue-100 mt-1">{stall.location}</p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(stall.status)}`}>
                    {stall.status === 'confirmed' ? <CheckCircleIcon className="h-4 w-4 inline mr-1" /> : <ClockIcon className="h-4 w-4 inline mr-1" />}
                    {stall.status.charAt(0).toUpperCase() + stall.status.slice(1)}
                  </span>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-start gap-2">
                    <MapPinIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Stall Size</p>
                      <p className="font-medium text-gray-800">{stall.size}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CurrencyDollarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Price</p>
                      <p className="font-medium text-gray-800">₹{stall.price.toLocaleString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <CalendarIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Booked Date</p>
                      <p className="font-medium text-gray-800">{new Date(stall.bookedDate).toLocaleDateString()}</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <ShoppingCartIcon className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-xs text-gray-500">Stall Type</p>
                      <p className="font-medium text-gray-800">{stall.type}</p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-2">Amenities Included</p>
                  <div className="flex flex-wrap gap-2">
                    {stall.amenities.map((amenity, idx) => (
                      <span key={idx} className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-full">
                        {amenity}
                      </span>
                    ))}
                  </div>
                </div>

                <button className="w-full mt-2 py-2 border border-gray-200 rounded-lg text-gray-600 text-sm font-medium hover:bg-gray-50 transition">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}