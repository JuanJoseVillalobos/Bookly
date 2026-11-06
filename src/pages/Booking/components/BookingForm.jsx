import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  ArrowRight,
  Info,
  AlertCircle,
} from 'lucide-react';
import {
  Input,
  Button,
  Card,
  DatePicker,
  TimeSlotSelector,
  GuestSelector,
} from '../../../components/common';

/**
 * BookingForm
 * Structured form organizing the booking request workflow:
 * - Step 1: Preferred Date (via DatePicker with availableDays restriction) & Time Slot (via TimeSlotSelector)
 * - Step 2: Guest Count
 * - Step 3: Contact & Personal Information
 * - Step 4: Special Requirements / Notes (Optional)
 * - Integrated field-level and global validation feedback.
 */
export default function BookingForm({
  experience,
  currentLang,
  date,
  setDate,
  timeSlot,
  setTimeSlot,
  guests,
  setGuests,
  fullName,
  setFullName,
  email,
  setEmail,
  phone,
  setPhone,
  notes,
  setNotes,
  onSubmit,
  errors = {},
  hasAttemptedSubmit = false,
  onClearError,
}) {
  const { t } = useTranslation('booking');
  const isEn = currentLang === 'en';

  // Dynamic guest options bounded by experience groupSize
  const minGuests = experience.groupSize?.min || 1;
  const maxGuests = experience.groupSize?.max || 8;

  const errorKeys = Object.keys(errors);
  const hasErrors = errorKeys.length > 0;

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6 sm:space-y-8">
      {/* Global Validation Error Banner */}
      {hasAttemptedSubmit && hasErrors && (
        <div
          role="alert"
          aria-live="assertive"
          className="p-4 sm:p-5 rounded-2xl bg-red-50 border border-red-200 text-red-900 flex items-start gap-3.5 shadow-xs animate-in fade-in"
        >
          <div className="w-8 h-8 rounded-xl bg-red-100 flex items-center justify-center shrink-0">
            <AlertCircle className="w-5 h-5 text-red-600" />
          </div>
          <div className="space-y-1.5 flex-1 min-w-0">
            <h4 className="text-sm font-semibold text-red-900">
              {t(
                'request.errors.formHasErrors',
                'Por favor revisa y corrige los campos señalados antes de continuar.'
              )}
            </h4>
            <ul className="text-xs space-y-1 text-red-700 list-disc list-inside">
              {errorKeys.map((key) => (
                <li key={key}>{errors[key]}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      {/* SECTION 1: Date & Time Slot */}
      <Card className="p-5 sm:p-7 bg-white border border-stone shadow-xs space-y-4 relative z-30 overflow-visible">
        <div className="border-b border-stone/70 pb-3">
          <div className="flex items-center gap-2 text-forest font-serif text-lg font-bold">
            <Calendar className="w-5 h-5 text-sand-gold-dark" />
            <h2>{t('request.stepScheduleTitle')}</h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            {t('request.stepScheduleSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-5 pt-1">
          <DatePicker
            label={t('request.dateLabel')}
            id="booking-date"
            value={date}
            onChange={(newDate) => {
              setDate(newDate);
              onClearError?.('date');
            }}
            availableDays={experience.availability?.availableDays || [0, 1, 2, 3, 4, 5, 6]}
            error={errors.date}
            required
          />

          <TimeSlotSelector
            label={t('request.timeLabel')}
            id="booking-time"
            value={timeSlot}
            onChange={(newSlot) => {
              setTimeSlot(newSlot);
              onClearError?.('timeSlot');
            }}
            experience={experience}
            selectedDate={date}
            error={errors.timeSlot}
            required
          />
        </div>
      </Card>

      {/* SECTION 2: Guests Count */}
      <Card className="p-5 sm:p-7 bg-white border border-stone shadow-xs space-y-4 relative z-20">
        <div className="border-b border-stone/70 pb-3">
          <div className="flex items-center gap-2 text-forest font-serif text-lg font-bold">
            <Users className="w-5 h-5 text-sand-gold-dark" />
            <h2>{t('request.stepGuestsTitle')}</h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            {t('request.stepGuestsSubtitle', { max: maxGuests })}
          </p>
        </div>

        <div className="pt-1">
          <GuestSelector
            label={t('request.guestsLabel')}
            id="booking-guests"
            value={guests}
            onChange={(newGuests) => {
              setGuests(newGuests);
              onClearError?.('guests');
            }}
            min={minGuests}
            max={maxGuests}
            unitPrice={experience.price}
            currency={experience.currency}
            error={errors.guests}
          />
        </div>
      </Card>

      {/* SECTION 3: Contact & Personal Information */}
      <Card className="p-5 sm:p-7 bg-white border border-stone shadow-xs space-y-4 relative z-10">
        <div className="border-b border-stone/70 pb-3">
          <div className="flex items-center gap-2 text-forest font-serif text-lg font-bold">
            <User className="w-5 h-5 text-sand-gold-dark" />
            <h2>{t('request.stepContactTitle')}</h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            {t('request.stepContactSubtitle')}
          </p>
        </div>

        <div className="space-y-4 pt-1">
          <Input
            label={t('request.nameLabel')}
            id="booking-fullname"
            value={fullName}
            onChange={(e) => {
              setFullName(e.target.value);
              onClearError?.('fullName');
            }}
            placeholder={t('request.namePlaceholder')}
            required
            autoComplete="name"
            error={errors.fullName}
            leftIcon={<User className="w-4 h-4" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label={t('request.emailLabel')}
              type="email"
              id="booking-email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                onClearError?.('email');
              }}
              placeholder={t('request.emailPlaceholder')}
              required
              autoComplete="email"
              hint={t('request.emailHint')}
              error={errors.email}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label={t('request.phoneLabel')}
              type="tel"
              id="booking-phone"
              value={phone}
              onChange={(e) => {
                setPhone(e.target.value);
                onClearError?.('phone');
              }}
              placeholder={t('request.phonePlaceholder')}
              required
              autoComplete="tel"
              inputMode="tel"
              error={errors.phone}
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>
        </div>
      </Card>

      {/* SECTION 4: Special Requests / Notes (Optional) */}
      <Card className="p-5 sm:p-7 bg-white border border-stone shadow-xs space-y-4 relative z-0">
        <div className="border-b border-stone/70 pb-3">
          <div className="flex items-center gap-2 text-forest font-serif text-lg font-bold">
            <MessageSquare className="w-5 h-5 text-sand-gold-dark" />
            <h2>{t('request.stepNotesTitle')}</h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            {t('request.stepNotesSubtitle')}
          </p>
        </div>

        <div className="pt-1">
          <label
            htmlFor="booking-notes"
            className="block text-xs font-semibold uppercase tracking-wider text-charcoal mb-1.5"
          >
            {t('request.notesLabel')}
          </label>
          <textarea
            id="booking-notes"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder={t('request.notesPlaceholder')}
            className="w-full px-3.5 py-2.5 rounded-lg border border-stone text-base md:text-sm bg-white text-charcoal transition-colors duration-150 placeholder:text-charcoal-light/70 focus:outline-none focus-visible:ring-2 focus-visible:ring-forest focus-visible:border-forest"
          />
        </div>
      </Card>

      {/* SECTION 5: Submit Actions & Disclaimer */}
      <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="flex items-start gap-2 text-xs text-charcoal-muted">
          <Info className="w-4 h-4 text-forest shrink-0 mt-0.5" />
          <span className="leading-relaxed">{t('request.disclaimer')}</span>
        </div>

        <Button
          variant="primary"
          size="lg"
          type="submit"
          className="w-full sm:w-auto shadow-md hover:shadow-lg shrink-0 justify-center cursor-pointer"
          rightIcon={<ArrowRight className="w-4 h-4" />}
        >
          {t('request.reviewBtn', 'Revisar Solicitud')}
        </Button>
      </div>
    </form>
  );
}
