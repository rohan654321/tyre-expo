import Image from 'next/image';
import Link from 'next/link';
import Container from '../ui/container';

interface Country {
  name: string;
  flag: string;
}

interface CountriesSectionProps {
  countries: Country[];
}

export default function CountriesSection({ countries }: CountriesSectionProps) {
  return (
    <section className="relative overflow-hidden py-16 sm:py-20 lg:py-28 text-white">
      <Image
        src="https://cdn.itegroupnews.com/img_5_cb9a8893c7.jpg"
        alt="Background"
        fill
        className="object-cover"
      />
      <div className="absolute inset-0 bg-black/60" />
      <div className="absolute right-0 top-0 h-full w-1/2 bg-[#F08400]/20 clip-path-polygon hidden lg:block" />

      <Container className="relative z-10">
        <p className="text-[#F08400] font-semibold text-base sm:text-lg">
          Countries Represented
        </p>
        <h2 className="mt-3 sm:mt-4 text-[32px] sm:text-[38px] md:text-[44px] font-semibold leading-[1.1]">
          DISCOVER THE GLOBAL REACH OF INDIA TYRE SHOW
        </h2>
        
        <Link
          href="/exhibitor-list/"
          className="inline-block mt-5 sm:mt-6 bg-[#F08400] px-6 sm:px-8 py-2.5 sm:py-3 lg:py-4 font-bold uppercase tracking-wide hover:bg-orange-600 transition text-sm sm:text-base"
        >
          Explore the 2026 Exhibitor List
        </Link>

        <div className="mt-8 sm:mt-10 lg:mt-12 bg-black/70 backdrop-blur-md rounded-2xl px-4 sm:px-6 py-5 sm:py-6 flex flex-wrap gap-4 sm:gap-6 lg:gap-8 items-center">
          {countries.map((country) => (
            <div key={country.name} className="flex items-center gap-2 sm:gap-3">
              <Image
                src={country.flag}
                alt={country.name}
                width={40}
                height={40}
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10 rounded-full object-cover"
              />
              <span className="text-xs sm:text-sm lg:text-base font-semibold uppercase tracking-wide">
                {country.name}
              </span>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}