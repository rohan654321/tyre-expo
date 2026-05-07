'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  BoltIcon,
  ArrowLeftIcon,
  CalculatorIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { electricalAPI, extraRequirementsAPI } from '@/lib/api/exhibitorClient';

interface ElectricalRates {
  temporary: { ratePerKW: number };
  exhibition: { ratePerKW: number };
}

export default function ElectricalRequirementsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    temporaryLoad: '',
    exhibitionLoad: '',
    voltage: '415',
    phase: '3',
    sockets: 0,
    lightingPoints: 0,
    specialEquipment: '',
  });
  const [rates, setRates] = useState<ElectricalRates | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch electrical rates with fallback values
  useEffect(() => {
    const fetchRates = async () => {
      try {
        setLoading(true);
        const response = await electricalAPI.getActiveRates();
        if (response.success && response.data) {
          setRates(response.data);
        } else {
          // Set fallback rates if API fails
          console.warn('Using fallback electrical rates');
          setRates({
            temporary: { ratePerKW: 3500 },
            exhibition: { ratePerKW: 3500 }
          });
        }
      } catch (err: any) {
        console.error('Error fetching rates:', err);
        // Use fallback rates on error
        setRates({
          temporary: { ratePerKW: 3500 },
          exhibition: { ratePerKW: 3500 }
        });
        setError('Could not load rates from server. Using default values.');
      } finally {
        setLoading(false);
      }
    };

    fetchRates();
  }, []);

  const calculateTotal = () => {
    if (!rates) return 0;
    const tempKW = parseFloat(formData.temporaryLoad) || 0;
    const exhKW = parseFloat(formData.exhibitionLoad) || 0;
    const socketCost = (formData.sockets || 0) * 1500;
    const lightingCost = (formData.lightingPoints || 0) * 800;
    return (tempKW * (rates.temporary?.ratePerKW || 3500)) +
      (exhKW * (rates.exhibition?.ratePerKW || 3500)) +
      socketCost +
      lightingCost;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.temporaryLoad && !formData.exhibitionLoad) {
      alert('Please enter at least one electrical load requirement');
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
        electricalLoad: {
          temporaryLoad: formData.temporaryLoad || '0',
          temporaryTotal: (parseFloat(formData.temporaryLoad) || 0) * (rates?.temporary?.ratePerKW || 3500),
          exhibitionLoad: formData.exhibitionLoad || '0',
          exhibitionTotal: (parseFloat(formData.exhibitionLoad) || 0) * (rates?.exhibition?.ratePerKW || 3500),
        },
        notes: `Voltage: ${formData.voltage}V, Phase: ${formData.phase}, Sockets: ${formData.sockets}, Lighting: ${formData.lightingPoints}, Special Equipment: ${formData.specialEquipment || 'None'}`
      });

      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          router.push('/dashboard/requirements');
        }, 2000);
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
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading electrical rates...</p>
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
          <p className="text-gray-600 mb-6">Your electrical requirement has been submitted successfully.</p>
          <button
            onClick={() => router.push('/dashboard/requirements')}
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            Back to Requirements
          </button>
        </div>
      </div>
    );
  }

  // Safe access to rates with fallback
  const tempRate = rates?.temporary?.ratePerKW || 3500;
  const exhRate = rates?.exhibition?.ratePerKW || 3500;

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => router.back()}
          className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition"
        >
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <BoltIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Electrical Requirements</h1>
          <p className="text-gray-500 text-sm">Power connections for machinery and booth lighting</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm">
          ⚠️ {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Form */}
        <div className="lg:col-span-2 bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Temporary Load (Setup Days)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.temporaryLoad}
                    onChange={(e) => setFormData({ ...formData, temporaryLoad: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter KW"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400 text-sm">KW</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">@ ₹{tempRate.toLocaleString()} per KW</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Exhibition Load (Show Days)
                </label>
                <div className="relative">
                  <input
                    type="number"
                    step="0.1"
                    value={formData.exhibitionLoad}
                    onChange={(e) => setFormData({ ...formData, exhibitionLoad: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="Enter KW"
                  />
                  <span className="absolute right-3 top-2.5 text-gray-400 text-sm">KW</span>
                </div>
                <p className="text-xs text-gray-400 mt-1">@ ₹{exhRate.toLocaleString()} per KW</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Voltage Requirement</label>
                <select
                  value={formData.voltage}
                  onChange={(e) => setFormData({ ...formData, voltage: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="230">230V (Single Phase)</option>
                  <option value="415">415V (3 Phase)</option>
                  <option value="11">11 KV (HT)</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phase</label>
                <select
                  value={formData.phase}
                  onChange={(e) => setFormData({ ...formData, phase: e.target.value })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                >
                  <option value="1">Single Phase</option>
                  <option value="3">3 Phase</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Power Sockets</label>
                <input
                  type="number"
                  min="0"
                  value={formData.sockets}
                  onChange={(e) => setFormData({ ...formData, sockets: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of sockets"
                />
                <p className="text-xs text-gray-400 mt-1">@ ₹1,500 per socket</p>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Lighting Points</label>
                <input
                  type="number"
                  min="0"
                  value={formData.lightingPoints}
                  onChange={(e) => setFormData({ ...formData, lightingPoints: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                  placeholder="Number of lights"
                />
                <p className="text-xs text-gray-400 mt-1">@ ₹800 per point</p>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Special Equipment Details</label>
              <textarea
                rows={3}
                value={formData.specialEquipment}
                onChange={(e) => setFormData({ ...formData, specialEquipment: e.target.value })}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Describe any special electrical equipment you'll be using (e.g., tyre curing press, extruder, etc.)"
              />
            </div>

            <button
              type="submit"
              disabled={submitting}
              className="w-full py-3 bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-cyan-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Electrical Requirement'}
            </button>
          </form>
        </div>

        {/* Summary Card */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl p-6 text-white sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <CalculatorIcon className="h-5 w-5" />
              <h3 className="font-semibold">Cost Estimate</h3>
            </div>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span>Temporary Load:</span>
                <span>₹{((parseFloat(formData.temporaryLoad) || 0) * tempRate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Exhibition Load:</span>
                <span>₹{((parseFloat(formData.exhibitionLoad) || 0) * exhRate).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Sockets:</span>
                <span>₹{((formData.sockets || 0) * 1500).toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Lighting:</span>
                <span>₹{((formData.lightingPoints || 0) * 800).toLocaleString()}</span>
              </div>
              <div className="border-t border-white/20 pt-3 mt-2">
                <div className="flex justify-between font-bold">
                  <span>Total Estimate:</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
                <p className="text-xs text-white/70 mt-2">* GST 18% extra as applicable</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}