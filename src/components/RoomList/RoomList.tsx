import { mockRooms } from "../../data/sample";

export function RoomList() {
  return (
    <div>
      <h1>Room Listing</h1>
      <ul>
        {mockRooms.map((room) => (
          <li key={room.id}>{room.name}</li>
        ))}
      </ul>
    </div>
  );
}
