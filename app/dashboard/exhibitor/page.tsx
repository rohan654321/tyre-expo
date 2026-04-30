'use client';

import { useState, useEffect, ChangeEvent, useCallback } from 'react';
import {
  BuildingStorefrontIcon,
  UserIcon,
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  GlobeAltIcon,
  PencilIcon,
  CheckCircleIcon,
  IdentificationIcon,
  CalendarIcon,
  UsersIcon,
  PhotoIcon,
  ArrowUpTrayIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';

import { profileAPI } from '@/lib/api/exhibitorClient';
import toast from 'react-hot-toast';

interface ProfileFormData {
  id?: string;
  name: string;
  email: string;
  phone: string;
  company: string;
  boothNumber?: string;
  status?: string;
  shortName: string;
  registrationNumber: string;
  yearEstablished: string;
  companySize: string;
  companyType: string;
  gstNumber: string;
  contactPersonName: string;
  contactPersonJobTitle: string;
  alternatePhone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  country: string;
  website: string;
  businessNature: string;
  description: string;
  logoUrl: string;
}

export default function CompanyProfilePage() {
  const [isEditing, setIsEditing] = useState(false);
  const [isUploading, setIsUploading] = useState(false);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profile, setProfile] = useState<ProfileFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    shortName: '',
    registrationNumber: '',
    yearEstablished: '',
    companySize: '',
    companyType: '',
    gstNumber: '',
    contactPersonName: '',
    contactPersonJobTitle: '',
    alternatePhone: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    country: '',
    website: '',
    businessNature: '',
    description: '',
    logoUrl: '',
  });

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const result = await profileAPI.get();
      console.log('Fetched profile:', result);

      if (result.success && result.data) {
        const data = result.data;

        setProfile({
          id: data.id,
          name: data.name || '',
          email: data.email || '',
          phone: data.phone || '',
          company: data.company || '',
          boothNumber: data.boothNumber || '',
          status: data.status || '',
          shortName: data.shortName || '',
          registrationNumber: data.registrationNumber || '',
          yearEstablished: data.yearEstablished || '',
          companySize: data.companySize || '',
          companyType: data.companyType || '',
          gstNumber: data.gstNumber || '',
          contactPersonName: data.contactPersonName || data.name || '',
          contactPersonJobTitle: data.contactPersonJobTitle || '',
          alternatePhone: data.alternatePhone || '',
          address: typeof data.address === 'string' ? data.address : (data.address as any)?.street || '',
          city: data.city || '',
          state: data.state || '',
          pincode: data.pincode || '',
          country: data.country || '',
          website: data.website || '',
          businessNature: data.businessNature || '',
          description: data.description || '',
          logoUrl: data.logoUrl || '',
        });
      }
    } catch (error) {
      console.error('Error fetching profile:', error);
      toast.error('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  const handleLogoUpload = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error('Please upload an image file');
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      toast.error('File size should be less than 2MB');
      return;
    }

    setIsUploading(true);
    try {
      const result = await profileAPI.uploadLogo(file);
      console.log('Upload result:', result);

      if (result.success && result.data) {
        setProfile(prev => ({ ...prev, logoUrl: result.data.logoUrl }));
        toast.success('Logo uploaded successfully!');
        await fetchProfile();
      } else {
        toast.error(result.error || 'Failed to upload logo');
      }
    } catch (error: any) {
      console.error('Error uploading logo:', error);
      toast.error(error.response?.data?.error || 'Failed to upload logo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDeleteLogo = async () => {
    if (!confirm('Are you sure you want to delete your company logo?')) {
      return;
    }

    setIsUploading(true);
    try {
      const result = await profileAPI.deleteLogo();

      if (result.success) {
        setProfile(prev => ({ ...prev, logoUrl: '' }));
        toast.success('Logo deleted successfully');
        await fetchProfile();
      } else {
        toast.error(result.error || 'Failed to delete logo');
      }
    } catch (error) {
      console.error('Error deleting logo:', error);
      toast.error('Failed to delete logo');
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    setSaving(true);

    const updateData = {
      name: profile.name,
      company: profile.company,
      phone: profile.phone,
      website: profile.website,
      description: profile.description,
      address: profile.address,
      metadata: {
        shortName: profile.shortName,
        registrationNumber: profile.registrationNumber,
        yearEstablished: profile.yearEstablished,
        companySize: profile.companySize,
        companyType: profile.companyType,
        gstNumber: profile.gstNumber,
        businessNature: profile.businessNature,
        contactPersonName: profile.contactPersonName,
        contactPersonJobTitle: profile.contactPersonJobTitle,
        alternatePhone: profile.alternatePhone,
        city: profile.city,
        state: profile.state,
        pincode: profile.pincode,
        country: profile.country,
      }
    };

    console.log('Updating profile with:', updateData);

    try {
      const result = await profileAPI.update(updateData);
      console.log('Update response:', result);

      if (result.success) {
        toast.success('Profile saved successfully!');
        setIsEditing(false);
        await fetchProfile();
      } else {
        toast.error(result.error || 'Failed to save profile');
      }
    } catch (error: any) {
      console.error('Error saving profile:', error);
      toast.error(error.response?.data?.error || error.message || 'Failed to save profile');
    } finally {
      setSaving(false);
    }
  };

  const handleFieldChange = useCallback((field: keyof ProfileFormData, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  }, []);

  const InfoRow = ({ label, value, icon: Icon, field, type = 'text', placeholder = '' }: {
    label: string;
    value: string;
    icon: React.ComponentType<{ className?: string }>;
    field: keyof ProfileFormData;
    type?: string;
    placeholder?: string;
  }) => (
    <div className="border-b border-gray-100 pb-3">
      <div className="flex items-center gap-2 text-gray-500 text-sm mb-1">
        <Icon className="h-4 w-4" />
        <span>{label}</span>
      </div>
      {isEditing ? (
        <input
          type={type}
          value={value || ''}
          onChange={(e) => handleFieldChange(field, e.target.value)}
          placeholder={placeholder}
          className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500 focus:border-amber-500"
        />
      ) : (
        <p className="text-gray-800 font-medium">{value && value.trim() ? value : 'Not provided'}</p>
      )}
    </div>
  );

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-500"></div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Company Profile</h1>
          <p className="text-gray-500 text-sm">Manage your exhibitor information</p>
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
              onClick={() => {
                setIsEditing(false);
                fetchProfile();
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition"
              disabled={saving}
            >
              Cancel
            </button>
            <button
              onClick={handleSave}
              disabled={saving}
              className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        )}
      </div>

      {/* Basic Info Card */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-6 mb-6 border border-blue-100">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">{profile.name}</h2>
            <p className="text-gray-600">{profile.company}</p>
            {profile.boothNumber && (
              <span className="inline-block mt-2 px-3 py-1 bg-amber-100 text-amber-700 text-sm rounded-full">
                Booth #{profile.boothNumber}
              </span>
            )}
          </div>
          <div className="text-right">
            <span className={`inline-block px-3 py-1 rounded-full text-sm ${profile.status === 'active' || profile.status === 'approved' ? 'bg-green-100 text-green-700' :
              profile.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                'bg-gray-100 text-gray-700'
              }`}>
              {profile.status === 'active' || profile.status === 'approved' ? 'Active' : profile.status || 'Pending'}
            </span>
          </div>
        </div>
      </div>

      {/* Logo Upload */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
          <PhotoIcon className="h-5 w-5 text-amber-500" />
          Company Logo
        </h2>
        <div className="flex items-center gap-6">
          <div className="relative">
            {profile.logoUrl ? (
              <div className="h-24 w-24 rounded-lg overflow-hidden bg-gray-100 border border-gray-200">
                <img src={profile.logoUrl} alt="Company Logo" className="h-full w-full object-cover" />
              </div>
            ) : (
              <div className="h-24 w-24 rounded-lg bg-gray-100 border border-gray-200 flex items-center justify-center">
                <BuildingStorefrontIcon className="h-12 w-12 text-gray-400" />
              </div>
            )}
            {isEditing && (
              <div className="absolute -bottom-2 -right-2 flex gap-1">
                <label className="cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <div className="bg-amber-500 text-white p-1.5 rounded-full hover:bg-amber-600 transition">
                    {isUploading ? (
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    ) : (
                      <ArrowUpTrayIcon className="h-4 w-4" />
                    )}
                  </div>
                </label>
                {profile.logoUrl && (
                  <button
                    onClick={handleDeleteLogo}
                    disabled={isUploading}
                    className="bg-red-500 text-white p-1.5 rounded-full hover:bg-red-600 transition"
                  >
                    <TrashIcon className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </div>
          <div>
            <p className="text-sm text-gray-600">Upload your company logo</p>
            <p className="text-xs text-gray-400 mt-1">PNG, JPG up to 2MB</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <BuildingStorefrontIcon className="h-5 w-5 text-amber-500" />
              Company Information
            </h2>
            <div className="space-y-4">
              <InfoRow label="Company Name" value={profile.company} icon={BuildingStorefrontIcon} field="company" placeholder="Enter company name" />
              <InfoRow label="Short Name" value={profile.shortName} icon={IdentificationIcon} field="shortName" placeholder="Enter short name" />
              <InfoRow label="Registration Number" value={profile.registrationNumber} icon={IdentificationIcon} field="registrationNumber" placeholder="Enter registration number" />
              <div className="grid grid-cols-2 gap-4">
                <InfoRow label="Year Established" value={profile.yearEstablished} icon={CalendarIcon} field="yearEstablished" placeholder="e.g., 2000" />
                <InfoRow label="Company Size" value={profile.companySize} icon={UsersIcon} field="companySize" placeholder="e.g., 50-100 employees" />
              </div>
              <InfoRow label="Company Type" value={profile.companyType} icon={BuildingStorefrontIcon} field="companyType" placeholder="e.g., Private Limited" />
              <InfoRow label="GST Number" value={profile.gstNumber} icon={IdentificationIcon} field="gstNumber" placeholder="Enter GST number" />
              <InfoRow label="Nature of Business" value={profile.businessNature} icon={BuildingStorefrontIcon} field="businessNature" placeholder="e.g., Manufacturing, Trading" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-3">About Company</h2>
            {isEditing ? (
              <textarea
                value={profile.description}
                onChange={(e) => handleFieldChange('description', e.target.value)}
                rows={4}
                className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-amber-500"
                placeholder="Tell us about your company..."
              />
            ) : (
              <p className="text-gray-600 leading-relaxed">{profile.description || 'No description provided'}</p>
            )}
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <UserIcon className="h-5 w-5 text-amber-500" />
              Contact Person
            </h2>
            <div className="space-y-4">
              <InfoRow label="Name" value={profile.contactPersonName || profile.name} icon={UserIcon} field="contactPersonName" placeholder="Contact person name" />
              <InfoRow label="Designation" value={profile.contactPersonJobTitle} icon={IdentificationIcon} field="contactPersonJobTitle" placeholder="e.g., Manager" />
              <InfoRow label="Email" value={profile.email} icon={EnvelopeIcon} field="email" type="email" placeholder="Email address" />
              <InfoRow label="Phone" value={profile.phone} icon={PhoneIcon} field="phone" placeholder="Phone number" />
              <InfoRow label="Alternate Phone" value={profile.alternatePhone} icon={PhoneIcon} field="alternatePhone" placeholder="Alternate phone" />
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
            <h2 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
              <MapPinIcon className="h-5 w-5 text-amber-500" />
              Location & Web
            </h2>
            <InfoRow label="Address" value={profile.address} icon={MapPinIcon} field="address" placeholder="Street address" />
            <div className="mt-3">
              <InfoRow label="City" value={profile.city} icon={MapPinIcon} field="city" placeholder="City" />
            </div>
            <div className="grid grid-cols-2 gap-3 mt-3">
              <InfoRow label="State" value={profile.state} icon={MapPinIcon} field="state" placeholder="State" />
              <InfoRow label="Pincode" value={profile.pincode} icon={MapPinIcon} field="pincode" placeholder="Postal code" />
            </div>
            <div className="mt-3">
              <InfoRow label="Country" value={profile.country} icon={MapPinIcon} field="country" placeholder="Country" />
            </div>
            <div className="mt-3">
              <InfoRow label="Website" value={profile.website} icon={GlobeAltIcon} field="website" placeholder="https://..." />
            </div>
          </div>

          <div className={`rounded-2xl p-5 ${profile.status === 'active' || profile.status === 'approved' ? 'bg-green-50 border border-green-200' :
            profile.status === 'pending' ? 'bg-yellow-50 border border-yellow-200' :
              'bg-gray-50 border border-gray-200'
            }`}>
            <div className="flex items-center gap-3">
              <CheckCircleIcon className={`h-8 w-8 ${profile.status === 'active' || profile.status === 'approved' ? 'text-green-500' :
                profile.status === 'pending' ? 'text-yellow-500' :
                  'text-gray-500'
                }`} />
              <div>
                <p className={`font-semibold ${profile.status === 'active' || profile.status === 'approved' ? 'text-green-800' :
                  profile.status === 'pending' ? 'text-yellow-800' :
                    'text-gray-800'
                  }`}>
                  Profile {profile.status === 'active' || profile.status === 'approved' ? 'Active' : profile.status === 'pending' ? 'Pending Review' : 'Incomplete'}
                </p>
                <p className={`text-sm ${profile.status === 'active' || profile.status === 'approved' ? 'text-green-600' :
                  profile.status === 'pending' ? 'text-yellow-600' :
                    'text-gray-600'
                  }`}>
                  {profile.status === 'active' || profile.status === 'approved'
                    ? 'Your company profile is active and visible'
                    : profile.status === 'pending'
                      ? 'Your profile is awaiting admin approval'
                      : 'Complete your profile to get approved'}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}