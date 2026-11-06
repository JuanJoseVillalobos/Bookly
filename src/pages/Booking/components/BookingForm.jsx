import React from 'react';
import { useTranslation } from 'react-i18next';
import {
  Calendar,
  Users,
  User,
  Mail,
  Phone,
  MessageSquare,
  Send,
  Info,
} from 'lucide-react';
import {
  Input,
  Select,
  Button,
  Card,
  DatePicker,
  TimeSlotSelector,
} from '../../../components/common';

/**
 * BookingForm
 * Structured form organizing the booking request workflow:
 * - Step 1: Preferred Date (via DatePicker with availableDays restriction) & Time Slot (via TimeSlotSelector)
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
  timeSlotError,
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

  return (
    <form onSubmit={onSubmit} className="space-y-6 sm:space-y-8">
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
            onChange={setDate}
            availableDays={experience.availability?.availableDays || [0, 1, 2, 3, 4, 5, 6]}
            required
          />

          <TimeSlotSelector
            label={t('request.timeLabel')}
            id="booking-time"
            value={timeSlot}
            onChange={setTimeSlot}
            experience={experience}
            selectedDate={date}
            error={timeSlotError}
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
          className="w-full sm:w-auto shadow-md hover:shadow-lg shrink-0 justify-center"
          rightIcon={<Send className="w-4 h-4" />}
        >
          {t('request.submitBtn')}
        </Button>
      </div>
    </form>
  );
}
