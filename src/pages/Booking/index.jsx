import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getExperienceById } from '../../data/experiences';
import {
  BookingNotFound,
  BookingHeader,
  BookingSummaryCard,
  BookingForm,
} from './components';

/**
 * Booking Page
 *
 * Core booking request flow page:
 * - Dynamic route `/booking/:id` preserving experience context.
 * - Handles missing or non-existent experience IDs with a dedicated Not Found view.
 * - 2-column responsive layout: structured form on left, sticky experience summary card on right.
 * - Manages input state for date, time slot, guest count, personal contact info, and special notes.
 * - Integrates with Bookly's design system and full i18n support (ES/EN).
 */
export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('booking');
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  const experience = getExperienceById(id, currentLang);

  // Form State
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState('2');
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);

  // Handle Non-Existent Experience Identifier
  if (!experience) {
    return <BookingNotFound />;
  }

  // Handle Form Submission (Simulation)
  const handleSubmit = (e) => {
    e.preventDefault();
    setHasAttemptedSubmit(true);
    if (!date || !timeSlot) {
      return;
    }
    // Navigate to confirmation page
    navigate('/confirmation');
  };

  return (
    <div className="py-6 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* 1. Header & Navigation Context */}
      <BookingHeader experience={experience} />

      {/* 2. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Structured Form Sections (7 or 8 cols) */}
        <div className="lg:col-span-7 xl:col-span-8">
          <BookingForm
            experience={experience}
            currentLang={currentLang}
            date={date}
            setDate={(newDate) => {
              setDate(newDate);
              // Clear timeSlotError on date change
              if (!newDate) setTimeSlot('');
            }}
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
            timeSlotError={hasAttemptedSubmit && !timeSlot ? t('request.timeSlotRequired') : ''}
            guests={guests}
            setGuests={setGuests}
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            notes={notes}
            setNotes={setNotes}
            onSubmit={handleSubmit}
          />
        </div>

        {/* Right Column: Sticky Experience Summary Card (5 or 4 cols) */}
        <BookingSummaryCard
          experience={experience}
          currentLang={currentLang}
          guests={guests}
          selectedDate={date}
          selectedTime={timeSlot}
        />
      </div>
    </div>
  );
}
