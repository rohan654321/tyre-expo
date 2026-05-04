'use client';

import { useState, useEffect } from 'react';
import {
  BookOpenIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ManualSection {
  id: string;
  title: string;
  content: string;
  category: string;
  createdAt?: string;
  updatedAt?: string;
}

interface ManualPDF {
  id: string;
  title: string;
  description: string;
  category: string;
  file_name: string;
  file_size: string;
  file_path: string;
  downloads: number;
  status: 'published' | 'draft';
  type: 'section' | 'pdf';
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export default function ExhibitorManualPage() {
  const [sections, setSections] = useState<ManualSection[]>([]);
  const [pdfs, setPdfs] = useState<ManualPDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');

  useEffect(() => {
    fetchManualContent();
  }, []);

  const fetchManualContent = async () => {
    try {
      setLoading(true);

      // Fetch text sections
      const sectionsResponse = await axios.get(`${API_BASE_URL}/admin/manuals/sections`);
      if (sectionsResponse.data.success) {
        setSections(sectionsResponse.data.data || []);
        if (sectionsResponse.data.data?.length > 0) {
          setExpandedSection(sectionsResponse.data.data[0].id);
        }
      }

      // Fetch PDFs (only published ones)
      const pdfsResponse = await axios.get(`${API_BASE_URL}/admin/manuals/pdfs`);
      if (pdfsResponse.data.success) {
        const publishedPdfs = (pdfsResponse.data.data || []).filter((pdf: ManualPDF) => pdf.status === 'published');
        setPdfs(publishedPdfs);
      }
    } catch (error) {
      console.error('Failed to fetch manual content:', error);
      toast.error('Failed to load manual content');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (pdf: ManualPDF) => {
    try {
      window.open(pdf.file_path, '_blank');
      toast.success('Download started');
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to download file');
    }
  };

  const filteredSections = sections.filter(section =>
    section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    section.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredPdfs = pdfs.filter(pdf =>
    pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (pdf.description && pdf.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const categories = ['all', ...new Set([...sections.map(s => s.category), ...pdfs.map(p => p.category)])];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-4 border-amber-500 border-t-transparent"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Exhibitor Manual</h1>
        <p className="text-gray-500 mt-1">Event guidelines, rules, and important information</p>
      </div>

      {/* Search and Filter */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="flex-1 relative">
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
        <select
          value={categoryFilter}
          onChange={(e) => setCategoryFilter(e.target.value)}
          className="px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500 focus:border-amber-500 bg-white"
        >
          {categories.map(cat => (
            <option key={cat} value={cat}>
              {cat === 'all' ? 'All Categories' : cat.charAt(0).toUpperCase() + cat.slice(1)}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Manual Sections */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-100 bg-gray-50">
              <h2 className="font-semibold text-gray-800 flex items-center gap-2">
                <DocumentTextIcon className="h-5 w-5 text-amber-500" />
                Manual Sections
              </h2>
            </div>
            <div className="divide-y divide-gray-100">
              {filteredSections.length === 0 ? (
                <div className="p-6 text-center text-gray-500">
                  No sections found matching your search.
                </div>
              ) : (
                filteredSections.map((section) => (
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
                        <p className="whitespace-pre-wrap">{section.content}</p>
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <span className="text-xs text-gray-400">Category: {section.category}</span>
                          {section.updatedAt && (
                            <span className="text-xs text-gray-400">
                              Updated: {new Date(section.updatedAt).toLocaleDateString()}
                            </span>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                ))
              )}
            </div>
          </div>
        </div>

        {/* Downloadable PDFs */}
        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h3 className="font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BookOpenIcon className="h-5 w-5 text-amber-500" />
              Downloadable Documents
            </h3>
            <div className="space-y-3">
              {filteredPdfs.length === 0 ? (
                <p className="text-gray-500 text-center py-4">No documents available</p>
              ) : (
                filteredPdfs.map((pdf) => (
                  <div key={pdf.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition">
                    <div className="flex items-center gap-3 flex-1 min-w-0">
                      <DocumentTextIcon className="h-5 w-5 text-red-500 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-800 truncate">{pdf.title}</p>
                        {pdf.description && (
                          <p className="text-xs text-gray-400 truncate">{pdf.description}</p>
                        )}
                        <p className="text-xs text-gray-400">{pdf.file_size}</p>
                      </div>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDownload(pdf)}
                        className="p-2 text-gray-500 hover:text-amber-600 transition"
                        title="Download"
                      >
                        <ArrowDownTrayIcon className="h-5 w-5" />
                      </button>
                      {pdf.file_path && pdf.file_path.endsWith('.pdf') && (
                        <a
                          href={pdf.file_path}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="p-2 text-gray-500 hover:text-blue-600 transition"
                          title="Preview"
                        >
                          <EyeIcon className="h-5 w-5" />
                        </a>
                      )}
                    </div>
                  </div>
                ))
              )}
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

          {/* Contact Support */}
          <div className="bg-gray-50 rounded-2xl p-6">
            <h3 className="font-semibold text-gray-800 mb-2">Need Help?</h3>
            <p className="text-sm text-gray-600 mb-3">
              Contact our support team for assistance with the manual or any exhibition-related queries.
            </p>
            <button
              onClick={() => window.location.href = '/exhibitor/support'}
              className="w-full py-2 bg-white border border-gray-200 rounded-lg text-amber-600 text-sm font-medium hover:bg-gray-100 transition"
            >
              Contact Support
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}