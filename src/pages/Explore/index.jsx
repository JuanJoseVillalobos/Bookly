import React, { useState, useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Compass, Sparkles, Filter, RotateCcw, ArrowLeft } from 'lucide-react';
import { experiences, getLocalizedExperience, getAvailableCategories } from '../../data/experiences';
import { ExperienceCard, ExperienceSkeleton } from '../../components/experience';
import { Badge, Button } from '../../components/common';

/**
 * Explore (Catalog Page)
 *
 * Primary exploration catalog for Bookly:
 * - Displays all experiences defined in centralized mock data.
 * - Modular ExperienceCard reusable components with consistent aspect ratios and commercial data.
 * - Interactive category filtering synced with URL search params (?category=...).
 * - Empty state when no experiences match filters.
 * - Loading state support with skeleton placeholders.
 * - Full bilingual support (ES/EN) and responsive grid layout.
 */
export default function Explore() {
  const { t, i18n } = useTranslation(['booking', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const [searchParams, setSearchParams] = useSearchParams();

  // Read active category from query params or default to 'all'
  const activeCategory = searchParams.get('category') || 'all';
  const searchQuery = searchParams.get('q') || '';

  // Localized categories available in mock data
  const categories = useMemo(() => {
    return [
      { id: 'all', name: t('explore.filterAll', 'Todas') },
      ...getAvailableCategories(currentLang),
    ];
  }, [currentLang, t]);

  // Filter experiences according to activeCategory and optional search query
  const filteredExperiences = useMemo(() => {
    return experiences
      .map((item) => getLocalizedExperience(item, currentLang))
      .filter((exp) => {
        // Category filter
        if (activeCategory !== 'all' && exp.categoryId !== activeCategory) {
          return false;
        }
        // Search query filter
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase().trim();
          const matchesTitle = exp.title.toLowerCase().includes(q);
          const matchesLoc = exp.location.toLowerCase().includes(q);
          const matchesCat = exp.category.toLowerCase().includes(q);
          if (!matchesTitle && !matchesLoc && !matchesCat) {
            return false;
          }
        }
        return true;
      });
  }, [activeCategory, searchQuery, currentLang]);

  const handleSelectCategory = (categoryId) => {
    const newParams = new URLSearchParams(searchParams);
    if (categoryId === 'all') {
      newParams.delete('category');
    } else {
      newParams.set('category', categoryId);
    }
    setSearchParams(newParams);
  };

  const handleResetFilters = () => {
    setSearchParams({});
  };

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* 1. Header & Title Section */}
      <div className="border-b border-stone pb-6 sm:pb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div className="max-w-3xl space-y-2.5">
          <Badge variant="gold" size="sm" icon={<Compass className="w-3.5 h-3.5" />}>
            {t('explore.tag')}
          </Badge>

          <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-forest tracking-tight">
            {t('explore.title')}
          </h1>

          <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed max-w-2xl">
            {t('explore.subtitle')}
          </p>
        </div>

        {/* Counter indicator */}
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium bg-white border border-stone text-charcoal-muted shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sand-gold-dark" />
            <span>
              {t('explore.counter', { count: filteredExperiences.length })}
            </span>
          </span>
        </div>
      </div>

      {/* 2. Interactive Category Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none" role="tablist" aria-label="Filtro de categorías">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              role="tab"
              aria-selected={isActive}
              onClick={() => handleSelectCategory(cat.id)}
              className={`shrink-0 px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all duration-150 cursor-pointer ${
                isActive
                  ? 'bg-forest text-ivory shadow-xs'
                  : 'bg-white text-charcoal border border-stone hover:bg-stone-light/70 hover:border-forest/30'
              }`}
            >
              {cat.name}
            </button>
          );
        })}

        {/* Clear filters pill if any filter active */}
        {(activeCategory !== 'all' || searchQuery) && (
          <button
            type="button"
            onClick={handleResetFilters}
            className="shrink-0 inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs text-charcoal-muted hover:text-forest transition-colors ml-2"
          >
            <RotateCcw className="w-3 h-3" />
            <span>{t('explore.empty.action', 'Ver todo')}</span>
          </button>
        )}
      </div>

      {/* 3. Catalog Content: Grid or Empty State */}
      {filteredExperiences.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredExperiences.map((experience) => (
            <ExperienceCard
              key={experience.id}
              experience={experience}
              imageAspect="aspect-[16/10]"
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="py-16 sm:py-24 px-6 text-center max-w-lg mx-auto bg-white rounded-3xl border border-stone shadow-xs space-y-6">
          <div className="w-16 h-16 mx-auto rounded-2xl bg-stone-light flex items-center justify-center text-charcoal-light">
            <Compass className="w-8 h-8 text-charcoal-muted" />
          </div>

          <div className="space-y-2">
            <h2 className="font-serif text-2xl font-bold text-forest">
              {t('explore.empty.title')}
            </h2>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              {t('explore.empty.description')}
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Button
              variant="primary"
              size="md"
              onClick={handleResetFilters}
              leftIcon={<RotateCcw className="w-4 h-4" />}
            >
              {t('explore.empty.action')}
            </Button>
            <Link to="/">
              <Button
                variant="secondary"
                size="md"
                leftIcon={<ArrowLeft className="w-4 h-4" />}
              >
                {t('explore.empty.backHome')}
              </Button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
