import React, { useState, useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  CalendarDays,
  Clock,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Info,
} from 'lucide-react';
import { Input, Select, Button, Card } from '../../../components/common';
import {
  formatDateByLocale,
  maskDateInput,
  parseDateInput,
} from '../../../utils/formatters';

/**
 * BookingForm
 * Structured form organizing the booking request workflow:
 * - Step 1: Preferred Date & Time Slot (localized date format: mm/dd/yyyy in EN, dd/mm/yyyy in ES)
 * - Step 2: Guest Count
 * - Step 3: Contact & Personal Information
 * - Step 4: Special Requirements / Notes (Optional)
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
}) {
  const { t } = useTranslation('booking');
  const isEn = currentLang === 'en';

  // Minimum selectable date: today in YYYY-MM-DD
  const todayDateString = new Date().toISOString().split('T')[0];

  // Localized date input text state (dd/mm/aaaa in ES, mm/dd/yyyy in EN)
  const [displayDate, setDisplayDate] = useState(() => (date ? formatDateByLocale(date, currentLang) : ''));
  const [dateError, setDateError] = useState('');
  const nativePickerRef = useRef(null);

  // Sync displayDate when standard ISO date or current language changes
  useEffect(() => {
    if (date) {
      setDisplayDate(formatDateByLocale(date, currentLang));
      setDateError('');
    } else if (!displayDate) {
      setDisplayDate('');
    }
  }, [currentLang, date]);

  // Handle manual typing in the localized date field with slash masking
  const handleDateChange = (e) => {
    const raw = e.target.value;
    const masked = maskDateInput(raw);
    setDisplayDate(masked);

    if (!masked) {
      setDate('');
      setDateError('');
      return;
    }

    const digitsOnly = masked.replace(/\D/g, '');
    if (digitsOnly.length === 8) {
      const parsedIso = parseDateInput(masked, currentLang);
      if (parsedIso) {
        if (parsedIso < todayDateString) {
          setDateError(
            isEn
              ? 'Please select a date from today onwards.'
              : 'Por favor selecciona una fecha a partir de hoy.'
          );
          setDate('');
        } else {
          setDate(parsedIso);
          setDateError('');
        }
      } else {
        setDateError(
          isEn
            ? 'Invalid date. Format: mm/dd/yyyy'
            : 'Fecha inválida. Formato: dd/mm/aaaa'
        );
        setDate('');
      }
    } else {
      // Incomplete date being typed
      setDate('');
      setDateError('');
    }
  };

  // Open native calendar picker on icon button click
  const handleOpenCalendar = () => {
    if (nativePickerRef.current) {
      if (typeof nativePickerRef.current.showPicker === 'function') {
        nativePickerRef.current.showPicker();
      } else {
        nativePickerRef.current.focus();
      }
    }
  };

  // Handle date selection from native picker modal
  const handleNativePickerChange = (e) => {
    const isoVal = e.target.value;
    if (!isoVal) return;
    setDate(isoVal);
    setDisplayDate(formatDateByLocale(isoVal, currentLang));
    setDateError('');
  };

  // Dynamic guest options bounded by experience groupSize
  const minGuests = experience.groupSize?.min || 1;
  const maxGuests = experience.groupSize?.max || 8;
  const guestOptions = [];
  for (let i = minGuests; i <= maxGuests; i++) {
    guestOptions.push({
      value: String(i),
      label: isEn
        ? `${i} ${i === 1 ? 'person' : 'people'}`
        : `${i} ${i === 1 ? 'persona' : 'personas'}`,
    });
  }

  // Time slot options
  const timeSlotOptions = experience?.timeSlots?.length > 0
    ? experience.timeSlots
    : [
        { value: '09:00', label: isEn ? '09:00 AM — Morning' : '09:00 hs — Turno Mañana' },
        { value: '14:00', label: isEn ? '02:00 PM — Afternoon' : '14:00 hs — Turno Tarde' },
        { value: '18:00', label: isEn ? '06:00 PM — Sunset' : '18:00 hs — Turno Atardecer' },
      ];

  return (
    <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
      {/* SECTION 1: Date & Time Slot */}
      <Card className="p-5 sm:p-7 bg-white border border-stone shadow-xs space-y-4">
        <div className="border-b border-stone/70 pb-3">
          <div className="flex items-center gap-2 text-forest font-serif text-lg font-bold">
            <Calendar className="w-5 h-5 text-sand-gold-dark" />
            <h2>{t('request.stepScheduleTitle')}</h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            {t('request.stepScheduleSubtitle')}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 pt-1">
          <div className="relative">
            <Input
              label={t('request.dateLabel')}
              type="text"
              inputMode="numeric"
              id="booking-date"
              value={displayDate}
              onChange={handleDateChange}
              placeholder={t('request.datePlaceholder')}
              hint={dateError ? null : t('request.dateHint')}
              error={dateError}
              required
              maxLength={10}
              leftIcon={<Calendar className="w-4 h-4" />}
              rightIcon={
                <button
                  type="button"
                  onClick={handleOpenCalendar}
                  className="p-1 rounded text-charcoal-muted hover:text-forest transition-colors cursor-pointer"
                  title={t('request.openCalendar')}
                  aria-label={t('request.openCalendar')}
                >
                  <CalendarDays className="w-4 h-4" />
                </button>
              }
            />

            {/* Hidden native date input to trigger calendar dialog */}
            <input
              ref={nativePickerRef}
              type="date"
              tabIndex={-1}
              aria-hidden="true"
              min={todayDateString}
              value={date}
              onChange={handleNativePickerChange}
              className="sr-only pointer-events-none"
            />
          </div>

          <Select
            label={t('request.timeLabel')}
            id="booking-time"
            value={timeSlot}
            onChange={(e) => setTimeSlot(e.target.value)}
            placeholder={t('request.timePlaceholder')}
            options={timeSlotOptions}
            required
          />
        </div>
      </Card>

      {/* SECTION 2: Guests Count */}
      <Card className="p-5 sm:p-7 bg-white border border-stone shadow-xs space-y-4">
        <div className="border-b border-stone/70 pb-3">
          <div className="flex items-center gap-2 text-forest font-serif text-lg font-bold">
            <Users className="w-5 h-5 text-sand-gold-dark" />
            <h2>{t('request.stepGuestsTitle')}</h2>
          </div>
          <p className="text-xs sm:text-sm text-charcoal-muted mt-0.5">
            {t('request.stepGuestsSubtitle', { max: maxGuests })}
          </p>
        </div>

        <div className="max-w-xs pt-1">
          <Select
            label={t('request.guestsLabel')}
            id="booking-guests"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
            options={guestOptions}
            required
          />
        </div>
      </Card>

      {/* SECTION 3: Contact & Personal Information */}
      <Card className="p-5 sm:p-7 bg-white border border-stone shadow-xs space-y-4">
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
            onChange={(e) => setFullName(e.target.value)}
            placeholder={t('request.namePlaceholder')}
            required
            autoComplete="name"
            leftIcon={<User className="w-4 h-4" />}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Input
              label={t('request.emailLabel')}
              type="email"
              id="booking-email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder={t('request.emailPlaceholder')}
              required
              autoComplete="email"
              hint={t('request.emailHint')}
              leftIcon={<Mail className="w-4 h-4" />}
            />

            <Input
              label={t('request.phoneLabel')}
              type="tel"
              id="booking-phone"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder={t('request.phonePlaceholder')}
              required
              autoComplete="tel"
              inputMode="tel"
              leftIcon={<Phone className="w-4 h-4" />}
            />
          </div>
        </div>
      </Card>

      {/* SECTION 4: Special Requests / Notes (Optional) */}
      <Card className="p-5 sm:p-7 bg-white border border-stone shadow-xs space-y-4">
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
          className="w-full sm:w-auto shadow-md hover:shadow-lg shrink-0 justify-center"
          rightIcon={<Send className="w-4 h-4" />}
        >
          {t('request.submitBtn')}
        </Button>
      </div>
    </form>
  );
}

