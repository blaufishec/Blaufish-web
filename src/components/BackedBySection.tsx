import React from 'react';
import { ScrollReveal } from './ScrollReveal';

interface BackerItem {
  name: string;
  style: React.CSSProperties;
}

const authorities: BackerItem[] = [
  {
    name: 'HACCP Compliant',
    style: {
      fontFamily: '"Times New Roman", serif',
      fontWeight: 400,
      letterSpacing: '0.02em',
      fontSize: '14px',
    },
  },
  {
    name: 'REGISTRO FDA USA',
    style: {
      fontFamily: '"Arial Black", sans-serif',
      fontWeight: 900,
      letterSpacing: '0.08em',
      fontSize: '16px',
    },
  },
  {
    name: 'DOLPHIN SAFE',
    style: {
      fontFamily: 'Impact, sans-serif',
      fontWeight: 700,
      letterSpacing: '0.05em',
      fontSize: '18px',
    },
  },
  {
    name: 'Autorización Sanitaria UE #042',
    style: {
      fontFamily: 'Georgia, serif',
      fontWeight: 600,
      letterSpacing: '-0.02em',
      fontSize: '17px',
    },
  },
  {
    name: 'Estándar MSC Cadena de Custodia',
    style: {
      fontFamily: 'Helvetica, Arial, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.01em',
      fontSize: '15px',
    },
  },
  {
    name: 'AUDITORÍA NFQS COREA',
    style: {
      fontFamily: 'Verdana, sans-serif',
      fontWeight: 700,
      letterSpacing: '0.06em',
      fontSize: '14px',
      textTransform: 'uppercase',
    },
  },
  {
    name: 'CIAT / IATTC VERIFICADO',
    style: {
      fontFamily: '"Courier New", monospace',
      fontWeight: 700,
      letterSpacing: '0.18em',
      fontSize: '14px',
    },
  },
  {
    name: 'Friend of the Sea',
    style: {
      fontFamily: 'Palatino, "Book Antiqua", serif',
      fontWeight: 500,
      letterSpacing: '0.03em',
      fontSize: '15px',
    },
  },
];

export const BackedBySection: React.FC = () => {
  return (
    <section id="certificaciones" className="bg-[#F5F5F5] px-6 py-12 border-y border-black/5">
      <ScrollReveal className="max-w-[88rem] mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 items-center" delay={0}>
        {/* Left col (1/4) */}
        <div className="text-black/70 text-base leading-relaxed">
          Nuestros productos cuentan con las certificaciones
          <br className="hidden md:inline" />
          {' '}y estándares de calidad más exigentes a nivel internacional.
        </div>

        {/* Right col (3/4) */}
        <div className="md:col-span-3 overflow-hidden relative">
          <style>{`
            @keyframes backers-marquee {
              0% { transform: translateX(0%); }
              100% { transform: translateX(-50%); }
            }
            .backers-track {
              display: flex;
              width: max-content;
              animation: backers-marquee 30s linear infinite;
            }
            .backers-track:hover {
              animation-play-state: paused;
            }
          `}</style>

          {/* Side gradient masks */}
          <div className="absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-[#F5F5F5] to-transparent pointer-events-none z-10" />
          <div className="absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-[#F5F5F5] to-transparent pointer-events-none z-10" />

          <div className="backers-track flex items-center">
            {/* Render brands twice for the loop */}
            {[...authorities, ...authorities].map((item, idx) => (
              <span
                key={idx}
                className="mx-10 shrink-0 text-black/50 hover:text-black transition-colors duration-200 whitespace-nowrap cursor-default select-none"
                style={item.style}
              >
                {item.name}
              </span>
            ))}
          </div>
        </div>
      </ScrollReveal>
    </section>
  );
};
