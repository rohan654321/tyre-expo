'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CubeIcon, ArrowLeftIcon, CheckCircleIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/outline';

interface Machine {
  id: number;
  name: string;
  width: number;
  length: number;
  height: number;
  weight: number;
  powerKW: number;
  description: string;
}

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Machine Details Submitted!</h2>
        <p className="text-gray-600 mb-6">Your machine display information has been submitted successfully.</p>
        <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Back to Requirements
        </button>
      </div>
    </div>
  );
}

export default function MachineDisplayPage() {
  const router = useRouter();
  const [machines, setMachines] = useState<Machine[]>([
    { id: 1, name: '', width: 0, length: 0, height: 0, weight: 0, powerKW: 0, description: '' }
  ]);
  const [submitted, setSubmitted] = useState(false);

  const handleAddMachine = () => {
    setMachines([
      ...machines,
      { id: Date.now(), name: '', width: 0, length: 0, height: 0, weight: 0, powerKW: 0, description: '' }
    ]);
  };

  const handleRemoveMachine = (id: number) => {
    if (machines.length > 1) {
      setMachines(machines.filter(m => m.id !== id));
    }
  };

  const handleMachineChange = (id: number, field: keyof Machine, value: string | number) => {
    setMachines(machines.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const hasAnyMachine = machines.some(m => m.name.trim() !== '');
    if (!hasAnyMachine) {
      alert('Please add at least one machine or click Submit to skip');
    }
    setSubmitted(true);
  };

  const handleBack = () => {
    router.push('/dashboard/requirements');
  };

  if (submitted) return <SuccessPage onBack={handleBack} />;

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
          <CubeIcon className="h-6 w-6 text-slate-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Machine Display Details</h1>
          <p className="text-gray-500 text-sm">OPTIONAL - Add machines being displayed at your booth</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        {machines.map((machine, index) => (
          <div key={machine.id} className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-gray-800">Machine {index + 1}</h3>
              {machines.length > 1 && (
                <button
                  type="button"
                  onClick={() => handleRemoveMachine(machine.id)}
                  className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition"
                >
                  <TrashIcon className="h-5 w-5" />
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name *</label>
                <input
                  type="text"
                  value={machine.name}
                  onChange={(e) => handleMachineChange(machine.id, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Tyre Curing Press, Extruder, Mixer"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width (meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={machine.width || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'width', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Width"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Length (meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={machine.length || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'length', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Length"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (meters)</label>
                <input
                  type="number"
                  step="0.1"
                  value={machine.height || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'height', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Height"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (tons)</label>
                <input
                  type="number"
                  step="0.1"
                  value={machine.weight || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'weight', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Weight in tons"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Power Requirement (KW)</label>
                <input
                  type="number"
                  step="1"
                  value={machine.powerKW || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'powerKW', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Power in KW"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Description / Special Requirements</label>
                <textarea
                  rows={2}
                  value={machine.description}
                  onChange={(e) => handleMachineChange(machine.id, 'description', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  placeholder="Any special handling or installation requirements..."
                />
              </div>
            </div>
          </div>
        ))}

        <button
          type="button"
          onClick={handleAddMachine}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 font-medium hover:border-amber-400 hover:text-amber-600 transition"
        >
          <PlusIcon className="h-5 w-5 inline mr-2" />
          Add Another Machine
        </button>

        <div className="flex gap-4">
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition"
          >
            Submit Machine Details
          </button>
          <button
            type="button"
            onClick={() => setSubmitted(true)}
            className="px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition"
          >
            Skip
          </button>
        </div>
      </form>
    </div>
  );
}