/**
 * Mock experiences data for Bookly MVP.
 * Supports both Spanish and English descriptions, categories, and durations.
 */
export const experiences = [
  {
    id: '1',
    title: {
      es: 'Mountain Escape',
      en: 'Mountain Escape',
    },
    location: 'Jujuy',
    price: 85,
    currency: 'USD',
    category: {
      es: 'Aventura',
      en: 'Adventure',
    },
    duration: {
      es: '1 día',
      en: '1 day',
    },
    shortDescription: {
      es: 'Explora senderos andinos inolvidables en una experiencia guiada por expertos locales.',
      en: 'Explore unforgettable Andean trails on a guided tour led by local experts.',
    },
  },
  {
    id: '2',
    title: {
      es: 'Salt Flats Adventure',
      en: 'Salt Flats Adventure',
    },
    location: 'Salinas Grandes',
    price: 120,
    currency: 'USD',
    category: {
      es: 'Excursión',
      en: 'Excursion',
    },
    duration: {
      es: 'Día completo',
      en: 'Full day',
    },
    shortDescription: {
      es: 'Vive la inmensidad blanca de las Salinas Grandes y captura momentos únicos.',
      en: 'Experience the vast white expanse of Salinas Grandes and capture unique memories.',
    },
  },
  {
    id: '3',
    title: {
      es: 'Hidden Waterfalls',
      en: 'Hidden Waterfalls',
    },
    location: 'Yungas',
    price: 65,
    currency: 'USD',
    category: {
      es: 'Naturaleza',
      en: 'Nature',
    },
    duration: {
      es: 'Medio día',
      en: 'Half day',
    },
    shortDescription: {
      es: 'Caminata entre la exuberante vegetación de las Yungas hacia cascadas secretas.',
      en: 'Trek through lush Yungas cloud forest vegetation towards secluded waterfalls.',
    },
  },
  {
    id: '4',
    title: {
      es: 'Andean Sunset',
      en: 'Andean Sunset',
    },
    location: 'Purmamarca',
    price: 95,
    currency: 'USD',
    category: {
      es: 'Paisajes',
      en: 'Scenic Views',
    },
    duration: {
      es: 'Tarde',
      en: 'Afternoon',
    },
    shortDescription: {
      es: 'Disfruta de la caída del sol sobre el Cerro de los Siete Colores con degustación.',
      en: 'Enjoy the sunset over the Hill of Seven Colors accompanied by regional wine tasting.',
    },
  },
];

/**
 * Returns an experience object with localized strings according to active language
 */
export function getLocalizedExperience(item, lang = 'es') {
  if (!item) return null;
  const l = lang.startsWith('en') ? 'en' : 'es';
  return {
    ...item,
    title: typeof item.title === 'object' ? item.title[l] || item.title.es : item.title,
    category: typeof item.category === 'object' ? item.category[l] || item.category.es : item.category,
    duration: typeof item.duration === 'object' ? item.duration[l] || item.duration.es : item.duration,
    shortDescription: typeof item.shortDescription === 'object' ? item.shortDescription[l] || item.shortDescription.es : item.shortDescription,
  };
}

export default experiences;
