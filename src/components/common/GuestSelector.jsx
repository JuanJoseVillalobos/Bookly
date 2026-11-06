import React from 'react';
import { useTranslation } from 'react-i18next';
import { Minus, Plus, Users, Sparkles, AlertCircle } from 'lucide-react';
import { formatCurrency } from '../../utils/formatters';
import { calculateBookingPrice } from '../../utils/pricing';

/**
 * Reusable Accessible Guest Quantity Selector with Live Price Calculation
 *
 * Requirements satisfied:
 * - Stepper controls for incrementing (+) and decrementing (-) participant count.
 * - Enforces experience-specific minimum and maximum limits (cannot select 0, negatives, or > max).
 * - Real-time calculation of estimated total (unit price × guest quantity).
 * - Displays unit price per person, current quantity, and estimated total dynamically.
 * - Accessible keyboard interaction (Arrow keys, Space/Enter, spinbutton role).
 * - Contextual limit indicator (feedback when minimum or maximum is reached).
 * - Seamless bilingual support (ES / EN) and responsive layout.
 */
export default function GuestSelector({
  value = 1,
  onChange,
  min = 1,
  max = 8,
  unitPrice = 0,
  currency = 'USD',
  label,
  id = 'guest-selector',
  disabled = false,
  error,
  className = '',
}) {
  const { t, i18n } = useTranslation('booking');
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  // Coerce and bound value strictly
  const currentCount = Math.max(min, Math.min(max, parseInt(String(value), 10) || min));

  // Pricing calculation via centralized utility
  const pricing = calculateBookingPrice({
    unitPrice,
    guestCount: currentCount,
    currency,
  });

  const isAtMin = currentCount <= min;
  const isAtMax = currentCount >= max;

  const handleDecrement = () => {
    if (disabled || isAtMin) return;
    const nextVal = currentCount - 1;
    onChange?.(String(nextVal));
  };

  const handleIncrement = () => {
    if (disabled || isAtMax) return;
    const nextVal = currentCount + 1;
    onChange?.(String(nextVal));
  };

  const handleKeyDown = (e) => {
    if (disabled) return;
    if (e.key === 'ArrowUp' || e.key === 'ArrowRight') {
      e.preventDefault();
      handleIncrement();
    } else if (e.key === 'ArrowDown' || e.key === 'ArrowLeft') {
      e.preventDefault();
      handleDecrement();
    }
  };

  return (
    <div className={`w-full space-y-3 ${className}`}>
      {/* 1. Label */}
      {label && (
        <label
          htmlFor={id}
          className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1"
        >
          {label}
        </label>
      )}

      {/* 2. Stepper & Price Calculation Card */}
      <div
        className={`p-4 sm:p-5 rounded-2xl border bg-white shadow-2xs space-y-4 transition-colors ${
          error ? 'border-red-500 bg-red-50/10' : 'border-stone'
        }`}
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          {/* Stepper Controls */}
          <div className="flex items-center gap-3">
            {/* Decrement Button */}
            <button
              type="button"
              onClick={handleDecrement}
              disabled={disabled || isAtMin}
              aria-label={t('request.guestSelector.decrease', 'Disminuir participantes')}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 ${
                disabled || isAtMin
                  ? 'border-stone text-charcoal-light/40 bg-stone-light/30 cursor-not-allowed'
                  : 'border-stone hover:border-forest/50 hover:bg-forest-subtle/50 text-forest cursor-pointer active:scale-95 shadow-xs'
              }`}
            >
              <Minus className="w-4 h-4" />
            </button>

            {/* Current Value Display (Spinbutton semantics) */}
            <div
              id={id}
              role="spinbutton"
              tabIndex={disabled ? -1 : 0}
              onKeyDown={handleKeyDown}
              aria-valuenow={currentCount}
              aria-valuemin={min}
              aria-valuemax={max}
              aria-label={label || t('request.guestsLabel')}
              className="min-w-[110px] sm:min-w-[130px] px-3.5 py-2 rounded-xl bg-stone-light/40 border border-stone/80 text-center select-none focus:outline-none focus:ring-2 focus:ring-forest/20"
            >
              <span className="block font-serif text-xl sm:text-2xl font-bold text-forest leading-none">
                {currentCount}
              </span>
              <span className="text-[11px] text-charcoal-muted font-medium block mt-0.5">
                {currentCount === 1
                  ? t('request.guestSelector.guestsSingle', '1 persona')
                  : t('request.guestSelector.guestsMultiple', { count: currentCount })}
              </span>
            </div>

            {/* Increment Button */}
            <button
              type="button"
              onClick={handleIncrement}
              disabled={disabled || isAtMax}
              aria-label={t('request.guestSelector.increase', 'Aumentar participantes')}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all duration-150 ${
                disabled || isAtMax
                  ? 'border-stone text-charcoal-light/40 bg-stone-light/30 cursor-not-allowed'
                  : 'border-stone hover:border-forest/50 hover:bg-forest-subtle/50 text-forest cursor-pointer active:scale-95 shadow-xs'
              }`}
            >
              <Plus className="w-4 h-4" />
            </button>
          </div>

          {/* Real-time Dynamic Price Breakdown Box */}
          <div className="sm:text-right pt-2 sm:pt-0 border-t sm:border-t-0 border-stone/60">
            <span className="block text-[11px] uppercase tracking-wider text-charcoal-light font-medium">
              {t('request.guestSelector.estimatedSubtotal', 'Total estimado')}
            </span>
            <div className="flex sm:flex-col items-baseline sm:items-end justify-between gap-1">
              <span className="font-serif text-xl sm:text-2xl font-bold text-forest">
                {formatCurrency(pricing.estimatedTotal, pricing.currency, currentLang)}
              </span>
              <span className="text-xs text-charcoal-muted">
                {formatCurrency(pricing.unitPrice, pricing.currency, currentLang)} × {currentCount}{' '}
                {currentCount === 1
                  ? t('request.guestSelector.guestsSingle', 'persona')
                  : t('request.guestSelector.guestsMultiple', { count: currentCount })}
              </span>
            </div>
          </div>
        </div>

        {/* Boundary Notice Feedback */}
        {isAtMax && (
          <div className="pt-2 border-t border-stone/60 flex items-center gap-2 text-xs text-amber-800">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-amber-700" />
            <span>
              {t('request.guestSelector.maxReached', {
                max,
                defaultValue: `Capacidad máxima alcanzada (máx. ${max} personas)`,
              })}
            </span>
          </div>
        )}

        {isAtMin && min > 1 && (
          <div className="pt-2 border-t border-stone/60 flex items-center gap-2 text-xs text-charcoal-muted">
            <AlertCircle className="w-3.5 h-3.5 shrink-0 text-charcoal-light" />
            <span>
              {t('request.guestSelector.minReachedMultiple', {
                min,
                defaultValue: `Mínimo permitido: ${min} personas`,
              })}
            </span>
          </div>
        )}
      </div>

      {/* Error Feedback */}
      {error && (
        <p className="mt-1 text-xs text-red-600 font-medium flex items-center gap-1" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

