import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Compass,
  ArrowRight,
  Search,
  Sparkles,
  Star,
  ShieldCheck,
} from 'lucide-react';
import { useBusinessConfig } from '../../../hooks/useBusinessConfig';
import { Button, Badge } from '../../../components/common';

/**
 * HeroSection
 * Primary visual entrance for Bookly Landing Page.
 * Showcases commercial identity, tagline, value proposition, quick search and direct CTAs to /explore.
 */
export default function HeroSection() {
  const { t } = useTranslation(['home', 'common']);
  const business = useBusinessConfig();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    const trimmed = searchQuery.trim();
    if (trimmed) {
      navigate(`/explore?q=${encodeURIComponent(trimmed)}`);
    } else {
      navigate('/explore');
    }
  };

  return (
    <section className="relative pt-6 pb-14 sm:pt-12 sm:pb-20 text-center">
      {/* Background ambient decorative radial glow */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-4xl h-80 bg-sand-gold/10 rounded-full blur-3xl pointer-events-none -z-10"
        aria-hidden="true"
      />

      <div className="max-w-4xl mx-auto space-y-8">
        {/* Business tagline badge */}
        <div className="inline-flex items-center gap-2">
          <Badge variant="forest" size="md" icon={<Compass className="w-3.5 h-3.5" />}>
            {business.tagline || t('hero.badge')}
          </Badge>
        </div>

        {/* Main Editorial Headline */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-forest tracking-tight leading-[1.1]">
          {t('hero.titlePart1')}{' '}
          <span className="italic font-normal block sm:inline text-sand-gold-dark">
            {t('hero.titlePart2')}
          </span>
        </h1>

        {/* Lead description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-charcoal-muted font-normal leading-relaxed">
          {business.description || t('hero.subtitle')}
        </p>

        {/* Interactive Quick Search Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-center gap-2.5 p-2 bg-white rounded-2xl border border-stone shadow-sm hover:border-forest/30 focus-within:border-forest focus-within:ring-2 focus-within:ring-forest/15 transition-all"
            role="search"
            aria-label={t('hero.searchPlaceholder')}
          >
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Search className="w-4 h-4 text-charcoal-light shrink-0 mr-2" aria-hidden="true" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t('hero.searchPlaceholder')}
                className="w-full text-sm text-charcoal placeholder:text-charcoal-light bg-transparent border-0 focus:outline-none"
              />
            </div>
            <Button
              type="submit"
              variant="primary"
              size="md"
              className="w-full sm:w-auto shrink-0"
              rightIcon={<ArrowRight className="w-3.5 h-3.5" />}
            >
              {t('hero.searchButton')}
            </Button>
          </form>
        </div>

        {/* Direct Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
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

        {/* Editorial Trust Highlights / Stats */}
        <div className="pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-stone/80 text-left">
          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/40 border border-stone/60">
            <div className="p-2 rounded-lg bg-sand-gold/15 text-sand-gold-dark shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-serif font-bold text-forest">100%</p>
              <p className="text-xs text-charcoal-muted">{t('hero.stats.curated')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/40 border border-stone/60">
            <div className="p-2 rounded-lg bg-sand-gold/15 text-sand-gold-dark shrink-0">
              <Star className="w-4 h-4 fill-sand-gold-dark text-sand-gold-dark" />
            </div>
            <div>
              <p className="text-base font-serif font-bold text-forest">4.9 / 5.0</p>
              <p className="text-xs text-charcoal-muted">{t('hero.stats.rating')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3 rounded-xl bg-white/40 border border-stone/60">
            <div className="p-2 rounded-lg bg-forest/10 text-forest shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-serif font-bold text-forest">Direct & Safe</p>
              <p className="text-xs text-charcoal-muted">{t('hero.stats.direct')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

