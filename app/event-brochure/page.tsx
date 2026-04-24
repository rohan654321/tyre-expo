"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import Container from "@/components/ui/container";
import { Button } from "@/components/ui/button";
import BackToTop from "@/components/layout/BackToTop";
import PartnersSection from "@/components/home/PartnersSection";

const productSectors = [
  "Mining Equipment & Machinery",
  "Mineral Processing Equipment",
  "Automation & Control Systems",
  "Spare Parts & Components",
  "Power Supply Equipment",
  "IT Technologies & Software",
  "Safety Equipment",
  "Exploration Equipment",
  "Transportation & Logistics",
  "Environmental Monitoring",
  "Laboratory Equipment",
  "Engineering & Design Services",
];

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

export default function MiningFormPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    company: "",
    website: "",
    jobTitle: "",
    country: "",
    phone: "",
    email: "",
    productSectors: [] as string[],
    confirm: false,
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

  const handleSectorToggle = (sector: string) => {
    setFormData(prev => ({
      ...prev,
      productSectors: prev.productSectors.includes(sector)
        ? prev.productSectors.filter(s => s !== sector)
        : [...prev.productSectors, sector]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.firstName || !formData.lastName || !formData.company || !formData.jobTitle || !formData.country || !formData.phone || !formData.email) {
      setSubmitError('Please fill in all required fields');
      return;
    }

    if (!formData.confirm) {
      setSubmitError('Please confirm that you are not a robot');
      return;
    }

    setIsSubmitting(true);
    setSubmitError('');

    // Simulate API call
    setTimeout(() => {
      console.log('Form submitted:', formData);
      setSubmitSuccess(true);
      setIsSubmitting(false);
      
      setTimeout(() => {
        setSubmitSuccess(false);
        setFormData({
          firstName: "",
          lastName: "",
          company: "",
          website: "",
          jobTitle: "",
          country: "",
          phone: "",
          email: "",
          productSectors: [],
          confirm: false,
        });
      }, 3000);
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
          <p className="text-gray-600 mb-6">Your brochure request has been submitted successfully. Download link will be sent to your email.</p>
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
                Plan Your Participation
              </p>
              <h1 className="font-bebas font-bold text-[38px] lg:text-[48px] leading-[1.15] tracking-[1px] uppercase text-black">
                MiningWorld 2026
              </h1>
              <div className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-[1.6] space-y-4">
                <p>
                  Step into Eurasia's most influential mining exhibition and position 
                  your brand where the entire mining value chain meets. MiningWorld 
                  connects global suppliers with thousands of qualified buyers from 
                  39+ countries.
                </p>
              </div>

              {/* STATS */}
              <div className="grid grid-cols-2 gap-6 border-t border-b border-gray-200 py-6">
                {[
                  { value: "10,500+", label: "Visitors" },
                  { value: "550+", label: "Exhibitors" },
                  { value: "39", label: "Visiting Countries" },
                  { value: "30,200", label: "SQM" },
                ].map((item, i) => (
                  <div key={i}>
                    <h3 className="text-[#F08400] text-2xl lg:text-3xl font-bold font-bebas">
                      {item.value}
                    </h3>
                    <p className="text-sm text-gray-600">{item.label}</p>
                  </div>
                ))}
              </div>

              {/* WHY DOWNLOAD */}
              <div>
                <h3 className="font-semibold text-gray-800 mb-3 text-lg">
                  Why Download the Brochure?
                </h3>
                <ul className="text-sm text-gray-600 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>Engage directly with decision-makers – 83% influence or approve purchasing.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>Showcase solutions to buyers seeking machinery and processing technology.</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-[#F08400]">•</span>
                    <span>Build year-round visibility through our digital platform.</span>
                  </li>
                </ul>
              </div>

              {/* BROCHURE IMAGE */}
              <div className="mt-6">
                <div className="relative w-48 h-64 mx-auto lg:mx-0 rotate-[-6deg] shadow-xl rounded-lg overflow-hidden">
                  <Image
                    src="https://cdn.itegroupnews.com/Sales_Brochure_84b3c56f9d.png"
                    alt="Event Brochure"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>

            {/* RIGHT FORM */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-8">
              <h2 className="text-[#F08400] font-bold text-2xl mb-6 font-bebas">
                Download Event Brochure
              </h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                {/* First Name & Last Name */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      First Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="firstName"
                      value={formData.firstName}
                      onChange={handleChange}
                      placeholder="First Name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Last Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="lastName"
                      value={formData.lastName}
                      onChange={handleChange}
                      placeholder="Last Name"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
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
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    placeholder="Company Name"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                    required
                  />
                </div>

                {/* Company Website */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Company Website
                  </label>
                  <input
                    name="website"
                    value={formData.website}
                    onChange={handleChange}
                    placeholder="https://www.company.com"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleChange}
                    placeholder="Job Title"
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                    required
                  />
                </div>

                {/* Country */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Country <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                    required
                  >
                    <option value="">Select Country</option>
                    {countries.map(country => (
                      <option key={country} value={country}>{country}</option>
                    ))}
                  </select>
                </div>

                {/* Phone & Email */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder="Phone Number"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Work Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email Address"
                      className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Product Sector */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Product Sector <span className="text-red-500">*</span>
                  </label>
                  <div className="max-h-48 overflow-y-auto border border-gray-200 rounded-lg p-3 bg-white">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {productSectors.map((sector, index) => (
                        <label key={index} className="flex items-start gap-2 cursor-pointer hover:bg-gray-50 p-1 rounded">
                          <input
                            type="checkbox"
                            checked={formData.productSectors.includes(sector)}
                            onChange={() => handleSectorToggle(sector)}
                            className="mt-0.5 w-4 h-4 text-[#F08400] rounded border-gray-300 focus:ring-[#F08400]"
                          />
                          <span className="text-sm text-gray-700">{sector}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                </div>

                {/* CAPTCHA / Confirm */}
                <div className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                  <input
                    type="checkbox"
                    name="confirm"
                    checked={formData.confirm}
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

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#F08400] text-white py-3 px-6 rounded-lg font-semibold text-lg hover:bg-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Submitting...' : 'DOWNLOAD BROCHURE'}
                </button>

                {/* Terms */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  T&C: By submitting this form, you agree to receive marketing communications, updates, 
                  and promotional materials from us. You can unsubscribe anytime. For more information, 
                  please refer to our 
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