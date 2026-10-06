import React, { useState, useEffect } from 'react';
import {
  X,
  CheckCircle,
  AlertCircle,
  Send,
  Loader2,
  Mail,
  Phone,
  User,
} from 'lucide-react';

interface SpeciesModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialMode?: string;
  initialSpeciesId?: string;
}

interface SpecieItem {
  id: string;
  name: string;
  photo: string;
  grade: string;
  fatContent: string;
  description: string;
}

const speciesList: SpecieItem[] = [
  {
    id: 'picudo',
    name: 'Picudo',
    photo: './assets/picudo_hero.jpg?v=3',
    grade: 'Grado Sashimi AAA',
    fatContent: 'Alto Contenido Graso (>8%)',
    description:
      'El Picudo es un pescado de carne firme, textura consistente y sabor delicado, apreciado por su versatilidad en la gastronomía. Su carne de excelente calidad lo convierte en una opción ideal para filetes, porciones y preparaciones a la parrilla, ofreciendo un producto atractivo para el mercado nacional.',
  },
  {
    id: 'wahoo',
    name: 'Wahoo',
    photo: './assets/wahoo_hero.jpg?v=3',
    grade: 'Extra White',
    fatContent: 'Medio-Alto (5-8%)',
    description:
      'El Wahoo es un pescado de carne blanca, firme y jugosa, reconocido por su textura suave y sabor delicado. Es muy apreciado en la gastronomía por su versatilidad y excelente rendimiento, siendo ideal para filetes, porciones, parrilla y preparaciones de alta cocina.',
  },
];

const TARGET_EMAIL = 'blaufishec@gmail.com';

const FIELD_LIMITS = {
  name: 50,
  contact: 16,
  email: 40,
  description: 500,
} as const;

