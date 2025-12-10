import type { Room } from '@/types/room';
import { roomsFromSample, hotelDetails } from '@/data/roomsFromSample';

/**
 * In a real application, this would fetch from an API
 */

export function getRooms(): Room[] {
  return roomsFromSample;
}

export function getHotelDetails() {
  return hotelDetails;
}
