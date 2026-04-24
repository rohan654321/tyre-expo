// app/post-show-report/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import BackToTop from "@/components/layout/BackToTop";
import PartnersSection from "@/components/home/PartnersSection";

// Type definitions for components
interface InputProps {
  label: string;
  placeholder?: string;
  required?: boolean;
  type?: string;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  name?: string;
}

interface SelectProps {
  label: string;
  required?: boolean;
  value?: string;
  onChange?: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  name?: string;
  options?: { value: string; label: string }[];
}

interface CheckboxGroupProps {
  label: string;
  options: string[];
  required?: boolean;
  selectedValues?: string[];
  onChange?: (values: string[]) => void;
  name?: string;
}

// Reusable Input Component
function Input({ label, placeholder, required, type = "text", value, onChange, name }: InputProps) {
  return (
    <div>
      <label className="block mb-1 text-gray-700 font-medium text-sm">
        {label} {required && <span className="text-[#F08400]">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
      />
    </div>
  );
}

// Reusable Select Component
function Select({ label, required, value, onChange, name, options = [] }: SelectProps) {
  return (
    <div>
      <label className="block mb-1 text-gray-700 font-medium text-sm">
        {label} {required && <span className="text-[#F08400]">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
      >
        <option value="">Select {label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

// Reusable CheckboxGroup Component
function CheckboxGroup({ label, options, required, selectedValues = [], onChange, name }: CheckboxGroupProps) {
  const handleCheckboxChange = (option: string) => {
    const newSelectedValues = selectedValues.includes(option)
      ? selectedValues.filter((v) => v !== option)
      : [...selectedValues, option];
    onChange?.(newSelectedValues);
  };

  return (
    <div>
      <label className="block mb-2 font-medium text-gray-700 text-sm">
        {label} {required && <span className="text-[#F08400]">*</span>}
      </label>
      <div className="max-h-48 overflow-y-auto border border-gray-300 rounded-lg p-3 bg-white">
        <div className="grid grid-cols-1 gap-2">
          {options.map((option) => (
            <label key={option} className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
              <input
                type="checkbox"
                name={name}
                checked={selectedValues.includes(option)}
                onChange={() => handleCheckboxChange(option)}
                className="mt-0.5 w-4 h-4 text-[#F08400] focus:ring-[#F08400] rounded border-gray-300"
              />
              <span className="text-gray-700 text-sm">{option}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

const productSectors = [
  "Mining Equipment and Machinery",
  "Crushing and Processing Equipment and Machinery",
  "Mining and Transportation Equipment and Machinery",
  "Exploration Equipment",
  "Spare Parts, Components and Consumables",
  "Miner Safety Equipment",
  "Power Supply Equipment for Mining Enterprises",
  "IT Technologies and Automation",
  "Laboratory Equipment",
  "Environmental Monitoring",
];

const countries = [
  "Afghanistan", "Armenia", "Azerbaijan", "Belarus", "China", "France",
  "Germany", "India", "Kazakhstan", "Kyrgyzstan", "Russia", "Tajikistan",
  "Turkmenistan", "United Kingdom", "United States", "Uzbekistan"
];

const sendSizes = ["Up to 100 sqm", "100-200 sqm", "200-500 sqm", "500+ sqm"];
const hearAboutOptions = ["Google", "LinkedIn", "Email", "Word of Mouth", "Conference", "Other"];

const statsData = [
  { value: "10,500+", label: "Visitors" },
  { value: "550+", label: "Exhibitors" },
  { value: "39", label: "Visiting Countries" },
  { value: "30,200", label: "SQM" },
];

export default function PostShowReportPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    jobTitle: "",
    country: "",
    phone: "",
    workEmail: "",
    preferredSendSize: "",
    howDidYouHear: "",
    productSectors: [] as string[],
    captcha: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleCheckboxChange = (sectors: string[]) => {
    setFormData((prev) => ({
      ...prev,
      productSectors: sectors,
    }));
  };

  const handleCaptchaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, captcha: e.target.checked });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.companyName || !formData.jobTitle || 
        !formData.country || !formData.phone || !formData.workEmail || !formData.preferredSendSize) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    if (!formData.captcha) {
      setSubmitError('Please verify that you are not a robot');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    // Simulate API call
    setTimeout(() => {
      console.log("Form submitted:", formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);
    }, 1500);
  };

  if (submitSuccess) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-20">
        <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">Your post-show report has been sent to your email address.</p>
          <Link href="/" className="inline-block bg-[#F08400] text-white px-6 py-2 rounded-lg hover:bg-black transition">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <section className="bg-white py-20">
        <Container>
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-12">
            
            {/* LEFT SECTION - Content */}
            <div className="flex flex-col gap-6 sticky top-24 h-fit">
              <p className="text-[#F08400] font-sans text-[14px] font-semibold uppercase tracking-[1.5px]">
                Post-Show Report
              </p>
              
              <h1 className="font-bebas font-bold text-[38px] lg:text-[48px] leading-[1.15] tracking-[1px] uppercase text-black">
                Download the MiningWorld <br />
                2025 <span className="text-[#F08400]">Post-Show Report</span>
              </h1>

              <p className="text-gray-600 text-base">
                Gain a clear picture of the opportunities shaping Eurasia's mining industry.
                The MiningWorld Post-Show Report provides verified visitor and exhibitor data,
                event highlights, and insights to help you evaluate the market and plan your next move.
              </p>

              <div className="border-t border-gray-200 my-2"></div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-6 py-4">
                {statsData.map((stat, idx) => (
                  <div key={idx}>
                    <h3 className="text-[#F08400] text-2xl lg:text-3xl font-bold font-bebas">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              <div className="border-t border-gray-200 my-2"></div>

              {/* WHY DOWNLOAD */}
              <div>
                <h3 className="font-semibold text-black text-lg mb-3">
                  Why Download:
                </h3>
                <ul className="space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400] text-sm">•</span>
                    <span className="text-gray-600 text-sm">Evaluate audience quality and identify new growth opportunities.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400] text-sm">•</span>
                    <span className="text-gray-600 text-sm">Benchmark the results you can expect by participating in 2026.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400] text-sm">•</span>
                    <span className="text-gray-600 text-sm">See which sectors and solutions were most in demand in 2025.</span>
                  </li>
                </ul>
              </div>

              {/* REPORT PREVIEW IMAGE */}
              <div className="mt-6">
                <div className="relative w-full h-48 rounded-lg overflow-hidden shadow-md border border-gray-200">
                  <Image
                    src="/report-preview.png"
                    alt="Report Preview"
                    fill
                    className="object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
              </div>
            </div>

            {/* RIGHT SECTION - Form */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-8">
              <h2 className="text-[#F08400] font-bold text-2xl mb-6 font-bebas">
                Download the Post Show Report
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="First Name"
                    placeholder="Type your first name"
                    required
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Last Name"
                    placeholder="Type your last name"
                    required
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />
                </div>

                <Input
                  label="Company Name"
                  placeholder="Type your company name"
                  required
                  name="companyName"
                  value={formData.companyName}
                  onChange={handleInputChange}
                />

                <Input
                  label="Company Website"
                  placeholder="https://yourcompany.com"
                  name="companyWebsite"
                  value={formData.companyWebsite}
                  onChange={handleInputChange}
                />

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Job Title"
                    placeholder="Type your job title"
                    required
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                  />
                  <Select
                    label="Country"
                    required
                    name="country"
                    value={formData.country}
                    onChange={handleInputChange}
                    options={countries.map(c => ({ value: c, label: c }))}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Input
                    label="Phone"
                    placeholder="+91 123-456-7890"
                    required
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <Input
                    label="Work Email"
                    placeholder="Type your email"
                    required
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Select
                    label="Preferred Stand Size"
                    required
                    name="preferredSendSize"
                    value={formData.preferredSendSize}
                    onChange={handleInputChange}
                    options={sendSizes.map(s => ({ value: s, label: s }))}
                  />
                  <Select
                    label="How Did You Hear About Us?"
                    name="howDidYouHear"
                    value={formData.howDidYouHear}
                    onChange={handleInputChange}
                    options={hearAboutOptions.map(h => ({ value: h, label: h }))}
                  />
                </div>

                <CheckboxGroup
                  label="Product Sector"
                  options={productSectors}
                  required
                  selectedValues={formData.productSectors}
                  onChange={handleCheckboxChange}
                />

                {/* CAPTCHA */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    id="captcha"
                    checked={formData.captcha}
                    onChange={handleCaptchaChange}
                    className="w-4 h-4 text-[#F08400] focus:ring-[#F08400] rounded border-gray-300"
                    required
                  />
                  <label htmlFor="captcha" className="text-gray-700 text-sm">
                    I'm not a robot
                  </label>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm text-center">{submitError}</p>
                  </div>
                )}

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F08400] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'SUBMIT'}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to receive marketing communications, 
                  updates, and promotional materials from us. You can unsubscribe anytime. 
                  For more information, please refer to our 
                  <Link href="/privacy-policy" className="text-[#F08400] hover:underline ml-1">Privacy Policy</Link>.
                </p>
              </form>
            </div>

          </div>
        </Container>
      </section>
      <PartnersSection />
      <BackToTop />
    </>
  );
}