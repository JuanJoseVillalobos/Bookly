import React, { useState, useEffect, useRef } from 'react';
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

const CLOUDINARY_VIDEO_URL =
  'https://res.cloudinary.com/dpz9rhz0u/video/upload/v1793893918/18210852-uhd_2560_1440_24fps_gruspj.mp4';
const CLOUDINARY_POSTER_URL =
  'https://res.cloudinary.com/dpz9rhz0u/video/upload/v1793893918/18210852-uhd_2560_1440_24fps_gruspj.jpg';
const CLOUDINARY_MOBILE_IMG_URL =
  'https://res.cloudinary.com/dpz9rhz0u/video/upload/c_scale,w_800,q_auto,f_auto/v1793893918/18210852-uhd_2560_1440_24fps_gruspj.jpg';

/**
 * HeroSection
 * Primary visual entrance for Bookly Landing Page.
 *
 * Optimization & Responsive Behavior:
 * - Desktop & Tablet (>= 768px): The video element is rendered across 100% of the HeroSection width
 *   in a dedicated stacking context (isolate + z-0), with explicit autoplay handling and instant poster fallback.
 * - Mobile (< 768px): The video tag is completely omitted from the DOM to prevent downloading
 *   the 23.5 MB file, rendering a lightweight optimized static image instead (~41 KB).
 */
