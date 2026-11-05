import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, Users, ShieldCheck, Calendar } from 'lucide-react';
import { Card, Button } from '../../../components/common';
import { formatCurrency } from '../../../utils/formatters';

/**
 * ExperienceBookingCard
 * Sticky desktop & mobile booking card showing estimated price per person,
 * quick summary attributes, and primary CTA initiating the booking flow.
 */
export default function ExperienceBookingCard({ experience, currentLang }) {
  const { t } = useTranslation('booking');
  const isEn = currentLang === 'en';

  return (
    <aside className="lg:col-span-4 lg:sticky lg:top-24 space-y-4">
      <Card className="p-6 sm:p-8 bg-white border border-stone/90 shadow-sm space-y-6">
        {/* Header: Price & Title */}
        <div className="border-b border-stone/80 pb-5 space-y-1">
          <span className="text-xs uppercase tracking-wider text-charcoal-light font-semibold block">
            {t('details.estimatedRate')}
          </span>
          <div className="flex items-baseline gap-2">
            <span className="font-serif text-3xl sm:text-4xl font-bold text-forest">
              {formatCurrency(experience.price, experience.currency, currentLang)}
            </span>
            <span className="text-xs sm:text-sm text-charcoal-muted font-medium">
              {t('details.perPerson')}
            </span>
          </div>
        </div>

        {/* Quick summary points */}
        <div className="space-y-3 text-xs sm:text-sm text-charcoal-muted">
          <div className="flex items-center justify-between py-1 border-b border-stone/40">
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-forest" />
              <span>{t('details.durationLabel')}</span>
            </span>
            <span className="font-semibold text-charcoal">{experience.duration}</span>
          </div>

          <div className="flex items-center justify-between py-1 border-b border-stone/40">
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-forest" />
              <span>{t('details.groupSizeLabel')}</span>
            </span>
            <span className="font-semibold text-charcoal">
              {isEn
                ? `Up to ${experience.groupSize.max} guests`
                : `Hasta ${experience.groupSize.max} personas`}
            </span>
          </div>

          <div className="flex items-center justify-between py-1">
            <span className="flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-forest" />
              <span>{t('details.difficultyLabel')}</span>
            </span>
            <span className="font-semibold text-charcoal">{experience.difficulty}</span>
          </div>
        </div>

        {/* CTA Action */}
        <div className="space-y-3 pt-2">
          <Link to={`/booking/${experience.id}`} className="block w-full">
            <Button
              variant="primary"
              size="lg"
              className="w-full justify-center shadow-md hover:shadow-lg"
              rightIcon={<Calendar className="w-4 h-4" />}
            >
              {t('details.ctaButton')}
            </Button>
          </Link>
          <p className="text-xs text-center text-charcoal-light leading-relaxed">
            {t('details.ctaHelp')}
          </p>
        </div>
      </Card>
    </aside>
  );
}

