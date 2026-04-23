"use client";

import React, { useState } from "react";
import Link from "next/link";
import BackToTop from "@/components/layout/BackToTop";

export default function InsightsPage() {
  const [formData, setFormData] = useState({
    companyName: "",
    jobTitle: "",
    country: "",
    workEmail: "",
    confirmRequest: false,
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

  // ✅ SUCCESS SCREEN
  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white px-4">
        <div className="max-w-md w-full bg-white shadow-xl border rounded-xl p-8 text-center">
          <div className="w-16 h-16 bg-green-100 flex items-center justify-center rounded-full mx-auto mb-4">
            ✓
          </div>

          <h2 className="text-2xl font-bold mb-2">Thank You!</h2>
          <p className="text-gray-600 mb-6">
            Your report has been sent to your email.
          </p>

          <Link
            href="/"
            className="bg-black text-white px-6 py-2 text-sm"
          >
            Go Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-6xl mx-auto px-4 py-16 grid lg:grid-cols-2 gap-16">
        
        {/* LEFT SECTION */}
        <div className="space-y-10">
          {/* Heading */}
          <div>
            <p className="text-orange-500 font-semibold mb-2 text-sm">
              Explore Insights
            </p>

            <h2 className="text-4xl md:text-5xl font-extrabold text-black leading-tight">
              UNLOCK EXPORT OPPORTUNITIES IN THE{" "}
              <span>CIS REGION</span>
            </h2>

            <p className="text-gray-600 mt-4 max-w-lg">
              With growing demand for innovative products and reliable suppliers,
              the CIS region is becoming a key player in global trade.
            </p>
          </div>

          {/* Features */}
          <div className="grid sm:grid-cols-2 gap-6">
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
              <div key={i} className="flex gap-4">
                <div className="w-10 h-10 rounded-full bg-orange-100 flex items-center justify-center text-orange-500 text-lg">
                  •
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

        {/* RIGHT SECTION (FORM) */}
        <div className="flex justify-center items-start">
          <div className="w-full max-w-md border border-gray-300 rounded-lg p-6 bg-white shadow-md">
            
            <h3 className="text-orange-500 text-center font-semibold mb-2 text-sm">
              One Step Closer to Unlocking Market Insights
            </h3>

            <h2 className="text-xl font-bold text-orange-600 mb-4">
              Download the Report
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4">
              
              <input
                type="text"
                name="companyName"
                placeholder="Type your Company Name"
                value={formData.companyName}
                onChange={handleChange}
                className="w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-orange-500"
                required
              />

              <input
                type="text"
                name="jobTitle"
                placeholder="Type your Job Title"
                value={formData.jobTitle}
                onChange={handleChange}
                className="w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-orange-500"
                required
              />

              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-orange-500"
                required
              >
                <option value="">Country</option>
                <option>India</option>
                <option>Russia</option>
                <option>Kazakhstan</option>
                <option>Uzbekistan</option>
                <option>Germany</option>
                <option>USA</option>
              </select>

              <input
                type="email"
                name="workEmail"
                placeholder="Type your email"
                value={formData.workEmail}
                onChange={handleChange}
                className="w-full border border-gray-400 px-3 py-2 text-sm outline-none focus:border-orange-500"
                required
              />

              {/* Fake Captcha */}
              <div className="border p-3 flex items-center gap-2">
                <input
                  type="checkbox"
                  name="confirmRequest"
                  checked={formData.confirmRequest}
                  onChange={handleChange}
                  required
                />
                <span className="text-xs">I’m not a robot</span>
              </div>

              <button
                type="submit"
                className="bg-orange-500 hover:bg-orange-600 text-white text-sm px-4 py-2 w-full"
              >
                Submit
              </button>
            </form>

            <p className="text-[10px] text-gray-500 mt-4">
              T&C: By submitting this form, you agree to receive marketing communications.
            </p>
          </div>
        </div>
      </div>

      {/* FOOTER */}
      <div className="text-center py-6 border-t text-gray-400 text-sm">
        © 2025 All Rights Reserved
      </div>
      <BackToTop/>
    </div>
  );
}