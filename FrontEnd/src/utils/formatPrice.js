/**
 * Centralized Currency Conversion & Price Formatting System for Wink & Wear
 * 
 * Source of Truth: Product prices are stored in USD ($).
 * This utility converts USD prices to Indian Rupees (INR) using a configurable exchange rate.
 */

// Exchange rate configuration (Defaults to 85 INR per USD)
export const USD_TO_INR_RATE = Number(import.meta.env.VITE_USD_TO_INR_RATE) || 85;

/**
 * Converts a USD price to numerical INR value
 * @param {number|string} usdAmount - Original price in USD
 * @returns {number} Converted price in INR
 */
export const convertUsdToInr = (usdAmount) => {
  const num = Number(usdAmount);
  if (isNaN(num)) return 0;
  return num * USD_TO_INR_RATE;
};

/**
 * Formats a price into standard Indian Rupee currency format (e.g. ₹4,250)
 * @param {number|string} amount - Price value
 * @param {boolean} isAlreadyInr - Pass true if the amount has already been converted to INR
 * @returns {string} Formatted INR price string
 */
export const formatPrice = (amount, isAlreadyInr = false) => {
  const num = Number(amount);
  if (isNaN(num)) return "₹0";

  const inrValue = isAlreadyInr ? num : convertUsdToInr(num);

  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(Math.round(inrValue));
};

export default formatPrice;
