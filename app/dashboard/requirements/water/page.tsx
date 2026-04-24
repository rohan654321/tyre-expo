'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { TruckIcon, ArrowLeftIcon, CheckCircleIcon } from '@heroicons/react/24/outline';

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Requirement Submitted!</h2>
        <p className="text-gray-600 mb-6">Your water connection requirement has been submitted successfully.</p>
        <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Back to Requirements
        </button>
      </div>
    </div>
  );
}

export default function WaterConnectionPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({ connections: 1, purpose: '', drainage: false });
  const [submitted, setSubmitted] = useState(false);

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
        <div className="h-12 w-12 bg-teal-100 rounded-xl flex items-center justify-center">
          <TruckIcon className="h-6 w-6 text-teal-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Water Connection</h1>
          <p className="text-gray-500 text-sm">Water supply for your booth</p>
        </div>
      </div>

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
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose of Water Connection *</label>
          <textarea
            rows={3}
            value={formData.purpose}
            onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-teal-500"
            placeholder="e.g., Demo equipment, cleaning, etc."
            required
          />
        </div>

        <div className="flex items-center gap-3">
          <input
            type="checkbox"
            checked={formData.drainage}
            onChange={(e) => setFormData({ ...formData, drainage: e.target.checked })}
            className="w-4 h-4 rounded border-gray-300 text-teal-600 focus:ring-teal-500"
          />
          <label className="text-sm text-gray-700">Drainage facility required</label>
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-teal-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-teal-600 hover:to-emerald-600 transition"
        >
          Submit Requirement
        </button>
      </form>
    </div>
  );
}