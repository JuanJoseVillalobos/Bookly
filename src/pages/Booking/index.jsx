import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { getExperienceById } from '../../data/experiences';
import {
  BookingNotFound,
  BookingHeader,
  WizardStepper,
  Step1DateTime,
  Step2Guests,
  Step3Contact,
  Step4Requirements,
  Step5Review,
} from './components';
import { validateWizardStep, validateBookingForm } from '../../utils/validation.js';
import { createBookingRequest } from '../../services/bookingService.js';
import { calculateBookingPrice } from '../../utils/pricing.js';
import { getTimeSlotsForDate } from '../../data/experiences';

/**
 * Multi-Step Booking Wizard
 *
 * Guided 5-step booking flow structured after modern multi-step wizard designs:
 * - Step 1: Date & Time Slot Selection
 * - Step 2: Guest Quantity & Dynamic Pricing
 * - Step 3: Contact Information
 * - Step 4: Additional Requirements (Optional, with 500-char limit)
 * - Step 5: Comprehensive Review & Explicit Submission
 *
 * Features:
 * - Centered, focused single-container layout adhering to Bookly's design tokens.
 * - Connected progress stepper with clickable completed step shortcuts.
 * - Step-by-step isolated validation before advancing.
 * - Centralized form state preserved during backwards and forward navigation.
 * - Integration with persistent local storage service (`createBookingRequest`).
 * - Bilingual (ES / EN) and mobile responsive.
 */
