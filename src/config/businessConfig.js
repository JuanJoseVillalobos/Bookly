/**
 * Centralized business configuration for Bookly.
 * Allows adapting branding, identity, and contact information without modifying UI components.
 * Supports bilingual tagline and description.
 */
export const businessConfig = {
  name: 'Bookly',
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
  },
  branding: {
    primaryColor: '#173F35',
    secondaryColor: '#F7F5EF',
    accentColor: '#C5A77A',
  },
};

/**
 * Returns localized business configuration
 */
export function getLocalizedBusinessConfig(lang = 'es') {
  const l = lang.startsWith('en') ? 'en' : 'es';
  return {
    ...businessConfig,
    tagline: typeof businessConfig.tagline === 'object' ? businessConfig.tagline[l] : businessConfig.tagline,
    description: typeof businessConfig.description === 'object' ? businessConfig.description[l] : businessConfig.description,
  };
}

export default businessConfig;
