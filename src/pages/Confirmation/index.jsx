import React, { useMemo, useState } from 'react';
import { Link, useLocation, useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Clock,
  ArrowRight,
  Calendar,
  Users,
  MapPin,
  CheckCircle2,
  Copy,
  Check,
  User,
  Mail,
  Phone,
  MessageSquare,
  ShieldAlert,
  ShieldCheck,
  ExternalLink,
} from 'lucide-react';
import { Button, Card, Badge } from '../../components/common';
import { getBookingRequestById, getLatestBookingRequest } from '../../services/bookingService';
import { formatDateByLocale, formatCurrency } from '../../utils/formatters';
import ConfirmationNotFound from './components/ConfirmationNotFound';

/**
 * Confirmation Page
 *
 * Final view of the booking request flow:
 * - Retrieves and presents the real persisted BookingRequest from localStorage or navigation state.
 * - Displays:
 *   - Unique Reference Code (with copy feedback).
 *   - Initial status: 'Pending approval'.
 *   - Clear callout that request is pending business approval and no immediate charge occurred.
 *   - Experience summary (image, category, title, location).
 *   - Requested date, time slot, and guest count.
 *   - Customer contact information (name, email, phone, special requests).
 *   - Unit price and estimated total.
 * - Graceful fallback / empty state for direct access without a valid booking.
 * - Responsive layout, persistent across page reloads, and bilingual support (ES/EN).
 */
