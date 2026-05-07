'use client';

import { useState, useEffect } from 'react';
import {
  BookOpenIcon,
  DocumentTextIcon,
  ArrowDownTrayIcon,
  ChevronDownIcon,
  ChevronRightIcon,
  EyeIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';
import axios from 'axios';
import toast from 'react-hot-toast';

interface ManualSection {
  id: string;
  title: string;
  content: string;
  category: string;
  order?: number;
  createdAt?: string;
  updatedAt?: string;
}

interface ManualPDF {
  id: string;
  title: string;
  description: string;
  category: string;
  fileName: string;
  fileSize: string;
  fileUrl: string;
  downloads: number;
  status: 'published' | 'draft';
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Default fallback content when API fails
const DEFAULT_SECTIONS: ManualSection[] = [
  {
    id: '1',
    title: 'Welcome to India Tyre Expo 2027',
    content: 'Welcome to the India Tyre Expo 2027. This manual contains important information for all exhibitors. Please read all sections carefully to ensure a smooth and successful exhibition experience.\n\nKey Highlights:\n• Over 500+ exhibitors from 25+ countries\n• 50,000+ expected visitors\n• 10,000+ sq.m of exhibition space\n• 3 days of networking and business opportunities',
    category: 'general'
  },
  {
    id: '2',
    title: 'Important Dates & Deadlines',
    content: 'Setup Schedule:\n• Setup Begins: 13th November, 2024 (9:00 AM)\n• Setup Ends: 14th November, 2024 (6:00 PM)\n\nExhibition Days:\n• Day 1: 14th November, 2024 (10:00 AM - 7:00 PM)\n• Day 2: 15th November, 2024 (10:00 AM - 7:00 PM)\n• Day 3: 16th November, 2024 (10:00 AM - 7:00 PM)\n• Day 4: 17th November, 2024 (10:00 AM - 5:00 PM)\n\nDismantling:\n• Dismantling Begins: 18th November, 2024 (9:00 AM)\n• Site Clearance Deadline: 20th November, 2024 (6:00 PM)\n\nPayment Deadlines:\n• Early Bird Discount: 30th September, 2024\n• Standard Registration: 31st October, 2024\n• Late Registration (with fee): After 31st October, 2024',
    category: 'dates'
  },
  {
    id: '3',
    title: 'Booth Setup Guidelines',
    content: 'Booth Specifications:\n• Maximum allowable height: 4 meters\n• Carpet required over entire booth area\n• No storage space behind booths allowed\n• All materials must be fire-retardant\n\nSafety Requirements:\n• Each booth must have a fire extinguisher\n• Emergency exits must remain unobstructed\n• No flammable materials allowed\n\nElectricity:\n• Maximum load per booth as allocated\n• All electrical installations must be done by authorized contractors\n• Voltage: 230V / 415V 3-phase available',
    category: 'booth'
  },
  {
    id: '4',
    title: 'Rules & Regulations',
    content: 'General Rules:\n• No loud music or announcements without prior approval\n• Food and beverage sales require separate license\n• No subletting of booth space allowed\n• All exhibits must be relevant to the tyre industry\n\nProhibited Items:\n• Hazardous materials\n• Weapons or explosives\n• Unauthorized promotional materials\n• Live animals (except service animals)\n\nViolation of rules may result in:\n• Immediate booth closure\n• Fine and penalties\n• Ban from future exhibitions',
    category: 'regulations'
  },
  {
    id: '5',
    title: 'Security & Safety',
    content: 'Security Services:\n• 24/7 security personnel on-site\n• CCTV surveillance throughout the venue\n• Access control at all entry points\n• Baggage scanning at entrances\n\nEmergency Procedures:\n• Fire exits are marked throughout the venue\n• First aid room located near Hall 1 entrance\n• Emergency contact: 911 (within venue)\n• In case of emergency, follow venue announcements\n\nInsurance:\n• All exhibitors must have valid public liability insurance\n• Insurance certificate must be submitted before setup\n• Coverage of at least ₹1 Crore recommended',
    category: 'security'
  },
  {
    id: '6',
    title: 'Logistics & Shipping',
    content: 'Shipping Address:\nIndia Tyre Expo 2027\n[Exhibitor Name], Booth No. [Your Booth Number]\nIndia Expo Centre & Mart\nGreater Noida, Uttar Pradesh - 201306\n\nImportant Notes:\n• All shipments must be labeled properly\n• On-site handling charges apply\n• Storage available from 10th November, 2024\n• Empty crate storage available\n\nCustoms Clearance (International Exhibitors):\n• Temporary import documentation required\n• Contact logistics partner for assistance\n• Allow 5-7 days for customs clearance',
    category: 'logistics'
  }
];

const DEFAULT_PDFS: ManualPDF[] = [
  {
    id: '1',
    title: 'Exhibitor Handbook 2027',
    description: 'Complete guide for exhibitors including floor plan, rules, and contact information',
    category: 'general',
    fileName: 'exhibitor-handbook-2027.pdf',
    fileSize: '2.5 MB',
    fileUrl: '/uploads/manuals/exhibitor-handbook.pdf',
    downloads: 0,
    status: 'published'
  },
  {
    id: '2',
    title: 'Booth Construction Guidelines',
    description: 'Technical specifications and safety requirements for booth construction',
    category: 'booth',
    fileName: 'booth-guidelines.pdf',
    fileSize: '1.2 MB',
    fileUrl: '/uploads/manuals/booth-guidelines.pdf',
    downloads: 0,
    status: 'published'
  },
  {
    id: '3',
    title: 'Venue Map & Floor Plan',
    description: 'Detailed layout of exhibition halls and booth locations',
    category: 'logistics',
    fileName: 'venue-map.pdf',
    fileSize: '800 KB',
    fileUrl: '/uploads/manuals/venue-map.pdf',
    downloads: 0,
    status: 'published'
  }
];

export default function ExhibitorManualPage() {
  const [sections, setSections] = useState<ManualSection[]>([]);
  const [pdfs, setPdfs] = useState<ManualPDF[]>([]);
  const [loading, setLoading] = useState(true);
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [error, setError] = useState<string | null>(null);
  const [usingFallback, setUsingFallback] = useState(false);

  useEffect(() => {
    fetchManualContent();
  }, []);

  const fetchManualContent = async () => {
    try {
      setLoading(true);
      setError(null);
      setUsingFallback(false);

      // Try to fetch text sections
      let sectionsData: ManualSection[] = [];
      let pdfsData: ManualPDF[] = [];

      try {
        const sectionsResponse = await axios.get(`${API_BASE_URL}/admin/manuals/sections`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('exhibitorToken')}`
          }
        });

        if (sectionsResponse.data.success && sectionsResponse.data.data?.length > 0) {
          sectionsData = sectionsResponse.data.data;
        }
      } catch (sectionError: any) {
        console.error('Failed to fetch sections:', sectionError);
        if (sectionError.response?.status === 404) {
          console.log('Sections API not found, using fallback content');
        }
      }

      // Try to fetch PDFs
      try {
        const pdfsResponse = await axios.get(`${API_BASE_URL}/admin/manuals/pdfs`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('exhibitorToken')}`
          }
        });

        if (pdfsResponse.data.success && pdfsResponse.data.data?.length > 0) {
          const publishedPdfs = pdfsResponse.data.data.filter((pdf: any) => pdf.status === 'published');
          pdfsData = publishedPdfs;
        }
      } catch (pdfError: any) {
        console.error('Failed to fetch PDFs:', pdfError);
        if (pdfError.response?.status === 404) {
          console.log('PDFs API not found, using fallback content');
        }
      }

      // If no data from API, use fallback content
      if (sectionsData.length === 0 && pdfsData.length === 0) {
        setSections(DEFAULT_SECTIONS);
        setPdfs(DEFAULT_PDFS);
        setUsingFallback(true);
        if (DEFAULT_SECTIONS.length > 0) {
          setExpandedSection(DEFAULT_SECTIONS[0].id);
        }
        toast.error('Could not load manual from server. Showing default content.');
      } else {
        setSections(sectionsData);
        setPdfs(pdfsData);
        if (sectionsData.length > 0 && !expandedSection) {
          setExpandedSection(sectionsData[0].id);
        } else if (sectionsData.length === 0 && DEFAULT_SECTIONS.length > 0) {
          // If no sections but we got PDFs, still show default sections
          setSections(DEFAULT_SECTIONS);
          setExpandedSection(DEFAULT_SECTIONS[0].id);
          setUsingFallback(true);
        }
      }
    } catch (error) {
      console.error('Failed to fetch manual content:', error);
      // Use fallback content on complete failure
      setSections(DEFAULT_SECTIONS);
      setPdfs(DEFAULT_PDFS);
      setUsingFallback(true);
      setError('Could not connect to server. Showing default manual content.');
      toast.error('Failed to load manual content. Using default content.');
    } finally {
      setLoading(false);
    }
  };

  const handleDownload = async (pdf: ManualPDF) => {
    try {
      // Track download count (optional)
      try {
        await axios.post(`${API_BASE_URL}/admin/manuals/pdfs/${pdf.id}/download`, {}, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('exhibitorToken')}`
          }
        });
      } catch (trackError) {
        console.error('Failed to track download:', trackError);
      }

      // Open the PDF
      if (pdf.fileUrl) {
        window.open(pdf.fileUrl, '_blank');
        toast.success('Opening document...');
      } else {
        toast.error('Document URL not available');
      }
    } catch (error) {
      console.error('Download error:', error);
      toast.error('Failed to open document');
    }
  };

  // Filter sections based on search and category
  const filteredSections = sections.filter(section => {
    const matchesSearch = searchTerm === '' ||
      section.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      section.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = categoryFilter === 'all' || section.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Filter PDFs based on search and category
  const filteredPdfs = pdfs.filter(pdf => {
    const matchesSearch = searchTerm === '' ||
      pdf.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (pdf.description && pdf.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = categoryFilter === 'all' || pdf.category === categoryFilter;
    return matchesSearch && matchesCategory;
  });

  // Get unique categories for filter
  const allCategories = ['all', ...new Set([
    ...sections.map(s => s.category),
    ...pdfs.map(p => p.category)
  ])];

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

      {/* Fallback warning banner */}
      {usingFallback && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4 flex items-start gap-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-yellow-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-yellow-800">Using Default Content</p>
            <p className="text-xs text-yellow-700 mt-0.5">
              The manual content could not be loaded from the server. Showing default information.
              Please check your connection or contact support if this persists.
            </p>
          </div>
        </div>
      )}

      {/* Error banner */}
      {error && !usingFallback && (
        <div className="bg-red-50 border border-red-200 rounded-xl p-4 flex items-start gap-3">
          <ExclamationTriangleIcon className="h-5 w-5 text-red-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-medium text-red-800">Connection Error</p>
            <p className="text-xs text-red-700 mt-0.5">{error}</p>
            <button
              onClick={fetchManualContent}
              className="mt-2 text-xs text-red-600 hover:text-red-800 font-medium"
            >
              Try Again
            </button>
          </div>
        </div>
      )}

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
          {allCategories.map(cat => (
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
                        <div className="whitespace-pre-wrap">{section.content}</div>
                        <div className="mt-3 pt-3 border-t flex justify-between items-center">
                          <span className="text-xs text-gray-400">
                            Category: {section.category}
                          </span>
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
                        <p className="text-xs text-gray-400">{pdf.fileSize}</p>
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
                      {pdf.fileUrl && pdf.fileUrl.endsWith('.pdf') && (
                        <a
                          href={pdf.fileUrl}
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

          {/* Refresh Button */}
          {usingFallback && (
            <button
              onClick={fetchManualContent}
              className="w-full py-2 bg-amber-50 border border-amber-200 rounded-lg text-amber-600 text-sm font-medium hover:bg-amber-100 transition"
            >
              🔄 Try Loading from Server
            </button>
          )}
        </div>
      </div>
    </div>
  );
}