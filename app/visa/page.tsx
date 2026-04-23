// app/visa/page.tsx
"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import PartnersSection from "@/components/home/PartnersSection";
import BackToTop from "@/components/layout/BackToTop";

// Partners & Sponsors Data
const partnersSponsors = [
  { name: "ProfiMiner", logo: "https://cdn.itegroupnews.com/Profi_Miner_5d476ae93b.webp" },
  { name: "Times International", logo: "https://cdn.itegroupnews.com/1_c80a02899c.png" },
  { name: "TotalExpo.ru", logo: "https://cdn.itegroupnews.com/Total_Expo_ru_26b429a05b.webp" },
  { name: "Vedomosti", logo: "https://cdn.itegroupnews.com/Vedomosti_7814bd5d9d.webp" },
  { name: "Industry of Eurasia: Mining", logo: "https://cdn.itegroupnews.com/Industry_of_Eurasia_Mining_158b39f188.webp" },
  { name: "Miners of Russia", logo: "https://cdn.itegroupnews.com/miners_of_russia_78f659f949.webp" },
  { name: "Zyfra", logo: "https://cdn.itegroupnews.com/2_48e8e636ac.png" },
  { name: "Market and Business Analysis", logo: "https://cdn.itegroupnews.com/2_8449eb4f62.png" },
  { name: "Magazine \"Our Region – Far East\"", logo: "https://cdn.itegroupnews.com/NEDRADV_00cc617722.webp" },
  { name: "Comnews", logo: "https://cdn.itegroupnews.com/Comnews_bff0862b7e.webp" },
  { name: "Magazine \"Quarries of Russia\"", logo: "https://cdn.itegroupnews.com/Magazine_Quarries_of_Russia_ea8d1f98df.webp" },
  { name: "\"Small Business of Moscow\"", logo: "https://cdn.itegroupnews.com/Small_Business_of_Moscow_7ca6823583.webp" },
];

