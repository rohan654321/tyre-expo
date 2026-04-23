"use client";

import BackToTop from "@/components/layout/BackToTop";
import React, { useState } from "react";

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
    confirm: false,
  });

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

  return (
    <div className="bg-[#efefef] min-h-screen py-16 px-4">
      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12">

        {/* LEFT SECTION */}
        <div>
          <h1 className="text-3xl font-bold text-black mb-4">
            Plan Your MiningWorld 2026 Participation
          </h1>

          <p className="text-gray-600 text-sm mb-6 leading-relaxed">
            Step into Eurasia’s most influential mining exhibition and position your brand where the entire mining value chain meets.
            MiningWorld connects global suppliers with thousands of qualified buyers from 39+ countries.
          </p>

          {/* STATS */}
          <div className="grid grid-cols-2 gap-6 border-t border-b py-6 mb-6">
            {[
              { value: "10,500+", label: "Visitors" },
              { value: "550+", label: "Exhibitors" },
              { value: "39", label: "Visiting Countries" },
              { value: "30,200", label: "SQM" },
            ].map((item, i) => (
              <div key={i}>
                <h3 className="text-orange-500 text-2xl font-bold">
                  {item.value}
                </h3>
                <p className="text-sm text-gray-700">{item.label}</p>
              </div>
            ))}
          </div>

          {/* WHY DOWNLOAD */}
          <h3 className="font-semibold mb-3">Why Download ?</h3>

          <ul className="text-sm text-gray-600 space-y-3 mb-8">
            <li>• Engage directly with decision-makers – 83% influence or approve purchasing.</li>
            <li>• Showcase solutions to buyers seeking machinery and processing technology.</li>
            <li>• Build year-round visibility through a digital platform.</li>
          </ul>

          {/* IMAGE */}
          <img
            src="https://images.unsplash.com/photo-1581093588401-22d3c3c9f08c"
            alt="brochure"
            className="w-64 rotate-[-10deg] shadow-lg"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="bg-white border rounded-md p-6 shadow-sm">
          <h2 className="text-orange-500 font-bold mb-4">
            Download Event Brochure
          </h2>

          <form className="space-y-4 text-sm">
            
            <input name="firstName" placeholder="First Name*" onChange={handleChange} className="w-full border px-3 py-2" />
            <input name="lastName" placeholder="Last Name*" onChange={handleChange} className="w-full border px-3 py-2" />
            <input name="company" placeholder="Company Name*" onChange={handleChange} className="w-full border px-3 py-2" />
            <input name="website" placeholder="Company Website" onChange={handleChange} className="w-full border px-3 py-2" />
            <input name="jobTitle" placeholder="Job Title*" onChange={handleChange} className="w-full border px-3 py-2" />

            <select name="country" onChange={handleChange} className="w-full border px-3 py-2">
              <option>Country*</option>
              <option>India</option>
              <option>Russia</option>
              <option>Kazakhstan</option>
            </select>

            <input name="phone" placeholder="Phone*" onChange={handleChange} className="w-full border px-3 py-2" />
            <input name="email" placeholder="Work Email*" onChange={handleChange} className="w-full border px-3 py-2" />

            {/* PRODUCT SECTOR */}
            <div>
              <p className="font-semibold mb-2">Product Sector*</p>
              <div className="space-y-1 text-xs text-gray-600">
                {[
                  "Mining Equipment",
                  "Processing Equipment",
                  "Automation",
                  "Spare Parts",
                  "Power Supply",
                  "IT Technologies",
                ].map((item, i) => (
                  <label key={i} className="flex gap-2">
                    <input type="checkbox" />
                    {item}
                  </label>
                ))}
              </div>
            </div>

            {/* CAPTCHA */}
            <div className="border p-2 flex items-center gap-2">
              <input type="checkbox" name="confirm" onChange={handleChange} />
              <span className="text-xs">I'm not a robot</span>
            </div>

            <button className="bg-orange-500 text-white px-4 py-2 text-sm">
              SUBMIT
            </button>

            <p className="text-[10px] text-gray-500 mt-3">
              T&C: By submitting, you agree to receive communications.
            </p>
          </form>
        </div>
      </div>
      <BackToTop/>
    </div>
  );
}