import type { RoomMedia } from "../../types/room";
import { ImageSlider } from "./ImageSlider";

type MediaViewerProps = {
  media: RoomMedia[];
};

export function MediaViewer({ media }: MediaViewerProps) {
  if (!media.length) return null;

  const video = media.find((m) => m.type === "video");
  const images = media.filter((m) => m.type === "image");

  if (video) {
    return (
        <video
            src={video.url}
            controls
            className="h-80 w-full rounded-lg object-cover"
        />
    );
  }

  if (images.length === 1) {
    return (
        <img
            src={images[0].url}
            alt=""
            className="h-80 w-full rounded-lg object-cover"
        />
    );
  }

  return <ImageSlider images={images} />;
}
