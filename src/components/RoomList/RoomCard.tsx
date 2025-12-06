import type { Room } from "../../types/room";
import { MediaViewer } from "./MediaViewer";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
  return (
    <div style={{ border: "1px solid #ccc", padding: 16, marginBottom: 20 }}>
      <h2>{room.name}</h2>
      <p>{room.description}</p>

      <p>
        <strong>Capacity:</strong> {room.capacity}
      </p>
      <p>
        <strong>Bed type:</strong> {room.bedType}
      </p>

      <div style={{ background: "#eee", height: 150, marginTop: 10 }}>
        <MediaViewer media={room.media} />
      </div>
    </div>
  );
}
