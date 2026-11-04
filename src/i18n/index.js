import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import esCommon from './locales/es/common.json';
import esHome from './locales/es/home.json';
import esBooking from './locales/es/booking.json';

import enCommon from './locales/en/common.json';
import enHome from './locales/en/home.json';
import enBooking from './locales/en/booking.json';

const STORAGE_KEY = 'bookly_language';

const getInitialLanguage = () => {
  try {
    const saved = localStorage.getItem(STORAGE_KEY) || localStorage.getItem('bookly_lang');
    if (saved === 'en' || saved === 'es') return saved;
  } catch (e) {
    console.warn('Unable to access localStorage for language preference:', e);
  }
  return 'es';
};

const initialLang = getInitialLanguage();

// Set html lang attribute immediately
if (typeof document !== 'undefined') {
  document.documentElement.lang = initialLang;
}

i18n
  .use(initReactI18next)
  .init({
    resources: {
      es: {
        common: esCommon,
        home: esHome,
        booking: esBooking,
      },
      en: {
        common: enCommon,
        home: enHome,
        booking: enBooking,
      },
    },
    lng: initialLang,
    fallbackLng: 'es',
    defaultNS: 'common',
    fallbackNS: ['common', 'home', 'booking'],
    ns: ['common', 'home', 'booking'],
    keySeparator: '.',
    nsSeparator: ':',
    interpolation: {
      escapeValue: false, // React already escapes
    },
    react: {
      useSuspense: false,
    },
  });

// Persist language changes to localStorage and update document.documentElement.lang
i18n.on('languageChanged', (lng) => {
  try {
    localStorage.setItem(STORAGE_KEY, lng);
    localStorage.setItem('bookly_lang', lng);
  } catch (e) {
    console.warn('Unable to persist language preference in localStorage:', e);
  }
  if (typeof document !== 'undefined') {
    document.documentElement.lang = lng;
  }
});

export default i18n;
