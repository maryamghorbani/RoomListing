export interface RawVideoUrl {
    med?: string | null;
}

export interface RawRoomImage {
    image_urls?: string[] | null;
}

export interface RawRoomCapacity {
    max_adult?: number | null;
    max_occupancy?: number | null;
}

export interface RawCancellationInfo {
    free_cancel_description?: string;
    free_cancellation_info?: string;
}

export interface RawTotalPrice {
    discounted_price_rounded?: number;
    discounted_price?: number;
    total_price_rounded?: number;
    total_price?: number;
}

export interface RawVariant {
    variant_id: string;
    name: string;
    total_price?: RawTotalPrice;
    price_info?: string;
    cancellation_info?: RawCancellationInfo;
}

export interface RawRoomProperties {
    bed_type?: string | null;
    video_url?: RawVideoUrl | null;
    room_images?: RawRoomImage[] | null;
    room_capacity?: RawRoomCapacity | null;
}

export interface RawRoom {
    room_type_code?: string | null;
    name: string;
    properties?: RawRoomProperties | null;
    variants?: RawVariant[];
}

export interface RawSample {
    rooms_by_serial_no: {
        rooms: RawRoom[];
    }[];
}
