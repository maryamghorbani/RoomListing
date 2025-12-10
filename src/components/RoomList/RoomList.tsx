import { getRooms } from '@/services/roomService';
import { useInfiniteRooms } from '@/hooks/useInfiniteRooms';
import { PAGINATION } from '@/constants/ui';
import { RoomCard } from './RoomCard';

export function RoomList() {
  const rooms = getRooms();
  const hasData = Array.isArray(rooms) && rooms.length > 0;

  const { visibleRooms, hasMore, sentinelRef, isLoadingMore } =
    useInfiniteRooms(rooms, PAGINATION.DEFAULT_PAGE_SIZE);

  if (!hasData) {
    return (
      <section className="mx-auto max-w-3xl py-6">
        <h1 className="mb-6 text-2xl font-semibold">Room Listing</h1>

        <div className="rounded-lg border border-red-300 bg-red-50 p-6 text-center shadow-sm">
          <div className="text-red-600 text-lg font-medium mb-2">
            ⚠️ Unable to load room data
          </div>
          <p className="text-red-700 text-sm">
            Please refresh the page or try again later.
          </p>
        </div>
      </section>
    );
  }

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
