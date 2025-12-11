import { describe, it, expect, vi, beforeEach } from 'vitest';
import { getRooms, getHotelDetails } from './roomService';
import * as dataMapper from './dataMapper';
import { mockRooms, mockHotelDetails } from '@/__tests__/mocks/roomData';

vi.mock('./dataMapper');

describe('roomService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  describe('getRooms', () => {
    it('calls getRoomsFromData and returns its result', () => {
      const getRoomsFromDataSpy = vi
        .spyOn(dataMapper, 'getRoomsFromData')
        .mockReturnValue(mockRooms);

      const result = getRooms();

      expect(getRoomsFromDataSpy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockRooms);
    });

    it('works when dataMapper returns an empty array', () => {
      const getRoomsFromDataSpy = vi
        .spyOn(dataMapper, 'getRoomsFromData')
        .mockReturnValue([]);

      const result = getRooms();

      expect(getRoomsFromDataSpy).toHaveBeenCalledTimes(1);
      expect(result).toEqual([]);
    });
  });

  describe('getHotelDetails', () => {
    it('calls getHotelDetailsFromData and returns its result', () => {
      const getHotelDetailsSpy = vi
        .spyOn(dataMapper, 'getHotelDetailsFromData')
        .mockReturnValue(mockHotelDetails);

      const result = getHotelDetails();

      expect(getHotelDetailsSpy).toHaveBeenCalledTimes(1);
      expect(result).toBe(mockHotelDetails);
    });
  });
});
