/**
 * Centralized Business Configuration for Bookly.
 *
 * This module decouples the commercial identity (name, tagline, description,
 * contact details, branding palette, and booking parameters) from the UI components.
 * To adapt this template to a different operator or agency, modify this object.
 */
export const businessConfig = {
  name: 'Bookly',
  badge: 'MVP',

  tagline: {
    es: 'Descubre. Reserva. Vive la experiencia.',
    en: 'Discover. Book. Experience.',
  },

  description: {
    es: 'Descubre experiencias memorables y reserva en simples pasos.',
    en: 'Discover memorable experiences and book with simple, effortless steps.',
  },

  contact: {
    email: 'contacto@bookly.demo',
    phone: '+54 9 388 000-0000',
    location: {
      es: 'Noroeste Argentino (Demo)',
      en: 'Northwest Argentina (Demo)',
    },
    hours: {
      es: 'Lun a Sáb — 09:00 a 19:00 hs',
      en: 'Mon to Sat — 9:00 AM to 7:00 PM',
    },
  },

  branding: {
    primaryColor: '#173F35',      // Forest
    secondaryColor: '#F7F5EF',    // Ivory
    accentColor: '#C5A77A',       // Sand Gold
    textColor: '#222824',         // Charcoal
    borderColor: '#E8E5DC',       // Stone
    logoUrl: null,                // Set a URL string to render an image logo instead of text
  },

  social: {
    instagram: 'https://instagram.com',
    whatsapp: '+5493880000000',
  },

  currency: {
    default: 'USD',
  },

  bookingSettings: {
    referencePrefix: 'BKL',
    maxGuestsPerRequest: 8,
    requiresOperatorApproval: true,
  },
};

/**
 * Helper to resolve a potentially bilingual field ({ es, en } or string)
 * @param {string|object} field
 * @param {string} lang
 * @returns {string}
 */
function resolveLocalizedField(field, lang = 'es') {
  if (!field) return '';
  if (typeof field === 'string') return field;
  const normalizedLang = lang.startsWith('en') ? 'en' : 'es';
  return field[normalizedLang] || field.es || '';
}

/**
 * Returns the business configuration with all translatable strings resolved
 * for the requested language ('es' | 'en').
 * @param {string} lang
 */
export function getLocalizedBusinessConfig(lang = 'es') {
  return {
    ...businessConfig,
    tagline: resolveLocalizedField(businessConfig.tagline, lang),
    description: resolveLocalizedField(businessConfig.description, lang),
    contact: {
      ...businessConfig.contact,
      location: resolveLocalizedField(businessConfig.contact?.location, lang),
      hours: resolveLocalizedField(businessConfig.contact?.hours, lang),
    },
  };
}

/**
 * Applies configured branding colors to root CSS variables so any customization
 * in `businessConfig.branding` automatically reflects in the UI.
 */
export function applyBusinessBranding(config = businessConfig) {
  if (typeof document === 'undefined' || !config?.branding) return;

  const root = document.documentElement;
  const { primaryColor, secondaryColor, accentColor, textColor, borderColor } = config.branding;

  if (primaryColor) root.style.setProperty('--color-forest', primaryColor);
  if (secondaryColor) root.style.setProperty('--color-ivory', secondaryColor);
  if (accentColor) root.style.setProperty('--color-sand-gold', accentColor);
  if (textColor) root.style.setProperty('--color-charcoal', textColor);
  if (borderColor) root.style.setProperty('--color-stone', borderColor);
}

export default businessConfig;
