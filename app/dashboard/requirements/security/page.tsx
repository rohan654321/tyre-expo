'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ShieldCheckIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { securityGuardAPI, extraRequirementsAPI } from '@/lib/api/exhibitorClient';
import { toast } from 'react-hot-toast';

interface SecurityGuardConfig {
  costPerGuardPerDay: number;
  shifts: {
    day: { start: string; end: string; multiplier: number };
    night: { start: string; end: string; multiplier: number };
    '24': { multiplier: number };
  };
}

// Default fallback config
const DEFAULT_CONFIG: SecurityGuardConfig = {
  costPerGuardPerDay: 2500,
  shifts: {
    day: { start: '09:00', end: '18:00', multiplier: 1 },
    night: { start: '18:00', end: '09:00', multiplier: 1.5 },
    '24': { multiplier: 2 }
  }
};

export default function SecurityGuardsPage() {
  const router = useRouter();
  const [config, setConfig] = useState<SecurityGuardConfig | null>(null);
  const [formData, setFormData] = useState({ quantity: 1, days: 3, shift: 'day', specialInstructions: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch security guard config
  useEffect(() => {
    const fetchConfig = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await securityGuardAPI.getConfig();

        if (response.success && response.data) {
          // Ensure shifts object exists
          const data = response.data;
          const safeConfig: SecurityGuardConfig = {
            costPerGuardPerDay: data.costPerGuardPerDay || 2500,
            shifts: {
              day: data.shifts?.day || { start: '09:00', end: '18:00', multiplier: 1 },
              night: data.shifts?.night || { start: '18:00', end: '09:00', multiplier: 1.5 },
              '24': data.shifts?.['24'] || { multiplier: 2 }
            }
          };
          setConfig(safeConfig);
          setUsingFallback(false);
        } else {
          // Use fallback config
          console.warn('No config from API, using fallback');
          setConfig(DEFAULT_CONFIG);
          setUsingFallback(true);
          toast.error('Could not load security guard rates. Using default values.');
        }
      } catch (err: any) {
        console.error('Error fetching config:', err);
        // Use fallback config on error
        setConfig(DEFAULT_CONFIG);
        setUsingFallback(true);
        setError('Could not load security guard rates from server. Using default values.');
        toast.error('Failed to load security rates. Using default values.');
      } finally {
        setLoading(false);
      }
    };

    fetchConfig();
  }, []);

  const getShiftMultiplier = (): number => {
    if (!config) return 1;
    const shiftConfig = config.shifts?.[formData.shift as keyof typeof config.shifts];
    return shiftConfig?.multiplier || 1;
  };

  const getShiftDescription = (): string => {
    const shift = formData.shift;
    if (shift === 'day' && config?.shifts?.day) {
      return `${config.shifts.day.start} - ${config.shifts.day.end}`;
    }
    if (shift === 'night' && config?.shifts?.night) {
      return `${config.shifts.night.start} - ${config.shifts.night.end}`;
    }
    if (shift === '24') {
      return '24 Hours';
    }
    return 'Standard Shift';
  };

  const calculateTotal = () => {
    if (!config) return 0;
    const multiplier = getShiftMultiplier();
    const baseCost = config.costPerGuardPerDay || 2500;
    return formData.quantity * formData.days * baseCost * multiplier;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.quantity < 1) {
      alert('Please select at least 1 security guard');
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
        securityGuard: {
          quantity: formData.quantity,
          noOfDays: formData.days,
          totalCost: totalCost
        },
        notes: `Shift: ${formData.shift} (${getShiftDescription()}). ${formData.specialInstructions || 'No special instructions'}`
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading security guard rates...</p>
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
          <p className="text-gray-600 mb-6">Your security guard requirement has been submitted successfully.</p>
          <button onClick={handleBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
            Back to Requirements
          </button>
        </div>
      </div>
    );
  }

  const baseRate = config?.costPerGuardPerDay || 2500;
  const multiplier = getShiftMultiplier();

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
          <ShieldCheckIcon className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Guards</h1>
          <p className="text-gray-500 text-sm">Security personnel for your booth</p>
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
          <span>Using default security rates. Live rates could not be loaded.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Guards *</label>
          <input
            type="number"
            min="1"
            value={formData.quantity}
            onChange={(e) => setFormData({ ...formData, quantity: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days *</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Shift Preference</label>
          <select
            value={formData.shift}
            onChange={(e) => setFormData({ ...formData, shift: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
          >
            <option value="day">Day Shift ({config?.shifts?.day ? `${config.shifts.day.start} - ${config.shifts.day.end}` : '9 AM - 6 PM'})</option>
            <option value="night">Night Shift ({config?.shifts?.night ? `${config.shifts.night.start} - ${config.shifts.night.end}` : '6 PM - 9 AM'})</option>
            <option value="24">24 Hours (Two shifts)</option>
          </select>
          {multiplier > 1 && (
            <p className="text-xs text-amber-600 mt-1">
              +{Math.round((multiplier - 1) * 100)}% additional for {formData.shift} shift
            </p>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Instructions</label>
          <textarea
            rows={3}
            value={formData.specialInstructions}
            onChange={(e) => setFormData({ ...formData, specialInstructions: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
            placeholder="Any additional security requirements or specific instructions..."
          />
        </div>

        <div className="bg-amber-50 p-4 rounded-xl">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Base Rate:</span>
              <span>₹{baseRate.toLocaleString()} per guard/day</span>
            </div>
            <div className="flex justify-between text-sm">
              <span>Shift:</span>
              <span>{formData.shift === 'day' ? 'Day Shift' : formData.shift === 'night' ? 'Night Shift' : '24 Hours'}</span>
            </div>
            {multiplier > 1 && (
              <div className="flex justify-between text-sm">
                <span>Shift Multiplier:</span>
                <span>{multiplier}x</span>
              </div>
            )}
            <div className="flex justify-between text-sm">
              <span>Calculation:</span>
              <span>{formData.quantity} × {formData.days} days × {multiplier}x</span>
            </div>
            <div className="border-t border-amber-200 pt-2 mt-2">
              <div className="flex justify-between font-semibold">
                <span>Estimated Cost:</span>
                <span>₹{calculateTotal().toLocaleString()}</span>
              </div>
            </div>
          </div>
          <p className="text-xs text-gray-500 mt-2">* GST 18% extra as applicable</p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Requirement'}
        </button>
      </form>
    </div>
  );
}