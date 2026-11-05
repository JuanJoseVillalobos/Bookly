/**
 * Centralized Mock Data: Experiences for Bookly MVP
 *
 * This module provides the single source of truth for all demo experiences.
 * Designed to support Milestones M1 (Discovery, Catalog, Filters, Details)
 * and M2 (Booking workflow, dynamic totals, time slot selection).
 *
 * NOTE: All pricing and availability data are fictional and strictly illustrative.
 */

export const experiences = [
  {
    id: '1',
    slug: 'mountain-escape',
    title: {
      es: 'Mountain Escape',
      en: 'Mountain Escape',
    },
    tagline: {
      es: 'Travesía andina de altura y vistas panorámicas',
      en: 'High-altitude Andean trek and panoramic vistas',
    },
    category: {
      id: 'adventure',
      es: 'Aventura',
      en: 'Adventure',
    },
    location: {
      city: 'Jujuy',
      region: {
        es: 'Quebrada de Humahuaca, Jujuy',
        en: 'Humahuaca Gorge, Jujuy',
      },
      country: 'Argentina',
    },
    price: 85,
    currency: 'USD',
    pricing: {
      amount: 85,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa de demostración. No incluye IVA ni propinas.',
        en: 'Illustrative demo rate. Does not include VAT or gratuity.',
      },
    },
    duration: {
      es: '1 día (7 hs)',
      en: '1 day (7 hrs)',
      hours: 7,
    },
    difficulty: {
      es: 'Moderada',
      en: 'Moderate',
    },
    groupSize: {
      min: 1,
      max: 8,
    },
    shortDescription: {
      es: 'Explora senderos andinos inolvidables en una experiencia guiada por expertos locales.',
      en: 'Explore unforgettable Andean trails on a guided tour led by local experts.',
    },
    description: {
      es: 'Una inmersión profunda en los paisajes minerales y la cultura viva de la Quebrada de Humahuaca. Recorreremos senderos ancestrales transitados por arrieros, alcanzando miradores naturales a más de 3.200 metros sobre el nivel del mar con vistas panorámicas únicas del valle y los cerros multicolores.',
      en: 'A deep immersion into the mineral landscapes and living culture of the Humahuaca Gorge. Trek along ancestral trails once used by muleteers, ascending to scenic natural lookouts at over 3,200 meters above sea level with breathtaking panoramic views of the valley and multicolored mountains.',
    },
    highlights: {
      es: [
        'Ascenso guiado a miradores panorámicos sobre la Quebrada a 3.200 msnm',
        'Avistamiento de cóndores andinos y flora autóctona de alta montaña',
        'Almuerzo campestre con productos orgánicos de productores locales',
        'Interpretación geológica y cultural con guía local certificado',
      ],
      en: [
        'Guided ascent to panoramic scenic lookouts over the Gorge at 3,200 m a.s.l.',
        'Sighting of Andean condors and native high-altitude flora',
        'Picnic lunch featuring organic produce from local community growers',
        'Geological and cultural storytelling with a certified local guide',
      ],
    },
    included: {
      es: [
        'Guía profesional local certificado',
        'Seguro de actividad y asistencia médica en montaña',
        'Bastones de trekking y equipamiento técnico necesario',
        'Almuerzo campestre regional y snacks de marcha',
        'Transporte ida y vuelta desde punto de encuentro en San Salvador de Jujuy',
      ],
      en: [
        'Certified local professional guide',
        'Activity insurance and mountain medical assistance',
        'Trekking poles and necessary technical gear',
        'Regional picnic lunch and energy snacks',
        'Round-trip transportation from meeting point in San Salvador de Jujuy',
      ],
    },
    notIncluded: {
      es: [
        'Indumentaria personal de abrigo y calzado de trekking',
        'Propinas voluntarias para el equipo',
      ],
      en: [
        'Personal warm clothing and trekking footwear',
        'Voluntary gratuities for the team',
      ],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1486870591958-9b9d0d1dda99?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1465056836041-7f43ac27dcb5?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Sendero de montaña en la Quebrada de Jujuy',
        en: 'Mountain trail in Jujuy Gorge',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Todo el año (sujeto a clima)',
        en: 'Year-round (weather permitting)',
      },
      availableDays: [1, 2, 3, 4, 5, 6, 0], // Monday to Sunday
      timeSlots: [
        { value: '09:00', label: { es: '09:00 hs — Turno Mañana', en: '09:00 AM — Morning' } },
        { value: '14:00', label: { es: '14:00 hs — Turno Tarde', en: '02:00 PM — Afternoon' } },
      ],
    },
    featured: true,
    rating: 4.9,
    reviewsCount: 42,
  },
  {
    id: '2',
    slug: 'salt-flats-adventure',
    title: {
      es: 'Salt Flats Adventure',
      en: 'Salt Flats Adventure',
    },
    tagline: {
      es: 'El desierto blanco infinito de la Puna jujeña',
      en: 'The infinite white desert of the Jujuy Puna',
    },
    category: {
      id: 'excursion',
      es: 'Excursión',
      en: 'Excursion',
    },
    location: {
      city: 'Salinas Grandes',
      region: {
        es: 'Puna Jujeña / RN 52',
        en: 'Jujuy Puna / Route 52',
      },
      country: 'Argentina',
    },
    price: 120,
    currency: 'USD',
    pricing: {
      amount: 120,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa de demostración. Incluye acceso al área comunitaria.',
        en: 'Illustrative demo rate. Includes community entrance fee.',
      },
    },
    duration: {
      es: 'Día completo (9 hs)',
      en: 'Full day (9 hrs)',
      hours: 9,
    },
    difficulty: {
      es: 'Baja (altura moderada)',
      en: 'Low (high altitude)',
    },
    groupSize: {
      min: 1,
      max: 6,
    },
    shortDescription: {
      es: 'Vive la inmensidad blanca de las Salinas Grandes y captura momentos únicos.',
      en: 'Experience the vast white expanse of Salinas Grandes and capture unique memories.',
    },
    description: {
      es: 'Una travesía inolvidable a través de la sinuosa Cuesta de Lipán hasta alcanzar los 4.170 msnm en el Abra de Potrerillos, descendiendo luego hacia el deslumbrante manto de sal de más de 212 km² de las Salinas Grandes. Conoceremos el proceso tradicional de extracción artesanal de sal guiados por miembros de comunidades originarias.',
      en: 'An unforgettable journey navigating the winding Cuesta de Lipán pass up to 4,170 meters at Abra de Potrerillos, descending into the dazzling 212 km² white salt mantle of Salinas Grandes. Learn the traditional artisanal salt extraction process guided by members of indigenous host communities.',
    },
    highlights: {
      es: [
        'Travesía escénica por la Cuesta de Lipán con paradas fotográficas',
        'Recorrido guiado por artesanos salineros en el corazón del salar',
        'Sesión guiada para fotos de perspectiva óptica sobre los piletones',
        'Transporte en vehículo 4x4 climatizado con oxígeno a bordo',
      ],
      en: [
        'Scenic drive along Cuesta de Lipán pass with panoramic photo stops',
        'Guided walking tour by artisanal salt workers into the salt flats',
        'Creative perspective photography session at the turquoise brine pools',
        'Air-conditioned 4x4 transportation with medical oxygen on board',
      ],
    },
    included: {
      es: [
        'Transporte 4x4 ida y vuelta con chofer-guía profesional',
        'Tarifa de ingreso a la cooperativa comunitaria de Salinas Grandes',
        'Seguro integral del pasajero',
        'Almuerzo liviano gourmet y agua mineral durante todo el trayecto',
        'Gafas de sol de protección UV y protector solar',
      ],
      en: [
        'Round-trip 4x4 transportation with professional driver-guide',
        'Entrance fee to the Salinas Grandes community cooperative',
        'Comprehensive traveler insurance',
        'Light gourmet lunch and mineral water throughout the day',
        'UV-certified sunglasses and high-protection sunscreen',
      ],
    },
    notIncluded: {
      es: [
        'Gastos y compras de recuerdos personales en artesanías',
      ],
      en: [
        'Personal souvenir purchases and artisanal crafts',
      ],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1545569341-9eb8b30979d9?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Inmensidad blanca de las Salinas Grandes',
        en: 'White expanse of Salinas Grandes salt flats',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Todo el año (atardeceres especiales en invierno)',
        en: 'Year-round (special sunsets in winter)',
      },
      availableDays: [1, 2, 3, 4, 5, 6, 0],
      timeSlots: [
        { value: '09:00', label: { es: '09:00 hs — Turno Mañana', en: '09:00 AM — Morning' } },
        { value: '14:00', label: { es: '14:00 hs — Turno Tarde', en: '02:00 PM — Afternoon' } },
      ],
    },
    featured: true,
    rating: 5.0,
    reviewsCount: 56,
  },
  {
    id: '3',
    slug: 'hidden-waterfalls',
    title: {
      es: 'Hidden Waterfalls',
      en: 'Hidden Waterfalls',
    },
    tagline: {
      es: 'Selva de montaña, cascadas cristalinas y biodiversidad',
      en: 'Cloud forest, crystalline waterfalls, and lush biodiversity',
    },
    category: {
      id: 'nature',
      es: 'Naturaleza',
      en: 'Nature',
    },
    location: {
      city: 'Yungas',
      region: {
        es: 'Parque Nacional Calilegua, Jujuy',
        en: 'Calilegua National Park, Jujuy',
      },
      country: 'Argentina',
    },
    price: 65,
    currency: 'USD',
    pricing: {
      amount: 65,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa de demostración. Incluye ingreso a reserva natural.',
        en: 'Illustrative demo rate. Includes natural reserve entrance.',
      },
    },
    duration: {
      es: 'Medio día (5 hs)',
      en: 'Half day (5 hrs)',
      hours: 5,
    },
    difficulty: {
      es: 'Fácil - Moderada',
      en: 'Easy - Moderate',
    },
    groupSize: {
      min: 1,
      max: 10,
    },
    shortDescription: {
      es: 'Caminata entre la exuberante vegetación de las Yungas hacia cascadas secretas.',
      en: 'Trek through lush Yungas cloud forest vegetation towards secluded waterfalls.',
    },
    description: {
      es: 'Un contraste asombroso con el altiplano árido: la selva de las Yungas te recibe con helechos gigantes, orquídeas y el sonido constante del agua. Esta caminata interpretativa bordea arroyos de deshielo hasta descubrir cascadas escondidas con piletones naturales aptos para refrescarse.',
      en: 'A striking contrast to the arid plateau: the Yungas cloud forest welcomes you with giant ferns, wild orchids, and the soothing sound of rushing water. This interpretive hike winds alongside snowmelt streams to unveil secret waterfalls with natural pools ideal for a refreshing dip.',
    },
    highlights: {
      es: [
        'Senderismo bajo el dosel verde de la selva nublada de montaña',
        'Baño revitalizante en pozas naturales de agua pura de manantial',
        'Observación de aves endémicas (tucanes, picaflores y loros)',
        'Merienda saludable con frutas tropicales y panes caseros',
      ],
      en: [
        'Trekking under the emerald canopy of the mountain cloud forest',
        'Revitalizing swim in natural spring water pools',
        'Birdwatching for endemic species including toucans and hummingbirds',
        'Healthy afternoon snack with tropical fruits and homemade artisanal breads',
      ],
    },
    included: {
      es: [
        'Guía naturalista especializado en flora y fauna de las Yungas',
        'Ingreso a la reserva natural protegida',
        'Bolsas impermeables para dispositivos electrónicos',
        'Merienda campestre con infusiones regionales y frutas frescas',
        'Botiquín de primeros auxilios y comunicación satelital',
      ],
      en: [
        'Naturalist guide specialized in Yungas flora and fauna',
        'Entrance fee to the protected nature reserve',
        'Dry bags for electronic devices',
        'Country afternoon tea with regional herbal infusions and fresh fruits',
        'First aid kit and satellite emergency communication',
      ],
    },
    notIncluded: {
      es: [
        'Traje de baño y toalla personal',
        'Calzado de recambio',
      ],
      en: [
        'Swimwear and personal towel',
        'Spare footwear for after water activities',
      ],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Cascada cristalina en la selva de las Yungas',
        en: 'Crystalline waterfall in the Yungas cloud forest',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Septiembre a Mayo (temporada recomendada)',
        en: 'September to May (recommended season)',
      },
      availableDays: [2, 4, 6, 0], // Tue, Thu, Sat, Sun
      timeSlots: [
        { value: '09:00', label: { es: '09:00 hs — Turno Mañana', en: '09:00 AM — Morning' } },
        { value: '14:00', label: { es: '14:00 hs — Turno Tarde', en: '02:00 PM — Afternoon' } },
      ],
    },
    featured: true,
    rating: 4.8,
    reviewsCount: 29,
  },
  {
    id: '4',
    slug: 'andean-sunset',
    title: {
      es: 'Andean Sunset',
      en: 'Andean Sunset',
    },
    tagline: {
      es: 'Atardecer dorado sobre el Cerro de los Siete Colores',
      en: 'Golden hour sunset over the Hill of Seven Colors',
    },
    category: {
      id: 'scenic-views',
      es: 'Paisajes',
      en: 'Scenic Views',
    },
    location: {
      city: 'Purmamarca',
      region: {
        es: 'Purmamarca / Quebrada de Humahuaca',
        en: 'Purmamarca / Humahuaca Gorge',
      },
      country: 'Argentina',
    },
    price: 95,
    currency: 'USD',
    pricing: {
      amount: 95,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa de demostración. Incluye degustación completa de vinos y gastronomía.',
        en: 'Illustrative demo rate. Includes full wine tasting and gourmet pairings.',
      },
    },
    duration: {
      es: 'Tarde (4 hs)',
      en: 'Afternoon (4 hrs)',
      hours: 4,
    },
    difficulty: {
      es: 'Muy fácil',
      en: 'Very easy',
    },
    groupSize: {
      min: 1,
      max: 12,
    },
    shortDescription: {
      es: 'Disfruta de la caída del sol sobre el Cerro de los Siete Colores con degustación.',
      en: 'Enjoy the sunset over the Hill of Seven Colors accompanied by regional wine tasting.',
    },
    description: {
      es: 'Al caer la tarde, los estratos sedimentarios del Cerro de los Siete Colores se encienden con tonalidades ocres, púrpuras y doradas. Tras una caminata relajada por el Paseo de los Colorados, accederemos a una terraza privada para una cata guiada de vinos de altura jujeños acompañados por cocina de autor andina.',
      en: 'As the sun dips toward the horizon, the sedimentary bands of the Hill of Seven Colors glow with ochre, purple, and gold tones. After a gentle stroll through the Paseo de los Colorados canyon, access a private terrace for an exclusive guided tasting of high-altitude Jujuy wines paired with Andean cuisine.',
    },
    highlights: {
      es: [
        'Paseo guiado al atardecer entre las rojizas formaciones de Los Colorados',
        'Mirador privado exclusivo con vista directa al Cerro de los Siete Colores',
        'Cata maridada de 4 vinos de extrema altura (bodegas de la Quebrada)',
        'Degustación de empanadas artesanales y quesillos de cabra con dulces regionales',
      ],
      en: [
        'Guided sunset walk through the red earth formations of Los Colorados',
        'Exclusive private terrace with front-row view of the Hill of Seven Colors',
        'Sommelier-led pairing of 4 extreme high-altitude wines from boutique wineries',
        'Tasting of artisanal empanadas and local goat cheese with regional preserves',
      ],
    },
    included: {
      es: [
        'Paseo guiado con guía historiador local',
        'Acceso exclusivo a terraza panorámica privada',
        'Cata de 4 vinos de altura guiada por sommelier',
        'Menú de bocadillos y tapas andinas gourmet',
        'Mantas de abrigo de lana de llama para el anochecer',
      ],
      en: [
        'Guided walk with local historian guide',
        'Exclusive access to private panoramic terrace',
        '4-flight high-altitude wine tasting led by certified sommelier',
        'Gourmet Andean tapas and artisanal appetizers',
        'Warm llama-wool blankets provided for after nightfall',
      ],
    },
    notIncluded: {
      es: [
        'Botellas adicionales de vino para llevar',
      ],
      en: [
        'Additional bottles of wine for take-away',
      ],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Atardecer sobre el Cerro de los Siete Colores en Purmamarca',
        en: 'Sunset over the Hill of Seven Colors in Purmamarca',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Todo el año',
        en: 'Year-round',
      },
      availableDays: [1, 2, 3, 4, 5, 6, 0],
      timeSlots: [
        { value: '18:00', label: { es: '18:00 hs — Turno Atardecer', en: '06:00 PM — Sunset' } },
      ],
    },
    featured: true,
    rating: 4.9,
    reviewsCount: 64,
  },
];

