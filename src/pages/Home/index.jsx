import React from 'react';
import { useTranslation } from 'react-i18next';
import { Compass, Sparkles, MapPin, ArrowRight, Clock, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';
import { getFeaturedExperiences } from '../../data/experiences';
import { useBusinessConfig } from '../../hooks/useBusinessConfig';
import { formatCurrency } from '../../utils/formatters';
import { Button, Card, Badge } from '../../components/common';

export default function Home() {
  const { t, i18n } = useTranslation(['home', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const localizedConfig = useBusinessConfig();
  const featuredExperiences = getFeaturedExperiences(currentLang);

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      {/* Hero section */}
      <section className="text-center pt-8 pb-12 sm:pt-16 sm:pb-20 max-w-4xl mx-auto">
        <div className="inline-flex items-center gap-2 mb-6">
          <Badge variant="forest" size="md" icon={<Compass className="w-3.5 h-3.5" />}>
            {localizedConfig.tagline}
          </Badge>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-forest tracking-tight leading-[1.1] mb-6">
          {t('hero.titlePart1')} <br className="hidden sm:inline" />
          <span className="italic font-normal">{t('hero.titlePart2')}</span>
        </h1>

        <p className="max-w-2xl mx-auto text-base sm:text-lg text-charcoal-muted mb-10 font-normal leading-relaxed">
          {localizedConfig.description}
        </p>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/explore" className="w-full sm:w-auto">
            <Button
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('hero.ctaExplore')}
            </Button>
          </Link>
          <a href="#featured" className="w-full sm:w-auto">
            <Button variant="secondary" size="lg" className="w-full sm:w-auto">
              {t('hero.ctaFeatured')}
            </Button>
          </a>
        </div>
      </section>

      {/* Featured Section */}
      <section id="featured" className="space-y-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-stone pb-6">
          <div>
            <span className="text-xs font-semibold uppercase tracking-wider text-sand-gold-dark">
              {t('labels.curatedSelection')}
            </span>
            <h2 className="font-serif text-3xl sm:text-4xl font-bold text-forest mt-1">
              {t('featured.title')}
            </h2>
          </div>
          <Link to="/explore">
            <Button variant="ghost" size="sm" rightIcon={<ArrowRight className="w-3.5 h-3.5" />}>
              {t('actions.exploreAll')}
            </Button>
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {featuredExperiences.map((item) => (
            <Card key={item.id} hoverEffect className="flex flex-col justify-between overflow-hidden group">
              {item.mainImage && (
                <div className="relative h-48 w-full overflow-hidden bg-stone-light">
                  <img
                    src={item.mainImage}
                    alt={item.imageAlt || item.title}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute top-3 left-3">
                    <Badge variant="gold" size="sm" icon={<Sparkles className="w-3 h-3" />}>
                      {item.category}
                    </Badge>
                  </div>
                </div>
              )}

              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between">
                <div>
                  <div className="flex items-center justify-between text-xs text-charcoal-muted mb-3">
                    <span className="flex items-center gap-1 font-medium text-forest">
                      <MapPin className="w-3.5 h-3.5 text-forest/70" /> {item.location}
                    </span>
                    <span className="flex items-center gap-1 text-charcoal-light">
                      <Clock className="w-3.5 h-3.5" /> {item.duration}
                    </span>
                  </div>

                  <h3 className="font-serif text-xl sm:text-2xl font-bold text-charcoal mb-2.5">
                    {item.title}
                  </h3>
                  <p className="text-sm text-charcoal-muted leading-relaxed mb-6 line-clamp-3">
                    {item.shortDescription}
                  </p>
                </div>

                <div className="pt-4 border-t border-stone flex items-center justify-between">
                  <div>
                    <span className="block text-[11px] uppercase tracking-wider text-charcoal-light">
                      {t('labels.from')}
                    </span>
                    <span className="font-serif text-lg font-bold text-forest">
                      {formatCurrency(item.price, item.currency, currentLang)}
                      <span className="font-sans text-xs text-charcoal-muted font-normal">
                        {' '}{t('labels.perPerson')}
                      </span>
                    </span>
                  </div>
                  <Link to={`/experience/${item.id}`}>
                    <Button variant="outline" size="sm">
                      {t('actions.viewDetails')}
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </section>

      {/* Brand Values */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 py-8 border-y border-stone">
        <div className="p-6 rounded-xl bg-white/60 border border-stone">
          <div className="p-2.5 w-fit rounded-lg bg-forest-subtle text-forest mb-4">
            <Sparkles className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest mb-2">
            {t('values.curationTitle')}
          </h3>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            {t('values.curationDesc')}
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white/60 border border-stone">
          <div className="p-2.5 w-fit rounded-lg bg-forest-subtle text-forest mb-4">
            <Clock className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest mb-2">
            {t('values.bookingTitle')}
          </h3>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            {t('values.bookingDesc')}
          </p>
        </div>
        <div className="p-6 rounded-xl bg-white/60 border border-stone">
          <div className="p-2.5 w-fit rounded-lg bg-forest-subtle text-forest mb-4">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <h3 className="font-serif text-lg font-bold text-forest mb-2">
            {t('values.customTitle')}
          </h3>
          <p className="text-sm text-charcoal-muted leading-relaxed">
            {t('values.customDesc')}
          </p>
        </div>
      </section>
    </div>
  );
}
