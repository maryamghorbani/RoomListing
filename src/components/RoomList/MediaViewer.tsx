import type { RoomMedia } from "../../types/room";
import { ImageMedia } from "./ImageMedia";
import { VideoMedia } from "./VideoMedia";

interface MediaViewerProps {
  media: RoomMedia[];
  alt?: string;
}

export function MediaViewer({ media, alt }: MediaViewerProps) {
  const primary = media[0];
  if (!primary) return null;

  const images = media.filter((m) => m.type === "image");

  if (primary.type === "image") {
    return <ImageMedia images={images} alt={alt} />;
  }

  return <VideoMedia url={primary.url} />;
}
