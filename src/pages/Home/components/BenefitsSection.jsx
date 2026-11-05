import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Sparkles,
  Calendar,
  ShieldCheck,
  HeartHandshake,
} from 'lucide-react';
import { Badge } from '../../../components/common';

/**
 * BenefitsSection
 * Communicates the core value proposition and reliability pillars of Bookly.
 */
export default function BenefitsSection() {
  const { t } = useTranslation('home');

  const benefitKeys = [
    {
      key: 'curation',
      icon: <Sparkles className="w-5 h-5 text-sand-gold-dark" />,
      bgIcon: 'bg-sand-gold-subtle',
    },
    {
      key: 'booking',
      icon: <Calendar className="w-5 h-5 text-forest" />,
      bgIcon: 'bg-forest-subtle',
    },
    {
      key: 'operators',
      icon: <ShieldCheck className="w-5 h-5 text-forest" />,
      bgIcon: 'bg-forest-subtle',
    },
    {
      key: 'support',
      icon: <HeartHandshake className="w-5 h-5 text-sand-gold-dark" />,
      bgIcon: 'bg-sand-gold-subtle',
    },
  ];

  return (
    <section className="space-y-8 sm:space-y-10 py-6 sm:py-8 border-y border-stone">
      {/* Header */}
      <div className="max-w-2xl">
        <Badge variant="forest" size="sm" icon={<Sparkles className="w-3 h-3" />} className="mb-2">
          {t('benefits.badge')}
        </Badge>
        <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
          {t('benefits.title')}
        </h2>
        <p className="text-sm sm:text-base text-charcoal-muted mt-2 font-normal leading-relaxed">
          {t('benefits.subtitle')}
        </p>
      </div>

      {/* Benefits Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {benefitKeys.map(({ key, icon, bgIcon }) => (
          <div
            key={key}
            className="p-6 sm:p-7 rounded-2xl bg-white border border-stone hover:border-forest/30 hover:shadow-xs transition-all space-y-3.5"
          >
            <div className={`p-3 w-fit rounded-xl ${bgIcon}`}>
              {icon}
            </div>
            <h3 className="font-serif text-lg font-bold text-forest">
              {t(`benefits.items.${key}.title`)}
            </h3>
            <p className="text-xs sm:text-sm text-charcoal-muted leading-relaxed">
              {t(`benefits.items.${key}.description`)}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}

