import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowLeft,
  Send,
  CheckCircle2,
  ShieldCheck,
  Info,
  MapPin,
  Edit2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Card, Button, Badge } from '../../../components/common';
import { formatCurrency, formatDateByLocale } from '../../../utils/formatters';
import { calculateBookingPrice } from '../../../utils/pricing';
import { getTimeSlotsForDate } from '../../../data/experiences';

/**
 * BookingReview Component
 *
 * Dedicated Review Step in the Booking Request Flow:
 * - Provides the user with a comprehensive, clear summary of all entered details before submission.
 * - Displays:
 *   1. Experience Information (title, category, location, duration).
 *   2. Requested Schedule (localized date & chosen time slot).
 *   3. Guest count & Unit rate.
 *   4. Customer Contact Details (full name, email, phone, special notes).
 *   5. Estimated Total Calculation.
 * - Allows the user to return to the form to modify any data without losing inputs.
 * - Requires explicit confirmation action (acknowledgement checkbox) before sending the request.
 * - Fully bilingual (ES / EN) and responsive.
 */
export default function BookingReview({
  experience,
  currentLang,
  date,
  timeSlot,
  guests,
  fullName,
  email,
  phone,
  notes,
  onBackToEdit,
  onConfirmSubmit,
  isSubmitting = false,
  submissionError = '',
}) {
  const { t } = useTranslation('booking');
  const isEn = currentLang === 'en';

  // Explicit confirmation state
  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [confirmationError, setConfirmationError] = useState('');

  // Pricing calculation via centralized utility
  const pricing = calculateBookingPrice({
    unitPrice: experience.price || 0,
    guestCount: guests,
    currency: experience.currency || 'USD',
  });

  // Localized date formatting
  let formattedDate = date;
  if (date) {
    try {
      const [y, m, d] = date.split('-');
      const dt = new Date(Number(y), Number(m) - 1, Number(d));
      formattedDate = new Intl.DateTimeFormat(isEn ? 'en-US' : 'es-AR', {
        weekday: 'long',
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      }).format(dt);
      // Capitalize first letter
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    } catch {
      formattedDate = formatDateByLocale(date, currentLang);
    }
  }

  // Localized time slot label
  const slots = getTimeSlotsForDate(experience, date, currentLang);
  const matchedSlot = slots.find((s) => s.value === timeSlot);
  const timeSlotLabel = matchedSlot?.label || (timeSlot ? `${timeSlot} hs` : '');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hasConfirmed) {
      setConfirmationError(
        t(
          'request.review.confirmError',
          'Debes confirmar que has revisado los datos antes de enviar la solicitud.'
        )
      );
      return;
    }
    setConfirmationError('');
    onConfirmSubmit?.();
  };

  return (
    <div className="space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Header Banner of Review Step */}
      <div className="p-4 sm:p-5 rounded-2xl bg-forest-subtle/50 border border-forest/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-xl bg-forest text-ivory flex items-center justify-center shrink-0 shadow-xs">
            <CheckCircle2 className="w-5 h-5 text-sand-gold" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-forest font-serif">
                {t('request.review.stepBadge', 'Paso 2 de 2')}
              </span>
              <span className="text-xs text-charcoal-muted">•</span>
              <span className="text-xs text-charcoal-muted">
                {t('request.review.title', 'Revisión de la Solicitud')}
              </span>
            </div>
            <h2 className="text-lg sm:text-xl font-serif font-bold text-forest mt-0.5">
              {t('request.review.heading', 'Verifica los detalles antes de enviar')}
            </h2>
            <p className="text-xs sm:text-sm text-charcoal-muted mt-1 leading-relaxed">
              {t(
                'request.review.subtitle',
                'Comprueba que los datos de contacto y fechas seleccionadas sean correctos para que el operador confirme la disponibilidad.'
              )}
            </p>
          </div>
        </div>

        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={onBackToEdit}
          className="shrink-0 text-xs gap-1.5 cursor-pointer self-start sm:self-auto"
          leftIcon={<ArrowLeft className="w-3.5 h-3.5" />}
        >
          {t('request.review.backToEdit', 'Modificar datos')}
        </Button>
      </div>

      {/* 2. Structured Review Sections */}
      <div className="space-y-4">
        {/* SECTION A: Schedule & Tour Details */}
        <Card className="p-5 sm:p-6 bg-white border border-stone shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone/70 pb-3">
            <div className="flex items-center gap-2 text-forest font-serif text-base sm:text-lg font-bold">
              <Calendar className="w-5 h-5 text-sand-gold-dark" />
              <h3>{t('request.review.scheduleTitle', 'Fecha y Turno Solicitados')}</h3>
            </div>
            <button
              type="button"
              onClick={onBackToEdit}
              className="inline-flex items-center gap-1 text-xs text-forest hover:text-forest-light hover:underline font-medium cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{t('request.review.editSection', 'Modificar')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.summaryDateLabel', 'Fecha seleccionada')}
              </span>
              <p className="font-semibold text-forest text-base sm:text-lg">
                {formattedDate}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.summaryTimeLabel', 'Turno seleccionado')}
              </span>
              <p className="font-semibold text-forest text-base sm:text-lg flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-sand-gold-dark" />
                <span>{timeSlotLabel}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* SECTION B: Participants & Rate Breakdown */}
        <Card className="p-5 sm:p-6 bg-white border border-stone shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone/70 pb-3">
            <div className="flex items-center gap-2 text-forest font-serif text-base sm:text-lg font-bold">
              <Users className="w-5 h-5 text-sand-gold-dark" />
              <h3>{t('request.review.guestsTitle', 'Participantes y Tarifa')}</h3>
            </div>
            <button
              type="button"
              onClick={onBackToEdit}
              className="inline-flex items-center gap-1 text-xs text-forest hover:text-forest-light hover:underline font-medium cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{t('request.review.editSection', 'Modificar')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.summaryGuestsLabel', 'Cantidad de personas')}
              </span>
              <p className="font-serif font-bold text-forest text-xl">
                {pricing.guestCount}{' '}
                <span className="text-xs font-sans text-charcoal-muted font-normal">
                  {isEn
                    ? pricing.guestCount === 1
                      ? 'guest'
                      : 'guests'
                    : pricing.guestCount === 1
                    ? 'persona'
                    : 'personas'}
                </span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.review.unitRate', 'Tarifa por persona')}
              </span>
              <p className="font-semibold text-charcoal text-base">
                {formatCurrency(pricing.unitPrice, pricing.currency, currentLang)}
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-forest/5 border border-forest/20 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-forest">
                {t('request.summaryTotalLabel', 'Total Estimado')}
              </span>
              <p className="font-serif font-bold text-forest text-xl">
                {formatCurrency(pricing.estimatedTotal, pricing.currency, currentLang)}
              </p>
            </div>
          </div>
        </Card>

        {/* SECTION C: Contact Details */}
        <Card className="p-5 sm:p-6 bg-white border border-stone shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-stone/70 pb-3">
            <div className="flex items-center gap-2 text-forest font-serif text-base sm:text-lg font-bold">
              <User className="w-5 h-5 text-sand-gold-dark" />
              <h3>{t('request.review.contactTitle', 'Datos del Titular')}</h3>
            </div>
            <button
              type="button"
              onClick={onBackToEdit}
              className="inline-flex items-center gap-1 text-xs text-forest hover:text-forest-light hover:underline font-medium cursor-pointer"
            >
              <Edit2 className="w-3 h-3" />
              <span>{t('request.review.editSection', 'Modificar')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.nameLabel', 'Nombre')}
              </span>
              <p className="font-medium text-charcoal break-words">{fullName}</p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.emailLabel', 'Correo')}
              </span>
              <p className="font-medium text-charcoal break-words flex items-center gap-1.5">
                <Mail className="w-3.5 h-3.5 text-charcoal-muted shrink-0" />
                <span className="truncate">{email}</span>
              </p>
            </div>

            <div className="p-3.5 rounded-xl bg-stone-light/40 border border-stone/60 space-y-1">
              <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.phoneLabel', 'Teléfono')}
              </span>
              <p className="font-medium text-charcoal flex items-center gap-1.5">
                <Phone className="w-3.5 h-3.5 text-charcoal-muted shrink-0" />
                <span>{phone}</span>
              </p>
            </div>
          </div>

          {/* Special Notes / Requests */}
          <div className="p-3.5 rounded-xl bg-stone-light/20 border border-stone/60 space-y-1">
            <span className="block text-[11px] uppercase tracking-wider font-semibold text-charcoal-light flex items-center gap-1">
              <MessageSquare className="w-3 h-3 text-sand-gold-dark" />
              <span>{t('request.review.notesTitle', 'Comentarios o Requerimientos Especiales')}</span>
            </span>
            <p className="text-xs sm:text-sm text-charcoal italic whitespace-pre-line">
              {notes?.trim() ? notes : t('request.review.noNotes', 'Sin requerimientos adicionales.')}
            </p>
          </div>
        </Card>
      </div>

      {/* 3. Explicit Confirmation Checkbox & Final Submission Action */}
      <form onSubmit={handleSubmit} className="space-y-5">
        {submissionError && (
          <div
            role="alert"
            className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3 shadow-xs animate-in fade-in"
          >
            <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
            <div className="space-y-1">
              <h4 className="text-sm font-semibold">
                {t('common.error', 'Error')}
              </h4>
              <p className="text-xs sm:text-sm text-red-700 leading-relaxed">
                {submissionError}
              </p>
            </div>
          </div>
        )}

        <Card className="p-4 sm:p-5 bg-ivory border border-sand-gold/40 shadow-xs space-y-3">
          <label className={`flex items-start gap-3 select-none ${isSubmitting ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}>
            <input
              type="checkbox"
              disabled={isSubmitting}
              checked={hasConfirmed}
              onChange={(e) => {
                setHasConfirmed(e.target.checked);
                if (e.target.checked) setConfirmationError('');
              }}
              className="w-4 h-4 mt-0.5 rounded border-stone text-forest focus:ring-forest cursor-pointer disabled:cursor-not-allowed"
            />
            <span className="text-xs sm:text-sm text-charcoal leading-relaxed font-medium">
              {t(
                'request.review.confirmCheckbox',
                'He revisado los datos de contacto, la fecha y los participantes, y confirmo que son correctos para solicitar la reserva.'
              )}
            </span>
          </label>

          {confirmationError && (
            <p className="text-xs text-red-600 font-medium flex items-center gap-1.5" role="alert">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{confirmationError}</span>
            </p>
          )}

          <div className="pt-2 border-t border-stone/60 flex items-start gap-2 text-xs text-charcoal-muted">
            <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
            <span className="leading-relaxed">
              {t(
                'request.review.demoNotice',
                'Esta es una solicitud ilustrativa. No se solicitarán datos bancarios ni se procesará ningún cobro definitivo en esta etapa.'
              )}
            </span>
          </div>
        </Card>

        {/* Submit Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onBackToEdit}
            disabled={isSubmitting}
            className="w-full sm:w-auto justify-center cursor-pointer"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            {t('request.review.backToEdit', 'Modificar datos')}
          </Button>

          <Button
            type="submit"
            variant="primary"
            size="lg"
            disabled={isSubmitting}
            className="w-full sm:w-auto shadow-md hover:shadow-lg justify-center shrink-0 cursor-pointer disabled:cursor-not-allowed"
            rightIcon={
              isSubmitting ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Send className="w-4 h-4" />
              )
            }
          >
            {isSubmitting
              ? t('request.review.submittingBtn', 'Enviando solicitud...')
              : t('request.review.confirmSubmitBtn', 'Confirmar y Enviar Solicitud')}
          </Button>
        </div>
      </form>
    </div>
  );
}

