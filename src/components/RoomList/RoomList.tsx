import { roomsFromSample } from "../../data/roomsFromSample";
import { useInfiniteRooms } from "../../hooks/useInfiniteRooms";
import { RoomCard } from "./RoomCard";

export function RoomList() {
  const { visibleRooms, hasMore, sentinelRef, isLoadingMore } =
      useInfiniteRooms(roomsFromSample, 10);

  return (
      <section className="mx-auto max-w-3xl py-6">
        <h1 className="mb-6 text-2xl font-semibold">Room Listing</h1>

        <ul className="space-y-4">
          {visibleRooms.map((room, index) => (
              <li key={`${room.id}-${index}`}>
                <RoomCard room={room} />
              </li>
          ))}
        </ul>

        {hasMore && <div ref={sentinelRef} className="h-10" aria-hidden="true" />}

        {isLoadingMore && (
            <div className="py-4 text-center text-sm text-slate-500">
              Loading more rooms…
            </div>
        )}
      </section>
  );
}
