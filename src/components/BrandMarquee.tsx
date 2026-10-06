import React from 'react';

interface MarqueeItem {
  name: string;
  sub?: string;
  style: React.CSSProperties;
}

const destinations: MarqueeItem[] = [
  {
    name: 'Toyosu Tokyo',
    style: {
      fontFamily: 'Georgia, serif',
      fontWeight: 700,
      letterSpacing: '-0.02em',
      fontSize: '15px',
    },
  },
  {
    name: 'NORYANGJIN SEOUL',
    style: {
      fontFamily: 'Arial, sans-serif',
      fontWeight: 900,
      letterSpacing: '0.08em',
      fontSize: '13px',
      textTransform: 'uppercase',
    },
  },
  {
    name: 'Busan Jagalchi',
    style: {
      fontFamily: "'Trebuchet MS', sans-serif",
      fontWeight: 600,
      letterSpacing: '0.01em',
      fontSize: '15px',
      fontStyle: 'italic',
    },
  },
  {
    name: 'HAMBURG FISCHMARKT',
    style: {
      fontFamily: "'Courier New', monospace",
      fontWeight: 700,
      letterSpacing: '0.12em',
      fontSize: '13px',
      textTransform: 'uppercase',
    },
  },
  {
    name: 'New York Fulton',
    style: {
      fontFamily: 'Palatino, "Book Antiqua", serif',
      fontWeight: 400,
      letterSpacing: '-0.01em',
      fontSize: '16px',
    },
  },
  {
    name: 'Los Angeles Wharf',
    style: {
      fontFamily: 'Impact, "Arial Narrow", sans-serif',
      fontWeight: 400,
      letterSpacing: '0.04em',
      fontSize: '14px',
    },
  },
  {
    name: 'Frankfurt Gateway',
    style: {
      fontFamily: 'Verdana, sans-serif',
      fontWeight: 700,
      letterSpacing: '-0.03em',
      fontSize: '13px',
    },
  },
];

export const BrandMarquee: React.FC = () => {
  return (
    <div className="mt-6 md:mt-8 w-full max-w-md overflow-hidden relative">
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0%); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          display: flex;
          width: max-content;
          animation: marquee 22s linear infinite;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      {/* Subtle edge fades */}
      <div className="absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-transparent to-transparent pointer-events-none z-10" />
      <div className="absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-transparent to-transparent pointer-events-none z-10" />

      <div className="marquee-track flex items-center">
        {/* Render items twice for seamless loop */}
        {[...destinations, ...destinations].map((dest, idx) => (
          <span
            key={idx}
            className="mx-7 shrink-0 text-black/60 whitespace-nowrap transition-colors duration-200 hover:text-black cursor-default select-none"
            style={dest.style}
          >
            {dest.name}
          </span>
        ))}
      </div>
    </div>
  );
};
