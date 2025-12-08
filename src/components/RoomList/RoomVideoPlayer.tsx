import { useEffect, useRef } from "react";

type RoomVideoPlayerProps = {
    url: string;
};

export function RoomVideoPlayer({ url }: RoomVideoPlayerProps) {
    const containerRef = useRef<HTMLDivElement | null>(null);
    const videoRef = useRef<HTMLVideoElement | null>(null);

    useEffect(() => {
        const container = containerRef.current;
        const videoEl = videoRef.current;
        if (!container || !videoEl) return;

        videoEl.muted = true;
        videoEl.playsInline = true;

        let hasLoaded = false;

        const observer = new IntersectionObserver(
            (entries) => {
                const [entry] = entries;
                if (!videoEl) return;

                if (entry.isIntersecting) {
                    if (!hasLoaded) {
                        videoEl.src = url;
                        videoEl.load();
                        hasLoaded = true;
                    }

                    videoEl.play().catch(() => {});
                } else {
                    videoEl.pause();
                }
            },
            {
                root: null,
                threshold: 0.4,
            }
        );

        observer.observe(container);

        return () => {
            observer.disconnect();
            videoEl.pause();
        };
    }, []);

    return (
        <div ref={containerRef} className="h-80 w-full overflow-hidden rounded-lg">
            <video
                ref={videoRef}
                controls
                className="h-full w-full object-cover"
            />
        </div>
    );
}
