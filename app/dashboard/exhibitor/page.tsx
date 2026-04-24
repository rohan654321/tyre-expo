'use client';

import { useState } from 'react';
import {
  BuildingStorefrontIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  PencilIcon,
  CheckCircleIcon,
  XMarkIcon,
  IdentificationIcon,
  CalendarIcon,
  UsersIcon,
} from '@heroicons/react/24/outline';
import DocumentTextIcon from '@heroicons/react/24/solid/DocumentTextIcon';

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    companyName: 'TyreTech Industries',
    shortName: 'TTI',
    registrationNumber: 'U25100MH2020PTC123456',
    yearEstablished: '2010',
    companySize: '51-200',
    companyType: 'Private Limited',
    gstNumber: '27AAACA1234A1Z',
    contactPerson: 'Rajesh Kumar',
    designation: 'Exhibition Manager',
    email: 'rajesh@tyretech.com',
    phone: '+91 98765 43210',
    alternatePhone: '+91 98765 43211',
    address: '401, Trade Center, Andheri East, Mumbai - 400093',
    website: 'www.tyretech.com',
    businessNature: 'Tyre Manufacturing & Export',
    description: 'Leading manufacturer of high-quality tyres for commercial and passenger vehicles.',
  });

  const handleSave = () => {
    setIsEditing(false);
    // In real app, save to API
    alert('Profile saved successfully!');
  };

  const InfoRow = ({ label, value, icon: Icon, field }: any) => (
    <div className="border-b border-gray-100 pb-3">
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      {isEditing ? (
        <input
          type="text"
          value={value}
          onChange={(e) => setProfile({ ...profile, [field]: e.target.value })}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      ) : (
        <p className="text-gray-800 font-medium">{value || 'Not provided'}</p>
      )}
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <div className="h-12 w-12 bg-gradient-to-r from-amber-500 to-orange-500 rounded-xl flex items-center justify-center">
            <BuildingStorefrontIcon className="h-6 w-6 text-white" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
            <p className="text-gray-500 text-sm">Manage your exhibitor information</p>
          </div>
        </div>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="inline-flex items-center gap-2 px-4 py-2 bg-amber-500 text-white rounded-lg hover:bg-amber-600 transition"
          >
            <PencilIcon className="h-4 w-4" />
            Edit Profile
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>

      {/* Profile Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Info */}
        <div className="lg:col-span-2 space-y-6">
          {/* Company Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BuildingStorefrontIcon className="h-5 w-5 text-amber-500" />
              Company Information
            </h2>
            <div className="space-y-4">
              <InfoRow label="Company Name" value={profile.companyName} icon={BuildingStorefrontIcon} field="companyName" />
              <InfoRow label="Short Name" value={profile.shortName} icon={IdentificationIcon} field="shortName" />
              <InfoRow label="Registration Number" value={profile.registrationNumber} icon={DocumentTextIcon} field="registrationNumber" />
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Year Established" value={profile.yearEstablished} icon={CalendarIcon} field="yearEstablished" />
                <InfoRow label="Company Size" value={profile.companySize} icon={UsersIcon} field="companySize" />
              </div>
              <InfoRow label="Company Type" value={profile.companyType} icon={BuildingStorefrontIcon} field="companyType" />
              <InfoRow label="GST Number" value={profile.gstNumber} icon={DocumentTextIcon} field="gstNumber" />
              <InfoRow label="Nature of Business" value={profile.businessNature} icon={BuildingStorefrontIcon} field="businessNature" />
            </div>
          </div>

          {/* About Company */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">About Company</h2>
            {isEditing ? (
              <textarea
                value={profile.description}
                onChange={(e) => setProfile({ ...profile, description: e.target.value })}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{profile.description}</p>
            )}
          </div>
        </div>

        {/* Sidebar Info */}
        <div className="space-y-6">
          {/* Contact Information */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-amber-500" />
              Contact Person
            </h2>
            <div className="space-y-4">
              <InfoRow label="Contact Person" value={profile.contactPerson} icon={UserIcon} field="contactPerson" />
              <InfoRow label="Designation" value={profile.designation} icon={IdentificationIcon} field="designation" />
              <InfoRow label="Email" value={profile.email} icon={EnvelopeIcon} field="email" />
              <InfoRow label="Phone" value={profile.phone} icon={PhoneIcon} field="phone" />
              <InfoRow label="Alternate Phone" value={profile.alternatePhone} icon={PhoneIcon} field="alternatePhone" />
            </div>
          </div>

          {/* Address & Website */}
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-amber-500" />
              Location
            </h2>
            <InfoRow label="Address" value={profile.address} icon={MapPinIcon} field="address" />
            <div className="mt-4">
              <InfoRow label="Website" value={profile.website} icon={GlobeAltIcon} field="website" />
            </div>
          </div>

          {/* Status Badge */}
          <div className="bg-green-50 border border-green-200 rounded-2xl p-5">
            <div className="flex items-center gap-3">
              <CheckCircleIcon className="h-8 w-8 text-green-500" />
              <div>
                <p className="font-semibold text-green-800">Profile Verified</p>
                <p className="text-sm text-green-600">Your company profile is active</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}