export default function HeroSection() {
  const { t } = useTranslation(['home', 'common']);
  const business = useBusinessConfig();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  // Synchronously initialize tablet/desktop breakpoint (md = 768px)
  const [isTabletOrDesktop, setIsTabletOrDesktop] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.innerWidth >= 768;
    }
    return false;
  });

  const videoRef = useRef(null);

  // Keep screen size listener in sync
  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    setIsTabletOrDesktop(mediaQuery.matches);

    const handleMediaChange = (e) => {
      setIsTabletOrDesktop(e.matches);
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleMediaChange);
      return () => mediaQuery.removeEventListener('change', handleMediaChange);
    } else {
      mediaQuery.addListener(handleMediaChange);
      return () => mediaQuery.removeListener(handleMediaChange);
    }
  }, []);

  // Guarantee autoplay execution once video is loaded and ready
  useEffect(() => {
    if (!isTabletOrDesktop) return;

    const video = videoRef.current;
    if (!video) return;

    // Force required DOM properties for browser autoplay approval
    video.defaultMuted = true;
    video.muted = true;
    video.setAttribute('muted', '');
    video.setAttribute('playsinline', '');
    video.setAttribute('autoplay', '');

    const playVideo = () => {
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Poster image automatically serves as graceful fallback
        });
      }
    };

    if (video.readyState >= 2) {
      playVideo();
    } else {
      video.addEventListener('canplay', playVideo, { once: true });
      video.addEventListener('loadeddata', playVideo, { once: true });
    }
  }, [isTabletOrDesktop]);

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
    <section className="relative isolate w-full overflow-hidden py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center shadow-md bg-charcoal">
      {/* Background Media Container (stays within section stacking context at z-0) */}
      <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
        {isTabletOrDesktop ? (
          <video
            ref={videoRef}
            src={CLOUDINARY_VIDEO_URL}
            autoPlay
            loop
            muted
            playsInline
            preload="auto"
            poster={CLOUDINARY_POSTER_URL}
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
          >
            <source src={CLOUDINARY_VIDEO_URL} type="video/mp4" />
          </video>
        ) : (
          /* Mobile only: lightweight static image (~41KB). 0 video bytes downloaded */
          <img
            src={CLOUDINARY_MOBILE_IMG_URL}
            alt="Paisaje andino de Jujuy"
            className="absolute inset-0 w-full h-full object-cover pointer-events-none"
            loading="eager"
          />
        )}

        {/* Contrast overlay so text is clearly legible */}
        <div
          className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/55 to-forest-dark/80"
          aria-hidden="true"
        />
      </div>

      {/* Foreground Content (elevated at z-10) */}
      <div className="relative z-10 max-w-4xl mx-auto space-y-8">
        {/* Business tagline badge */}
        <div className="inline-flex items-center gap-2">
          <Badge
            variant="gold"
            size="md"
            icon={<Compass className="w-3.5 h-3.5 text-sand-gold-light" />}
            className="bg-black/50 text-sand-gold-light border-sand-gold/40 backdrop-blur-md"
          >
            {business.tagline || t('hero.badge')}
          </Badge>
        </div>

        {/* Main Editorial Headline with high contrast */}
        <h1 className="font-serif text-4xl sm:text-6xl lg:text-7xl font-bold text-ivory tracking-tight leading-[1.1] drop-shadow-md">
          {t('hero.titlePart1')}{' '}
          <span className="italic font-normal block sm:inline text-sand-gold-light">
            {t('hero.titlePart2')}
          </span>
        </h1>

        {/* Lead description */}
        <p className="max-w-2xl mx-auto text-base sm:text-lg text-ivory/90 font-normal leading-relaxed drop-shadow-xs">
          {business.description || t('hero.subtitle')}
        </p>

        {/* Interactive Quick Search Bar */}
        <div className="max-w-xl mx-auto pt-2">
          <form
            onSubmit={handleSearchSubmit}
            className="flex flex-col sm:flex-row items-center gap-2.5 p-2 bg-white/95 backdrop-blur-md rounded-2xl border border-white/40 shadow-xl focus-within:border-sand-gold focus-within:ring-2 focus-within:ring-sand-gold/30 transition-all"
            role="search"
            aria-label={t('hero.searchPlaceholder')}
          >
            <div className="relative flex-1 w-full flex items-center pl-3">
              <Search className="w-4 h-4 text-charcoal-muted shrink-0 mr-2" aria-hidden="true" />
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
              variant="accent"
              size="md"
              className="w-full sm:w-auto shrink-0 shadow-sm"
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
              variant="accent"
              size="lg"
              className="w-full sm:w-auto shadow-md font-semibold"
              rightIcon={<ArrowRight className="w-4 h-4" />}
            >
              {t('hero.ctaExplore')}
            </Button>
          </Link>
          <a href="#featured" className="w-full sm:w-auto">
            <Button
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto bg-white/20 text-ivory border-white/30 hover:bg-white/30 active:bg-white/40 backdrop-blur-md shadow-md"
            >
              {t('hero.ctaFeatured')}
            </Button>
          </a>
        </div>

        {/* Editorial Trust Highlights / Stats */}
        <div className="pt-8 sm:pt-10 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-white/20 text-left">
          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 shadow-sm">
            <div className="p-2 rounded-lg bg-sand-gold/20 text-sand-gold-light shrink-0">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-serif font-bold text-ivory">100%</p>
              <p className="text-xs text-ivory/80">{t('hero.stats.curated')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 shadow-sm">
            <div className="p-2 rounded-lg bg-sand-gold/20 text-sand-gold-light shrink-0">
              <Star className="w-4 h-4 fill-sand-gold-light text-sand-gold-light" />
            </div>
            <div>
              <p className="text-base font-serif font-bold text-ivory">4.9 / 5.0</p>
              <p className="text-xs text-ivory/80">{t('hero.stats.rating')}</p>
            </div>
          </div>

          <div className="flex items-center gap-3.5 p-3.5 rounded-xl bg-black/45 backdrop-blur-md border border-white/15 shadow-sm">
            <div className="p-2 rounded-lg bg-white/15 text-sand-gold-light shrink-0">
              <ShieldCheck className="w-4 h-4" />
            </div>
            <div>
              <p className="text-base font-serif font-bold text-ivory">Direct & Safe</p>
              <p className="text-xs text-ivory/80">{t('hero.stats.direct')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
