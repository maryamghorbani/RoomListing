import { useState } from "react";
import { Skeleton } from "../common/Skeleton";

interface ImageMediaProps {
    url: string;
    alt?: string;
}

export function ImageMedia({ url, alt }: ImageMediaProps) {
    const [isLoaded, setIsLoaded] = useState(false);

    return (
        <div className="relative h-80 w-full overflow-hidden rounded-lg bg-slate-100">
            {!isLoaded && <Skeleton className="absolute inset-0" />}

            <img
                src={url}
                loading="lazy"
                onLoad={() => setIsLoaded(true)}
                onError={() => setIsLoaded(true)}
                className="h-full w-full object-cover"
                alt={alt ?? ""}
            />
        </div>
    );
}
