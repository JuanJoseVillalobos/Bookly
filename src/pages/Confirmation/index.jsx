import React, { useMemo } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { Clock, ArrowRight, Calendar, Users, MapPin, CheckCircle2 } from 'lucide-react';
import { Button, Card, Badge } from '../../components/common';
import { useBusinessConfig } from '../../hooks/useBusinessConfig';
import { getBookingRequestById, getLatestBookingRequest } from '../../services/bookingService';
import { formatDateByLocale, formatCurrency } from '../../utils/formatters';

export default function Confirmation() {
  const { t, i18n } = useTranslation(['booking', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const business = useBusinessConfig();
  const [searchParams] = useSearchParams();
  const location = useLocation();

  const idFromParams = searchParams.get('id');

  // Recover booking from location state or localStorage
  const booking = useMemo(() => {
    if (location.state?.booking) return location.state.booking;
    if (idFromParams) {
      const found = getBookingRequestById(idFromParams);
      if (found) return found;
    }
    return getLatestBookingRequest();
  }, [location.state, idFromParams]);

  const prefix = business.bookingSettings?.referencePrefix || 'BKL';
  const reference = booking?.id || `${prefix}-DEMO-000000`;

  // Localized date formatting
  let formattedDate = booking?.requestedDate || '';
  if (formattedDate) {
    formattedDate = formatDateByLocale(formattedDate, currentLang);
  }

  return (
    <div className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 max-w-2xl mx-auto text-center">
      <Card className="p-6 sm:p-10 md:p-12 bg-white border border-stone shadow-md">
        <div className="inline-flex p-4 rounded-full bg-sand-gold-subtle text-sand-gold-dark mb-6 shadow-2xs">
          <Clock className="w-10 h-10" />
        </div>

        <div className="mb-4">
          <Badge variant="pending" size="md">
            {t('status.pendingApproval', 'Pendiente de Aprobación')}
          </Badge>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-forest mb-3">
          {t('confirmation.title')}
        </h1>

        <p className="text-sm sm:text-base text-charcoal-muted leading-relaxed mb-6">
          {t('confirmation.description')}
        </p>

        {/* Structured Booking Details Box */}
        <div className="bg-ivory border border-stone rounded-2xl p-5 sm:p-6 mb-8 text-left space-y-4">
          <div className="flex justify-between items-center text-xs sm:text-sm">
            <span className="text-charcoal-muted font-medium">
              {t('confirmation.demoReferenceLabel', 'Referencia:')}
            </span>
            <span className="font-mono font-bold text-base sm:text-lg text-forest tracking-wide bg-stone-light/50 px-2.5 py-1 rounded-lg border border-stone/70">
              {reference}
            </span>
          </div>

          <div className="flex justify-between items-center text-xs sm:text-sm border-t border-stone pt-3">
            <span className="text-charcoal-muted font-medium">
              {t('confirmation.statusLabel', 'Estado:')}
            </span>
            <span className="font-semibold text-amber-800 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />
              <span>{t('status.pendingConfirmation', 'Pendiente de confirmación')}</span>
            </span>
          </div>

          {booking && (
            <>
              <div className="border-t border-stone pt-3 space-y-1">
                <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                  {t('request.summaryTitle', 'Experiencia')}
                </span>
                <p className="font-serif font-bold text-forest text-base">
                  {booking.experienceTitle || booking.experienceName}
                </p>
                {booking.experienceLocation && (
                  <p className="text-xs text-charcoal-muted flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-forest" />
                    <span>{booking.experienceLocation}</span>
                  </p>
                )}
              </div>

              <div className="grid grid-cols-2 gap-3 border-t border-stone pt-3 text-xs sm:text-sm">
                <div>
                  <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                    {t('request.summaryDateLabel', 'Fecha y Turno')}
                  </span>
                  <p className="font-medium text-charcoal mt-0.5">
                    {formattedDate} — {booking.requestedTimeLabel || `${booking.requestedTime} hs`}
                  </p>
                </div>

                <div>
                  <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                    {t('request.summaryGuestsLabel', 'Participantes')}
                  </span>
                  <p className="font-medium text-charcoal mt-0.5">
                    {booking.guestQuantity}{' '}
                    {currentLang === 'en'
                      ? booking.guestQuantity === 1
                        ? 'guest'
                        : 'guests'
                      : booking.guestQuantity === 1
                      ? 'persona'
                      : 'personas'}
                  </p>
                </div>
              </div>

              <div className="flex justify-between items-center text-xs sm:text-sm border-t border-stone pt-3">
                <span className="text-charcoal-muted font-medium">
                  {t('request.summaryTotalLabel', 'Total estimado:')}
                </span>
                <span className="font-serif font-bold text-forest text-lg">
                  {formatCurrency(booking.estimatedTotal, booking.currency, currentLang)}
                </span>
              </div>
            </>
          )}

          <div className="flex justify-between items-start text-xs border-t border-stone pt-3">
            <span className="text-charcoal-muted font-medium shrink-0 mr-2">
              {t('confirmation.importantNoteLabel', 'Nota:')}
            </span>
            <span className="text-charcoal-muted leading-relaxed">
              {t(
                'confirmation.importantNoteValue',
                'Esta simulación no constituye un cargo bancario ni reserva definitiva hasta la aprobación del operador.'
              )}
            </span>
          </div>
        </div>

        <Link to="/explore">
          <Button variant="primary" size="lg" rightIcon={<ArrowRight className="w-4 h-4" />}>
            {t('request.backToCatalog', 'Volver al catálogo')}
          </Button>
        </Link>
      </Card>
    </div>
  );
}
