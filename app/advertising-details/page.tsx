// app/advertising-details/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";

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

      {/* Back to Top Button */}
      <div className="fixed bottom-3 right-3 z-50 opacity-0 transition-all duration-300 lg:bottom-10 lg:right-2">
        <button className="m-0 rounded-full border-none bg-white p-0 outline-hidden drop-shadow-lg" aria-label="Back to top">
          <svg className="size-10 fill-[#F08400]" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">
        
        {/* Header Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-10">
              <div className="text-center lg:text-left">
                <h1 className="font-bebas text-5xl text-black md:text-6xl lg:text-7xl">
                  Advertising & <span className="text-[#F08400]">Sponsorship</span>
                </h1>
                <p className="mx-auto mt-5 max-w-3xl text-lg text-gray-700 lg:mx-0">
                  Maximize your brand exposure and reach key decision-makers through our comprehensive 
                  advertising and sponsorship opportunities at ITS Tyre Expo 2026.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <div className="animated-block mt-10">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
              <div className="text-center lg:text-left">
                <h2 className="font-bebas text-5xl text-black md:text-6xl lg:text-7xl">
                  By leveraging these promotional options, you can:
                </h2>
                <p className="mt-3 text-lg text-gray-600">Please review the requirements carefully to ensure timely submission.</p>
              </div>
              <div className="my-14 grid gap-10 lg:gap-14 xl:gap-16 sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, idx) => (
                  <div key={idx} className="flex flex-col gap-4 rounded-lg p-6 transition-all hover:shadow-lg">
                    <div className="flex h-16 w-16 items-center justify-center overflow-hidden">
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
                            fallback.className = 'text-4xl';
                            fallback.innerHTML = getBenefitIcon(idx);
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <h3 className="font-bebas text-2xl text-black">{benefit.title}</h3>
                    <p className="text-gray-600">{benefit.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Advertising & Sponsorship Options Section */}
        <div className="animated-block mt-10">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-10">
              <div className="mb-10 border-b border-gray-200 pb-10">
                <h3 className="font-bebas text-5xl text-black md:text-6xl lg:text-7xl">
                  Advertising & <span className="text-[#F08400]">Sponsorship Options</span>
                </h3>
              </div>

              <div className="space-y-8">
                {sponsorshipTabs.map((item, idx) => (
                  <div key={idx} className="grid grid-cols-1 items-center gap-6 rounded-lg border border-gray-100 p-6 transition-all hover:shadow-md lg:grid-cols-12">
                    {/* Image */}
                    <div className="flex h-24 w-24 items-center justify-center overflow-hidden rounded-lg bg-gray-50 lg:col-span-2">
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
                            fallback.className = 'text-4xl';
                            fallback.innerHTML = getSponsorshipIcon(idx);
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    
                    {/* Title */}
                    <h5 className="text-xl font-bold text-black lg:col-span-3 lg:text-2xl">
                      {item.title}
                    </h5>
                    
                    {/* Description */}
                    <p className="text-gray-600 lg:col-span-5">
                      {item.description}
                    </p>
                    
                    {/* Button */}
                    <div className="lg:col-span-2">
                      <Link href={item.buttonLink}>
                        <button className="w-full bg-[#F08400] px-6 py-2.5 font-bebas text-lg text-white transition-all hover:bg-black lg:w-auto">
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
        <div className="mt-10">
          <PartnersSection />
        </div>
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