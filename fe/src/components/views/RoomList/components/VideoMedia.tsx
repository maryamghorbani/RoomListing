import { useEffect, useRef, useState } from 'react';
import { Skeleton } from '@/components/common/Skeleton.tsx';
import { MEDIA } from '@/constants/ui.ts';

interface VideoMediaProps {
  url: string;
}

export function VideoMedia({ url }: VideoMediaProps) {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const containerEl = containerRef.current;
    const videoEl = videoRef.current;
    if (!containerEl || !videoEl) return;

    videoEl.muted = true;
    videoEl.playsInline = true;

    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (!entry) return;

        if (entry.isIntersecting) {
          if (!videoEl.src) {
            videoEl.src = url;
          }
          videoEl.play().catch(() => {});
        } else {
          videoEl.pause();
        }
      },
      { threshold: MEDIA.VIDEO_INTERSECTION_THRESHOLD },
    );

    observer.observe(containerEl);
    return () => {
      observer.disconnect();
      if (videoEl) {
        videoEl.pause();
      }
    };
  }, [url]);

  return (
    <div
      ref={containerRef}
      className="relative h-56 sm:h-64 md:h-72 lg:h-80 w-full overflow-hidden rounded-lg bg-slate-100"
    >
      {!isLoaded && <Skeleton className="absolute inset-0" />}

      <video
        ref={videoRef}
        controls
        className="h-full w-full object-cover"
        onLoadedData={() => setIsLoaded(true)}
      />
    </div>
  );
}
