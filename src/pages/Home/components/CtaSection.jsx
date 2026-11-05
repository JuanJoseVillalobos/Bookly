import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowRight, Compass } from 'lucide-react';
import { Button, Badge } from '../../../components/common';

/**
 * CtaSection
 * Closing call to action inviting visitors to explore the entire experiences catalog.
 */
export default function CtaSection() {
  const { t } = useTranslation('home');

  return (
    <section className="relative overflow-hidden rounded-3xl bg-forest text-ivory p-8 sm:p-14 lg:p-16 text-center shadow-lg">
      {/* Decorative ambient background accents */}
      <div
        className="absolute -top-24 -right-24 w-72 h-72 rounded-full bg-sand-gold/15 blur-3xl pointer-events-none"
        aria-hidden="true"
      />
      <div
        className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full bg-forest-light/30 blur-3xl pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative z-10 max-w-3xl mx-auto space-y-6">
        <div className="inline-flex items-center gap-2">
          <Badge
            variant="gold"
            size="md"
            icon={<Compass className="w-3.5 h-3.5" />}
          >
            {t('cta.badge')}
          </Badge>
        </div>

        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight leading-tight text-ivory">
          {t('cta.title')}
        </h2>

        <p className="max-w-xl mx-auto text-sm sm:text-base text-ivory/80 leading-relaxed font-normal">
          {t('cta.subtitle')}
        </p>

        <div className="pt-2">
          <Link to="/explore">
            <Button
              variant="accent"
              size="lg"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('cta.button')}
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}

