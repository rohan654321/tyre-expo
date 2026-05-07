'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ComputerDesktopIcon, ArrowLeftIcon, CheckCircleIcon, PlusIcon, MinusIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { rentalItemsAPI, extraRequirementsAPI, RentalItem } from '@/lib/api/exhibitorClient';

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Rental Items Submitted!</h2>
        <p className="text-gray-600 mb-6">Your AV/IT rental request has been submitted successfully.</p>
        <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Back to Requirements
        </button>
      </div>
    </div>
  );
}

interface CartItem extends RentalItem {
  quantity: number;
}

export default function RentalItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<CartItem[]>([]);
  const [rentalDays, setRentalDays] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch rental items from API
  useEffect(() => {
    const fetchRentalItems = async () => {
      try {
        setLoading(true);
        const response = await rentalItemsAPI.getAll();
        if (response.success) {
          // Add quantity property to each item
          const itemsWithQuantity = response.data.map(item => ({
            ...item,
            quantity: 0
          }));
          setItems(itemsWithQuantity);
        } else {
          setError('Failed to load rental items');
        }
      } catch (err: any) {
        console.error('Error fetching rental items:', err);
        setError(err.message || 'Failed to load items');
      } finally {
        setLoading(false);
      }
    };

    fetchRentalItems();
  }, []);

  const updateQuantity = (id: string, delta: number) => {
    setItems(items.map(item => {
      if (item.id === id) {
        const newQuantity = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQuantity };
      }
      return item;
    }));
  };

  const calculateTotal = () => {
    return items.reduce((sum, item) => sum + (item.pricePerDay * item.quantity * rentalDays), 0);
  };

  const selectedItems = items.filter(i => i.quantity > 0);
  const total = calculateTotal();

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, CartItem[]>);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (selectedItems.length === 0) {
      alert('Please select at least one rental item');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const generalInfo = JSON.parse(localStorage.getItem('exhibitorGeneralInfo') || '{}');
      const boothDetails = JSON.parse(localStorage.getItem('exhibitorBoothDetails') || '{}');

      // Format rental items for API
      const rentalItems = selectedItems.map(item => ({
        id: item.id,
        type: item.name,
        quantity: item.quantity,
        costFor3Days: item.pricePerDay * rentalDays,
        totalCost: item.pricePerDay * item.quantity * rentalDays
      }));

      const response = await extraRequirementsAPI.submit({
        generalInfo,
        boothDetails,
        eventName: 'Tyre Expo 2024',
        rentalItems,
        notes: `Rental duration: ${rentalDays} days`
      });

      if (response.success) {
        setSubmitted(true);
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

  const handleBack = () => {
    router.push('/dashboard/requirements');
  };

  if (loading) {
    return (
      <div className="max-w-6xl mx-auto text-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading rental catalog...</p>
      </div>
    );
  }

  if (submitted) return <SuccessPage onBack={handleBack} />;

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <ComputerDesktopIcon className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AV & IT Equipment Rental</h1>
          <p className="text-gray-500 text-sm">Rent audio, video, and IT equipment for your booth</p>
        </div>
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
          {error}
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Rental Catalog */}
        <div className="lg:col-span-2 space-y-6">
          {Object.entries(groupedItems).map(([category, categoryItems]) => (
            <div key={category} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
              <div className="px-5 py-3 bg-gray-50 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">{category}</h2>
              </div>
              <div className="divide-y divide-gray-100">
                {categoryItems.map((item) => (
                  <div key={item.id} className="p-4 flex items-center gap-4">
                    {/* Image */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      {item.imageUrl ? (
                        <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover rounded-xl" />
                      ) : (
                        <ComputerDesktopIcon className="h-8 w-8 text-purple-500" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-gray-800">{item.name}</h3>
                      <p className="text-xs text-gray-500">{item.description}</p>
                      <p className="text-sm font-semibold text-purple-600 mt-1">₹{item.pricePerDay}/day</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        disabled={!item.isActive}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-700">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        disabled={!item.isActive}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <ComputerDesktopIcon className="h-5 w-5" />
              <h3 className="font-semibold">Your Rental Cart</h3>
              {selectedItems.length > 0 && (
                <span className="bg-white/20 rounded-full px-2 py-0.5 text-xs">
                  {selectedItems.length} items
                </span>
              )}
            </div>

            <div className="mb-4">
              <label className="block text-sm text-white/80 mb-1">Rental Duration</label>
              <select
                value={rentalDays}
                onChange={(e) => setRentalDays(parseInt(e.target.value))}
                className="w-full px-3 py-2 rounded-lg text-gray-800 bg-white"
              >
                <option value={1}>1 Day</option>
                <option value={2}>2 Days</option>
                <option value={3}>3 Days (Recommended)</option>
                <option value={4}>4 Days</option>
                <option value={5}>5 Days</option>
              </select>
            </div>

            <div className="space-y-2 max-h-60 overflow-y-auto mb-4">
              {selectedItems.length === 0 ? (
                <p className="text-sm text-white/70 text-center py-4">No items selected</p>
              ) : (
                selectedItems.map(item => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span>{item.name} x{item.quantity}</span>
                    <span>₹{(item.pricePerDay * item.quantity * rentalDays).toLocaleString()}</span>
                  </div>
                ))
              )}
            </div>

            <div className="border-t border-white/20 pt-3 mb-4">
              <div className="flex justify-between font-bold">
                <span>Total:</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
              <p className="text-xs text-white/70 mt-1">* GST 18% extra as applicable</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedItems.length === 0 || submitting}
              className="w-full py-2.5 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {submitting ? 'Submitting...' : 'Submit Rental Request'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}