import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Clock, Sparkles } from 'lucide-react';
import { useBusinessConfig } from '../../hooks/useBusinessConfig';
import { Badge } from '../common';

/**
 * Footer component for Bookly.
 * Fully internationalized and decoupled from commercial identity via businessConfig.
 */
export default function Footer() {
  const { t } = useTranslation('common');
  const business = useBusinessConfig();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone bg-white text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              {business.branding?.logoUrl ? (
                <img
                  src={business.branding.logoUrl}
                  alt={business.name}
                  className="h-8 w-auto object-contain"
                />
              ) : (
                <span className="font-serif text-2xl font-bold tracking-tight text-forest group-hover:text-forest-light transition-colors">
                  {business.name}
                </span>
              )}
              {business.badge && (
                <Badge variant="forest" size="sm">
                  {business.badge}
                </Badge>
              )}
            </Link>
            <p className="text-sand-gold-dark text-xs font-semibold uppercase tracking-wider">
              {business.tagline}
            </p>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              {business.description}
            </p>
          </div>

          {/* Col 2: Navigation Links */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold text-forest uppercase tracking-wider">
              {t('footer.exploration')}
            </h3>
            <ul className="space-y-2.5 text-sm text-charcoal-muted">
              <li>
                <Link to="/" className="hover:text-forest transition-colors">
                  {t('navigation.home')}
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-forest transition-colors">
                  {t('footer.allExperiences')}
                </Link>
              </li>
              <li>
                <Link to="/explore" className="hover:text-forest transition-colors">
                  {t('footer.featuredExperiences')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Support */}
          <div className="space-y-4">
            <h3 className="font-serif text-sm font-bold text-forest uppercase tracking-wider">
              {t('footer.contact')}
            </h3>
            <ul className="space-y-2.5 text-sm text-charcoal-muted">
              {business.contact?.email && (
                <li className="flex items-center gap-2">
                  <Mail className="w-4 h-4 text-forest shrink-0" />
                  <a
                    href={`mailto:${business.contact.email}`}
                    className="hover:text-forest transition-colors"
                  >
                    {business.contact.email}
                  </a>
                </li>
              )}
              {business.contact?.phone && (
                <li className="flex items-center gap-2">
                  <Phone className="w-4 h-4 text-forest shrink-0" />
                  <a
                    href={`tel:${business.contact.phone.replace(/\s+/g, '')}`}
                    className="hover:text-forest transition-colors"
                  >
                    {business.contact.phone}
                  </a>
                </li>
              )}
              {business.contact?.location && (
                <li className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-forest shrink-0" />
                  <span>{business.contact.location}</span>
                </li>
              )}
              {business.contact?.hours && (
                <li className="flex items-center gap-2 text-xs text-charcoal-light">
                  <Clock className="w-4 h-4 text-forest/70 shrink-0" />
                  <span>{business.contact.hours}</span>
                </li>
              )}
            </ul>
          </div>

          {/* Col 4: MVP Demo Notice */}
          <div className="space-y-4 p-5 rounded-xl bg-ivory border border-stone">
            <div className="flex items-center gap-2 text-forest">
              <Sparkles className="w-4 h-4 text-sand-gold-dark" />
              <span className="font-serif text-sm font-bold">{t('footer.demoTitle')}</span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('footer.demoNotice', { businessName: business.name })}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-light">
          <p>
            © {currentYear} {business.name}. {t('footer.allRightsReserved')}
          </p>
          <div className="flex items-center gap-6">
            <span className="hover:text-charcoal cursor-pointer">{t('footer.privacy')}</span>
            <span>•</span>
            <span className="hover:text-charcoal cursor-pointer">{t('footer.terms')}</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
