import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { ImageIcon, X, ChevronLeft, ChevronRight } from 'lucide-react';

/**
 * ExperienceGallery
 * Responsive editorial photo gallery:
 * - Desktop/tablet mosaic grid
 * - Interactive full-screen lightbox modal with keyboard navigation (Esc, Arrows)
 * - Thumbnails navigation strip
 */
export default function ExperienceGallery({ experience }) {
  const { t } = useTranslation('booking');
  const [activeLightboxIndex, setActiveLightboxIndex] = useState(null);

  // Aggregate all available photos (main + gallery items)
  const allPhotos = [
    experience.mainImage,
    ...(experience.gallery || []),
  ].filter(Boolean);

  // Keyboard controls for lightbox modal
  useEffect(() => {
    if (activeLightboxIndex === null) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        setActiveLightboxIndex(null);
      } else if (e.key === 'ArrowRight') {
        setActiveLightboxIndex((prev) => (prev + 1) % allPhotos.length);
      } else if (e.key === 'ArrowLeft') {
        setActiveLightboxIndex((prev) => (prev - 1 + allPhotos.length) % allPhotos.length);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeLightboxIndex, allPhotos.length]);

  return (
    <section aria-label={t('details.galleryTitle')} className="space-y-2">
      {/* 1. Mosaico Grid */}
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-stone-light border border-stone shadow-xs">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-72 sm:h-96 md:h-[440px]">
          {/* Primary Main Photo */}
          <div
            className={`relative overflow-hidden cursor-pointer group ${
              allPhotos.length > 1 ? 'md:col-span-2 lg:col-span-2' : 'md:col-span-4'
            }`}
            onClick={() => setActiveLightboxIndex(0)}
          >
            <img
              src={allPhotos[0]}
              alt={experience.imageAlt || experience.title}
              className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
          </div>

          {/* Secondary Photos Column */}
          {allPhotos.length > 1 && (
            <div className="hidden md:grid md:col-span-2 grid-cols-2 gap-2">
              {allPhotos.slice(1, 5).map((photoUrl, idx) => (
                <div
                  key={idx}
                  className="relative overflow-hidden cursor-pointer group h-full"
                  onClick={() => setActiveLightboxIndex(idx + 1)}
                >
                  <img
                    src={photoUrl}
                    alt={`${experience.title} - ${idx + 2}`}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors" />
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Button to open full lightbox */}
        <button
          type="button"
          onClick={() => setActiveLightboxIndex(0)}
          className="absolute bottom-3 right-3 sm:bottom-4 sm:right-4 inline-flex items-center gap-1.5 px-3 py-1.5 sm:px-4 sm:py-2 rounded-xl text-xs sm:text-sm font-semibold bg-white/95 hover:bg-white text-forest shadow-md border border-stone backdrop-blur-sm transition-all cursor-pointer"
        >
          <ImageIcon className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-forest" />
          <span>{t('details.viewAllPhotos', { count: allPhotos.length })}</span>
        </button>
      </div>

      {/* 2. Lightbox Modal */}
      {activeLightboxIndex !== null && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex flex-col justify-between p-4 sm:p-6"
        >
          {/* Top Bar: Counter & Close Button */}
          <div className="flex items-center justify-between text-white max-w-6xl mx-auto w-full">
            <span className="text-xs sm:text-sm font-medium tracking-wide">
              {t('details.photoCounter', {
                current: activeLightboxIndex + 1,
                total: allPhotos.length,
              })}
            </span>
            <button
              type="button"
              onClick={() => setActiveLightboxIndex(null)}
              className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors cursor-pointer"
              aria-label={t('details.closeGallery')}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Center: Image & Navigation Arrows */}
          <div className="relative flex items-center justify-center flex-1 max-w-6xl mx-auto w-full my-4">
            {allPhotos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex(
                    (prev) => (prev - 1 + allPhotos.length) % allPhotos.length
                  )
                }
                className="absolute left-2 sm:left-4 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
                aria-label="Foto anterior"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
            )}

            <div className="max-h-[75vh] max-w-full overflow-hidden rounded-xl">
              <img
                src={allPhotos[activeLightboxIndex]}
                alt={`${experience.title} - ${activeLightboxIndex + 1}`}
                className="max-h-[75vh] w-auto object-contain mx-auto"
              />
            </div>

            {allPhotos.length > 1 && (
              <button
                type="button"
                onClick={() =>
                  setActiveLightboxIndex((prev) => (prev + 1) % allPhotos.length)
                }
                className="absolute right-2 sm:right-4 z-10 p-2 sm:p-3 rounded-full bg-black/50 hover:bg-black/80 text-white transition-colors cursor-pointer"
                aria-label="Siguiente foto"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            )}
          </div>

          {/* Bottom Bar: Thumbnails preview */}
          {allPhotos.length > 1 && (
            <div className="flex items-center justify-center gap-2 overflow-x-auto py-2 max-w-4xl mx-auto">
              {allPhotos.map((thumb, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => setActiveLightboxIndex(idx)}
                  className={`w-14 h-14 rounded-lg overflow-hidden border-2 transition-all cursor-pointer ${
                    activeLightboxIndex === idx
                      ? 'border-sand-gold scale-105'
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={thumb}
                    alt={`Thumbnail ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      )}
    </section>
  );
}

