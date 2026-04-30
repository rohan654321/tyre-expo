// app/dashboard/floor-layout/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { floorPlanAPI } from '@/lib/api/exhibitorClient';
import {
  ArrowsPointingOutIcon,
  MagnifyingGlassPlusIcon,
  MagnifyingGlassMinusIcon
} from '@heroicons/react/24/outline';

interface FloorPlanData {
  id: number;
  name: string;
  imageUrl?: string;  // Changed from baseImageUrl
  baseImageUrl?: string; // Keep for compatibility
  imageWidth?: number;
  imageHeight?: number;
  boothPositions?: any[];
}

export default function FloorLayoutPage() {
  const [zoom, setZoom] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [floorPlan, setFloorPlan] = useState<FloorPlanData | null>(null);

  useEffect(() => {
    fetchFloorPlanImage();
  }, []);

  const fetchFloorPlanImage = async () => {
    try {
      setLoading(true);
      setError(null);

      console.log('Fetching floor plan from API...');
      const result = await floorPlanAPI.get();
      console.log('Floor plan response:', result);

      if (result.success && result.data) {
        // Map the API response to our FloorPlanData interface
        const apiData = result.data as any;

        const floorPlanData: FloorPlanData = {
          id: apiData.id,
          name: apiData.name || 'Hall A - Tyre Pavilion | Ground Floor',
          // Handle different possible property names from API
          imageUrl: apiData.imageUrl || apiData.baseImageUrl,
          baseImageUrl: apiData.baseImageUrl || apiData.imageUrl,
          imageWidth: apiData.imageWidth || apiData.width,
          imageHeight: apiData.imageHeight || apiData.height,
          boothPositions: apiData.boothPositions
        };

        if (floorPlanData.imageUrl || floorPlanData.baseImageUrl) {
          setFloorPlan(floorPlanData);
          console.log('Image URL found:', floorPlanData.imageUrl || floorPlanData.baseImageUrl);
        } else {
          setError('No floor plan image available');
        }
      } else {
        setError(result.error || 'No floor plan image available');
      }
    } catch (err: any) {
      console.error('Error fetching floor plan:', err);
      setError(err.response?.data?.error || err.message || 'Failed to load floor plan image');
    } finally {
      setLoading(false);
    }
  };

  const handleZoomIn = () => {
    setZoom(Math.min(2, zoom + 0.1));
  };

  const handleZoomOut = () => {
    setZoom(Math.max(0.5, zoom - 0.1));
  };

  const handleResetZoom = () => {
    setZoom(1);
  };

  // Get the image URL from either property
  const getImageUrl = () => {
    return floorPlan?.imageUrl || floorPlan?.baseImageUrl;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading floor plan...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <p className="text-red-600">{error}</p>
        <button
          onClick={fetchFloorPlanImage}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
        >
          Retry
        </button>
      </div>
    );
  }

  if (!floorPlan || !getImageUrl()) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <p className="text-yellow-600">No floor plan image has been uploaded yet.</p>
        <p className="text-sm text-gray-500 mt-2">Please contact the administrator to upload the floor plan.</p>
        <button
          onClick={fetchFloorPlanImage}
          className="mt-4 px-4 py-2 bg-amber-600 text-white rounded-lg hover:bg-amber-700 transition"
        >
          Refresh
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exhibition Floor Layout</h1>
        <p className="text-gray-500 mt-1">{floorPlan.name}</p>
      </div>

      {/* Controls */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <button
            onClick={handleResetZoom}
            className="p-2 bg-white border border-gray-200 rounded-lg hover:bg-gray-50 transition"
            title="Reset zoom"
          >
            <ArrowsPointingOutIcon className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-1 bg-white border border-gray-200 rounded-lg">
            <button
              onClick={handleZoomOut}
              className="p-2 hover:bg-gray-50 rounded-l-lg transition"
              title="Zoom out"
            >
              <MagnifyingGlassMinusIcon className="h-5 w-5 text-gray-600" />
            </button>
            <span className="px-3 text-sm min-w-[60px] text-center">
              {Math.round(zoom * 100)}%
            </span>
            <button
              onClick={handleZoomIn}
              className="p-2 hover:bg-gray-50 rounded-r-lg transition"
              title="Zoom in"
            >
              <MagnifyingGlassPlusIcon className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>

        <div className="text-sm text-gray-500">
          Click and drag to pan | Use buttons to zoom
        </div>
      </div>

      {/* Floor Plan Image Container */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 overflow-auto">
        <div
          className="relative overflow-hidden"
          style={{
            minWidth: '100%',
            minHeight: '500px',
            cursor: 'grab',
            background: '#f5f5f5',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <img
            src={getImageUrl()}
            alt={floorPlan.name || "Exhibition Floor Plan"}
            className="transition-transform duration-200 ease-out"
            style={{
              transform: `scale(${zoom})`,
              transformOrigin: 'top left',
              width: floorPlan.imageWidth ? `${floorPlan.imageWidth}px` : '100%',
              height: 'auto',
              objectFit: 'contain'
            }}
            onError={(e) => {
              console.error('Image failed to load:', getImageUrl());
              setError('Failed to load floor plan image. Please check the image URL.');
            }}
            onLoad={() => {
              console.log('Image loaded successfully');
            }}
          />
        </div>
      </div>

      {/* Floor Plan Information */}
      <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-5 border border-amber-100">
        <div className="flex items-start gap-4">
          <div className="p-3 bg-white rounded-xl shadow-sm">
            <svg className="h-6 w-6 text-amber-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
            </svg>
          </div>
          <div>
            <h3 className="font-semibold text-gray-800">Hall Information</h3>
            <p className="text-sm text-gray-600 mt-1">
              <strong>Hall:</strong> Hall A | <strong>Pavilion:</strong> Tyre Pavilion | <strong>Floor:</strong> Ground Floor
            </p>
            {floorPlan.imageWidth && floorPlan.imageHeight && (
              <p className="text-sm text-gray-600">
                <strong>Image Dimensions:</strong> {floorPlan.imageWidth} x {floorPlan.imageHeight} pixels
              </p>
            )}
            {floorPlan.boothPositions && floorPlan.boothPositions.length > 0 && (
              <p className="text-sm text-gray-600">
                <strong>Total Booths:</strong> {floorPlan.boothPositions.length}
              </p>
            )}
            <button
              onClick={fetchFloorPlanImage}
              className="mt-3 text-sm text-amber-600 font-medium hover:text-amber-700 transition"
            >
              Refresh Floor Plan →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}