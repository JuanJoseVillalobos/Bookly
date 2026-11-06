import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  ChevronRight,
  Sparkles,
  MapPin,
  Clock,
  Users,
  Star,
} from 'lucide-react';
import { Badge } from '../../../components/common';

/**
 * ExperienceHeader
 * Renders the breadcrumb navigation, category tags, title, tagline,
 * and high-level metadata (location, duration, max group size, rating).
 */
export default function ExperienceHeader({ experience, currentLang }) {
  const { t } = useTranslation(['booking', 'common']);
  const isEn = currentLang === 'en';

  return (
    <div className="space-y-4">
      {/* 1. Breadcrumb & Back to Catalog Navigation */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-charcoal-muted">
        <Link
          to="/explore"
          className="inline-flex items-center gap-1.5 font-medium hover:text-forest transition-colors"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>{t('details.breadcrumbCatalog')}</span>
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-dark" />
        <span className="text-charcoal-light line-clamp-1">{experience.category}</span>
        <ChevronRight className="w-3.5 h-3.5 text-stone-dark" />
        <span className="text-forest font-semibold line-clamp-1">{experience.title}</span>
      </nav>

      {/* 2. Badges and Title */}
      <div className="space-y-3 sm:space-y-4">
        <div className="flex flex-wrap items-center gap-2.5">
          <Badge variant="gold" size="sm" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {experience.category}
          </Badge>
          {experience.featured && (
            <Badge variant="green" size="sm">
              {t('common:labels.featured')}
            </Badge>
          )}
          {experience.difficulty && (
            <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-stone-light text-charcoal border border-stone">
              {experience.difficulty}
            </span>
          )}
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
          {experience.title}
        </h1>

        {experience.tagline && (
          <p className="text-base sm:text-lg text-charcoal-muted max-w-3xl leading-relaxed">
            {experience.tagline}
          </p>
        )}

        {/* 3. Metadata Chips */}
        <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs sm:text-sm text-charcoal-muted pt-1">
          <span className="flex items-center gap-1.5">
            <MapPin className="w-4 h-4 text-forest shrink-0" />
            <span className="font-medium text-charcoal">{experience.locationFull || experience.location}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-4 h-4 text-forest shrink-0" />
            <span>{experience.duration}</span>
          </span>
          <span className="flex items-center gap-1.5">
            <Users className="w-4 h-4 text-forest shrink-0" />
            <span>
              {isEn
                ? `Max ${experience.groupSize.max} guests`
                : `Hasta ${experience.groupSize.max} personas`}
            </span>
          </span>
          {experience.rating && (
            <span className="flex items-center gap-1.5">
              <Star className="w-4 h-4 fill-amber-400 text-amber-500 shrink-0" />
              <span className="font-bold text-charcoal">{experience.rating.toFixed(1)}</span>
              <span className="text-charcoal-light">
                ({t('details.reviewsLabel', { count: experience.reviewsCount || 42 })})
              </span>
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

