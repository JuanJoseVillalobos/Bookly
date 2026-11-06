/**
 * Centralized Pricing Utility for Bookly
 *
 * Provides consistent price calculation logic across the application.
 * Prepared for future pricing rules (e.g., dynamic seasonal rates, bulk discounts,
 * service fees, taxes) while keeping the MVP lightweight and predictable.
 */

/**
 * Calculates the booking price breakdown based on unit price and participant count.
 *
 * @param {Object} params
 * @param {number} params.unitPrice Rate per person
 * @param {number|string} params.guestCount Number of participants
 * @param {string} [params.currency='USD'] Currency code
 * @param {Object} [params.customRules] Optional container for future discount/tax rules
 * @returns {{
 *   unitPrice: number,
 *   guestCount: number,
 *   subtotal: number,
 *   estimatedTotal: number,
 *   currency: string,
 *   isIllustrative: boolean
 * }}
 */
export function calculateBookingPrice({
  unitPrice = 0,
  guestCount = 1,
  currency = 'USD',
  customRules = {},
}) {
  const parsedUnitPrice = Math.max(0, Number(unitPrice) || 0);
  const parsedGuestCount = Math.max(1, parseInt(String(guestCount), 10) || 1);

  // Base calculation: unit price * number of participants
  const subtotal = parsedUnitPrice * parsedGuestCount;

  // Placeholder for future pricing adjustments (discounts, fees, promos)
  const discountAmount = customRules.discount || 0;
  const feesAmount = customRules.fees || 0;

  const estimatedTotal = Math.max(0, subtotal - discountAmount + feesAmount);

  return {
    unitPrice: parsedUnitPrice,
    guestCount: parsedGuestCount,
    subtotal,
    estimatedTotal,
    currency,
    isIllustrative: true,
  };
}

