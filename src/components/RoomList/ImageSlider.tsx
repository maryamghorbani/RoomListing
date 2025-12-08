import type { RoomMedia } from "../../types/room";
import { useState } from "react";

type ImageSliderProps = {
    images: RoomMedia[];
};

export function ImageSlider({ images }: ImageSliderProps) {
    const [index, setIndex] = useState(0);

    const goNext = () => setIndex((prev) => (prev + 1) % images.length);
    const goPrev = () =>
        setIndex((prev) => (prev - 1 + images.length) % images.length);

    const current = images[index];

    return (
        <div className="relative h-80 w-full overflow-hidden rounded-lg">
            <img
                src={current.url}
                alt=""
                className="h-full w-full object-cover"
                loading="lazy"
            />

            <button
                type="button"
                onClick={goPrev}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-sm text-white"
            >
                ‹
            </button>
            <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-sm text-white"
            >
                ›
            </button>

            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
                {images.map((img, i) => (
                    <button
                        key={img.url}
                        type="button"
                        onClick={() => setIndex(i)}
                        className={`h-2 w-2 rounded-full ${
                            i === index ? "bg-white" : "bg-white/50"
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}