export default function Booking() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, i18n } = useTranslation('booking');
  const currentLang = (i18n.resolvedLanguage || i18n.language || 'es').startsWith('en') ? 'en' : 'es';

  const experience = getExperienceById(id, currentLang);

  // Wizard active step (1 to 5)
  const [currentStep, setCurrentStep] = useState(1);

  // Centralized Form State
  const [date, setDate] = useState('');
  const [timeSlot, setTimeSlot] = useState('');
  const [guests, setGuests] = useState(() => String(experience?.groupSize?.min || 2));
  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [notes, setNotes] = useState('');

  // Validation & Submission State
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submissionError, setSubmissionError] = useState('');

  // Missing Experience Handle
  if (!experience) {
    return <BookingNotFound />;
  }

  const formData = {
    date,
    timeSlot,
    guests,
    fullName,
    email,
    phone,
    notes,
  };

  // Clear single field error on user edit
  const handleClearError = (field) => {
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  // Advance to next step with step-specific validation
  const handleNextStep = () => {
    setSubmissionError('');
    const validation = validateWizardStep(currentStep, formData, experience, currentLang, t);

    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    setErrors({});
    setCurrentStep((prev) => Math.min(5, prev + 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Return to previous step
  const handlePrevStep = () => {
    setSubmissionError('');
    setErrors({});
    setCurrentStep((prev) => Math.max(1, prev - 1));
    window.scrollTo({ top: 100, behavior: 'smooth' });
  };

  // Direct jump to a completed step
  const handleJumpToStep = (targetStep) => {
    if (targetStep < currentStep) {
      setSubmissionError('');
      setErrors({});
      setCurrentStep(targetStep);
      window.scrollTo({ top: 100, behavior: 'smooth' });
    }
  };

  // Final submission on Step 5
  const handleConfirmSubmit = () => {
    if (isSubmitting) return;

    // Full validation across all fields
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
      // If there are errors in earlier steps, navigate to the first offending step
      if (validation.errors.date || validation.errors.timeSlot) {
        setCurrentStep(1);
      } else if (validation.errors.guests) {
        setCurrentStep(2);
      } else if (validation.errors.fullName || validation.errors.email || validation.errors.phone) {
        setCurrentStep(3);
      }
      return;
    }

    setSubmissionError('');
    setIsSubmitting(true);

    try {
      const pricing = calculateBookingPrice({
        unitPrice: experience.price || 0,
        guestCount: guests,
        currency: experience.currency || 'USD',
      });

      const slots = getTimeSlotsForDate(experience, date, currentLang);
      const matchedSlot = slots.find((s) => s.value === timeSlot);
      const timeSlotLabel = matchedSlot?.label || (timeSlot ? `${timeSlot} hs` : '');

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

      // Simulate network dispatch with loading state before navigating
      setTimeout(() => {
        setIsSubmitting(false);
        navigate(`/confirmation?id=${encodeURIComponent(booking.id)}`, {
          state: { bookingId: booking.id, booking },
          replace: true,
        });
      }, 600);
    } catch (err) {
      console.error('[Booking Wizard] Submission error:', err);
      setIsSubmitting(false);
      setSubmissionError(
        t(
          'request.errors.persistenceFailed',
          'No se pudo registrar la solicitud debido a un inconveniente con el almacenamiento local. Por favor intenta nuevamente.'
        )
      );
    }
  };

  // Step Header Labels
  const stepHeadings = {
    1: {
      title: t('wizard.step1Title', 'Selecciona Fecha y Horario'),
      subtitle: t('wizard.step1Subtitle', 'Elige la fecha de tu salida y el turno horario disponible.'),
    },
    2: {
      title: t('wizard.step2Title', 'Cantidad de Huéspedes'),
      subtitle: t('wizard.step2Subtitle', 'Indica cuántas personas participarán en esta experiencia.'),
    },
    3: {
      title: t('wizard.step3Title', 'Información de Contacto'),
      subtitle: t('wizard.step3Subtitle', 'Ingresa tus datos personales para que el operador coordine la actividad.'),
    },
    4: {
      title: t('wizard.step4Title', 'Requerimientos Adicionales'),
      subtitle: t('wizard.step4Subtitle', 'Indica si tú o tus acompañantes tienen alguna necesidad especial o preferencia.'),
    },
    5: {
      title: t('wizard.step5Title', 'Revisión de la Solicitud'),
      subtitle: t('wizard.step5Subtitle', 'Verifica minuciosamente la información antes de enviar la solicitud.'),
    },
  };

  return (
    <div className="py-6 sm:py-10 lg:py-12 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto space-y-6 sm:space-y-8 animate-in fade-in duration-200">
      {/* 1. Top Breadcrumb & Header Context */}
      <BookingHeader experience={experience} />

      {/* 2. Wizard Stepper Bar (Progress circles & connecting track) */}
      <WizardStepper currentStep={currentStep} onStepClick={handleJumpToStep} />

      {/* 3. Centered Step Title & Subtitle */}
      <div className="text-center space-y-1.5 pt-1">
        <h2 className="font-serif text-2xl sm:text-3xl font-bold text-forest tracking-tight">
          {stepHeadings[currentStep]?.title}
        </h2>
        <p className="text-xs sm:text-sm text-charcoal-muted max-w-md mx-auto leading-relaxed">
          {stepHeadings[currentStep]?.subtitle}
        </p>
      </div>

      {/* 4. Active Step Content Container */}
      <div className="max-w-3xl mx-auto">
        {currentStep === 1 && (
          <Step1DateTime
            experience={experience}
            currentLang={currentLang}
            date={date}
            setDate={setDate}
            timeSlot={timeSlot}
            setTimeSlot={setTimeSlot}
            errors={errors}
            onClearError={handleClearError}
            onNext={handleNextStep}
            onBackToExperience={() => navigate(`/experience/${experience.id}`)}
          />
        )}

        {currentStep === 2 && (
          <Step2Guests
            experience={experience}
            guests={guests}
            setGuests={setGuests}
            errors={errors}
            onClearError={handleClearError}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 3 && (
          <Step3Contact
            fullName={fullName}
            setFullName={setFullName}
            email={email}
            setEmail={setEmail}
            phone={phone}
            setPhone={setPhone}
            errors={errors}
            onClearError={handleClearError}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 4 && (
          <Step4Requirements
            notes={notes}
            setNotes={setNotes}
            errors={errors}
            onClearError={handleClearError}
            onPrev={handlePrevStep}
            onNext={handleNextStep}
          />
        )}

        {currentStep === 5 && (
          <Step5Review
            experience={experience}
            currentLang={currentLang}
            date={date}
            timeSlot={timeSlot}
            guests={guests}
            fullName={fullName}
            email={email}
            phone={phone}
            notes={notes}
            onJumpToStep={handleJumpToStep}
            onPrev={handlePrevStep}
            onSubmit={handleConfirmSubmit}
            isSubmitting={isSubmitting}
            submissionError={submissionError}
          />
        )}
      </div>
    </div>
  );
}
