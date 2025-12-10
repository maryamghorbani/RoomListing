import type { Room, RoomVariant, RoomMedia } from '@/types/room';
import type { RawHotelDetails } from '@/services/types';

// Mock Room Variants - covering different pricing scenarios
export const mockVariantWithDiscount: RoomVariant = {
  id: 'variant-1',
  name: 'Standard Rate',
  price: 800,
  originalPrice: 1000,
  discountPercent: 20,
  priceInfo: 'Price for 1 night',
  cancellationPolicy: 'Free cancellation until 24 hours before check-in',
};

export const mockVariantNoDiscount: RoomVariant = {
  id: 'variant-2',
  name: 'Non-refundable Rate',
  price: 750,
  priceInfo: 'Price for 1 night',
  cancellationPolicy: 'Non-refundable',
};

export const mockVariantZeroPrice: RoomVariant = {
  id: 'variant-3',
  name: 'Complimentary Rate',
  price: 0,
  priceInfo: 'Complimentary stay',
  cancellationPolicy: 'Free cancellation',
};

export const mockVariantHighDiscount: RoomVariant = {
  id: 'variant-4',
  name: 'Flash Sale',
  price: 300,
  originalPrice: 1200,
  discountPercent: 75,
  priceInfo: 'Limited time offer',
  cancellationPolicy: 'Free cancellation until 48 hours before check-in',
};

// Mock Room Media
export const mockImageMedia: RoomMedia[] = [
  { type: 'image', url: 'https://example.com/room1-image1.jpg' },
  { type: 'image', url: 'https://example.com/room1-image2.jpg' },
  { type: 'image', url: 'https://example.com/room1-image3.jpg' },
];

export const mockVideoMedia: RoomMedia[] = [
  { type: 'video', url: 'https://example.com/room-video.mp4' },
];

export const mockMixedMedia: RoomMedia[] = [
  { type: 'video', url: 'https://example.com/room-tour.mp4' },
  { type: 'image', url: 'https://example.com/room-image1.jpg' },
  { type: 'image', url: 'https://example.com/room-image2.jpg' },
];

export const mockEmptyMedia: RoomMedia[] = [];

// Mock Rooms - covering different scenarios
export const mockDeluxeRoom: Room = {
  id: 'deluxe-room-1',
  name: 'Deluxe Room',
  capacity: 'Up to 2 adults',
  bedType: 'King bed',
  media: mockImageMedia,
  variants: [mockVariantWithDiscount, mockVariantNoDiscount],
};

export const mockSuiteRoom: Room = {
  id: 'suite-room-1',
  name: 'Executive Suite',
  capacity: 'Up to 4 adults',
  bedType: 'King bed + Sofa bed',
  media: mockMixedMedia,
  variants: [mockVariantHighDiscount],
};

// Room with missing optional fields (edge case)
export const mockBasicRoom: Room = {
  id: 'basic-room-1',
  name: 'Standard Room',
  media: mockEmptyMedia,
  variants: [mockVariantZeroPrice],
};

// Room with undefined capacity and bedType (edge case)
export const mockRoomMissingDetails: Room = {
  id: 'room-missing-details',
  name: 'Budget Room',
  capacity: undefined,
  bedType: undefined,
  media: mockVideoMedia,
  variants: [mockVariantNoDiscount],
};

// Room with single image
export const mockSingleImageRoom: Room = {
  id: 'single-image-room',
  name: 'Compact Room',
  capacity: 'Up to 1 adult',
  bedType: 'Single bed',
  media: [{ type: 'image', url: 'https://example.com/single-room.jpg' }],
  variants: [mockVariantWithDiscount],
};

// Array of all mock rooms for comprehensive testing
export const mockRooms: Room[] = [
  mockDeluxeRoom,
  mockSuiteRoom,
  mockBasicRoom,
  mockRoomMissingDetails,
  mockSingleImageRoom,
];

// Mock Hotel Details for service testing
export const mockHotelDetails: RawHotelDetails = {
  name: 'Grand Test Hotel',
  description: 'A luxurious test hotel in the heart of the city',
  address: {
    city: 'Test City',
    country: 'Test Country',
  },
  images: [
    {
      twoX: {
        square: 'https://example.com/hotel-square-2x.jpg',
        portrait: 'https://example.com/hotel-portrait-2x.jpg',
        landscape: 'https://example.com/hotel-landscape-2x.jpg',
        thumbnail: 'https://example.com/hotel-thumb-2x.jpg',
        fullscreen: 'https://example.com/hotel-full-2x.jpg',
      },
      threeX: {
        square: 'https://example.com/hotel-square-3x.jpg',
        portrait: 'https://example.com/hotel-portrait-3x.jpg',
        landscape: 'https://example.com/hotel-landscape-3x.jpg',
        thumbnail: 'https://example.com/hotel-thumb-3x.jpg',
        fullscreen: 'https://example.com/hotel-full-3x.jpg',
      },
    },
  ],
};

// Mock Hotel Details with minimal data (edge case)
export const mockMinimalHotelDetails: RawHotelDetails = {
  name: 'Basic Test Hotel',
};

// Mock Hotel Details with null/undefined fields (edge case)
export const mockHotelDetailsWithNulls: RawHotelDetails = {
  name: 'Hotel with Nulls',
  description: undefined,
  address: undefined,
  images: null,
};

// Export arrays for easy iteration in tests
export const allMockVariants: RoomVariant[] = [
  mockVariantWithDiscount,
  mockVariantNoDiscount,
  mockVariantZeroPrice,
  mockVariantHighDiscount,
];

export const allMockHotelDetails: RawHotelDetails[] = [
  mockHotelDetails,
  mockMinimalHotelDetails,
  mockHotelDetailsWithNulls,
];
