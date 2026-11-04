import React from 'react';
import { Outlet, Link } from 'react-router-dom';

/**
 * MainLayout
 * Base layout structure for Bookly pages.
 * Incorporates the Premium Editorial Minimalism design system tokens.
 */
export default function MainLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-ivory text-charcoal">
      {/* Header / Navigation shell */}
      <header className="border-b border-stone bg-white/85 backdrop-blur-md sticky top-0 z-50 transition-colors">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-18 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3 group">
            <span className="font-serif text-2xl font-bold tracking-tight text-forest group-hover:text-forest-light transition-colors">
              Bookly
            </span>
          </Link>
          <nav className="flex items-center gap-6 sm:gap-8 text-sm font-medium text-charcoal-muted">
            <Link to="/" className="hover:text-forest transition-colors">
              Inicio
            </Link>
            <Link to="/explore" className="hover:text-forest transition-colors">
              Explorar
            </Link>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="border-t border-stone bg-white py-8 text-center text-xs text-charcoal-muted">
        <div className="max-w-7xl mx-auto px-4 space-y-2">
          <p className="font-serif text-sm text-forest font-semibold">Bookly</p>
          <p className="text-sand-gold-dark text-[11px] uppercase tracking-wider">Discover. Book. Experience.</p>
          <p className="text-charcoal-light pt-2">© {new Date().getFullYear()} Bookly. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  );
}
