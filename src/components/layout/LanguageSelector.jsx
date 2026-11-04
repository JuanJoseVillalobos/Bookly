import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { Check } from 'lucide-react';

/**
 * Flag icons for Spain (ES) and United Kingdom (EN).
 * Crisp vector SVG representations.
 */
function SpainFlag({ className = 'w-4 h-3' }) {
  return (
    <svg viewBox="0 0 750 500" className={`rounded-[2px] shadow-2xs overflow-hidden shrink-0 ${className}`} aria-hidden="true">
      <rect width="750" height="500" fill="#c60b1e" />
      <rect width="750" height="250" y="125" fill="#ffc400" />
    </svg>
  );
}

function UKFlag({ className = 'w-4 h-3' }) {
  return (
    <svg viewBox="0 0 60 30" className={`rounded-[2px] shadow-2xs overflow-hidden shrink-0 ${className}`} aria-hidden="true">
      <clipPath id="s">
        <path d="M0,0 v30 h60 v-30 z" />
      </clipPath>
      <clipPath id="t">
        <path d="M30,15 h30 v15 z v15 h-30 z h-30 v-15 z v-15 h30 z" />
      </clipPath>
      <g clipPath="url(#s)">
        <path d="M0,0 v30 h60 v-30 z" fill="#012169" />
        <path d="M0,0 L60,30 M60,0 L0,30" stroke="#fff" strokeWidth="6" />
        <path d="M0,0 L60,30 M60,0 L0,30" clipPath="url(#t)" stroke="#C8102E" strokeWidth="4" />
        <path d="M30,0 v30 M0,15 h60" stroke="#fff" strokeWidth="10" />
        <path d="M30,0 v30 M0,15 h60" stroke="#C8102E" strokeWidth="6" />
      </g>
    </svg>
  );
}

const FLAG_COMPONENTS = {
  es: SpainFlag,
  en: UKFlag,
};

/**
 * LanguageSelector component.
 * Allows switching between Spanish ('es') and English ('en') dynamically with Spain & UK flag icons.
 * Powered by react-i18next with automatic persistence.
 */
export default function LanguageSelector({ variant = 'desktop', className = '' }) {
  const { i18n, t } = useTranslation('common');
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null);

  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const CurrentFlag = FLAG_COMPONENTS[currentLang] || SpainFlag;

  const languages = [
    { code: 'es', label: 'Español', short: 'ES', Flag: SpainFlag },
    { code: 'en', label: 'English', short: 'EN', Flag: UKFlag },
  ];

  const handleSelectLanguage = (code) => {
    i18n.changeLanguage(code);
    setIsOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    if (isOpen) {
      document.addEventListener('click', handleOutsideClick);
    }
    return () => document.removeEventListener('click', handleOutsideClick);
  }, [isOpen]);

  if (variant === 'segmented') {
    return (
      <div className={`inline-flex items-center p-1 rounded-lg bg-stone-light/80 border border-stone text-xs font-semibold ${className}`}>
        {languages.map((lang) => {
          const isActive = currentLang === lang.code;
          const FlagIcon = lang.Flag;
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              className={[
                'px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer min-h-[36px] flex items-center justify-center gap-1.5',
                isActive
                  ? 'bg-forest text-ivory shadow-xs font-bold'
                  : 'text-charcoal-muted hover:text-forest',
              ].join(' ')}
              aria-label={`Switch language to ${lang.label}`}
              aria-pressed={isActive}
            >
              <FlagIcon className="w-4 h-2.5" />
              <span>{lang.short}</span>
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        className={[
          'inline-flex items-center gap-2 px-3 py-2 rounded-lg text-xs font-semibold uppercase tracking-wider',
          'border border-stone bg-white/70 hover:bg-stone-light/70 text-charcoal-muted hover:text-forest transition-colors',
          'focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer min-h-[44px]',
        ].join(' ')}
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-label={t('navigation.language')}
      >
        <CurrentFlag className="w-4 h-3" />
        <span>{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-40 bg-white border border-stone rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {languages.map((lang) => {
            const isSelected = currentLang === lang.code;
            const FlagIcon = lang.Flag;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectLanguage(lang.code)}
                className={[
                  'w-full px-4 py-2.5 text-xs text-left flex items-center justify-between transition-colors cursor-pointer gap-2',
                  isSelected
                    ? 'font-bold text-forest bg-forest-subtle/50'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-stone-light/50',
                ].join(' ')}
              >
                <span className="flex items-center gap-2">
                  <FlagIcon className="w-4 h-3" />
                  <span>{lang.label}</span>
                </span>
                {isSelected && <Check className="w-3.5 h-3.5 text-forest" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
