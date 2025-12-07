import raw from "./sample.json";
import type { Room, RoomMedia, RoomVariant } from "../types/room";

// raw data types
type Raw = typeof raw;
type RawRoom = Raw["rooms_by_serial_no"][number]["rooms"][number];
type RawVariant = RawRoom["variants"][number];

// --- Helper functions ---

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
    // 1) If video_url exists, use it
    const videoUrl: string | undefined = room.properties?.video_url?.med;
    if (videoUrl) {
        return [
            {
                type: "video",
                url: videoUrl,
            },
        ];
    }

    // 2) If room_images exist, get all image_urls
    const roomImages = room.properties?.room_images ?? [];
    const imageUrls: string[] = roomImages.flatMap((img: any) => img.image_urls ?? []);

    if (imageUrls.length > 0) {
        return imageUrls.map((url) => ({
            type: "image" as const,
            url,
        }));
    }

    // 3) No video or images → empty media array
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
        discountPercent = Math.round(((originalPrice - price) / originalPrice) * 100);
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
        // Note: This text usually includes "Price for 1 night ..."
        priceInfo: v.price_info ?? "Price for 1 night",
        cancellationPolicy: cancellationPolicy.trim(),
    };
}

// Capacity: "Up to X adults"
function mapCapacity(room: RawRoom): string {
    const cap = room.properties?.room_capacity;
    const maxAdult = cap?.max_adult ?? cap?.max_occupancy;
    if (maxAdult) {
        return `Up to ${maxAdult} adults`;
    }
    return "Up to 2 adults";
}

// --- Main mapping ---

const rawRooms: RawRoom[] = raw.rooms_by_serial_no[0].rooms;

// This is not a hook, just mapped data
export const roomsFromSample: Room[] = rawRooms.map((room, index) => ({
    id: room.room_type_code ?? String(index),
    name: room.name,
    capacity: mapCapacity(room),
    bedType: mapBedType(room.properties?.bed_type),
    media: mapMedia(room),
    variants: (room.variants ?? []).map(mapVariant),
}));
