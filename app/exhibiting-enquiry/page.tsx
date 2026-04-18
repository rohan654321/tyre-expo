// app/exhibiting-enquiry/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ExhibitingEnquiryPage() {
  const [formData, setFormData] = useState({
    interestLevel: "",
    firstName: "",
    lastName: "",
    companyName: "",
    companyWebsite: "",
    jobTitle: "",
    country: "",
    phone: "",
    workEmail: "",
    productSector: "",
    agreeToTerms: false,
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const target = e.target as HTMLInputElement;
      setFormData({ ...formData, [name]: target.checked });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setSubmitted(true);
  };

  const productSectors = [
    "Raw Materials & Rubber Compounds",
    "Tyre Manufacturing Machinery",
    "Rubber Processing Equipment",
    "Tyre Testing & Quality Control",
    "Retreading & Repair Materials",
    "Recycling & Sustainability Solutions",
    "Mold & Tooling Solutions",
    "Tyre Reinforcement Materials",
    "Additives & Performance Chemicals",
    "Automation & Industry 4.0",
    "Material Handling & Logistics",
    "Curing & Vulcanization Systems",
  ];

  if (submitted) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center py-20 pt-[120px] lg:pt-[140px]">
        <div className="container mx-auto px-4 max-w-2xl text-center">
          <div className="bg-white rounded-2xl shadow-xl p-10 border border-gray-100">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Thank You!</h2>
            <p className="text-gray-600 mb-6">
              Your enquiry has been submitted successfully. Our team will contact you shortly.
            </p>
            <Link
              href="/"
              className="inline-block bg-[#F08400] text-white px-8 py-3 rounded-md font-semibold hover:bg-black transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Mobile Header */}
      <div className="fixed left-0 top-0 z-50 w-full bg-black px-5 py-2 lg:hidden">
        <div className="flex justify-between">
          <Link href="/">
            <Image src="/imgs/logo-its.png" alt="ITS Tyre Expo" width={140} height={40} className="h-auto w-auto object-contain" />
          </Link>
          <button className="z-10" aria-label="Menu">
            <svg width="32" height="20" viewBox="0 0 32 20" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1.66667 20C0.746193 20 0 19.2538 0 18.3333C0 17.4129 0.746193 16.6667 1.66667 16.6667H30.3333C31.2538 16.6667 32 17.4129 32 18.3333C32 19.2538 31.2538 20 30.3333 20H1.66667ZM1.66667 11.6667C0.746193 11.6667 0 10.9205 0 10C0 9.07952 0.746192 8.33333 1.66667 8.33333H30.3333C31.2538 8.33333 32 9.07952 32 10C32 10.9205 31.2538 11.6667 30.3333 11.6667H1.66667ZM1.66667 3.33333C0.746193 3.33333 0 2.58714 0 1.66667C0 0.746192 0.746192 0 1.66667 0H30.3333C31.2538 0 32 0.746192 32 1.66667C32 2.58714 31.2538 3.33333 30.3333 3.33333H1.66667Z" fill="#F08400"></path>
            </svg>
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">
        <div className="container mx-auto px-4 max-w-6xl py-12">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column - Content */}
            <div>
              {/* Why Exhibit */}
              <div className="mb-10">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
                  Why <span className="text-[#F08400]">Exhibit?</span>
                </h2>
                <p className="text-gray-600 mb-5">
                  Showcase your solutions to senior buyers across the full tyre manufacturing value chain.
                </p>
                <p className="text-gray-800 font-semibold mb-4">
                  ITS Tyre Expo is the leading platform to:
                </p>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F08400] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Connect with decision-makers from 50+ countries</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F08400] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Launch new products to buyers actively sourcing equipment</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F08400] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Build relationships with procurement heads and engineers</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <svg className="w-5 h-5 text-[#F08400] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                    <span className="text-gray-700">Grow your presence in one of the world's fastest-growing tyre markets</span>
                  </li>
                </ul>
                <p className="text-gray-600 mt-4 italic">
                  With sustainability, automation, and digitalization fueling demand, ITS Tyre Expo is where global suppliers find their next growth opportunity.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-6 mb-10">
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold text-[#F08400]">8,500+</div>
                  <div className="text-gray-500 text-sm">Trade Visitors</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold text-[#F08400]">350+</div>
                  <div className="text-gray-500 text-sm">Exhibitors</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold text-[#F08400]">50+</div>
                  <div className="text-gray-500 text-sm">Visiting Countries</div>
                </div>
                <div className="text-center p-4 bg-gray-50 rounded-lg">
                  <div className="text-3xl md:text-4xl font-bold text-[#F08400]">10th</div>
                  <div className="text-gray-500 text-sm">Edition</div>
                </div>
              </div>

              {/* Who You'll Meet */}
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                  Who You'll <span className="text-[#F08400]">Meet:</span>
                </h2>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>Owners, CEOs, and Senior Executives</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>Plant Directors, Division Managers, and Procurement Heads</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>Tyre Manufacturing and Rubber Processing Engineers</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>Operations and Maintenance Specialists</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>IT and Automation Experts</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>Buyers sourcing machinery, spare parts, and digital solutions</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Right Column - Form */}
            <div>
              <div className="bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden">
                <div className="bg-[#F08400] px-6 py-4">
                  <h2 className="text-2xl font-bold text-white">Enquiry to Exhibit</h2>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                  {/* Interest Level */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Your level of interest <span className="text-[#F08400]">*</span>
                    </label>
                    <div className="space-y-2">
                      {["Ready to book my stand", "Looking for more information", "Looking for sponsorship opportunities"].map((option) => (
                        <label key={option} className="flex items-center gap-2 cursor-pointer">
                          <input
                            type="radio"
                            name="interestLevel"
                            value={option}
                            checked={formData.interestLevel === option}
                            onChange={handleChange}
                            className="w-4 h-4 text-[#F08400] focus:ring-[#F08400]"
                            required
                          />
                          <span className="text-gray-700 text-sm">{option}</span>
                        </label>
                      ))}
                    </div>
                  </div>

                  {/* First Name & Last Name - Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        First Name <span className="text-[#F08400]">*</span>
                      </label>
                      <input
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleChange}
                        placeholder="First name"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Last Name <span className="text-[#F08400]">*</span>
                      </label>
                      <input
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleChange}
                        placeholder="Last name"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Company Name */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Company Name <span className="text-[#F08400]">*</span>
                    </label>
                    <input
                      type="text"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleChange}
                      placeholder="Company name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm"
                      required
                    />
                  </div>

                  {/* Company Website */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Company Website <span className="text-[#F08400]">*</span>
                    </label>
                    <input
                      type="url"
                      name="companyWebsite"
                      value={formData.companyWebsite}
                      onChange={handleChange}
                      placeholder="www.yourcompany.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm"
                      required
                    />
                  </div>

                  {/* Job Title & Country - Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Job Title <span className="text-[#F08400]">*</span>
                      </label>
                      <input
                        type="text"
                        name="jobTitle"
                        value={formData.jobTitle}
                        onChange={handleChange}
                        placeholder="Job title"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Country <span className="text-[#F08400]">*</span>
                      </label>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        placeholder="Country"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Phone & Email - Row */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Phone <span className="text-[#F08400]">*</span>
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+1 234 567 8900"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm"
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1">
                        Work Email <span className="text-[#F08400]">*</span>
                      </label>
                      <input
                        type="email"
                        name="workEmail"
                        value={formData.workEmail}
                        onChange={handleChange}
                        placeholder="email@company.com"
                        className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm"
                        required
                      />
                    </div>
                  </div>

                  {/* Product Sector */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Product Sector <span className="text-[#F08400]">*</span>
                    </label>
                    <select
                      name="productSector"
                      value={formData.productSector}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[#F08400] focus:border-[#F08400] text-sm bg-white"
                      required
                    >
                      <option value="">Select a product sector</option>
                      {productSectors.map((sector) => (
                        <option key={sector} value={sector}>
                          {sector}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Verify Request */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Please verify your request <span className="text-[#F08400]">*</span>
                    </label>
                    <div className="flex items-center gap-2">
                      <input
                        type="checkbox"
                        name="agreeToTerms"
                        checked={formData.agreeToTerms}
                        onChange={handleChange}
                        className="w-4 h-4 text-[#F08400] focus:ring-[#F08400] rounded"
                        required
                      />
                      <span className="text-sm text-gray-600">I agree to fill out this form</span>
                    </div>
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full bg-[#F08400] hover:bg-black text-white font-semibold py-3 rounded-md transition-colors text-sm"
                  >
                    Submit Enquiry
                  </button>

                  {/* Terms */}
                  <p className="text-xs text-gray-400 text-center mt-4">
                    By submitting this form, you agree to receive marketing communications, 
                    updates, and promotional materials from us. You can unsubscribe anytime. 
                    For more information on how we handle your data, please refer to our Privacy Policy.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}