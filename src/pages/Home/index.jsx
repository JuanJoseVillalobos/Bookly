import React from 'react';
import {
  HeroSection,
  FeaturedSection,
  CategoriesSection,
  BenefitsSection,
  TestimonialsSection,
  CtaSection,
} from './components';

export default function Home() {
  return (
    <div className="w-full space-y-16 sm:space-y-24 pb-16 sm:pb-24">
      {/* Full-width Hero Section spanning 100% of the screen */}
      <HeroSection />

      {/* Contained catalog & discovery sections */}
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
        <FeaturedSection />
        <CategoriesSection />
        <BenefitsSection />
        <TestimonialsSection />
        <CtaSection />
      </div>
    </div>
  );
}
