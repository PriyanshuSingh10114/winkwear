/**
 * Server-Side Promo & Coupon Verification for Wink & Wear
 * 
 * Guarantees that discount and total calculations cannot be tampered with by the client.
 */

const PROMO_CODES = {
  SAVE15: { type: "percent", value: 15, min: 100 },
  SAVE25: { type: "percent", value: 25, min: 200 },
  FLAT50: { type: "flat", value: 50, min: 350 },
  FREESHIP: { type: "shipping", value: 15 },
  BLACKFRIDAY: { type: "percent", value: 50, fridayOnly: true },
};

const isFriday = () => new Date().getDay() === 5;

/**
 * Calculates server-authoritative discount, shipping, and total based on subtotal and coupon code.
 * 
 * @param {number} subtotal - Verified server subtotal
 * @param {string} rawCode - User submitted coupon code
 * @returns {{ subtotal: number, discount: number, shipping: number, total: number, appliedCode: string }}
 */
const calculateOrderTotals = (subtotal, rawCode = "") => {
  const safeSubtotal = Number(subtotal) || 0;
  let discount = 0;
  let shipping = safeSubtotal > 300 ? 0 : 15;
  const code = (rawCode || "").trim().toUpperCase();
  let appliedCode = "";

  if (code && PROMO_CODES[code]) {
    const promo = PROMO_CODES[code];
    let isValid = true;

    if (promo.fridayOnly && !isFriday()) {
      isValid = false;
    }

    if (promo.min && safeSubtotal < promo.min) {
      isValid = false;
    }

    if (isValid) {
      appliedCode = code;
      if (promo.type === "percent") {
        discount = (safeSubtotal * promo.value) / 100;
      } else if (promo.type === "flat") {
        discount = promo.value;
      } else if (promo.type === "shipping") {
        shipping = 0;
      }
    }
  }

  // Ensure discount never exceeds subtotal and total cannot be negative
  discount = Math.min(discount, safeSubtotal);
  const total = Math.max(0, safeSubtotal - discount + shipping);

  return {
    subtotal: safeSubtotal,
    discount: Number(discount.toFixed(2)),
    shipping,
    total: Number(total.toFixed(2)),
    appliedCode,
  };
};

module.exports = {
  PROMO_CODES,
  calculateOrderTotals,
};
