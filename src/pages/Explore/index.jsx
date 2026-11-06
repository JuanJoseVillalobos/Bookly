import React, { useMemo } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Compass,
  Sparkles,
  Search,
  X,
  RotateCcw,
  ArrowLeft,
  SlidersHorizontal,
} from 'lucide-react';
import { experiences, getLocalizedExperience, getAvailableCategories } from '../../data/experiences';
import { ExperienceCard } from '../../components/experience';
import { Badge, Button } from '../../components/common';

/**
 * Explore (Catalog Page)
 *
 * Primary discovery catalog with full search and filtering functionality:
 * - Real-time free text search by experience title and geographic location.
 * - Categorical pill filters synced with URL search parameters.
 * - Price tier filtering (under $70, $70-$100, over $100).
 * - Sorting options (featured, price asc/desc, rating).
 * - Interactive active filter tags with individual and global clear actions.
 * - Contextual results counter ("Mostrando X de Y experiencias").
 * - Responsive empty state with one-click filter reset.
 * - Complete bilingual support (ES/EN) and responsive layout.
 */
export default function Explore() {
  const { t, i18n } = useTranslation(['booking', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const [searchParams, setSearchParams] = useSearchParams();

  // Read active query parameters
  const searchQuery = searchParams.get('q') || '';
  const activeCategory = searchParams.get('category') || 'all';
  const activePrice = searchParams.get('price') || 'all';
  const activeSort = searchParams.get('sort') || 'featured';

  // Categories available in catalog
  const categories = useMemo(() => {
    return [
      { id: 'all', name: t('explore.filterAll', 'Todas') },
      ...getAvailableCategories(currentLang),
    ];
  }, [currentLang, t]);

  // Price range options
  const priceOptions = [
    { value: 'all', label: t('explore.priceAll', 'Todos los precios') },
    { value: 'under-70', label: t('explore.priceUnder70', 'Hasta USD 70') },
    { value: '70-100', label: t('explore.price70to100', 'USD 70 a USD 100') },
    { value: 'over-100', label: t('explore.priceOver100', 'Más de USD 100') },
  ];

  // Sorting options
  const sortOptions = [
    { value: 'featured', label: t('explore.sortFeatured', 'Destacadas primero') },
    { value: 'price-asc', label: t('explore.sortPriceAsc', 'Precio: menor a mayor') },
    { value: 'price-desc', label: t('explore.sortPriceDesc', 'Precio: mayor a menor') },
    { value: 'rating', label: t('explore.sortRating', 'Mejor calificación') },
  ];

  // Helper to update specific search params
  const updateParam = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (!value || value === 'all' || (key === 'sort' && value === 'featured')) {
      newParams.delete(key);
    } else {
      newParams.set(key, value);
    }
    setSearchParams(newParams);
  };

  // Reset all filters simultaneously
  const handleResetAll = () => {
    setSearchParams({});
  };

  // Filter and sort experiences
  const allLocalized = useMemo(() => {
    return experiences.map((item) => getLocalizedExperience(item, currentLang));
  }, [currentLang]);

  const filteredExperiences = useMemo(() => {
    const trimmed = searchQuery.trim().toLowerCase();

    return allLocalized
      .filter((exp) => {
        // 1. Category Filter
        if (activeCategory !== 'all' && exp.categoryId !== activeCategory) {
          return false;
        }

        // 2. Price Tier Filter
        if (activePrice === 'under-70' && exp.price >= 70) {
          return false;
        }
        if (activePrice === '70-100' && (exp.price < 70 || exp.price > 100)) {
          return false;
        }
        if (activePrice === 'over-100' && exp.price <= 100) {
          return false;
        }

        // 3. Search query: matches Title, City, Region, or Tagline
        if (trimmed) {
          const inTitle = exp.title.toLowerCase().includes(trimmed);
          const inCity = exp.location.toLowerCase().includes(trimmed);
          const inRegion = exp.locationFull?.toLowerCase().includes(trimmed);
          const inTagline = exp.tagline?.toLowerCase().includes(trimmed);
          const inShortDesc = exp.shortDescription?.toLowerCase().includes(trimmed);

          if (!inTitle && !inCity && !inRegion && !inTagline && !inShortDesc) {
            return false;
          }
        }

        return true;
      })
      .sort((a, b) => {
        // 4. Sorting logic
        if (activeSort === 'price-asc') return a.price - b.price;
        if (activeSort === 'price-desc') return b.price - a.price;
        if (activeSort === 'rating') return (b.rating || 0) - (a.rating || 0);
        // Default: featured first, then rating
        if (b.featured !== a.featured) return b.featured ? 1 : -1;
        return (b.rating || 0) - (a.rating || 0);
      });
  }, [allLocalized, searchQuery, activeCategory, activePrice, activeSort]);

  // Check if any filter is currently applied
  const hasActiveFilters = Boolean(
    searchQuery.trim() || activeCategory !== 'all' || activePrice !== 'all' || activeSort !== 'featured'
  );

  return (
    <div className="py-8 sm:py-12 lg:py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-8 sm:space-y-10">
      {/* 1. Header Section */}
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

        {/* Dynamic Contextual Results Counter */}
        <div className="shrink-0">
          <span className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold bg-white border border-stone text-forest shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-sand-gold-dark" />
            <span>
              {t('explore.resultsCount', {
                count: filteredExperiences.length,
                total: allLocalized.length,
              })}
            </span>
          </span>
        </div>
      </div>

      {/* 2. Interactive Search & Filters Control Panel */}
      <div className="p-4 sm:p-6 bg-white rounded-2xl sm:rounded-3xl border border-stone shadow-xs space-y-5">
        {/* Row A: Search Input Bar + Dropdown Filters */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3.5 items-center">
          {/* Free text search bar (by name or location) */}
          <div className="md:col-span-6 lg:col-span-6 relative">
            <label htmlFor="explore-search-input" className="sr-only">
              {t('explore.searchLabel')}
            </label>
            <div className="relative flex items-center">
              <Search className="w-4 h-4 text-charcoal-muted absolute left-3.5 pointer-events-none" />
              <input
                id="explore-search-input"
                type="text"
                value={searchQuery}
                onChange={(e) => updateParam('q', e.target.value)}
                placeholder={t('explore.searchPlaceholder')}
                className="w-full pl-10 pr-10 py-2.5 rounded-xl border border-stone text-sm text-charcoal placeholder:text-charcoal-light/80 bg-stone-light/30 focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => updateParam('q', '')}
                  className="absolute right-3 text-charcoal-light hover:text-charcoal p-1 rounded-full transition-colors cursor-pointer"
                  aria-label={t('explore.clearSearch')}
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>

          {/* Price Bracket Filter */}
          <div className="md:col-span-3 lg:col-span-3">
            <label htmlFor="explore-price-filter" className="sr-only">
              {t('explore.priceLabel')}
            </label>
            <div className="relative flex items-center">
              <select
                id="explore-price-filter"
                value={activePrice}
                onChange={(e) => updateParam('price', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone text-sm text-charcoal bg-stone-light/30 hover:bg-stone-light/50 focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all cursor-pointer"
              >
                {priceOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Sort By Filter */}
          <div className="md:col-span-3 lg:col-span-3">
            <label htmlFor="explore-sort-filter" className="sr-only">
              {t('explore.sortLabel')}
            </label>
            <div className="relative flex items-center">
              <select
                id="explore-sort-filter"
                value={activeSort}
                onChange={(e) => updateParam('sort', e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-stone text-sm text-charcoal bg-stone-light/30 hover:bg-stone-light/50 focus:bg-white focus:outline-none focus:border-forest focus:ring-2 focus:ring-forest/15 transition-all cursor-pointer"
              >
                {sortOptions.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Row B: Category Pills + Reset Action */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-1 border-t border-stone/60">
          {/* Category Tabs */}
          <div
            className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none max-w-full"
            role="tablist"
            aria-label="Filtro de categorías"
          >
            {categories.map((cat) => {
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => updateParam('category', cat.id)}
                  className={`shrink-0 px-3.5 py-1.5 rounded-full text-xs font-medium transition-all duration-150 cursor-pointer ${
                    isActive
                      ? 'bg-forest text-ivory shadow-xs'
                      : 'bg-stone-light/60 text-charcoal hover:bg-stone hover:text-forest'
                  }`}
                >
                  {cat.name}
                </button>
              );
            })}
          </div>

          {/* Reset all filters button */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={handleResetAll}
              className="inline-flex items-center gap-1.5 text-xs font-semibold text-charcoal-muted hover:text-forest transition-colors py-1 cursor-pointer shrink-0"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>{t('explore.resetAll')}</span>
            </button>
          )}
        </div>

        {/* Row C: Active Filter Chips */}
        {hasActiveFilters && (
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-stone/50 text-xs">
            <span className="text-charcoal-light font-medium flex items-center gap-1">
              <SlidersHorizontal className="w-3 h-3" />
              <span>{t('explore.activeFilters')}</span>
            </span>

            {/* Active search chip */}
            {searchQuery && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-subtle text-forest font-medium border border-forest/15">
                <span>"{searchQuery}"</span>
                <button
                  type="button"
                  onClick={() => updateParam('q', '')}
                  className="hover:text-forest-dark cursor-pointer"
                  aria-label="Eliminar filtro de búsqueda"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active category chip */}
            {activeCategory !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-forest-subtle text-forest font-medium border border-forest/15">
                <span>
                  {categories.find((c) => c.id === activeCategory)?.name || activeCategory}
                </span>
                <button
                  type="button"
                  onClick={() => updateParam('category', 'all')}
                  className="hover:text-forest-dark cursor-pointer"
                  aria-label="Eliminar filtro de categoría"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active price chip */}
            {activePrice !== 'all' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-sand-gold-subtle text-sand-gold-dark font-medium border border-sand-gold/25">
                <span>
                  {priceOptions.find((p) => p.value === activePrice)?.label || activePrice}
                </span>
                <button
                  type="button"
                  onClick={() => updateParam('price', 'all')}
                  className="hover:text-sand-gold-dark cursor-pointer"
                  aria-label="Eliminar filtro de precio"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}

            {/* Active sort chip (if custom) */}
            {activeSort !== 'featured' && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-stone-light text-charcoal font-medium border border-stone">
                <span>
                  {sortOptions.find((s) => s.value === activeSort)?.label || activeSort}
                </span>
                <button
                  type="button"
                  onClick={() => updateParam('sort', 'featured')}
                  className="hover:text-charcoal cursor-pointer"
                  aria-label="Restablecer orden"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            )}
          </div>
        )}
      </div>

      {/* 3. Catalog Grid or Responsive Empty State */}
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
              onClick={handleResetAll}
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
