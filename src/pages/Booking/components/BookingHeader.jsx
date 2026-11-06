import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, ChevronRight, CalendarCheck } from 'lucide-react';
import { Badge } from '../../../components/common';

/**
 * BookingHeader
 * Displays breadcrumbs, back-link to ExperienceDetails preserving context,
 * process badge, title, and descriptive subtitle.
 */
export default function BookingHeader({ experience }) {
  const { t } = useTranslation('booking');

  return (
    <div className="space-y-4">
      {/* 1. Breadcrumbs */}
      <nav aria-label="Breadcrumb" className="flex items-center gap-2 text-xs sm:text-sm text-charcoal-muted">
        <Link
          to="/explore"
          className="hover:text-forest transition-colors font-medium"
        >
          {t('request.breadcrumbCatalog')}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-dark" />
        <Link
          to={`/experience/${experience.id}`}
          className="hover:text-forest transition-colors font-medium line-clamp-1 max-w-[200px] sm:max-w-xs"
        >
          {experience.title}
        </Link>
        <ChevronRight className="w-3.5 h-3.5 text-stone-dark" />
        <span className="text-forest font-semibold line-clamp-1">
          {t('request.processTag')}
        </span>
      </nav>

      {/* 2. Direct back button */}
      <div>
        <Link
          to={`/experience/${experience.id}`}
          className="inline-flex items-center gap-2 text-sm text-forest font-medium hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-0.5" />
          <span>{t('request.backToExperience')}</span>
        </Link>
      </div>

      {/* 3. Header title section */}
      <div className="space-y-2 pt-1 border-b border-stone/80 pb-6">
        <div className="flex flex-wrap items-center gap-2 mb-1">
          <Badge variant="gold" size="sm" icon={<CalendarCheck className="w-3.5 h-3.5" />}>
            {t('request.processTag')}
          </Badge>
          <Badge variant="stone" size="sm">
            {experience.category}
          </Badge>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest tracking-tight">
          {t('request.titlePrefix')} {experience.title}
        </h1>

        <p className="text-sm sm:text-base text-charcoal-muted max-w-2xl leading-relaxed">
          {t('request.subtitle')}
        </p>
      </div>
    </div>
  );
}

