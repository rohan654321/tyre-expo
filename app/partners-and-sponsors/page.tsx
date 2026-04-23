// app/partners-and-sponsors/page.tsx
'use client';

import BackToTop from '@/components/layout/BackToTop';
import Image from 'next/image';
import Link from 'next/link';

export default function PartnersSponsorsPage() {
  // Event Partners data
  const eventPartners = [
    {
      name: 'Tyre and Rubber Association of India',
      logo: 'https://cdn.itegroupnews.com/Mining_and_Metals_Central_Asia_91513fb902.webp',
      type: 'Event Partner',
      website: 'https://www.trai.org.in',
    },
    {
      name: 'Indian Rubber Institute',
      logo: 'https://cdn.itegroupnews.com/National_Research_Technological_University_MISIS_e867cff614.webp',
      type: 'Event Partner',
      website: 'https://www.indianrubberinstitute.org',
    },
    {
      name: 'All India Tyre Dealers Federation',
      logo: 'https://cdn.itegroupnews.com/Profi_Miner_5d476ae93b.webp',
      type: 'Event Partner',
      website: 'https://www.aitdf.com',
    },
  ];

  // Media Partners data
  const mediaPartners = [
    { name: 'Tyre Times', logo: 'https://cdn.itegroupnews.com/mining_0bccc3a3aa.webp', type: 'General Media Partner', website: 'https://tyretimes.in' },
    { name: 'Rubber Asia', logo: 'https://cdn.itegroupnews.com/dprom_b413c2b8d8.webp', type: 'General Media Partner', website: 'https://rubberasia.com' },
    { name: 'Tyre & Rubber World', logo: 'https://cdn.itegroupnews.com/Extractive_Industry_Magazine_c676dd74e3.webp', type: 'General Media Partner', website: 'https://tyrerubberworld.com' },
    { name: 'Rubber Journal', logo: 'https://cdn.itegroupnews.com/Globus_Journal_8dd313ebf7.webp', type: 'Event Partner', website: 'https://rubberjournal.in' },
    { name: 'Tyre Asia', logo: 'https://cdn.itegroupnews.com/NEDRADV_00cc617722.webp', type: 'Exclusive Media Partner', website: 'https://tyreasia.com' },
    { name: 'Rubber Express', logo: 'https://cdn.itegroupnews.com/NEDRADV_146cbff2f2.webp', type: 'Exclusive Internet Partner', website: 'https://rubberexpress.com' },
    { name: 'Tyre Review', logo: 'https://cdn.itegroupnews.com/Magazine_Quarries_of_Russia_ea8d1f98df.webp', type: 'Strategic Media Partner', website: 'https://tyrereview.com' },
    { name: 'All Events India', logo: 'https://cdn.itegroupnews.com/All_Events_ru_27320fa94d.webp', type: 'Media Partner', website: 'https://allevents.in' },
    { name: 'Business India', logo: 'https://cdn.itegroupnews.com/Business_Russia_bd1c069af9.webp', type: 'Media Partner', website: 'https://businessindia.in' },
    { name: 'Clever India', logo: 'https://cdn.itegroupnews.com/Clever_Russia_6876bbe884.webp', type: 'Media Partner', website: 'https://cleverindia.com' },
    { name: 'ComNews India', logo: 'https://cdn.itegroupnews.com/Comnews_bff0862b7e.webp', type: 'Media Partner', website: 'https://comnews.in' },
    { name: 'Company Journal', logo: 'https://cdn.itegroupnews.com/Company_Journal_f5776ad342.webp', type: 'Media Partner', website: 'https://companyjournal.in' },
    { name: 'Energy & Industry', logo: 'https://cdn.itegroupnews.com/Energy_and_industry_of_Russia_d6a8325b1b.webp', type: 'Media Partner', website: 'https://energyindustry.in' },
    { name: 'Expotrade India', logo: 'https://cdn.itegroupnews.com/Expotrade_3792441e2d.webp', type: 'Media Partner', website: 'https://expotrade.in' },
    { name: 'Gas Industry', logo: 'https://cdn.itegroupnews.com/Gas_industry_and_Territory_NEFTEGAZ_2954679509.webp', type: 'Media Partner', website: 'https://gasindustry.in' },
    { name: 'Geowebinars', logo: 'https://cdn.itegroupnews.com/Geowebinars_7f6ca710e5.webp', type: 'Media Partner', website: 'https://geowebinars.com' },
    { name: 'Gold & Technology', logo: 'https://cdn.itegroupnews.com/Gold_and_Technology_2b4e4e758f.webp', type: 'Media Partner', website: 'https://goldtech.in' },
    { name: 'Industry of Eurasia', logo: 'https://cdn.itegroupnews.com/Industry_of_Eurasia_Mining_158b39f188.webp', type: 'Media Partner', website: 'https://industryeurasia.com' },
    { name: 'InfoGor', logo: 'https://cdn.itegroupnews.com/Info_Gor_ru_ecb2e2ad86.webp', type: 'Media Partner', website: 'https://infogor.in' },
    { name: 'Avtosila India', logo: 'https://cdn.itegroupnews.com/Magazine_Avtosila_Special_equipment_of_Siberia_81285baf51.webp', type: 'Media Partner', website: 'https://avtosila.in' },
    { name: 'Coal India Magazine', logo: 'https://cdn.itegroupnews.com/Magazine_Coal_e467916b89.webp', type: 'Media Partner', website: 'https://coalindia.in' },
    { name: 'Coal of Kuzbass', logo: 'https://cdn.itegroupnews.com/Magazine_Coal_of_Kuzbass_1783fea906.webp', type: 'Media Partner', website: 'https://coalkuzbass.com' },
    { name: 'Industrialist of Siberia', logo: 'https://cdn.itegroupnews.com/Magazine_Industrialist_of_Siberia_a05eb01357.webp', type: 'Media Partner', website: 'https://industrialsiberia.com' },
    { name: 'Mineral Resources', logo: 'https://cdn.itegroupnews.com/Magazine_Mineral_Resources_of_Russia_94f055f80e.webp', type: 'Media Partner', website: 'https://mineralresources.in' },
    { name: 'Mine Surveying', logo: 'https://cdn.itegroupnews.com/Mine_Surveying_and_Subfoil_Use_5c47db72c0.webp', type: 'Media Partner', website: 'https://minesurveying.in' },
    { name: 'Safety in Industry', logo: 'https://cdn.itegroupnews.com/Magazine_Occupational_Safety_in_Industry_4aee7f6be1.webp', type: 'Media Partner', website: 'https://safetyindustry.in' },
    { name: 'Special Equipment', logo: 'https://cdn.itegroupnews.com/Magazine_Special_equipment_and_transport_413b7920d1.webp', type: 'Media Partner', website: 'https://specialequipment.in' },
    { name: 'Subsoil Use', logo: 'https://cdn.itegroupnews.com/Magazine_Subsoil_Use_XXI_Century_8ec62583a9.webp', type: 'Media Partner', website: 'https://subsoiluse.in' },
    { name: 'Miners of India', logo: 'https://cdn.itegroupnews.com/miners_of_russia_78f659f949.webp', type: 'Media Partner', website: 'https://minersindia.in' },
    { name: 'Mining Book', logo: 'https://cdn.itegroupnews.com/Mining_book_b325ca9089.webp', type: 'Media Partner', website: 'https://miningbook.in' },
    { name: 'Mining Magazine', logo: 'https://cdn.itegroupnews.com/Mining_magazine_027098a53c.webp', type: 'Media Partner', website: 'https://miningmagazine.in' },
    { name: 'Mining Kazakhstan', logo: 'https://cdn.itegroupnews.com/Mining_magazine_of_Kazakhstan_13f6924fa1.webp', type: 'Media Partner', website: 'https://miningkz.com' },
    { name: 'Monocle India', logo: 'https://cdn.itegroupnews.com/Monocle_6dbec850f7.webp', type: 'Media Partner', website: 'https://monocleindia.in' },
    { name: 'Subsoil Expertise', logo: 'https://cdn.itegroupnews.com/National_Association_for_Subsoil_Expertise_9facd1fae4.webp', type: 'Media Partner', website: 'https://subsoilexpertise.in' },
    { name: 'Neftegaz India', logo: 'https://cdn.itegroupnews.com/neftegaz_c45992f759.webp', type: 'Media Partner', website: 'https://neftegazindia.in' },
    { name: 'ProfiMiner', logo: 'https://cdn.itegroupnews.com/Profi_Miner_5d476ae93b.webp', type: 'Media Partner', website: 'https://profiminer.in' },
    { name: 'Rational Subsoil', logo: 'https://cdn.itegroupnews.com/rational_development_of_subsoil_290489a9ae.webp', type: 'Media Partner', website: 'https://rationalsubsoil.in' },
    { name: 'Small Business', logo: 'https://cdn.itegroupnews.com/Small_Business_of_Moscow_7ca6823583.webp', type: 'Media Partner', website: 'https://smallbusiness.in' },
    { name: 'Solyarka', logo: 'https://cdn.itegroupnews.com/Solyarka_52ae0ece6a.webp', type: 'Media Partner', website: 'https://solyarka.in' },
    { name: 'SteelRadar', logo: 'https://cdn.itegroupnews.com/steelradar_a63156aad3.webp', type: 'Media Partner', website: 'https://steelradar.com' },
    { name: 'Technical Council', logo: 'https://cdn.itegroupnews.com/Technical_Council_f89a2efb89.webp', type: 'Media Partner', website: 'https://technicalcouncil.in' },
    { name: 'Total Expo', logo: 'https://cdn.itegroupnews.com/Total_Expo_ru_26b429a05b.webp', type: 'Media Partner', website: 'https://totalexpo.in' },
    { name: 'Vedomosti India', logo: 'https://cdn.itegroupnews.com/Vedomosti_7814bd5d9d.webp', type: 'Media Partner', website: 'https://vedomosti.in' },
    { name: 'Modern Women in Industries', logo: 'https://cdn.itegroupnews.com/3_c5c5637a9c.png', type: 'Strategic Partner', website: 'https://womeninindustries.in' },
    { name: 'Mining Digest', logo: 'https://cdn.itegroupnews.com/www_mining_digest_ru_7cc6d18b21.webp', type: 'Media Partner', website: 'https://miningdigest.in' },
    { name: 'Times International', logo: 'https://cdn.itegroupnews.com/1_c80a02899c.png', type: 'Media Partner', website: 'https://timesinternational.in' },
    { name: 'Market & Business Analysis', logo: 'https://cdn.itegroupnews.com/2_8449eb4f62.png', type: 'Media Partner', website: 'https://marketbusiness.com' },
    { name: 'African Mining Metal', logo: 'https://cdn.itegroupnews.com/3_4973d101d3.png', type: 'Media Partner', website: 'https://africanmining.com' },
    { name: 'The Construction Data', logo: 'https://cdn.itegroupnews.com/4_a2215ab47f.png', type: 'Media Partner', website: 'https://constructiondata.com' },
    { name: 'Keepital', logo: 'https://cdn.itegroupnews.com/Media_Partner_MWR_500x250_e65c8ed1b1.png', type: 'Media Partner', website: 'https://keepital.com' },
    { name: 'Metal Mining Review', logo: 'https://cdn.itegroupnews.com/8_33807f73d8.png', type: 'Media Partner', website: 'https://metalminingreview.com' },
    { name: 'Cosmo World', logo: 'https://cdn.itegroupnews.com/7_5f06c7f26f.png', type: 'Media Partner', website: 'https://cosmoworld.com' },
  ];

  // Quick links data
   const quickLinks = [
    { label: "Enquire to Exhibit", link: "/exhibiting-enquiry", icon: "https://cdn.itegroupnews.com/Vector_1_440f5852b9.png" },
    { label: "Download Event Brochure", link: "/event-brochure", icon: "https://cdn.itegroupnews.com/Group_e024d13500.png" },
    { label: "Exhibitor List", link: "/exhibitor-list", icon: "https://cdn.itegroupnews.com/Vector_ceea3d1488.png" },
    { label: "Plan Your Travel", link: "/plan-your-travel", icon: "https://cdn.itegroupnews.com/Vector_1_b2c1ab92d0.png" },
    { label: "Why Visit", link: "/why-visit", icon: "https://cdn.itegroupnews.com/Vector_2_9be2b98909.png" }
  ];

  return (
    <div className="page-spacing-wrapper">
      {/* Header spacing to account for fixed navbar */}
      <div className="pt-[120px] lg:pt-[140px]">
        
        {/* Event Partners Section */}
        <section className="py-16 lg:py-20">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <h2 className="font-bebas text-5xl text-black md:text-6xl text-center mb-10 lg:mb-16">
              Event Partners
            </h2>
            <div className="flex flex-wrap gap-8 justify-center">
              {eventPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex w-full max-w-[320px] flex-col items-center gap-5 border border-gray-200 p-6 text-center rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-32 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={140}
                      height={100}
                      className="object-contain max-h-28"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-xl font-semibold text-black text-center">{partner.name}</h3>
                  <p className="text-orange-600 text-sm font-medium">{partner.type}</p>
                  <Link
                    href={partner.website}
                    target="_blank"
                    className="w-full mt-auto inline-flex items-center justify-center gap-2 bg-[#F08400] text-white px-6 py-2.5 rounded-md font-semibold hover:bg-black transition-colors"
                  >
                    Visit Website
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Media Partners Section */}
        <section className="py-16 lg:py-20 bg-orange-50">
          <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
            <h2 className="font-bebas text-5xl text-black md:text-6xl text-center mb-10 lg:mb-16">
              Media Partners
            </h2>
            <div className="flex flex-wrap gap-6 justify-center">
              {mediaPartners.map((partner, index) => (
                <div
                  key={index}
                  className="flex w-full max-w-[280px] flex-col items-center gap-4 border border-gray-200 p-5 text-center rounded-lg bg-white shadow-md hover:shadow-xl transition-all duration-300"
                >
                  <div className="h-24 flex items-center justify-center">
                    <Image
                      src={partner.logo}
                      alt={partner.name}
                      width={120}
                      height={80}
                      className="object-contain max-h-20"
                      unoptimized
                    />
                  </div>
                  <h3 className="text-base font-semibold text-black text-center line-clamp-2 min-h-[48px]">
                    {partner.name}
                  </h3>
                  <p className="text-orange-600 text-xs font-medium">{partner.type}</p>
                  <Link
                    href={partner.website}
                    target="_blank"
                    className="w-full mt-auto inline-flex items-center justify-center gap-2 bg-[#F08400] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-black transition-colors"
                  >
                    Visit Website
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Quick Navigation Section */}
<div className="animated-block mt-20">
  <div className="animated-block-target">
    <div className="border-t-8 border-[#F08400] bg-black py-20 text-white">
      
      <div className="w-full max-w-[1600px] 2xl:max-w-[1800px] mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        
        {/* HEADING */}
        <h2 className="font-bebas text-6xl md:text-7xl">
          Quick Navigation
        </h2>

        {/* NAV ITEMS */}
        <div className="mt-16 grid grid-cols-2 gap-y-10 md:grid-cols-5">
          
          {quickLinks.map((item, idx) => (
            <div key={idx} className="relative flex flex-col items-center justify-center text-center">
              
              {/* VERTICAL DIVIDER */}
              {idx !== 0 && (
                <div className="absolute left-0 top-1/2 hidden h-16 w-px -translate-y-1/2 bg-gray-700 md:block"></div>
              )}

              <Link href={item.link} className="flex flex-col items-center">
                
                {/* ICON CIRCLE */}
                                          <div className="flex h-20 w-20 items-center justify-center rounded-full bg-gray-800 overflow-hidden">
                  <Image
                    src={item.icon}
                    alt={item.label}
                    width={32}
                    height={32}
                    className="object-contain"
                  />
                </div>

                {/* LABEL */}
                <p className="mt-4 text-sm font-semibold text-gray-300">
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
<hr className="border-t-6 border-[#F08400]" />
      </div>
      <BackToTop/>
    </div>
  );
}