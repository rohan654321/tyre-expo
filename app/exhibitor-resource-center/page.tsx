// app/exhibitor-resource-center/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";

export default function ExhibitorResourceCenterPage() {
  const [loading, setLoading] = useState(true);
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(null);

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

  const toggleFaq = (index: number) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  const benefits = [
    {
      title: "Find New Prospects",
      description: "It should be easy to read the company's direction and name. Important details that you want to communicate to potential clients should be obvious and easy to remember.",
      icon: "https://cdn.itegroupnews.com/staff_management_1_e3b60c1db6.png"
    },
    {
      title: "Improve Existing Relationships",
      description: "You need a spacious recreational area, negotiation tables, an enclosed utility room where you will display your products, and interactive demo areas to engage visitors effectively.",
      icon: "https://cdn.itegroupnews.com/partnership_41fd66a951.png"
    },
    {
      title: "Conduct Meetings",
      description: "Your stand should have an ideal meeting area. You can separate one 'meeting room' from another or plan a couple of closed rooms where the exhibition atmosphere will not distract from the business conversation.",
      icon: "https://cdn.itegroupnews.com/meeting_3e0de9e870.png"
    },
    {
      title: "Increase Brand Identity",
      description: "In this case, an interesting stand design solution, supported by a high-quality demonstration of the best products will help.",
      icon: "https://cdn.itegroupnews.com/branding_c56168b0cb.png"
    },
    {
      title: "Competitor Research",
      description: "A small stand is enough, but it is worth placing it next to the business program sites to be in the thick of industry events.",
      icon: "https://cdn.itegroupnews.com/research_5ebaa8133d.png"
    },
    {
      title: "Showcase New Launches",
      description: "An interesting and bright design solution, perhaps navigation in the hall, will help. The invitation and presentation schedule should be large, informative, and located in the most visible place.",
      icon: "https://cdn.itegroupnews.com/product_release_d7b5bbb99c.png"
    }
  ];

  const standOptions = [
    {
      title: "Individual Construction",
      description: "Choosing an individual project stand is highly recommended as it allows for an effective presentation of your company, highlights your high status, emphasizes your unique style, and attracts more clients.",
      image: "https://cdn.itegroupnews.com/1_b17f63c840.png"
    },
    {
      title: "Standard Shell Scheme",
      description: "Standard Shell Scheme is suitable for the construction of the exhibition area from 11 to 60 sq. m. The stand kit depends on the construction area. Standard Shell Scheme may be amended with standard decorative elements.",
      image: "https://cdn.itegroupnews.com/2_f175606c2f.png"
    },
    {
      title: "Premium Shell Scheme",
      description: "Premium Shell Scheme is suitable for the construction of the exhibition area from 12 to 60 sq. m. You can choose the color of decorative elements, and order additional equipment and furniture. The height of structures from 3.5 m to 5 m will make the stands look more voluminous and spacious.",
      image: "https://cdn.itegroupnews.com/3_7b7bc3dca6.png"
    }
  ];

  const faqItems = [
    {
      question: "How to get your products/equipments to Bangkok on time?",
      answer: "ITS Tyre Expo partners with DMW EXPO to handle all freight handling requests from exhibitors. We recommend DMW EXPO for shipment of any products, stand equipment, marketing materials, machinery, and/or displays you plan to send for your stand.\n\nFor any enquiries, contact:\nMarina Filippova\nHead of Exhibition Department\nP: +66-2-123-4567\nE: marina.filippova@dmw-expo.com"
    },
    {
      question: "How can you spread the word about your ITS Tyre Expo participation?",
      answer: "Make the most of your time at the exhibition by leveraging ITS Tyre Expo's partnership and exclusive advertising opportunities to boost your impact and visibility."
    },
    {
      question: "How can exhibitors order technical services?",
      answer: "Exhibitors can conveniently order construction and technical services via the Technical Services Order Forms. Simply download the form, select the required services, sign, and send the scanned document to your technical manager. For any questions or assistance, please contact your technical manager using the details provided below."
    },
    {
      question: "How can you order suspended structures for ceiling installations?",
      answer: "For any enquiries regarding the ordering of suspended structures, please reach out to your technical manager using the contact details provided below."
    }
  ];

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
          <svg className="size-10 fill-orange-600" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
            <path d="M22 12c0-5.522-4.476-10-10-10C6.479 2 2 6.479 2 12c0 5.524 4.478 10 10 10c5.524 0 10-4.476 10-10zm-14.53.28a.75.75 0 0 1-.073-.976l.073-.084l4-4a.75.75 0 0 1 .977-.073l.085.072l4 4.002a.75.75 0 0 1-.977 1.133l-.084-.073l-2.72-2.721v6.691a.75.75 0 0 1-.649.743l-.102.007a.75.75 0 0 1-.743-.648l-.007-.102v-6.69l-2.72 2.72a.75.75 0 0 1-.976.072l-.084-.072z"></path>
          </svg>
        </button>
      </div>

      {/* Main Content */}
      <div className="page-spacing-wrapper pt-[120px] lg:pt-[140px]">
        
        {/* Explore Opportunities Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto grid items-center gap-10 px-6 sm:px-8 lg:px-12 xl:px-16 lg:grid-cols-5 lg:gap-20">
              <div className="lg:col-span-3">
                <div className="flex flex-col gap-5">
                  <h2 className="font-bebas text-5xl text-black md:text-6xl lg:text-7xl">Explore Opportunities</h2>
                  <p className="text-lg text-gray-700">
                    As a participant at ITS Tyre Expo, our team is dedicated to providing you with a variety of participation opportunities to make the most of your exhibition experience. From pre-event to post, we have created guides to help with the decision-making process and onboarding in a seamless manner.
                  </p>
                </div>
                <div className="mt-10">
                  <Link href="https://cdn-ite.prismetic.com/02_Manual_Forms_Mining_World_Russia_2026_EUR_0ddf1ecf29.pdf" target="_blank">
                    <button className="flex-center global-transition group w-fit gap-2 overflow-hidden border-2 border-[#F08400] px-10 py-3 font-bebas text-2xl text-[#F08400] transition-all hover:bg-black hover:text-white">
                      Download Guide
                    </button>
                  </Link>
                </div>
              </div>
              <div className="order-first lg:col-span-2">
                <div className="relative h-80 w-full overflow-hidden rounded-lg lg:h-96">
                  <Image
                    src="https://cdn.itegroupnews.com/exhibition_2020_20_9dec3a8c6e.webp"
                    alt="ITS Tyre Expo"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stands for Business Objectives Section */}
        <div className="animated-block mt-20">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
              <div className="text-center lg:text-left">
                <h2 className="font-bebas text-5xl text-black md:text-6xl lg:text-7xl">
                  Stands for your <span className="text-[#F08400]">Business Objectives</span>
                </h2>
              </div>
              <div className="my-14 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* Explore Stand Options Section */}
        <div className="animated-block mt-12 lg:mt-20">
          <div className="animated-block-target">
            <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
              <div className="mb-10 text-center lg:mb-12 lg:text-left">
                <h3 className="font-bebas text-5xl text-black md:text-6xl lg:text-7xl">
                  Explore Our <span className="text-[#F08400]">Stand Options</span>
                </h3>
                <p className="mt-3 text-lg text-gray-600">Selection Made Simple</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {standOptions.map((option, idx) => (
                  <div key={idx} className="group flex flex-col overflow-hidden rounded-lg bg-white border border-gray-200 transition-all duration-300 ease-in-out hover:shadow-lg">
                    <div className="relative h-60 w-full overflow-hidden bg-gray-100">
                      <img
                        src={option.image}
                        alt={option.title}
                        className="h-full w-full object-contain transition-transform duration-300 group-hover:scale-105"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'absolute inset-0 flex items-center justify-center bg-gray-100';
                            fallback.innerHTML = `<span class="text-6xl text-gray-400">${getStandIcon(idx)}</span>`;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <div className="flex flex-1 flex-col gap-4 p-6">
                      <h4 className="font-bebas text-2xl text-black md:text-3xl">{option.title}</h4>
                      <p className="text-gray-600 line-clamp-3">{option.description}</p>
                      <Link href="/exhibiting-enquiry" className="mt-2">
                        <button className="w-fit bg-[#F08400] px-6 py-2.5 font-bebas text-xl text-white transition-all hover:bg-black">
                          Enquire Now
                        </button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Exhibition Guide FAQ Section */}
        <div className="animated-block mt-12 lg:mt-20">
          <div className="animated-block-target">
            <div className="bg-gray-50 py-16 lg:py-20">
              <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
                <h2 className="mb-8 font-bebas text-5xl text-black md:text-6xl lg:text-7xl">
                  Exhibition <span className="text-[#F08400]">Guide</span>
                </h2>
                <div className="space-y-4">
                  {faqItems.map((item, idx) => (
                    <div key={idx} className="rounded-lg border border-gray-200 bg-white overflow-hidden">
                      <button
                        onClick={() => toggleFaq(idx)}
                        className="flex w-full items-center justify-between p-5 text-left transition-all hover:bg-gray-50"
                      >
                        <h4 className="text-lg font-semibold text-black md:text-xl lg:text-2xl pr-4">
                          {item.question}
                        </h4>
                        <div className="relative shrink-0">
                          <svg
                            width="20"
                            height="20"
                            viewBox="0 0 15 15"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                            className={`size-5 transition-transform duration-200 ${openFaqIndex === idx ? "rotate-45" : ""}`}
                          >
                            <path d="M8 2.75C8 2.47386 7.77614 2.25 7.5 2.25C7.22386 2.25 7 2.47386 7 2.75V7H2.75C2.47386 7 2.25 7.22386 2.25 7.5C2.25 7.77614 2.47386 8 2.75 8H7V12.25C7 12.5261 7.22386 12.75 7.5 12.75C7.77614 12.75 8 12.5261 8 12.25V8H12.25C12.5261 8 12.75 7.77614 12.75 7.5C12.75 7.22386 12.5261 7 12.25 7H8V2.75Z" fill="#F08400" fillRule="evenodd" clipRule="evenodd"></path>
                          </svg>
                        </div>
                      </button>
                      {openFaqIndex === idx && (
                        <div className="px-5 pb-5 pt-2 text-gray-700 whitespace-pre-line border-t border-gray-100">
                          {item.answer}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <PartnersSection />
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
        .line-clamp-3 {
          display: -webkit-box;
          -webkit-line-clamp: 3;
          -webkit-box-orient: vertical;
          overflow: hidden;
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

// Helper functions for fallback icons
function getBenefitIcon(index: number): string {
  const icons = ["🎯", "🤝", "📊", "🏷️", "🔍", "🚀"];
  return icons[index] || "💼";
}

function getStandIcon(index: number): string {
  const icons = ["🏗️", "📦", "⭐"];
  return icons[index] || "🏪";
}