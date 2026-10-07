import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, Fish, Award, ShieldCheck, CheckCircle2, ArrowRight, Download, Sparkles, Check } from 'lucide-react';
import { NavView } from '../types/navigation';
import { ScrollReveal } from './ScrollReveal';

interface InformacionViewProps {
  currentSubView: NavView;
  onNavigate: (view: NavView, speciesId?: string) => void;
  onOpenPortal: (mode?: string, speciesId?: string) => void;
  initialSpeciesId?: string;
  speciesTrigger?: number;
}

interface ProductItem {
  id: string;
  name: string;
  photo: string;
  grade: string;
  lipid: string;
  texture: string;
  cuts?: string[];
  temp: string;
  seasons: string;
  desc: string;
}

const productsData: ProductItem[] = [
  {
    id: 'picudo',
    name: 'Picudo',
    photo: './assets/picudo_hero.jpg?v=3',
    grade: 'Marlin Azul y Marlin Negro',
    lipid: '8% - 12%',
    texture: 'Firme, carnosa, sabor dulce',
    temp: 'Ultracongelación a Bordo',
    seasons: 'Todo el año',
    desc: 'El Picudo es un pescado de carne firme, textura consistente y sabor delicado, apreciado por su versatilidad en la gastronomía. Su carne de excelente calidad lo convierte en una opción ideal para filetes, porciones y preparaciones a la parrilla, ofreciendo un producto atractivo tanto para el mercado nacional como internacional.',
  },
  {
    id: 'wahoo',
    name: 'Wahoo',
    photo: './assets/wahoo_hero.jpg?v=3',
    grade: 'Extra White',
    lipid: '5% - 8%',
    texture: 'Fibra fina, extremadamente blanca y limpia',
    temp: 'Ultracongelación a Bordo',
    seasons: 'Todo el año',
    desc: 'El Wahoo es un pescado de carne blanca, firme y jugosa, reconocido por su textura suave y sabor delicado. Es muy apreciado en la gastronomía por su versatilidad y excelente rendimiento, siendo ideal para filetes, porciones, parrilla y preparaciones de alta cocina.',
  },
];

