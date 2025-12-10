import { describe, it, expect } from 'vitest';
import { mapBedType, formatCapacity } from './helpers';

describe('mapBedType', () => {
  it('should map known bed types to friendly names (case-insensitive)', () => {
    expect(mapBedType('DOUBLE')).toBe('Double bed');
    expect(mapBedType('double')).toBe('Double bed');

    expect(mapBedType('KING')).toBe('King bed');
    expect(mapBedType('KiNg')).toBe('King bed');

    expect(mapBedType('TWIN')).toBe('Twin bed');
    expect(mapBedType('twin')).toBe('Twin bed');

    expect(mapBedType('QUEEN')).toBe('Queen bed');
    expect(mapBedType('queen')).toBe('Queen bed');
  });

  it('should return original value for unknown bed types', () => {
    expect(mapBedType('SINGLE')).toBe('SINGLE');
    expect(mapBedType('California King')).toBe('California King');
  });

  it('should return "Bed" for null, undefined or empty values', () => {
    expect(mapBedType(undefined)).toBe('Bed');
    expect(mapBedType(null)).toBe('Bed');
    expect(mapBedType('')).toBe('Bed');
  });
});

describe('formatCapacity', () => {
  it('should use maxAdult when available', () => {
    expect(formatCapacity(1)).toBe('Up to 1 adults');
    expect(formatCapacity(3)).toBe('Up to 3 adults');
  });

  it('should fallback to maxOccupancy when maxAdult is undefined', () => {
    expect(formatCapacity(undefined, 2)).toBe('Up to 2 adults');
    expect(formatCapacity(undefined, 5)).toBe('Up to 5 adults');
  });

  it('should prefer maxAdult over maxOccupancy', () => {
    expect(formatCapacity(2, 5)).toBe('Up to 2 adults');
  });

  it('should return undefined when no valid capacity is provided', () => {
    expect(formatCapacity()).toBeUndefined();
    expect(formatCapacity(0)).toBeUndefined();
    expect(formatCapacity(undefined, 0)).toBeUndefined();
  });
});
