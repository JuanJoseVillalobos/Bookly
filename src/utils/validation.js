import { getLocalTodayIso, getDayOfWeekFromIso } from './formatters.js';
import { getTimeSlotsForDate } from '../data/experiences.js';

/**
 * Validates the requested date for an experience.
 *
 * @param {string} date - ISO date string (YYYY-MM-DD)
 * @param {Object} experience - Experience data
 * @param {Function} t - Translation function
 * @returns {string|null} Error message or null if valid
 */
export function validateBookingDate(date, experience, t) {
  if (!date || !date.trim()) {
    return t(
      'request.errors.dateRequired',
      'Por favor selecciona una fecha para la actividad.'
    );
  }

  const todayIso = getLocalTodayIso();
  if (date < todayIso) {
    return t(
      'request.errors.datePast',
      'La fecha no puede ser anterior al día de hoy.'
    );
  }

  const availableDays = experience?.availability?.availableDays || [0, 1, 2, 3, 4, 5, 6];
  const dayOfWeek = getDayOfWeekFromIso(date);
  if (dayOfWeek !== null && !availableDays.includes(dayOfWeek)) {
    return t(
      'request.errors.dateUnavailable',
      'La experiencia no opera el día de la semana seleccionado.'
    );
  }

  return null;
}

/**
 * Validates the selected time slot.
 *
 * @param {string} timeSlot - Selected time slot value
 * @param {string} date - Selected ISO date
 * @param {Object} experience - Experience data
 * @param {string} currentLang - Active language ('es' | 'en')
 * @param {Function} t - Translation function
 * @returns {string|null} Error message or null if valid
 */
export function validateBookingTimeSlot(timeSlot, date, experience, currentLang = 'es', t) {
  if (!timeSlot || !timeSlot.trim()) {
    return t(
      'request.errors.timeRequired',
      'Por favor selecciona un turno horario disponible.'
    );
  }

  if (date && experience) {
    const slots = getTimeSlotsForDate(experience, date, currentLang);
    const chosenSlot = slots.find((s) => s.value === timeSlot);
    if (!chosenSlot || chosenSlot.isAvailable === false) {
      return t(
        'request.errors.timeUnavailable',
        'El turno seleccionado no está disponible para esta fecha.'
      );
    }
  }

  return null;
}

/**
 * Validates the guest count against experience limits.
 *
 * @param {number|string} guests - Number of guests
 * @param {Object} experience - Experience data
 * @param {Function} t - Translation function
 * @returns {string|null} Error message or null if valid
 */
export function validateBookingGuests(guests, experience, t) {
  const count = parseInt(String(guests), 10);
  const min = experience?.groupSize?.min || 1;
  const max = experience?.groupSize?.max || 8;

  if (isNaN(count) || count <= 0) {
    return t(
      'request.errors.guestsRequired',
      'Por favor indica la cantidad de personas.'
    );
  }

  if (count < min) {
    return t('request.errors.guestsMin', {
      min,
      defaultValue: `El grupo debe tener al menos ${min} participante(s).`,
    });
  }

  if (count > max) {
    return t('request.errors.guestsMax', {
      max,
      defaultValue: `El grupo no puede superar los ${max} participantes.`,
    });
  }

  return null;
}

/**
 * Validates full name.
 *
 * @param {string} fullName
 * @param {Function} t - Translation function
 * @returns {string|null} Error message or null if valid
 */
export function validateFullName(fullName, t) {
  if (!fullName || !fullName.trim()) {
    return t('request.errors.nameRequired', 'El nombre completo es obligatorio.');
  }

  if (fullName.trim().length < 3) {
    return t(
      'request.errors.nameInvalid',
      'Por favor ingresa un nombre válido (al menos 3 caracteres).'
    );
  }

  return null;
}

/**
 * Validates email address.
 *
 * @param {string} email
 * @param {Function} t - Translation function
 * @returns {string|null} Error message or null if valid
 */
