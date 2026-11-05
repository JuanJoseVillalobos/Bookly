import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  MapPin,
  Clock,
  Sparkles,
  ArrowRight,
  Star,
  Info,
} from 'lucide-react';
import { getFeaturedExperiences } from '../../../data/experiences';
import { formatCurrency } from '../../../utils/formatters';
import { Button, Card, Badge } from '../../../components/common';

/**
 * FeaturedSection
 * Displays curated experiences directly sourced from centralized mock data.
 * Adheres to editorial minimalism with typography, image zoom effects, and clear pricing badges.
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

      {/* Experiences Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {featured.map((item) => (
          <Card
            key={item.id}
            hoverEffect
            className="flex flex-col justify-between overflow-hidden group bg-white border border-stone"
          >
            {/* Image banner with category badge */}
            <div className="relative h-56 w-full overflow-hidden bg-stone-light">
              <img
                src={item.mainImage}
                alt={item.imageAlt || item.title}
                className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute top-3 left-3">
                <Badge variant="gold" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                  {item.category}
                </Badge>
              </div>

              {/* Rating pill */}
              <div className="absolute top-3 right-3 bg-charcoal/80 backdrop-blur-xs text-ivory text-xs px-2.5 py-1 rounded-full flex items-center gap-1 font-medium shadow-xs">
                <Star className="w-3 h-3 text-sand-gold fill-sand-gold" />
                <span>{item.rating}</span>
                <span className="text-ivory/70 text-[10px]">({item.reviewsCount})</span>
              </div>
            </div>

            {/* Content body */}
            <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
              <div>
                {/* Meta details */}
                <div className="flex items-center justify-between text-xs text-charcoal-muted mb-2.5">
                  <span className="flex items-center gap-1.5 font-medium text-forest">
                    <MapPin className="w-3.5 h-3.5 text-forest/70 shrink-0" />
                    <span>{item.location}</span>
                  </span>
                  <span className="flex items-center gap-1.5 text-charcoal-light">
                    <Clock className="w-3.5 h-3.5 shrink-0" />
                    <span>{item.duration}</span>
                  </span>
                </div>

                {/* Experience Title */}
                <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal group-hover:text-forest transition-colors leading-snug mb-2">
                  <Link to={`/experience/${item.id}`} className="focus:outline-none focus-visible:underline">
                    {item.title}
                  </Link>
                </h3>

                {/* Short description */}
                <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-2">
                  {item.shortDescription}
                </p>
              </div>

              {/* Pricing & Actions Footer */}
              <div className="pt-4 border-t border-stone flex items-center justify-between gap-3">
                <div>
                  <div className="flex items-center gap-1 text-[11px] uppercase tracking-wider text-charcoal-light">
                    <span>{t('featured.from')}</span>
                    <span title={t('featured.demoNotice')} className="cursor-help inline-flex text-charcoal-light hover:text-forest">
                      <Info className="w-3 h-3" />
                    </span>
                  </div>
                  <div className="font-serif text-xl font-bold text-forest">
                    {formatCurrency(item.price, item.currency, currentLang)}
                    <span className="font-sans text-xs text-charcoal-muted font-normal ml-1">
                      {t('featured.perPerson')}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Link to={`/experience/${item.id}`}>
                    <Button variant="outline" size="sm">
                      {t('featured.viewDetails')}
                    </Button>
                  </Link>
                  <Link to={`/booking/${item.id}`}>
                    <Button variant="primary" size="sm">
                      {t('featured.bookNow')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}

