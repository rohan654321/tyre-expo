'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { HomeModernIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { housekeepingAPI, extraRequirementsAPI } from '@/lib/api/exhibitorClient';
import { toast } from 'react-hot-toast';

interface HousekeepingConfig {
  costPerStaffPerShift: number;
  shiftsPerDay: number;
  shiftHours: number;
}

// Default fallback config
const DEFAULT_CONFIG: HousekeepingConfig = {
  costPerStaffPerShift: 2000,
  shiftsPerDay: 2,
  shiftHours: 8
};

export default function HousekeepingPage() {
  const router = useRouter();
  const [config, setConfig] = useState<HousekeepingConfig | null>(null);
  const [formData, setFormData] = useState({ staff: 1, shifts: 1, days: 3, specialRequest: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch housekeeping config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await housekeepingAPI.getConfig();

        if (response.success && response.data) {
          setConfig({
            costPerStaffPerShift: response.data.costPerStaffPerShift || 2000,
            shiftsPerDay: response.data.shiftsPerDay || 2,
            shiftHours: response.data.shiftHours || 8
          });
          setUsingFallback(false);
        } else {
          // Use fallback config
          console.warn('No config from API, using fallback');
          setConfig(DEFAULT_CONFIG);
          setUsingFallback(true);
          toast.error('Could not load housekeeping rates. Using default values.');
        }
      } catch (err: any) {
        console.error('Error fetching config:', err);
        // Use fallback config on error
        setConfig(DEFAULT_CONFIG);
        setUsingFallback(true);
        setError('Could not load housekeeping rates from server. Using default values.');
        toast.error('Failed to load housekeeping rates. Using default values.');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const calculateTotal = () => {
    if (!config) return 0;
    const costPerShift = config.costPerStaffPerShift || 2000;
    return formData.staff * formData.shifts * formData.days * costPerShift;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.staff < 1) {
      alert('Please select at least 1 staff member');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
      const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');

      const totalCost = calculateTotal();
      const costPerShift = config?.costPerStaffPerShift || 2000;

      const response = await extraRequirementsAPI.submit({
        generalInfo,
        boothDetails,
        eventName: 'Tyre Expo 2024',
        housekeepingStaff: {
          quantity: formData.staff,
          noOfDays: formData.days,
          chargesPerShift: costPerShift,
          totalCost: totalCost
        },
        notes: `Shifts per day: ${formData.shifts}. ${formData.specialRequest || 'No special requests'}`
      });

      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          router.push('/dashboard/requirements');
        }, 2000);
      } else {
        setError(response.error || 'Failed to submit requirement');
        toast.error(response.error || 'Failed to submit');
      }
    } catch (err: any) {
      console.error('Error submitting:', err);
      const errorMsg = err.response?.data?.error || err.message || 'Failed to submit';
      setError(errorMsg);
      toast.error(errorMsg);
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.push('/dashboard/requirements');
  };

  if (loading) {
    return (
      <div className="max-w-3xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading housekeeping rates...</p>
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
          <p className="text-gray-600 mb-6">Your housekeeping requirement has been submitted successfully.</p>
          <button onClick={handleBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
            Back to Requirements
          </button>
        </div>
      </div>
    );
  }

  // Safe access to config values with defaults
  const costPerStaffPerShift = config?.costPerStaffPerShift ?? 2000;
  const shiftHours = config?.shiftHours ?? 8;
  const shiftsPerDay = config?.shiftsPerDay ?? 2;
  const totalCost = calculateTotal();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-indigo-100 rounded-xl flex items-center justify-center">
          <HomeModernIcon className="h-6 w-6 text-indigo-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Housekeeping Staff</h1>
          <p className="text-gray-500 text-sm">Cleaning and maintenance staff for your booth</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {usingFallback && (
        <div className="mb-4 p-3 bg-yellow-50 border border-yellow-200 rounded-lg text-yellow-700 text-sm flex items-start gap-2">
          <ExclamationTriangleIcon className="h-4 w-4 flex-shrink-0 mt-0.5" />
          <span>Using default housekeeping rates. Live rates could not be loaded.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Staff *</label>
          <input
            type="number"
            min="1"
            value={formData.staff}
            onChange={(e) => setFormData({ ...formData, staff: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shifts per Day</label>
          <select
            value={formData.shifts}
            onChange={(e) => setFormData({ ...formData, shifts: parseInt(e.target.value) })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value="1">1 Shift ({shiftHours} hours)</option>
            <option value="2">2 Shifts ({shiftHours * 2} hours)</option>
          </select>
          <p className="text-xs text-gray-400 mt-1">
            @ ₹{costPerStaffPerShift.toLocaleString()} per staff per shift
          </p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
          <select
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          >
            <option value={1}>1 Day</option>
            <option value={2}>2 Days</option>
            <option value={3}>3 Days</option>
            <option value={4}>4 Days</option>
            <option value={5}>5 Days</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
          <textarea
            rows={3}
            value={formData.specialRequest}
            onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Any specific cleaning requirements, schedules, or special instructions..."
          />
        </div>

        <div className="bg-indigo-50 p-4 rounded-xl">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Staff Rate:</span>
              <span>₹{costPerStaffPerShift.toLocaleString()} per shift</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Calculation:</span>
              <span>{formData.staff} staff × {formData.shifts} shifts × {formData.days} days</span>
            </div>
            <div className="border-t border-indigo-200 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Estimated Cost:</span>
                <span>₹{totalCost.toLocaleString()}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">* GST 18% extra as applicable</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-blue-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Requirement'}
        </button>
      </form>
    </div>
  );
}