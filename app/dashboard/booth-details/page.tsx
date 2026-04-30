// app/dashboard/booth-details/page.tsx
'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  MapPinIcon,
  BuildingOfficeIcon,
  UserIcon,
  PhoneIcon,
  EnvelopeIcon,
  IdentificationIcon,
  ArrowLeftIcon,
  CheckCircleIcon,
  DocumentTextIcon,
  ShieldCheckIcon
} from '@heroicons/react/24/outline';
import { boothAPI } from '@/lib/api/exhibitorClient';
import toast from 'react-hot-toast';

interface BoothDetails {
  boothNo: string;
  sqMtrBooked: string;
  organisation: string;
  contactPerson: string;
  designation: string;
  mobile: string;
  email: string;
  contractorCompany: string;
  contractorPerson: string;
  contractorMobile: string;
  contractorEmail: string;
  contractorGST: string;
  contractorPAN: string;
}

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Booth Details Saved!</h2>
        <p className="text-gray-600 mb-6">Your booth and contractor details have been saved successfully.</p>
        <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Back to Stalls
        </button>
      </div>
    </div>
  );
}

export default function BoothDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<BoothDetails>({
    boothNo: '',
    sqMtrBooked: '',
    organisation: '',
    contactPerson: '',
    designation: '',
    mobile: '',
    email: '',
    contractorCompany: '',
    contractorPerson: '',
    contractorMobile: '',
    contractorEmail: '',
    contractorGST: '',
    contractorPAN: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Transform backend data to form format
  const transformBackendToForm = (backendData: any): BoothDetails => {
    // Extract size number from strings like "9m x 9m" or "48 sq.m"
    let sqMtrBooked = '';
    if (backendData.size) {
      const match = backendData.size.match(/\d+/);
      if (match) {
        sqMtrBooked = match[0];
      }
    } else if (backendData.sqMtrBooked) {
      sqMtrBooked = backendData.sqMtrBooked;
    }

    return {
      boothNo: backendData.boothNumber || backendData.boothNo || '',
      sqMtrBooked: sqMtrBooked,
      organisation: backendData.organisation || '',
      contactPerson: backendData.contactPerson || '',
      designation: backendData.designation || '',
      mobile: backendData.mobile || '',
      email: backendData.email || '',
      contractorCompany: backendData.contractorCompany || '',
      contractorPerson: backendData.contractorPerson || '',
      contractorMobile: backendData.contractorMobile || '',
      contractorEmail: backendData.contractorEmail || '',
      contractorGST: backendData.contractorGST || '',
      contractorPAN: backendData.contractorPAN || '',
    };
  };

  // Transform form data to backend format
  const transformFormToBackend = (formData: BoothDetails) => {
    return {
      boothNumber: formData.boothNo,
      size: `${formData.sqMtrBooked} sq.m`,
      type: 'Standard',
      dimensions: '',
      notes: '',
      price: (parseInt(formData.sqMtrBooked) * 2500).toString(),
      status: 'pending',
      organisation: formData.organisation,
      contactPerson: formData.contactPerson,
      designation: formData.designation,
      mobile: formData.mobile,
      email: formData.email,
      contractorCompany: formData.contractorCompany,
      contractorPerson: formData.contractorPerson,
      contractorMobile: formData.contractorMobile,
      contractorEmail: formData.contractorEmail,
      contractorGST: formData.contractorGST,
      contractorPAN: formData.contractorPAN,
    };
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.boothNo || !formData.sqMtrBooked || !formData.organisation ||
      !formData.contactPerson || !formData.mobile || !formData.email) {
      toast.error('Please fill all required fields');
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      toast.error('Please enter a valid email address');
      return;
    }

    setLoading(true);
    try {
      const backendData = transformFormToBackend(formData);
      const result = await boothAPI.saveDetails(backendData);

      if (result.success) {
        setSubmitted(true);
        toast.success('Booth details saved successfully!');
      } else {
        toast.error(result.error || 'Failed to save booth details');
      }
    } catch (error) {
      console.error('Error saving booth details:', error);
      toast.error('Failed to save booth details');
    } finally {
      setLoading(false);
    }
  };

  // Fetch existing booth details on load
  useEffect(() => {
    const fetchBoothDetails = async () => {
      try {
        setFetching(true);
        const result = await boothAPI.getDetails();

        if (result.success && result.data) {
          // Transform backend data to form format
          const transformedData = transformBackendToForm(result.data);
          setFormData(transformedData);
        }
      } catch (error: any) {
        console.error('Error fetching booth details:', error);
        // If 404, it's fine - means no existing data
        if (error.response?.status !== 404) {
          toast.error('Failed to load existing booth details');
        }
      } finally {
        setFetching(false);
      }
    };

    fetchBoothDetails();
  }, []);

  const handleBack = () => {
    router.push('/dashboard/my-stalls');
  };

  if (submitted) return <SuccessPage onBack={handleBack} />;

  if (fetching) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-amber-100 rounded-xl flex items-center justify-center">
          <MapPinIcon className="h-6 w-6 text-amber-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Booth & Contractor Details</h1>
          <p className="text-gray-500 text-sm">REQUIRED - Registration of contractor for bare space exhibitors</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Booth Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <MapPinIcon className="h-5 w-5 text-amber-500" />
            Booth Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Booth Number *</label>
              <input
                type="text"
                name="boothNo"
                value={formData.boothNo}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., A-101"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Square Meters Booked *</label>
              <input
                type="number"
                name="sqMtrBooked"
                value={formData.sqMtrBooked}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., 48"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Organisation *</label>
              <input
                type="text"
                name="organisation"
                value={formData.organisation}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="Company/Organisation name"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Contact Person *</label>
              <input
                type="text"
                name="contactPerson"
                value={formData.contactPerson}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="Full name of contact person"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Designation *</label>
              <input
                type="text"
                name="designation"
                value={formData.designation}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="e.g., Exhibition Manager"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Mobile Number *</label>
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="9876543210"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email ID *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="contact@company.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Contractor Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BuildingOfficeIcon className="h-5 w-5 text-slate-500" />
            Contractor Details (Optional - for bare space exhibitors)
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Company</label>
              <input
                type="text"
                name="contractorCompany"
                value={formData.contractorCompany}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="Contractor company name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Person</label>
              <input
                type="text"
                name="contractorPerson"
                value={formData.contractorPerson}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="Contact person name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Mobile</label>
              <input
                type="tel"
                name="contractorMobile"
                value={formData.contractorMobile}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="Mobile number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor Email</label>
              <input
                type="email"
                name="contractorEmail"
                value={formData.contractorEmail}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="Email address"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor GST</label>
              <input
                type="text"
                name="contractorGST"
                value={formData.contractorGST}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="GST number"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contractor PAN</label>
              <input
                type="text"
                name="contractorPAN"
                value={formData.contractorPAN}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-amber-500"
                placeholder="PAN number"
              />
            </div>
          </div>
        </div>

        {/* Booth Fabrication Guidelines */}
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 rounded-2xl p-6 border border-amber-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <ShieldCheckIcon className="h-5 w-5 text-amber-600" />
            Booth Fabrication Guidelines & Regulations
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span><strong>Height Limit:</strong> Maximum allowable height for fabricated booths is 4 meters.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span><strong>Carpet Requirement:</strong> Single-use carpet must be laid over entire booth area before construction.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span><strong>No Storage Space:</strong> Storing materials behind booth is prohibited.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-amber-500">•</span>
              <span><strong>Fire Extinguishers:</strong> Each booth must have fire extinguishers.</span>
            </li>
          </ul>
        </div>

        {/* Damage & Performance Bond */}
        <div className="bg-red-50 rounded-2xl p-6 border border-red-100">
          <h2 className="text-lg font-semibold text-gray-800 mb-3 flex items-center gap-2">
            <DocumentTextIcon className="h-5 w-5 text-red-500" />
            Damage & Performance Bond
          </h2>
          <ul className="space-y-2 text-sm text-gray-700">
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Security Deposit DD payable to <strong>"Maxx Business Media Pvt. Ltd."</strong></span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Contractors are responsible for removing all packing and waste materials.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Security Deposit refundable after exhibition with receipt.</span>
            </li>
            <li className="flex items-start gap-2">
              <span className="text-red-500">•</span>
              <span>Upon submission of form and deposit, CONTRACTOR BANDS will be issued.</span>
            </li>
          </ul>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/my-stalls')}
            className="px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            disabled={loading}
            className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Saving...' : 'Save Booth Details'}
          </button>
        </div>
      </form>
    </div>
  );
}