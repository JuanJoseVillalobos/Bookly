import { businessConfig } from '../config/businessConfig.js';

/**
 * Booking Request Status Enum
 */
export const BOOKING_STATUS = {
  PENDING_APPROVAL: 'pending_approval',
  APPROVED: 'approved',
  REJECTED: 'rejected',
};

const STORAGE_KEY = 'bookly_bookings';
const LATEST_BOOKING_KEY = 'bookly_latest_booking_id';

// Submission throttling window to prevent rapid accidental duplicates (5 seconds)
const DUPLICATE_SUBMISSION_WINDOW_MS = 5000;
const MAX_STORED_BOOKINGS = 50;

/**
 * Sanitizes plain text user input to prevent HTML/script injection and control characters
 * before persisting to localStorage.
 *
 * @param {string} value
 * @param {number} [maxLength=500]
 * @returns {string}
 */
export function sanitizeTextInput(value, maxLength = 500) {
  if (!value || typeof value !== 'string') return '';
  return value
    .replace(/[<>]/g, '')
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, '')
    .trim()
    .slice(0, maxLength);
}

/**
 * Generates a unique, human-readable booking reference code.
 * Format: [PREFIX]-[YYYYMMDD]-[XXXX] (e.g. BKL-20261106-9R2M)
 *
 * @param {string} [prefix] Business reference prefix
 * @returns {string} Unique reference code
 */
export function generateBookingReference(prefix) {
  const effectivePrefix = prefix || businessConfig?.bookingSettings?.referencePrefix || 'BKL';
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const dateStr = `${year}${month}${day}`;

  // 4 random alphanumeric characters excluding ambiguous letters (0/O, 1/I)
  const chars = '23456789ABCDEFGHJKLMNPQRSTUVWXYZ';
  let randomSuffix = '';
  for (let i = 0; i < 4; i++) {
    randomSuffix += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  const generatedId = `${effectivePrefix}-${dateStr}-${randomSuffix}`;

  // Guarantee uniqueness against existing stored records
  try {
    const existing = getAllBookingRequests();
    if (existing.some((b) => b.id === generatedId)) {
      return generateBookingReference(prefix);
    }
  } catch {
    // If reading fails, generatedId is still collision-resistant
  }

  return generatedId;
}

/**
 * Retrieves all stored booking requests from localStorage.
 *
 * @returns {Array<Object>} List of stored booking requests
 */
export function getAllBookingRequests() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return [];
  }

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch (error) {
    console.error('[bookingService] Failed to read bookings from localStorage:', error);
    return [];
  }
}

/**
 * Retrieves a single booking request by its unique reference ID.
 *
 * @param {string} id - Booking reference code (e.g. BKL-20261106-8F2A)
 * @returns {Object|null} The matching booking request, or null if not found
 */
export function getBookingRequestById(id) {
  if (!id) return null;
  const bookings = getAllBookingRequests();
  return bookings.find((b) => b.id === id) || null;
}

/**
 * Retrieves the latest submitted booking request.
 * Useful for completing the confirmation screen after page reload.
 *
 * @returns {Object|null}
 */
export function getLatestBookingRequest() {
  if (typeof window === 'undefined' || !window.localStorage) {
    return null;
  }

  try {
    const latestId = window.localStorage.getItem(LATEST_BOOKING_KEY);
    if (latestId) {
      const found = getBookingRequestById(latestId);
      if (found) return found;
    }

    // Fallback: return the most recently created booking from array
    const all = getAllBookingRequests();
    if (all.length > 0) {
      return all[all.length - 1];
    }
  } catch (error) {
    console.error('[bookingService] Failed to read latest booking:', error);
  }

  return null;
}

/**
 * Creates, validates, and persists a new Booking Request into local storage.
 *
 * @param {Object} data
 * @param {string|number} data.experienceId
 * @param {string} data.experienceName
 * @param {string} [data.experienceTitle]
 * @param {string} [data.experienceImage]
 * @param {string} [data.experienceLocation]
 * @param {string} [data.experienceCategory]
 * @param {string} data.requestedDate - YYYY-MM-DD
 * @param {string} data.requestedTime - Slot value (e.g. '09:00')
 * @param {string} [data.requestedTimeLabel] - Slot label (e.g. '09:00 hs — Turno Mañana')
 * @param {number|string} data.guestQuantity
 * @param {Object} data.customerInformation
 * @param {string} data.customerInformation.fullName
 * @param {string} data.customerInformation.email
 * @param {string} data.customerInformation.phone
 * @param {string} [data.customerInformation.notes]
 * @param {number} data.unitPrice
 * @param {string} [data.currency='USD']
 * @param {number} data.estimatedTotal
 * @returns {Object} The created and stored BookingRequest
 * @throws {Error} If validation fails or persistence cannot be completed
 */
