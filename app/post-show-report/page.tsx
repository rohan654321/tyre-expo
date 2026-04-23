// app/post-show-report/page.tsx
"use client";

import BackToTop from "@/components/layout/BackToTop";
import Image from "next/image";
import { useState } from "react";

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
      <label className="block mb-1 text-gray-700 font-medium">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        required={required}
        className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400 transition-colors"
      />
    </div>
  );
}

// Reusable Select Component
function Select({ label, required, value, onChange, name, options = [] }: SelectProps) {
  return (
    <div>
      <label className="block mb-1 text-gray-700 font-medium">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <select
        name={name}
        value={value}
        onChange={onChange}
        required={required}
        className="w-full border border-gray-300 rounded px-3 py-2 bg-white focus:outline-none focus:ring-1 focus:ring-orange-400 focus:border-orange-400"
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
      <label className="block mb-2 font-medium text-gray-700">
        {label} {required && <span className="text-orange-500">*</span>}
      </label>
      <div className="space-y-2 max-h-40 overflow-y-auto border border-gray-300 p-3 rounded bg-white">
        {options.map((option) => (
          <label key={option} className="flex items-start gap-2 cursor-pointer">
            <input
              type="checkbox"
              name={name}
              checked={selectedValues.includes(option)}
              onChange={() => handleCheckboxChange(option)}
              className="mt-0.5 w-4 h-4 text-orange-500 focus:ring-orange-500 rounded border-gray-300"
            />
            <span className="text-gray-700 text-sm">{option}</span>
          </label>
        ))}
      </div>
    </div>
  );
}

export default function ReportDownload() {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    alert("Form submitted successfully! Check console for data.");
  };

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

  return (
    <div className="bg-[#f5f5f5] min-h-screen py-16 px-6 lg:px-20">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* LEFT CONTENT */}
        <div>
          <h1 className="text-3xl lg:text-4xl font-bold text-black leading-tight">
            Download the MiningWorld <br />
            2025 Post-Show Report
          </h1>

          <p className="text-gray-600 mt-4 max-w-lg text-sm">
            Gain a clear picture of the opportunities shaping Eurasia's mining industry.
            The MiningWorld Post-Show Report provides verified visitor and exhibitor data,
            event highlights, and insights to help you evaluate the market and plan your next move.
          </p>

          <div className="border-t border-gray-300 my-8"></div>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-y-6 gap-x-12">
            <div>
              <h2 className="text-orange-500 text-2xl font-bold">10,500+</h2>
              <p className="text-sm text-gray-600">Visitors</p>
            </div>
            <div>
              <h2 className="text-orange-500 text-2xl font-bold">550+</h2>
              <p className="text-sm text-gray-600">Exhibitors</p>
            </div>
            <div>
              <h2 className="text-orange-500 text-2xl font-bold">39</h2>
              <p className="text-sm text-gray-600">Visiting Countries</p>
            </div>
            <div>
              <h2 className="text-orange-500 text-2xl font-bold">30,200</h2>
              <p className="text-sm text-gray-600">SQM</p>
            </div>
          </div>

          <div className="border-t border-gray-300 my-8"></div>

          {/* WHY DOWNLOAD */}
          <div>
            <h3 className="font-semibold text-black mb-4">Why Download:</h3>
            <ul className="list-disc pl-5 space-y-3 text-gray-700 text-sm">
              <li>Evaluate audience quality and identify new growth opportunities.</li>
              <li>Benchmark the results you can expect by participating in 2026.</li>
              <li>See which sectors and solutions were most in demand in 2025.</li>
            </ul>
          </div>

          {/* IMAGE */} 
          <div className="mt-10">
            <Image
              src="/report-preview.png"
              alt="Report Preview"
              width={500}
              height={300}
              className="rounded-md shadow-md"
              onError={(e) => {
                (e.target as HTMLImageElement).style.display = "none";
              }}
            />
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white border border-gray-300 rounded-md p-6 shadow-sm">
          <h2 className="text-orange-500 font-semibold text-lg mb-6">
            Download the Post Show Report
          </h2>

          <form onSubmit={handleSubmit} className="space-y-4 text-sm">
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

            <CheckboxGroup
              label="Product Sector"
              options={productSectors}
              required
              selectedValues={formData.productSectors}
              onChange={handleCheckboxChange}
            />

            {/* CAPTCHA */}
            <div className="flex items-center gap-3 border border-gray-300 p-3 rounded bg-gray-50">
              <input
                type="checkbox"
                id="captcha"
                checked={formData.captcha}
                onChange={handleCaptchaChange}
                className="w-4 h-4 text-orange-500 focus:ring-orange-500 rounded"
                required
              />
              <label htmlFor="captcha" className="text-gray-600 text-sm">
                I'm not a robot
              </label>
            </div>

            {/* BUTTON */}
            <button
              type="submit"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded text-sm font-medium transition-colors"
            >
              SUBMIT
            </button>

            <p className="text-xs text-gray-500 text-center mt-3">
              By submitting, you agree to receive communications. You can unsubscribe anytime.
            </p>
          </form>
        </div>
      </div>
      <BackToTop/>
    </div>
  );
}