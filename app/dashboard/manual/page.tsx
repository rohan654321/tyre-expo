'use client';

import { useState } from 'react';
import { BookOpenIcon, DocumentTextIcon, ArrowDownTrayIcon, ChevronDownIcon, ChevronRightIcon } from '@heroicons/react/24/outline';

interface ManualSection {
  id: string;
  title: string;
  content: string;
  category: string;
}

const manualSections: ManualSection[] = [
  {
    id: '1',
    title: 'Exhibition Timings & Schedule',
    content: 'The exhibition will be open from 10:00 AM to 7:00 PM daily. Setup begins on November 13th and dismantling starts on November 18th after 6:00 PM.',
    category: 'Schedule',
  },
  {
    id: '2',
    title: 'Booth Construction Guidelines',
    content: 'Maximum booth height is 4 meters. All back walls must be finished. No storage behind booths is permitted. Fire extinguishers must be visible.',
    category: 'Rules',
  },
  {
    id: '3',
    title: 'Safety & Security',
    content: 'All exhibitors must wear their badges at all times. No entry after 8:00 PM without prior approval. Security will be present 24/7.',
    category: 'Rules',
  },
  {
    id: '4',
    title: 'Electrical Guidelines',
    content: 'All electrical installations must be approved by the exhibition electrician. Maximum load per booth is 50 KVA.',
    category: 'Technical',
  },
  {
    id: '5',
    title: 'Material Handling',
    content: 'Forklift and crane services available. Advance booking required for heavy machinery. Please coordinate with logistics team.',
    category: 'Logistics',
  },
];

const pdfDocuments = [
  { id: '1', name: 'Exhibitor Manual 2024.pdf', size: '2.5 MB' },
  { id: '2', name: 'Booth Construction Guidelines.pdf', size: '1.8 MB' },
  { id: '3', name: 'Safety Regulations.pdf', size: '1.2 MB' },
  { id: '4', name: 'Floor Plan Map.pdf', size: '3.1 MB' },
];

export default function ExhibitorManualPage() {
  const [expandedSection, setExpandedSection] = useState<string | null>('1');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSections = manualSections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exhibitor Manual</h1>
        <p className="text-gray-500 mt-1">Event guidelines, rules, and important information</p>
      </div>

      {/* Search */}
      <div className="relative">
        <input
          type="text"
          placeholder="Search manual..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full px-4 py-3 pl-10 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
        <svg className="absolute left-3 top-3.5 h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manual Sections */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800">Manual Sections</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredSections.map((section) => (
                <div key={section.id}>
                  <button
                    onClick={() => setExpandedSection(expandedSection === section.id ? null : section.id)}
                    className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition"
                  >
                    <div className="flex items-center gap-3">
                      <DocumentTextIcon className="h-5 w-5 text-amber-500" />
                      <span className="font-medium text-gray-800">{section.title}</span>
                    </div>
                    {expandedSection === section.id ? (
                      <ChevronDownIcon className="h-5 w-5 text-gray-400" />
                    ) : (
                      <ChevronRightIcon className="h-5 w-5 text-gray-400" />
                    )}
                  </button>
                  {expandedSection === section.id && (
                    <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                      <p>{section.content}</p>
                      <div className="mt-3 pt-3 border-t">
                        <span className="text-xs text-gray-400">Category: {section.category}</span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Quick Links & PDFs */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5 text-amber-500" />
              Downloadable PDFs
            </h3>
            <div className="space-y-3">
              {pdfDocuments.map((pdf) => (
                <div key={pdf.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-3">
                    <DocumentTextIcon className="h-5 w-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-gray-800">{pdf.name}</p>
                      <p className="text-xs text-gray-400">{pdf.size}</p>
                    </div>
                  </div>
                  <button className="p-2 text-gray-500 hover:text-amber-600 transition">
                    <ArrowDownTrayIcon className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Important Dates */}
          <div className="bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl p-6 text-white">
            <h3 className="font-semibold text-lg mb-3">Important Dates</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Setup Begins:</span>
                <span className="font-medium">13th November, 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Exhibition Days:</span>
                <span className="font-medium">14-17 November, 2024</span>
              </div>
              <div className="flex justify-between">
                <span>Dismantling:</span>
                <span className="font-medium">18th November, 2024</span>
              </div>
              <div className="flex justify-between mt-2 pt-2 border-t border-white/20">
                <span>Late Fee Deadline:</span>
                <span className="font-medium">31st October, 2024</span>
              </div>
            </div>
          </div>

          {/* Contact */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Contact our support team for assistance with the manual or any exhibition-related queries.
            </p>
            <button className="w-full py-2 bg-white border border-gray-200 rounded-lg text-amber-600 text-sm font-medium hover:bg-gray-100 transition">
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}