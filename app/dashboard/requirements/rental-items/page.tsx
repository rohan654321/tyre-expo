'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ComputerDesktopIcon, ArrowLeftIcon, CheckCircleIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline';

interface RentalItem {
  id: string;
  name: string;
  description: string;
  category: string;
  pricePerDay: number;
  image: string;
  quantity: number;
}

const rentalCatalog: RentalItem[] = [
  { id: 'proj-1', name: '4K Projector', description: 'High brightness 5000 lumens projector', category: 'AV Equipment', pricePerDay: 5000, image: '/images/projector.jpg', quantity: 0 },
  { id: 'screen-1', name: 'Projection Screen', description: '120" motorized screen', category: 'AV Equipment', pricePerDay: 2000, image: '/images/screen.jpg', quantity: 0 },
  { id: 'speaker-1', name: 'PA Sound System', description: 'Complete sound system with 4 speakers + mixer', category: 'Audio', pricePerDay: 8000, image: '/images/speaker.jpg', quantity: 0 },
  { id: 'mic-1', name: 'Wireless Microphone', description: 'Professional wireless mic set', category: 'Audio', pricePerDay: 1500, image: '/images/mic.jpg', quantity: 0 },
  { id: 'tv-1', name: '65" LED TV', description: '4K Smart TV with stand', category: 'Display', pricePerDay: 4000, image: '/images/tv.jpg', quantity: 0 },
  { id: 'laptop-1', name: 'High Performance Laptop', description: 'Intel i7, 16GB RAM, SSD', category: 'IT Equipment', pricePerDay: 3000, image: '/images/laptop.jpg', quantity: 0 },
  { id: 'ipad-1', name: 'iPad for Demo', description: 'iPad Pro for product demonstrations', category: 'IT Equipment', pricePerDay: 2000, image: '/images/ipad.jpg', quantity: 0 },
  { id: 'led-1', name: 'LED Video Wall', description: '3x3 LED video wall for main display', category: 'Display', pricePerDay: 15000, image: '/images/led-wall.jpg', quantity: 0 },
];

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

export default function RentalItemsPage() {
  const router = useRouter();
  const [items, setItems] = useState<RentalItem[]>(rentalCatalog);
  const [rentalDays, setRentalDays] = useState(3);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Please select at least one rental item');
      return;
    }
    setSubmitted(true);
  };

  const handleBack = () => {
    router.push('/dashboard/requirements');
  };

  if (submitted) return <SuccessPage onBack={handleBack} />;

  // Group items by category
  const groupedItems = items.reduce((acc, item) => {
    if (!acc[item.category]) acc[item.category] = [];
    acc[item.category].push(item);
    return acc;
  }, {} as Record<string, RentalItem[]>);

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
                    {/* Image Placeholder - Replace with actual images */}
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-xl flex items-center justify-center">
                      <ComputerDesktopIcon className="h-8 w-8 text-purple-500" />
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
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-700">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
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
              disabled={selectedItems.length === 0}
              className="w-full py-2.5 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Rental Request
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}