// app/exhibiting-enquiry/page.tsx
"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import BackToTop from "@/components/layout/BackToTop";
import PartnersSection from "@/components/home/PartnersSection";

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

const statsData = [
  { value: "8,500+", label: "Trade Visitors" },
  { value: "350+", label: "Exhibitors" },
  { value: "50+", label: "Visiting Countries" },
  { value: "10th", label: "Edition" },
];

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

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.interestLevel || !formData.firstName || !formData.lastName || !formData.companyName || 
        !formData.companyWebsite || !formData.jobTitle || !formData.country || !formData.phone || 
        !formData.workEmail || !formData.productSector) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    if (!formData.agreeToTerms) {
      setSubmitError('Please verify your request');
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
          <p className="text-gray-600 mb-6">Your enquiry has been submitted successfully. Our team will contact you shortly.</p>
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
                Become an Exhibitor
              </p>
              <h1 className="font-bebas font-bold text-[38px] lg:text-[48px] leading-[1.15] tracking-[1px] uppercase text-black">
                Exhibit at ITS Tyre Expo 2026
              </h1>
              
              {/* Why Exhibit */}
              <div>
                <h2 className="font-bebas text-2xl text-black mb-3">
                  Why <span className="text-[#F08400]">Exhibit?</span>
                </h2>
                <p className="text-gray-600 text-sm mb-4">
                  Showcase your solutions to senior buyers across the full tyre manufacturing value chain.
                </p>
                <p className="text-gray-800 font-semibold text-sm mb-3">
                  ITS Tyre Expo is the leading platform to:
                </p>
                <ul className="space-y-2">
                  {[
                    "Connect with decision-makers from 50+ countries",
                    "Launch new products to buyers actively sourcing equipment",
                    "Build relationships with procurement heads and engineers",
                    "Grow your presence in one of the world's fastest-growing tyre markets"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <svg className="w-4 h-4 text-[#F08400] mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="text-gray-500 text-xs mt-3 italic">
                  With sustainability, automation, and digitalization fueling demand, 
                  ITS Tyre Expo is where global suppliers find their next growth opportunity.
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 border-t border-b border-gray-200 py-5">
                {statsData.map((stat, idx) => (
                  <div key={idx}>
                    <h3 className="text-[#F08400] text-2xl lg:text-3xl font-bold font-bebas">
                      {stat.value}
                    </h3>
                    <p className="text-xs text-gray-500">{stat.label}</p>
                  </div>
                ))}
              </div>

              {/* Who You'll Meet */}
              <div>
                <h2 className="font-bebas text-2xl text-black mb-3">
                  Who You'll <span className="text-[#F08400]">Meet:</span>
                </h2>
                <ul className="space-y-1.5">
                  {[
                    "Owners, CEOs, and Senior Executives",
                    "Plant Directors, Division Managers, and Procurement Heads",
                    "Tyre Manufacturing and Rubber Processing Engineers",
                    "Operations and Maintenance Specialists",
                    "IT and Automation Experts",
                    "Buyers sourcing machinery, spare parts, and digital solutions"
                  ].map((item, idx) => (
                    <li key={idx} className="flex items-start gap-2">
                      <span className="text-[#F08400] text-sm">•</span>
                      <span className="text-gray-600 text-sm">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* RIGHT SECTION - Form */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-8">
              <h2 className="text-[#F08400] font-bold text-2xl mb-6 font-bebas">
                Enquiry to Exhibit
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Interest Level */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Your level of interest <span className="text-red-500">*</span>
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

                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Company Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    value={formData.companyName}
                    onChange={handleChange}
                    placeholder="Company name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                    required
                  />
                </div>

                {/* Company Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="url"
                    name="companyWebsite"
                    value={formData.companyWebsite}
                    onChange={handleChange}
                    placeholder="www.yourcompany.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                    required
                  />
                </div>

                {/* Job Title & Country */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Job Title <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="jobTitle"
                      value={formData.jobTitle}
                      onChange={handleChange}
                      placeholder="Job title"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="text"
                      name="country"
                      value={formData.country}
                      onChange={handleChange}
                      placeholder="Country"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="+1 234 567 8900"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="email"
                      name="workEmail"
                      value={formData.workEmail}
                      onChange={handleChange}
                      placeholder="email@company.com"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                      required
                    />
                  </div>
                </div>

                {/* Product Sector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Sector <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="productSector"
                    value={formData.productSector}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
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
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Please verify your request <span className="text-red-500">*</span>
                  </label>
                  <div className="flex items-center gap-2">
                    <input
                      type="checkbox"
                      name="agreeToTerms"
                      checked={formData.agreeToTerms}
                      onChange={handleChange}
                      className="w-4 h-4 text-[#F08400] focus:ring-[#F08400] rounded border-gray-300"
                      required
                    />
                    <span className="text-sm text-gray-600">I agree to fill out this form</span>
                  </div>
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
                  {isSubmitting ? 'Submitting...' : 'Submit Enquiry'}
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  By submitting this form, you agree to receive marketing communications, 
                  updates, and promotional materials from us. You can unsubscribe anytime. 
                  For more information on how we handle your data, please refer to our 
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