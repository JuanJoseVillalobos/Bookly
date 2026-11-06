import React, { useState, useEffect } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Menu, X, ArrowRight } from 'lucide-react';
import { useBusinessConfig } from '../../hooks/useBusinessConfig';
import { Button, Badge } from '../common';
import LanguageSelector from './LanguageSelector';

/**
 * Navbar component for Bookly.
 * Clean, lightweight, responsive, and fully decoupled from commercial identity via businessConfig.
 */
export default function Navbar() {
  const { t } = useTranslation('common');
  const business = useBusinessConfig();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location.pathname]);

  // Monitor vertical scroll position to apply dynamic elevation and styling
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 8);
    };

    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { to: '/', label: t('navigation.home') },
    { to: '/explore', label: t('navigation.explore') },
  ];

  return (
    <header
      className={`sticky top-0 z-40 w-full transition-all duration-200 ${
        isScrolled
          ? 'bg-ivory/98 backdrop-blur-md border-b border-stone-dark/80 shadow-xs'
          : 'bg-ivory/95 backdrop-blur-md border-b border-stone shadow-none'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Logo / Brand */}
          <Link to="/" className="flex items-center gap-2.5 group">
            {business.branding?.logoUrl ? (
              <img
                src={business.branding.logoUrl}
                alt={business.name}
                className="h-8 sm:h-9 w-auto object-contain"
              />
            ) : (
              <span className="font-serif text-2xl sm:text-3xl font-bold tracking-tight text-forest group-hover:text-forest-light transition-colors">
                {business.name}
              </span>
            )}
            {business.badge && (
              <Badge variant="forest" size="sm" className="hidden sm:inline-flex">
                {business.badge}
              </Badge>
            )}
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
            {navLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                end={link.to === '/'}
                className={({ isActive }) =>
                  [
                    'py-1 transition-colors duration-150',
                    isActive
                      ? 'text-forest font-semibold border-b-2 border-forest'
                      : 'text-charcoal-muted hover:text-forest',
                  ].join(' ')
                }
              >
                {link.label}
              </NavLink>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSelector />
            <Link to="/explore">
              <Button variant="primary" size="md">
                {t('navigation.book')}
              </Button>
            </Link>
          </div>

          {/* Mobile Menu Toggle Button */}
          <div className="flex items-center gap-2 md:hidden">
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              aria-label={isMobileMenuOpen ? t('navigation.closeMenu') : t('navigation.openMenu')}
              aria-expanded={isMobileMenuOpen}
              className="p-2 rounded-lg text-charcoal hover:text-forest hover:bg-stone-light/60 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-forest cursor-pointer"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Simple Mobile Dropdown Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-stone bg-ivory/95 backdrop-blur-md px-4 py-5 shadow-lg max-h-[calc(100vh-5rem)] overflow-y-auto">
          <div className="max-w-7xl mx-auto space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wider text-sand-gold-dark px-2">
              {t('navigation.navTitle')}
            </p>

            <nav className="flex flex-col space-y-1">
              {navLinks.map((link) => (
                <NavLink
                  key={link.to}
                  to={link.to}
                  end={link.to === '/'}
                  className={({ isActive }) =>
                    [
                      'px-3 py-2.5 rounded-lg text-base font-medium transition-colors flex items-center justify-between',
                      isActive
                        ? 'bg-forest text-ivory font-semibold'
                        : 'text-charcoal hover:bg-stone-light/60',
                    ].join(' ')
                  }
                >
                  <span>{link.label}</span>
                  <ArrowRight className="w-4 h-4 opacity-70" />
                </NavLink>
              ))}
            </nav>

            <div className="pt-3 border-t border-stone/80 flex items-center justify-between px-2">
              <span className="text-xs text-charcoal-muted">{t('navigation.language')}</span>
              <LanguageSelector variant="segmented" />
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