export default function Confirmation() {
  const { t, i18n } = useTranslation(['booking', 'common']);
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';
  const isEn = currentLang === 'en';

  const [searchParams] = useSearchParams();
  const location = useLocation();
  const [hasCopied, setHasCopied] = useState(false);

  const idFromParams = searchParams.get('id');

  // Recover real booking request from navigation state or localStorage
  const booking = useMemo(() => {
    if (location.state?.booking) return location.state.booking;
    if (idFromParams) {
      const found = getBookingRequestById(idFromParams);
      if (found) return found;
    }
    return getLatestBookingRequest();
  }, [location.state, idFromParams]);

  // If accessed directly without an active or found booking, render empty state (prevents false confirmation)
  if (!booking) {
    return <ConfirmationNotFound />;
  }

  // Copy reference code to clipboard
  const handleCopyReference = () => {
    if (booking?.id && navigator?.clipboard) {
      navigator.clipboard.writeText(booking.id).then(() => {
        setHasCopied(true);
        setTimeout(() => setHasCopied(false), 2000);
      });
    }
  };

  // Localized date formatting
  let formattedDate = booking.requestedDate;
  if (booking.requestedDate) {
    try {
      const [y, m, d] = booking.requestedDate.split('-');
      const dt = new Date(Number(y), Number(m) - 1, Number(d));
      formattedDate = new Intl.DateTimeFormat(isEn ? 'en-US' : 'es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(dt);
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    } catch {
      formattedDate = formatDateByLocale(booking.requestedDate, currentLang);
    }
  }

  const timeLabel = booking.requestedTimeLabel || `${booking.requestedTime} hs`;

  return (
    <div className="py-8 sm:py-14 px-4 sm:px-6 lg:px-8 max-w-3xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Main Confirmation Hero Card */}
      <Card className="p-6 sm:p-10 bg-white border border-stone shadow-sm text-center">
        {/* Status Icon */}
        <div className="inline-flex p-4 rounded-2xl bg-amber-50 text-amber-700 ring-1 ring-amber-200/80 mb-5 shadow-2xs">
          <Clock className="w-9 h-9 sm:w-11 sm:h-11 stroke-[1.75]" />
        </div>

        {/* Status Badge */}
        <div className="mb-3 flex justify-center">
          <Badge variant="pending" size="md">
            {t('confirmation.statusBadge', 'Pendiente de Aprobación')}
          </Badge>
        </div>

        {/* Title & Subtitle */}
        <h1 className="font-serif text-2xl sm:text-4xl font-bold text-forest tracking-tight mb-2">
          {t('confirmation.title', 'Solicitud de Reserva Registrada')}
        </h1>

        <p className="text-xs sm:text-base text-charcoal-muted max-w-xl mx-auto leading-relaxed">
          {t('confirmation.description')}
        </p>

        {/* Unique Reference Bar */}
        <div className="mt-6 p-4 rounded-xl bg-ivory border border-stone flex flex-col sm:flex-row items-center justify-between gap-3 text-left">
          <div>
            <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
              {t('confirmation.referenceLabel', 'Código de Solicitud:')}
            </span>
            <span className="font-mono font-bold text-lg sm:text-xl text-forest tracking-wider">
              {booking.id}
            </span>
          </div>

          <button
            type="button"
            onClick={handleCopyReference}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-stone text-xs font-semibold text-charcoal hover:bg-white hover:border-forest/50 transition-colors cursor-pointer self-stretch sm:self-auto justify-center"
            title={t('confirmation.copyReference', 'Copiar código')}
          >
            {hasCopied ? (
              <>
                <Check className="w-3.5 h-3.5 text-forest" />
                <span className="text-forest">{t('confirmation.referenceCopied', '¡Copiado!')}</span>
              </>
            ) : (
              <>
                <Copy className="w-3.5 h-3.5 text-charcoal-muted" />
                <span>{t('confirmation.copyReference', 'Copiar código')}</span>
              </>
            )}
          </button>
        </div>
      </Card>

      {/* 2. Critical Operator Approval Notice Callout */}
      <div
        role="alert"
        className="p-4 sm:p-5 rounded-2xl bg-amber-50/70 border border-amber-200/90 text-amber-950 flex items-start gap-3.5 shadow-2xs"
      >
        <ShieldAlert className="w-5 h-5 text-amber-700 shrink-0 mt-0.5" />
        <div className="space-y-1 text-xs sm:text-sm leading-relaxed">
          <p className="font-semibold text-amber-900">
            {t('confirmation.statusExplanation')}
          </p>
          <p className="text-amber-800">
            {t('confirmation.trustNote')}
          </p>
        </div>
      </div>

      {/* 3. Detailed Request Summary Breakdown */}
      <Card className="p-6 sm:p-8 bg-white border border-stone shadow-xs space-y-6">
        {/* A. Experience Info */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 pb-6 border-b border-stone/70">
          {booking.experienceImage && (
            <img
              src={booking.experienceImage}
              alt={booking.experienceTitle || booking.experienceName}
              className="w-full sm:w-24 h-28 sm:h-24 rounded-xl object-cover shrink-0 border border-stone"
            />
          )}

          <div className="space-y-1 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {booking.experienceCategory && (
                <Badge variant="stone" size="sm">
                  {booking.experienceCategory}
                </Badge>
              )}
            </div>

            <h2 className="font-serif text-lg sm:text-xl font-bold text-forest leading-snug">
              {booking.experienceTitle || booking.experienceName}
            </h2>

            {booking.experienceLocation && (
              <p className="text-xs text-charcoal-muted flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                <span>{booking.experienceLocation}</span>
              </p>
            )}
          </div>

          {booking.experienceId && (
            <Link
              to={`/experience/${booking.experienceId}`}
              className="text-xs text-forest hover:underline font-semibold inline-flex items-center gap-1 self-start sm:self-auto shrink-0"
            >
              <span>{t('confirmation.ctaExperience', 'Ver experiencia')}</span>
              <ExternalLink className="w-3.5 h-3.5" />
            </Link>
          )}
        </div>

        {/* B. Schedule & Guest Count */}
        <div className="space-y-3 pb-6 border-b border-stone/70">
          <h3 className="font-serif text-sm sm:text-base font-bold text-forest uppercase tracking-wider text-[11px]">
            {t('confirmation.scheduleSectionTitle', 'Fecha y Horario Solicitados')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light flex items-center gap-1">
                <Calendar className="w-3.5 h-3.5 text-forest" />
                <span>{t('request.summaryDateLabel', 'Fecha seleccionada')}</span>
              </span>
              <p className="font-semibold text-forest text-sm sm:text-base">
                {formattedDate}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-forest" />
                <span>{t('request.summaryTimeLabel', 'Turno seleccionado')}</span>
              </span>
              <p className="font-semibold text-forest text-sm sm:text-base">
                {timeLabel}
              </p>
            </div>
          </div>
        </div>

        {/* C. Customer Details */}
        <div className="space-y-3 pb-6 border-b border-stone/70">
          <h3 className="font-serif text-sm sm:text-base font-bold text-forest uppercase tracking-wider text-[11px]">
            {t('confirmation.customerSectionTitle', 'Datos del Solicitante')}
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-0.5">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light flex items-center gap-1">
                <User className="w-3 h-3 text-forest" />
                <span>{t('request.nameLabel', 'Nombre')}</span>
              </span>
              <p className="font-medium text-charcoal break-words">
                {booking.customerInformation?.fullName}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-0.5">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light flex items-center gap-1">
                <Mail className="w-3 h-3 text-forest" />
                <span>{t('request.emailLabel', 'Correo')}</span>
              </span>
              <p className="font-medium text-charcoal break-words truncate">
                {booking.customerInformation?.email}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-0.5">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light flex items-center gap-1">
                <Phone className="w-3 h-3 text-forest" />
                <span>{t('request.phoneLabel', 'Teléfono')}</span>
              </span>
              <p className="font-medium text-charcoal">
                {booking.customerInformation?.phone}
              </p>
            </div>
          </div>

          {/* Notes */}
          <div className="p-3.5 rounded-xl bg-stone-light/20 border border-stone/60 text-xs sm:text-sm space-y-1">
            <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-forest" />
              <span>{t('confirmation.notesLabel', 'Requerimientos especiales:')}</span>
            </span>
            <p className="text-charcoal italic whitespace-pre-line">
              {booking.customerInformation?.notes?.trim()
                ? booking.customerInformation.notes
                : t('confirmation.noNotes', 'Sin requerimientos adicionales informados.')}
            </p>
          </div>
        </div>

        {/* D. Pricing & Estimated Total */}
        <div className="space-y-3">
          <h3 className="font-serif text-sm sm:text-base font-bold text-forest uppercase tracking-wider text-[11px]">
            {t('confirmation.pricingSectionTitle', 'Tarifa y Total Estimado')}
          </h3>

          <div className="p-4 sm:p-5 rounded-2xl bg-ivory border border-stone flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="space-y-1 text-xs sm:text-sm text-charcoal-muted">
              <div className="flex items-center gap-2">
                <span>{t('confirmation.unitRateLabel', 'Tarifa por persona:')}</span>
                <span className="font-semibold text-charcoal">
                  {formatCurrency(booking.unitPrice, booking.currency, currentLang)}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <span>{t('request.summaryGuestsLabel', 'Participantes:')}</span>
                <span className="font-semibold text-charcoal">
                  {booking.guestQuantity}{' '}
                  {isEn
                    ? booking.guestQuantity === 1
                      ? 'guest'
                      : 'guests'
                    : booking.guestQuantity === 1
                    ? 'persona'
                    : 'personas'}
                </span>
              </div>
            </div>

            <div className="text-left sm:text-right border-t sm:border-t-0 border-stone/60 pt-2 sm:pt-0 w-full sm:w-auto">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('confirmation.totalLabel', 'Total estimado:')}
              </span>
              <span className="font-serif text-2xl sm:text-3xl font-bold text-forest">
                {formatCurrency(booking.estimatedTotal, booking.currency, currentLang)}
              </span>
            </div>
          </div>
        </div>
      </Card>

      {/* 4. Actions: Back to Catalog */}
      <div className="text-center pt-2">
        <Link to="/explore">
          <Button
            variant="primary"
            size="lg"
            className="shadow-sm hover:shadow-md cursor-pointer inline-flex items-center gap-2 px-8"
            rightIcon={<ArrowRight className="w-4 h-4" />}
          >
            {t('confirmation.ctaCatalog', 'Explorar más experiencias')}
          </Button>
        </Link>
      </div>
    </div>
  );
}