export function createBookingRequest(data) {
  if (!data) {
    throw new Error('BOOKING_DATA_REQUIRED');
  }

  // 1. Mandatory data field validation
  const {
    experienceId,
    experienceName,
    experienceTitle,
    requestedDate,
    requestedTime,
    guestQuantity,
    customerInformation,
    unitPrice,
    estimatedTotal,
  } = data;

  if (!experienceId) throw new Error('MISSING_EXPERIENCE_ID');
  if (!experienceName && !experienceTitle) throw new Error('MISSING_EXPERIENCE_NAME');
  if (!requestedDate) throw new Error('MISSING_REQUESTED_DATE');
  if (!requestedTime) throw new Error('MISSING_REQUESTED_TIME');
  if (!guestQuantity || Number(guestQuantity) <= 0) throw new Error('INVALID_GUEST_QUANTITY');
  if (!customerInformation?.fullName?.trim()) throw new Error('MISSING_CUSTOMER_NAME');
  if (!customerInformation?.email?.trim()) throw new Error('MISSING_CUSTOMER_EMAIL');
  if (!customerInformation?.phone?.trim()) throw new Error('MISSING_CUSTOMER_PHONE');
  if (unitPrice === undefined || unitPrice === null) throw new Error('MISSING_UNIT_PRICE');
  if (estimatedTotal === undefined || estimatedTotal === null) throw new Error('MISSING_ESTIMATED_TOTAL');

  // 2. Prevent accidental duplicate submissions (within throttle window)
  const existingBookings = getAllBookingRequests();
  const nowMs = Date.now();
  const normalizedEmail = customerInformation.email.trim().toLowerCase();

  const recentDuplicate = existingBookings.find((b) => {
    const isSameExp = String(b.experienceId) === String(experienceId);
    const isSameDate = b.requestedDate === requestedDate;
    const isSameTime = b.requestedTime === requestedTime;
    const isSameCustomer = b.customerInformation?.email?.toLowerCase() === normalizedEmail;
    const createdMs = new Date(b.submissionTimestamp || b.createdAt).getTime();
    return isSameExp && isSameDate && isSameTime && isSameCustomer && nowMs - createdMs < DUPLICATE_SUBMISSION_WINDOW_MS;
  });

  if (recentDuplicate) {
    // If a duplicate is detected within seconds, return the already created booking safely
    return recentDuplicate;
  }

  // 3. Construct the centralized Booking Request entity
  const id = generateBookingReference(businessConfig?.bookingSettings?.referencePrefix);
  const nowIso = new Date().toISOString();

  const bookingRequest = {
    id,
    experienceId: String(experienceId),
    experienceName: experienceName || experienceTitle,
    experienceTitle: experienceTitle || experienceName,
    experienceImage: data.experienceImage || '',
    experienceLocation: data.experienceLocation || '',
    experienceCategory: data.experienceCategory || '',
    requestedDate,
    requestedTime,
    requestedTimeLabel: data.requestedTimeLabel || (requestedTime ? `${requestedTime} hs` : ''),
    guestQuantity: Number(guestQuantity),
    customerInformation: {
      fullName: sanitizeTextInput(customerInformation.fullName, 120),
      email: sanitizeTextInput(normalizedEmail, 150),
      phone: sanitizeTextInput(customerInformation.phone, 30),
      notes: customerInformation.notes ? sanitizeTextInput(customerInformation.notes, 500) : '',
    },
    unitPrice: Number(unitPrice),
    currency: data.currency || businessConfig?.currency?.default || 'USD',
    estimatedTotal: Number(estimatedTotal),
    submissionTimestamp: nowIso,
    createdAt: nowIso,
    status: BOOKING_STATUS.PENDING_APPROVAL,
  };

  // 4. Persist to localStorage with error handling (QuotaExceededError, Private mode)
  if (typeof window === 'undefined' || !window.localStorage) {
    throw new Error('LOCAL_STORAGE_UNAVAILABLE');
  }

  try {
    const updatedBookings = [...existingBookings, bookingRequest].slice(-MAX_STORED_BOOKINGS);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedBookings));
    window.localStorage.setItem(LATEST_BOOKING_KEY, bookingRequest.id);
  } catch (storageError) {
    console.error('[bookingService] Storage persistence failed:', storageError);
    throw new Error('PERSISTENCE_FAILED');
  }

  return bookingRequest;
}

/**
 * Clears all bookings from localStorage (useful for test resets).
 */
export function clearAllBookings() {
  if (typeof window !== 'undefined' && window.localStorage) {
    try {
      window.localStorage.removeItem(STORAGE_KEY);
      window.localStorage.removeItem(LATEST_BOOKING_KEY);
    } catch (e) {
      console.error('[bookingService] Failed to clear bookings:', e);
    }
  }
}
