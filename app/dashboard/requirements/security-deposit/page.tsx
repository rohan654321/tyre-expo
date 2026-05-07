'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BanknotesIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { securityDepositAPI, extraRequirementsAPI, SecurityDepositTier } from '@/lib/api/exhibitorClient';

export default function SecurityDepositPage() {
  const router = useRouter();
  const [tiers, setTiers] = useState<SecurityDepositTier[]>([]);
  const [selectedTier, setSelectedTier] = useState<SecurityDepositTier | null>(null);
  const [boothArea, setBoothArea] = useState<number>(0);
  const [formData, setFormData] = useState({
    ddNo: '',
    bankName: '',
    branch: '',
    dated: '',
    amountWords: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch security deposit tiers
  useEffect(() => {
    const fetchTiers = async () => {
      try {
        setLoading(true);
        const response = await securityDepositAPI.getActive();
        if (response.success) {
          setTiers(response.data);

          // Try to get booth area from localStorage
          const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');
          const area = parseFloat(boothDetails.sqMtrBooked) || 0;
          setBoothArea(area);

          // Auto-select tier based on booth area
          if (area > 0) {
            const matchingTier = response.data.find(tier =>
              area >= tier.minSqMtr && area <= tier.maxSqMtr
            );
            if (matchingTier) {
              setSelectedTier(matchingTier);
              setFormData(prev => ({
                ...prev,
                amountWords: numberToWords(matchingTier.amountINR)
              }));
            }
          }
        } else {
          setError('Failed to load security deposit tiers');
        }
      } catch (err: any) {
        console.error('Error fetching tiers:', err);
        setError(err.message || 'Failed to load tiers');
      } finally {
        setLoading(false);
      }
    };

    fetchTiers();
  }, []);

  // Helper function to convert number to words (simplified version)
  const numberToWords = (num: number): string => {
    if (num === 25000) return 'Twenty Five Thousand Only';
    if (num === 50000) return 'Fifty Thousand Only';
    if (num === 100000) return 'One Lakh Only';
    return '';
  };

  const handleTierSelect = (tier: SecurityDepositTier) => {
    setSelectedTier(tier);
    setFormData(prev => ({
      ...prev,
      amountWords: numberToWords(tier.amountINR)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedTier) {
      alert('Please select a security deposit tier');
      return;
    }

    if (!formData.ddNo || !formData.bankName || !formData.branch || !formData.dated) {
      alert('Please fill all demand draft details');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
      const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');

      const response = await extraRequirementsAPI.submit({
        generalInfo,
        boothDetails,
        eventName: 'Tyre Expo 2024',
        securityDeposit: {
          boothSq: boothArea || selectedTier.minSqMtr,
          amountINR: selectedTier.amountINR,
          ddNo: formData.ddNo,
          bankName: formData.bankName,
          branch: formData.branch,
          dated: formData.dated,
          amountWords: formData.amountWords
        },
        notes: `Security Deposit for booth area ${boothArea || selectedTier.category} sq.m`
      });

      if (response.success) {
        setSubmitted(true);
      } else {
        setError(response.error || 'Failed to submit security deposit');
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
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading security deposit tiers...</p>
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
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Security Deposit Submitted!</h2>
          <p className="text-gray-600 mb-6">Your security deposit information has been submitted successfully.</p>
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
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <BanknotesIcon className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Contractor Security Deposit</h1>
          <p className="text-gray-500 text-sm">FOR BARE SPACE EXHIBITORS - FORM 2</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {boothArea > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
          Your booth area: {boothArea} sq.m
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Deposit Tiers */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Security Deposit Amount</h2>
            <div className="space-y-3">
              {tiers.map((tier) => (
                <label
                  key={tier.id}
                  className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${selectedTier?.id === tier.id
                      ? 'border-emerald-500 bg-emerald-50'
                      : 'border-gray-200 hover:border-emerald-300'
                    }`}
                >
                  <div className="flex items-center gap-4">
                    <input
                      type="radio"
                      name="depositTier"
                      checked={selectedTier?.id === tier.id}
                      onChange={() => handleTierSelect(tier)}
                      className="w-4 h-4 text-emerald-600"
                    />
                    <div>
                      <p className="font-medium text-gray-800">
                        Booth Area: {tier.category} sq.m
                      </p>
                      <p className="text-sm text-gray-500">
                        {tier.minSqMtr} - {tier.maxSqMtr > 999 ? 'Above' : tier.maxSqMtr} sq.m
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-bold text-emerald-600">₹{tier.amountINR.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">USD {tier.amountUSD}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* DD Details */}
          {selectedTier && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Demand Draft Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">DD / Cheque Number *</label>
                  <input
                    type="text"
                    value={formData.ddNo}
                    onChange={(e) => setFormData({ ...formData, ddNo: e.target.value })}
                    className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                    placeholder="Enter DD number"
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bank Name *</label>
                    <input
                      type="text"
                      value={formData.bankName}
                      onChange={(e) => setFormData({ ...formData, bankName: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      placeholder="Bank name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Branch *</label>
                    <input
                      type="text"
                      value={formData.branch}
                      onChange={(e) => setFormData({ ...formData, branch: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      placeholder="Branch name"
                      required
                    />
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date *</label>
                    <input
                      type="date"
                      value={formData.dated}
                      onChange={(e) => setFormData({ ...formData, dated: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Amount in Words</label>
                    <input
                      type="text"
                      value={formData.amountWords}
                      onChange={(e) => setFormData({ ...formData, amountWords: e.target.value })}
                      className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-emerald-500"
                      placeholder="e.g., Twenty Five Thousand Only"
                      readOnly
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Important Notes */}
        <div className="space-y-6">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white">
            <h3 className="font-bold text-lg mb-3">Selected Amount</h3>
            {selectedTier ? (
              <div>
                <p className="text-3xl font-bold">₹{selectedTier.amountINR.toLocaleString()}</p>
                <p className="text-sm text-white/80 mt-1">USD {selectedTier.amountUSD}</p>
                <div className="mt-4 pt-4 border-t border-white/20">
                  <p className="text-sm font-semibold">Payable to:</p>
                  <p className="text-sm">Maxx Business Media Pvt. Ltd.</p>
                </div>
              </div>
            ) : (
              <p className="text-sm">Select a deposit tier to see amount</p>
            )}
          </div>

          <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
            <h3 className="font-semibold text-amber-800 mb-2">⚠️ Important Notes</h3>
            <ul className="text-sm text-amber-700 space-y-2">
              <li>• Security Deposit should be submitted only by Demand Draft</li>
              <li>• Payable to "Maxx Business Media Pvt. Ltd."</li>
              <li>• Without deposit, booth possession will not be given</li>
              <li>• Bring 2 copies of this form at time of possession</li>
            </ul>
          </div>

          <button
            onClick={handleSubmit}
            disabled={submitting || !selectedTier}
            className="w-full py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Submitting...' : 'Submit Security Deposit'}
          </button>
        </div>
      </div>
    </div>
  );
}