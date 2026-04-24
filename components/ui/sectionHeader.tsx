// components/ui/sectionHeader.tsx

interface SectionHeaderProps {
  title: string;
  topText?: string;
  description?: string;
  align?: 'left' | 'center';
}

export default function SectionHeader({
  title,
  topText,
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
      <h2 
        className={`font-bebas font-bold text-[46px] md:text-[70px] uppercase tracking-[2px] text-black leading-[1.05] ${
          topText ? 'mt-3' : ''
        }`}
      >
        {title}
      </h2>

      {/* DESCRIPTION */}
      {description && (
        <p 
          className={`text-gray-600 mt-3 text-base ${
            isCenter ? 'mx-auto max-w-[700px]' : 'max-w-[900px]'
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}