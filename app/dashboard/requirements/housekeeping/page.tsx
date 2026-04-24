'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { HomeModernIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Requirement Submitted!</h2>
        <p className="text-gray-600 mb-6">Your housekeeping requirement has been submitted successfully.</p>
        <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Back to Requirements
        </button>
      </div>
    </div>
  );
}

export default function HousekeepingPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ staff: 1, shifts: 1, days: 3, specialRequest: '' });
  const [submitted, setSubmitted] = useState(false);
  const costPerStaff = 2000;
  const total = formData.staff * formData.shifts * formData.days * costPerStaff;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleBack = () => {
    router.push('/dashboard/requirements');
  };

  if (submitted) return <SuccessPage onBack={handleBack} />;

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

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Staff *</label>
          <input
            type="number"
            min="1"
            value={formData.staff}
            onChange={(e) => setFormData({ ...formData, staff: parseInt(e.target.value) })}
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
            <option value="1">1 Shift (8 hours)</option>
            <option value="2">2 Shifts (16 hours)</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
          <input
            type="number"
            min="1"
            max="5"
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Special Requests</label>
          <textarea
            rows={3}
            value={formData.specialRequest}
            onChange={(e) => setFormData({ ...formData, specialRequest: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500"
            placeholder="Any specific cleaning requirements..."
          />
        </div>

        <div className="bg-indigo-50 p-4 rounded-xl">
          <div className="flex justify-between font-semibold">
            <span>Estimated Cost:</span>
            <span>₹{total.toLocaleString()}</span>
          </div>
          <p className="text-xs text-gray-500 mt-1">@ ₹{costPerStaff.toLocaleString()} per staff per shift</p>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-indigo-500 to-blue-500 text-white font-semibold rounded-xl hover:from-indigo-600 hover:to-blue-600 transition"
        >
          Submit Requirement
        </button>
      </form>
    </div>
  );
}