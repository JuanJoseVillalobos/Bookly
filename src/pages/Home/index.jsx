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
    <div className="py-6 sm:py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-16 sm:space-y-24">
      <HeroSection />
      <FeaturedSection />
      <CategoriesSection />
      <BenefitsSection />
      <TestimonialsSection />
      <CtaSection />
    </div>
  );
}
