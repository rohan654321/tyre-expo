'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { BanknotesIcon, ArrowLeftIcon, CheckCircleIcon, ExclamationTriangleIcon, CreditCardIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { securityDepositAPI, extraRequirementsAPI, SecurityDepositTier } from '@/lib/api/exhibitorClient';
import toast from 'react-hot-toast';

export default function SecurityDepositPage() {
  const router = useRouter();
  const [tiers, setTiers] = useState<SecurityDepositTier[]>([]);
  const [selectedTier, setSelectedTier] = useState<SecurityDepositTier | null>(null);
  const [boothArea, setBoothArea] = useState<number>(0);
  const [isPaid, setIsPaid] = useState(false);
  const [paymentReference, setPaymentReference] = useState('');
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

        if (response.success && response.data) {
          setTiers(response.data);

          // Try to get booth area from localStorage
          const savedGeneralInfo = localStorage.getItem('exhibitorGeneralInfo');
          const savedBoothDetails = localStorage.getItem('exhibitorBoothDetails');

          let area = 0;

          if (savedBoothDetails) {
            const boothDetails = JSON.parse(savedBoothDetails);
            area = parseFloat(boothDetails.sqMtrBooked) || 0;
          }

          // Also check if there's saved security deposit data
          const savedDeposit = localStorage.getItem('securityDeposit');
          if (savedDeposit) {
            const depositData = JSON.parse(savedDeposit);
            if (depositData.selectedTierId) {
              const savedTier = response.data.find(t => t.id === depositData.selectedTierId);
              if (savedTier) {
                setSelectedTier(savedTier);
              }
            }
            if (depositData.isPaid !== undefined) {
              setIsPaid(depositData.isPaid);
            }
            if (depositData.paymentReference) {
              setPaymentReference(depositData.paymentReference);
            }
          }

          setBoothArea(area);

          // Auto-select tier based on booth area if not already selected
          if (area > 0 && !selectedTier) {
            const matchingTier = response.data.find(tier =>
              area >= tier.minSqMtr && area <= (tier.maxSqMtr > 999 ? 9999 : tier.maxSqMtr)
            );
            if (matchingTier) {
              setSelectedTier(matchingTier);
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

  const handleTierSelect = (tier: SecurityDepositTier) => {
    setSelectedTier(tier);
    // Clear previous payment status when tier changes
    setIsPaid(false);
    setPaymentReference('');
  };

  const handleMarkAsPaid = () => {
    setIsPaid(true);
    // Generate a mock payment reference if not set
    if (!paymentReference) {
      const mockRef = `DEP-${Date.now()}-${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
      setPaymentReference(mockRef);
    }
    toast.success('Security deposit marked as paid');
  };

  const handleMarkAsUnpaid = () => {
    setIsPaid(false);
    setPaymentReference('');
    toast.success('Security deposit marked as unpaid');  };

  const handleContinue = async () => {
    if (!selectedTier) {
      toast.error('Please select a security deposit tier');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      // Save security deposit data to localStorage
      const depositData = {
        selectedTierId: selectedTier.id,
        category: selectedTier.category,
        amountINR: selectedTier.amountINR,
        amountUSD: selectedTier.amountUSD,
        minSqMtr: selectedTier.minSqMtr,
        maxSqMtr: selectedTier.maxSqMtr,
        isPaid: isPaid,
        paymentReference: paymentReference,
        paidAt: isPaid ? new Date().toISOString() : null,
        boothArea: boothArea
      };

      localStorage.setItem('securityDeposit', JSON.stringify(depositData));

      toast.success('Security deposit saved!');

      // Navigate to preview page
      router.push('/dashboard/requirements/preview');

    } catch (err: any) {
      console.error('Error saving:', err);
      setError(err.message || 'Failed to save');
      toast.error('Failed to save security deposit');
    } finally {
      setSubmitting(false);
    }
  };

  const handleBack = () => {
    router.back();
  };

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading security deposit tiers...</p>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={handleBack} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-emerald-100 rounded-xl flex items-center justify-center">
          <BanknotesIcon className="h-6 w-6 text-emerald-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Security Deposit</h1>
          <p className="text-gray-500 text-sm">FOR BARE SPACE EXHIBITORS - Select deposit amount based on booth area</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      {boothArea > 0 && (
        <div className="mb-4 p-3 bg-blue-50 border border-blue-200 rounded-lg text-blue-700 text-sm">
          📍 Your booth area: <strong>{boothArea} sq.m</strong>
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Deposit Tiers Selection */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">Select Security Deposit Amount</h2>
            <p className="text-sm text-gray-500 mb-4">
              Security deposit amount is based on your booked booth area. Please select the appropriate tier.
            </p>
            <div className="space-y-3">
              {tiers.map((tier) => {
                const isMatching = boothArea >= tier.minSqMtr && boothArea <= (tier.maxSqMtr > 999 ? 9999 : tier.maxSqMtr);
                return (
                  <label
                    key={tier.id}
                    className={`flex items-center justify-between p-4 border rounded-xl cursor-pointer transition ${selectedTier?.id === tier.id
                        ? 'border-emerald-500 bg-emerald-50'
                        : isMatching && !selectedTier
                          ? 'border-emerald-300 bg-emerald-50/30 hover:border-emerald-400'
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
                          {isMatching && !selectedTier && (
                            <span className="ml-2 text-xs text-emerald-600 bg-emerald-100 px-2 py-0.5 rounded-full">
                              Recommended
                            </span>
                          )}
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
                );
              })}
            </div>
          </div>

          {/* Payment Status Section - Only show when tier is selected */}
          {selectedTier && (
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
              <h2 className="text-lg font-semibold text-gray-800 mb-4">Payment Status</h2>

              <div className="flex flex-col sm:flex-row gap-4 mb-4">
                <button
                  type="button"
                  onClick={handleMarkAsPaid}
                  className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${isPaid
                      ? 'bg-green-500 text-white cursor-default'
                      : 'bg-green-100 text-green-700 hover:bg-green-200'
                    }`}
                  disabled={isPaid}
                >
                  <CreditCardIcon className="h-5 w-5" />
                  {isPaid ? 'Marked as Paid ✓' : 'Mark as Paid'}
                </button>

                <button
                  type="button"
                  onClick={handleMarkAsUnpaid}
                  className={`flex-1 py-3 rounded-xl font-semibold transition flex items-center justify-center gap-2 ${!isPaid
                      ? 'bg-red-500 text-white cursor-default'
                      : 'bg-red-100 text-red-700 hover:bg-red-200'
                    }`}
                  disabled={!isPaid}
                >
                  <XCircleIcon className="h-5 w-5" />
                  {!isPaid ? 'Unpaid' : 'Mark as Unpaid'}
                </button>
              </div>

              {isPaid && (
                <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <CheckCircleIcon className="h-5 w-5 text-green-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-green-800">Payment Completed</p>
                      <p className="text-sm text-green-700">
                        Amount: ₹{selectedTier.amountINR.toLocaleString()}
                      </p>
                      <p className="text-xs text-green-600 mt-1">
                        Reference: {paymentReference}
                      </p>
                      <p className="text-xs text-green-600">
                        Paid on: {new Date().toLocaleDateString()}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {!isPaid && (
                <div className="mt-4 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
                  <div className="flex items-start gap-3">
                    <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <p className="font-medium text-yellow-800">Payment Pending</p>
                      <p className="text-sm text-yellow-700">
                        Amount to be paid: ₹{selectedTier.amountINR.toLocaleString()}
                      </p>
                      <p className="text-xs text-yellow-600 mt-1">
                        Please make the payment and mark as paid to complete your registration.
                      </p>
                    </div>
                  </div>
                </div>
              )}

              <div className="mt-4 text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <p className="font-medium mb-1">📌 Important Notes:</p>
                <ul className="text-xs space-y-1 list-disc list-inside">
                  <li>Security Deposit is refundable after the exhibition (terms apply)</li>
                  <li>Payable to "Maxx Business Media Pvt. Ltd."</li>
                  <li>Without deposit, booth possession will not be given</li>
                  <li>Online payment available via card/UPI/net banking</li>
                </ul>
              </div>
            </div>
          )}
        </div>

        {/* Sidebar - Info & Continue */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-emerald-500 to-teal-500 rounded-2xl p-6 text-white sticky top-24">
            <h3 className="font-bold text-lg mb-3">Selected Deposit</h3>

            {selectedTier ? (
              <div>
                <p className="text-3xl font-bold">₹{selectedTier.amountINR.toLocaleString()}</p>
                <p className="text-sm text-white/80 mt-1">USD {selectedTier.amountUSD}</p>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-sm">Booth Area: {selectedTier.category} sq.m</p>
                  <p className="text-xs text-white/70 mt-1">
                    {selectedTier.minSqMtr} - {selectedTier.maxSqMtr > 999 ? 'Above' : selectedTier.maxSqMtr} sq.m
                  </p>
                </div>
                <div className="mt-3 pt-3 border-t border-white/20">
                  <p className="text-sm font-semibold">Payment Status:</p>
                  <p className={`text-sm ${isPaid ? 'text-green-200' : 'text-yellow-200'}`}>
                    {isPaid ? '✓ Paid' : '⏳ Pending'}
                  </p>
                </div>
              </div>
            ) : (
              <p className="text-sm">Select a deposit tier to continue</p>
            )}
          </div>

          {/* Continue Button */}
          <button
            onClick={handleContinue}
            disabled={submitting || !selectedTier}
            className="w-full mt-4 py-3 bg-gradient-to-r from-emerald-500 to-teal-500 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-teal-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {submitting ? 'Saving...' : 'Continue to Preview'}
          </button>

          {/* Info Card */}
          <div className="mt-4 bg-gray-50 rounded-2xl p-4">
            <h4 className="font-semibold text-gray-800 text-sm mb-2">💡 What happens next?</h4>
            <p className="text-xs text-gray-600">
              After confirming your security deposit, you'll be taken to the preview page where you can review all your requirements and complete the payment process.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}