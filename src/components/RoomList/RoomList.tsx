import { useEffect, useRef, useState } from "react";
import { roomsFromSample } from "../../data/roomsFromSample.ts";
import { RoomCard } from "./RoomCard";

const PAGE_SIZE = 10;

export function RoomList() {
  const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);
  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleRooms = roomsFromSample.slice(0, visibleCount);
  const hasMore = visibleCount < roomsFromSample.length;

  useEffect(() => {
    if (!hasMore) return;

    const sentinel = sentinelRef.current;
    if (!sentinel) return;

    let loadingMore = false;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !loadingMore) {
          loadingMore = true;

          setVisibleCount((prev) =>
            Math.min(prev + PAGE_SIZE, roomsFromSample.length)
          );

          // Small delay to let layout update
          setTimeout(() => {
            loadingMore = false;
          }, 100);
        }
      },
      {
        root: null,
        rootMargin: "200px",
        threshold: 0.1,
      }
    );

    observer.observe(sentinel);

    return () => {
      observer.disconnect();
    };
  }, [hasMore]);

  return (
    <section className="mx-auto max-w-3xl py-6">
      <h1 className="mb-6 text-2xl font-semibold">Room Listing</h1>

      <ul className="space-y-4">
        {visibleRooms.map((room, index) => (
          <RoomCard key={`${room.id}-${index}`} room={room} />
        ))}
      </ul>

      {hasMore && <div ref={sentinelRef} className="h-10" aria-hidden="true" />}
    </section>
  );
}
