export type MediaType = "video" | "image";

export interface RoomMedia {
  type: MediaType;
  url: string;
}

export interface RoomVariant {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  discountPercent?: number;
  priceInfo: string;
  cancellationPolicy: string;
}

export interface Room {
  id: string;
  name: string;
  capacity?: string;
  bedType?: string;
  media: RoomMedia[];
  variants: RoomVariant[];
}
