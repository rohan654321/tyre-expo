'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { EyeIcon, EyeSlashIcon, ArrowPathIcon } from '@heroicons/react/24/outline';

export default function RegisterPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  const [formData, setFormData] = useState({
    companyName: '',
    shortName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    contactPerson: '',
    designation: '',
    businessType: '',
    gstNumber: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateStep1 = () => {
    if (!formData.companyName) return 'Company name is required';
    if (!formData.email) return 'Email is required';
    if (!formData.phone) return 'Phone number is required';
    if (!formData.contactPerson) return 'Contact person name is required';
    if (!/^\S+@\S+\.\S+$/.test(formData.email)) return 'Please enter a valid email';
    return null;
  };

  const validateStep2 = () => {
    if (!formData.password) return 'Password is required';
    if (formData.password.length < 6) return 'Password must be at least 6 characters';
    if (formData.password !== formData.confirmPassword) return 'Passwords do not match';
    return null;
  };

  const handleNext = () => {
    const validationError = validateStep1();
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const validationError = validateStep2();
    if (validationError) {
      setError(validationError);
      return;
    }
    
    setError('');
    setLoading(true);

    // Simulate API call
    setTimeout(() => {
      localStorage.setItem('tyre_expo_token', 'mock_token_123');
      localStorage.setItem('tyre_exhibitor_data', JSON.stringify({
        id: '1',
        company: formData.companyName,
        email: formData.email,
        name: formData.contactPerson,
        phone: formData.phone,
        boothNumber: 'TBD'
      }));
      router.push('/dashboard');
      setLoading(false);
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 flex items-center justify-center px-4 py-8">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-amber-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-orange-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-1000"></div>
      </div>

      <div className="relative w-full max-w-2xl">
        <div className="bg-white/10 backdrop-blur-xl rounded-2xl shadow-2xl border border-white/20 p-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-amber-500 to-orange-500 rounded-2xl shadow-lg mb-4">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <circle cx="12" cy="12" r="10" strokeWidth="1.5" />
                <circle cx="12" cy="12" r="4" strokeWidth="1.5" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-white">Register for Tyre Expo 2024</h2>
            <p className="text-gray-300 mt-2">Create your exhibitor account</p>
          </div>

          {/* Steps Indicator */}
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-4">
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 1 ? 'bg-amber-500 text-white' : 'bg-white/20 text-gray-400'
                }`}>
                  1
                </div>
                <span className="text-xs text-gray-400 mt-1">Company Info</span>
              </div>
              <div className={`w-16 h-0.5 ${step >= 2 ? 'bg-amber-500' : 'bg-white/20'}`}></div>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                  step >= 2 ? 'bg-amber-500 text-white' : 'bg-white/20 text-gray-400'
                }`}>
                  2
                </div>
                <span className="text-xs text-gray-400 mt-1">Security</span>
              </div>
            </div>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 rounded-lg">
              <p className="text-red-200 text-sm text-center">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit}>
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Company Name *
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., TyreTech Industries"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Short Name/Acronym
                  </label>
                  <input
                    type="text"
                    name="shortName"
                    value={formData.shortName}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                    placeholder="e.g., TTI"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="company@email.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="+91 98765 43210"
                      required
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Contact Person *
                    </label>
                    <input
                      type="text"
                      name="contactPerson"
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Full name"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Designation
                    </label>
                    <input
                      type="text"
                      name="designation"
                      value={formData.designation}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="Manager"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      Business Type
                    </label>
                    <select
                      name="businessType"
                      value={formData.businessType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-amber-500"
                    >
                      <option value="">Select</option>
                      <option value="Manufacturer">Manufacturer</option>
                      <option value="Distributor">Distributor</option>
                      <option value="Retailer">Retailer</option>
                      <option value="Exporter">Exporter</option>
                      <option value="Importer">Importer</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-200 mb-2">
                      GST Number
                    </label>
                    <input                      type="text"
                      name="gstNumber"
                      value={formData.gstNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500"
                      placeholder="22AAAAA0000A1Z5"
                    />
                  </div>
                </div>
              </div>
            )}

            {step === 2 && (
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12"
                      placeholder="Create a password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                  <p className="text-xs text-gray-400 mt-1">Minimum 6 characters</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-200 mb-2">
                    Confirm Password *
                  </label>
                  <div className="relative">
                    <input
                      type={showConfirmPassword ? 'text' : 'password'}
                      name="confirmPassword"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-amber-500 pr-12"
                      placeholder="Confirm your password"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-200"
                    >
                      {showConfirmPassword ? <EyeSlashIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
                    </button>
                  </div>
                </div>
              </div>
            )}

            <div className="flex gap-4 mt-8">
              {step === 2 && (
                <button
                  type="button"
                  onClick={handleBack}
                  className="flex-1 py-3 border border-white/20 text-white font-semibold rounded-xl hover:bg-white/10 transition"
                >
                  Back
                </button>
              )}
              
              {step === 1 ? (
                <button
                  type="button"
                  onClick={handleNext}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={loading}
                  className="flex-1 py-3 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-semibold rounded-xl hover:from-amber-600 hover:to-orange-600 transition disabled:opacity-50"
                >
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <ArrowPathIcon className="h-5 w-5 animate-spin" />
                      Registering...
                    </span>
                  ) : (
                    'Register Now'
                  )}
                </button>
              )}
            </div>
          </form>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-400">
              Already have an account?{' '}
              <Link href="/login" className="text-amber-400 hover:text-amber-300">
                Login here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}