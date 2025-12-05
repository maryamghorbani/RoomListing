import { mockRooms } from "../../data/sample";
import { RoomCard } from "./RoomCard";

export function RoomList() {
  return (
    <div>
      <h1>Room Listing</h1>
      <ul>
        {mockRooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
      </ul>
    </div>
  );
}
