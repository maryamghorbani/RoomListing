import { mockRooms } from "../../data/sample";
import { RoomCard } from "./RoomCard";

export function RoomList() {
  return (
    <div>
        <h1 className="mb-4 text-center text-lg font-semibold text-slate-900">
            Room Listing
        </h1>
        <ul>
            {mockRooms.map((room) => (
              <RoomCard key={room.id} room={room} />
            ))}
        </ul>
    </div>
  );
}
