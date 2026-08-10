/**
 * Slugify utility for Wink & Wear Product URLs
 */

export const createProductSlug = (name = "", id = "") => {
  if (!name) return `/product/${id}`;
  const slugifiedName = String(name)
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)+/g, "");
  return `/product/${slugifiedName}-${id}`;
};

export const parseProductId = (productIdParam = "") => {
  if (!productIdParam) return null;
  const parts = String(productIdParam).split("-");
  const lastPart = parts[parts.length - 1];
  const num = Number(lastPart);
  return isNaN(num) ? Number(productIdParam) : num;
};
