import React, { useState, useEffect } from 'react';
import { Globe, Check } from 'lucide-react';

/**
 * LanguageSelector component.
 * Allows switching between Spanish ('es') and English ('en').
 * Persists the choice in localStorage and prepares for i18next integration (BKL-05).
 */
export default function LanguageSelector({ variant = 'desktop', className = '' }) {
  const [currentLang, setCurrentLang] = useState(() => {
    return localStorage.getItem('bookly_lang') || 'es';
  });
  const [isOpen, setIsOpen] = useState(false);

  const languages = [
    { code: 'es', label: 'Español', short: 'ES' },
    { code: 'en', label: 'English', short: 'EN' },
  ];

  const handleSelectLanguage = (code) => {
    setCurrentLang(code);
    localStorage.setItem('bookly_lang', code);
    setIsOpen(false);

    // Dispatch a custom event or prepare for i18next
    window.dispatchEvent(new CustomEvent('bookly:languageChange', { detail: code }));
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleOutsideClick = (e) => {
      if (!e.target.closest('.language-selector-container')) {
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
          return (
            <button
              key={lang.code}
              type="button"
              onClick={() => handleSelectLanguage(lang.code)}
              className={[
                'px-2.5 py-1 rounded-md transition-all duration-150 cursor-pointer min-h-[36px] flex items-center justify-center',
                isActive
                  ? 'bg-forest text-ivory shadow-xs font-bold'
                  : 'text-charcoal-muted hover:text-forest',
              ].join(' ')}
              aria-label={`Cambiar idioma a ${lang.label}`}
              aria-pressed={isActive}
            >
              {lang.short}
            </button>
          );
        })}
      </div>
    );
  }

  return (
    <div className={`relative language-selector-container ${className}`}>
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
        aria-label="Seleccionar idioma"
      >
        <Globe className="w-4 h-4 text-forest" />
        <span>{currentLang.toUpperCase()}</span>
      </button>

      {isOpen && (
        <div
          role="listbox"
          className="absolute right-0 mt-2 w-36 bg-white border border-stone rounded-xl shadow-lg py-1 z-50 animate-in fade-in slide-in-from-top-1 duration-150"
        >
          {languages.map((lang) => {
            const isSelected = currentLang === lang.code;
            return (
              <button
                key={lang.code}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => handleSelectLanguage(lang.code)}
                className={[
                  'w-full px-4 py-2.5 text-xs text-left flex items-center justify-between transition-colors cursor-pointer',
                  isSelected
                    ? 'font-bold text-forest bg-forest-subtle/50'
                    : 'text-charcoal-muted hover:text-charcoal hover:bg-stone-light/50',
                ].join(' ')}
              >
                <span>{lang.label}</span>
                {isSelected && <Check className="w-3.5 h-3.5 text-forest" />}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

