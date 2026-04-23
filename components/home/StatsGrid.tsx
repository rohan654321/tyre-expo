interface StatItem {
  number: string;
  label: string;
}

interface StatsGridProps {
  stats: StatItem[];
}

export default function StatsGrid({ stats }: StatsGridProps) {
  return (
    <div className="mt-10 bg-[#e9e5df] py-16 px-10">
      <div className="grid grid-cols-2 md:grid-cols-4">
        {stats.map((stat, index) => (
          <div
            key={index}
            className={`
              flex flex-col items-center justify-center text-center
              px-6 md:px-10
              ${index !== stats.length - 1 ? 'md:border-r border-gray-300' : ''}
            `}
          >
            <h3 className="text-[25px] md:text-[35px] lg:text-[42px] font-bold text-[#F08400] leading-none">
              {stat.number}
            </h3>
            <p className="mt-4 text-xs md:text-sm font-semibold text-black uppercase tracking-[2px]">
              {stat.label}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}