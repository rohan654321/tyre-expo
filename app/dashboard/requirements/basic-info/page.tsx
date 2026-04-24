'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  UserIcon, 
  BuildingOfficeIcon, 
  EnvelopeIcon, 
  PhoneIcon, 
  IdentificationIcon,
  ArrowLeftIcon, 
  CheckCircleIcon,
  BriefcaseIcon,
  GlobeAltIcon
} from '@heroicons/react/24/outline';

interface BasicInfo {
  title: string;
  firstName: string;
  lastName: string;
  designation: string;
  mobile: string;
  email: string;
  companyName: string;
  businessNature: string;
  gstNumber: string;
  panNumber: string;
  website: string;
}

function SuccessPage({ onBack }: { onBack: () => void }) {
  return (
    <div className="max-w-2xl mx-auto text-center py-12">
      <div className="bg-white rounded-2xl shadow-sm p-8">
        <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
          <CheckCircleIcon className="h-8 w-8 text-green-600" />
        </div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Basic Information Saved!</h2>
        <p className="text-gray-600 mb-6">Your basic information has been saved successfully.</p>
        <button onClick={onBack} className="px-6 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition">
          Continue to Booth Details
        </button>
      </div>
    </div>
  );
}

export default function BasicInfoPage() {
  const router = useRouter();
  const [formData, setFormData] = useState<BasicInfo>({
    title: 'Mr',
    firstName: '',
    lastName: '',
    designation: '',
    mobile: '',
    email: '',
    companyName: '',
    businessNature: '',
    gstNumber: '',
    panNumber: '',
    website: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic validation
    if (!formData.firstName || !formData.lastName || !formData.email || !formData.mobile || !formData.companyName) {
      alert('Please fill all required fields');
      return;
    }
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (!/^\d{10}$/.test(formData.mobile.replace(/\D/g, ''))) {
      alert('Please enter a valid 10-digit mobile number');
      return;
    }
    setSubmitted(true);
  };

  const handleBack = () => {
    router.push('/dashboard/requirements');
  };

  if (submitted) return <SuccessPage onBack={handleBack} />;

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 text-gray-500 hover:text-gray-700 rounded-lg transition">
          <ArrowLeftIcon className="h-5 w-5" />
        </button>
        <div className="h-12 w-12 bg-blue-100 rounded-xl flex items-center justify-center">
          <UserIcon className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Basic Information</h1>
          <p className="text-gray-500 text-sm">REQUIRED - Company and contact details</p>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Personal Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <UserIcon className="h-5 w-5 text-blue-500" />
            Personal Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <select
                name="title"
                value={formData.title}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
              >
                <option value="Mr">Mr.</option>
                <option value="Mrs">Mrs.</option>
                <option value="Ms">Ms.</option>
                <option value="Dr">Dr.</option>
                <option value="Prof">Prof.</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name *</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Enter first name"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name *</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Enter last name"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
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
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="9876543210"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address *</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="company@email.com"
                required
              />
            </div>
          </div>
        </div>

        {/* Company Details */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
            <BuildingOfficeIcon className="h-5 w-5 text-green-500" />
            Company Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Company Name *</label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="Enter company name"
                required
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Nature of Business *</label>
              <textarea
                name="businessNature"
                value={formData.businessNature}
                onChange={handleChange}
                rows={2}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="e.g., Tyre Manufacturing, Trading, Distribution, etc."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">GST Number</label>
              <input
                type="text"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="22AAAAA0000A1Z5"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PAN Number</label>
              <input
                type="text"
                name="panNumber"
                value={formData.panNumber}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="AAAAA1234A"
              />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-1">Website</label>
              <input
                type="url"
                name="website"
                value={formData.website}
                onChange={handleChange}
                className="w-full px-4 py-2.5 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500"
                placeholder="https://www.company.com"
              />
            </div>
          </div>
        </div>

        {/* Info Box */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
          <div className="flex items-start gap-3">
            <div className="p-1.5 bg-blue-100 rounded-lg">
              <IdentificationIcon className="h-4 w-4 text-blue-600" />
            </div>
            <div>
              <p className="text-sm font-medium text-blue-800">Why we need this information?</p>
              <p className="text-xs text-blue-600 mt-0.5">
                This information will be used for your exhibitor profile, invoicing, and communication.
                GST and PAN are required for tax invoice generation.
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="button"
            onClick={() => router.push('/dashboard/requirements')}
            className="px-6 py-3 border border-gray-300 text-gray-600 font-semibold rounded-xl hover:bg-gray-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="flex-1 py-3 bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-600 transition"
          >
            Save & Continue
          </button>
        </div>
      </form>
    </div>
  );
}