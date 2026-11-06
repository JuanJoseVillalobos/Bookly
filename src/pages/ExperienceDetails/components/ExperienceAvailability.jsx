import React from 'react';
import { useTranslation } from 'react-i18next';
import { AlertCircle } from 'lucide-react';
import { Badge } from '../../../components/common';

/**
 * ExperienceAvailability
 * Displays illustrative demo availability: recommended season, operating days, and time slots.
 */
export default function ExperienceAvailability({ experience, currentLang }) {
  const { t } = useTranslation('booking');
  const isEn = currentLang === 'en';

  const dayNamesEs = ['Domingos', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábados'];
  const dayNamesEn = ['Sundays', 'Mondays', 'Tuesdays', 'Wednesdays', 'Thursdays', 'Fridays', 'Saturdays'];
  const rawDays = experience.availability?.availableDays || [];
  const operatingDaysFormatted = rawDays.length === 7 || rawDays.length === 0
    ? t('details.operatingDaysAll')
    : rawDays.map((d) => (isEn ? dayNamesEn[d] : dayNamesEs[d])).join(', ');

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-2 border-b border-stone/80 pb-3">
        <h2 className="font-serif text-2xl font-bold text-forest">
          {t('details.availabilityTitle')}
        </h2>
        <Badge variant="stone" size="sm">
          Demo
        </Badge>
      </div>

      <div className="p-5 sm:p-6 rounded-2xl bg-stone-light/40 border border-stone space-y-4">
        {/* Illustrative Notice */}
        <div className="flex items-start gap-3 p-3.5 rounded-xl bg-amber-50 border border-amber-200/80 text-xs sm:text-sm text-amber-900">
          <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
          <span className="leading-relaxed">
            {t('details.availabilityDisclaimer')}
          </span>
        </div>

        {/* Availability Specs Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
          <div className="bg-white p-3.5 rounded-xl border border-stone">
            <span className="text-xs text-charcoal-light font-medium block">
              {t('details.seasonLabel')}
            </span>
            <span className="text-sm font-semibold text-forest mt-1 block">
              {experience.availability?.season || (isEn ? 'Year-round' : 'Todo el año')}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone">
            <span className="text-xs text-charcoal-light font-medium block">
              {t('details.operatingDays')}
            </span>
            <span className="text-sm font-semibold text-forest mt-1 block">
              {operatingDaysFormatted}
            </span>
          </div>

          <div className="bg-white p-3.5 rounded-xl border border-stone">
            <span className="text-xs text-charcoal-light font-medium block">
              {t('details.timeSlotsLabel')}
            </span>
            <div className="flex flex-wrap gap-1.5 mt-1.5">
              {experience.timeSlots?.map((slot) => (
                <span
                  key={slot.value}
                  className="px-2 py-0.5 rounded-md text-xs font-semibold bg-forest-subtle text-forest"
                >
                  {slot.value} hs
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

