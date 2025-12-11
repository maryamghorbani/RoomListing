import { useEffect, useRef, useState } from 'react';
import type { Room } from '@/types/room';
import { PAGINATION } from '@/constants/ui';

export function useInfiniteRooms(
  allRooms: Room[],
  pageSize = PAGINATION.DEFAULT_PAGE_SIZE,
) {
  const [visibleCount, setVisibleCount] = useState<number>(pageSize);
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  const sentinelRef = useRef<HTMLDivElement | null>(null);

  const visibleRooms = allRooms.slice(0, visibleCount);
  const hasMore = visibleCount < allRooms.length;

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
          setIsLoadingMore(true);

          setTimeout(() => {
            setVisibleCount((prev) =>
              Math.min(prev + pageSize, allRooms.length),
            );
            setIsLoadingMore(false);
            loadingMore = false;
          }, PAGINATION.LOAD_MORE_DELAY);
        }
      },
      {
        root: null,
        rootMargin: PAGINATION.INTERSECTION_ROOT_MARGIN,
        threshold: PAGINATION.INTERSECTION_THRESHOLD,
      },
    );

    observer.observe(sentinel);
    return () => observer.disconnect();
  }, [hasMore, pageSize, allRooms.length]);

  return { visibleRooms, hasMore, sentinelRef, isLoadingMore };
}
