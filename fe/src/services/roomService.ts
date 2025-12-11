import type { Room } from '@/types/room';
import { getRoomsFromData, getHotelDetailsFromData } from './dataMapper';

/**
 * In a real application, this would fetch from an API
 */
export function getRooms(): Room[] {
  return getRoomsFromData();
}

export function getHotelDetails() {
  return getHotelDetailsFromData();
}
