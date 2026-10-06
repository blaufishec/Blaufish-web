import React, { useState, useRef } from 'react';
import { ArrowRight, Anchor, Fish, HeartHandshake, Sparkles, PhoneCall, ChevronDown } from 'lucide-react';
import { NavView } from '../types/navigation';
import { ScrollReveal } from './ScrollReveal';

interface UseCasesSectionProps {
  onNavigate: (view: NavView) => void;
  onOpenPortal?: (mode?: string) => void;
}

interface PillarItem {
  id: string;
  view: NavView;
  tag: string;
  badge: string;
  title: string;
  headline: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
  buttonLabel: string;
  bgImage: string;
}

const pillars: PillarItem[] = [
  {
    id: 'quienes-somos',
    view: 'quienes-somos',
    tag: 'Nuestra Historia',
    badge: 'Empresa Familiar',
    title: 'Quiénes Somos',
    headline: 'Tradición marina con visión de estándares mundiales',
    description:
      'Fundada en Manta —puerto pesquero insignia del Pacífico ecuatoriano—, Blaufish Cía. Ltda. es una empresa familiar y comercializadora líder con más de 15 años de experiencia, con estrechos lazos comerciales internacionales.',
    icon: Anchor,
    buttonLabel: 'Conocer Quiénes Somos',
    bgImage: './assets/master_inspector.jpg?v=5',
  },
  {
    id: 'productos',
    view: 'productos',
    tag: 'Catálogo de Especies',
    badge: 'Calidad de Exportación',
    title: 'Especies & Productos',
    headline: 'Picudo y Wahoo de primera selección',
    description:
      'Pescados de carne firme, textura consistente y sabor delicado. Seleccionados con ultracongelación a bordo para mantener intacta su estructura celular y frescura óptima.',
    icon: Fish,
    buttonLabel: 'Ver Catálogo y Fichas Técnicas',
    bgImage: './assets/picudo_hero.jpg?v=3',
  },
  {
    id: 'responsabilidad-social',
    view: 'responsabilidad-social',
    tag: 'Compromiso Ético & Operativo',
    badge: 'Sostenibilidad & Procesos',
    title: 'Responsabilidad Social',
    headline: 'Procesos normativos, prácticas de captura y cadena de frío',
    description:
      'Operaciones estandarizadas bajo las normas y políticas de cada empresa. Aplicamos métodos de correctas prácticas de captura y preservación estricta de la cadena de frío.',
    icon: HeartHandshake,
    buttonLabel: 'Explorar Responsabilidad Social',
    bgImage: './assets/korea_logistics.jpg?v=3',
  },
];

