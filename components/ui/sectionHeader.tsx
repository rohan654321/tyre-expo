interface SectionHeaderProps {
  topText?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  topText,
  title,
  description,
  align = 'left',
}: SectionHeaderProps) {
  const isCenter = align === 'center';

  return (
    <div className={`mb-12 ${isCenter ? 'text-center' : 'text-left'}`}>

      {/* TOP TEXT */}
      {topText && (
        <p className="text-[#F08400] font-sans text-[14px] uppercase tracking-[1.5px]">
  {topText}
</p>
      )}

      {/* TITLE */}
   <h2 className="font-heading text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.05] tracking-[2px] uppercase text-black mt-4">
  {title}
</h2>

      {/* DESCRIPTION */}
      {description && (
        <p
          className={`
            text-gray-600 mt-6 text-lg leading-relaxed
            ${isCenter ? 'mx-auto max-w-[700px]' : 'max-w-[700px]'}
          `}
        >
          {description}
        </p>
      )}
    </div>
  );
}