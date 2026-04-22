// app/page.tsx
'use client';

import React, { useState, useRef, useEffect } from 'react';
import BackToTop from '@/components/layout/BackToTop';
import Image from 'next/image';

// ==================== CONFERENCE PROGRAM DATA ====================
const programData = [
  {
    day: "Day 1 Theme : Future of Tyre Manufacturing – Innovation & Automation",
    date: "October 08, 2026",
    description: "*For delegates",
    sessions: [
      { time: "09:00 – 09:35", title: "Registration & Hi Tea" },
      { time: "09:35 – 09:40", title: "Lamp Lighting & Inauguration" },
      { time: "09:40 – 09:55", title: "Welcome Address", speakers: [{ name: "Mr. Rajesh Mehta", position: "MD, Tyre Expo Organizing Committee" }] },
      { time: "09:55 – 10:15", title: "Inaugural Keynote – India's Tyre Industry: Roadmap to Global Leadership", speakers: [{ name: "Dr. Suresh Kumar", position: "President, Automotive Tyre Manufacturers Association" }] },
      { time: "10:15 – 11:30", title: "Panel Discussion : Smart Manufacturing & Industry 4.0 in Tyre Production", description: "Session Topics:", topics: [{ id: 1, title: "AI and Machine Learning in Tyre Manufacturing" }, { id: 2, title: "IoT-enabled Production Lines" }, { id: 3, title: "Predictive Maintenance & Quality Control" }], moderator: { name: "Dr. Robert Chen", position: "Head of Technology, Bridgestone" }, speakers: [{ name: "Sarah Johnson", position: "Director, Michelin" }, { name: "Prof. Markus Weber", position: "Fraunhofer Institute" }, { name: "Lisa Zhang", position: "VP Manufacturing, Continental" }] },
      { time: "11:30 – 12:00", title: "Technical Session 1 : Advanced Rubber Compounds & Material Innovation", speakers: [{ name: "Dr. Anita Desai", position: "Research Director, Apollo Tyres" }] },
      { time: "12:00 – 12:30", title: "Technical Session 2 : High-Performance Materials for Green Tyres", speakers: [{ name: "James Wilson", position: "CTO, Goodyear" }] },
      { time: "12:30 – 13:00", title: "Fireside Chat : Sustainable Raw Materials for Next-Gen Tyres", description: "• Bio-based materials • Recycled rubber innovations • Reducing carbon footprint" },
      { time: "13:00 – 14:00", title: "Networking Lunch" },
      { time: "14:00 – 14:30", title: "Technical Session 3 : Smart Tyre Sensors & IoT Integration", speakers: [{ name: "Dr. Elena Petrova", position: "Head of Innovation, Nokian Tyres" }] },
      { time: "14:30 – 15:30", title: "Panel Discussion : Automation & Robotics in Tyre Manufacturing", description: "Session Topics:", topics: [{ id: 1, title: "Robotic process automation in tyre assembly" }, { id: 2, title: "Automated quality inspection systems" }, { id: 3, title: "Lights-out manufacturing capabilities" }], moderator: { name: "Michael Brown", position: "CEO, Tyre Robotics Solutions" }, speakers: [{ name: "Sarah Johnson", position: "Director, Michelin" }, { name: "James Wilson", position: "CTO, Goodyear" }] },
      { time: "15:30 – 16:00", title: "Networking Hi Tea" },
      { time: "16:00 – 16:30", title: "Technical Session 4 : Tyre Testing & Quality Assurance", speakers: [{ name: "Prof. Markus Weber", position: "Fraunhofer Institute" }] },
      { time: "16:30 – 17:00", title: "Technical Session 5 : Digital Twin Technology in Tyre Design", speakers: [{ name: "Lisa Zhang", position: "VP Manufacturing, Continental" }] },
      { time: "17:00 – 17:10", title: "Closing Remarks Day 1" }
    ]
  },
  {
    day: "Day 2 Theme : Sustainability & Circular Economy in Tyre Industry",
    date: "October 09, 2026",
    description: "*For delegates of all categories",
    sessions: [
      { time: "09:30 – 10:00", title: "Registration & Hi Tea" },
      { time: "10:00 – 11:00", title: "Panel Discussion : Circular Economy & Tyre Recycling", description: "Session Topics:", topics: [{ id: 1, title: "End-of-life tyre management" }, { id: 2, title: "Recycling technologies & innovations" }, { id: 3, title: "Regulatory compliance & EPR norms" }], moderator: { name: "Michael Brown", position: "CEO, Tyre Recycling Solutions" }, speakers: [{ name: "Dr. Anita Desai", position: "Apollo Tyres" }, { name: "Prof. Markus Weber", position: "Fraunhofer Institute" }] },
      { time: "11:00 – 11:30", title: "Technical Session 6 : Sustainable Materials for Eco-Friendly Tyres", speakers: [{ name: "Dr. Anita Desai", position: "Research Director, Apollo Tyres" }] },
      { time: "11:30 – 12:00", title: "Fireside Chat : Reducing Carbon Footprint in Tyre Manufacturing", description: "• Energy-efficient production • Renewable energy integration • Carbon-neutral initiatives" },
      { time: "12:00 – 12:30", title: "Technical Session 7 : Advanced Recycling Technologies", speakers: [{ name: "Michael Brown", position: "CEO, Tyre Recycling Solutions" }] },
      { time: "12:30 – 13:00", title: "Technical Session 8 : Bio-Based Materials for Tyre Production", speakers: [{ name: "Dr. Elena Petrova", position: "Head of Innovation, Nokian Tyres" }] },
      { time: "13:00 – 14:00", title: "Networking Lunch" },
      { time: "14:00 – 15:00", title: "Panel Discussion : Global Trends & Market Opportunities", description: "Session Topics:", topics: [{ id: 1, title: "Emerging markets & export opportunities" }, { id: 2, title: "Global supply chain dynamics" }, { id: 3, title: "Trade policies & standards compliance" }], moderator: { name: "Dr. Robert Chen", position: "Head of Technology, Bridgestone" }, speakers: [{ name: "James Wilson", position: "CTO, Goodyear" }, { name: "Lisa Zhang", position: "VP Manufacturing, Continental" }] },
      { time: "15:00 – 15:30", title: "Networking Hi Tea" },
      { time: "15:30 – 16:00", title: "Technical Session 9 : Smart Mobility & Future Tyre Technologies", speakers: [{ name: "Dr. Robert Chen", position: "Head of Technology, Bridgestone" }] },
      { time: "16:00 – 16:30", title: "Technical Session 10 : AI-Driven Quality Control Systems", speakers: [{ name: "Sarah Johnson", position: "Director, Michelin" }] },
      { time: "16:30 – 17:00", title: "Closing Ceremony & Awards", description: "Recognition of industry leaders & innovation awards" },
      { time: "17:00 – 17:10", title: "Vote of Thanks" }
    ]
  }
];

