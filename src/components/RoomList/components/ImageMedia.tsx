import { useState } from 'react';
import { Skeleton } from '@/components/common/Skeleton';
import type { RoomMedia } from '@/types/room';
import { ImageSlider } from './ImageSlider';

interface ImageMediaProps {
  images: RoomMedia[];
  alt?: string;
}

export function ImageMedia({ images, alt }: ImageMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const primary = images[0];

  if (!primary) return null;

  const containerBaseClass =
    'relative h-56 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden rounded-lg bg-slate-100';

  if (images.length === 1) {
    return (
      <div className={containerBaseClass}>
        {!isLoaded && <Skeleton className="absolute inset-0" />}

        <img
          src={primary.url}
          loading="lazy"
          onLoad={() => setIsLoaded(true)}
          onError={() => setIsLoaded(true)}
          className="h-full w-full object-cover"
          alt={alt ?? ''}
        />
      </div>
    );
  }

  return (
    <div className={containerBaseClass}>
      <ImageSlider images={images} />
    </div>
  );
}
