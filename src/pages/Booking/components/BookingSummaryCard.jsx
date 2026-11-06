import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Clock,
  Users,
  Calendar,
  ShieldCheck,
  Info,
  ExternalLink,
} from 'lucide-react';
import { Card, Badge } from '../../../components/common';
import { formatCurrency, formatDateByLocale } from '../../../utils/formatters';

/**
 * BookingSummaryCard
 * Displays a sticky summary of the selected experience:
 * image, title, category, location, duration, pricing breakdown,
 * and illustrative disclaimer.
 */
export default function BookingSummaryCard({
  experience,
  currentLang,
  guests = 1,
  selectedDate = '',
  selectedTime = '',
}) {
  const { t } = useTranslation('booking');
  const isEn = currentLang === 'en';

  const unitPrice = experience.price || 0;
  const currency = experience.currency || 'USD';
  const guestCount = parseInt(guests, 10) || 1;
  const estimatedTotal = unitPrice * guestCount;

  // Format date display (mm/dd/yyyy in English, dd/mm/yyyy in Spanish)
  let formattedDate = t('request.summaryDateEmpty');
  if (selectedDate) {
    formattedDate = formatDateByLocale(selectedDate, currentLang);
  }

  // Format time display if provided
  const timeLabel = selectedTime
    ? experience.timeSlots?.find((s) => s.value === selectedTime)?.label || `${selectedTime} hs`
    : t('request.summaryTimeEmpty');

  return (
    <aside className="lg:col-span-5 xl:col-span-4 lg:sticky lg:top-24 space-y-4">
      <Card className="overflow-hidden bg-white border border-stone shadow-sm">
        {/* 1. Experience Image Header */}
        <div className="relative h-44 sm:h-48 w-full overflow-hidden bg-stone-light">
          <img
            src={experience.mainImage}
            alt={experience.imageAlt || experience.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute top-3 left-3">
            <Badge variant="gold" size="sm">
              {experience.category}
            </Badge>
          </div>
        </div>

        {/* 2. Core Experience Info */}
        <div className="p-5 sm:p-6 space-y-5">
          <div className="space-y-1.5 border-b border-stone/70 pb-4">
            <h2 className="font-serif text-xl font-bold text-forest leading-snug">
              {experience.title}
            </h2>
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-charcoal-muted">
              <span className="flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-forest" />
                <span>{experience.locationFull || experience.location}</span>
              </span>
              <span className="flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-forest" />
                <span>{experience.duration}</span>
              </span>
            </div>
          </div>

          {/* 3. Summary Breakdown */}
          <div className="space-y-3 text-xs sm:text-sm">
            <div className="flex justify-between items-center text-charcoal-muted">
              <span>{t('request.summaryRateLabel')}</span>
              <span className="font-semibold text-charcoal">
                {formatCurrency(unitPrice, currency, currentLang)}
              </span>
            </div>

            <div className="flex justify-between items-center text-charcoal-muted">
              <span className="flex items-center gap-1.5">
                <Users className="w-3.5 h-3.5 text-forest" />
                <span>{t('request.summaryGuestsLabel')}</span>
              </span>
              <span className="font-semibold text-charcoal">
                {guestCount} {isEn ? (guestCount === 1 ? 'guest' : 'guests') : (guestCount === 1 ? 'huésped' : 'huéspedes')}
              </span>
            </div>

            <div className="flex justify-between items-center text-charcoal-muted">
              <span className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-forest" />
                <span>{t('request.summaryDateLabel')}</span>
              </span>
              <span className={`font-medium ${selectedDate ? 'text-charcoal' : 'text-charcoal-light italic'}`}>
                {formattedDate}
              </span>
            </div>

            <div className="flex justify-between items-center text-charcoal-muted">
              <span className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-forest" />
                <span>{t('request.summaryTimeLabel')}</span>
              </span>
              <span className={`font-medium ${selectedTime ? 'text-charcoal' : 'text-charcoal-light italic'}`}>
                {timeLabel}
              </span>
            </div>
          </div>

          {/* 4. Estimated Total Box */}
          <div className="p-4 rounded-xl bg-ivory border border-stone/80 flex items-center justify-between">
            <div>
              <span className="block text-xs uppercase tracking-wider text-charcoal-light font-semibold">
                {t('request.summaryTotalLabel')}
              </span>
              <span className="text-xs text-charcoal-muted">
                {formatCurrency(unitPrice, currency, currentLang)} × {guestCount}
              </span>
            </div>
            <div className="text-right">
              <span className="font-serif text-2xl font-bold text-forest">
                {formatCurrency(estimatedTotal, currency, currentLang)}
              </span>
            </div>
          </div>

          {/* 5. Trust Points & Demo Notice */}
          <div className="space-y-2 pt-2 border-t border-stone/60 text-xs text-charcoal-muted">
            <div className="flex items-center gap-2 text-forest font-medium">
              <ShieldCheck className="w-4 h-4 shrink-0" />
              <span>{t('request.trustNoCard')}</span>
            </div>
            <div className="flex items-start gap-2 text-charcoal-light">
              <Info className="w-4 h-4 shrink-0 mt-0.5 text-amber-700" />
              <span className="leading-relaxed">
                {t('request.summaryDemoNotice')}
              </span>
            </div>
          </div>

          {/* 6. Context Link to re-check details */}
          <div className="pt-2 text-center">
            <Link
              to={`/experience/${experience.id}`}
              className="inline-flex items-center gap-1.5 text-xs text-forest hover:underline font-medium"
            >
              <span>{t('actions.viewDetails')}</span>
              <ExternalLink className="w-3 h-3" />
            </Link>
          </div>
        </div>
      </Card>
    </aside>
  );
}