export const InformacionView: React.FC<InformacionViewProps> = ({
  currentSubView,
  onNavigate,
  onOpenPortal,
  initialSpeciesId,
  speciesTrigger,
}) => {
  const catalogHeaderRef = useRef<HTMLDivElement>(null);

  const [selectedProduct, setSelectedProduct] = useState<ProductItem>(() => {
    if (initialSpeciesId) {
      const found = productsData.find((p) => p.id === initialSpeciesId);
      if (found) return found;
    }
    return productsData[0];
  });

  useEffect(() => {
    if (initialSpeciesId) {
      const found = productsData.find((p) => p.id === initialSpeciesId);
      if (found) {
        setSelectedProduct(found);
      }

      const timer = setTimeout(() => {
        if (catalogHeaderRef.current) {
          const rect = catalogHeaderRef.current.getBoundingClientRect();
          const topMargin = window.innerWidth < 768 ? 75 : 100;
          const targetY = window.scrollY + rect.top - topMargin;
          window.scrollTo({
            top: Math.max(0, targetY),
            behavior: 'smooth',
          });
        }
      }, 100);

      return () => clearTimeout(timer);
    }
  }, [initialSpeciesId, speciesTrigger]);

  // Determine active tab
  const activeTab = ['productos', 'calidad-producto', 'cadena-frio', 'certificaciones'].includes(currentSubView)
    ? (currentSubView === 'cadena-frio' ? 'calidad-producto' : currentSubView)
    : 'productos';

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
            <div className="inline-flex flex-wrap items-center justify-center gap-1.5 p-1.5 bg-black/5 rounded-2xl sm:rounded-full max-w-full text-center">
              <button
                onClick={() => onNavigate('productos')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'productos' ? 'bg-[#142344] text-white shadow-sm' : 'text-black/60 hover:text-black'
                  }`}
              >
                Especies & Productos
              </button>
              <button
                onClick={() => onNavigate('calidad-producto')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'calidad-producto' ? 'bg-[#142344] text-white shadow-sm' : 'text-black/60 hover:text-black'
                  }`}
              >
                Calidad de Producto
              </button>
              <button
                onClick={() => onNavigate('certificaciones')}
                className={`px-3.5 py-1.5 rounded-full text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer ${activeTab === 'certificaciones' ? 'bg-[#142344] text-white shadow-sm' : 'text-black/60 hover:text-black'
                  }`}
              >
                Certificaciones
              </button>
            </div>
          </div>
        </div>
      </ScrollReveal>

      {/* ========================================================================= */}
      {/* 1. PRODUCTOS & ESPECIES TAB                                               */}
      {/* ========================================================================= */}
      {activeTab === 'productos' && (
        <section className="animate-in fade-in duration-300">
          <ScrollReveal className="max-w-2xl mb-10" delay={0}>
            <div
              ref={catalogHeaderRef}
              className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-black/50 mb-2"
            >
              <Fish className="w-3.5 h-3.5" />
              <span>Catálogo Técnico de Exportación</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-3"
              style={{ letterSpacing: '-0.03em' }}
            >
              Especies de Pesca Blanca del Pacífico
            </h1>
            <p className="text-black/70 text-base leading-relaxed">
              Selecciona una especie para inspeccionar su ficha bromatológica, perfil de calidad y disponibilidad de cuota para importadores internacionales.
            </p>
          </ScrollReveal>

          {/* Species Selector Cards */}
          <ScrollReveal className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-8 max-w-4xl" delay={100}>
            {productsData.map((item) => {
              const isSelected = item.id === selectedProduct.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setSelectedProduct(item)}
                  className={`p-4 rounded-2xl border text-left transition-all cursor-pointer ${isSelected
                    ? 'bg-[#142344] text-white border-[#142344] shadow-lg scale-[1.01]'
                    : 'bg-white hover:bg-neutral-50 text-black border-black/10 shadow-sm'
                    }`}
                >
                  <div className="aspect-[16/10] rounded-xl overflow-hidden mb-3 bg-neutral-100">
                    <img src={item.photo} alt={item.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="text-lg font-medium leading-snug mb-1">{item.name}</div>
                  <div className="text-xs font-semibold opacity-80">{item.grade}</div>
                </button>
              );
            })}
          </ScrollReveal>

          {/* Selected Species Detail Dossier */}
          <ScrollReveal delay={180} key={selectedProduct.id}>
            <div className="bg-white rounded-3xl p-6 md:p-10 border border-black/5 shadow-sm">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                <div className="lg:col-span-7">
                  <h2 className="text-3xl font-medium text-black mb-4">{selectedProduct.name}</h2>
                  <p className="text-black/70 text-base leading-relaxed mb-8 font-light">
                    {selectedProduct.desc}
                  </p>

                  <div className="flex flex-wrap items-center gap-4">
                    <button
                      onClick={() => onOpenPortal(undefined, selectedProduct.id)}
                      className="bg-[#142344] text-white px-7 py-3 rounded-full text-sm font-medium hover:bg-[#1d3260] transition-colors shadow cursor-pointer"
                    >
                      Solicitar Cuota del {selectedProduct.id === 'picudo' ? 'Picudo' : selectedProduct.name.split('/')[0]}
                    </button>
                  </div>
                </div>

                {/* Technical Spec Sheet Card */}
                <div className="lg:col-span-5 bg-[#F5F5F5] p-6 rounded-2xl border border-black/5">
                  <h3 className="text-xs uppercase tracking-widest font-bold text-black/60 mb-4 pb-2 border-b border-black/10">
                    Especificaciones Bromatológicas
                  </h3>
                  <div className="space-y-3.5 text-xs">
                    <div>
                      <span className="text-black/50 block">Calificación de Calidad:</span>
                      <strong className="text-black text-sm">{selectedProduct.grade}</strong>
                    </div>
                    <div>
                      <span className="text-black/50 block">Perfil Lipídico / Grasa:</span>
                      <strong className="text-black text-sm">{selectedProduct.lipid}</strong>
                    </div>
                    <div>
                      <span className="text-black/50 block">Textura y Sabor:</span>
                      <span className="text-black font-medium">{selectedProduct.texture}</span>
                    </div>
                    <div>
                      <span className="text-black/50 block">Rango Térmico de Embarque:</span>
                      <strong className="text-black text-sm">{selectedProduct.temp}</strong>
                    </div>
                    <div>
                      <span className="text-black/50 block">Temporada Alta de Marea:</span>
                      <span className="text-black font-medium">{selectedProduct.seasons}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </ScrollReveal>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 2. CALIDAD DE PRODUCTO TAB                                                */}
      {/* ========================================================================= */}
      {activeTab === 'calidad-producto' && (
        <section className="animate-in fade-in duration-300">
          <ScrollReveal className="max-w-3xl mb-12" delay={0}>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-black/50 mb-2">
              <Award className="w-3.5 h-3.5" />
              <span>Garantía de Frescura & Sabor</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-3"
              style={{ letterSpacing: '-0.03em' }}
            >
              Calidad y Frescura en Cada Pieza
            </h1>
            <p className="text-black/70 text-base md:text-lg leading-relaxed font-light">
              Cuidamos cada detalle desde el origen para llevar a tu mesa un pescado de excelente calidad. Seleccionamos únicamente piezas frescas, de carne firme y sabor inigualable, listas para deleitar a tus clientes.
            </p>
          </ScrollReveal>

          {/* 3 Columns Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <ScrollReveal delay={0} className="h-full">
              <div
                className="p-8 rounded-3xl text-white flex flex-col justify-between h-full shadow-sm"
                style={{ backgroundColor: '#2B2644' }}
              >
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-white/10 flex items-center justify-center text-white mb-6">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="text-xs uppercase font-bold tracking-wider text-white/50 mb-1">
                    Enfoque en Calidad
                  </div>
                  <h3 className="text-2xl font-medium mb-3">
                    Calidad desde el Origen
                  </h3>
                  <p className="text-white/75 text-sm leading-relaxed mb-4">
                    Seleccionamos productos de alto estándar, cuidando cada etapa para conservar sus características naturales hasta su destino.
                  </p>
                </div>
                <div className="text-xs text-white/60 border-t border-white/10 pt-4 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>Solo lo mejor llega a tu negocio</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={120} className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-black mb-6">
                    <Sparkles className="w-5 h-5" />
                  </div>
                  <div className="text-xs uppercase font-bold tracking-wider text-black/40 mb-1">
                    Frescura & Textura
                  </div>
                  <h3 className="text-2xl font-medium text-black mb-3">
                    Textura Firme y Sabor Natural
                  </h3>
                  <p className="text-black/60 text-sm leading-relaxed mb-4">
                    Cuidamos la frescura desde el primer momento para que el pescado mantenga su textura y todo su sabor natural al momento de cocinarlo.
                  </p>
                </div>
                <div className="text-xs text-black/50 border-t border-black/5 pt-4 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Frescura garantizada de inicio a fin</span>
                </div>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={240} className="h-full">
              <div className="bg-white p-8 rounded-3xl border border-black/5 shadow-sm flex flex-col justify-between h-full">
                <div>
                  <div className="w-10 h-10 rounded-2xl bg-black/5 flex items-center justify-center text-black mb-6">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="text-xs uppercase font-bold tracking-wider text-black/40 mb-1">
                    En tu Cocina
                  </div>
                  <h3 className="text-2xl font-medium text-black mb-3">
                    Ideal para Cualquier Preparación
                  </h3>
                  <p className="text-black/60 text-sm leading-relaxed mb-4">
                    Nuestra pesca blanca es perfecta para lucirte en ceviches frescos, platos gourmet, filetes a la plancha o a la parrilla, ofreciendo un excelente rendimiento y cero desperdicio.
                  </p>
                </div>
                <div className="text-xs text-black/50 border-t border-black/5 pt-4 flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Versatilidad, sabor y confianza en cada plato</span>
                </div>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

      {/* ========================================================================= */}
      {/* 3. CERTIFICACIONES TAB                                                    */}
      {/* ========================================================================= */}
      {activeTab === 'certificaciones' && (
        <section className="animate-in fade-in duration-300">
          <ScrollReveal className="max-w-2xl mb-12" delay={0}>
            <div className="inline-flex items-center gap-2 text-xs uppercase tracking-widest font-semibold text-black/50 mb-2">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>Acreditaciones Globales de Inocuidad</span>
            </div>
            <h1
              className="text-3xl md:text-5xl font-medium tracking-tight text-black mb-3"
              style={{ letterSpacing: '-0.03em' }}
            >
              Cumplimiento Sanitario Internacional
            </h1>
            <p className="text-black/70 text-base leading-relaxed">
              Cumplimos con las normativas fitosanitarias y de bioseguridad alimentaria más exigentes del mundo para ingreso inmediato a la Unión Europea, Estados Unidos, Corea del Sur y Japón.
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <ScrollReveal delay={0} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm h-full">
                <div className="text-xs font-semibold uppercase text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full w-fit mb-3">
                  Unión Europea
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Registro Sanitario UE #042</h3>
                <p className="text-black/60 text-xs leading-relaxed">
                  Autorización plena para comercialización en los 27 países del bloque comunitario europeo sin trabas fronterizas.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={80} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm h-full">
                <div className="text-xs font-semibold uppercase text-blue-700 bg-blue-50 px-3 py-1 rounded-full w-fit mb-3">
                  Estados Unidos
                </div>
                <h3 className="text-xl font-medium text-black mb-2">FDA Biosecurity Act</h3>
                <p className="text-black/60 text-xs leading-relaxed">
                  Registro y validación de instalaciones pesqueras bajo normativa de la Administración de Alimentos y Medicamentos de EE. UU.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={160} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm h-full">
                <div className="text-xs font-semibold uppercase text-purple-700 bg-purple-50 px-3 py-1 rounded-full w-fit mb-3">
                  Corea del Sur
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Auditoría NFQS Corea</h3>
                <p className="text-black/60 text-xs leading-relaxed">
                  Aprobado por el Servicio Nacional de Gestión de Calidad de Productos Pesqueros de la República de Corea para importación directa.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={240} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm h-full">
                <div className="text-xs font-semibold uppercase text-amber-700 bg-amber-50 px-3 py-1 rounded-full w-fit mb-3">
                  Inocuidad Industrial
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Certificación HACCP / BPM</h3>
                <p className="text-black/60 text-xs leading-relaxed">
                  Análisis de Peligros y Puntos Críticos de Control auditado de forma permanente en cada fase de eviscerado y empaque.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={320} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm h-full">
                <div className="text-xs font-semibold uppercase text-cyan-700 bg-cyan-50 px-3 py-1 rounded-full w-fit mb-3">
                  Conservación Marina
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Dolphin Safe & CIAT</h3>
                <p className="text-black/60 text-xs leading-relaxed">
                  Garantía certificada de cero mortalidad de delfines y adhesión estricta a vedas de la Comisión Interamericana del Atún Tropical.
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal delay={400} className="h-full">
              <div className="bg-white p-6 rounded-2xl border border-black/5 shadow-sm h-full">
                <div className="text-xs font-semibold uppercase text-teal-700 bg-teal-50 px-3 py-1 rounded-full w-fit mb-3">
                  Origen Oficial
                </div>
                <h3 className="text-xl font-medium text-black mb-2">Certificado Ministerio Acuacultura</h3>
                <p className="text-black/60 text-xs leading-relaxed">
                  Emisión de certificados fitosanitarios y de origen oficial de la República del Ecuador para aranceles preferenciales.
                </p>
              </div>
            </ScrollReveal>
          </div>
        </section>
      )}

    </div>
  );
};
