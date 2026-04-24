// app/sponsorship-enquiry/page.tsx
'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from '@/components/ui/container';
import PartnersSection from '@/components/home/PartnersSection';
import { Button } from '@/components/ui/button';

const productSectors = [
  "Associations, media and research institutions",
  "Construction technologies and equipment for mining",
  "Engineering, design and service",
  "Equipment for power supply of mining enterprises",
  "IT-technologies and automation of technological processes in mining industry",
  "Laboratory equipment and materials",
  "Machines and equipment for exploration",
  "Machines and equipment for mine safety",
  "Machines and equipment for mining",
  "Machines and equipment for moving and transportation of minerals",
  "Machines and equipment for production and processing of minerals",
  "Non-production services",
  "Spare parts, supplements and components",
  "Systems for water and air purification, environmental monitoring",
  "Logistics and Supply Chain",
  "Retail",
  "Consumer Electronics",
  "Non-profit Organizations",
  "Furniture",
  "Retail Art Supplies",
  "Food & Beverages",
  "Hospitality",
  "Office Furniture and Fixtures Manufacturing",
  "Manufacturing",
  "Import and Export",
  "Building Materials",
  "Information Technology and Services",
  "Semiconductors",
  "Electrical/Electronic Manufacturing",
  "Textiles",
  "Management Consulting",
  "Chemicals",
  "Design",
  "Industry Machinery Manufacturing",
  "Arts and Crafts",
  "Computer Software",
  "Financial Services",
  "Telecommunications",
  "Glass, Ceramics & Concrete",
  "Technology, Information and Media",
  "Publishing",
  "Packaging and Containers",
  "Electric Lighting Equipment Manufacturing",
  "Consumer Goods",
  "Restaurants",
  "Retail Apparel and Fashion",
  "Government Administration",
  "Retail Office Equipment",
  "Interior Design",
  "Industrial Machinery Manufacturing",
  "Machinery Manufacturing",
  "International Trade and Development",
  "Information Technology & Services",
  "Consumer Services",
  "Civic & Social Organization",
  "Technology, Information and Internet",
  "Executive Office",
  "Construction",
  "Health, Wellness and Fitness",
  "Automotive",
  "Marketing and Advertising",
  "Leather Product Manufacturing",
  "Architecture & Planning",
  "Plastics Manufacturing",
  "Printing Services",
  "Media Production",
  "Wholesale",
  "Events Services",
  "Cosmetics",
  "Landscaping Services",
  "Sporting Goods Manufacturing",
  "Computer Networking",
  "Industrial Design",
  "Mining & Metals",
  "Information Services",
  "Handicraft",
  "Retail Furniture and Home Furnishings",
  "Retail Health and Personal Care Products",
  "Retail Luxury Goods and Jewelry",
  "Warehousing and Storage",
  "Research Services",
  "Other Wood Product Manufacturing",
  "Industrial Automation",
  "Business Supplies and Equipment"
];

const countries = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda", "Argentina", "Armenia", 
  "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain", "Bangladesh", "Barbados", "Belarus", "Belgium", 
  "Belize", "Benin", "Bhutan", "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria", 
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde", "Central African Republic", "Chad", 
  "Chile", "China", "Colombia", "Comoros", "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic", 
  "Denmark", "Djibouti", "Dominica", "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea", 
  "Eritrea", "Estonia", "Eswatini", "Ethiopia", "Fiji", "Finland", "France", "Gabon", "Gambia", "Georgia", 
  "Germany", "Ghana", "Greece", "Grenada", "Guatemala", "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", 
  "Hungary", "Iceland", "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica", "Japan", 
  "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Korea, North", "Korea, South", "Kosovo", "Kuwait", "Kyrgyzstan", 
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein", "Lithuania", "Luxembourg", "Madagascar", 
  "Malawi", "Malaysia", "Maldives", "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico", 
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco", "Mozambique", "Myanmar", "Namibia", 
  "Nauru", "Nepal", "Netherlands", "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Macedonia", "Norway", 
  "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea", "Paraguay", "Peru", "Philippines", 
  "Poland", "Portugal", "Qatar", "Romania", "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia", 
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe", "Saudi Arabia", "Senegal", 
  "Serbia", "Seychelles", "Sierra Leone", "Singapore", "Slovakia", "Slovenia", "Solomon Islands", "Somalia", 
  "South Africa", "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland", "Syria", 
  "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo", "Tonga", "Trinidad and Tobago", "Tunisia", 
  "Turkey", "Turkmenistan", "Tuvalu", "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States", 
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam", "Yemen", "Zambia", "Zimbabwe"
];

