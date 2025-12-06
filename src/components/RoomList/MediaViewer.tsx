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
        style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
      />
    );
  }

  return (
    <img
      src={primary.url}
      alt=""
      style={{ width: "100%", maxHeight: 300, objectFit: "cover" }}
    />
  );
}
