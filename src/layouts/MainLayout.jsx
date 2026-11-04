import React from 'react';
import { Outlet } from 'react-router-dom';
import { Navbar, Footer } from '../components/layout';

/**
 * MainLayout
 * Central shared layout structure for Bookly.
 * Integrates the responsive Navbar, accessible main content wrapper, and Footer.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal overflow-x-hidden selection:bg-sand-gold/30 selection:text-forest">
      {/* Skip to content link for keyboard and screen reader accessibility */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-forest focus:text-ivory focus:rounded-lg focus:shadow-md"
      >
        Saltar al contenido principal
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