export default function SponsorshipEnquiryPage() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    companyName: '',
    jobTitle: '',
    country: '',
    phone: '',
    workEmail: '',
    productSectors: [] as string[],
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
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
    if (!formData.firstName || !formData.lastName || !formData.companyName || !formData.jobTitle || !formData.country || !formData.phone || !formData.workEmail) {
      setSubmitError('Please fill in all required fields');
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
          firstName: '',
          lastName: '',
          companyName: '',
          jobTitle: '',
          country: '',
          phone: '',
          workEmail: '',
          productSectors: [],
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
          <p className="text-gray-600 mb-6">Your sponsorship enquiry has been submitted successfully. Our team will contact you shortly.</p>
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
          <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] gap-10">
            
            {/* LEFT SIDE - HEADER CONTENT */}
            <div className="flex flex-col gap-6 sticky top-24 h-fit">
              <p className="text-[#F08400] font-sans text-[14px] font-semibold uppercase tracking-[1.5px]">
                Partner With Us
              </p>
              <h1 className="font-bebas font-bold text-[38px] lg:text-[48px] leading-[1.15] tracking-[1px] uppercase text-black">
                Sponsorship Enquiry
              </h1>
              <div className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-[1.6] space-y-4">
                <p>
                  Showcase your brand to thousands of tyre industry professionals 
                  and decision-makers from across the globe.
                </p>
                <p>
                  From premium branding opportunities to exclusive networking events, 
                  we offer tailored sponsorship packages to meet your marketing objectives 
                  and budget.
                </p>
              </div>
              <div className="mt-4">
                {/* <Button
               href="/contact-us/"
                  className="bg-[#F08400] text-white px-8 py-3 text-sm font-extrabold uppercase tracking-[1.5px] hover:bg-black transition-all duration-300"
                >
                  Download Sponsorship Brochure
                </Button> */}
              </div>
            </div>

            {/* RIGHT SIDE - FORM */}
            <div className="bg-[#f5f5f5] rounded-2xl p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
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
                      onChange={handleInputChange}
                      placeholder="Type your first name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
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
                      onChange={handleInputChange}
                      placeholder="Type your last name"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
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
                    onChange={handleInputChange}
                    placeholder="Type your Company Name"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                    required
                  />
                </div>

                {/* Job Title */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="jobTitle"
                    value={formData.jobTitle}
                    onChange={handleInputChange}
                    placeholder="Type your Job Title"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                    required
                  />
                </div>

                {/* Country & Phone */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Country <span className="text-red-500">*</span>
                    </label>
                    <select
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
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
                      Phone <span className="text-red-500">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="Type your phone number"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Work Email */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Work Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    name="workEmail"
                    value={formData.workEmail}
                    onChange={handleInputChange}
                    placeholder="Type your email"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#F08400] focus:border-[#F08400] outline-none transition bg-white"
                    required
                  />
                </div>

                {/* Product Sectors */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-3">
                    Product Sectors
                  </label>
                  <div className="max-h-64 overflow-y-auto border border-gray-200 rounded-lg p-4 bg-white">
                    <div className="grid grid-cols-1 gap-2">
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

                {/* Terms & Conditions */}
                <p className="text-xs text-gray-500 text-center mt-4">
                  T&C’s: By submitting this form, you agree to receive marketing communications, updates, 
                  and promotional materials from us. You can unsubscribe anytime by clicking the "unsubscribe" 
                  link in our emails. For more information on how we handle your data, please refer to our 
                  <Link href="/privacy-policy" className="text-[#F08400] hover:underline ml-1">Privacy Policy</Link>.
                </p>
              </form>
            </div>

          </div>
        </Container>
      </section>
      <PartnersSection />
    </>
  );
}