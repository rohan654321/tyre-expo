"use client";

import React, { useState } from "react";
import Link from "next/link";
import Container from "@/components/ui/container";
import BackToTop from "@/components/layout/BackToTop";
import PartnersSection from "@/components/home/PartnersSection";

const countries = [
  "Afghanistan", "Albania", "Algeria", "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan",
  "Bahrain", "Bangladesh", "Belarus", "Belgium", "Bolivia", "Botswana", "Brazil", "Bulgaria",
  "Canada", "Chile", "China", "Colombia", "Congo", "Croatia", "Czech Republic", "Denmark",
  "Ecuador", "Egypt", "Estonia", "Finland", "France", "Georgia", "Germany", "Ghana",
  "Greece", "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland",
  "Israel", "Italy", "Japan", "Jordan", "Kazakhstan", "Kenya", "Kuwait", "Kyrgyzstan",
  "Latvia", "Lebanon", "Lithuania", "Luxembourg", "Malaysia", "Mexico", "Mongolia", "Morocco",
  "Netherlands", "New Zealand", "Nigeria", "Norway", "Oman", "Pakistan", "Peru", "Philippines",
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Saudi Arabia", "Serbia", "Singapore",
  "Slovakia", "Slovenia", "South Africa", "South Korea", "Spain", "Sri Lanka", "Sudan", "Sweden",
  "Switzerland", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Turkey", "Turkmenistan", "Ukraine",
  "United Arab Emirates", "United Kingdom", "United States", "Uruguay", "Uzbekistan", "Vietnam", "Zambia", "Zimbabwe"
];

export default function InsightsPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    country: "",
    workEmail: "",
    confirmRequest: false,
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
    if (!formData.companyName || !formData.jobTitle || !formData.country || !formData.workEmail) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    if (!formData.confirmRequest) {
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

  // ✅ SUCCESS SCREEN
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
          <p className="text-gray-600 mb-6">Your report has been sent to your email address.</p>
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
            
            {/* LEFT SECTION */}
            <div className="flex flex-col gap-6 sticky top-24 h-fit">
              <p className="text-[#F08400] font-sans text-[14px] font-semibold uppercase tracking-[1.5px]">
                Explore Insights
              </p>
              
              <h1 className="font-bebas font-bold text-[38px] lg:text-[48px] leading-[1.15] tracking-[1px] uppercase text-black">
                UNLOCK EXPORT OPPORTUNITIES IN THE{" "}
                <span className="text-[#F08400]">CIS REGION</span>
              </h1>

              <p className="text-gray-600 text-base">
                With growing demand for innovative products and reliable suppliers,
                the CIS region is becoming a key player in global trade.
              </p>

              {/* Features */}
              <div className="space-y-5 mt-4">
                {[
                  {
                    title: "COMPREHENSIVE MARKET INSIGHTS",
                    desc: "Gain detailed analysis of CIS economies, emerging sectors, and export opportunities tailored for suppliers.",
                  },
                  {
                    title: "ACTIONABLE GROWTH STRATEGIES",
                    desc: "Explore proven methods to expand your exports and establish a strong foothold in a region.",
                  },
                  {
                    title: "EXCLUSIVE REGIONAL DATA",
                    desc: "Access key statistics, trends, and forecasts across the CIS region.",
                  },
                ].map((item, i) => (
                  <div key={i} className="flex gap-3">
                    <div className="w-6 h-6 rounded-full bg-[#F08400]/10 flex items-center justify-center text-[#F08400] text-xs font-bold mt-0.5">
                      ✓
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-black mb-1">
                        {item.title}
                      </h4>
                      <p className="text-sm text-gray-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT SECTION - FORM */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-8">
              <h3 className="text-[#F08400] text-center font-semibold mb-2 text-sm uppercase tracking-wide">
                One Step Closer to Unlocking Market Insights
              </h3>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="companyName"
                    placeholder="Type your Company Name"
                    value={formData.companyName}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    placeholder="Type your Job Title"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                    required
                  >
                    <option value="">Select your country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    placeholder="Type your email"
                    value={formData.workEmail}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white text-sm"
                    required
                  />
                </div>

                {/* Fake Captcha */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    name="confirmRequest"
                    checked={formData.confirmRequest}
                    onChange={handleChange}
                    className="w-4 h-4 text-[#F08400] rounded border-gray-300 focus:ring-[#F08400]"
                    required
                  />
                  <span className="text-sm text-gray-700">I'm not a robot</span>
                </div>

                {/* Error Message */}
                {submitError && (
                  <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                    <p className="text-red-600 text-sm text-center">{submitError}</p>
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F08400] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit'}
                </button>

                <p className="text-xs text-gray-500 text-center mt-4">
                  T&C: By submitting this form, you agree to receive marketing communications, 
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