/**
 * Helper to resolve a bilingual field ({ es: '...', en: '...' } or string)
 */
function resolveText(field, lang = 'es') {
  if (!field) return '';
  if (typeof field === 'string') return field;
  const l = lang.startsWith('en') ? 'en' : 'es';
  return field[l] || field.es || '';
}

/**
 * Helper to resolve an array of bilingual strings
 */
function resolveArray(arr, lang = 'es') {
  if (!Array.isArray(arr)) return [];
  return arr.map((item) => resolveText(item, lang));
}

/**
 * Returns a fully localized representation of an experience object
 * @param {object} item
 * @param {string} [lang='es']
 * @returns {object|null}
 */
export function getLocalizedExperience(item, lang = 'es') {
  if (!item) return null;
  const l = lang.startsWith('en') ? 'en' : 'es';

  const categoryName = typeof item.category === 'object'
    ? resolveText(item.category, l)
    : item.category;

  const durationName = typeof item.duration === 'object'
    ? resolveText(item.duration, l)
    : item.duration;

  const cityName = typeof item.location === 'object'
    ? item.location.city
    : item.location;

  const regionName = typeof item.location === 'object' && item.location.region
    ? resolveText(item.location.region, l)
    : cityName;

  const timeSlots = item.availability?.timeSlots?.map((slot) => ({
    value: slot.value,
    label: typeof slot.label === 'object' ? resolveText(slot.label, l) : slot.label,
  })) || [
    { value: '09:00', label: l === 'en' ? '09:00 AM — Morning' : '09:00 hs — Turno Mañana' },
    { value: '14:00', label: l === 'en' ? '02:00 PM — Afternoon' : '14:00 hs — Turno Tarde' },
    { value: '18:00', label: l === 'en' ? '06:00 PM — Sunset' : '18:00 hs — Turno Atardecer' },
  ];

  return {
    id: String(item.id),
    slug: item.slug || item.id,
    title: resolveText(item.title, l),
    tagline: resolveText(item.tagline, l),
    category: categoryName,
    categoryId: item.category?.id || categoryName.toLowerCase(),
    location: cityName,
    locationFull: regionName,
    locationObj: item.location,
    price: item.price ?? item.pricing?.amount ?? 0,
    currency: item.currency ?? item.pricing?.currency ?? 'USD',
    pricing: {
      ...item.pricing,
      notice: resolveText(item.pricing?.notice, l),
    },
    duration: durationName,
    durationHours: item.duration?.hours,
    difficulty: resolveText(item.difficulty, l),
    groupSize: item.groupSize || { min: 1, max: 8 },
    shortDescription: resolveText(item.shortDescription, l),
    description: resolveText(item.description, l),
    highlights: resolveArray(item.highlights?.[l] || item.highlights?.es || item.highlights, l),
    included: resolveArray(item.included?.[l] || item.included?.es || item.included, l),
    notIncluded: resolveArray(item.notIncluded?.[l] || item.notIncluded?.es || item.notIncluded, l),
    images: item.images,
    mainImage: item.images?.main,
    gallery: item.images?.gallery || [],
    imageAlt: resolveText(item.images?.alt, l),
    availability: {
      ...item.availability,
      season: resolveText(item.availability?.season, l),
      isIllustrative: true,
      timeSlots,
    },
    timeSlots,
    isIllustrative: true,
    featured: Boolean(item.featured),
    rating: item.rating || 5.0,
    reviewsCount: item.reviewsCount || 0,
  };
}

