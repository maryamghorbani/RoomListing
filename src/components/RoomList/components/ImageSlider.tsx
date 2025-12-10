import type { RoomMedia } from '@/types/room';
import { useState } from 'react';

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
        alt={`Image ${index + 1} of ${images.length}`}
        className="h-full w-full object-cover"
        loading="lazy"
      />

      <button
        type="button"
        onClick={goPrev}
        aria-label="Previous image"
        className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-sm text-white hover:bg-black/60"
      >
        ‹
      </button>
      <button
        type="button"
        onClick={goNext}
        aria-label="Next image"
        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-black/40 px-2 py-1 text-sm text-white hover:bg-black/60"
      >
        ›
      </button>

      <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1">
        {images.map((img, i) => (
          <button
            key={img.url}
            type="button"
            onClick={() => setIndex(i)}
            aria-label={`Go to image ${i + 1}`}
            aria-current={i === index ? 'true' : 'false'}
            className={`h-2 w-2 rounded-full ${
              i === index ? 'bg-white' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
