'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { TruckIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { waterConnectionAPI, extraRequirementsAPI } from '@/lib/api/exhibitorClient';

interface WaterConnectionConfig {
  costPerConnection: number;
  gstPercentage: number;
}

export default function WaterConnectionPage() {
  const router = useRouter();
  const [config, setConfig] = useState<WaterConnectionConfig | null>(null);
  const [formData, setFormData] = useState({ connections: 1, purpose: '', drainage: false });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch water connection config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        const response = await waterConnectionAPI.getConfig();
        if (response.success) {
          setConfig(response.data);
        } else {
          setError('Failed to load water connection rates');
        }
      } catch (err: any) {
        console.error('Error fetching config:', err);
        setError(err.message || 'Failed to load rates');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const calculateTotal = () => {
    if (!config) return 0;
    return formData.connections * config.costPerConnection;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.purpose.trim()) {
      alert('Please describe the purpose of water connection');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
      const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');

      const totalCost = calculateTotal();

      const response = await extraRequirementsAPI.submit({
        generalInfo,
        boothDetails,
        eventName: 'Tyre Expo 2024',
        waterConnection: {
          connections: formData.connections,
          costPerConnection: config?.costPerConnection || 5000,
          totalCost: totalCost
        },
        notes: `Purpose: ${formData.purpose}. Drainage required: ${formData.drainage ? 'Yes' : 'No'}`
      });

      if (response.success) {
        setSubmitted(true);
      } else {
        setError(response.error || 'Failed to submit requirement');
      }
    } catch (err: any) {
      console.error('Error submitting:', err);
      setError(err.response?.data?.error || err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading water connection rates...</p>
      </div>
    );
  }

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Requirement Submitted!</h2>
          <p className="text-gray-600 mb-6">Your water connection requirement has been submitted successfully.</p>
          <button onClick={() => router.push('/dashboard/requirements')} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
            Back to Requirements
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center">
          <TruckIcon className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Water Connection</h1>
          <p className="text-gray-500 text-sm">Water supply for your booth</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Connections</label>
          <input
            type="number"
            min="1"
            value={formData.connections}
            onChange={(e) => setFormData({ ...formData, connections: parseInt(e.target.value) })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
          />
          <p className="text-xs text-gray-400 mt-1">@ ₹{config?.costPerConnection.toLocaleString()} per connection</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Water Connection *</label>
          <textarea
            rows={3}
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            placeholder="e.g., Demo equipment, cleaning, drinking water, etc."
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            id="drainage"
            checked={formData.drainage}
            onChange={(e) => setFormData({ ...formData, drainage: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <label htmlFor="drainage" className="text-sm text-gray-700">Drainage facility required</label>
        </div>

        {formData.connections > 0 && (
          <div className="bg-teal-50 p-4 rounded-xl">
            <div className="flex justify-between font-semibold">
              <span>Estimated Cost:</span>
              <span>₹{calculateTotal().toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              + {config?.gstPercentage || 18}% GST extra
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Requirement'}
        </button>
      </form>
    </div>
  );
}