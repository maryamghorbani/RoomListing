export function formatPrice(price: number, currency = 'RM'): string {
  return `${currency}${price.toLocaleString()}`;
}

export function calculateDiscountPercent(
  originalPrice: number,
  discountedPrice: number,
): number {
  if (originalPrice <= discountedPrice) return 0;
  return Math.round(((originalPrice - discountedPrice) / originalPrice) * 100);
}
