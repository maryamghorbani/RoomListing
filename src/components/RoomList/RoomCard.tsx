import type { Room } from "../../types/room";
import { MediaViewer } from "./MediaViewer";
import { VariantCard } from "./VariantCard";
import { useState } from "react";


interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
    const [isExpanded, setIsExpanded] = useState(false);
    const hasMoreVariants = room.variants.length > 2;
    const visibleVariants = isExpanded
        ? room.variants
        : room.variants.slice(0, 2);

    const variantsId = `room-${room.id}-variants`;

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
                    {isExpanded ? "Click to see less" : "Click to see more"}
                </button>
            )}
        </article>
    );
}

