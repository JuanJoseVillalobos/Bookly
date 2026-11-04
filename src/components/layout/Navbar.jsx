import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Compass, ArrowRight } from 'lucide-react';
import { businessConfig } from '../../config/businessConfig';
import { Button } from '../common';
import LanguageSelector from './LanguageSelector';

/**
 * Navbar component for Bookly.
 * Responsive navigation bar supporting mobile, tablet, and desktop viewports.
 * Houses the logo, main navigation links, language selector, and primary CTA.
 */
export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu whenever route changes
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Lock body scroll when mobile menu is open to prevent background scrolling
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  const navLinks = [
    { to: '/', label: 'Inicio' },
    { to: '/explore', label: 'Explorar' },
  ];

  return (
    <header className="sticky top-0 z-50 w-full bg-ivory/90 backdrop-blur-md border-b border-stone transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo / Brand */}
          <div className="flex items-center gap-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-forest group-hover:text-forest-light transition-colors">
                {businessConfig.name}
              </span>
            </Link>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'relative py-2 transition-colors duration-150',
                    isActive
                      ? 'text-forest font-semibold after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-forest'
                      : 'text-charcoal-muted hover:text-forest',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions (Language Selector + CTA) */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <Link to="/explore">
              <Button
                variant="primary"
                size="md"
                rightIcon={<ArrowRight className="w-4 h-4" />}
              >
                Reservar
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center gap-2 md:hidden">
            <LanguageSelector variant="segmented" />
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? 'Cerrar menú' : 'Abrir menú'}
              aria-expanded={isMobileMenuOpen}
              className="p-2.5 rounded-lg text-charcoal hover:text-forest hover:bg-stone-light/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer min-h-[44px] min-w-[44px] flex items-center justify-center"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer / Overlay Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-x-0 top-20 bottom-0 bg-ivory/95 backdrop-blur-lg border-b border-stone z-40 overflow-y-auto px-6 py-8 flex flex-col justify-between animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="space-y-6">
            <div className="border-b border-stone pb-4">
              <span className="text-xs font-semibold uppercase tracking-wider text-sand-gold-dark">
                Navegación
              </span>
            </div>

            <nav className="flex flex-col space-y-4">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'text-xl font-serif py-3 px-4 rounded-lg transition-colors flex items-center justify-between',
                      isActive
                        ? 'bg-forest-subtle text-forest font-bold'
                        : 'text-charcoal hover:bg-stone-light/50',
                    ].join(' ')
                  }
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 text-forest/50" />
                </NavLink>
              ))}
            </nav>

            <div className="pt-4 border-t border-stone">
              <Link to="/explore" className="block w-full">
                <Button
                  variant="primary"
                  size="lg"
                  className="w-full justify-center"
                  rightIcon={<ArrowRight className="w-4 h-4" />}
                >
                  Explorar Experiencias
                </Button>
              </Link>
            </div>
          </div>

          {/* Mobile Footer Note */}
          <div className="pt-8 border-t border-stone text-xs text-charcoal-muted space-y-2">
            <p className="font-serif font-bold text-forest">{businessConfig.name}</p>
            <p>{businessConfig.tagline}</p>
            <p className="text-charcoal-light">{businessConfig.contact.email}</p>
          </div>
        </div>
      )}
    </header>
  );
}

