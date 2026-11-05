import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Sparkles, ArrowRight } from 'lucide-react';
import { getFeaturedExperiences } from '../../../data/experiences';
import { Button, Badge } from '../../../components/common';
import { ExperienceCard } from '../../../components/experience';

/**
 * FeaturedSection
 * Displays curated experiences directly sourced from centralized mock data,
 * utilizing the shared reusable ExperienceCard component.
 */
export default function FeaturedSection() {
  const { t, i18n } = useTranslation(['home', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const featured = getFeaturedExperiences(currentLang);

  return (
    <section id="featured" className="scroll-mt-24 space-y-8 sm:space-y-10">
      {/* Section Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone pb-6">
        <div className="max-w-2xl">
          <Badge variant="gold" size="sm" icon={<Sparkles className="w-3 h-3" />} className="mb-2">
            {t('featured.badge')}
          </Badge>
          <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
            {t('featured.title')}
          </h2>
          <p className="text-sm sm:text-base text-charcoal-muted mt-2 font-normal leading-relaxed">
            {t('featured.subtitle')}
          </p>
        </div>

        <Link to="/explore" className="shrink-0">
          <Button
            variant="ghost"
            size="sm"
            rightIcon={<ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />}
          >
            {t('featured.viewAll')}
          </Button>
        </Link>
      </div>

      {/* Experiences Grid using reusable ExperienceCard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featured.map((item) => (
          <ExperienceCard
            key={item.id}
            experience={item}
            imageAspect="aspect-[16/10]"
          />
        ))}
      </div>
    </section>
  );
}
