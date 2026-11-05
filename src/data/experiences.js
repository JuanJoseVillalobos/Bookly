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
  // --- ADVENTURE EXPERIENCES (IDs 5 - 8) ---
  {
    id: '5',
    slug: 'garganta-del-diablo-trek',
    title: {
      es: 'Garganta del Diablo Trek',
      en: 'Garganta del Diablo Trek',
    },
    tagline: {
      es: 'Cañones rojizos y saltos de agua en la Quebrada',
      en: 'Red rock canyons and waterfalls in the Gorge',
    },
    category: {
      id: 'adventure',
      es: 'Aventura',
      en: 'Adventure',
    },
    location: {
      city: 'Tilcara',
      region: {
        es: 'Quebrada de Humahuaca, Jujuy',
        en: 'Humahuaca Gorge, Jujuy',
      },
      country: 'Argentina',
    },
    price: 60,
    currency: 'USD',
    pricing: {
      amount: 60,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa de demostración. No incluye IVA.',
        en: 'Illustrative demo rate. VAT not included.',
      },
    },
    duration: {
      es: 'Medio día (4 hs)',
      en: 'Half day (4 hrs)',
      hours: 4,
    },
    difficulty: {
      es: 'Moderada',
      en: 'Moderate',
    },
    groupSize: {
      min: 1,
      max: 10,
    },
    shortDescription: {
      es: 'Caminata por la garganta natural del río Huasamayo hacia el imponente salto de agua.',
      en: 'Hike along the Huasamayo river gorge toward the stunning natural waterfall.',
    },
    description: {
      es: 'Una caminata activa a través del cañón natural de Tilcara, bordeando el curso del río Huasamayo entre paredones de roca rojiza hasta alcanzar la cascada natural de la Garganta del Diablo. Incluye explicaciones de geología andina y senderos históricos.',
      en: 'An active hike through the natural canyon of Tilcara, tracking along the Huasamayo river between sheer red sandstone walls to reach the dramatic Devil’s Throat waterfall. Includes Andean geology and trail history insights.',
    },
    highlights: {
      es: [
        'Caminata guiada por cañones de arenisca rojiza',
        'Vistas panorámicas del valle de Tilcara',
        'Llegada al salto de agua natural de la Garganta del Diablo',
        'Guía local bilingüe y seguro de senderismo',
      ],
      en: [
        'Guided hike through dramatic red sandstone canyons',
        'Panoramic vistas of the Tilcara valley',
        'Arrival at the Devil’s Throat natural waterfall',
        'Bilingual local guide and trekking insurance',
      ],
    },
    included: {
      es: ['Guía local certificado', 'Entrada al circuito natural', 'Snack regional y agua mineral', 'Seguro de senderismo'],
      en: ['Certified local guide', 'Trail admission fee', 'Regional snack and mineral water', 'Hiking insurance'],
    },
    notIncluded: {
      es: ['Calzado de trekking personal', 'Propinas voluntarias'],
      en: ['Personal trekking shoes', 'Voluntary gratuities'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Sendero hacia la Garganta del Diablo en Tilcara',
        en: 'Trail to the Devil’s Throat in Tilcara',
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
        { value: '09:00', label: { es: '09:00 hs — Turno Mañana', en: '09:00 AM — Morning' } },
        { value: '14:30', label: { es: '14:30 hs — Turno Tarde', en: '02:30 PM — Afternoon' } },
      ],
    },
    featured: false,
    rating: 4.8,
    reviewsCount: 38,
  },
  {
    id: '6',
    slug: 'cerro-chani-expedition',
    title: {
      es: 'Cerro Chañi Expedition',
      en: 'Cerro Chañi Expedition',
    },
    tagline: {
      es: 'Expedición andina al pico más alto de los Andes jujeños',
      en: 'Andean expedition to the highest peak in Jujuy',
    },
    category: {
      id: 'adventure',
      es: 'Aventura',
      en: 'Adventure',
    },
    location: {
      city: 'Volcán',
      region: {
        es: 'Cordillera Oriental, Jujuy',
        en: 'Eastern Cordillera, Jujuy',
      },
      country: 'Argentina',
    },
    price: 190,
    currency: 'USD',
    pricing: {
      amount: 190,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa de demostración. Incluye campamento y comidas.',
        en: 'Illustrative demo rate. Includes camp and meals.',
      },
    },
    duration: {
      es: '2 días (16 hs)',
      en: '2 days (16 hrs)',
      hours: 16,
    },
    difficulty: {
      es: 'Alta / Exigente',
      en: 'High / Strenuous',
    },
    groupSize: {
      min: 2,
      max: 6,
    },
    shortDescription: {
      es: 'Asciende al campamento base del coloso Chañi a más de 4.000 msnm con guías de alta montaña.',
      en: 'Trek up to the base camp of the mighty Mount Chañi above 4,000 m a.s.l. with certified mountain guides.',
    },
    description: {
      es: 'Una vivencia de montañismo auténtico en el Nevado de Chañi (5.896 msnm). En esta travesía de dos días alcanzaremos el campamento de altura, pernoctando bajo un cielo estrellado sin contaminación lumínica con logística de expedición profesional.',
      en: 'An authentic mountaineering journey to Mount Chañi (5,896 m a.s.l.). On this two-day trek, reach the high-altitude base camp, sleeping under crystal-clear starry skies with professional expedition logistics.',
    },
    highlights: {
      es: [
        'Ascenso hacia campamento base a más de 4.200 msnm',
        'Noche de campamento de montaña con cena de fogón',
        'Guías certificados de alta montaña AAGM',
        'Mulas de porteo para equipo pesado',
      ],
      en: [
        'Ascent to base camp above 4,200 m a.s.l.',
        'Mountain camping night with campfire regional dinner',
        'Certified high-mountain guides',
        'Pack mules for heavy expedition gear',
      ],
    },
    included: {
      es: ['Guías de montaña profesionales', 'Equipo de campamento y carpas 4 estaciones', 'Todas las comidas de expedición', 'Seguro de montaña y botiquín de altura'],
      en: ['Professional mountain guides', '4-season tents and camp gear', 'All expedition meals', 'Mountain insurance and medical kit'],
    },
    notIncluded: {
      es: ['Bolsa de dormir térmica personal', 'Ropa técnica de abrigo'],
      en: ['Personal thermal sleeping bag', 'Warm technical clothing'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1483728642387-6c3bdd6c93e5?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Cumbre andina del Cerro Chañi',
        en: 'Andean summit of Mount Chañi',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Octubre a Mayo',
        en: 'October to May',
      },
      availableDays: [5, 6, 0],
      timeSlots: [
        { value: '07:00', label: { es: '07:00 hs — Salida Expedición', en: '07:00 AM — Expedition Departure' } },
      ],
    },
    featured: false,
    rating: 5.0,
    reviewsCount: 22,
  },
  {
    id: '7',
    slug: 'valle-colorado-bike-tour',
    title: {
      es: 'Valle Colorado Bike Tour',
      en: 'Valle Colorado Bike Tour',
    },
    tagline: {
      es: 'Descenso en dos ruedas por cornisas andinas y valles verdes',
      en: 'Mountain bike descent along Andean cornices and lush valleys',
    },
    category: {
      id: 'adventure',
      es: 'Aventura',
      en: 'Adventure',
    },
    location: {
      city: 'Santa Ana',
      region: {
        es: 'Valle Colorado & Santa Ana, Jujuy',
        en: 'Valle Colorado & Santa Ana, Jujuy',
      },
      country: 'Argentina',
    },
    price: 75,
    currency: 'USD',
    pricing: {
      amount: 75,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Incluye bicicleta de montaña y casco.',
        en: 'Illustrative rate. Includes MTB and helmet.',
      },
    },
    duration: {
      es: '6 horas',
      en: '6 hours',
      hours: 6,
    },
    difficulty: {
      es: 'Moderada',
      en: 'Moderate',
    },
    groupSize: {
      min: 2,
      max: 8,
    },
    shortDescription: {
      es: 'Emocionante travesía en bicicleta de montaña con vistas panorámicas que unen la Puna y las Yungas.',
      en: 'Thrilling mountain bike journey with breathtaking panoramas connecting the Puna to cloud forest valleys.',
    },
    description: {
      es: 'Un recorrido vertiginoso y panorámico en bicicleta de montaña que desciende desde las alturas de la Puna hasta la exuberante vegetación de Valle Colorado. Atravesaremos curvas de herradura con el acompañamiento de un vehículo de apoyo constante.',
      en: 'An exhilarating, scenic mountain bike descent riding from high Andean plateaus into the lush cloud forest valleys of Valle Colorado. Cruise along winding roads with dedicated vehicle support throughout.',
    },
    highlights: {
      es: [
        'Descenso de más de 1.800 metros de desnivel',
        'Bicicletas de montaña doble suspensión y cascos incluidos',
        'Vehículo de apoyo y asistencia mecánica durante todo el trayecto',
        'Almuerzo campestre con productos locales',
      ],
      en: [
        'Descent of over 1,800 vertical meters',
        'Dual-suspension mountain bikes and helmets included',
        'Support vehicle and mechanical assistance along the way',
        'Picnic lunch featuring organic valley produce',
      ],
    },
    included: {
      es: ['Bicicleta MTB profesional', 'Casco y guantes', 'Vehículo de apoyo 4x4', 'Almuerzo campestre e hidratación'],
      en: ['Professional MTB bike', 'Helmet and gloves', '4x4 support vehicle', 'Picnic lunch and hydration'],
    },
    notIncluded: {
      es: ['Indumentaria ciclista personal'],
      en: ['Personal cycling clothing'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Descenso en bicicleta por caminos de cornisa andinos',
        en: 'Mountain biking descent along Andean cornice roads',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Todo el año',
        en: 'Year-round',
      },
      availableDays: [2, 4, 6, 0],
      timeSlots: [
        { value: '08:30', label: { es: '08:30 hs — Turno Mañana', en: '08:30 AM — Morning' } },
      ],
    },
    featured: false,
    rating: 4.9,
    reviewsCount: 31,
  },
  {
    id: '8',
    slug: 'laguna-de-pozuelos-trail',
    title: {
      es: 'Laguna de Pozuelos Trail',
      en: 'Laguna de Pozuelos Trail',
    },
    tagline: {
      es: 'Caminata de altura y avistamiento en el monumento natural',
      en: 'High-altitude trail and wildlife watching at the natural monument',
    },
    category: {
      id: 'adventure',
      es: 'Aventura',
      en: 'Adventure',
    },
    location: {
      city: 'Rinconada',
      region: {
        es: 'Puna Norte, Jujuy',
        en: 'Northern Puna, Jujuy',
      },
      country: 'Argentina',
    },
    price: 110,
    currency: 'USD',
    pricing: {
      amount: 110,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Incluye permiso de Parques Nacionales.',
        en: 'Illustrative rate. Includes National Parks permit.',
      },
    },
    duration: {
      es: '8 horas',
      en: '8 hours',
      hours: 8,
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
      es: 'Recorrido a pie por la cuenca endorreica donde habitan miles de flamencos andinos a 3.600 msnm.',
      en: 'Scenic hiking across the pristine endorheic basin inhabited by thousands of Andean flamingos at 3,600 m.',
    },
    description: {
      es: 'Una aventura de senderismo en uno de los humedales más remotos y prístinos de América del Sur. El Monumento Natural Laguna de Pozuelos alberga tres especies de flamencos y vicuñas en libertad bajo horizontes infinitos.',
      en: 'A hiking adventure in one of the most remote and pristine wetlands in South America. The Laguna de Pozuelos Natural Monument shelters three species of flamingos and wild vicuñas under boundless high-desert horizons.',
    },
    highlights: {
      es: [
        'Senderismo en humedal protegido a 3.600 msnm',
        'Telescopio y binoculares profesionales para avistamiento',
        'Interpretación de aves con ornitólogo local',
        'Transporte 4x4 cruzando la Puna jujeña',
      ],
      en: [
        'Trek across protected wetlands at 3,600 m a.s.l.',
        'High-powered spotting scopes and binoculars provided',
        'Birdwatching interpretation with a local naturalist',
        '4x4 expedition crossing the Jujuy Puna',
      ],
    },
    included: {
      es: ['Guía naturalista certificado', 'Óptica y binoculares de observación', 'Almuerzo regional y bebidas', 'Transporte 4x4 ida y vuelta'],
      en: ['Certified naturalist guide', 'Spotting scopes and binoculars', 'Regional lunch and drinks', 'Round-trip 4x4 transportation'],
    },
    notIncluded: {
      es: ['Gastos personales'],
      en: ['Personal expenses'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Laguna de Pozuelos en la Puna jujeña',
        en: 'Laguna de Pozuelos in the Jujuy Puna',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Septiembre a Mayo',
        en: 'September to May',
      },
      availableDays: [1, 3, 5, 6],
      timeSlots: [
        { value: '08:00', label: { es: '08:00 hs — Turno Mañana', en: '08:00 AM — Morning' } },
      ],
    },
    featured: false,
    rating: 4.8,
    reviewsCount: 19,
  },
  // --- EXCURSION EXPERIENCES (IDs 9 - 12) ---
  {
    id: '9',
    slug: 'serranias-del-hornocal',
    title: {
      es: 'Serranías del Hornocal',
      en: 'Serranías del Hornocal',
    },
    tagline: {
      es: 'El legendario Cerro de los 14 Colores a 4.350 msnm',
      en: 'The iconic 14 Colors Mountain at 4,350 m a.s.l.',
    },
    category: {
      id: 'excursion',
      es: 'Excursión',
      en: 'Excursion',
    },
    location: {
      city: 'Humahuaca',
      region: {
        es: 'Serranía del Hornocal, Humahuaca',
        en: 'Hornocal Mountain Range, Humahuaca',
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
        es: 'Tarifa ilustrativa de demostración. Incluye acceso al mirador.',
        en: 'Illustrative demo rate. Includes viewpoint access fee.',
      },
    },
    duration: {
      es: 'Día completo (8 hs)',
      en: 'Full day (8 hrs)',
      hours: 8,
    },
    difficulty: {
      es: 'Baja',
      en: 'Low',
    },
    groupSize: {
      min: 1,
      max: 12,
    },
    shortDescription: {
      es: 'Excursión en vehículo 4x4 hacia uno de los miradores geológicos más impactantes del planeta.',
      en: '4x4 vehicle excursion to one of the most mesmerizing geological lookouts on Earth.',
    },
    description: {
      es: 'Viaja desde Humahuaca hacia las imponentes Serranías del Hornocal, famosas por sus formaciones sedimentarias en forma de V invertida que revelan hasta 14 colores distintos. Llegaremos al mirador en el momento óptimo de luz solar para capturar fotografías increíbles.',
      en: 'Travel from Humahuaca to the monumental Hornocal mountain range, renowned for its inverted V-shaped geological formations revealing up to 14 distinct mineral colors. Arrive at the scenic viewpoint during optimal afternoon light for photography.',
    },
    highlights: {
      es: [
        'Mirador panorámico a 4.350 msnm con vista directa al Hornocal',
        'Tiempo guiado para fotografía de alta montaña',
        'Visita al centro histórico colonial de Humahuaca',
        'Infusión regional de coca y snacks energéticos incluidos',
      ],
      en: [
        'Panoramic lookout at 4,350 m a.s.l. facing Hornocal',
        'Guided photo session during golden hour lighting',
        'Tour through the colonial historic center of Humahuaca',
        'Regional coca tea and energy snacks provided',
      ],
    },
    included: {
      es: ['Transporte 4x4 con chofer-guía', 'Entrada al mirador comunitario', 'Snacks y bebidas calientes', 'Asistencia médica en altura'],
      en: ['4x4 transport with driver-guide', 'Community viewpoint fee', 'Snacks and warm beverages', 'Altitude assistance kit'],
    },
    notIncluded: {
      es: ['Almuerzo en Humahuaca (opcional libre)'],
      en: ['Lunch in Humahuaca (optional)'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Serranías del Hornocal y sus 14 colores',
        en: 'Serranías del Hornocal 14 colors mountain',
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
        { value: '13:30', label: { es: '13:30 hs — Turno Tarde / Atardecer', en: '01:30 PM — Afternoon / Sunset' } },
      ],
    },
    featured: true,
    rating: 4.9,
    reviewsCount: 57,
  },
  {
    id: '10',
    slug: 'pucara-de-tilcara-heritage',
    title: {
      es: 'Pucará & Huacalera Heritage',
      en: 'Pucará & Huacalera Heritage',
    },
    tagline: {
      es: 'Fortaleza prehispánica y cruce del Trópico de Capricornio',
      en: 'Pre-Hispanic fortress and Tropic of Capricorn crossing',
    },
    category: {
      id: 'excursion',
      es: 'Excursión',
      en: 'Excursion',
    },
    location: {
      city: 'Tilcara',
      region: {
        es: 'Tilcara & Huacalera, Jujuy',
        en: 'Tilcara & Huacalera, Jujuy',
      },
      country: 'Argentina',
    },
    price: 55,
    currency: 'USD',
    pricing: {
      amount: 55,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Incluye entradas a museos y sitios arqueológicos.',
        en: 'Illustrative rate. Includes museum and archaeological tickets.',
      },
    },
    duration: {
      es: 'Medio día (5 hs)',
      en: 'Half day (5 hrs)',
      hours: 5,
    },
    difficulty: {
      es: 'Baja',
      en: 'Low',
    },
    groupSize: {
      min: 1,
      max: 14,
    },
    shortDescription: {
      es: 'Descubre los secretos arqueológicos del Pucará de Tilcara y la historia viva de los pueblos originarios.',
      en: 'Uncover the archaeological treasures of the Tilcara fortress and ancestral indigenous history.',
    },
    description: {
      es: 'Recorre la impresionante ciudadela fortificada construida por los antiguos tilcaras en el siglo XII, rodeada de cardones gigantes y miradores sobre el valle. Luego nos trasladamos al monolito del Trópico de Capricornio en Huacalera para una vivencia astronómica y cultural.',
      en: 'Explore the impressive fortified citadel built by the ancient Tilcaras in the 12th century, surrounded by giant cardon cacti and scenic overlooks. Then journey to the Tropic of Capricorn sundial monument in Huacalera.',
    },
    highlights: {
      es: [
        'Visita guiada al Pucará y Jardín Botánico de Altura',
        'Parada fotográfica en el Hito del Trópico de Capricornio',
        'Guía profesional especializado en historia andina',
        'Degustación de dulces regionales en Huacalera',
      ],
      en: [
        'Guided tour of Pucará fortress and high-altitude botanical gardens',
        'Photo stop at the Tropic of Capricorn sundial landmark',
        'Professional guide specialized in Andean archaeology',
        'Regional sweets tasting in historic Huacalera',
      ],
    },
    included: {
      es: ['Entradas a sitios arqueológicos', 'Guía profesional bilingüe', 'Transporte climatizado', 'Degustación regional'],
      en: ['Archaeological site admissions', 'Bilingual professional guide', 'A/C transportation', 'Regional tasting'],
    },
    notIncluded: {
      es: ['Gastos personales'],
      en: ['Personal expenses'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Ruinas del Pucará de Tilcara',
        en: 'Ruins of Pucará de Tilcara',
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
        { value: '09:30', label: { es: '09:30 hs — Turno Mañana', en: '09:30 AM — Morning' } },
        { value: '15:00', label: { es: '15:00 hs — Turno Tarde', en: '03:00 PM — Afternoon' } },
      ],
    },
    featured: false,
    rating: 4.7,
    reviewsCount: 45,
  },
  {
    id: '11',
    slug: 'iruya-cliffside-tour',
    title: {
      es: 'Iruya Cliffside Tour',
      en: 'Iruya Cliffside Tour',
    },
    tagline: {
      es: 'El pueblo mágico suspendido entre montañas y nubes',
      en: 'The magical village perched between mountains and clouds',
    },
    category: {
      id: 'excursion',
      es: 'Excursión',
      en: 'Excursion',
    },
    location: {
      city: 'Iruya',
      region: {
        es: 'Iruya & San Isidro',
        en: 'Iruya & San Isidro',
      },
      country: 'Argentina',
    },
    price: 130,
    currency: 'USD',
    pricing: {
      amount: 130,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Requiere transporte 4x4 especializado.',
        en: 'Illustrative rate. Specialized 4x4 transport required.',
      },
    },
    duration: {
      es: 'Día completo (10 hs)',
      en: 'Full day (10 hrs)',
      hours: 10,
    },
    difficulty: {
      es: 'Moderada',
      en: 'Moderate',
    },
    groupSize: {
      min: 2,
      max: 6,
    },
    shortDescription: {
      es: 'Un viaje asombroso por caminos de cornisa hasta Iruya, con calles empedradas y arquitectura colonial andina.',
      en: 'An astonishing trip across winding high passes to Iruya, with cobblestone alleys and colonial architecture.',
    },
    description: {
      es: 'Viaja a uno de los pueblos más singulares de Argentina, encaramado sobre un acantilado a 2.780 msnm. Cruzaremos el Abra del Cóndor a 4.000 metros, descendiendo luego por quebradas profundas hacia este enclave colonial donde el tiempo parece haberse detenido.',
      en: 'Journey to one of Argentina’s most picturesque villages, perched precariously on a cliffside at 2,780 m a.s.l. Cross the Abra del Cóndor pass at 4,000 meters before descending through deep gorges to this colonial hamlet frozen in time.',
    },
    highlights: {
      es: [
        'Cruce del Abra del Cóndor a 4.000 msnm',
        'Paseo peatonal guiado por las callejuelas empinadas de Iruya',
        'Visita a la icónica iglesia de cúpula amarilla',
        'Almuerzo tradicional en restaurante de anfitriones locales',
      ],
      en: [
        'Crossing the Abra del Cóndor mountain pass at 4,000 m',
        'Guided walking tour along Iruya’s steep cobblestone streets',
        'Visit to the iconic yellow-domed church',
        'Traditional lunch at a locally-run family restaurant',
      ],
    },
    included: {
      es: ['Vehículo 4x4 climatizado con conductor profesional', 'Guía local en el pueblo', 'Almuerzo regional completo', 'Seguro de excursión'],
      en: ['4x4 A/C vehicle with expert driver', 'Local village guide', 'Full regional lunch', 'Tour insurance'],
    },
    notIncluded: {
      es: ['Bebidas alcohólicas adicionales'],
      en: ['Additional alcoholic beverages'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Pueblo de Iruya entre montañas',
        en: 'Iruya village nestled among steep mountains',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Marzo a Diciembre (sujeto a lluvias)',
        en: 'March to December (weather permitting)',
      },
      availableDays: [2, 4, 6],
      timeSlots: [
        { value: '07:30', label: { es: '07:30 hs — Salida Temprana', en: '07:30 AM — Early Departure' } },
      ],
    },
    featured: false,
    rating: 4.9,
    reviewsCount: 36,
  },
  {
    id: '12',
    slug: 'ruta-del-vino-de-altura',
    title: {
      es: 'Ruta del Vino de Altura',
      en: 'Ruta del Vino de Altura',
    },
    tagline: {
      es: 'Viñedos extremos a más de 2.600 metros y maridaje regional',
      en: 'Extreme high-altitude vineyards above 2,600 m and wine tasting',
    },
    category: {
      id: 'excursion',
      es: 'Excursión',
      en: 'Excursion',
    },
    location: {
      city: 'Maimará',
      region: {
        es: 'Quebrada de Humahuaca, Jujuy',
        en: 'Humahuaca Gorge, Jujuy',
      },
      country: 'Argentina',
    },
    price: 80,
    currency: 'USD',
    pricing: {
      amount: 80,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Incluye cata guiada de 4 vinos y tabla de quesos.',
        en: 'Illustrative rate. Includes 4-wine guided tasting and cheese platter.',
      },
    },
    duration: {
      es: 'Medio día (6 hs)',
      en: 'Half day (6 hrs)',
      hours: 6,
    },
    difficulty: {
      es: 'Baja',
      en: 'Low',
    },
    groupSize: {
      min: 2,
      max: 10,
    },
    shortDescription: {
      es: 'Degusta cepas únicas criadas bajo la radiación solar andina en bodegas boutique de la Quebrada.',
      en: 'Taste exceptional varietals grown under intense Andean sun in boutique valley wineries.',
    },
    description: {
      es: 'Descubre el renacer vitivinícola de la Quebrada de Humahuaca, una de las zonas de viñedos a mayor altitud del planeta. Visitaremos dos bodegas artesanales pioneras en Malbec, Syrah y Criolla, con degustación guiada por sus propios enólogos.',
      en: 'Discover the viticultural revival of the Humahuaca Gorge, featuring some of the highest vineyards in the world. Tour two pioneering artisanal wineries producing Malbec, Syrah, and native Criolla, guided directly by the winemakers.',
    },
    highlights: {
      es: [
        'Visita a dos bodegas boutique de extrema altura',
        'Cata guiada de 4 etiquetas premiadas con sommelier',
        'Paseo entre viñedos con vistas a la Paleta del Pintor',
        'Maridaje con quesos de cabra andinos y panes caseros',
      ],
      en: [
        'Tour of two extreme-altitude boutique wineries',
        'Sommelier-guided tasting of 4 award-winning labels',
        'Walk through vineyards facing the Painter’s Palette hills',
        'Pairing with artisanal Andean goat cheeses and breads',
      ],
    },
    included: {
      es: ['Transporte ida y vuelta desde Tilcara o Purmamarca', 'Cata completa y maridaje', 'Guía sommelier bilingüe', 'Entrada a viñedos'],
      en: ['Round-trip transport from Tilcara or Purmamarca', 'Full tasting and pairings', 'Bilingual sommelier guide', 'Vineyard admission'],
    },
    notIncluded: {
      es: ['Botellas de vino adicionales'],
      en: ['Additional wine bottles'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Viñedos de altura en la Quebrada de Humahuaca',
        en: 'High-altitude vineyards in Humahuaca Gorge',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Todo el año',
        en: 'Year-round',
      },
      availableDays: [2, 3, 4, 5, 6, 0],
      timeSlots: [
        { value: '10:30', label: { es: '10:30 hs — Turno Mañana', en: '10:30 AM — Morning' } },
        { value: '16:00', label: { es: '16:00 hs — Turno Tarde', en: '04:00 PM — Afternoon' } },
      ],
    },
    featured: false,
    rating: 4.8,
    reviewsCount: 29,
  },
  // --- NATURE EXPERIENCES (IDs 13 - 16) ---
  {
    id: '13',
    slug: 'calilegua-cloud-forest-safari',
    title: {
      es: 'Calilegua Cloud Forest Safari',
      en: 'Calilegua Cloud Forest Safari',
    },
    tagline: {
      es: 'Biodiversidad selvática en el parque nacional más grande del NOA',
      en: 'Rainforest biodiversity in the largest national park in the region',
    },
    category: {
      id: 'nature',
      es: 'Naturaleza',
      en: 'Nature',
    },
    location: {
      city: 'Calilegua',
      region: {
        es: 'Yungas Jujeñas, Ledesma',
        en: 'Jujuy Yungas, Ledesma',
      },
      country: 'Argentina',
    },
    price: 70,
    currency: 'USD',
    pricing: {
      amount: 70,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Entrada al parque nacional gratuita.',
        en: 'Illustrative rate. National park admission is free.',
      },
    },
    duration: {
      es: '7 horas',
      en: '7 hours',
      hours: 7,
    },
    difficulty: {
      es: 'Moderada',
      en: 'Moderate',
    },
    groupSize: {
      min: 2,
      max: 8,
    },
    shortDescription: {
      es: 'Senderos de interpretación botánica entre laureles gigantes, tucanes y fauna subtropical.',
      en: 'Botanical nature trails among ancient laurel trees, toucans, and subtropical wildlife.',
    },
    description: {
      es: 'Una inmersión en la ecorregión de las Yungas o selva de montaña. El Parque Nacional Calilegua resguarda más del 50% de las especies de aves de Argentina. Recorreremos senderos escalonados desde la selva pedemontana hasta el bosque montano.',
      en: 'An immersion into the lush Yungas cloud forest. Calilegua National Park protects over 50% of Argentina’s bird species. Trek along tiered interpretive paths rising from lower subtropical jungle to misty mountain forests.',
    },
    highlights: {
      es: [
        'Avistamiento de tucanes, pavas de monte y loros autóctonos',
        'Mirador del río San Lorenzo con vistas panorámicas de la selva',
        'Senderismo botánico guiado por guardaparques y naturalistas',
        'Almuerzo campestre en el camping Aguas Negras',
      ],
      en: [
        'Spotting toucans, Andean guans, and native parrots',
        'San Lorenzo river lookout with panoramic canopy views',
        'Botanical hiking led by certified naturalist guides',
        'Picnic lunch at Aguas Negras park grounds',
      ],
    },
    included: {
      es: ['Transporte ida y vuelta desde San Salvador de Jujuy', 'Guía naturalista bilingüe', 'Almuerzo campestre y bebidas', 'Seguro de parque'],
      en: ['Round-trip transport from San Salvador de Jujuy', 'Bilingual naturalist guide', 'Picnic lunch and beverages', 'Park insurance'],
    },
    notIncluded: {
      es: ['Repelente de insectos personal', 'Propinas'],
      en: ['Personal insect repellent', 'Gratuities'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Selva de Yungas en el Parque Nacional Calilegua',
        en: 'Yungas cloud forest in Calilegua National Park',
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
        { value: '08:00', label: { es: '08:00 hs — Turno Mañana', en: '08:00 AM — Morning' } },
      ],
    },
    featured: true,
    rating: 4.8,
    reviewsCount: 34,
  },
  {
    id: '14',
    slug: 'termas-del-jordan-trek',
    title: {
      es: 'Termas del Jordán Trek',
      en: 'Termas del Jordán Trek',
    },
    tagline: {
      es: 'Pozones naturales de aguas termales turquesas en la selva',
      en: 'Turquoise thermal spring pools hidden inside the cloud forest',
    },
    category: {
      id: 'nature',
      es: 'Naturaleza',
      en: 'Nature',
    },
    location: {
      city: 'Valle Grande',
      region: {
        es: 'Valle Grande, Yungas',
        en: 'Valle Grande, Yungas',
      },
      country: 'Argentina',
    },
    price: 90,
    currency: 'USD',
    pricing: {
      amount: 90,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Incluye guía baqueano local comunitario.',
        en: 'Illustrative rate. Includes local indigenous guide.',
      },
    },
    duration: {
      es: 'Día completo (9 hs)',
      en: 'Full day (9 hrs)',
      hours: 9,
    },
    difficulty: {
      es: 'Moderada / Exigente',
      en: 'Moderate / Strenuous',
    },
    groupSize: {
      min: 2,
      max: 8,
    },
    shortDescription: {
      es: 'Caminata con guías locales hacia piletas termales naturales de 30°C con aguas mineralizadas color turquesa.',
      en: 'Trek with local guides to 30°C natural thermal pools with mineral-rich turquoise waters.',
    },
    description: {
      es: 'Una de las maravillas naturales más codiciadas del norte argentino. Una caminata de descenso y ascenso por senderos selváticos nos conducirá al cauce del río Jordán, donde afloran vertientes hidrotermales de agua turquesa lechosa a 30°C rodeadas de vegetación exuberante.',
      en: 'One of the most prized natural gems in northern Argentina. A rewarding hike down jungle ravines leads to the Jordan River basin, where 30°C milky-turquoise thermal hot springs emerge surrounded by lush rainforest.',
    },
    highlights: {
      es: [
        'Baño termal relajante en piletas naturales de agua turquesa',
        'Caminata por la selva subtropical con guía baqueano',
        'Paisajes inexplorados de Valle Grande y San Francisco',
        'Almuerzo casero regional tras el regreso de la caminata',
      ],
      en: [
        'Thermal bath in natural turquoise mineral spring pools',
        'Subtropical rainforest trek with native community guide',
        'Unspoiled landscapes of Valle Grande and San Francisco',
        'Homemade regional lunch after the hike',
      ],
    },
    included: {
      es: ['Transporte 4x4', 'Guía baqueano de la comunidad', 'Almuerzo regional', 'Seguro de actividad'],
      en: ['4x4 transport', 'Local community guide', 'Regional lunch', 'Activity insurance'],
    },
    notIncluded: {
      es: ['Traje de baño y toalla personal'],
      en: ['Personal swimsuit and towel'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1432405972618-c60b0225b8f9?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Pozones termales de Termas del Jordán',
        en: 'Thermal spring pools of Termas del Jordán',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Mayo a Noviembre (temporada seca)',
        en: 'May to November (dry season)',
      },
      availableDays: [2, 4, 6, 0],
      timeSlots: [
        { value: '07:00', label: { es: '07:00 hs — Salida Temprana', en: '07:00 AM — Early Departure' } },
      ],
    },
    featured: false,
    rating: 4.9,
    reviewsCount: 41,
  },
  {
    id: '15',
    slug: 'lagunas-de-yala-trail',
    title: {
      es: 'Lagunas de Yala Trail',
      en: 'Lagunas de Yala Trail',
    },
    tagline: {
      es: 'Espejos de agua rodeados de bosques andinos y niebla',
      en: 'Misty lakes surrounded by tranquil Andean alder forests',
    },
    category: {
      id: 'nature',
      es: 'Naturaleza',
      en: 'Nature',
    },
    location: {
      city: 'Yala',
      region: {
        es: 'Parque Provincial Potrero de Yala',
        en: 'Potrero de Yala Provincial Park',
      },
      country: 'Argentina',
    },
    price: 50,
    currency: 'USD',
    pricing: {
      amount: 50,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Apta para toda la familia.',
        en: 'Illustrative rate. Family friendly.',
      },
    },
    duration: {
      es: 'Medio día (4 hs)',
      en: 'Half day (4 hrs)',
      hours: 4,
    },
    difficulty: {
      es: 'Baja',
      en: 'Low',
    },
    groupSize: {
      min: 1,
      max: 12,
    },
    shortDescription: {
      es: 'Circuito de caminata relajante alrededor de las lagunas de altura, hogar de aves acuáticas autóctonas.',
      en: 'Gentle hiking trail around high mountain lagoons, home to native Andean waterfowl.',
    },
    description: {
      es: 'A solo 30 minutos de San Salvador de Jujuy, el Parque Provincial Potrero de Yala protege un conjunto de seis lagunas rodeadas de bosques de alisos y queñoas. Realizaremos un sendero de baja exigencia disfrutando de la paz y el silencio natural.',
      en: 'Just 30 minutes from San Salvador de Jujuy, Potrero de Yala Provincial Park preserves six mountain lakes fringed by alder forests. Walk along gentle interpretive trails savoring natural tranquility.',
    },
    highlights: {
      es: [
        'Caminata por la Laguna Rodeo y Laguna Comedero',
        'Avistamiento de patos andinos y gallaretas',
        'Degustación de té de hierbas serranas y pastelitos caseros',
        'Aire puro y senderos sombreados accesibles',
      ],
      en: [
        'Walk around Rodeo and Comedero lagoons',
        'Spotting Andean ducks and coots',
        'Mountain herbal tea tasting with homemade pastries',
        'Fresh air and shaded, accessible family trails',
      ],
    },
    included: {
      es: ['Transporte ida y vuelta', 'Guía local', 'Merienda campestre', 'Seguro de paseo'],
      en: ['Round-trip transport', 'Local guide', 'Country snack', 'Tour insurance'],
    },
    notIncluded: {
      es: ['Gastos personales'],
      en: ['Personal expenses'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Laguna Rodeo en Potrero de Yala',
        en: 'Rodeo Lagoon in Potrero de Yala',
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
        { value: '09:00', label: { es: '09:00 hs — Turno Mañana', en: '09:00 AM — Morning' } },
        { value: '14:30', label: { es: '14:30 hs — Turno Tarde', en: '02:30 PM — Afternoon' } },
      ],
    },
    featured: false,
    rating: 4.7,
    reviewsCount: 28,
  },
  {
    id: '16',
    slug: 'bosque-de-quenoas-altitude',
    title: {
      es: 'Bosque de Queñoas de Altura',
      en: 'Bosque de Queñoas de Altura',
    },
    tagline: {
      es: 'Caminata entre los árboles más altos del mundo',
      en: 'Trek among the world’s highest-altitude prehistoric trees',
    },
    category: {
      id: 'nature',
      es: 'Naturaleza',
      en: 'Nature',
    },
    location: {
      city: 'Tumbaya',
      region: {
        es: 'Quebrada de Tumbaya, Jujuy',
        en: 'Tumbaya Gorge, Jujuy',
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
        es: 'Tarifa ilustrativa. Compromiso con conservación ambiental.',
        en: 'Illustrative rate. Commitment to environmental preservation.',
      },
    },
    duration: {
      es: '5 horas',
      en: '5 hours',
      hours: 5,
    },
    difficulty: {
      es: 'Moderada',
      en: 'Moderate',
    },
    groupSize: {
      min: 2,
      max: 8,
    },
    shortDescription: {
      es: 'Un recorrido exclusivo por relictos de bosques de queñoa milenarios adaptados al frío extremo andino.',
      en: 'An exclusive trail through ancient Polylepis forests adapted to extreme Andean mountain climates.',
    },
    description: {
      es: 'La queñoa (Polylepis) es uno de los géneros de árboles leñosos que crece a mayor altitud en el mundo. En esta salida guiada ascenderemos hacia quebradas resguardadas para conocer estos bosques encantados con su corteza exfoliante y musgos milenarios.',
      en: 'Polylepis is one of the highest-altitude woody tree genera in the world. On this guided outing, hike toward sheltered ravines to encounter these fairytale forests with peeling amber bark and ancient mosses.',
    },
    highlights: {
      es: [
        'Caminata interpretativa por bosque relicto de queñoas',
        'Identificación de flora andina medicinal',
        'Vistas del valle de Tumbaya y los cerros vecinos',
        'Guía biólogo local certificado',
      ],
      en: [
        'Interpretive hike through ancient Polylepis tree stands',
        'Identification of medicinal Andean flora',
        'Overlooks of the Tumbaya valley and neighboring peaks',
        'Certified local biologist guide',
      ],
    },
    included: {
      es: ['Guía biólogo profesional', 'Bastones de trekking', 'Snack regional energético', 'Seguro de actividad'],
      en: ['Professional biologist guide', 'Trekking poles', 'Regional energy snack', 'Tour insurance'],
    },
    notIncluded: {
      es: ['Transporte hasta Tumbaya (opcional)'],
      en: ['Transport to Tumbaya (optional)'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1511497584788-87676104235f?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Bosque de queñoas en las alturas andinas',
        en: 'Polylepis forest in high Andean terrain',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Todo el año',
        en: 'Year-round',
      },
      availableDays: [2, 4, 6],
      timeSlots: [
        { value: '09:00', label: { es: '09:00 hs — Turno Mañana', en: '09:00 AM — Morning' } },
      ],
    },
    featured: false,
    rating: 4.8,
    reviewsCount: 16,
  },
  // --- SCENIC VIEWS EXPERIENCES (IDs 17 - 20) ---
  {
    id: '17',
    slug: 'paseo-de-los-colorados',
    title: {
      es: 'Paseo de los Colorados',
      en: 'Paseo de los Colorados',
    },
    tagline: {
      es: 'Circuito geológico entre paredones y crestas de arcilla roja',
      en: 'Geological canyon loop between towering red clay monoliths',
    },
    category: {
      id: 'scenic-views',
      es: 'Paisajes',
      en: 'Scenic Views',
    },
    location: {
      city: 'Purmamarca',
      region: {
        es: 'Purmamarca, Jujuy',
        en: 'Purmamarca, Jujuy',
      },
      country: 'Argentina',
    },
    price: 45,
    currency: 'USD',
    pricing: {
      amount: 45,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Recorrido accesible a pie.',
        en: 'Illustrative rate. Accessible walking route.',
      },
    },
    duration: {
      es: '3 horas',
      en: '3 hours',
      hours: 3,
    },
    difficulty: {
      es: 'Baja',
      en: 'Low',
    },
    groupSize: {
      min: 1,
      max: 12,
    },
    shortDescription: {
      es: 'Recorrido escénico a pie tras el Cerro de los Siete Colores con tonalidades rojizas únicas.',
      en: 'Scenic walking loop behind the Seven Colors Hill surrounded by surreal reddish formations.',
    },
    description: {
      es: 'Un circuito de senderismo suave que se interna por las espaldas de Purmamarca. Los imponentes paredones de arcilla roja modelados por la erosión eólica crean un paisaje casi marciano, contrastando con el cielo azul andino.',
      en: 'A gentle scenic loop winding behind the village of Purmamarca. Towering red clay monoliths sculpted by wind erosion create a Martian-like landscape in vivid contrast with deep blue Andean skies.',
    },
    highlights: {
      es: [
        'Caminata escénica entre cerros de arcilla rojiza intensa',
        'Puntos panorámicos para fotografía de paisajes',
        'Explicación geológica de los sedimentos terciarios',
        'Visita a la feria artesanal de Purmamarca al finalizar',
      ],
      en: [
        'Scenic walk among deep red sandstone bluffs',
        'Prime photo lookouts for landscape photography',
        'Geological explanation of Tertiary sediment layers',
        'Visit to Purmamarca artisan craft market afterwards',
      ],
    },
    included: {
      es: ['Guía local bilingüe', 'Agua mineral y snack regional', 'Seguro de paseo'],
      en: ['Bilingual local guide', 'Mineral water and regional snack', 'Walking insurance'],
    },
    notIncluded: {
      es: ['Compras en feria artesanal'],
      en: ['Shopping expenses'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Paisaje del Paseo de los Colorados en Purmamarca',
        en: 'Paseo de los Colorados scenery in Purmamarca',
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
        { value: '09:00', label: { es: '09:00 hs — Turno Mañana', en: '09:00 AM — Morning' } },
        { value: '16:30', label: { es: '16:30 hs — Turno Tarde', en: '04:30 PM — Afternoon' } },
      ],
    },
    featured: false,
    rating: 4.9,
    reviewsCount: 52,
  },
  {
    id: '18',
    slug: 'paleta-del-pintor-viewpoint',
    title: {
      es: 'Paleta del Pintor Viewpoint',
      en: 'Paleta del Pintor Viewpoint',
    },
    tagline: {
      es: 'Los pliegues geológicos multicolores más hermosos del valle',
      en: 'The valley’s most stunning geological multicolored folds',
    },
    category: {
      id: 'scenic-views',
      es: 'Paisajes',
      en: 'Scenic Views',
    },
    location: {
      city: 'Maimará',
      region: {
        es: 'Maimará, Jujuy',
        en: 'Maimará, Jujuy',
      },
      country: 'Argentina',
    },
    price: 55,
    currency: 'USD',
    pricing: {
      amount: 55,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Horario sincronizado con luz de atardecer.',
        en: 'Illustrative rate. Scheduled for sunset golden hour.',
      },
    },
    duration: {
      es: '4 horas',
      en: '4 hours',
      hours: 4,
    },
    difficulty: {
      es: 'Baja',
      en: 'Low',
    },
    groupSize: {
      min: 1,
      max: 10,
    },
    shortDescription: {
      es: 'Visita guiada al mirador del Monolito para contemplar las bandas policromáticas de Maimará.',
      en: 'Guided visit to the Monolith lookout to admire Maimará’s famous painted mountain folds.',
    },
    description: {
      es: 'La ladera oriental de la Quebrada a la altura de Maimará presenta estratos geológicos plegados que recuerdan la paleta de un pintor impresionista. Contemplaremos este espectáculo natural al atardecer, cuando la luz oblicua resalta cada tono mineral.',
      en: 'The eastern slope of the gorge at Maimará displays folded sedimentary strata resembling an impressionist painter’s palette. Admire this natural spectacle during sunset, when low-angled light accentuates each mineral band.',
    },
    highlights: {
      es: [
        'Mirador estratégico frente a la Paleta del Pintor',
        'Visita al pintoresco cementerio de altura de Maimará',
        'Brindis al atardecer con vino torrontés regional',
        'Guía fotógrafo con consejos para tomas panorámicas',
      ],
      en: [
        'Strategic viewpoint facing the Painter’s Palette',
        'Visit to the picturesque high-altitude cemetery of Maimará',
        'Sunset toast with regional Torrontés wine',
        'Photographer guide offering panorama shooting tips',
      ],
    },
    included: {
      es: ['Transporte', 'Guía profesional', 'Brindis con vino y picada regional', 'Seguro de excursión'],
      en: ['Transportation', 'Professional guide', 'Wine toast and regional snacks', 'Tour insurance'],
    },
    notIncluded: {
      es: ['Gastos personales'],
      en: ['Personal expenses'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1495616811223-4d98c6e9c869?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'La Paleta del Pintor en Maimará al atardecer',
        en: 'The Painter’s Palette in Maimará at sunset',
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
        { value: '16:00', label: { es: '16:00 hs — Turno Atardecer', en: '04:00 PM — Sunset' } },
      ],
    },
    featured: false,
    rating: 4.8,
    reviewsCount: 39,
  },
  {
    id: '19',
    slug: 'lipan-stargazing-night',
    title: {
      es: 'Lipán Stargazing Night',
      en: 'Lipán Stargazing Night',
    },
    tagline: {
      es: 'Astroturismo en uno de los cielos más limpios y diáfanos del planeta',
      en: 'Astrotourism under some of the clearest night skies on Earth',
    },
    category: {
      id: 'scenic-views',
      es: 'Paisajes',
      en: 'Scenic Views',
    },
    location: {
      city: 'Cuesta de Lipán',
      region: {
        es: 'Abra de Potrerillos, 4.170 msnm',
        en: 'Abra de Potrerillos, 4,170 m a.s.l.',
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
        es: 'Tarifa ilustrativa. Sujeto a condiciones meteorológicas.',
        en: 'Illustrative rate. Weather conditions apply.',
      },
    },
    duration: {
      es: '5 horas',
      en: '5 hours',
      hours: 5,
    },
    difficulty: {
      es: 'Baja',
      en: 'Low',
    },
    groupSize: {
      min: 2,
      max: 10,
    },
    shortDescription: {
      es: 'Observación con telescopio profesional y relatos de cosmovisión andina a más de 4.000 metros.',
      en: 'Stargazing with professional telescopes and Andean cosmological lore above 4,000 meters.',
    },
    description: {
      es: 'A más de 4.000 metros de altura, la atmósfera de la Puna ofrece una transparencia estelar inigualable. Con telescopios computarizados exploraremos nebulosas, cúmulos y planetas mientras un guía relata las constelaciones oscuras de la cosmovisión andina.',
      en: 'At more than 4,000 meters altitude, the Puna atmosphere offers unmatched stellar clarity. Explore nebulas, star clusters, and planets through high-powered telescopes while learning about the dark Andean constellations.',
    },
    highlights: {
      es: [
        'Observación astronómica con telescopio motorizado',
        'Interpretación de constelaciones andinas (la Llama, el Yacana)',
        'Bebidas calientes y snacks regionales durante la sesión',
        'Fotografía nocturna individual con fondo de la Vía Láctea',
      ],
      en: [
        'Astronomical observation with computerized telescope',
        'Interpretation of Andean dark constellations',
        'Warm beverages and regional snacks provided',
        'Personal night portrait with the Milky Way backdrop',
      ],
    },
    included: {
      es: ['Transporte 4x4', 'Telescopio y puntero láser', 'Bebidas calientes y manta térmica', 'Foto digital nocturna'],
      en: ['4x4 transport', 'Telescope and astronomy lasers', 'Hot drinks and thermal blankets', 'Digital night photo'],
    },
    notIncluded: {
      es: ['Ropa térmica de abrigo personal (muy recomendada)'],
      en: ['Personal thermal clothing (warm jacket recommended)'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1506703719100-a0f3a48c0f86?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Cielo estrellado de la Vía Láctea en Cuesta de Lipán',
        en: 'Milky Way starry night sky at Cuesta de Lipán',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Todo el año (especial en luna nueva)',
        en: 'Year-round (best around new moon)',
      },
      availableDays: [3, 4, 5, 6, 0],
      timeSlots: [
        { value: '20:30', label: { es: '20:30 hs — Turno Nocturno', en: '08:30 PM — Night' } },
      ],
    },
    featured: true,
    rating: 5.0,
    reviewsCount: 47,
  },
  {
    id: '20',
    slug: 'puente-del-diablo-canon',
    title: {
      es: 'Puente del Diablo & Yavi',
      en: 'Puente del Diablo & Yavi',
    },
    tagline: {
      es: 'Cañones milenarios y arquitectura barroca andina en la frontera',
      en: 'Ancient canyons and Andean baroque heritage along the border',
    },
    category: {
      id: 'scenic-views',
      es: 'Paisajes',
      en: 'Scenic Views',
    },
    location: {
      city: 'Yavi',
      region: {
        es: 'La Quiaca & Yavi, Puna Norte',
        en: 'La Quiaca & Yavi, North Puna',
      },
      country: 'Argentina',
    },
    price: 75,
    currency: 'USD',
    pricing: {
      amount: 75,
      currency: 'USD',
      perPerson: true,
      isIllustrative: true,
      notice: {
        es: 'Tarifa ilustrativa. Incluye acceso a capilla histórica.',
        en: 'Illustrative rate. Includes historical chapel entrance.',
      },
    },
    duration: {
      es: '6 horas',
      en: '6 hours',
      hours: 6,
    },
    difficulty: {
      es: 'Baja',
      en: 'Low',
    },
    groupSize: {
      min: 2,
      max: 10,
    },
    shortDescription: {
      es: 'Explora las extrañas formaciones de arenisca rojiza del Puente del Diablo y la histórica capilla de Yavi.',
      en: 'Explore the striking red sandstone formations of Devil’s Bridge and Yavi’s historic chapel.',
    },
    description: {
      es: 'En el extremo norte argentino, cerca de la frontera boliviana, se encuentra Yavi con su templo de retablos laminados en oro del siglo XVII, y el Puente del Diablo, un cañón de arenisca esculpido por el viento y el agua con tonalidades rojizas imponentes.',
      en: 'In Argentina’s northernmost tip near the Bolivian border lies Yavi, home to a 17th-century church with gold-leaf altarpieces, and the Devil’s Bridge, an awe-inspiring sandstone canyon carved by wind and water.',
    },
    highlights: {
      es: [
        'Caminata por el lecho del Cañón del Puente del Diablo',
        'Visita guiada a la Capilla de San Francisco en Yavi',
        'Almuerzo tradicional de cocina puneña',
        'Paso panorámico por la ciudad fronteriza de La Quiaca',
      ],
      en: [
        'Hike along the Devil’s Bridge canyon bed',
        'Guided visit to San Francisco church in Yavi',
        'Traditional lunch featuring northern Puna cuisine',
        'Scenic drive through border town La Quiaca',
      ],
    },
    included: {
      es: ['Transporte', 'Guía local', 'Almuerzo regional', 'Entrada a monumentos históricos'],
      en: ['Transportation', 'Local guide', 'Regional lunch', 'Admission to historic sites'],
    },
    notIncluded: {
      es: ['Gastos personales'],
      en: ['Personal expenses'],
    },
    images: {
      main: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=80',
      gallery: [
        'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
      ],
      alt: {
        es: 'Formaciones de arenisca en el Puente del Diablo en Yavi',
        en: 'Sandstone canyon of Devil’s Bridge in Yavi',
      },
    },
    availability: {
      isIllustrative: true,
      season: {
        es: 'Todo el año',
        en: 'Year-round',
      },
      availableDays: [1, 3, 5, 0],
      timeSlots: [
        { value: '09:00', label: { es: '09:00 hs — Turno Mañana', en: '09:00 AM — Morning' } },
      ],
    },
    featured: false,
    rating: 4.8,
    reviewsCount: 25,
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
