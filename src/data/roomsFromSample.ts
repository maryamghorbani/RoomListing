import raw from "./sample.json";

import type { Room, RoomMedia, RoomVariant } from "../types/room";
import type {
    RawSample,
    RawRoom,
    RawVariant,
    RawHotelDetails,
} from "./rawSampleTypes";

const rawData = raw as RawSample;

export const hotelDetails: RawHotelDetails = rawData.hotel_details;

function mapBedType(rawBed?: string | null): string {
    if (!rawBed) return "Bed";
    switch (rawBed.toUpperCase()) {
        case "DOUBLE":
            return "Double bed";
        case "KING":
            return "King bed";
        case "TWIN":
            return "Twin bed";
        default:
            return rawBed;
    }
}

// Media mapping logic: video first, then images
function mapMedia(room: RawRoom): RoomMedia[] {
    const videoUrl: string | undefined | null = room.properties?.video_url?.med;
    if (videoUrl) {
        return [{ type: "video", url: videoUrl }];
    }

    const roomImages = room.properties?.room_images ?? [];
    const imageUrls: string[] = roomImages.flatMap((img) => img.image_urls ?? []);

    if (imageUrls.length > 0) {
        return imageUrls.map((url) => ({
            type: "image" as const,
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

    const originalPrice =
        tp?.total_price_rounded ?? tp?.total_price ?? undefined;

    let discountPercent: number | undefined;
    if (originalPrice && originalPrice > price) {
        discountPercent = Math.round(
            ((originalPrice - price) / originalPrice) * 100
        );
    }

    const cancellationPolicy =
        v.cancellation_info?.free_cancel_description ??
        v.cancellation_info?.free_cancellation_info ??
        "Cancellation policy";

    return {
        id: v.variant_id,
        name: v.name,
        price,
        originalPrice,
        discountPercent,
        priceInfo: v.price_info ?? "Price for 1 night",
        cancellationPolicy: cancellationPolicy.trim(),
    };
}

function mapCapacity(room: RawRoom): string {
    const cap = room.properties?.room_capacity;
    const maxAdult = cap?.max_adult ?? cap?.max_occupancy;
    if (maxAdult) {
        return `Up to ${maxAdult} adults`;
    }
    return "Up to 2 adults";
}

const rawRooms: RawRoom[] = rawData.rooms_by_serial_no?.[0]?.rooms ?? [];

export const roomsFromSample: Room[] = rawRooms.map((room, index) => ({
    id: room.room_type_code ?? String(index),
    name: room.name,
    capacity: mapCapacity(room),
    bedType: mapBedType(room.properties?.bed_type),
    media: mapMedia(room),
    variants: (room.variants ?? []).map(mapVariant),
}));
