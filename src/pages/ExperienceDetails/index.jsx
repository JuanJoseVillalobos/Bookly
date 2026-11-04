import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, MapPin, Calendar, Sparkles, CheckCircle } from 'lucide-react';
import { experiences, getLocalizedExperience } from '../../data/experiences';
import { formatCurrency } from '../../utils/formatters';
import { Button, Card, Badge } from '../../components/common';

export default function ExperienceDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation(['booking', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const rawExperience = experiences.find((item) => item.id === id) || experiences[0];
  const experience = getLocalizedExperience(rawExperience, currentLang);

  const includesItems = t('details.includes', { returnObjects: true }) || [];

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      <Link to="/explore">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          {t('actions.backToCatalog')}
        </Button>
      </Link>

      <Card className="p-8 sm:p-12">
        <div className="flex flex-wrap items-center justify-between gap-4 mb-4">
          <Badge variant="gold" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
            {experience.category}
          </Badge>
          <div className="flex items-center gap-4 text-xs font-medium text-charcoal-muted">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-forest" /> {experience.location}
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-forest" /> {experience.duration}
            </span>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-5xl font-bold text-forest mb-6">
          {experience.title}
        </h1>

        <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed mb-8">
          {experience.shortDescription}
        </p>

        <div className="bg-ivory border border-stone rounded-xl p-6 mb-8">
          <h2 className="font-serif text-lg font-bold text-forest mb-3">
            {t('details.includesTitle')}
          </h2>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-charcoal-muted">
            {Array.isArray(includesItems) && includesItems.map((item, index) => (
              <li key={index} className="flex items-center gap-2">
                <CheckCircle className="w-4 h-4 text-forest shrink-0" /> {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="pt-6 border-t border-stone flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <span className="block text-xs uppercase tracking-wider text-charcoal-light">
              {t('labels.estimatedRate')}
            </span>
            <span className="font-serif text-2xl sm:text-3xl font-bold text-forest">
              {formatCurrency(experience.price, experience.currency, currentLang)}
              <span className="font-sans text-xs text-charcoal-muted font-normal">
                {' '}{t('labels.perPerson')}
              </span>
            </span>
          </div>
          <Link to={`/booking/${experience.id}`} className="w-full sm:w-auto">
            <Button variant="primary" size="lg" className="w-full sm:w-auto" rightIcon={<Calendar className="w-4 h-4" />}>
              {t('actions.bookNow')}
            </Button>
          </Link>
        </div>
      </Card>
    </div>
  );
}