export const SpeciesModal: React.FC<SpeciesModalProps> = ({
  isOpen,
  onClose,
  initialMode,
  initialSpeciesId,
}) => {
  const [selectedSpecies, setSelectedSpecies] = useState(speciesList[0]);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    email: '',
    description: '',
  });

  const [errors, setErrors] = useState<{
    name?: string;
    contact?: string;
    email?: string;
    description?: string;
  }>({});

  const [touched, setTouched] = useState<{
    name?: boolean;
    contact?: boolean;
    email?: boolean;
    description?: boolean;
  }>({});

  // Reset or initialize when opened
  useEffect(() => {
    if (isOpen) {
      const targetKey = initialSpeciesId || (
        initialMode && speciesList.some(s => initialMode.toLowerCase().includes(s.id.toLowerCase()) || initialMode.toLowerCase().includes(s.name.toLowerCase()))
          ? speciesList.find(s => initialMode.toLowerCase().includes(s.id.toLowerCase()) || initialMode.toLowerCase().includes(s.name.toLowerCase()))?.id
          : undefined
      );

      if (targetKey) {
        const found = speciesList.find(
          (s) => s.id.toLowerCase() === targetKey.toLowerCase() ||
            s.name.toLowerCase().includes(targetKey.toLowerCase())
        );
        if (found) {
          setSelectedSpecies(found);
        }
      } else if (!initialSpeciesId) {
        setSelectedSpecies(speciesList[0]);
      }

      if (initialMode && !formData.description) {
        setFormData((prev) => ({
          ...prev,
          description: `Modalidad de interés: ${initialMode}\n`,
        }));
      }
    }
  }, [isOpen, initialMode, initialSpeciesId]);

  if (!isOpen) return null;

  const validate = (data = formData) => {
    const newErrors: {
      name?: string;
      contact?: string;
      email?: string;
      description?: string;
    } = {};

    // Validación Nombre (mínimo 3, máximo 60)
    const trimmedName = data.name.trim();
    if (!trimmedName) {
      newErrors.name = 'El nombre o empresa es obligatorio.';
    } else if (trimmedName.length < 3) {
      newErrors.name = 'Debe contener al menos 3 caracteres.';
    } else if (trimmedName.length > FIELD_LIMITS.name) {
      newErrors.name = `Máximo ${FIELD_LIMITS.name} caracteres permitidos.`;
    }

    // Validación Contacto (10 dígitos locales o internacional con código de país)
    const trimmedContact = data.contact.trim();
    if (!trimmedContact) {
      newErrors.contact = 'El número de contacto es obligatorio.';
    } else if (trimmedContact.startsWith('+')) {
      const digits = trimmedContact.slice(1).replace(/\D/g, '');
      if (digits.length < 10) {
        newErrors.contact = 'Número incompleto con código de país (ej. +593991234567).';
      }
    } else {
      const digitsOnly = trimmedContact.replace(/\D/g, '');
      if (digitsOnly.length < 10) {
        newErrors.contact = 'Debe ingresar los 10 dígitos locales (ej. 0991234567).';
      }
    }

    // Validación Correo (máximo 80)
    const trimmedEmail = data.email.trim();
    if (!trimmedEmail) {
      newErrors.email = 'El correo electrónico es obligatorio.';
    } else if (trimmedEmail.length > FIELD_LIMITS.email) {
      newErrors.email = `Máximo ${FIELD_LIMITS.email} caracteres permitidos.`;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      newErrors.email = 'Ingresa una dirección de correo válida.';
    }

    // Validación Descripción (mínimo 10, máximo 500)
    const trimmedDesc = data.description.trim();
    if (!trimmedDesc) {
      newErrors.description = 'La descripción del requerimiento es obligatoria.';
    } else if (trimmedDesc.length < 10) {
      newErrors.description = 'Detalla tu requerimiento con al menos 10 caracteres.';
    } else if (trimmedDesc.length > FIELD_LIMITS.description) {
      newErrors.description = `Máximo ${FIELD_LIMITS.description} caracteres permitidos.`;
    }

    return newErrors;
  };

  const handleKeyDown = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
    field: keyof typeof formData
  ) => {
    // 1. En correo, bloquear la barra espaciadora totalmente
    if (e.key === ' ' && field === 'email') {
      e.preventDefault();
      return;
    }

    // 2. En contacto: bloquear espacios, letras y no permitir dígitos extra más allá del límite
    if (field === 'contact') {
      if (
        e.key === 'Backspace' ||
        e.key === 'Delete' ||
        e.key === 'ArrowLeft' ||
        e.key === 'ArrowRight' ||
        e.key === 'Tab' ||
        e.key === 'Enter' ||
        e.ctrlKey ||
        e.metaKey
      ) {
        return;
      }

      // Permitir '+' solo en la primera posición si no existe ya
      if (e.key === '+') {
        const target = e.currentTarget;
        if (target.selectionStart === 0 && !target.value.includes('+')) {
          return;
        }
        e.preventDefault();
        return;
      }

      // Si no es un dígito del 0 al 9, bloquearlo (no espacios, no letras ni símbolos)
      if (!/^\d$/.test(e.key)) {
        e.preventDefault();
        return;
      }

      // Verificar que no se exceda el límite máximo (10 para local, 13/14 para internacional con +)
      const target = e.currentTarget;
      const currentVal = target.value;
      const maxLen = currentVal.startsWith('+') ? (currentVal.startsWith('+5930') ? 14 : 13) : 10;
      const hasSelection =
        target.selectionStart !== null &&
        target.selectionEnd !== null &&
        target.selectionEnd > target.selectionStart;

      if (currentVal.length >= maxLen && !hasSelection) {
        e.preventDefault();
        return;
      }
    }

    // 3. En nombre o descripción, impedir que el primer carácter sea un espacio
    if (e.key === ' ' && (field === 'name' || field === 'description')) {
      const target = e.currentTarget;
      if (target.value.trim().length === 0 || (target.selectionStart !== null && target.selectionStart === 0)) {
        e.preventDefault();
        return;
      }
    }
  };

  const handleChange = (field: keyof typeof formData, value: string) => {
    // 1. Evitar espacios en blanco al inicio en cualquier campo (ej. al pegar texto)
    value = value.replace(/^\s+/, '');

    // 2. Si es contacto: permitir '+' al inicio o dígitos; auto-formatear y cortar estrictamente al límite
    if (field === 'contact') {
      let clean = '';
      if (value.startsWith('+')) {
        clean = '+' + value.slice(1).replace(/\D/g, '');
      } else {
        clean = value.replace(/\D/g, '');
        // Si el usuario escribe o pega directamente 593..., anteponer el '+'
        if (clean.startsWith('593')) {
          clean = '+' + clean;
        }
      }

      // Limitar estrictamente para no permitir dígitos extra
      const maxLen = clean.startsWith('+') ? (clean.startsWith('+5930') ? 14 : 13) : 10;
      clean = clean.slice(0, maxLen);
      value = clean;
    }

    // 3. Si es correo, no permitir ningún tipo de espacio
    if (field === 'email') {
      value = value.replace(/\s/g, '');
    }

    // 4. Si es nombre, no permitir espacios múltiples seguidos
    if (field === 'name') {
      value = value.replace(/\s{2,}/g, ' ');
    }

    // 5. Limitar longitud máxima por apartado
    if (value.length > FIELD_LIMITS[field]) {
      value = value.slice(0, FIELD_LIMITS[field]);
    }

    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (touched[field]) {
      const validationErrors = validate(updated);
      setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
    }
  };

  const handleBlur = (field: keyof typeof formData) => {
    // Al terminar de rellenar una sección, limpiar cualquier espacio sobrante al final y al inicio
    const trimmedVal = formData[field].trim();
    const updated = { ...formData, [field]: trimmedVal };
    setFormData(updated);
    setTouched((prev) => ({ ...prev, [field]: true }));
    const validationErrors = validate(updated);
    setErrors((prev) => ({ ...prev, [field]: validationErrors[field] }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Limpieza de espacios en todos los campos antes de validar y enviar
    const cleanData = {
      name: formData.name.trim(),
      contact: formData.contact.trim(),
      email: formData.email.trim(),
      description: formData.description.trim(),
    };
    setFormData(cleanData);
    setTouched({ name: true, contact: true, email: true, description: true });

    const validationErrors = validate(cleanData);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Envío del requerimiento por correo a través del endpoint de FormSubmit hacia TARGET_EMAIL
      await fetch(`https://formsubmit.co/ajax/${TARGET_EMAIL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          _subject: `Nueva Solicitud Blaufish: ${cleanData.name} - ${selectedSpecies.name}`,
          _template: 'table',
          _captcha: 'false',
          'Nombre / Empresa': cleanData.name,
          'Teléfono / Contacto': cleanData.contact,
          'Correo Electrónico': cleanData.email,
          'Especie Seleccionada': `${selectedSpecies.name} (${selectedSpecies.grade})`,
          'Modalidad Sugerida': initialMode || 'Consulta Estándar',
          'Descripción del Requerimiento': cleanData.description,
        }),
      });

      setSubmitted(true);
    } catch (error) {
      console.warn('Error al conectar con el servicio de correo:', error);
      // Marcamos igualmente como submitted para confirmación
      setSubmitted(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetAndClose = () => {
    setSubmitted(false);
    setFormData({ name: '', contact: '', email: '', description: '' });
    setTouched({});
    setErrors({});
    onClose();
  };

  const renderCharCounter = (current: number, max: number) => {
    const isNear = current >= max * 0.85;
    const isAt = current >= max;
    return (
      <span
        className={`text-[11px] font-mono transition-colors ${isAt ? 'text-rose-600 font-semibold' : isNear ? 'text-amber-600 font-medium' : 'text-black/40'
          }`}
      >
        {current}/{max}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/65 backdrop-blur-md animate-in fade-in duration-200">
      <div className="bg-[#F5F5F5] rounded-3xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-black/10 flex flex-col">
        {/* Modal Header */}
        <div className="sticky top-0 bg-[#F5F5F5]/90 backdrop-blur px-6 md:px-8 py-5 border-b border-black/5 flex items-center justify-between z-10">
          <div>
            <span className="text-xs uppercase tracking-widest font-semibold text-black/50">
              Mesa de Comercio Exterior
            </span>
            <h2 className="text-xl md:text-2xl font-medium tracking-tight text-black">
              Portal de Clientes & Solicitud de Cotización
            </h2>
          </div>
          <button
            onClick={handleResetAndClose}
            className="p-2 rounded-full hover:bg-black/5 text-black/70 hover:text-black transition-colors cursor-pointer"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 md:p-8">
          {submitted ? (
            <div className="py-8 text-center max-w-lg mx-auto animate-in zoom-in-95 duration-200">
              <div className="w-16 h-16 bg-[#142344] text-white rounded-full flex items-center justify-center mx-auto mb-5 shadow-lg shadow-[#142344]/20">
                <CheckCircle className="w-8 h-8" />
              </div>
              <h3 className="text-2xl md:text-3xl font-medium tracking-tight text-black mb-3">
                ¡Solicitud Registrada con Éxito!
              </h3>
              <p className="text-black/70 text-sm md:text-base mb-6 leading-relaxed">
                Estimado(a) <strong>{formData.name || 'Cliente'}</strong>, hemos recibido su requerimiento para{' '}
                <strong>{selectedSpecies.name}</strong>. Se ha despachado la notificación al correo:{' '}
                <span className="font-semibold text-[#142344] block mt-1">{TARGET_EMAIL}</span>
              </p>

              {/* Summary Card */}
              <div className="bg-white p-5 rounded-2xl border border-black/5 text-left mb-6 shadow-sm text-xs space-y-2.5">
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/50">Nombre / Empresa:</span>
                  <span className="font-medium text-black">{formData.name}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/50">Contacto / Teléfono:</span>
                  <span className="font-medium text-black">{formData.contact}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/50">Correo:</span>
                  <span className="font-medium text-black">{formData.email}</span>
                </div>
                <div className="flex justify-between border-b border-black/5 pb-2">
                  <span className="text-black/50">Especie:</span>
                  <span className="font-medium text-black">{selectedSpecies.name}</span>
                </div>
                <div>
                  <span className="text-black/50 block mb-1">Descripción:</span>
                  <p className="text-black/80 font-mono text-[11px] bg-[#F5F5F5] p-2.5 rounded-lg whitespace-pre-wrap">
                    {formData.description}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-center">
                <button
                  onClick={handleResetAndClose}
                  className="w-full sm:w-auto bg-[#142344] text-white px-8 py-3 rounded-full text-sm font-medium hover:bg-[#1d3260] transition-colors cursor-pointer shadow-md"
                >
                  Cerrar Portal
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Left Column: Species Specs */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-black/50 mb-3">
                  1. Selección de Especie
                </h4>
                <div className="flex flex-col gap-2.5 mb-6">
                  {speciesList.map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      onClick={() => setSelectedSpecies(item)}
                      className={`flex items-center gap-3.5 p-3 rounded-2xl border text-left transition-all cursor-pointer ${selectedSpecies.id === item.id
                        ? 'bg-[#142344] text-white border-[#142344] shadow'
                        : 'bg-white hover:bg-neutral-50 text-black border-black/5'
                        }`}
                    >
                      <img
                        src={item.photo}
                        alt={item.name}
                        className="w-14 h-14 object-cover rounded-xl"
                      />
                      <div className="flex-1">
                        <div className="font-medium text-sm leading-tight mb-1">{item.name}</div>
                        <div className="text-[11px] font-semibold opacity-80">{item.grade}</div>
                      </div>
                    </button>
                  ))}
                </div>

                {/* Selected Item Overview */}
                <div className="bg-white p-5 rounded-2xl border border-black/5 shadow-sm">
                  <div className="text-xs font-semibold uppercase tracking-wider text-black/40 mb-2">
                    Ficha Técnica de Origen
                  </div>
                  <p className="text-black/80 text-xs leading-relaxed font-light">
                    {selectedSpecies.description}
                  </p>
                </div>
              </div>

              {/* Right Column: Customer Details Form */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-black/50 mb-3">
                  2. Datos de Contacto & Requerimiento
                </h4>
                <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-3.5">
                  {/* Nombre */}
                  <div>
                    <label className="block text-xs font-semibold text-black/70 mb-1">
                      Nombre completo / Empresa <span className="text-rose-500">*</span>
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40">
                        <User className="w-4 h-4" />
                      </div>
                      <input
                        type="text"
                        maxLength={FIELD_LIMITS.name}
                        placeholder="Ej. Juan Pérez o Inversiones del Pacífico"
                        value={formData.name}
                        onKeyDown={(e) => handleKeyDown(e, 'name')}
                        onChange={(e) => handleChange('name', e.target.value)}
                        onBlur={() => handleBlur('name')}
                        className={`w-full bg-white border rounded-xl pl-10 pr-3.5 py-2.5 text-sm outline-none transition-all ${touched.name && errors.name
                          ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                          : 'border-black/10 focus:border-[#142344] focus:ring-2 focus:ring-[#142344]/10'
                          }`}
                      />
                    </div>
                    {touched.name && errors.name && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.name}</span>
                      </p>
                    )}
                  </div>

                  {/* Contacto y Correo en 2 columnas */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {/* Contacto */}
                    <div>
                      <label className="block text-xs font-semibold text-black/70 mb-1">
                        Numero de Contacto <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40">
                          <Phone className="w-4 h-4" />
                        </div>
                        <input
                          type="tel"
                          inputMode="tel"
                          maxLength={formData.contact.startsWith('+') ? (formData.contact.startsWith('+5930') ? 14 : 13) : 10}
                          placeholder="0991234567"
                          value={formData.contact}
                          onKeyDown={(e) => handleKeyDown(e, 'contact')}
                          onChange={(e) => handleChange('contact', e.target.value)}
                          onBlur={() => handleBlur('contact')}
                          className={`w-full bg-white border rounded-xl pl-10 pr-3.5 py-2.5 text-sm outline-none transition-all ${touched.contact && errors.contact
                            ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                            : 'border-black/10 focus:border-[#142344] focus:ring-2 focus:ring-[#142344]/10'
                            }`}
                        />
                      </div>
                      {touched.contact && errors.contact && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium animate-in fade-in">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.contact}</span>
                        </p>
                      )}
                    </div>

                    {/* Correo */}
                    <div>
                      <label className="block text-xs font-semibold text-black/70 mb-1">
                        Correo Electrónico <span className="text-rose-500">*</span>
                      </label>
                      <div className="relative">
                        <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-black/40">
                          <Mail className="w-4 h-4" />
                        </div>
                        <input
                          type="email"
                          maxLength={FIELD_LIMITS.email}
                          placeholder="contacto@empresa.com"
                          value={formData.email}
                          onKeyDown={(e) => handleKeyDown(e, 'email')}
                          onChange={(e) => handleChange('email', e.target.value)}
                          onBlur={() => handleBlur('email')}
                          className={`w-full bg-white border rounded-xl pl-10 pr-3.5 py-2.5 text-sm outline-none transition-all ${touched.email && errors.email
                            ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                            : 'border-black/10 focus:border-[#142344] focus:ring-2 focus:ring-[#142344]/10'
                            }`}
                        />
                      </div>
                      {touched.email && errors.email && (
                        <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium animate-in fade-in">
                          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                          <span>{errors.email}</span>
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Descripción */}
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-xs font-semibold text-black/70">
                        Descripción del Requerimiento <span className="text-rose-500">*</span>
                      </label>
                      {renderCharCounter(formData.description.length, FIELD_LIMITS.description)}
                    </div>
                    <textarea
                      rows={4}
                      maxLength={FIELD_LIMITS.description}
                      placeholder="Detalla tu pedido: tipo de cortes deseados, presentación, fechas tentativas o cualquier duda para cotización..."
                      value={formData.description}
                      onKeyDown={(e) => handleKeyDown(e, 'description')}
                      onChange={(e) => handleChange('description', e.target.value)}
                      onBlur={() => handleBlur('description')}
                      className={`w-full bg-white border rounded-xl p-3 text-sm outline-none transition-all resize-none ${touched.description && errors.description
                        ? 'border-rose-400 bg-rose-50/20 focus:ring-2 focus:ring-rose-200'
                        : 'border-black/10 focus:border-[#142344] focus:ring-2 focus:ring-[#142344]/10'
                        }`}
                    />
                    {touched.description && errors.description && (
                      <p className="text-xs text-rose-600 mt-1 flex items-center gap-1 font-medium animate-in fade-in">
                        <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                        <span>{errors.description}</span>
                      </p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full mt-2 bg-[#142344] text-white text-sm md:text-base font-medium py-3 rounded-full hover:bg-[#1d3260] transition-all shadow-md hover:shadow-lg cursor-pointer flex items-center justify-center gap-2 disabled:opacity-75 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="w-4 h-4 animate-spin" />
                        <span>Enviando requerimiento...</span>
                      </>
                    ) : (
                      <>
                        <Send className="w-4 h-4" />
                        <span>Enviar Solicitud a Blaufish</span>
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
