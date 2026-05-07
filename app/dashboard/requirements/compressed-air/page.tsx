'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { WifiIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { compressedAirAPI, extraRequirementsAPI, CompressedAirOption } from '@/lib/api/exhibitorClient';

export default function CompressedAirPage() {
  const router = useRouter();
  const [options, setOptions] = useState<CompressedAirOption[]>([]);
  const [selectedOption, setSelectedOption] = useState<CompressedAirOption | null>(null);
  const [formData, setFormData] = useState({ connections: 1, usage: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch compressed air options
  useEffect(() => {
    const fetchOptions = async () => {
      try {
        setLoading(true);
        const response = await compressedAirAPI.getAll();
        if (response.success) {
          setOptions(response.data);
          // Set first active option as default
          const activeOption = response.data.find(opt => opt.isActive);
          if (activeOption) {
            setSelectedOption(activeOption);
          }
        } else {
          setError('Failed to load compressed air options');
        }
      } catch (err: any) {
        console.error('Error fetching options:', err);
        setError(err.message || 'Failed to load options');
      } finally {
        setLoading(false);
      }
    };

    fetchOptions();
  }, []);

  const calculateTotal = () => {
    if (!selectedOption) return 0;
    return formData.connections * selectedOption.costPerConnection;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedOption) {
      alert('Please select a compressed air option');
      return;
    }

    if (!formData.usage.trim()) {
      alert('Please describe the equipment usage');
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
        compressedAir: {
          qty: formData.connections,
          cfmRange: selectedOption.cfmRange,
          powerKW: selectedOption.powerKW,
          costPerConnection: selectedOption.costPerConnection,
          totalCost: totalCost
        },
        notes: `Equipment: ${formData.usage}. Option: ${selectedOption.name}`
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading compressed air options...</p>
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
          <p className="text-gray-600 mb-6">Your compressed air requirement has been submitted successfully.</p>
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
        <div className="h-12 w-12 bg-cyan-100 rounded-xl flex items-center justify-center">
          <WifiIcon className="h-6 w-6 text-cyan-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Compressed Air Connection</h1>
          <p className="text-gray-500 text-sm">For pneumatic tools and equipment</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Select Compressed Air Option *</label>
          <div className="space-y-3">
            {options.map(option => (
              <label
                key={option.id}
                className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${selectedOption?.id === option.id
                    ? 'border-cyan-500 bg-cyan-50'
                    : 'border-gray-200 hover:border-cyan-300'
                  }`}
              >
                <div className="flex items-center gap-3">
                  <input
                    type="radio"
                    name="option"
                    checked={selectedOption?.id === option.id}
                    onChange={() => setSelectedOption(option)}
                    className="w-4 h-4 text-cyan-600"
                  />
                  <div>
                    <p className="font-medium text-gray-800">{option.name}</p>
                    <p className="text-xs text-gray-500">CFM: {option.cfmRange} | Power: {option.powerKW} kW</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-semibold text-cyan-600">₹{option.costPerConnection.toLocaleString()}</p>
                  <p className="text-xs text-gray-400">per connection</p>
                </div>
              </label>
            ))}
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Connections</label>
          <input
            type="number"
            min="1"
            value={formData.connections}
            onChange={(e) => setFormData({ ...formData, connections: parseInt(e.target.value) })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Equipment Details *</label>
          <textarea
            rows={3}
            value={formData.usage}
            onChange={(e) => setFormData({ ...formData, usage: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-cyan-500"
            placeholder="Describe the equipment that requires compressed air (e.g., pneumatic tools, machinery, etc.)"
            required
          />
        </div>

        {selectedOption && formData.connections > 0 && (
          <div className="bg-cyan-50 p-4 rounded-xl">
            <div className="flex justify-between font-semibold">
              <span>Estimated Cost:</span>
              <span>₹{calculateTotal().toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">
              @ ₹{selectedOption.costPerConnection.toLocaleString()} per connection
            </p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || !selectedOption}
          className="w-full py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white font-semibold rounded-xl hover:from-cyan-600 hover:to-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Requirement'}
        </button>
      </form>
    </div>
  );
}