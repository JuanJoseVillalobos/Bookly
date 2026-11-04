import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Mail, Phone, MapPin, Sparkles } from 'lucide-react';
import { businessConfig, getLocalizedBusinessConfig } from '../../config/businessConfig';
import { Badge } from '../common';

/**
 * Footer component for Bookly.
 * Fully internationalized.
 */
export default function Footer() {
  const { t, i18n } = useTranslation('common');
  const currentLang = i18n.resolvedLanguage || i18n.language || 'es';
  const localizedConfig = getLocalizedBusinessConfig(currentLang);
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t border-stone bg-white text-charcoal">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">
          
          {/* Col 1: Brand & Tagline */}
          <div className="space-y-4">
            <Link to="/" className="inline-flex items-center gap-2 group">
              <span className="font-serif text-2xl font-bold tracking-tight text-forest group-hover:text-forest-light transition-colors">
                {businessConfig.name}
              </span>
              <Badge variant="forest" size="sm">
                MVP
              </Badge>
            </Link>
            <p className="text-sand-gold-dark text-xs font-semibold uppercase tracking-wider">
              {localizedConfig.tagline}
            </p>
            <p className="text-sm text-charcoal-muted leading-relaxed">
              {localizedConfig.description}
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
              <li className="flex items-center gap-2">
                <Mail className="w-4 h-4 text-forest shrink-0" />
                <a
                  href={`mailto:${businessConfig.contact.email}`}
                  className="hover:text-forest transition-colors"
                >
                  {businessConfig.contact.email}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-forest shrink-0" />
                <a
                  href={`tel:${businessConfig.contact.phone.replace(/\s+/g, '')}`}
                  className="hover:text-forest transition-colors"
                >
                  {businessConfig.contact.phone}
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-forest shrink-0" />
                <span>{t('footer.locationDemo')}</span>
              </li>
            </ul>
          </div>

          {/* Col 4: MVP Demo Notice */}
          <div className="space-y-4 p-5 rounded-xl bg-ivory border border-stone">
            <div className="flex items-center gap-2 text-forest">
              <Sparkles className="w-4 h-4 text-sand-gold-dark" />
              <span className="font-serif text-sm font-bold">{t('footer.demoTitle')}</span>
            </div>
            <p className="text-xs text-charcoal-muted leading-relaxed">
              {t('footer.demoNotice')}
            </p>
          </div>

        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-stone flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-charcoal-light">
          <p>
            © {currentYear} {businessConfig.name}. {t('footer.allRightsReserved')}
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
