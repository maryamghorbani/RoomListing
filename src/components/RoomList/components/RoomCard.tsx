import { memo, useMemo, useState } from 'react';
import type { Room } from '@/types/room';
import { MediaViewer } from './MediaViewer';
import { VariantCard } from './VariantCard';
import { ROOM_CARD } from '@/constants/ui';

interface RoomCardProps {
  room: Room;
}

function RoomCardComponent({ room }: RoomCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const variantsId = `room-${room.id}-variants`;

  const { visibleVariants, hasMoreVariants } = useMemo(() => {
    const total = room.variants.length;
    const hasMore = total > ROOM_CARD.INITIAL_VARIANTS_SHOWN;

    return {
      hasMoreVariants: hasMore,
      visibleVariants:
        isExpanded || !hasMore ? room.variants : room.variants.slice(0, ROOM_CARD.INITIAL_VARIANTS_SHOWN),
    };
  }, [room.variants, isExpanded]);

  return (
    <article className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
      <MediaViewer media={room.media} alt={room.name} />

      <div id={variantsId} className="mt-4 space-y-3">
        {visibleVariants.map((variant) => (
          <VariantCard
            key={variant.id}
            variant={variant}
            capacity={room.capacity}
            bedType={room.bedType}
          />
        ))}
      </div>
      {hasMoreVariants && (
        <button
          type="button"
          className="mt-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          onClick={() => setIsExpanded((prev) => !prev)}
          aria-expanded={isExpanded}
          aria-controls={variantsId}
        >
          {isExpanded ? 'Click to see less' : 'Click to see more'}
        </button>
      )}
    </article>
  );
}

export const RoomCard = memo(RoomCardComponent);
