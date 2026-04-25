// app/advertising-details/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";

export default function AdvertisingDetailsPage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="fixed inset-0 z-100 grid place-content-center bg-black">
        <div className="flex size-20 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-500 text-4xl">
          <div className="flex size-16 animate-spin items-center justify-center rounded-full border-4 border-transparent border-t-orange-300 text-2xl"></div>
        </div>
      </div>
    );
  }

  const benefits = [
    {
      title: "Reach Your Target Audience",
      description: "Communicate directly with industry specialists and decision-makers.",
      icon: "https://cdn.itegroupnews.com/4_7579e3b4df.png"
    },
    {
      title: "Increase Stand Traffic",
      description: "Drive more visitors to your booth and create meaningful connections.",
      icon: "https://cdn.itegroupnews.com/5_e69e2d6c8b.png"
    },
    {
      title: "Gain a Competitive Edge",
      description: "Stand out among exhibitors and position your brand as an industry leader.",
      icon: "https://cdn.itegroupnews.com/6_1234567890.png"
    },
    {
      title: "Boost Brand Awareness",
      description: "Strengthen your company's image and market visibility.",
      icon: "https://cdn.itegroupnews.com/7_93579318f2.png"
    },
    {
      title: "Showcase Innovations",
      description: "Highlight new products and services to a highly relevant audience.",
      icon: "https://cdn.itegroupnews.com/8_fa2729f754.png"
    },
    {
      title: "Drive Sales & Business Growth",
      description: "Convert exhibition exposure into direct sales opportunities.",
      icon: "https://cdn.itegroupnews.com/9_1c550dbab6.png"
    }
  ];

  const sponsorshipTabs = [
    {
      title: "Advertising Options",
      description: "Enhance brand awareness and maximize visitor engagement by leveraging a range of advertising services designed to increase your company's visibility and commercial success.",
      buttonText: "Download Marketing Manual",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/1_9622597897.png"
    },
    {
      title: "Affiliate Sponsorship Packages",
      description: "Choose from a variety of sponsorship packages tailored to meet your marketing objectives, or request a customized package that aligns with your brand strategy.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/2_af03062734.png"
    },
    {
      title: "Advertising Surfaces at BITEC",
      description: "Secure prime advertising locations both indoors and outdoors at the ITS Tyre Expo exhibition site to ensure maximum exposure for your brand.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/3_065bb10e11.png"
    },
    {
      title: "New Product Announcements",
      description: "Take advantage of free marketing support and exclusive promotional packages to introduce and highlight your latest products effectively.",
      buttonText: "Enquire Now",
      buttonLink: "/sponsorship-enquiry",
      image: "https://cdn.itegroupnews.com/4_b530561fa3.png"
    }
  ];

  // Helper function for fallback icons
  const getBenefitIcon = (index: number): string => {
    const icons = ["🎯", "📊", "⚡", "🏷️", "💡", "📈"];
    return icons[index] || "🎯";
  };

  const getSponsorshipIcon = (index: number): string => {
    const icons = ["📢", "🤝", "📍", "🎉"];
    return icons[index] || "📢";
  };

  return (
    <div className="intro-animation">
      {/* Main Content */}
      <div className="page-spacing-wrapper">
        <div className="pt-[100px] sm:pt-[120px] lg:pt-[140px]">
          
          {/* Header Section */}
          <div className="animated-block">
            <div className="animated-block-target">
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-10">
                <div className="text-center lg:text-left">
                  <h1 className="font-bebas text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-black">
                    Advertising & <span className="text-[#F08400]">Sponsorship</span>
                  </h1>
                  <p className="mx-auto mt-4 sm:mt-5 max-w-3xl text-sm sm:text-base md:text-lg text-gray-700 lg:mx-0">
                    Maximize your brand exposure and reach key decision-makers through our comprehensive 
                    advertising and sponsorship opportunities at ITS Tyre Expo 2026.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="animated-block mt-8 sm:mt-10">
            <div className="animated-block-target">
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16">
                <div className="text-center lg:text-left">
                  <h2 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black">
                    By leveraging these promotional options, you can:
                  </h2>
                  <p className="mt-2 sm:mt-3 text-sm sm:text-base md:text-lg text-gray-600">Please review the requirements carefully to ensure timely submission.</p>
                </div>
                
                <div className="my-10 sm:my-12 lg:my-14 grid gap-6 sm:gap-8 lg:gap-10 xl:gap-12 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
                  {benefits.map((benefit, idx) => (
                    <div key={idx} className="flex flex-col gap-3 sm:gap-4 rounded-lg p-4 sm:p-5 lg:p-6 transition-all hover:shadow-lg">
                      <div className="flex h-14 w-14 sm:h-16 sm:w-16 items-center justify-center overflow-hidden">
                        <img
                          src={benefit.icon}
                          alt={benefit.title}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement('span');
                              fallback.className = 'text-3xl sm:text-4xl';
                              fallback.innerHTML = getBenefitIcon(idx);
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                      <h3 className="font-bebas text-xl sm:text-2xl text-black">{benefit.title}</h3>
                      <p className="text-sm sm:text-base text-gray-600">{benefit.description}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Advertising & Sponsorship Options Section */}
          <div className="animated-block mt-8 sm:mt-10">
            <div className="animated-block-target">
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-4 sm:px-6 lg:px-8 xl:px-12 2xl:px-16 py-8 sm:py-10">
                <div className="mb-6 sm:mb-8 lg:mb-10 border-b border-gray-200 pb-6 sm:pb-8 lg:pb-10">
                  <h3 className="font-bebas text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl text-black">
                    Advertising & <span className="text-[#F08400]">Sponsorship Options</span>
                  </h3>
                </div>

                <div className="space-y-5 sm:space-y-6 lg:space-y-8">
                  {sponsorshipTabs.map((item, idx) => (
                    <div key={idx} className="grid grid-cols-1 gap-4 sm:gap-5 lg:gap-6 items-center rounded-lg border border-gray-100 p-4 sm:p-5 lg:p-6 transition-all hover:shadow-md lg:grid-cols-12">
                      {/* Image */}
                      <div className="flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center overflow-hidden rounded-lg bg-gray-50 mx-auto lg:mx-0 lg:col-span-2">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="h-full w-full object-contain"
                          onError={(e) => {
                            const target = e.currentTarget;
                            target.style.display = 'none';
                            const parent = target.parentElement;
                            if (parent) {
                              const fallback = document.createElement('span');
                              fallback.className = 'text-3xl sm:text-4xl';
                              fallback.innerHTML = getSponsorshipIcon(idx);
                              parent.appendChild(fallback);
                            }
                          }}
                        />
                      </div>
                      
                      {/* Title */}
                      <h5 className="text-lg sm:text-xl lg:text-2xl font-bold text-black text-center lg:text-left lg:col-span-3">
                        {item.title}
                      </h5>
                      
                      {/* Description */}
                      <p className="text-sm sm:text-base text-gray-600 text-center lg:text-left lg:col-span-5">
                        {item.description}
                      </p>
                      
                      {/* Button */}
                      <div className="lg:col-span-2 flex justify-center lg:justify-start">
                        <Link href={item.buttonLink}>
                          <button className="w-full sm:w-auto bg-[#F08400] px-5 sm:px-6 py-2 sm:py-2.5 font-bebas text-base sm:text-lg text-white transition-all hover:bg-black">
                            {item.buttonText}
                          </button>
                        </Link>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Partners Section */}
          <div className="mt-8 sm:mt-10 lg:mt-12">
            <PartnersSection />
          </div>
        </div>
        <BackToTop/>
      </div>

      <style jsx>{`
        .global-transition {
          transition: all 0.3s ease;
        }
        .flex-center {
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .font-bebas {
          font-family: 'Bebas Neue', cursive;
        }
        
        /* Smooth animations */
        .animated-block {
          opacity: 0;
          transform: translateY(30px);
          animation: fadeInUp 0.6s ease forwards;
        }
        
        @keyframes fadeInUp {
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animated-block:nth-child(1) { animation-delay: 0.1s; }
        .animated-block:nth-child(2) { animation-delay: 0.2s; }
        .animated-block:nth-child(3) { animation-delay: 0.3s; }
        .animated-block:nth-child(4) { animation-delay: 0.4s; }
      `}</style>
    </div>
  );
}