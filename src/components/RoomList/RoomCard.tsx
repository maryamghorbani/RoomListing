import type { Room } from "../../types/room";
import { MediaViewer } from "./MediaViewer";

interface RoomCardProps {
  room: Room;
}

export function RoomCard({ room }: RoomCardProps) {
    return (
        <article className="mb-6 rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
            <h2 className="mb-2 text-xl font-semibold text-slate-900">
                {room.name}
            </h2>

            <p className="mb-4 text-sm text-slate-600">{room.description}</p>

            <p className="text-sm text-slate-800">
                <span className="font-semibold">Capacity:</span> {room.capacity}
            </p>
            <p className="mb-4 text-sm text-slate-800">
                <span className="font-semibold">Bed type:</span> {room.bedType}
            </p>

            <MediaViewer media={room.media} />
        </article>
    );
}

