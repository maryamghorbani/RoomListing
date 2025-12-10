import { describe, it, expect } from 'vitest';
import { formatPrice, calculateDiscountPercent } from './formatters';

describe('formatPrice', () => {
  it('should format price with default RM currency', () => {
    expect(formatPrice(100)).toBe('RM100');
  });

  it('should format price with thousands separator', () => {
    expect(formatPrice(1234567)).toBe('RM1,234,567');
  });

  it('should handle zero value', () => {
    expect(formatPrice(0)).toBe('RM0');
  });

  it('should handle large numbers', () => {
    expect(formatPrice(9999999999)).toBe('RM9,999,999,999');
  });
});

describe('calculateDiscountPercent', () => {
  it('should calculate discount percentage correctly', () => {
    expect(calculateDiscountPercent(1000, 500)).toBe(50);
    expect(calculateDiscountPercent(1000, 800)).toBe(20);
    expect(calculateDiscountPercent(100, 1)).toBe(99);
  });

  it('should round to nearest integer', () => {
    expect(calculateDiscountPercent(1000, 756)).toBe(24); // 24.4% rounds to 24
    expect(calculateDiscountPercent(1000, 755)).toBe(25); // 24.5% rounds to 25
  });

  it('should return 0 when no discount', () => {
    expect(calculateDiscountPercent(1000, 1000)).toBe(0);
    expect(calculateDiscountPercent(500, 1000)).toBe(0);
  });

  it('should handle edge cases', () => {
    expect(calculateDiscountPercent(1000, 0)).toBe(100);
    expect(calculateDiscountPercent(0, 0)).toBe(0);
  });
});
