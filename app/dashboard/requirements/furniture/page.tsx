'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ComputerDesktopIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  ShoppingCartIcon,
  MinusIcon,
  PlusIcon,
  PhotoIcon
} from '@heroicons/react/24/outline';

interface FurnitureItem {
  id: string;
  name: string;
  description: string;
  pricePerDay: number;
  quantity: number;
  imageUrl: string;
  category: string;
}

const furnitureCatalog: FurnitureItem[] = [
  { id: 'table-1', name: 'Display Table', description: 'Premium wooden display table 6ft x 3ft', pricePerDay: 800, quantity: 0, imageUrl: '/images/display-table.jpg', category: 'Tables' },
  { id: 'table-2', name: 'Round Conference Table', description: 'Glass top conference table with 4 chairs', pricePerDay: 1200, quantity: 0, imageUrl: '/images/conference-table.jpg', category: 'Tables' },
  { id: 'chair-1', name: 'Executive Chair', description: 'Leather executive chair with armrest', pricePerDay: 400, quantity: 0, imageUrl: '/images/executive-chair.jpg', category: 'Chairs' },
  { id: 'chair-2', name: 'Visitor Chair', description: 'Comfortable visitor chair with cushion', pricePerDay: 250, quantity: 0, imageUrl: '/images/visitor-chair.jpg', category: 'Chairs' },
  { id: 'sofa-1', name: 'Lounge Sofa', description: '3-seater premium lounge sofa', pricePerDay: 1500, quantity: 0, imageUrl: '/images/lounge-sofa.jpg', category: 'Seating' },
  { id: 'counter', name: 'Reception Counter', description: 'Modern reception counter with logo space', pricePerDay: 2000, quantity: 0, imageUrl: '/images/reception-counter.jpg', category: 'Counters' },
  { id: 'cabinet', name: 'Storage Cabinet', description: 'Lockable storage cabinet with keys', pricePerDay: 600, quantity: 0, imageUrl: '/images/storage-cabinet.jpg', category: 'Storage' },
  { id: 'display-1', name: 'Product Display Stand', description: 'Adjustable acrylic display stand', pricePerDay: 500, quantity: 0, imageUrl: '/images/display-stand.jpg', category: 'Display' },
  { id: 'shelf', name: 'Wall Shelf Unit', description: 'Wall-mounted display shelving', pricePerDay: 700, quantity: 0, imageUrl: '/images/shelf-unit.jpg', category: 'Display' },
  { id: 'plant', name: 'Decorative Plant', description: 'Artificial indoor plant for decor', pricePerDay: 300, quantity: 0, imageUrl: '/images/decor-plant.jpg', category: 'Decor' },
];

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Furniture Request Submitted!</h2>
        <p className="text-gray-600 mb-6">Your furniture rental request has been submitted successfully.</p>
        <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Back to Requirements
        </button>
      </div>
    </div>
  );
}

export default function FurnitureRequirementsPage() {
  const router = useRouter();
  const [items, setItems] = useState<FurnitureItem[]>(furnitureCatalog);
  const [rentalDays, setRentalDays] = useState(3);
  const [submitted, setSubmitted] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

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

  // Get unique categories
  const categories = ['all', ...new Set(items.map(i => i.category))];

  const filteredItems = selectedCategory === 'all' 
    ? items 
    : items.filter(i => i.category === selectedCategory);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (selectedItems.length === 0) {
      alert('Please select at least one furniture item');
      return;
    }
    setSubmitted(true);
  };

  const handleBack = () => {
    router.push('/dashboard/requirements');
  };

  if (submitted) return <SuccessPage onBack={handleBack} />;

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-purple-100 rounded-xl flex items-center justify-center">
          <ComputerDesktopIcon className="h-6 w-6 text-purple-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Furniture & Equipment Rental</h1>
          <p className="text-gray-500 text-sm">Rent furniture, fixtures, and equipment for your booth</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Furniture Catalog */}
        <div className="lg:col-span-2">
          {/* Category Filter */}
          <div className="flex gap-2 mb-4 overflow-x-auto pb-2">
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setSelectedCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition whitespace-nowrap ${
                  selectedCategory === cat
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {cat.charAt(0).toUpperCase() + cat.slice(1)}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filteredItems.map((item) => (
              <div key={item.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition">
                {/* Image Placeholder */}
                <div className="h-40 bg-gradient-to-br from-purple-100 to-pink-100 flex items-center justify-center relative">
                  <PhotoIcon className="h-12 w-12 text-purple-300" />
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full px-2 py-1 text-xs font-medium text-purple-600">
                    {item.category}
                  </div>
                </div>
                
                <div className="p-4">
                  <h3 className="font-semibold text-gray-800">{item.name}</h3>
                  <p className="text-xs text-gray-500 mt-1">{item.description}</p>
                  <div className="flex items-center justify-between mt-3">
                    <div>
                      <p className="text-sm font-semibold text-purple-600">₹{item.pricePerDay}/day</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, -1)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
                      >
                        <MinusIcon className="h-4 w-4" />
                      </button>
                      <span className="w-8 text-center font-medium text-gray-700">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.id, 1)}
                        className="p-1.5 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition"
                      >
                        <PlusIcon className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Cart Sidebar */}
        <div className="lg:col-span-1">
          <div className="bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl p-6 text-white sticky top-24">
            <div className="flex items-center gap-2 mb-4">
              <ShoppingCartIcon className="h-5 w-5" />
              <h3 className="font-semibold">Your Cart</h3>
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
              <p className="text-xs text-white/50 mt-2">* Delivery & setup included</p>
            </div>

            <button
              onClick={handleSubmit}
              disabled={selectedItems.length === 0}
              className="w-full py-2.5 bg-white text-purple-600 font-semibold rounded-lg hover:bg-gray-100 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Submit Rental Request
            </button>
          </div>

          {/* Delivery Info */}
          <div className="mt-4 bg-gray-50 rounded-2xl p-4 text-sm">
            <p className="font-semibold text-gray-800 mb-2">📦 Delivery Information</p>
            <p className="text-gray-600 text-xs">
              • Free delivery and pickup within exhibition premises<br />
              • Setup assistance available on request<br />
              • 24/7 support for any issues<br />
              • Damages policy applies
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}