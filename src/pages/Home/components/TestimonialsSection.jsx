import React, { useRef, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { Star, Info, ArrowLeft, ArrowRight, Quote } from 'lucide-react';

/**
 * TestimonialsSection
 * Formatted to mirror the editorial split design with:
 * - Centered social-proof header ("Reviews from real people" + Trust rating)
 * - Left column with large quotation mark, heading, and carousel navigation controls
 * - Right column horizontal stream of speech-bubble cards with bottom tail pointers and author profiles
 */
export default function TestimonialsSection() {
  const { t } = useTranslation('home');
  const scrollContainerRef = useRef(null);
  const [scrollProgress, setScrollProgress] = useState(0);

  // Five curated traveler reviews with Unsplash circular portraits
  const testimonialsData = [
    {
      key: 'testimonial1',
      avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      key: 'testimonial2',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      key: 'testimonial3',
      avatar: 'https://images.unsplash.com/photo-1522529599102-193c0d76b5b6?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      key: 'testimonial4',
      avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&h=200&q=80',
    },
    {
      key: 'testimonial5',
      avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&h=200&q=80',
    },
  ];

  const handleScroll = () => {
    if (!scrollContainerRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll > 0) {
      setScrollProgress(Math.min(1, Math.max(0, scrollLeft / maxScroll)));
    }
  };

  const scrollByDirection = (direction) => {
    if (!scrollContainerRef.current) return;
    const step = 380;
    scrollContainerRef.current.scrollBy({
      left: direction * step,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    handleScroll();
  }, []);

  return (
    <section className="space-y-12 sm:space-y-16">
      {/* 1. Centered Header */}
      <div className="text-center space-y-3.5 max-w-3xl mx-auto">
        <h2 className="font-serif text-3xl sm:text-4xl md:text-5xl font-bold text-charcoal tracking-tight">
          {t('testimonials.headingMain')}
        </h2>

        {/* Trust Score & Rating Bar */}
        <div className="inline-flex flex-wrap items-center justify-center gap-2 text-xs sm:text-sm text-charcoal-muted">
          <span className="font-semibold text-charcoal text-sm sm:text-base">4.9/5</span>
          <div className="flex items-center gap-1 text-emerald-600 font-medium">
            <Star className="w-4 h-4 fill-emerald-600 text-emerald-600" />
            <span className="font-bold tracking-tight text-forest">Trustpilot</span>
          </div>
          <span className="text-charcoal-light">•</span>
          <span>{t('testimonials.trustScore')}</span>
        </div>

        {/* Demo Notice Alert Badge */}
        <div className="pt-1">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium bg-amber-50 text-amber-900 border border-amber-200/80">
            <Info className="w-3.5 h-3.5 text-amber-700 shrink-0" />
            <span>{t('testimonials.demoAlert')}</span>
          </span>
        </div>
      </div>

      {/* 2. Main Content: Left Sidebar + Right Horizontal Carousel */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Quote Icon, Heading and Slider Controls */}
        <div className="lg:col-span-4 xl:col-span-3 flex flex-col justify-between self-stretch space-y-6 pt-2">
          <div className="space-y-4">
            {/* Editorial double quote icon */}
            <div className="w-12 h-12 rounded-2xl bg-stone-light/60 flex items-center justify-center text-charcoal-muted">
              <Quote className="w-7 h-7 text-charcoal-muted/80 fill-charcoal-muted/20" />
            </div>

            {/* Sidebar Title */}
            <h3 className="font-serif text-2xl sm:text-3xl font-bold text-charcoal leading-snug">
              {t('testimonials.sidebarTitle')}
            </h3>
          </div>

          {/* Interactive Navigation Controls (Arrows + Track Slider) */}
          <div className="flex items-center gap-3 pt-4 lg:pt-8">
            <button
              type="button"
              onClick={() => scrollByDirection(-1)}
              disabled={scrollProgress <= 0.05}
              className="w-10 h-10 rounded-full border border-stone bg-white flex items-center justify-center text-charcoal hover:bg-stone-light hover:border-forest/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Anterior testimonio"
            >
              <ArrowLeft className="w-4 h-4" />
            </button>

            {/* Dynamic Progress Track Bar */}
            <div className="relative w-28 h-1.5 bg-stone-light rounded-full overflow-hidden">
              <div
                className="absolute top-0 bottom-0 bg-forest rounded-full transition-all duration-200"
                style={{
                  left: `${scrollProgress * 60}%`,
                  width: '40%',
                }}
              />
            </div>

            <button
              type="button"
              onClick={() => scrollByDirection(1)}
              disabled={scrollProgress >= 0.95}
              className="w-10 h-10 rounded-full border border-stone bg-white flex items-center justify-center text-charcoal hover:bg-stone-light hover:border-forest/40 disabled:opacity-30 disabled:cursor-not-allowed transition-all cursor-pointer shadow-xs active:scale-95"
              aria-label="Siguiente testimonio"
            >
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Right Column: Speech-Bubble Cards Stream */}
        <div className="lg:col-span-8 xl:col-span-9 overflow-hidden">
          <div
            ref={scrollContainerRef}
            onScroll={handleScroll}
            className="flex gap-6 overflow-x-auto scroll-smooth scrollbar-none py-2 pb-6 px-1 cursor-grab active:cursor-grabbing"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {testimonialsData.map(({ key, avatar }) => {
              const quote = t(`testimonials.items.${key}.quote`);
              const author = t(`testimonials.items.${key}.author`);
              const location = t(`testimonials.items.${key}.location`);
              const timeAgo = t(`testimonials.items.${key}.timeAgo`);

              return (
                <div
                  key={key}
                  className="w-[290px] sm:w-[350px] shrink-0 flex flex-col justify-between"
                >
                  {/* Speech Bubble Box with bottom tail pointer */}
                  <div className="relative bg-white rounded-3xl p-6 sm:p-7 border border-stone shadow-xs flex flex-col justify-between min-h-[220px]">
                    <p className="text-sm text-charcoal-muted leading-relaxed line-clamp-5">
                      {quote}
                    </p>

                    {/* 5-star Trustpilot-styled green rating */}
                    <div className="flex items-center gap-1 text-emerald-500 pt-4" aria-label="5 de 5 estrellas">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-emerald-500 text-emerald-500" />
                      ))}
                    </div>

                   
                  </div>

                  {/* Author profile below speech bubble */}
                  <div className="mt-4 flex items-center gap-3.5 pl-3">
                    <img
                      src={avatar}
                      alt={author}
                      className="w-11 h-11 rounded-full object-cover border-2 border-white shadow-xs shrink-0"
                      loading="lazy"
                    />
                    <div className="min-w-0">
                      <p className="font-sans font-bold text-charcoal text-sm truncate">
                        {author}
                      </p>
                      <p className="text-xs text-charcoal-light truncate">
                        {timeAgo} • {location}
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