export default function VisaPage() {
  return (
    <div className="page-spacing-wrapper">
      {/* Official Travel Partner Section */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 lg:py-20 lg:py-20">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10 xl:gap-12">
              {/* Text Card */}
              <div className="bg-gray-100 relative flex min-h-[500px] flex-col p-5 text-black rounded-lg lg:p-10">
                <div className="z-10 flex flex-col gap-5">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    How can our Official Travel Partner Support You?
                  </h2>
                  <div className="text-lg space-y-4">
                    <p>
                      To determine if you need a visa to visit Russia, please contact the{" "}
                      <strong>Russian consulate</strong> in your country of residence.
                    </p>
                    <p>
                      If a visa is required, our{" "}
                      <strong>official travel partner, </strong>
                      <Link
                        href="https://visa-russian.ru/index_eng.php"
                        target="_blank"
                        className="text-orange-500 hover:text-black transition-colors"
                      >
                        <strong>Visa-Russian.ru</strong>
                      </Link>
                      , is here to assist. They will provide guidance on the appropriate
                      type of invitation and visa for your visit, along with the latest
                      entry requirements for Russia.
                    </p>
                    <p>
                      Most exhibitors and visitors typically apply for a{" "}
                      <strong>business or tourist invitation</strong>. Once your
                      invitation is ready, you can independently submit your visa
                      application at your local consulate.
                    </p>
                    <p>
                      Please ensure your document package includes{" "}
                      <strong>medical insurance</strong> covering your entire stay in
                      Russia. This can also be arranged through{" "}
                      <Link
                        href="https://visa-russian.ru/index_eng.php"
                        target="_blank"
                        className="text-orange-500 hover:text-black transition-colors"
                      >
                        <strong>Visa-Russian.ru</strong>
                      </Link>{" "}
                      for your convenience.
                    </p>
                  </div>
                  <div className="flex w-full flex-wrap gap-5">
                    <Link
                      href="https://visa-russian.ru/index_eng.php"
                      target="_blank"
                      className="inline-block"
                    >
                      <button className="transition-all duration-300 overflow-hidden bg-orange-500 px-8 py-3 font-bebas text-xl text-white hover:bg-black rounded">
                        Visit our Travel Partner Website
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Image Card */}
              <div className="bg-gray-800 relative flex min-h-[500px] flex-col p-5 rounded-lg overflow-hidden">
                <Image
                  alt="Visa Information"
                  width={500}
                  height={500}
                  className="absolute inset-0 w-full h-full object-cover"
                  src="https://cdn.itegroupnews.com/Visa_5bceffab8a_802e5140f4.webp"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Invitation for a Visa Section */}
      <div className="animated-block">
        <div className="animated-block-target">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16 py-16 lg:py-20 lg:py-20 lg:py-20">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-bold py-10 text-black text-center">
              Invitation for a Visa
            </h2>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:gap-10 xl:gap-12">
              {/* Business Visa Card */}
              <div className="bg-gray-100 relative flex min-h-[500px] flex-col p-5 text-black rounded-lg lg:p-10">
                <div className="z-10 flex flex-col gap-5">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Business Visa for Your Visit to MiningWorld
                  </h2>
                  <div className="text-lg space-y-4">
                    <p>
                      A <strong>business visa</strong> is ideal for attending
                      exhibitions, conferences, negotiations, contract signings, and
                      other business-related events in Russia.
                    </p>
                    <p>
                      This visa is issued on behalf of a{" "}
                      <strong>legal entity registered in the Russian Federation</strong>
                      . Through a cooperation agreement with <strong>ITE Group</strong>
                      , our official partner, <strong>Visa-Russian.ru</strong> (represented
                      by Travelmart Service LLC), can act as the inviting organization for{" "}
                      <strong>exhibitors, visitors, and partners</strong> of ITE
                      exhibitions.
                    </p>
                    <p>
                      The most common option is a{" "}
                      <strong>double-entry business visa</strong>, valid for up to{" "}
                      <strong>90 days</strong>.
                    </p>
                    <p>
                      Please note: Processing a business invitation takes approximately{" "}
                      <strong>20 business days</strong>. Once the invitation is ready,
                      you can apply for the visa at your local{" "}
                      <strong>Russian Federation Consulate</strong>.
                    </p>
                  </div>
                  <div className="flex w-full flex-wrap gap-5">
                    <Link
                      href="https://visa-russian.ru/index_eng.php"
                      target="_blank"
                      className="inline-block"
                    >
                      <button className="transition-all duration-300 overflow-hidden bg-orange-500 px-8 py-3 font-bebas text-xl text-white hover:bg-black rounded">
                        Apply Today
                      </button>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tourist Visa Card */}
              <div className="bg-gray-100 relative flex min-h-[500px] flex-col p-5 text-black rounded-lg lg:p-10">
                <div className="z-10 flex flex-col gap-5">
                  <h2 className="text-3xl md:text-4xl font-bold">
                    Tourist Visa for Your Visit to MiningWorld
                  </h2>
                  <div className="text-lg space-y-4">
                    <p>
                      A <strong>tourist visa</strong> is the quickest and easiest way
                      to gain entry into the Russian Federation. With a stay of up to{" "}
                      <strong>30 days</strong> and a single entry, it's the ideal
                      option for short visits.
                    </p>
                    <p>
                      Through our official partner, <strong>Visa-Russian.ru</strong>,
                      you can obtain a visa voucher in as little as{" "}
                      <strong>one business day</strong>. To ensure a smooth application
                      process, it is mandatory to book accommodation for your entire
                      stay in Russia through Visa-Russian.ru.
                    </p>
                    <p>
                      Visa-Russian.ru offers <strong>comprehensive visa support</strong>,
                      including:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>Issuing invitations and medical insurance</li>
                      <li>Hotel bookings for your full stay</li>
                      <li>Transportation services</li>
                      <li>Organizing tours and cultural programs</li>
                    </ul>
                    <p>
                      For more detailed information, please visit{" "}
                      <Link
                        href="https://visa-russian.ru/"
                        target="_blank"
                        className="text-orange-500 hover:text-black transition-colors"
                      >
                        Visa-Russian.ru
                      </Link>
                      , submit a request, or contact them directly:
                    </p>
                    <ul className="list-disc pl-5 space-y-1">
                      <li>
                        Phone:{" "}
                        <Link
                          href="tel:+74959358385"
                          className="text-orange-500 hover:text-black transition-colors"
                        >
                          +7 (495) 935-83-85
                        </Link>
                      </li>
                      <li>
                        <Link
                          href="https://api.whatsapp.com/send?phone=79035460935"
                          target="_blank"
                          className="text-orange-500 hover:text-black transition-colors font-bold"
                        >
                          WhatsApp
                        </Link>
                      </li>
                      <li>
                        Email:{" "}
                        <Link
                          href="mailto:visa@visa-russian.ru"
                          className="text-orange-500 hover:text-black transition-colors font-bold"
                        >
                          visa@visa-russian.ru
                        </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <PartnersSection/>
      <BackToTop/>
    </div>
  );
}