// ==================== SPEAKERS DATA ====================
const speakersData = [
  { id: '1', name: 'Dr. Robert Chen', title: 'Head of Tyre Technology', company: 'Bridgestone Corporation', imageUrl: 'https://regional-cdn.itegroupnews.com/Aleksandr_Pistun_f52df668a9.png', session: 'Future of Smart Tyres', time: 'Day 1, 10:00 AM' },
  { id: '2', name: 'Sarah Johnson', title: 'Director of Sustainability', company: 'Michelin', imageUrl: 'https://regional-cdn.itegroupnews.com/Kondrateva_1_79bf33c0ac.png', session: 'Sustainable Materials', time: 'Day 1, 11:45 AM' },
  { id: '3', name: 'Prof. Markus Weber', title: 'Head of Rubber Technology', company: 'Fraunhofer Institute', imageUrl: 'https://regional-cdn.itegroupnews.com/Shulcz_45477a7a66.png', session: 'Advanced Compounds', time: 'Day 1, 2:00 PM' },
  { id: '4', name: 'Lisa Zhang', title: 'VP of Manufacturing', company: 'Continental', imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png', session: 'Industry 4.0', time: 'Day 1, 3:45 PM' },
  { id: '5', name: 'James Wilson', title: 'CTO', company: 'Goodyear', imageUrl: 'https://regional-cdn.itegroupnews.com/Sorokousova_a6593878a3.png', session: 'AI Quality Control', time: 'Day 2, 10:00 AM' },
  { id: '6', name: 'Dr. Anita Desai', title: 'Research Director', company: 'Apollo Tyres', imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png', session: 'Green Materials', time: 'Day 2, 11:45 AM' },
  { id: '7', name: 'Michael Brown', title: 'CEO', company: 'Tyre Recycling Solutions', imageUrl: 'https://regional-cdn.itegroupnews.com/uehjd_9ead53b16a.png', session: 'Recycling Tech', time: 'Day 2, 2:00 PM' },
  { id: '8', name: 'Dr. Elena Petrova', title: 'Head of Innovation', company: 'Nokian Tyres', imageUrl: 'https://regional-cdn.itegroupnews.com/Kuzneczov_feddd81b00.png', session: 'Smart Sensors', time: 'Day 2, 3:45 PM' }
];

// ==================== FAQ DATA ====================
const faqItems = [
  { id: 1, question: "When will Tyre Expo 2026 take place?", answer: "October 08-09, 2026" },
  { id: 2, question: "Where will the conference be held?", answer: "Auto Cluster Exhibition Centre, Chinchwad, Pune, India" },
  { id: 3, question: "Can I participate in Tyre Expo 2026 online?", answer: "No. Tyre Expo 2026 will be held offline at the venue." },
  { id: 4, question: "Will there be recordings of the sessions?", answer: "No. However, delegates will receive presentation materials (with speaker approval)." },
  { id: 5, question: "Can I get a ticket refund?", answer: "Yes, but only within specified deadlines. Refund rules depend on cancellation timing." },
  { id: 6, question: "Is there a group discount available?", answer: "Yes, group discounts are available for 3 or more delegates booking together." }
];

// ==================== COMPONENTS ====================

// Hero Section
function HeroSection() {
  return (
    <section className="relative min-h-[50vh] lg:min-h-[60vh] w-full overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent z-10" />
        <div className="absolute inset-0 bg-[url('https://www.team-bhp.com/forum/attachments/tyre-alloy-wheel-section/2716695d1737442979-bharat-mobility-expo-2025-india-international-tyre-show-2025-dscf1158.jpg')] bg-cover bg-center scale-110" />
      </div>
      
      <div className="relative z-20 flex min-h-[50vh] lg:min-h-[60vh] w-full items-center px-4 sm:px-6 lg:px-8">
        <div className="mx-auto w-full max-w-[1440px]">
          <div className="max-w-3xl">
            <div className="inline-block px-4 py-2 bg-[#F08400]/20 backdrop-blur-sm rounded-lg mb-4">
              <span className="text-[#F08400] font-semibold">
                October 08-09, 2026 | Pune, India
              </span>
            </div>

            <h1 className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black text-white leading-[1.1] tracking-tighter mb-4">
              INDIA TYRE SHOW 2027
            </h1>

            <p className="text-lg md:text-xl text-gray-200 mb-6 max-w-2xl">
              International Conference on Tyre Manufacturing Technology & Innovation
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <button className="px-6 py-3 bg-[#F08400] text-white font-bold hover:bg-[#d97000] hover:scale-105 transition-all duration-300 shadow-lg">
                Become a Delegate →
              </button>

              <button className="px-6 py-3 bg-transparent border-2 border-white text-white font-bold hover:bg-white hover:text-black transition-all duration-300">
                Become a Partner
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// About Section
function AboutSection() {
  const stats = [
    { number: "300+", label: "Industry Leaders", color: "bg-orange-50" },
    { number: "30+", label: "Expert Speakers", color: "bg-orange-100" },
    { number: "15+", label: "Technical Sessions", color: "bg-orange-50" },
    { number: "20+", label: "Countries", color: "bg-orange-100" }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-[#F08400]/10 rounded-lg mb-6">
              <span className="text-[#F08400] font-semibold">ABOUT THE EVENT</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6 leading-tight">
              Where <span className="text-[#F08400]">Innovation</span> Meets <span className="text-[#F08400]">Excellence</span>
            </h2>
            <p className="text-gray-600 text-lg mb-8 leading-relaxed">
              Tyre Expo 2026 is the premier international conference dedicated to tyre manufacturing technology, 
              innovation, and sustainability. Join industry leaders, technology experts, and decision-makers 
              from across the globe.
            </p>
            <div className="grid grid-cols-2 gap-4">
              {stats.map((stat, idx) => (
                <div key={idx} className={`${stat.color} p-6 rounded-sm text-center hover:scale-105 transition-transform duration-300`}>
                  <div className="text-3xl md:text-4xl font-black text-[#F08400]">{stat.number}</div>
                  <div className="text-gray-700 font-medium mt-2">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -left-4 w-24 h-24 bg-[#F08400]/20 rounded-xl z-0" />
            <div className="absolute -bottom-4 -right-4 w-32 h-32 bg-[#F08400]/10 rounded-xl z-0" />
            <div className="relative bg-gray-200 rounded-sm overflow-hidden aspect-square z-10">
              <img src="https://www.pace-tyres.com/static/upload/image/20230915/1694772403135963.jpg" alt="Tyre Conference" className="w-full h-full object-cover" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SpeakersSection() {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const autoScrollRef = useRef<NodeJS.Timeout | null>(null);

  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [isHovered, setIsHovered] = useState(false);

  // Duplicate for smooth loop feel
  const loopedSpeakers = [...speakersData, ...speakersData];

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const scrollAmount = 320;
      scrollContainerRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  const checkScroll = () => {
    const container = scrollContainerRef.current;
    if (!container) return;

    const { scrollLeft, scrollWidth, clientWidth } = container;
    setCanScrollLeft(scrollLeft > 0);
    setCanScrollRight(scrollLeft + clientWidth < scrollWidth - 10);
  };

  // 🔥 Auto Scroll
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    autoScrollRef.current = setInterval(() => {
      if (isHovered) return;

      const maxScrollLeft = container.scrollWidth - container.clientWidth;

      if (container.scrollLeft >= maxScrollLeft - 1) {
        container.scrollTo({ left: 0, behavior: 'auto' });
      } else {
        container.scrollBy({ left: 1, behavior: 'auto' });
      }
    }, 20);

    return () => {
      if (autoScrollRef.current) clearInterval(autoScrollRef.current);
    };
  }, [isHovered]);

  // Scroll detection
  useEffect(() => {
    const container = scrollContainerRef.current;
    if (!container) return;

    container.addEventListener('scroll', checkScroll);
    checkScroll();

    return () => container.removeEventListener('scroll', checkScroll);
  }, []);

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#F08400]/10  mb-4">
            <span className="text-[#F08400] font-semibold">SPEAKERS</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Industry <span className="text-[#F08400]">Experts</span>
          </h2>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Leading voices from global tyre manufacturers, technology providers, and research institutions
          </p>
        </div>

        <div className="relative">
          
          

          {/* Slider */}
          <div
            ref={scrollContainerRef}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            className="flex overflow-x-auto overflow-y-visible scrollbar-hide gap-8 pb-12 px-6"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {loopedSpeakers.map((speaker, index) => (
              <div
  key={index}
  className="flex-shrink-0 w-[300px] group cursor-pointer relative z-10"
>
  <div
    className="bg-white  shadow-lg transform transition-all duration-500 ease-out
    group-hover:scale-x-[1.15] group-hover:scale-y-[1.05]
    group-hover:-translate-y-4
    group-hover:z-20
    origin-center"
  >
                  
                  {/* Image */}
                  <div className="relative h-[300px] overflow-hidden bg-gradient-to-br from-[#F08400]/20 to-orange-100">
                    <img
                      src={speaker.imageUrl}
                      alt={speaker.name}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                    {/* Hover Content */}
                    <div className="absolute bottom-0 left-0 right-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-500">
                      <p className="text-white text-sm font-semibold">
                        {speaker.session}
                      </p>
                      <p className="text-gray-300 text-xs">
                        {speaker.time}
                      </p>
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-5">
                    <h3 className="font-bold text-xl text-black mb-1 group-hover:text-[#F08400] transition-colors">
                      {speaker.name}
                    </h3>
                    <p className="text-[#F08400] text-sm font-semibold mb-1">
                      {speaker.title}
                    </p>
                    <p className="text-gray-500 text-sm">
                      {speaker.company}
                    </p>
                  </div>

                </div>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}




// Conference Programme Section
function ConferenceProgramme() {
  const [activeDay, setActiveDay] = useState(0);
  const selectedDay = programData[activeDay];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#F08400]/10 rounded-lg mb-4">
            <span className="text-[#F08400] font-semibold">SCHEDULE</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Conference <span className="text-[#F08400]">Programme</span>
          </h2>
        </div>
        
        {/* Day Tabs */}
        <div className="flex justify-center gap-4 mb-10">
          {programData.map((day, index) => (
            <button
              key={index}
              onClick={() => setActiveDay(index)}
              className={`px-8 py-4 rounded-lg font-bold transition-all duration-300 ${
                activeDay === index
                  ? "bg-[#F08400] text-white shadow-lg scale-105"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
            >
              {day.date}
            </button>
          ))}
        </div>

        {/* Programme Content */}
        <div className="bg-gray-50 rounded-2xl p-8">
          <div className="mb-8 pb-4 border-b-2 border-[#F08400]">
            <h3 className="text-2xl font-bold text-black mb-2">{selectedDay.day}</h3>
            <p className="text-gray-500">{selectedDay.description}</p>
          </div>

          <div className="space-y-6">
            {selectedDay.sessions.map((session, idx) => (
              <div key={idx} className="group hover:bg-white p-4 rounded-xl transition-all duration-300">
                <div className="grid grid-cols-1 md:grid-cols-[120px_1fr] gap-4">
                  <div className="text-[#F08400] font-bold">{session.time}</div>
                  <div>
                    <h4 className="text-lg font-bold text-black mb-2 group-hover:text-[#F08400] transition-colors">
                      {session.title}
                    </h4>
                    {session.description && (
                      <p className="text-gray-600 text-sm mb-2">{session.description}</p>
                    )}
                    {session.topics && (
                      <ul className="list-disc pl-5 space-y-1 text-gray-600 text-sm mb-2">
                        {session.topics.map(topic => (
                          <li key={topic.id}>{topic.title}</li>
                        ))}
                      </ul>
                    )}
                    {session.speakers && (
                      <div className="mt-2">
                        {session.speakers.map((speaker, i) => (
                          <p key={i} className="text-sm text-gray-500">
                            {speaker.name} - {speaker.position}
                          </p>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// Why Attend Section
function WhyAttendSection() {
  const reasons = [
    { icon: "🎯", title: "Stay Updated on Key Industry Developments", description: "Gain insights into the latest trends in tyre manufacturing, automation, and sustainable materials." },
    { icon: "📈", title: "Insights for Business Growth", description: "Discover new opportunities for business expansion and emerging technologies." },
    { icon: "🤝", title: "Networking Opportunities", description: "Connect with industry leaders, experts, and decision-makers from global tyre companies." },
    { icon: "💡", title: "Innovation Showcase", description: "Experience cutting-edge technologies and solutions from leading manufacturers." },
    { icon: "🌍", title: "Global Perspective", description: "Learn from international case studies and best practices." },
    { icon: "🏆", title: "Recognition & Awards", description: "Celebrate excellence in tyre manufacturing innovation." }
  ];

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#F08400]/10 rounded-lg mb-4">
            <span className="text-[#F08400] font-semibold">WHY ATTEND</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Why Attend <span className="text-[#F08400]">Tyre Expo 2026</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reasons.map((reason, idx) => (
            <div key={idx} className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group">
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">{reason.icon}</div>
              <h3 className="font-bold text-xl mb-3 text-black group-hover:text-[#F08400] transition-colors">{reason.title}</h3>
              <p className="text-gray-600 leading-relaxed">{reason.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Venue Section
function VenueSection() {
  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-block px-4 py-2 bg-[#F08400]/10 rounded-lg mb-4">
              <span className="text-[#F08400] font-semibold">VENUE</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-6">
              Event <span className="text-[#F08400]">Location</span>
            </h2>
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Auto Cluster Exhibition Centre</h3>
              <p className="text-gray-600 leading-relaxed">
                Chinchwad East, Old Mumbai - Pune Hwy, MIDC, Chinchwad,<br />
                Pimpri-Chinchwad, Maharashtra 411019, India
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">✈️</span>
                <span className="font-semibold">From Airport:</span>
                <span className="text-gray-600">15 km, 30 minutes</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🚂</span>
                <span className="font-semibold">From Railway Station:</span>
                <span className="text-gray-600">8 km, 20 minutes</span>
              </div>
              <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                <span className="text-2xl">🏨</span>
                <span className="font-semibold">Nearby Hotels:</span>
                <span className="text-gray-600">Within 2 km radius</span>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="absolute -top-4 -right-4 w-24 h-24 bg-[#F08400]/20 rounded-xl z-0" />
            <div className="relative bg-gray-200 rounded-xl overflow-hidden h-[400px] z-10">
             <div className="w-full h-full">
  <iframe
    src="https://www.google.com/maps?q=Pune,India&output=embed"
    className="w-full h-full border-0"
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  ></iframe>
</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// Organizer Section
function OrganizerSection() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#F08400]/10 rounded-lg mb-4">
            <span className="text-[#F08400] font-semibold">ORGANIZER</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Behind the <span className="text-[#F08400]">Event</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h3 className="text-2xl font-bold mb-4 text-[#F08400]">Maxx Business Media</h3>
            <p className="text-gray-600 leading-relaxed">
              Tyre Expo is organized by Maxx Business Media, a leading exhibition organizer with a strong portfolio 
              of industrial trade fairs and conferences across key manufacturing sectors.
            </p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow">
            <h4 className="font-bold text-xl mb-4 text-black">Contact Information</h4>
            <div className="space-y-3">
              <p className="text-gray-600">📧 info@tyre-expo.com</p>
              <p className="text-gray-600">📞 +91 1234567890</p>
              <p className="text-gray-600">🌐 www.tyre-expo.com</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// FAQ Section
function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#F08400]/10 rounded-lg mb-4">
            <span className="text-[#F08400] font-semibold">FAQ</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Frequently Asked <span className="text-[#F08400]">Questions</span>
          </h2>
        </div>
        
        <div className="max-w-3xl mx-auto space-y-4">
          {faqItems.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.id} className="border border-gray-200 rounded-xl overflow-hidden">
                <button
                  onClick={() => setOpenIndex(isOpen ? null : index)}
                  className="flex w-full justify-between items-center p-6 text-left bg-white hover:bg-gray-50 transition-colors"
                >
                  <h3 className="text-lg md:text-xl font-semibold text-black">{item.question}</h3>
                  <span className={`text-[#F08400] text-2xl transform transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                    ↓
                  </span>
                </button>
                {isOpen && (
                  <div className="p-6 pt-0 text-gray-600 border-t border-gray-100 bg-gray-50">
                    <p>{item.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

// Contacts Section
function Contacts() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-br from-[#F08400]/5 to-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#F08400]/10 rounded-lg mb-4">
            <span className="text-[#F08400] font-semibold">GET IN TOUCH</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Contact <span className="text-[#F08400]">Information</span>
          </h2>
        </div>
        
        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#F08400]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl">🤝</span>
            </div>
            <h3 className="text-xl font-bold mb-3">For Participation & Partnership</h3>
            <p className="text-gray-600 mb-2">📧 partnership@tyre-expo.com</p>
            <p className="text-gray-600">📞 +91 9876543210</p>
          </div>
          <div className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all hover:-translate-y-1">
            <div className="w-16 h-16 bg-[#F08400]/10 rounded-lg flex items-center justify-center mb-4">
              <span className="text-3xl">🎤</span>
            </div>
            <h3 className="text-xl font-bold mb-3">For Speaking Opportunities</h3>
            <p className="text-gray-600 mb-2">📧 speakers@tyre-expo.com</p>
            <p className="text-gray-600">📞 +91 9876543211</p>
          </div>
        </div>
      </div>
    </section>
  );
}

// Become Delegate Section
function BecomeDelegate() {
  const packages = [
    { title: "Student", price: "₹ 3,500", features: ["Access to all technical sessions", "Conference kit", "Entry to exhibition area", "Certificate of Participation", "Lunch & refreshments"] },
    { title: "General", price: "₹ 6,000", features: ["Full access to all sessions", "Conference kit", "Networking lunch & tea breaks", "B2B networking opportunity", "Access to speakers' presentations", "Certificate of Participation"] },
    { title: "Group of 3", price: "₹ 15,000", features: ["Full conference access for 3", "Priority seating", "Company name recognition", "Networking lunch & tea breaks", "Digital presentations access", "Participation certificates", "Priority B2B meeting assistance"] }
  ];

  return (
    <section className="py-20 lg:py-28 bg-white">
      <div className="container mx-auto px-4 max-w-[1440px]">
        <div className="text-center mb-12">
          <div className="inline-block px-4 py-2 bg-[#F08400]/10 rounded-lg mb-4">
            <span className="text-[#F08400] font-semibold">REGISTRATION</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold text-black mb-4">
            Become a <span className="text-[#F08400]">Delegate</span>
          </h2>
          <p className="text-gray-600 text-lg">Prices include GST</p>
        </div>
        
        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {packages.map((pkg, idx) => (
            <div key={idx} className="bg-gray-50 rounded-xl p-8 shadow-lg hover:shadow-2xl hover:-translate-y-2 transition-all duration-300 group">
              <div className="text-center mb-6">
                <h3 className="text-2xl font-bold mb-2 group-hover:text-[#F08400] transition-colors">{pkg.title}</h3>
                <div className="text-4xl font-black text-[#F08400]">{pkg.price}</div>
              </div>
              <ul className="space-y-3 mb-8">
                {pkg.features.map((feature, i) => (
                  <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                    <span className="text-[#F08400] font-bold">✓</span>
                    {feature}
                  </li>
                ))}
              </ul>
              <button className="w-full bg-[#F08400] text-white py-3 rounded-lg font-bold hover:bg-[#d97000] hover:scale-105 transition-all duration-300">
                REGISTER NOW →
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}



// ==================== MAIN PAGE ====================
export default function ConferencePage() {
  return (
    <div className="relative min-h-screen font-sans antialiased bg-white">
      <HeroSection />
      <AboutSection />
      <SpeakersSection />
      <ConferenceProgramme />
      <WhyAttendSection />
      <BecomeDelegate />
      <VenueSection />
      <OrganizerSection />
      <Contacts />
      <FAQ />
      <BackToTop />
    </div>
  );
}