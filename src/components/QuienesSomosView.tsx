import React from 'react';
import { ArrowLeft, Anchor, HeartHandshake, CheckCircle2, ShieldCheck, MapPin, Award, ArrowRight } from 'lucide-react';
import { NavView } from '../types/navigation';
import { ScrollReveal } from './ScrollReveal';

interface QuienesSomosViewProps {
  currentSubView: NavView;
  onNavigate: (view: NavView) => void;
  onOpenPortal: () => void;
}

export const QuienesSomosView: React.FC<QuienesSomosViewProps> = ({
  currentSubView,
  onNavigate,
  onOpenPortal,
}) => {
  return (
    <div className="pt-32 md:pt-44 pb-12 md:pb-16 px-4 md:px-6 max-w-[88rem] mx-auto">
      {/* Top Breadcrumb & Navigation */}
      <ScrollReveal delay={0} distance={20} className="mb-8">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onNavigate('inicio')}
            className="inline-flex items-center gap-2 text-sm font-medium text-black/60 hover:text-black transition-colors self-start sm:self-auto"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Volver al Inicio</span>
          </button>

          {/* Sub-tab pills */}
          <div className="w-full sm:w-auto flex justify-center">
            <div className="inline-flex flex-wrap items-center justify-center gap-2 p-1.5 bg-black/5 rounded-full max-w-full text-center">
              <button
                onClick={() => onNavigate('quienes-somos')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${currentSubView === 'quienes-somos'
                  ? 'bg-[#142344] text-white shadow-sm'
                  : 'text-black/60 hover:text-black'
                  }`}
              >
                Quiénes Somos
              </button>
              <button
                onClick={() => onNavigate('responsabilidad-social')}
                className={`px-4 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${currentSubView === 'responsabilidad-social'
                  ? 'bg-[#142344] text-white shadow-sm'
                  : 'text-black/60 hover:text-black'
                  }`}
              >
                Responsabilidad Social
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 1. QUIÉNES SOMOS SECTION                                                  */}
      {/* ========================================================================= */}
      {(currentSubView === 'quienes-somos' || currentSubView === 'inicio') && (
        <section className="animate-in fade-in duration-300">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-16">
            <ScrollReveal className="lg:col-span-7" delay={0}>
              <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-black/50 mb-3">
                <Anchor className="w-3.5 h-3.5" />
                <span>Blaufish Cía. Ltda. • Manta, Ecuador</span>
              </div>
              <h1
                className="text-4xl md:text-6xl font-medium tracking-tight text-black leading-tight mb-6"
                style={{ letterSpacing: '-0.03em' }}
              >
                Tradición oceánica,{' '}
                <span className="text-black/50">estándares mundiales.</span>
              </h1>
              <p className="text-black/70 text-lg md:text-xl leading-relaxed mb-6 font-light text-justify">
                Fundada en Manta —puerto pesquero insignia del Pacífico ecuatoriano—, Blaufish Cía. Ltda. es una empresa familiar y comercializadora líder con más de 15 años de experiencia, especializada en la selección, calidad certificada y comercialización de pesca blanca.
              </p>
              <p className="text-black/60 text-base leading-relaxed mb-8 text-justify">
                Nuestros estrechos lazos comerciales con Asia nos permiten acceder a productos pesqueros de primer nivel, que posteriormente son comercializados a nivel nacional, garantizando calidad, conservación y una cadena de custodia adecuada desde su origen hasta el consumidor.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-black/10 pt-8">
                <div>
                  <div className="text-3xl font-medium text-black mb-1">A Bordo</div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-black/50">
                    Ultracongelación a Bordo
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-medium text-black mb-1">+15 Años</div>
                  <div className="text-xs uppercase tracking-wider font-semibold text-black/50">
                    Empresa Familiar
                  </div>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal className="lg:col-span-5 relative" delay={150}>
              <div className="rounded-3xl overflow-hidden shadow-2xl bg-neutral-900 border border-black/10 aspect-[4/5] relative">
                <img
                  src="./assets/master_inspector.jpg?v=5"
                  alt="Maestro Inspector de Calidad Blaufish"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
                <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
                  <div className="text-xs font-semibold uppercase tracking-widest text-white/60 mb-1">
                    Control de Calidad
                  </div>
                  <div className="text-xl font-medium leading-snug mb-2">
                    Inspección individual pieza por pieza
                  </div>
                  <p className="text-xs text-white/70 leading-relaxed text-justify">
                    Evaluamos contenido graso, coloración mioglobínica y frescura organoléptica antes de cada consolidación aérea o marítima.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* Misión y Visión Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ScrollReveal delay={0} className="h-full">
              <div className="bg-white p-8 md:p-10 rounded-3xl border border-black/5 shadow-sm h-full">
                <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center mb-6">
                  <Anchor className="w-6 h-6" />
                </div>
                <h3 className="text-2xl font-medium text-black mb-3">Nuestra Misión</h3>
                <p className="text-black/70 text-base leading-relaxed text-justify">
                  Nuestra misión es ofrecer un producto nacional de excelencia, aplicando los más altos estándares de calidad, para deleitar a los paladares más exigentes del mercado ecuatoriano. Nos comprometemos a brindar sabor, frescura y confianza, impulsando el valor de la producción nacional.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} className="h-full">
              <div
                className="p-8 md:p-10 rounded-3xl text-white shadow-sm flex flex-col justify-between h-full"
                style={{ backgroundColor: '#2B2644' }}
              >
                <div>
                  <div className="w-12 h-12 rounded-2xl bg-white/10 text-white flex items-center justify-center mb-6">
                    <Award className="w-6 h-6" />
                  </div>
                  <h3 className="text-2xl font-medium text-white mb-3">Nuestra Visión</h3>
                  <p className="text-white/70 text-base leading-relaxed text-justify">
                    Consolidarnos como los comerciantes de pesca blanca más confiables y respetados del Pacífico Sur, reconocidos en los principales sectores comerciales del mundo por nuestra pureza, ética y excelencia operativa.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}



      {/* ========================================================================= */}
      {/* 2. RESPONSABILIDAD SOCIAL Y SOSTENIBILIDAD                                 */}
      {/* ========================================================================= */}
      {currentSubView === 'responsabilidad-social' && (
        <section id="responsabilidad" className="animate-in fade-in duration-300">
          <ScrollReveal className="max-w-3xl mb-12" delay={0}>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-black/50 mb-3">
              <HeartHandshake className="w-3.5 h-3.5" />
              <span>Compromiso & Calidad Operativa</span>
            </div>
            <h2
              className="text-3xl md:text-5xl font-medium text-black mb-4"
              style={{ letterSpacing: '-0.03em' }}
            >
              Responsabilidad Social
            </h2>
            <p className="text-black/70 text-base md:text-lg leading-relaxed font-light text-justify">
              Nuestra responsabilidad social se fundamenta en procesos correctamente establecidos según las normas y políticas de cada empresa, garantizando métodos éticos de captura y el control absoluto de la cadena de frío.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <ScrollReveal delay={0} className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-medium text-black mb-4 flex items-center gap-2">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                    <span>Procesos Establecidos según Normas y Políticas</span>
                  </h3>
                  <p className="text-black/70 text-sm leading-relaxed mb-4 text-justify">
                    Contamos con procesos correctamente establecidos y auditados, adaptados a las exigencias normativas, certificaciones de calidad y políticas internas de cada empresa aliada y cliente comercial.
                  </p>
                  <p className="text-black/60 text-xs leading-relaxed text-justify">
                    Estandarización operativa, trazabilidad documental y cumplimiento estricto de directrices sanitarias y comerciales para una relación transparente y confiable.
                  </p>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={150} className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <h3 className="text-xl font-medium text-black mb-4 flex items-center gap-2">
                    <ShieldCheck className="w-5 h-5 text-blue-600 shrink-0" />
                    <span>Correctas Prácticas de Capturas y Cadena de Frío</span>
                  </h3>
                  <p className="text-black/70 text-sm leading-relaxed mb-4 text-justify">
                    Implementamos métodos de correctas prácticas de captura selectiva y responsable, asegurando un manejo técnico cuidadoso del producto desde su extracción marina.
                  </p>
                  <p className="text-black/60 text-xs leading-relaxed text-justify">
                    Preservación rigurosa de la cadena de frío ininterrumpida y ultracongelación inmediata para mantener intactas las propiedades organolépticas, frescura y textura natural de la pesca blanca.
                  </p>
                </div>
              </div>
            </ScrollReveal>
          </div>

          {/* CTA Box */}
          <ScrollReveal delay={100}>
            <div className="p-8 md:p-12 rounded-3xl bg-[#142344] text-white flex flex-col md:flex-row items-center justify-between gap-6 shadow-xl">
              <div>
                <h3 className="text-2xl font-medium mb-2">¿Deseas conocer más sobre nuestras operaciones?</h3>
                <p className="text-white/70 text-sm max-w-lg text-justify">
                  Nuestro departamento de comercio exterior y aseguramiento de calidad está disponible para presentar auditorías y dossiers de trazabilidad.
                </p>
              </div>
              <button
                onClick={onOpenPortal}
                className="group inline-flex items-center gap-3 bg-white text-[#142344] text-sm md:text-base font-medium pl-6 pr-2 py-2 rounded-full hover:bg-white/90 transition-colors shrink-0 cursor-pointer shadow-md"
              >
                <span>Contactar a Blaufish</span>
                <div className="bg-[#142344] rounded-full p-2">
                  <ArrowRight className="w-4 h-4 text-white group-hover:translate-x-0.5 transition-transform" />
                </div>
              </button>
            </div>
          </ScrollReveal>
        </section>
      )}
    </div>
  );
};
