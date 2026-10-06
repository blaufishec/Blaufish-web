import React from 'react';
import { Anchor, ShieldCheck, Mail, Phone, MapPin } from 'lucide-react';
import { NavView } from '../types/navigation';

interface FooterProps {
  onNavigate: (view: NavView, speciesId?: string) => void;
  onOpenPortal: () => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate, onOpenPortal }) => {
  return (
    <footer className="bg-[#F5F5F5] px-6 py-10 md:pt-14 md:pb-10 border-t border-black/10">
      <div className="max-w-[88rem] mx-auto">
        {/* Vista Móvil (modo teléfono): Muestra la descripción, ubicaciones y la línea de copyright */}
        <div className="md:hidden">
          <p className="text-black/70 text-sm leading-relaxed mb-6 font-light">
            Blaufish Cía. Ltda. es una comercializadora pesquera ecuatoriana con sede principal en Manta, Manabí. Empresa familiar con más de 15 años de experiencia, estrechos lazos comerciales con Asia y ultracongelación a bordo.
          </p>
          <div className="flex flex-col gap-2.5 text-xs text-black/60 font-mono mb-6">
            <div className="flex items-center gap-2">
              <MapPin className="w-3.5 h-3.5 shrink-0 text-[#142344]" />
              <span>Puerto de Manta, Manabí, Ecuador</span>
            </div>
            <div className="flex items-center gap-2">
              <Anchor className="w-3.5 h-3.5 shrink-0 text-[#142344]" />
              <span>Despacho Portuario Manta</span>
            </div>
            <a href="tel:+593986781318" className="flex items-center gap-2 hover:text-black transition-colors">
              <Phone className="w-3.5 h-3.5 shrink-0 text-[#142344]" />
              <span>+593 98-678-1318</span>
            </a>
            <a href="mailto:blaufishec@gmail.com" className="flex items-center gap-2 hover:text-black transition-colors">
              <Mail className="w-3.5 h-3.5 shrink-0 text-[#142344]" />
              <span>blaufishec@gmail.com</span>
            </a>
          </div>
          <div className="pt-6 border-t border-black/10 text-xs text-black/50 leading-relaxed">
            © {new Date().getFullYear()} Blaufish Cía. Ltda. Todos los derechos reservados. Comercio Pesquero Ecuador.
          </div>
        </div>

        {/* Vista Escritorio / Tablet: Estructura completa de 5 columnas y pie legal */}
        <div className="hidden md:block">
          <div className="grid grid-cols-5 gap-10 mb-12">
            {/* Brand Info */}
            <div className="col-span-2">
              <button
                onClick={() => onNavigate('inicio')}
                className="flex items-center mb-4 text-left cursor-pointer group"
              >
                <img
                  src="./assets/logo.png"
                  alt="Blaufish"
                  className="h-10 w-auto object-contain transition-transform duration-200 group-hover:scale-105"
                />
              </button>
              <p className="text-black/60 text-sm leading-relaxed max-w-sm mb-6 font-light">
                Blaufish Cía. Ltda. es una comercializadora pesquera ecuatoriana con sede principal en Manta, Manabí. Empresa familiar con más de 15 años de experiencia, estrechos lazos comerciales con Asia y ultracongelación a bordo.
              </p>
              <div className="flex flex-col gap-1.5 text-xs text-black/50 font-mono">
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span>Puerto de Manta, Manabí, Ecuador</span>
                </div>
                <div className="flex items-center gap-2">
                  <Anchor className="w-3.5 h-3.5 shrink-0" />
                  <span>Despacho Portuario Manta</span>
                </div>
              </div>
            </div>

            {/* Column 1: Nosotros & Información de Contacto */}
            <div className="flex flex-col gap-6">
              <div>
                <h4 className="text-xs uppercase tracking-widest font-semibold text-black/40 mb-4">
                  Nosotros
                </h4>
                <ul className="space-y-2.5 text-sm text-black/70">
                  <li>
                    <button
                      onClick={() => onNavigate('quienes-somos')}
                      className="hover:text-black transition-colors text-left cursor-pointer"
                    >
                      Quiénes Somos
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => onNavigate('responsabilidad-social')}
                      className="hover:text-black transition-colors text-left cursor-pointer"
                    >
                      Responsabilidad Social
                    </button>
                  </li>
                </ul>
              </div>

              <div className="pt-5 border-t border-black/5">
                <h4 className="text-xs uppercase tracking-widest font-semibold text-black/40 mb-3">
                  Información de Contacto
                </h4>
                <ul className="space-y-2 text-xs text-black/70">
                  <li>
                    <a
                      href="mailto:blaufishec@gmail.com"
                      className="inline-flex items-center gap-2 hover:text-black transition-colors"
                      title="Enviar correo a Blaufish"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#142344] shrink-0" />
                      <span>blaufishec@gmail.com</span>
                    </a>
                  </li>
                  <li>
                    <a
                      href="tel:+593986781318"
                      className="inline-flex items-center gap-2 hover:text-black transition-colors"
                      title="Llamar o contactar a Blaufish"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#142344] shrink-0" />
                      <span>+593 98-678-1318</span>
                    </a>
                  </li>
                </ul>
              </div>
            </div>

            {/* Column 2: Información & Especies */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-black/40 mb-4">
                Información Técnica
              </h4>
              <ul className="space-y-2.5 text-sm text-black/70">
                <li>
                  <button
                    onClick={() => onNavigate('productos', 'picudo')}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Picudo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('productos', 'wahoo')}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Wahoo
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('calidad-producto')}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Calidad de Producto
                  </button>
                </li>
                <li>
                  <button
                    onClick={() => onNavigate('certificaciones')}
                    className="hover:text-black transition-colors text-left cursor-pointer"
                  >
                    Certificaciones & Calidad
                  </button>
                </li>
              </ul>
            </div>

            {/* Column 3: Contacto & Certificaciones */}
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold text-black/40 mb-4">
                Aseguramiento
              </h4>
              <ul className="space-y-2 text-xs text-black/70 mb-6">
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Registro Sanitario UE #042</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Auditoría NFQS Corea del Sur</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Registro FDA Biosecurity Act</span>
                </li>
                <li className="flex items-center gap-1.5">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Certificación HACCP / BPM</span>
                </li>
              </ul>

              <button
                onClick={onOpenPortal}
                className="inline-flex items-center gap-2 text-xs font-semibold text-black bg-black/5 hover:bg-black/10 px-4 py-2 rounded-full transition-colors cursor-pointer"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Contactar Mesa Exterior</span>
              </button>
            </div>
          </div>

          {/* Bottom Row */}
          <div className="pt-8 border-t border-black/10 flex flex-col lg:flex-row items-center justify-between gap-4 text-xs text-black/50 leading-normal">
            <div className="text-center lg:text-left">
              © {new Date().getFullYear()} Blaufish Cía. Ltda. Todos los derechos reservados. Comercio Pesquero Ecuador.
            </div>
            <div className="flex flex-wrap items-center justify-center lg:justify-end gap-x-5 gap-y-2">
              <button
                onClick={() => onNavigate('certificaciones')}
                className="hover:text-black transition-colors cursor-pointer"
              >
                Cumplimiento Sanitario
              </button>
              <span className="w-1 h-1 rounded-full bg-black/25 shrink-0" aria-hidden="true" />
              <button
                onClick={() => onNavigate('calidad-producto')}
                className="hover:text-black transition-colors cursor-pointer"
              >
                Calidad de Producto
              </button>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};