/**
 * Find an experience by either numeric ID or string slug
 */
export function getExperienceById(identifier, lang = 'es') {
  if (!identifier) return null;
  const found = experiences.find(
    (exp) => String(exp.id) === String(identifier) || exp.slug === String(identifier)
  );
  return found ? getLocalizedExperience(found, lang) : null;
}

/**
 * Returns list of featured experiences localized
 */
export function getFeaturedExperiences(lang = 'es') {
  return experiences
    .filter((exp) => exp.featured)
    .map((exp) => getLocalizedExperience(exp, lang));
}

/**
 * Returns distinct localized categories present in the catalog
 */
export function getAvailableCategories(lang = 'es') {
  const categoriesMap = new Map();
  experiences.forEach((exp) => {
    const loc = getLocalizedExperience(exp, lang);
    if (!categoriesMap.has(loc.categoryId)) {
      categoriesMap.set(loc.categoryId, {
        id: loc.categoryId,
        name: loc.category,
      });
    }
  });
  return Array.from(categoriesMap.values());
}

/**
 * Returns distinct locations present in the catalog
 */
export function getAvailableLocations() {
  const set = new Set();
  experiences.forEach((exp) => {
    if (typeof exp.location === 'object' && exp.location.city) {
      set.add(exp.location.city);
    } else if (typeof exp.location === 'string') {
      set.add(exp.location);
    }
  });
  return Array.from(set);
}

/**
 * Filter experiences dynamically based on search criteria (for M1)
 */
export function filterExperiences({
  category = 'all',
  location = 'all',
  minPrice = 0,
  maxPrice = Infinity,
  searchQuery = '',
  lang = 'es',
} = {}) {
  const query = searchQuery.trim().toLowerCase();

  return experiences
    .map((exp) => getLocalizedExperience(exp, lang))
    .filter((exp) => {
      // Category match
      if (category !== 'all' && exp.categoryId !== category && exp.category !== category) {
        return false;
      }
      // Location match
      if (location !== 'all' && exp.location.toLowerCase() !== location.toLowerCase()) {
        return false;
      }
      // Price range match
      if (exp.price < minPrice || exp.price > maxPrice) {
        return false;
      }
      // Free text search
      if (query) {
        const inTitle = exp.title.toLowerCase().includes(query);
        const inDesc = exp.shortDescription.toLowerCase().includes(query) || exp.description.toLowerCase().includes(query);
        const inLocation = exp.location.toLowerCase().includes(query) || exp.locationFull.toLowerCase().includes(query);
        if (!inTitle && !inDesc && !inLocation) {
          return false;
        }
      }
      return true;
    });
}

export default experiences;
