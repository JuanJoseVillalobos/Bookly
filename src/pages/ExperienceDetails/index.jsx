import React from 'react';
import { useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getExperienceById } from '../../data/experiences';
import {
  ExperienceNotFound,
  ExperienceHeader,
  ExperienceGallery,
  ExperienceHighlights,
  ExperienceInclusions,
  ExperienceAvailability,
  ExperienceBookingCard,
} from './components';

/**
 * ExperienceDetails Page
 *
 * Orchestrates the tour detail page using specialized components:
 * - ExperienceNotFound: Fallback state for invalid or unlisted identifiers.
 * - ExperienceHeader: Breadcrumbs, tags, title, tagline, and metadata chips.
 * - ExperienceGallery: Editorial photo grid and interactive modal lightbox.
 * - ExperienceHighlights: Curated key features with accent badges.
 * - ExperienceInclusions: Dual list of included and not included amenities.
 * - ExperienceAvailability: Clearly marked illustrative operating season, days, and time slots.
 * - ExperienceBookingCard: Sticky booking sidebar with price breakdown and CTA.
 */
export default function ExperienceDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation('booking');
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  const experience = getExperienceById(id, currentLang);

  if (!experience) {
    return <ExperienceNotFound />;
  }

  const includedItems = experience.included?.length > 0
    ? experience.included
    : (t('details.includes', { returnObjects: true }) || []);

  const notIncludedItems = experience.notIncluded || [];

  return (
    <div className="py-6 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* 1. Breadcrumbs, Badges, Title & Metadata */}
      <ExperienceHeader experience={experience} currentLang={currentLang} />

      {/* 2. Photo Gallery & Lightbox */}
      <ExperienceGallery experience={experience} />

      {/* 3. Main Content Columns */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
        {/* Left Column: Editorial Information (8 cols) */}
        <div className="lg:col-span-8 space-y-8 sm:space-y-10">
          {/* Description Section */}
          <section className="space-y-4">
            <h2 className="font-serif text-2xl font-bold text-forest border-b border-stone/80 pb-3">
              {t('details.aboutTitle')}
            </h2>
            <p className="text-base sm:text-lg text-charcoal leading-relaxed whitespace-pre-line">
              {experience.description || experience.shortDescription}
            </p>
          </section>

          {/* Highlights */}
          <ExperienceHighlights highlights={experience.highlights} />

          {/* Inclusions & Exclusions */}
          <ExperienceInclusions
            includedItems={includedItems}
            notIncludedItems={notIncludedItems}
          />

          {/* Illustrative Availability */}
          <ExperienceAvailability
            experience={experience}
            currentLang={currentLang}
          />
        </div>

        {/* Right Column: Sticky Booking CTA Card (4 cols) */}
        <ExperienceBookingCard
          experience={experience}
          currentLang={currentLang}
        />
      </div>
    </div>
  );
}
