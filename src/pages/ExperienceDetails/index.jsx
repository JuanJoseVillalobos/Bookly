import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft, Clock, MapPin, Calendar, Sparkles, CheckCircle, Users, AlertCircle } from 'lucide-react';
import { getExperienceById } from '../../data/experiences';
import { formatCurrency } from '../../utils/formatters';
import { Button, Card, Badge } from '../../components/common';

export default function ExperienceDetails() {
  const { id } = useParams();
  const { t, i18n } = useTranslation(['booking', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const experience = getExperienceById(id, currentLang);

  if (!experience) {
    return (
      <div className="py-20 px-4 max-w-xl mx-auto text-center">
        <Card className="p-8 sm:p-12">
          <div className="inline-flex p-3 rounded-full bg-forest-subtle text-forest mb-4">
            <AlertCircle className="w-8 h-8" />
          </div>
          <h1 className="font-serif text-2xl font-bold text-forest mb-2">
            {currentLang === 'en' ? 'Experience Not Found' : 'Experiencia no encontrada'}
          </h1>
          <p className="text-sm text-charcoal-muted mb-6">
            {currentLang === 'en'
              ? 'The experience identifier you are trying to view does not exist in our catalog.'
              : 'El identificador de experiencia al que intentas acceder no existe en nuestro catálogo.'}
          </p>
          <Link to="/explore">
            <Button variant="primary" size="md">
              {t('common:actions.backToCatalog')}
            </Button>
          </Link>
        </Card>
      </div>
    );
  }

  const includedItems = experience.included?.length > 0
    ? experience.included
    : (t('details.includes', { returnObjects: true }) || []);

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto space-y-8">
      <Link to="/explore">
        <Button variant="ghost" size="sm" leftIcon={<ArrowLeft className="w-4 h-4" />}>
          {t('actions.backToCatalog')}
        </Button>
      </Link>

      <Card className="overflow-hidden">
        {/* Main Image Banner */}
        {experience.mainImage && (
          <div className="relative h-64 sm:h-96 w-full overflow-hidden bg-stone-light">
            <img
              src={experience.mainImage}
              alt={experience.imageAlt || experience.title}
              className="h-full w-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-charcoal/80 via-charcoal/20 to-transparent" />
            
            <div className="absolute bottom-6 left-6 right-6 text-white">
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <Badge variant="gold" size="md" icon={<Sparkles className="w-3.5 h-3.5" />}>
                  {experience.category}
                </Badge>
                {experience.difficulty && (
                  <span className="px-2.5 py-1 text-xs rounded-full bg-white/20 backdrop-blur-sm text-white font-medium">
                    {experience.difficulty}
                  </span>
                )}
              </div>
              <h1 className="font-serif text-3xl sm:text-5xl font-bold text-white tracking-tight">
                {experience.title}
              </h1>
              {experience.tagline && (
                <p className="text-sm sm:text-base text-stone-light mt-1 font-light">
                  {experience.tagline}
                </p>
              )}
            </div>
          </div>
        )}

        <div className="p-6 sm:p-10 space-y-8">
          {/* Metadata chips */}
          <div className="flex flex-wrap items-center gap-6 text-xs sm:text-sm font-medium text-charcoal-muted border-b border-stone pb-6">
            <span className="flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-forest" />
              <span>{experience.locationFull || experience.location}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Clock className="w-4 h-4 text-forest" />
              <span>{experience.duration}</span>
            </span>
            <span className="flex items-center gap-1.5">
              <Users className="w-4 h-4 text-forest" />
              <span>
                {currentLang === 'en'
                  ? `Max ${experience.groupSize.max} guests`
                  : `Máx. ${experience.groupSize.max} personas`}
              </span>
            </span>
          </div>

          {/* Detailed description */}
          <div>
            <h2 className="font-serif text-xl font-bold text-forest mb-3">
              {currentLang === 'en' ? 'About this experience' : 'Acerca de esta experiencia'}
            </h2>
            <p className="text-base sm:text-lg text-charcoal-muted leading-relaxed">
              {experience.description || experience.shortDescription}
            </p>
          </div>

          {/* Highlights */}
          {experience.highlights?.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-4">
                {currentLang === 'en' ? 'Highlights' : 'Puntos destacados'}
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {experience.highlights.map((highlight, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-sm text-charcoal-muted bg-stone-light/50 p-3 rounded-lg border border-stone/60">
                    <Sparkles className="w-4 h-4 text-sand-gold-dark shrink-0 mt-0.5" />
                    <span>{highlight}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery preview */}
          {experience.gallery?.length > 0 && (
            <div>
              <h2 className="font-serif text-xl font-bold text-forest mb-4">
                {currentLang === 'en' ? 'Photo Gallery' : 'Galería de fotos'}
              </h2>
              <div className="grid grid-cols-3 gap-3 sm:gap-4">
                {experience.gallery.map((imgUrl, idx) => (
                  <div key={idx} className="h-28 sm:h-44 rounded-lg overflow-hidden bg-stone-light">
                    <img
                      src={imgUrl}
                      alt={`${experience.title} ${idx + 1}`}
                      className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* What's included */}
          <div className="bg-ivory border border-stone rounded-xl p-6">
            <h2 className="font-serif text-lg font-bold text-forest mb-4">
              {t('details.includesTitle')}
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-charcoal-muted">
              {includedItems.map((item, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 text-forest shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Illustrative notice banner */}
          <div className="p-4 rounded-lg bg-amber-50/60 border border-amber-200/80 text-xs text-amber-900 flex items-start gap-2.5">
            <AlertCircle className="w-4 h-4 text-amber-700 shrink-0 mt-0.5" />
            <div>
              <span className="font-semibold block mb-0.5">
                {currentLang === 'en' ? 'Demonstration Notice:' : 'Aviso de demostración:'}
              </span>
              <span>
                {experience.pricing?.notice || (currentLang === 'en'
                  ? 'All rates and time slots shown are fictional and strictly illustrative.'
                  : 'Todas las tarifas y cupos mostrados son ficticios y con fines ilustrativos de demostración.')}
              </span>
            </div>
          </div>

          {/* CTA & Pricing Footer */}
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
        </div>
      </Card>
    </div>
  );
}
