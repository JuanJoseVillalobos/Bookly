import i18n from '../i18n';

/**
 * Utility functions for formatting currency and dates according to active locale.
 */

/**
 * Format an amount as currency using the active or provided locale
 * @param {number} amount
 * @param {string} currency
 * @param {string} [customLocale]
 * @returns {string}
 */
export function formatCurrency(amount, currency = 'USD', customLocale) {
  const currentLang = customLocale || i18n.resolvedLanguage || i18n.language || 'es';
  const locale = currentLang.startsWith('en') ? 'en-US' : 'es-AR';

  try {
    return new Intl.NumberFormat(locale, {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(amount);
  } catch {
    return `${currency} ${amount}`;
  }
}

/**
 * Format a date string or timestamp using the active locale
 * @param {Date|string|number} date
 * @param {Intl.DateTimeFormatOptions} [options]
 * @param {string} [customLocale]
 * @returns {string}
 */
export function formatDate(date, options, customLocale) {
  const currentLang = customLocale || i18n.resolvedLanguage || i18n.language || 'es';
  const locale = currentLang.startsWith('en') ? 'en-US' : 'es-AR';
  const d = new Date(date);

  const defaultOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    ...options,
  };

  try {
    return new Intl.DateTimeFormat(locale, defaultOptions).format(d);
  } catch {
    return d.toLocaleDateString();
  }
}
