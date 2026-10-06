import React from 'react';
import { ArrowRight, Award } from 'lucide-react';
import { NavView } from '../types/navigation';
import { ScrollReveal } from './ScrollReveal';

interface InfoSectionProps {
  onDiscover: () => void;
  onNavigate: (view: NavView) => void;
}

export const InfoSection: React.FC<InfoSectionProps> = ({ onDiscover, onNavigate }) => {
  return (
    <section id="conoce-blaufish" className="bg-[#F5F5F5] px-6 pt-8 md:pt-12 pb-20 md:pb-24">
      <div className="max-w-[88rem] mx-auto">
        {/* Row 1: 2-column Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 mb-16 items-start">
          {/* Left Column */}
          <ScrollReveal delay={0}>
            <h2
              className="text-black text-4xl md:text-5xl font-medium leading-tight mb-8"
              style={{ letterSpacing: '-0.03em' }}
            >
              Conoce Blaufish.
            </h2>

            {/* Navy pill "Ver Especies & Cortes" button with white arrow circle */}
            <button
              onClick={() => onNavigate('productos')}
              className="group inline-flex items-center gap-3 bg-[#142344] text-white text-base font-medium pl-7 pr-2 py-2 rounded-full hover:bg-[#1d3260] transition-colors duration-200 cursor-pointer shadow-md hover:shadow-lg"
            >
              <span>Ver Especies & Cortes</span>
              <div className="bg-white rounded-full p-2 group-hover:bg-white/95 transition-colors">
                <ArrowRight className="w-4 h-4 text-[#142344] group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </ScrollReveal>

          {/* Right Column */}
          <ScrollReveal delay={120}>
            <p className="text-black/70 text-2xl md:text-3xl leading-relaxed">
              Blaufish es una empresa comercializadora ecuatoriana de referencia en pesca blanca, suministrando capturas de excelente grado con ultracongelación a bordo directamente a los principales centros de distribución.
            </p>
          </ScrollReveal>
        </div>

        {/* Row 2: 2-card grid (2/3 + 1/3) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Card 1: Pureza de la Corriente de Humboldt (Spans 2 cols on md+) */}
          <ScrollReveal className="md:col-span-2 h-full" delay={0}>
            <div
              onClick={() => onNavigate('productos')}
              className="w-full h-full rounded-2xl relative overflow-hidden group p-7 min-h-80 flex flex-col justify-between shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
              style={{
                backgroundImage: 'url(./assets/picudo_hero.jpg?v=3)',
                backgroundSize: 'cover',
                backgroundPosition: 'center 35%',
              }}
            >
              {/* Soft gradient on the left side to guarantee text legibility */}
              <div className="absolute inset-0 bg-gradient-to-r from-white/75 via-white/35 to-transparent pointer-events-none" />

              {/* Title (top) */}
              <div className="relative z-10">
                <span className="inline-block text-[11px] font-semibold tracking-wider uppercase text-black/60 mb-2">
                  Pesquería de Altura • Corriente de Humboldt
                </span>
                <h3
                  className="text-black text-2xl font-medium leading-snug"
                  style={{ letterSpacing: '-0.02em' }}
                >
                  Pureza de la Corriente de Humboldt
                </h3>
              </div>

              {/* Body (bottom) */}
              <div className="relative z-10">
                <p className="text-black/80 text-base max-w-sm font-normal leading-relaxed">
                  Acceso directo al Picudo y Wahoo capturados por flotas selectivas bajo rigurosas buenas prácticas pesqueras.
                </p>
              </div>
            </div>
          </ScrollReveal>

          {/* Card 2: Calidad de Producto */}
          <ScrollReveal className="md:col-span-1 h-full" delay={150}>
            <div
              onClick={() => onNavigate('calidad-producto')}
              className="w-full h-full rounded-2xl p-7 min-h-80 flex flex-col justify-between shadow-sm transition-transform duration-300 hover:-translate-y-0.5 cursor-pointer"
              style={{ backgroundColor: '#2B2644' }}
            >
              <div>
                <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center text-white/80 mb-6">
                  <Award className="w-5 h-5" />
                </div>
                <h3 className="text-white text-2xl font-medium leading-snug whitespace-pre-line mb-3">
                  {'Calidad Superior\nde Producto.'}
                </h3>
              </div>
              <p className="text-white/60 text-base leading-relaxed">
                Selección rigurosa de piezas de primera categoría con textura firme, frescura intacta y óptimo rendimiento culinario.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  );
};
