'use client';

import { useState } from 'react';
import { MapIcon, ArrowsPointingOutIcon, MagnifyingGlassPlusIcon, MagnifyingGlassMinusIcon } from '@heroicons/react/24/outline';

export default function FloorLayoutPage() {
  const [zoom, setZoom] = useState(1);

  // Mock floor plan data with booths
  const booths = [
    { id: 'T-41', name: 'TyreTech Industries', x: 50, y: 100, width: 80, height: 60, status: 'booked' },
    { id: 'T-42', name: 'Your Booth', x: 150, y: 100, width: 80, height: 60, status: 'your-booth' },
    { id: 'T-43', name: 'RubberMasters', x: 250, y: 100, width: 80, height: 60, status: 'booked' },
    { id: 'T-44', name: 'TyrePro', x: 350, y: 100, width: 80, height: 60, status: 'available' },
    { id: 'T-45', name: 'WheelTech', x: 450, y: 100, width: 80, height: 60, status: 'available' },
    { id: 'T-46', name: 'AutoTreads', x: 100, y: 200, width: 80, height: 60, status: 'booked' },
    { id: 'T-47', name: 'SpeedGrip', x: 200, y: 200, width: 80, height: 60, status: 'available' },
    { id: 'T-48', name: 'TyreWorld', x: 300, y: 200, width: 80, height: 60, status: 'booked' },
  ];

  const getBoothColor = (status: string) => {
    switch (status) {
      case 'your-booth': return 'bg-gradient-to-r from-amber-400 to-orange-500 border-2 border-amber-600 shadow-lg';
      case 'booked': return 'bg-blue-100 border border-blue-300';
      case 'available': return 'bg-green-50 border border-green-200';
      default: return 'bg-gray-100 border border-gray-200';
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exhibition Floor Layout</h1>
        <p className="text-gray-500 mt-1">Hall A - Tyre Pavilion | Ground Floor</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50">
            <ArrowsPointingOutIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg">
            <button onClick={() => setZoom(Math.max(0.5, zoom - 0.1))} className="p-2 hover:bg-gray-50 rounded-l-lg">
              <MagnifyingGlassMinusIcon className="h-5 w-5 text-gray-600" />
            </button>
            <span className="px-3 text-sm">{Math.round(zoom * 100)}%</span>
            <button onClick={() => setZoom(Math.min(2, zoom + 0.1))} className="p-2 hover:bg-gray-50 rounded-r-lg">
              <MagnifyingGlassPlusIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4 text-sm">
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-gradient-to-r from-amber-400 to-orange-500 rounded"></div><span>Your Booth</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div><span>Booked</span></div>
          <div className="flex items-center gap-2"><div className="w-4 h-4 bg-green-50 border border-green-200 rounded"></div><span>Available</span></div>
        </div>
      </div>

      {/* Floor Plan Canvas */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-auto">
        <div className="relative" style={{ minWidth: '800px', minHeight: '500px' }}>
          {/* Background grid */}
          <div className="absolute inset-0 bg-gray-50" style={{ backgroundImage: 'radial-gradient(circle, #ddd 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>
          
          {/* Hall Label */}
          <div className="absolute top-2 left-1/2 -translate-x-1/2 bg-gray-800 text-white px-4 py-1 rounded-full text-sm">
            HALL A - TYRE PAVILION
          </div>

          {/* Aisle */}
          <div className="absolute left-0 right-0 top-48 h-16 bg-gray-200 flex items-center justify-center">
            <span className="text-gray-500 text-sm">Main Aisle (8m width)</span>
          </div>

          {/* Booths */}
          {booths.map((booth) => (
            <div
              key={booth.id}
              className={`absolute ${getBoothColor(booth.status)} rounded-lg p-2 cursor-pointer transition-all hover:shadow-md`}
              style={{
                left: booth.x * zoom,
                top: booth.y * zoom,
                width: booth.width * zoom,
                height: booth.height * zoom,
              }}
            >
              <div className="text-center">
                <p className="text-xs font-semibold">{booth.id}</p>
                {booth.status === 'your-booth' && (
                  <p className="text-[10px] text-white font-medium">Your Booth</p>
                )}
              </div>
            </div>
          ))}

          {/* Legend Box */}
          <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-3 text-xs border">
            <p className="font-semibold mb-1">Hall Specifications</p>
            <p>Total Area: 2,500 sq.m</p>
            <p>Total Booths: 48</p>
            <p>Aisle Width: 8m</p>
            <p>Ceiling Height: 6m</p>
          </div>
        </div>
      </div>

      {/* Booth Details */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <MapIcon className="h-6 w-6 text-amber-600" />
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Your Booth Location</h3>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Booth Number:</strong> T-42 | <strong>Hall:</strong> Hall A | <strong>Section:</strong> Tyre Pavilion
            </p>
            <p className="text-sm text-gray-600">
              <strong>Dimensions:</strong> 8m x 6m (48 sq.m) | <strong>Power:</strong> 3-Phase Available
            </p>
            <button className="mt-3 text-sm text-amber-600 font-medium hover:text-amber-700">
              View Booth Specifications →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}