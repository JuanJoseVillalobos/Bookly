import React, { useEffect, useMemo, useId } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  Calendar,
  AlertCircle,
  CheckCircle,
  Ban,
} from 'lucide-react';
import { getTimeSlotsForDate } from '../../data/experiences';

/**
 * Reusable Accessible TimeSlotSelector Component for Bookly
 *
 * Requirements satisfied:
 * - Only reveals / enables time slot choices after a valid date has been picked.
 * - Displays slots specific to the selected experience.
 * - Distinguishes available vs. sold out slots with clear visual indicators and capacity badges.
 * - Updates slot availability deterministically when the selected date changes.
 * - Automatically clears previous selection if it becomes invalid or unavailable for the new date.
 * - Shows an empty state notice when no slots are available for the date.
 * - Single-choice selection with radio semantics, keyboard accessibility, and bilingual formats.
 */
export default function TimeSlotSelector({
  value = '',
  onChange,
  experience,
  selectedDate = '',
  label,
  required = false,
  disabled = false,
  error,
  id: customId,
  className = '',
}) {
  const { t, i18n } = useTranslation('booking');
  const generatedId = useId();
  const selectorId = customId || generatedId;
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  // Compute available time slots for the chosen date and experience
  const computedSlots = useMemo(() => {
    if (!selectedDate || !experience) return [];
    return getTimeSlotsForDate(experience, selectedDate, currentLang);
  }, [experience, selectedDate, currentLang]);

  // Check if all available slots for this date are fully booked or if none exist
  const hasNoAvailableSlots = useMemo(() => {
    if (!selectedDate) return false;
    if (computedSlots.length === 0) return true;
    return computedSlots.every((slot) => !slot.isAvailable);
  }, [selectedDate, computedSlots]);

  // Clean previous selection if it is no longer valid or available on the new date
  useEffect(() => {
    if (!selectedDate) {
      if (value) onChange?.('');
      return;
    }

    if (value) {
      const activeSlot = computedSlots.find((s) => s.value === value);
      if (!activeSlot || !activeSlot.isAvailable) {
        // Automatically clear selection because it became unavailable
        onChange?.('');
      }
    }
  }, [selectedDate, computedSlots, value, onChange]);

  return (
    <div className={`w-full ${className}`}>
      {/* 1. Label */}
      {label && (
        <label
          id={`${selectorId}-label`}
          className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
        >
          {label}
          {required && <span className="text-sand-gold-dark ml-1" aria-hidden="true">*</span>}
        </label>
      )}

      {/* 2. State A: No date selected yet */}
      {!selectedDate && (
        <div
          className="p-4 rounded-xl border border-dashed border-stone bg-stone-light/30 flex items-center gap-3 text-xs text-charcoal-muted"
          role="status"
        >
          <div className="p-2 rounded-lg bg-stone-light text-charcoal-light shrink-0">
            <Calendar className="w-4 h-4" />
          </div>
          <span className="leading-relaxed">
            {t('request.timeSlotSelectDateFirst', 'Selecciona primero una fecha para ver los horarios disponibles.')}
          </span>
        </div>
      )}

      {/* 3. State B: Date selected, but zero slots available */}
      {selectedDate && hasNoAvailableSlots && (
        <div
          className="p-4 rounded-xl bg-amber-50 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-3"
          role="alert"
        >
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <div className="space-y-0.5">
            <span className="font-semibold block">
              {t('request.timeSlotNoAvailableTitle', 'Sin horarios disponibles para esta fecha')}
            </span>
            <span className="text-amber-800 leading-relaxed block">
              {t(
                'request.timeSlotNoAvailableMessage',
                'Todos los turnos para el día seleccionado están completos. Por favor, elige otra fecha.'
              )}
            </span>
          </div>
        </div>
      )}

      {/* 4. State C: Date selected and slots available */}
      {selectedDate && !hasNoAvailableSlots && (
        <div
          role="radiogroup"
          aria-labelledby={label ? `${selectorId}-label` : undefined}
          aria-required={required}
          className="grid grid-cols-1 sm:grid-cols-2 gap-3"
        >
          {computedSlots.map((slot) => {
            const isSelected = value === slot.value;
            const isAvailable = slot.isAvailable;
            const isLastSpot = slot.spotsLeft === 1;

            return (
              <button
                key={slot.value}
                type="button"
                role="radio"
                disabled={!isAvailable || disabled}
                aria-checked={isSelected}
                aria-disabled={!isAvailable || disabled}
                onClick={() => {
                  if (isAvailable && !disabled) {
                    onChange?.(slot.value);
                  }
                }}
                className={[
                  'relative p-3.5 rounded-xl border text-left transition-all duration-150 flex flex-col justify-between gap-2.5',
                  // Selected state
                  isSelected
                    ? 'border-forest bg-forest text-ivory ring-2 ring-forest/20 shadow-xs'
                    : '',
                  // Available but not selected
                  isAvailable && !isSelected
                    ? 'border-stone bg-white text-charcoal hover:border-forest/50 hover:bg-forest-subtle/40 cursor-pointer shadow-2xs'
                    : '',
                  // Sold out / Disabled
                  !isAvailable
                    ? 'border-stone/60 bg-stone-light/40 text-charcoal-light/60 cursor-not-allowed opacity-60'
                    : '',
                ].filter(Boolean).join(' ')}
              >
                {/* Header row: Clock + Time + Selected Check / Ban */}
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <Clock
                      className={`w-4 h-4 ${
                        isSelected
                          ? 'text-ivory'
                          : isAvailable
                          ? 'text-forest'
                          : 'text-charcoal-light/40'
                      }`}
                    />
                    <span className="font-semibold text-sm tracking-tight">
                      {slot.value} hs
                    </span>
                  </div>

                  {isSelected && (
                    <CheckCircle className="w-4 h-4 text-sand-gold-light shrink-0" />
                  )}
                  {!isAvailable && (
                    <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-red-700 bg-red-100/70 px-2 py-0.5 rounded-full">
                      <Ban className="w-3 h-3" />
                      {t('request.timeSlotSoldOut', 'Agotado')}
                    </span>
                  )}
                </div>

                {/* Subtitle / Slot name & remaining spots */}
                <div className="flex items-baseline justify-between gap-2 text-xs">
                  <span
                    className={`line-clamp-1 font-medium ${
                      isSelected
                        ? 'text-ivory/90'
                        : isAvailable
                        ? 'text-charcoal-muted'
                        : 'text-charcoal-light/50'
                    }`}
                  >
                    {slot.label}
                  </span>

                  {isAvailable && (
                    <span
                      className={`text-[11px] font-medium shrink-0 ${
                        isSelected
                          ? 'text-sand-gold-light'
                          : isLastSpot
                          ? 'text-amber-700 font-semibold'
                          : 'text-forest-dark'
                      }`}
                    >
                      {isLastSpot
                        ? t('request.timeSlotSpotAvailableOne', '¡Último lugar disponible!')
                        : t('request.timeSlotSpotsAvailable', { count: slot.spotsLeft })}
                    </span>
                  )}
                </div>
              </button>
            );
          })}
        </div>
      )}

      {/* 5. Error Message */}
      {error && (
        <p className="mt-1.5 text-xs text-red-600 font-medium flex items-center gap-1" role="alert">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" />
          <span>{error}</span>
        </p>
      )}
    </div>
  );
}

