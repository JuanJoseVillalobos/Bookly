import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Clock,
  Sparkles,
  Star,
  Info,
  ArrowRight,
} from 'lucide-react';
import { Card, Badge, Button } from '../common';
import { getLocalizedExperience } from '../../data/experiences';
import { formatCurrency } from '../../utils/formatters';

/**
 * ExperienceCard
 * Reusable card displaying an experience's commercial information:
 * title, photo, category, location, duration, rating, price per person,
 * and direct links to experience details and booking flow.
 */
export default function ExperienceCard({
  experience,
  className = '',
  imageAspect = 'aspect-[16/10]',
  showBookButton = true,
}) {
  const { t, i18n } = useTranslation(['booking', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  // Ensure experience is localized
  const item = experience?.title && typeof experience.title === 'string'
    ? experience
    : getLocalizedExperience(experience, currentLang);

  if (!item) return null;

  return (
    <Card
      hoverEffect
      className={`flex flex-col justify-between overflow-hidden group bg-white border border-stone/90 transition-all duration-300 hover:border-forest/40 hover:shadow-lg ${className}`}
    >
      {/* 1. Main Image Banner */}
      <div className={`relative w-full ${imageAspect} overflow-hidden bg-stone-light shrink-0`}>
        <img
          src={item.mainImage}
          alt={item.imageAlt || item.title}
          className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          loading="lazy"
        />

        {/* Gradient vignette for badges contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none" />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-10">
          <Badge
            variant="gold"
            size="sm"
            icon={<Sparkles className="w-3 h-3" />}
            className="shadow-xs backdrop-blur-xs bg-white/90"
          >
            {item.category}
          </Badge>
        </div>

        {/* Rating Pill */}
        {item.rating && (
          <div className="absolute top-3 right-3 z-10 bg-charcoal/85 backdrop-blur-xs text-ivory text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium shadow-xs">
            <Star className="w-3 h-3 text-sand-gold fill-sand-gold" />
            <span>{item.rating}</span>
            {item.reviewsCount > 0 && (
              <span className="text-ivory/70 text-[10px]">({item.reviewsCount})</span>
            )}
          </div>
        )}
      </div>

      {/* 2. Content Body */}
      <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Metadata Row: Location & Duration */}
          <div className="flex items-center justify-between text-xs text-charcoal-muted mb-2.5">
            <span className="flex items-center gap-1.5 font-medium text-forest truncate max-w-[60%]">
              <MapPin className="w-3.5 h-3.5 text-forest/70 shrink-0" />
              <span className="truncate">{item.location}</span>
            </span>
            <span className="flex items-center gap-1.5 text-charcoal-light shrink-0">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span>{item.duration}</span>
            </span>
          </div>

          {/* Title with link to details */}
          <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-forest transition-colors leading-snug mb-2.5">
            <Link
              to={`/experience/${item.id}`}
              className="focus:outline-none focus-visible:underline"
            >
              {item.title}
            </Link>
          </h3>

          {/* Short Description */}
          <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">
            {item.shortDescription}
          </p>
        </div>

        {/* 3. Pricing and Action Buttons */}
        <div className="pt-4 border-t border-stone flex items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-charcoal-light font-medium">
              <span>{t('explore.card.from', 'Desde')}</span>
              <span
                title={t('explore.card.demoNotice', 'Tarifa ilustrativa de demostración')}
                className="cursor-help inline-flex text-charcoal-light hover:text-forest"
              >
                <Info className="w-3 h-3" />
              </span>
            </div>
            <div className="font-serif text-xl font-bold text-forest">
              {formatCurrency(item.price, item.currency, currentLang)}
              <span className="font-sans text-xs text-charcoal-muted font-normal ml-1">
                {t('explore.card.perPerson', '/ persona')}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Link to={`/experience/${item.id}`}>
              <Button variant="outline" size="sm">
                {t('explore.card.viewDetails', 'Ver detalles')}
              </Button>
            </Link>
            {showBookButton && (
              <Link to={`/booking/${item.id}`}>
                <Button
                  variant="primary"
                  size="sm"
                  rightIcon={<ArrowRight className="w-3 h-3 sm:hidden xl:inline-block" />}
                >
                  {t('explore.card.bookNow', 'Reservar')}
                </Button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}

