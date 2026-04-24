'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { SparklesIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Requirement Submitted!</h2>
        <p className="text-gray-600 mb-6">Your hostess service requirement has been submitted successfully.</p>
        <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Back to Requirements
        </button>
      </div>
    </div>
  );
}

export default function HostessServicesPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ categoryA: 0, categoryB: 0, days: 3 });
  const [submitted, setSubmitted] = useState(false);
  const costA = 5000, costB = 4000;
  const total = (formData.categoryA * costA + formData.categoryB * costB) * formData.days;

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
        <div className="h-12 w-12 bg-pink-100 rounded-xl flex items-center justify-center">
          <SparklesIcon className="h-6 w-6 text-pink-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Hostess Services</h1>
          <p className="text-gray-500 text-sm">Professional hostesses for your booth</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-sm border p-6 space-y-5">
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
          <p className="text-xs text-gray-400 mt-1">@ ₹{costA.toLocaleString()}/day - English/Hindi speaking</p>
        </div>

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
          <p className="text-xs text-gray-400 mt-1">@ ₹{costB.toLocaleString()}/day - English + Regional language</p>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Number of Days</label>
          <input
            type="number"
            min="1"
            max="3"
            value={formData.days}
            onChange={(e) => setFormData({ ...formData, days: parseInt(e.target.value) || 1 })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-pink-500"
          />
        </div>

        {(formData.categoryA > 0 || formData.categoryB > 0) && (
          <div className="bg-pink-50 p-4 rounded-xl">
            <div className="flex justify-between font-semibold">
              <span>Estimated Cost:</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1">* GST 18% extra as applicable</p>
          </div>
        )}

        <button
          type="submit"
          disabled={formData.categoryA === 0 && formData.categoryB === 0}
          className="w-full py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          Submit Requirement
        </button>
      </form>
    </div>
  );
}