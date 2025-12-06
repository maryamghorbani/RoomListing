import type { RoomMedia } from "../../types/room";

type MediaViewerProps = {
  media: RoomMedia[];
};

export function MediaViewer({ media }: MediaViewerProps) {
  if (!media.length) return null;

  const primary = media[0];

  if (primary.type === "video") {
    return (
        <video
            src={primary.url}
            controls
            className="h-80 w-full rounded-lg object-cover"
        />
    );
  }

  return (
      <img
          src={primary.url}
          alt=""
          className="h-80 w-full rounded-lg object-cover"
      />
  );
}
