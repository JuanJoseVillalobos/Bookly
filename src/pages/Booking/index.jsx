import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getExperienceById, getTimeSlotsForDate } from '../../data/experiences';
import {
  BookingNotFound,
  BookingHeader,
  BookingSummaryCard,
  BookingForm,
  BookingReview,
  BookingStepsNav,
} from './components';
import { validateBookingForm } from '../../utils/validation.js';
import { calculateBookingPrice } from '../../utils/pricing.js';
import { createBookingRequest } from '../../services/bookingService.js';

/**
 * Booking Page
 *
 * Core booking request flow page:
 * - Dynamic route `/booking/:id` preserving experience context.
 * - Handles missing or non-existent experience IDs with a dedicated Not Found view.
 * - Two-step flow: Form Input -> Request Review -> Confirmation.
 * - Strict field-level and global validation for dates, time slots, guest counts, and customer info.
 * - Review step displays full summary and requires explicit confirmation before sending.
 * - Guarantees data persistence when navigating back from review to edit.
 * - 2-column responsive layout: structured left column, sticky experience summary card on right.
 * - Integrates with Bookly's design system and full i18n support (ES/EN).
 */
export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('booking');
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  const experience = getExperienceById(id, currentLang);

  // Flow Step: 'form' | 'review'
  const [currentStep, setCurrentStep] = useState('form');

  // Form State
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState(() => String(experience?.groupSize?.min || 2));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Validation & Submission State
  const [errors, setErrors] = useState({});
  const [hasAttemptedSubmit, setHasAttemptedSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // Handle Non-Existent Experience Identifier
  if (!experience) {
    return <BookingNotFound />;
  }

  // Clear single field error on user interaction
  const handleClearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Step 1 -> Step 2: Validate and advance to review
  const handleProceedToReview = (e) => {
    if (e) e.preventDefault();
    setHasAttemptedSubmit(true);
    setSubmissionError('');

    const validation = validateBookingForm({
      date,
      timeSlot,
      guests,
      fullName,
      email,
      phone,
      experience,
      currentLang,
      t,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      // Smooth scroll to top of form to reveal error summary
      window.scrollTo({ top: 160, behavior: 'smooth' });
      return;
    }

    setErrors({});
    setCurrentStep('review');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Step 2 -> Step 1: Return to edit keeping all inputs intact
  const handleBackToForm = () => {
    setSubmissionError('');
    setCurrentStep('form');
    window.scrollTo({ top: 120, behavior: 'smooth' });
  };

  // Step 2 -> Submit: Final validation, local persistence, anti-duplicate check & transition
  const handleConfirmSubmit = () => {
    // Prevent accidental duplicate submissions from multiple rapid clicks
    if (isSubmitting) return;

    // Re-validate to guarantee absolute consistency
    const validation = validateBookingForm({
      date,
      timeSlot,
      guests,
      fullName,
      email,
      phone,
      experience,
      currentLang,
      t,
    });

    if (!validation.isValid) {
      setErrors(validation.errors);
      setCurrentStep('form');
      return;
    }

    setSubmissionError('');
    setIsSubmitting(true);

    try {
      // 1. Centralized pricing calculation
      const pricing = calculateBookingPrice({
        unitPrice: experience.price || 0,
        guestCount: guests,
        currency: experience.currency || 'USD',
      });

      // 2. Resolve descriptive time slot label
      const slots = getTimeSlotsForDate(experience, date, currentLang);
      const matchedSlot = slots.find((s) => s.value === timeSlot);
      const timeSlotLabel = matchedSlot?.label || (timeSlot ? `${timeSlot} hs` : '');

      // 3. Create and persist booking request via local service
      const booking = createBookingRequest({
        experienceId: experience.id,
        experienceName: experience.title,
        experienceTitle: experience.title,
        experienceImage: experience.mainImage,
        experienceLocation: experience.locationFull || experience.location,
        experienceCategory: experience.category,
        requestedDate: date,
        requestedTime: timeSlot,
        requestedTimeLabel: timeSlotLabel,
        guestQuantity: guests,
        customerInformation: {
          fullName,
          email,
          phone,
          notes,
        },
        unitPrice: pricing.unitPrice,
        currency: pricing.currency,
        estimatedTotal: pricing.estimatedTotal,
      });

      // 4. Simulate network latency (600ms) with visual processing feedback before navigating
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/confirmation?id=${encodeURIComponent(booking.id)}`, {
          state: { bookingId: booking.id, booking },
          replace: true,
        });
      }, 600);
    } catch (err) {
      console.error('[Booking] Submission error:', err);
      setIsSubmitting(false);
      setSubmissionError(
        t(
          'request.errors.persistenceFailed',
          'No se pudo registrar la solicitud debido a un inconveniente con el almacenamiento local. Por favor verifica el espacio e intenta nuevamente.'
        )
      );
    }
  };

  return (
    <div className="py-6 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto space-y-6 sm:space-y-8">
      {/* 1. Header & Navigation Context */}
      <BookingHeader experience={experience} />

      {/* 2. Visual Step Navigation */}
      <BookingStepsNav
        currentStep={currentStep}
        onStepClick={(stepId) => {
          if (stepId === 'form' && currentStep === 'review') {
            handleBackToForm();
          }
        }}
      />

      {/* 3. Main Two-Column Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-start">
        {/* Left Column: Form or Review Step */}
        <div className="lg:col-span-7 xl:col-span-8">
          {currentStep === 'form' ? (
            <BookingForm
              experience={experience}
              currentLang={currentLang}
              date={date}
              setDate={(newDate) => {
                setDate(newDate);
                // Clear timeSlot if date is cleared or changed
                if (!newDate) setTimeSlot('');
                handleClearError('date');
              }}
              timeSlot={timeSlot}
              setTimeSlot={(newSlot) => {
                setTimeSlot(newSlot);
                handleClearError('timeSlot');
              }}
              guests={guests}
              setGuests={(newGuests) => {
                setGuests(newGuests);
                handleClearError('guests');
              }}
              fullName={fullName}
              setFullName={(name) => {
                setFullName(name);
                handleClearError('fullName');
              }}
              email={email}
              setEmail={(m) => {
                setEmail(m);
                handleClearError('email');
              }}
              phone={phone}
              setPhone={(p) => {
                setPhone(p);
                handleClearError('phone');
              }}
              notes={notes}
              setNotes={setNotes}
              onSubmit={handleProceedToReview}
              errors={errors}
              hasAttemptedSubmit={hasAttemptedSubmit}
              onClearError={handleClearError}
            />
          ) : (
            <BookingReview
              experience={experience}
              currentLang={currentLang}
              date={date}
              timeSlot={timeSlot}
              guests={guests}
              fullName={fullName}
              email={email}
              phone={phone}
              notes={notes}
              onBackToEdit={handleBackToForm}
              onConfirmSubmit={handleConfirmSubmit}
              isSubmitting={isSubmitting}
              submissionError={submissionError}
            />
          )}
        </div>

        {/* Right Column: Sticky Experience Summary Card */}
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
