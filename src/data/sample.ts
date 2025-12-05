import type { Room } from "../types/room";

export const mockRooms: Room[] = [
  {
    id: "room-1",
    name: "Deluxe City View",
    description: "Spacious room with stunning city skyline view.",
    capacity: "Up to 2 adults",
    bedType: "Double bed",
    media: [
      {
        type: "video",
        url: "https://example.com/videos/room-1.mp4",
      },
      {
        type: "image",
        url: "https://example.com/images/room-1-1.jpg",
      },
    ],
    variants: [
      {
        id: "room-1-var-1",
        name: "Room only",
        price: 1517,
        originalPrice: 2107,
        discountPercent: 28,
        priceInfo: "Price for 1 night · Includes taxes & fees",
        cancellationPolicy: "Free cancellation until 24 hours before check-in",
      },
      {
        id: "room-1-var-2",
        name: "Breakfast included",
        price: 1650,
        priceInfo: "Price for 1 night · Breakfast included",
        cancellationPolicy: "Partial refund if cancelled later",
      },
    ],
  },
  {
    id: "room-2",
    name: "Premier Sea View",
    description: "Bright room with panoramic sea view and balcony.",
    capacity: "Up to 3 guests",
    bedType: "King bed",
    media: [
      {
        type: "image",
        url: "https://example.com/images/room-2-1.jpg",
      },
      {
        type: "image",
        url: "https://example.com/images/room-2-2.jpg",
      },
    ],
    variants: [
      {
        id: "room-2-var-1",
        name: "Room only",
        price: 1800,
        priceInfo: "Price for 1 night · Includes taxes & fees",
        cancellationPolicy: "Non-refundable",
      },
      {
        id: "room-2-var-2",
        name: "Half board",
        price: 1950,
        priceInfo: "Dinner included · Price for 1 night",
        cancellationPolicy: "Free cancellation up to 48 hours before",
      },
    ],
  },
];
