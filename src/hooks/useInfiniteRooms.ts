import { useEffect, useRef, useState } from "react";
import type { Room } from "../types/room";

const DEFAULT_PAGE_SIZE = 10;

export function useInfiniteRooms(allRooms: Room[], pageSize = DEFAULT_PAGE_SIZE) {

    const [visibleCount, setVisibleCount] = useState(pageSize);
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
                            Math.min(prev + pageSize, allRooms.length)
                        );
                        setIsLoadingMore(false);
                        loadingMore = false;
                    }, 400);
                }
            },
            {
                root: null,
                rootMargin: "200px",
                threshold: 0.1,
            }
        );

        observer.observe(sentinel);
        return () => observer.disconnect();
    }, [hasMore, pageSize, allRooms.length]);

    return { visibleRooms, hasMore, sentinelRef, isLoadingMore };
}
