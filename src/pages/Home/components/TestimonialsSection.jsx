import React from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Info, MessageSquareQuote } from 'lucide-react';
import { Card, Badge } from '../../../components/common';

/**
 * TestimonialsSection
 * Showcases illustrative traveler reviews, explicitly identified as fictional demo content.
 */
export default function TestimonialsSection() {
  const { t } = useTranslation('home');

  const testimonialKeys = ['testimonial1', 'testimonial2', 'testimonial3'];

  return (
    <section className="space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div className="max-w-2xl">
          <Badge variant="stone" size="sm" icon={<MessageSquareQuote className="w-3 h-3" />} className="mb-2">
            {t('testimonials.badge')}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
            {t('testimonials.title')}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2 font-normal leading-relaxed">
            {t('testimonials.subtitle')}
          </p>
        </div>
      </div>

      {/* Prominent Demo Notice Alert (Acceptance Criteria requirement) */}
      <div
        className="flex items-start sm:items-center gap-3 p-4 rounded-xl bg-amber-50/70 border border-amber-200/80 text-amber-900 text-xs sm:text-sm"
        role="note"
        aria-label={t('testimonials.badge')}
      >
        <Info className="w-4 h-4 text-amber-700 shrink-0 mt-0.5 sm:mt-0" />
        <p className="leading-relaxed">
          {t('testimonials.demoAlert')}
        </p>
      </div>

      {/* Testimonials Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
        {testimonialKeys.map((key) => {
          const quote = t(`testimonials.items.${key}.quote`);
          const author = t(`testimonials.items.${key}.author`);
          const location = t(`testimonials.items.${key}.location`);
          const experience = t(`testimonials.items.${key}.experience`);

          return (
            <Card
              key={key}
              className="flex flex-col justify-between p-6 sm:p-7 bg-white border border-stone shadow-xs hover:border-forest/30 transition-all"
            >
              <div className="space-y-4">
                {/* 5-star rating */}
                <div className="flex items-center gap-1 text-sand-gold" aria-label="5 de 5 estrellas">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-sand-gold" />
                  ))}
                </div>

                {/* Quote */}
                <p className="text-sm text-charcoal-muted italic leading-relaxed">
                  “{quote}”
                </p>
              </div>

              {/* Author & Experience attribution */}
              <div className="pt-6 mt-6 border-t border-stone/60">
                <p className="font-serif font-bold text-forest text-sm">
                  {author}
                </p>
                <p className="text-xs text-charcoal-light mb-2">
                  {location}
                </p>
                <span className="inline-block text-[11px] font-medium text-forest bg-forest-subtle px-2.5 py-0.5 rounded-full border border-forest/10">
                  {experience}
                </span>
              </div>
            </Card>
          );
        })}
      </div>
    </section>
  );
}

