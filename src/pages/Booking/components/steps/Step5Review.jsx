import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Clock,
  Users,
  User,
  MessageSquare,
  ArrowLeft,
  Send,
  Loader2,
  Info,
  MapPin,
  Edit2,
  AlertCircle,
} from 'lucide-react';
import { Card, Button, Badge } from '../../../../components/common';
import { formatCurrency, formatDateByLocale } from '../../../../utils/formatters';
import { calculateBookingPrice } from '../../../../utils/pricing';
import { getTimeSlotsForDate } from '../../../../data/experiences';

/**
 * Step 5: Review & Submit
 */
export default function Step5Review({
  experience,
  currentLang,
  date,
  timeSlot,
  guests,
  fullName,
  email,
  phone,
  notes,
  onJumpToStep,
  onPrev,
  onSubmit,
  isSubmitting = false,
  submissionError = '',
}) {
  const { t } = useTranslation('booking');
  const isEn = currentLang === 'en';

  const [hasConfirmed, setHasConfirmed] = useState(false);
  const [confirmationError, setConfirmationError] = useState('');

  // Calculate pricing
  const pricing = calculateBookingPrice({
    unitPrice: experience?.price || 0,
    guestCount: guests,
    currency: experience?.currency || 'USD',
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
      formattedDate = formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    } catch {
      formattedDate = formatDateByLocale(date, currentLang);
    }
  }

  // Time slot label
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
    onSubmit?.();
  };

  return (
    <div className="space-y-6 animate-in fade-in duration-200">
      {/* Submission Error Banner */}
      {submissionError && (
        <div
          role="alert"
          className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3 shadow-xs animate-in fade-in"
        >
          <AlertCircle className="w-5 h-5 text-red-600 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs sm:text-sm">
            <h4 className="font-semibold text-red-900">{t('common.error', 'Error')}</h4>
            <p className="text-red-700 leading-relaxed">{submissionError}</p>
          </div>
        </div>
      )}

      {/* Experience Header Card */}
      <Card className="p-5 sm:p-6 bg-white border border-stone shadow-xs">
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
          {experience?.mainImage && (
            <img
              src={experience.mainImage}
              alt={experience.imageAlt || experience.title}
              className="w-full sm:w-28 h-28 rounded-xl object-cover shrink-0 border border-stone"
            />
          )}

          <div className="space-y-1.5 flex-1 min-w-0">
            <div className="flex flex-wrap items-center gap-2">
              {experience?.category && (
                <Badge variant="gold" size="sm">
                  {experience.category}
                </Badge>
              )}
            </div>

            <h3 className="font-serif text-lg sm:text-xl font-bold text-forest leading-snug">
              {experience?.title}
            </h3>

            {experience?.location && (
              <p className="text-xs text-charcoal-muted flex items-center gap-1">
                <MapPin className="w-3.5 h-3.5 text-forest shrink-0" />
                <span>{experience.locationFull || experience.location}</span>
              </p>
            )}
          </div>
        </div>
      </Card>

      {/* Structured Sections with Direct "Modificar" Jump Links */}
      <div className="space-y-4">
        {/* Section 1: Date & Time */}
        <Card className="p-5 sm:p-6 bg-white border border-stone shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone/70 pb-2.5">
            <div className="flex items-center gap-2 text-forest font-serif text-sm sm:text-base font-bold">
              <Calendar className="w-4 h-4 text-sand-gold-dark" />
              <h4>{t('request.review.scheduleTitle', 'Fecha y Turno Solicitados')}</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(1)}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1 text-xs text-forest hover:underline font-semibold cursor-pointer disabled:cursor-not-allowed"
            >
              <Edit2 className="w-3 h-3" />
              <span>{t('request.review.editSection', 'Modificar')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-stone-light/40 border border-stone/60">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.summaryDateLabel', 'Fecha seleccionada')}
              </span>
              <p className="font-semibold text-forest text-sm sm:text-base mt-0.5">{formattedDate}</p>
            </div>
            <div className="p-3 rounded-xl bg-stone-light/40 border border-stone/60">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.summaryTimeLabel', 'Turno seleccionado')}
              </span>
              <p className="font-semibold text-forest text-sm sm:text-base mt-0.5 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sand-gold-dark" />
                <span>{timeSlotLabel}</span>
              </p>
            </div>
          </div>
        </Card>

        {/* Section 2: Guests & Pricing */}
        <Card className="p-5 sm:p-6 bg-white border border-stone shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone/70 pb-2.5">
            <div className="flex items-center gap-2 text-forest font-serif text-sm sm:text-base font-bold">
              <Users className="w-4 h-4 text-sand-gold-dark" />
              <h4>{t('request.review.guestsTitle', 'Participantes y Tarifa')}</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(2)}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1 text-xs text-forest hover:underline font-semibold cursor-pointer disabled:cursor-not-allowed"
            >
              <Edit2 className="w-3 h-3" />
              <span>{t('request.review.editSection', 'Modificar')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-stone-light/40 border border-stone/60">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.summaryGuestsLabel', 'Huéspedes')}
              </span>
              <p className="font-serif font-bold text-forest text-lg mt-0.5">
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

            <div className="p-3 rounded-xl bg-stone-light/40 border border-stone/60">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.review.unitRate', 'Tarifa por persona')}
              </span>
              <p className="font-semibold text-charcoal text-sm sm:text-base mt-0.5">
                {formatCurrency(pricing.unitPrice, pricing.currency, currentLang)}
              </p>
            </div>

            <div className="p-3 rounded-xl bg-forest/5 border border-forest/20">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-forest">
                {t('request.summaryTotalLabel', 'Total estimado')}
              </span>
              <p className="font-serif font-bold text-forest text-lg mt-0.5">
                {formatCurrency(pricing.estimatedTotal, pricing.currency, currentLang)}
              </p>
            </div>
          </div>
        </Card>

        {/* Section 3: Contact Details */}
        <Card className="p-5 sm:p-6 bg-white border border-stone shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone/70 pb-2.5">
            <div className="flex items-center gap-2 text-forest font-serif text-sm sm:text-base font-bold">
              <User className="w-4 h-4 text-sand-gold-dark" />
              <h4>{t('request.review.contactTitle', 'Datos del Titular')}</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(3)}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1 text-xs text-forest hover:underline font-semibold cursor-pointer disabled:cursor-not-allowed"
            >
              <Edit2 className="w-3 h-3" />
              <span>{t('request.review.editSection', 'Modificar')}</span>
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs sm:text-sm">
            <div className="p-3 rounded-xl bg-stone-light/40 border border-stone/60">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.nameLabel', 'Nombre')}
              </span>
              <p className="font-medium text-charcoal break-words mt-0.5">{fullName}</p>
            </div>

            <div className="p-3 rounded-xl bg-stone-light/40 border border-stone/60">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.emailLabel', 'Correo')}
              </span>
              <p className="font-medium text-charcoal break-words truncate mt-0.5">{email}</p>
            </div>

            <div className="p-3 rounded-xl bg-stone-light/40 border border-stone/60">
              <span className="block text-[10px] uppercase tracking-wider font-semibold text-charcoal-light">
                {t('request.phoneLabel', 'Teléfono')}
              </span>
              <p className="font-medium text-charcoal mt-0.5">{phone}</p>
            </div>
          </div>
        </Card>

        {/* Section 4: Special Requirements */}
        <Card className="p-5 sm:p-6 bg-white border border-stone shadow-xs space-y-3">
          <div className="flex items-center justify-between border-b border-stone/70 pb-2.5">
            <div className="flex items-center gap-2 text-forest font-serif text-sm sm:text-base font-bold">
              <MessageSquare className="w-4 h-4 text-sand-gold-dark" />
              <h4>{t('request.review.notesTitle', 'Requerimientos Especiales')}</h4>
            </div>
            <button
              type="button"
              onClick={() => onJumpToStep(4)}
              disabled={isSubmitting}
              className="inline-flex items-center gap-1 text-xs text-forest hover:underline font-semibold cursor-pointer disabled:cursor-not-allowed"
            >
              <Edit2 className="w-3 h-3" />
              <span>{t('request.review.editSection', 'Modificar')}</span>
            </button>
          </div>

          <div className="p-3 rounded-xl bg-stone-light/20 border border-stone/60 text-xs sm:text-sm">
            <p className="text-charcoal italic whitespace-pre-line">
              {notes?.trim() ? notes : t('request.review.noNotes', 'Sin requerimientos adicionales.')}
            </p>
          </div>
        </Card>
      </div>

      {/* Explicit Confirmation Checkbox & Submit Button */}
      <form onSubmit={handleSubmit} className="space-y-5">
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

        {/* Action Buttons */}
        <div className="flex flex-col-reverse sm:flex-row items-center justify-between gap-4 pt-2">
          <Button
            type="button"
            variant="outline"
            size="lg"
            onClick={onPrev}
            disabled={isSubmitting}
            className="w-full sm:w-auto justify-center cursor-pointer"
            leftIcon={<ArrowLeft className="w-4 h-4" />}
          >
            {t('wizard.btnPrevious', 'Anterior')}
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
              ? t('wizard.btnSubmitting', 'Enviando solicitud...')
              : t('wizard.btnSubmit', 'Confirmar y Enviar Solicitud')}
          </Button>
        </div>
      </form>
    </div>
  );
}

