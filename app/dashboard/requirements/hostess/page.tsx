'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { SparklesIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { hostessAPI, extraRequirementsAPI, HostessCategory } from '@/lib/api/exhibitorClient';
import toast from 'react-hot-toast';

// Default fallback categories if API fails
const DEFAULT_CATEGORIES: HostessCategory[] = [
  {
    id: '1',
    type: 'A',
    name: 'Professional',
    description: 'English/Hindi speaking hostesses with event experience',
    ratePerDay: 5000,
    languages: ['English', 'Hindi'],
    isActive: true
  },
  {
    id: '2',
    type: 'B',
    name: 'Bilingual',
    description: 'English + Regional language speaking hostesses',
    ratePerDay: 4000,
    languages: ['English', 'Tamil', 'Telugu', 'Kannada', 'Malayalam', 'Marathi', 'Gujarati', 'Bengali'],
    isActive: true
  }
];

export default function HostessServicesPage() {
  const router = useRouter();
  const [categories, setCategories] = useState<HostessCategory[]>([]);
  const [formData, setFormData] = useState({ categoryA: 0, categoryB: 0, days: 3, specialRequests: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  // Fetch hostess categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await hostessAPI.getAll();

        if (response.success && response.data && response.data.length > 0) {
          setCategories(response.data);
          setUsingFallback(false);
        } else {
          // Use fallback categories
          console.warn('No categories from API, using fallback');
          setCategories(DEFAULT_CATEGORIES);
          setUsingFallback(true);
          toast.error('Could not load hostess packages. Showing default options.');
        }
      } catch (err: any) {
        console.error('Error fetching categories:', err);
        // Use fallback categories on error
        setCategories(DEFAULT_CATEGORIES);
        setUsingFallback(true);
        setError('Could not load hostess rates from server. Using default values.');
        toast.error('Failed to load hostess packages. Using default options.');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  const getRateForCategory = (type: 'A' | 'B'): number => {
    const category = categories.find(c => c.type === type);
    return category?.ratePerDay || (type === 'A' ? 5000 : 4000);
  };

  const getLanguagesForCategory = (type: 'A' | 'B'): string[] => {
    const category = categories.find(c => c.type === type);
    // Safely return languages array or default
    return category?.languages && Array.isArray(category.languages) ? category.languages : ['English'];
  };

  const calculateTotal = () => {
    const costA = formData.categoryA * getRateForCategory('A') * formData.days;
    const costB = formData.categoryB * getRateForCategory('B') * formData.days;
    return costA + costB;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.categoryA === 0 && formData.categoryB === 0) {
      alert('Please select at least one hostess');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
      const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');

      const hostessRequirements = [];

      if (formData.categoryA > 0) {
        const rate = getRateForCategory('A');
        const languages = getLanguagesForCategory('A');
        hostessRequirements.push({
          category: 'A',
          quantity: formData.categoryA,
          noOfDays: formData.days,
          ratePerDay: rate,
          amount: formData.categoryA * rate * formData.days,
          languages: languages
        });
      }

      if (formData.categoryB > 0) {
        const rate = getRateForCategory('B');
        const languages = getLanguagesForCategory('B');
        hostessRequirements.push({
          category: 'B',
          quantity: formData.categoryB,
          noOfDays: formData.days,
          ratePerDay: rate,
          amount: formData.categoryB * rate * formData.days,
          languages: languages
        });
      }

      const response = await extraRequirementsAPI.submit({
        generalInfo,
        boothDetails,
        eventName: 'Tyre Expo 2024',
        hostessRequirements,
        notes: formData.specialRequests || 'No special requests'
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading hostess packages...</p>
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
          <p className="text-gray-600 mb-6">Your hostess service requirement has been submitted successfully.</p>
          <button onClick={handleBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
            Back to Requirements
          </button>
        </div>
      </div>
    );
  }

  // Get category A and B data safely
  const categoryA = categories.find(c => c.type === 'A');
  const categoryB = categories.find(c => c.type === 'B');
  const languagesA = categoryA?.languages || ['English', 'Hindi'];
  const languagesB = categoryB?.languages || ['English', 'Regional languages'];

  return (
    <div className="max-w-3xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center">
          <SparklesIcon className="h-6 w-6 text-pink-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hostess Services</h1>
          <p className="text-gray-500 text-sm">Professional hostesses for your booth</p>
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
          <span>Using default hostess packages. Live rates could not be loaded.</span>
        </div>
      )}

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
        {/* Category A Hostesses */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category A Hostesses (Professional)
          </label>
          <input
            type="number"
            min="0"
            value={formData.categoryA}
            onChange={(e) => setFormData({ ...formData, categoryA: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            @ ₹{getRateForCategory('A').toLocaleString()}/day
          </p>
          <p className="text-xs text-gray-400">
            Languages: {Array.isArray(languagesA) ? languagesA.join(', ') : 'English, Hindi'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {categoryA?.description || 'Professional hostesses for customer engagement and booth management'}
          </p>
        </div>

        {/* Category B Hostesses */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Category B Hostesses (Bilingual)
          </label>
          <input
            type="number"
            min="0"
            value={formData.categoryB}
            onChange={(e) => setFormData({ ...formData, categoryB: parseInt(e.target.value) || 0 })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
          />
          <p className="text-xs text-gray-400 mt-1">
            @ ₹{getRateForCategory('B').toLocaleString()}/day
          </p>
          <p className="text-xs text-gray-400">
            Languages: {Array.isArray(languagesB) ? languagesB.join(', ') : 'English + Regional languages'}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            {categoryB?.description || 'Bilingual hostesses fluent in English and regional languages'}
          </p>
        </div>

        {/* Number of Days */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
          <select
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
          >
            <option value={1}>1 Day</option>
            <option value={2}>2 Days</option>
            <option value={3}>3 Days</option>
            <option value={4}>4 Days</option>
            <option value={5}>5 Days</option>
          </select>
        </div>

        {/* Special Requests */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
          <textarea
            rows={3}
            value={formData.specialRequests}
            onChange={(e) => setFormData({ ...formData, specialRequests: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
            placeholder="Any specific requirements for hostesses (language preferences, uniform, skills, etc.)"
          />
        </div>

        {/* Cost Summary */}
        {(formData.categoryA > 0 || formData.categoryB > 0) && (
          <div className="bg-pink-50 p-4 rounded-xl">
            <div className="space-y-2">
              {formData.categoryA > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Category A ({formData.categoryA} × {formData.days} days):</span>
                  <span>₹{(formData.categoryA * getRateForCategory('A') * formData.days).toLocaleString()}</span>
                </div>
              )}
              {formData.categoryB > 0 && (
                <div className="flex justify-between text-sm">
                  <span>Category B ({formData.categoryB} × {formData.days} days):</span>
                  <span>₹{(formData.categoryB * getRateForCategory('B') * formData.days).toLocaleString()}</span>
                </div>
              )}
              <div className="border-t border-pink-200 pt-2 mt-2">
                <div className="flex justify-between font-semibold">
                  <span>Total Estimate:</span>
                  <span>₹{calculateTotal().toLocaleString()}</span>
                </div>
              </div>
            </div>
            <p className="text-xs text-gray-500 mt-2">* GST 18% extra as applicable</p>
          </div>
        )}

        <button
          type="submit"
          disabled={submitting || (formData.categoryA === 0 && formData.categoryB === 0)}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Requirement'}
        </button>
      </form>
    </div>
  );
}