export function validateEmail(email, t) {
  if (!email || !email.trim()) {
    return t(
      'request.errors.emailRequired',
      'El correo electrónico es obligatorio.'
    );
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
  if (!emailRegex.test(email.trim())) {
    return t(
      'request.errors.emailInvalid',
      'Por favor ingresa un correo electrónico válido (ej. usuario@correo.com).'
    );
  }

  return null;
}

/**
 * Validates contact phone number.
 * Allows digits, spaces, hyphens, plus sign and parentheses.
 * Requires reasonable length (between 7 and 15 digits).
 *
 * @param {string} phone
 * @param {Function} t - Translation function
 * @returns {string|null} Error message or null if valid
 */
export function validatePhone(phone, t) {
  if (!phone || !phone.trim()) {
    return t('request.errors.phoneRequired', 'El número de teléfono es obligatorio.');
  }

  const digits = phone.replace(/\D/g, '');
  const validCharsRegex = /^[\d\s()+-]+$/;

  if (digits.length < 7 || digits.length > 15 || !validCharsRegex.test(phone.trim())) {
    return t(
      'request.errors.phoneInvalid',
      'Por favor ingresa un número de teléfono válido (mínimo 7 dígitos).'
    );
  }

  return null;
}

/**
 * Comprehensive booking form validation.
 *
 * @param {Object} params
 * @param {string} params.date
 * @param {string} params.timeSlot
 * @param {string|number} params.guests
 * @param {string} params.fullName
 * @param {string} params.email
 * @param {string} params.phone
 * @param {Object} params.experience
 * @param {string} params.currentLang
 * @param {Function} params.t
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateBookingForm({
  date,
  timeSlot,
  guests,
  fullName,
  email,
  phone,
  experience,
  currentLang = 'es',
  t = (key, fallback) => (typeof fallback === 'string' ? fallback : key),
}) {
  const errors = {};

  const dateError = validateBookingDate(date, experience, t);
  if (dateError) errors.date = dateError;

  const timeSlotError = validateBookingTimeSlot(timeSlot, date, experience, currentLang, t);
  if (timeSlotError) errors.timeSlot = timeSlotError;

  const guestsError = validateBookingGuests(guests, experience, t);
  if (guestsError) errors.guests = guestsError;

  const nameError = validateFullName(fullName, t);
  if (nameError) errors.fullName = nameError;

  const emailError = validateEmail(email, t);
  if (emailError) errors.email = emailError;

  const phoneError = validatePhone(phone, t);
  if (phoneError) errors.phone = phoneError;

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}

/**
 * Validates a single step in the multi-step booking wizard.
 *
 * @param {number} step - Step number (1, 2, 3, 4, 5)
 * @param {Object} formData - Form values
 * @param {Object} experience - Experience data
 * @param {string} [currentLang='es'] - Active language
 * @param {Function} [t] - Translation function
 * @returns {{ isValid: boolean, errors: Record<string, string> }}
 */
export function validateWizardStep(
  step,
  formData,
  experience,
  currentLang = 'es',
  t = (key, fallback) => (typeof fallback === 'string' ? fallback : key)
) {
  const errors = {};

  if (step === 1) {
    const dateError = validateBookingDate(formData.date, experience, t);
    if (dateError) errors.date = dateError;

    const timeSlotError = validateBookingTimeSlot(formData.timeSlot, formData.date, experience, currentLang, t);
    if (timeSlotError) errors.timeSlot = timeSlotError;
  } else if (step === 2) {
    const guestsError = validateBookingGuests(formData.guests, experience, t);
    if (guestsError) errors.guests = guestsError;
  } else if (step === 3) {
    const nameError = validateFullName(formData.fullName, t);
    if (nameError) errors.fullName = nameError;

    const emailError = validateEmail(formData.email, t);
    if (emailError) errors.email = emailError;

    const phoneError = validatePhone(formData.phone, t);
    if (phoneError) errors.phone = phoneError;
  } else if (step === 4) {
    if (formData.notes && formData.notes.length > 500) {
      errors.notes = t('wizard.charactersLimitReached', 'Límite máximo de 500 caracteres alcanzado');
    }
  } else if (step === 5) {
    return validateBookingForm({
      date: formData.date,
      timeSlot: formData.timeSlot,
      guests: formData.guests,
      fullName: formData.fullName,
      email: formData.email,
      phone: formData.phone,
      experience,
      currentLang,
      t,
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors,
  };
}
