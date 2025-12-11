export function mapBedType(rawBed?: string | null): string {
  if (!rawBed) return 'Bed';

  const bedTypeMap: Record<string, string> = {
    DOUBLE: 'Double bed',
    KING: 'King bed',
    TWIN: 'Twin bed',
    QUEEN: 'Queen bed',
  };

  return bedTypeMap[rawBed.toUpperCase()] ?? rawBed;
}

export function formatCapacity(
  maxAdult?: number,
  maxOccupancy?: number,
): string | undefined {
  const count = maxAdult ?? maxOccupancy;
  if (!count) return undefined;
  return `Up to ${count} adults`;
}
