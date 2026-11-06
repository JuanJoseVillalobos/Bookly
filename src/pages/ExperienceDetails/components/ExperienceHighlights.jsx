import React from 'react';
import { useTranslation } from 'react-i18next';
import { Sparkles } from 'lucide-react';

/**
 * ExperienceHighlights
 * Key selling points / highlights of the selected tour.
 */
export default function ExperienceHighlights({ highlights }) {
  const { t } = useTranslation('booking');

  if (!highlights || highlights.length === 0) return null;

  return (
    <section className="space-y-4">
      <h2 className="font-serif text-2xl font-bold text-forest border-b border-stone/80 pb-3">
        {t('details.highlightsTitle')}
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
        {highlights.map((highlight, idx) => (
          <div
            key={idx}
            className="flex items-start gap-3 p-3.5 rounded-xl bg-white border border-stone/80 shadow-2xs hover:border-forest/30 transition-colors"
          >
            <div className="p-1 rounded-md bg-sand-gold-subtle text-sand-gold-dark shrink-0 mt-0.5">
              <Sparkles className="w-4 h-4" />
            </div>
            <span className="text-sm text-charcoal font-medium leading-snug">{highlight}</span>
          </div>
        ))}
      </div>
    </section>
  );
}

