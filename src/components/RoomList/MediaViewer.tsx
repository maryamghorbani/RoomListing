import { ImageMedia } from "./ImageMedia";
import { VideoMedia } from "./VideoMedia";
import type { RoomMedia } from "../../types/room";

interface Props {
  media: RoomMedia[];
}

export function MediaViewer({ media }: Props) {
  const primary = media[0];
  if (!primary) return null;

  if (primary.type === "image") {
    return <ImageMedia url={primary.url} />;
  }

  return <VideoMedia url={primary.url} />;
}
