import Image from 'next/image';
import { Button } from '../ui/button';
import Container from '../ui/container';
import StatsGrid from './StatsGrid';

const statsData = [
  { number: '30th', label: 'Edition' },
  { number: '10500+', label: 'Visitors' },
  { number: '550+', label: 'Exhibitors' },
  { number: '100+', label: 'Speakers' },
];

export default function AboutSection() {
  return (
    <section className="bg-[#f5f5f5] py-12 sm:py-16 lg:py-20">
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] items-center gap-8 sm:gap-10 lg:gap-12">
          
          {/* LEFT IMAGE */}
          <div className="w-full h-[300px] sm:h-[400px] md:h-[500px] lg:h-[550px] xl:h-[650px] rounded-lg overflow-hidden">
            <Image
              src="https://cdn.itegroupnews.com/33_1_f4d3f3d85d.jpg"
              alt="India Tyre Show"
              width={200}
              height={500}
              className="w-full h-full object-cover"
            />
          </div>

          {/* RIGHT CONTENT */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6">
            <p className="text-[#F08400] font-sans text-[12px] sm:text-[14px] font-semibold uppercase tracking-[1.5px]">
              About India Tyre Show
            </p>

            <h2 className="font-bebas font-bold text-[28px] sm:text-[34px] md:text-[42px] lg:text-[48px] leading-[1.15] tracking-[1px] uppercase text-black">
              POWERING THE FUTURE OF TYRE INDUSTRY
            </h2>

            <div className="font-sans text-[14px] sm:text-[16px] lg:text-[18px] text-gray-700 leading-[1.6] space-y-3 sm:space-y-4">
              <p className="font-medium">
                For three decades, India Tyre Show has been the premier international exhibition 
                for tyre manufacturing and rubber technology. It brings together global tyre professionals, 
                decision-makers, and innovators to connect, collaborate, and explore the technologies 
                shaping the future of the industry.
              </p>
              <p className="font-medium">
                Showcasing state-of-the-art equipment, technologies, and services, India Tyre Show helps 
                companies overcome challenges, expand into key markets, and build lasting partnerships. 
                Whether you&apos;re exploring new opportunities or reinforcing your market presence, 
                this is where the tyre community meets to advance the industry.
              </p>
            </div>

            <div className="mt-2 sm:mt-3 lg:mt-4">
              <StatsGrid stats={statsData} />
            </div>

            <div className="mt-4 sm:mt-5 lg:mt-6">
              <Button
                href="/about-indiatyreshow/"
                className="bg-[#F08400] text-white px-6 sm:px-8 lg:px-10 py-2.5 sm:py-3 lg:py-4 text-xs sm:text-sm font-extrabold uppercase tracking-[1.5px] hover:bg-black transition-all duration-300 inline-block"
              >
                Learn More
              </Button>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}