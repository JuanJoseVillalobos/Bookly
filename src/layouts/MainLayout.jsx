import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Navbar, Footer } from '../components/layout';
import { useBusinessConfig } from '../hooks/useBusinessConfig';
import { applyBusinessBranding } from '../config/businessConfig';

/**
 * MainLayout
 * Central shared layout structure for Bookly.
 * Integrates the responsive Navbar, accessible main content wrapper, Footer,
 * and applies centralized branding and document metadata from businessConfig.
 */
export default function MainLayout() {
  const { t } = useTranslation('common');
  const business = useBusinessConfig();

  // Apply branding CSS variables and sync document title
  useEffect(() => {
    applyBusinessBranding(business);
    if (typeof document !== 'undefined') {
      document.title = business.tagline
        ? `${business.name} — ${business.tagline}`
        : business.name;
    }
  }, [business]);

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal overflow-x-clip selection:bg-sand-gold/30 selection:text-forest">
      {/* Skip to content link for keyboard and screen reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest focus:text-ivory focus:rounded-lg focus:shadow-md"
      >
        {t('navigation.skipToContent')}
      </a>

      {/* Global Navigation Header */}
      <Navbar />

      {/* Main Page Container */}
      <main id="main-content" className="flex-1 w-full">
        <Outlet />
      </main>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
