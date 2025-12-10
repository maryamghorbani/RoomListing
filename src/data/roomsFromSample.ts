import raw from './sample.json';

import type { Room, RoomMedia, RoomVariant } from '@/types/room';
import type {
  RawSample,
  RawRoom,
  RawVariant,
  RawHotelDetails,
} from './rawSampleTypes';
import {
  mapBedType,
  formatCapacity,
  calculateDiscountPercent,
} from '@/utils';

const rawData = raw as RawSample;

export const hotelDetails: RawHotelDetails = rawData.hotel_details;

// Media mapping logic: video first, then images
function mapMedia(room: RawRoom): RoomMedia[] {
  const videoUrl: string | undefined | null = room.properties?.video_url?.med;
  if (videoUrl) {
    return [{ type: 'video', url: videoUrl }];
  }

  const roomImages = room.properties?.room_images ?? [];
  const imageUrls: string[] = roomImages.flatMap((img) => img.image_urls ?? []);

  if (imageUrls.length > 0) {
    return imageUrls.map((url) => ({
      type: 'image' as const,
      url,
    }));
  }

  return [];
}

function mapVariant(v: RawVariant): RoomVariant {
  const tp = v.total_price;

  const price =
    tp?.discounted_price_rounded ??
    tp?.discounted_price ??
    tp?.total_price_rounded ??
    tp?.total_price ??
    0;

  const originalPrice = tp?.total_price_rounded ?? tp?.total_price ?? undefined;

  const discountPercent =
    originalPrice && originalPrice > price
      ? calculateDiscountPercent(originalPrice, price)
      : undefined;

  const cancellationPolicy =
    v.cancellation_info?.free_cancel_description ??
    v.cancellation_info?.free_cancellation_info ??
    'Cancellation policy';

  return {
    id: v.variant_id,
    name: v.name,
    price,
    originalPrice,
    discountPercent,
    priceInfo: v.price_info ?? 'Price for 1 night',
    cancellationPolicy: cancellationPolicy.trim(),
  };
}

const rawRooms: RawRoom[] = rawData.rooms_by_serial_no?.[0]?.rooms ?? [];
// replace with "const rawRooms: RawRoom[] = [];" to see the error state

export const roomsFromSample: Room[] = rawRooms.map((room, index) => ({
  id: room.room_type_code ?? String(index),
  name: room.name,
  capacity: formatCapacity(
    room.properties?.room_capacity?.max_adult ?? undefined,
    room.properties?.room_capacity?.max_occupancy ?? undefined,
  ),
  bedType: mapBedType(room.properties?.bed_type),
  media: mapMedia(room),
  variants: (room.variants ?? []).map(mapVariant),
}));
