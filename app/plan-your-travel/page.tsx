// app/plan-your-travel/page.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";

export default function PlanYourTravelPage() {
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("exhibitor");

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

  const quickLinks = [
    { label: "Enquire to Exhibit", link: "/exhibiting-enquiry", icon: "/icons/enquire.png" },
    { label: "Download Event Brochure", link: "/event-brochure", icon: "/icons/brochure.png" },
    { label: "Exhibitor List", link: "/exhibitor-list", icon: "/icons/list.png" },
    { label: "Plan Your Travel", link: "/plan-your-travel", icon: "/icons/travel.png" },
    { label: "Why Visit", link: "/why-visit", icon: "/icons/visit.png" }
  ];

  const exhibitorTabs = [
    {
      title: "Visa",
      description: "A regular business visa is suitable for business visits to Thailand aimed at negotiating, concluding contracts, participating in exhibitions, conferences, or other business meetings and events.",
      buttonText: "More Info",
      buttonLink: "/visa",
      image: "https://cdn.itegroupnews.com/Visa_5bceffab8a_802e5140f4.webp"
    },
    {
      title: "Freight, Handling & Customs",
      description: "We recommend DMW EXPO for shipping your products, equipment, materials, or displays. Their reliable service ensures timely and safe delivery for your stand allowing you to focus on your stand.",
      buttonText: "More Info",
      buttonLink: "/exhibitor-resource-center",
      image: "https://cdn.itegroupnews.com/Rules_of_Entry_7bceffab8a_802e5140f4.webp"
    },
    {
      title: "Preparation Checklist",
      description: "To make your experience as seamless as possible, we have put together a checklist for you, to keep track of all the necessary requirements you will need to keep note of leading up to the event.",
      buttonText: "More Info",
      buttonLink: "/exhibitor-resource-center",
      image: "https://cdn.itegroupnews.com/When_and_Where_8bceffab8a_802e5140f4.webp"
    }
  ];

  const visitorTabs = [
    {
      title: "Visa",
      description: "The most convenient way to obtain a visa to Thailand is with our official travel partner. Get assistance with your visa application for a smooth travel experience.",
      buttonText: "More Info",
      buttonLink: "/visa",
      image: "https://cdn.itegroupnews.com/Visa_5bceffab8a_802e5140f4.webp"
    },
    {
      title: "Rules of Entry",
      description: "Prior to your visit to ITS Tyre Expo, we as the event organisers urge you to adhere to the guidelines put in place for entry into Thailand.",
      buttonText: "More Info",
      buttonLink: "/terms-of-visiting",
      image: "https://cdn.itegroupnews.com/Freight_Handling_and_Customs_f1ff7e4873.webp"
    },
    {
      title: "When and Where",
      description: "Find out the time and place where you need to be to join us at ITS Tyre Expo 2026. Plan your schedule accordingly.",
      buttonText: "More Info",
      buttonLink: "/about-its-tyre-expo",
      image: "https://cdn.itegroupnews.com/Preperation_Checklist_e2dbffca54.webp"
    }
  ];

  const hotels = [
    {
      name: "Grand Sukhumvit Hotel Bangkok 5*",
      description: "Located in the heart of Bangkok's business district, a 15-minute drive from BITEC. The hotel features 350 luxury rooms, a rooftop pool, spa, fitness center, and 5 world-class restaurants. Free shuttle service to BITEC during exhibition days.",
      bookLink: "https://www.grandsukhumvit.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_grand_sukhumvit_1a2b3c4d5e.jpg"
    },
    {
      name: "Novotel Bangkok Sukhumvit 4*",
      description: "Conveniently located near BTS On Nut station, direct connection to BITEC via Skytrain. Modern rooms, outdoor pool, fitness center, and all-day dining restaurant. Special expo rates available.",
      bookLink: "https://www.novotelbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_novotel_2b3c4d5e6f.jpg"
    },
    {
      name: "Holiday Inn Express Sukhumvit 3*",
      description: "Budget-friendly option with modern amenities. Located near BTS Nana station, 20 minutes from BITEC. Complimentary breakfast and free Wi-Fi included.",
      bookLink: "https://www.hiexpress.com/bangkok",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_holiday_inn_3c4d5e6f7g.jpg"
    },
    {
      name: "The St. Regis Bangkok 5*",
      description: "Luxury hotel with direct access to BTS Ratchadamri station. World-class spa, Michelin-starred dining, and butler service. 25 minutes to BITEC.",
      bookLink: "https://www.stregisbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_stregis_4d5e6f7g8h.jpg"
    },
    {
      name: "W Bangkok Hotel 5*",
      description: "Stylish hotel near BTS Chong Nonsi. Modern design, rooftop bar, spa, and fitness facilities. 20 minutes to BITEC.",
      bookLink: "https://www.wbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_w_bangkok_5e6f7g8h9i.jpg"
    },
    {
      name: "Ibis Styles Bangkok Sukhumvit 3*",
      description: "Affordable comfort near BTS On Nut station. Modern rooms, swimming pool, and all-day dining. Perfect for budget-conscious exhibitors.",
      bookLink: "https://www.ibisstylesbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_ibis_6f7g8h9i0j.jpg"
    },
    {
      name: "The Berkeley Hotel Pratunam 4*",
      description: "Located in the shopping district, 30 minutes from BITEC. 600 rooms, rooftop pool, and multiple dining options. Free shuttle service available.",
      bookLink: "https://www.berkeleypratunam.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_berkeley_7g8h9i0j1k.jpg"
    },
    {
      name: "Avani Sukhumvit Bangkok 4*",
      description: "Modern hotel connected to BTS On Nut station. Rooftop pool, fitness center, and multiple restaurants. Direct Skytrain access to BITEC.",
      bookLink: "https://www.avanihotels.com/sukhumvit",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_avani_8h9i0j1k2l.jpg"
    },
    {
      name: "Oakwood Hotel & Residence 4*",
      description: "Serviced apartments near BTS Phrom Phong. Ideal for longer stays with kitchen facilities. 25 minutes to BITEC.",
      bookLink: "https://www.oakwoodbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_oakwood_9i0j1k2l3m.jpg"
    },
    {
      name: "The Quarter Ari by UHG 4*",
      description: "Modern hotel in the Ari district. Rooftop pool with city views, fitness center, and restaurant. 35 minutes to BITEC.",
      bookLink: "https://www.thequarterari.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_quarter_0j1k2l3m4n.jpg"
    },
    {
      name: "Nysa Hotel Bangkok 4*",
      description: "Boutique hotel near BITEC. Modern design, swimming pool, and fitness center. Just 5 minutes from the exhibition center.",
      bookLink: "https://www.nysahotelbangkok.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_nysa_1k2l3m4n5o.jpg"
    },
    {
      name: "The Park Nine Hotel 4*",
      description: "Located in the Bangna area, just 10 minutes from BITEC. Spacious rooms, outdoor pool, and fitness center.",
      bookLink: "https://www.theparknine.com/",
      mapLink: "https://maps.google.com",
      image: "https://cdn.itegroupnews.com/hotel_parknine_2l3m4n5o6p.jpg"
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

        {/* Culture Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <div className="container mx-auto px-4 py-10">
              <div className="mb-5 flex justify-between lg:items-end">
                <div className="lg:basis-2/3">
                  <h3 className="font-bebas text-5xl text-black md:text-6xl">Blend business opportunity and Bangkok's vibrant culture when you visit ITS Tyre Expo</h3>
                  <p className="mt-5 text-lg text-gray-700">
                    Join thousands of tyre industry leaders and peers to forge valuable connections, discover cutting-edge trends in the industry, and immerse yourself in the rich culture and vibrant energy of Bangkok—a city that blends innovation with timeless charm.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Travel Information Tabs */}
        <div className="animated-block">
          <div className="animated-block-target">
            <div className="container mx-auto px-4 py-10">
              <div className="flex-between mb-10 flex-wrap items-end gap-5 border-b border-gray-300 pb-10">
                <div>
                  <h4 className="font-bebas text-5xl text-black md:text-6xl">The information you need before traveling</h4>
                </div>
                <div className="inline-flex rounded-full bg-gray-200 p-1">
                  <button
                    onClick={() => setActiveTab("exhibitor")}
                    className={`rounded-full px-6 py-3 font-bold transition-all duration-300 ${activeTab === "exhibitor" ? "bg-[#F08400] text-white" : "text-orange-600"}`}
                  >
                    If you're an exhibitor:
                  </button>
                  <button
                    onClick={() => setActiveTab("visitor")}
                    className={`rounded-full px-6 py-3 font-bold transition-all duration-300 ${activeTab === "visitor" ? "bg-[#F08400] text-white" : "text-orange-600"}`}
                  >
                    If you're a visitor:
                  </button>
                </div>
              </div>

              <div className="mt-5">
                {activeTab === "exhibitor" ? (
                  <div className="space-y-10">
                    {exhibitorTabs.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-1 items-center gap-5 xl:grid-cols-7">
                        {/* Image */}
                        <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-200 xl:col-span-2">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200';
                                fallback.innerHTML = `<span class="text-4xl">${item.title === "Visa" ? "🛂" : item.title === "Freight, Handling & Customs" ? "📦" : "✅"}</span>`;
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        </div>
                        <h5 className="text-2xl font-bold text-black xl:col-span-2">{item.title}</h5>
                        <p className="text-gray-600 xl:col-span-2">{item.description}</p>
                        <div className="grid xl:place-content-center">
                          <Link href={item.buttonLink}>
                            <button className="flex-center aspect-square rounded-full bg-[#F08400] p-3 text-white transition-all hover:bg-black">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="space-y-10">
                    {visitorTabs.map((item, idx) => (
                      <div key={idx} className="grid grid-cols-1 items-center gap-5 xl:grid-cols-7">
                        {/* Image */}
                        <div className="relative h-32 w-32 overflow-hidden rounded-lg bg-gray-200 xl:col-span-2">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            onError={(e) => {
                              const target = e.currentTarget;
                              target.style.display = 'none';
                              const parent = target.parentElement;
                              if (parent) {
                                const fallback = document.createElement('div');
                                fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200';
                                fallback.innerHTML = `<span class="text-4xl">${item.title === "Visa" ? "🛂" : item.title === "Rules of Entry" ? "📋" : "📍"}</span>`;
                                parent.appendChild(fallback);
                              }
                            }}
                          />
                        </div>
                        <h5 className="text-2xl font-bold text-black xl:col-span-2">{item.title}</h5>
                        <p className="text-gray-600 xl:col-span-2">{item.description}</p>
                        <div className="grid xl:place-content-center">
                          <Link href={item.buttonLink}>
                            <button className="flex-center aspect-square rounded-full bg-[#F08400] p-3 text-white transition-all hover:bg-black">
                              <svg stroke="currentColor" fill="currentColor" strokeWidth="0" viewBox="0 0 512 512" height="20" width="20" xmlns="http://www.w3.org/2000/svg">
                                <path d="M502.6 278.6c12.5-12.5 12.5-32.8 0-45.3l-128-128c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L402.7 224 32 224c-17.7 0-32 14.3-32 32s14.3 32 32 32l370.7 0-73.4 73.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0l128-128z"></path>
                              </svg>
                            </button>
                          </Link>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Hotels Section */}
        <div className="animated-block">
          <div className="animated-block-target">
            <div className="container mx-auto px-4">
              <h3 className="font-bebas text-5xl text-black md:text-6xl">20% off when you book at the hotel website using the promo code "EXPO"</h3>
              <div className="mt-5 h-px w-full bg-[#F08400]"></div>

              <div className="mt-10 space-y-10">
                {hotels.map((hotel, idx) => (
                  <div key={idx} className={`flex flex-col items-center gap-10 py-10 even:bg-orange-50 lg:flex-row lg:gap-20`}>
                    {/* Hotel Image */}
                    <div className="relative h-48 w-48 shrink-0 overflow-hidden rounded-lg bg-gray-200 lg:h-60 lg:w-60">
                      <Image
                        src={hotel.image}
                        alt={hotel.name}
                        fill
                        className="object-cover"
                        onError={(e) => {
                          const target = e.currentTarget;
                          target.style.display = 'none';
                          const parent = target.parentElement;
                          if (parent) {
                            const fallback = document.createElement('div');
                            fallback.className = 'absolute inset-0 flex items-center justify-center bg-gradient-to-br from-orange-100 to-orange-200';
                            fallback.innerHTML = `<span class="text-5xl">🏨</span>`;
                            parent.appendChild(fallback);
                          }
                        }}
                      />
                    </div>
                    <div>
                      <h4 className="text-3xl font-bold text-black">{hotel.name}</h4>
                      <p className="mt-5 text-gray-600">{hotel.description}</p>
                      <div className="mt-5 flex flex-wrap gap-5">
                        <Link href={hotel.bookLink} target="_blank">
                          <button className="w-full bg-[#F08400] px-8 py-3 font-bebas text-xl text-white transition-all hover:bg-black lg:w-fit">Book your stay</button>
                        </Link>
                        <Link href={hotel.mapLink} target="_blank">
                          <button className="w-full border-2 border-[#F08400] px-8 py-3 font-bebas text-xl text-[#F08400] transition-all hover:bg-black hover:text-white lg:w-fit">View Location</button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <PartnersSection />

        {/* Quick Navigation */}
        <div className="animated-block mt-20">
          <div className="animated-block-target">
            <div className="border-t-8 border-orange-600 bg-black py-20 text-white">
              <div className="container mx-auto px-4">
                <h2 className="font-bebas text-6xl md:text-7xl">Quick Navigation</h2>
                <div className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-5">
                  {quickLinks.map((item, idx) => (
                    <div key={idx} className="relative flex flex-col items-center justify-center text-center">
                      {idx !== 0 && (
                        <div className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gray-700 md:block"></div>
                      )}
                      <Link href={item.link} className="flex flex-col items-center group">
                        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 transition-colors group-hover:bg-[#F08400]">
                          <div className="text-2xl">
                            {idx === 0 && "📋"}
                            {idx === 1 && "📄"}
                            {idx === 2 && "📊"}
                            {idx === 3 && "✈️"}
                            {idx === 4 && "ℹ️"}
                          </div>
                        </div>
                        <p className="mt-4 text-sm font-semibold text-gray-300 transition-colors group-hover:text-[#F08400]">
                          {item.label}
                        </p>
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
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
      `}</style>
    </div>
  );
}