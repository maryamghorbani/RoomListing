import { roomsFromSample } from "../../data/roomsFromSample.ts";
import { RoomCard } from "./RoomCard";

export function RoomList() {
  return (
    <div>
        <h1 className="mb-4 text-center text-lg font-semibold text-slate-900">
            Room Listing
        </h1>
        <ul>
            {roomsFromSample.map((room, index) => (
                <RoomCard key={`${room.id}-${index}`} room={room} />
            ))}
        </ul>
    </div>
  );
}
