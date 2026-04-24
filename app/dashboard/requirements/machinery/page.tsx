'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  WrenchScrewdriverIcon,
  ArrowLeftIcon,
  PlusIcon,
  TrashIcon,
  CheckCircleIcon,
} from '@heroicons/react/24/outline';

interface Machine {
  id: number;
  name: string;
  width: number;
  length: number;
  height: number;
  weight: number;
  powerRequirement: string;
}

export default function MachineryRequirementsPage() {
  const router = useRouter();
  const [machines, setMachines] = useState<Machine[]>([
    { id: 1, name: '', width: 0, length: 0, height: 0, weight: 0, powerRequirement: '' }
  ]);
  const [specialRequirements, setSpecialRequirements] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleAddMachine = () => {
    setMachines([
      ...machines,
      { id: Date.now(), name: '', width: 0, length: 0, height: 0, weight: 0, powerRequirement: '' }
    ]);
  };

  const handleRemoveMachine = (id: number) => {
    setMachines(machines.filter(m => m.id !== id));
  };

  const handleMachineChange = (id: number, field: keyof Machine, value: string | number) => {
    setMachines(machines.map(m => m.id === id ? { ...m, [field]: value } : m));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => router.push('/dashboard/requirements'), 2000);
  };

  if (submitted) {
    return (
      <div className="max-w-2xl mx-auto text-center py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
            <CheckCircleIcon className="h-8 w-8 text-green-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Requirement Submitted!</h2>
          <p className="text-gray-600 mb-6">Your machinery requirement has been submitted successfully.</p>
          <button
            onClick={() => router.push('/dashboard/requirements')}
            className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            Back to Requirements
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg hover:bg-gray-100 transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-slate-100 rounded-xl flex items-center justify-center">
          <WrenchScrewdriverIcon className="h-6 w-6 text-slate-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Machinery Setup Requirements</h1>
          <p className="text-gray-500 text-sm">Tyre manufacturing and display machinery details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
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
                <label className="block text-sm font-medium text-gray-700 mb-1">Machine Name</label>
                <input
                  type="text"
                  value={machine.name}
                  onChange={(e) => handleMachineChange(machine.id, 'name', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                  placeholder="e.g., Tyre Curing Press, Extruder, Mixer"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Width (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={machine.width || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'width', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Width in meters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Length (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={machine.length || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'length', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Length in meters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Height (m)</label>
                <input
                  type="number"
                  step="0.1"
                  value={machine.height || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'height', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Height in meters"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Weight (Tons)</label>
                <input
                  type="number"
                  step="0.1"
                  value={machine.weight || ''}
                  onChange={(e) => handleMachineChange(machine.id, 'weight', parseFloat(e.target.value) || 0)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="Weight in tons"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-1">Power Requirement</label>
                <input
                  type="text"
                  value={machine.powerRequirement}
                  onChange={(e) => handleMachineChange(machine.id, 'powerRequirement', e.target.value)}
                  className="w-full px-4 py-2.5 border border-gray-200 rounded-xl"
                  placeholder="e.g., 50 KVA, 3 Phase"
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

        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <label className="block text-sm font-medium text-gray-700 mb-2">Special Requirements / Notes</label>
          <textarea
            rows={4}
            value={specialRequirements}
            onChange={(e) => setSpecialRequirements(e.target.value)}
            className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
            placeholder="Any special handling, installation requirements, or additional notes..."
          />
        </div>

        <button
          type="submit"
          className="w-full py-3 bg-gradient-to-r from-slate-600 to-gray-700 text-white font-semibold rounded-xl hover:from-slate-700 hover:to-gray-800 transition"
        >
          Submit Machinery Requirements
        </button>
      </form>
    </div>
  );
}