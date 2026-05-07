'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  UserGroupIcon,
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
  IdentificationIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import { extraRequirementsAPI } from '@/lib/api/exhibitorClient';

interface Personnel {
  id: number;
  name: string;
  designation: string;
  organisation: string;
  phone: string;
  email: string;
}

export default function PersonnelRequirementsPage() {
  const router = useRouter();
  const [personnel, setPersonnel] = useState<Personnel[]>([
    { id: 1, name: '', designation: '', organisation: '', phone: '', email: '' }
  ]);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Load saved personnel from localStorage if any
  useEffect(() => {
    const saved = localStorage.getItem('exhibitorPersonnel');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.length > 0) {
          setPersonnel(parsed);
        }
      } catch (e) {
        console.error('Error loading saved personnel:', e);
      }
    }
  }, []);

  const handleAddPerson = () => {
    setPersonnel([...personnel, { id: Date.now(), name: '', designation: '', organisation: '', phone: '', email: '' }]);
  };

  const handleRemovePerson = (id: number) => {
    if (personnel.length === 1) {
      alert('At least one person is required');
      return;
    }
    setPersonnel(personnel.filter(p => p.id !== id));
  };

  const handlePersonChange = (id: number, field: keyof Personnel, value: string) => {
    setPersonnel(personnel.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate at least one person has name
    const hasValidPerson = personnel.some(p => p.name.trim());
    if (!hasValidPerson) {
      alert('Please enter at least one person\'s name');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
      const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');

      // Save to localStorage
      localStorage.setItem('exhibitorPersonnel', JSON.stringify(personnel));

      // Submit as a requirement
      const response = await extraRequirementsAPI.submit({
        generalInfo,
        boothDetails,
        eventName: 'Tyre Expo 2024',
        notes: `Exhibitor Passes Requested: ${personnel.filter(p => p.name).length} persons\n\nPersonnel Details:\n${personnel.filter(p => p.name).map(p => `- ${p.name} (${p.designation || 'N/A'}) - ${p.email || 'No email'}`).join('\n')}`
      });

      if (response.success) {
        setSubmitted(true);
        setTimeout(() => {
          router.push('/dashboard/requirements');
        }, 2000);
      } else {
        setError(response.error || 'Failed to submit request');
      }
    } catch (err: any) {
      console.error('Error submitting:', err);
      setError(err.response?.data?.error || err.message || 'Failed to submit');
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Pass Request Submitted!</h2>
          <p className="text-gray-600 mb-6">Your exhibitor pass request has been submitted successfully.</p>
          <button onClick={() => router.push('/dashboard/requirements')} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
            Back to Requirements
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center">
          <UserGroupIcon className="h-6 w-6 text-green-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Exhibitor Passes</h1>
          <p className="text-gray-500 text-sm">Request passes for your exhibition staff</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {personnel.map((person, index) => (
          <div key={person.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center gap-2">
                <IdentificationIcon className="h-5 w-5 text-gray-400" />
                <h3 className="font-semibold text-gray-800">Person {index + 1}</h3>
              </div>
              {personnel.length > 1 && (
                <button type="button" onClick={() => handleRemovePerson(person.id)} className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition">
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={person.name}
                  onChange={(e) => handlePersonChange(person.id, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={person.designation}
                  onChange={(e) => handlePersonChange(person.id, 'designation', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="e.g., Manager"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Organisation</label>
                <input
                  type="text"
                  value={person.organisation}
                  onChange={(e) => handlePersonChange(person.id, 'organisation', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Company name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <input
                  type="tel"
                  value={person.phone}
                  onChange={(e) => handlePersonChange(person.id, 'phone', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Mobile number"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                <input
                  type="email"
                  value={person.email}
                  onChange={(e) => handlePersonChange(person.id, 'email', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500"
                  placeholder="Email address"
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddPerson}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-green-400 hover:text-green-600 transition"
        >
          <PlusIcon className="h-5 w-5 inline mr-2" />
          Add another person
        </button>

        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <p className="text-sm text-blue-700">
            <strong>Note:</strong> Each exhibitor gets 5 complimentary passes. Additional passes can be purchased separately.
          </p>
        </div>

        <button
          type="submit"
          disabled={submitting}
          className="w-full py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-xl hover:from-green-600 hover:to-emerald-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {submitting ? 'Submitting...' : 'Submit Pass Request'}
        </button>
      </form>
    </div>
  );
}