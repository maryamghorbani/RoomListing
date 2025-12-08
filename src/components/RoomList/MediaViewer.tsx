import { ImageMedia } from "./ImageMedia";
import { VideoMedia } from "./VideoMedia";
import type { RoomMedia } from "../../types/room";

export function MediaViewer({ media, alt }: { media: RoomMedia[]; alt?: string }) {
  const primary = media[0];
  if (!primary) return null;

  if (primary.type === "image") {
    return <ImageMedia url={primary.url} alt={alt} />;
  }

  return <VideoMedia url={primary.url} />;
}