export const UseCasesSection: React.FC<UseCasesSectionProps> = ({ onNavigate, onOpenPortal }) => {
  const [activePillarIndex, setActivePillarIndex] = useState<number>(0);
  const pillarRefs = useRef<(HTMLDivElement | null)[]>([]);

  const handlePillarClick = (idx: number) => {
    setActivePillarIndex(idx);

    setTimeout(() => {
      const el = pillarRefs.current[idx];
      if (!el) return;

      const rect = el.getBoundingClientRect();
      const viewportHeight = window.innerHeight;

      // Centrado vertical simétrico en pantalla (fórmula unificada que centra exactamente como Especies)
      const idealCenter = (viewportHeight - rect.height) / 2;
      const topMargin = Math.max(75, idealCenter);

      const targetScrollY = window.scrollY + rect.top - topMargin;

      window.scrollTo({
        top: Math.max(0, targetScrollY),
        behavior: 'smooth',
      });
    }, 120);
  };

  return (
    <section id="pilares-blaufish" className="bg-[#F5F5F5] px-4 sm:px-6 pt-20 md:pt-24 pb-12 md:pb-16 border-t border-black/5">
      <div className="max-w-[88rem] mx-auto">
        {/* Section Header */}
        <ScrollReveal className="max-w-2xl mb-12" delay={0}>
          <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-black/50 mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Pilares Fundamentales • Blaufish</span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-medium tracking-tight text-black leading-tight mb-4"
            style={{ letterSpacing: '-0.03em' }}
          >
            Conoce lo esencial de nuestra operación.
          </h2>

          <p className="text-black/60 text-base leading-relaxed font-light">
            Selecciona cualquiera de las opciones para descubrir los pilares que definen a Blaufish: nuestra trayectoria, las especies del Pacífico y nuestro compromiso en origen.
          </p>
        </ScrollReveal>

        {/* 3 Interactive Accordion Options with Photo expanding right below the touched option */}
        <div className="flex flex-col gap-5">
          {pillars.map((pillar, idx) => {
            const Icon = pillar.icon;
            const isSelected = idx === activePillarIndex;

            return (
              <ScrollReveal key={pillar.id} delay={idx * 100}>
                <div
                  ref={(el) => (pillarRefs.current[idx] = el)}
                  className={`rounded-3xl border transition-all duration-200 overflow-hidden ${isSelected
                      ? 'bg-white border-[#142344]/30 shadow-xl ring-1 ring-[#142344]/10'
                      : 'bg-white hover:bg-neutral-50/80 border-black/5 hover:border-black/15 shadow-sm'
                    }`}
                >
                  {/* Clickable Option Header Bar */}
                  <button
                    type="button"
                    onClick={() => handlePillarClick(idx)}
                    className={`w-full text-left p-5 md:p-6 flex items-center justify-between cursor-pointer transition-colors ${isSelected ? 'bg-[#142344] text-white' : 'text-black'
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors shrink-0 ${isSelected ? 'bg-white/15 text-white' : 'bg-black/5 text-black'
                          }`}
                      >
                        <Icon className="w-6 h-6" />
                      </div>
                      <div>
                        <div
                          className={`text-[11px] uppercase tracking-wider font-semibold mb-0.5 ${isSelected ? 'text-white/70' : 'text-black/50'
                            }`}
                        >
                          {pillar.badge}
                        </div>
                        <div className="text-xl md:text-2xl font-medium leading-snug">
                          {pillar.title}
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <span
                        className={`hidden sm:inline text-xs font-medium ${isSelected ? 'text-white/80' : 'text-black/40'
                          }`}
                      >
                        {isSelected ? 'Mostrando información' : 'Tocar para ver'}
                      </span>
                      <div
                        className={`w-9 h-9 rounded-full flex items-center justify-center transition-transform duration-300 ${isSelected
                            ? 'bg-white text-[#142344] rotate-180'
                            : 'bg-black/5 text-black/50'
                          }`}
                      >
                        <ChevronDown className="w-4 h-4" />
                      </div>
                    </div>
                  </button>

                  {/* Expanded content appearing right below the touched option */}
                  {isSelected && (
                    <div className="p-6 md:p-8 border-t border-black/5 bg-[#FAFAFA] animate-in fade-in slide-in-from-top-2 duration-300">
                      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                        {/* Photo representing the option */}
                        <div className="lg:col-span-6 rounded-2xl overflow-hidden aspect-[16/10] md:aspect-[4/3] bg-neutral-900 shadow-md relative group">
                          <img
                            src={pillar.bgImage}
                            alt={pillar.title}
                            className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                          />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent pointer-events-none" />
                          <div className="absolute bottom-4 left-4 right-4 text-white">
                            <span className="bg-black/60 backdrop-blur-md px-3.5 py-1.5 rounded-full text-xs font-medium border border-white/20">
                              {pillar.tag}
                            </span>
                          </div>
                        </div>

                        {/* Content side */}
                        <div className="lg:col-span-6 flex flex-col justify-between">
                          <div>
                            <div className="inline-block px-3 py-1 rounded-full bg-[#142344]/10 text-[#142344] text-xs font-semibold uppercase tracking-wider mb-3">
                              {pillar.badge}
                            </div>

                            <h3
                              className="text-2xl md:text-3xl font-medium tracking-tight text-black leading-snug mb-3"
                              style={{ letterSpacing: '-0.02em' }}
                            >
                              {pillar.headline}
                            </h3>

                            <p className="text-black/70 text-sm md:text-base leading-relaxed mb-6 font-light">
                              {pillar.description}
                            </p>
                          </div>

                          <div>
                            <button
                              type="button"
                              onClick={() => onNavigate(pillar.view)}
                              className="group inline-flex items-center gap-3 bg-[#142344] text-white text-sm md:text-base font-medium pl-6 pr-2 py-2 rounded-full hover:bg-[#1d3260] transition-all cursor-pointer shadow-md hover:shadow-lg"
                            >
                              <span>{pillar.buttonLabel}</span>
                              <div className="bg-white rounded-full p-2 group-hover:scale-105 transition-transform">
                                <ArrowRight className="w-4 h-4 text-[#142344] group-hover:translate-x-0.5 transition-transform" />
                              </div>
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </ScrollReveal>
            );
          })}
        </div>

        {/* Atención Inmediata: Siempre abajo antes del pie de página */}
        {onOpenPortal && (
          <ScrollReveal delay={120} className="mt-14 md:mt-16">
            <div className="bg-[#142344] text-white rounded-3xl p-8 md:p-10 shadow-xl border border-[#142344] flex flex-col md:flex-row items-center justify-between gap-6">
              <div className="flex items-start sm:items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center shrink-0">
                  <PhoneCall className="w-6 h-6" />
                </div>
                <div>
                  <div className="inline-flex items-center gap-1.5 text-xs uppercase tracking-widest font-semibold text-white/60 mb-1">
                    <span>Atención Inmediata</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-medium tracking-tight leading-snug">
                    ¿Tienes una consulta directa o requieres cotización?
                  </h3>
                  <p className="text-white/70 text-xs md:text-sm mt-1 max-w-xl font-light">
                    Nuestro departamento comercial en Manta atiende solicitudes de importadores, distribuidores y compradores de pesca blanca.
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => onOpenPortal()}
                className="group inline-flex items-center gap-3 bg-white text-[#142344] text-sm md:text-base font-medium pl-6 pr-2 py-2.5 rounded-full hover:bg-white/95 transition-all cursor-pointer shadow-md hover:shadow-lg shrink-0 w-full sm:w-auto justify-center"
              >
                <span>Abrir Portal de Clientes</span>
                <div className="bg-[#142344] rounded-full p-2 group-hover:scale-105 transition-transform">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
};
