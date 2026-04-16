import Image from 'next/image';
import { Button } from '../ui/button';
import Section from '../ui/section';
import StatsGrid from './StatsGrid';

const statsData = [
  { number: '30th', label: 'Edition' },
  { number: '10500+', label: 'Visitors' },
  { number: '550+', label: 'Exhibitors' },
  { number: '100+', label: 'Speakers' },
];

export default function AboutSection() {
  return (
    <Section className="bg-[#f5f5f5] py-20">
      <div className="w-full mx-auto grid lg:grid-cols-[38%_62%] items-center gap-16 px-4 lg:px-6">

        {/* LEFT IMAGE */}
        <div className="w-full max-w-[500px] h-[650px]">
          <Image
            src="https://cdn.itegroupnews.com/33_1_f4d3f3d85d.jpg"
            alt="India Tyre Show"
            width={200}
            height={500}
            className="w-full h-full object-cover"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div className="flex flex-col gap-6 max-w-[800px]">

          {/* SMALL TITLE */}
          <p className="text-[#F08400] font-sans text-[14px] uppercase tracking-[1.5px]">
            About India Tyre Show
          </p>

          {/* BIG HEADING */}
<h2 className="font-heading text-[22px] sm:text-[40px] lg:text-[52px] leading-[1.20] tracking-[2px] uppercase text-black">
  POWERING THE FUTURE OF TYRE INDUSTRY
</h2>

          {/* DESCRIPTION */}
          <p className="font-sans text-[16px] sm:text-[18px] text-gray-700 leading-[1.6] max-w-7xl">
            For three decades, India Tyre Show has been the premier international exhibition 
            for tyre manufacturing and rubber technology. It brings together global tyre professionals, 
            decision-makers, and innovators to connect, collaborate, and explore the technologies 
            shaping the future of the industry.
            <br /><br />
            Showcasing state-of-the-art equipment, technologies, and services, India Tyre Show helps 
            companies overcome challenges, expand into key markets, and build lasting partnerships. 
            Whether you're exploring new opportunities or reinforcing your market presence, 
            this is where the tyre community meets to advance the industry.
          </p>

          {/* STATS */}
          <div className="mt-4 max-w-7xl">
  <StatsGrid stats={statsData} />
</div>

          {/* BUTTON */}
          <div className="mt-6">
            <Button
              href="/about-indiatyreshow/"
              className="bg-[#F08400] text-white px-10 py-4 text-sm font-semibold uppercase tracking-[1.5px] hover:bg-orange-600 transition-all duration-300"
            >
              Learn More
            </Button>
          </div>

        </div>
      </div>
    </Section>
  );
}