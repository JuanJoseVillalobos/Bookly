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

/**
 * Format an ISO date (YYYY-MM-DD) into locale-specific numerical format:
 * - Spanish (Latin America): dd/mm/yyyy
 * - English (US): mm/dd/yyyy
 * @param {string} isoDate YYYY-MM-DD
 * @param {string} [customLocale]
 * @returns {string}
 */
export function formatDateByLocale(isoDate, customLocale) {
  if (!isoDate || typeof isoDate !== 'string') return '';
  const parts = isoDate.split('-');
  if (parts.length !== 3) return isoDate;
  const [y, m, d] = parts;
  const currentLang = customLocale || i18n.resolvedLanguage || i18n.language || 'es';
  const isEn = currentLang.startsWith('en');
  return isEn ? `${m}/${d}/${y}` : `${d}/${m}/${y}`;
}

/**
 * Mask and format raw input string into slash-separated date digits:
 * e.g. "15112026" -> "15/11/2026"
 * @param {string} rawValue
 * @returns {string}
 */
export function maskDateInput(rawValue) {
  if (!rawValue) return '';
  const digits = rawValue.replace(/\D/g, '').slice(0, 8);
  if (digits.length <= 2) return digits;
  if (digits.length <= 4) return `${digits.slice(0, 2)}/${digits.slice(2)}`;
  return `${digits.slice(0, 2)}/${digits.slice(2, 4)}/${digits.slice(4)}`;
}

/**
 * Parse a locale-formatted string (dd/mm/yyyy for ES, mm/dd/yyyy for EN)
 * into a standard ISO date (YYYY-MM-DD)
 * @param {string} inputStr
 * @param {string} [customLocale]
 * @returns {string|null} ISO string if valid calendar date, else null
 */
export function parseDateInput(inputStr, customLocale) {
  if (!inputStr) return null;
  const digits = inputStr.replace(/\D/g, '').slice(0, 8);
  if (digits.length !== 8) return null;

  const currentLang = customLocale || i18n.resolvedLanguage || i18n.language || 'es';
  const isEn = currentLang.startsWith('en');

  const val1 = Number(digits.slice(0, 2));
  const val2 = Number(digits.slice(2, 4));
  const year = Number(digits.slice(4, 8));

  const month = isEn ? val1 : val2;
  const day = isEn ? val2 : val1;

  if (month < 1 || month > 12 || day < 1 || day > 31 || year < 2024 || year > 2100) {
    return null;
  }

  const d = new Date(year, month - 1, day);
  if (d.getFullYear() === year && d.getMonth() === month - 1 && d.getDate() === day) {
    return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
  }

  return null;
}

/**
 * Return today's local date in YYYY-MM-DD format (avoids UTC timezone shift issues).
 * @returns {string}
 */
export function getLocalTodayIso() {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/**
 * Format year, month (1-12) and day (1-31) into standard ISO string YYYY-MM-DD.
 * @param {number} year
 * @param {number} month 1-12
 * @param {number} day 1-31
 * @returns {string}
 */
export function toIsoDate(year, month, day) {
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}

/**
 * Safely parse an ISO date string (YYYY-MM-DD) into year, month (1-12), day (1-31)
 * without triggering timezone shifts.
 * @param {string} isoDate
 * @returns {{ year: number, month: number, day: number } | null}
 */
export function parseIsoDate(isoDate) {
  if (!isoDate || typeof isoDate !== 'string') return null;
  const parts = isoDate.split('-');
  if (parts.length !== 3) return null;
  const year = Number(parts[0]);
  const month = Number(parts[1]);
  const day = Number(parts[2]);
  if (!year || !month || !day) return null;
  return { year, month, day };
}

/**
 * Get day of the week (0 = Sunday, 1 = Monday, ..., 6 = Saturday) safely without timezone offset.
 * @param {string} isoDate YYYY-MM-DD
 * @returns {number | null}
 */
export function getDayOfWeekFromIso(isoDate) {
  const parsed = parseIsoDate(isoDate);
  if (!parsed) return null;
  return new Date(parsed.year, parsed.month - 1, parsed.day).getDay();
}

/**
 * Format month and year localized (e.g. "Noviembre 2026" / "November 2026").
 * @param {number} year
 * @param {number} month 1-12
 * @param {string} [locale]
 * @returns {string}
 */
export function formatMonthYear(year, month, locale = 'es-AR') {
  const d = new Date(year, month - 1, 1);
  const formatted = new Intl.DateTimeFormat(locale, { month: 'long', year: 'numeric' }).format(d);
  return formatted.charAt(0).toUpperCase() + formatted.slice(1);
}


