import { hotelDetails } from "../data/roomsFromSample";
import {useEffect, useState} from "react";

export function HotelHeader() {

    useEffect(() => {
        if (!hotelDetails?.name) return;

        document.title = `${hotelDetails.name} – Unravel Travel Explorium`;

        return () => {
            document.title = "Unravel – Travel Explorium";
        };
    }, []);

    const img = hotelDetails.images?.[0];

    const [expanded, setExpanded] = useState(false);

    const description = hotelDetails.description ?? "";
    const shortText = description.slice(0, 220); // ~2–3 lines

    if (!img) return null;

    const base1x =
        img.twoX?.landscape ??
        img.twoX?.fullscreen ??
        img.twoX?.square ??
        "";

    const base2x =
        img.threeX?.landscape ??
        img.threeX?.fullscreen ??
        img.threeX?.square ??
        "";

    const src = base1x || base2x;
    if (!src) return null;

    const srcSet = [
        base1x && `${base1x} 1x`,
        base2x && `${base2x} 2x`,
    ]
        .filter(Boolean)
        .join(", ");


    const addr = hotelDetails.address;
    const location =
        addr && typeof addr === "object"
            ? [addr.city, addr.country].filter(Boolean).join(", ")
            : "";

    return (
        <header className="w-full bg-white mb-10">
            <div className="mx-auto max-w-6xl px-4 pt-6">
                <div className="overflow-hidden rounded-2xl shadow-sm">
                    <img
                        src={src}
                        srcSet={srcSet || undefined}
                        className="w-full h-[420px] object-cover"
                        alt={hotelDetails.name}
                    />
                </div>
            </div>

            <div className="mx-auto max-w-6xl px-4 py-6">
                <h1 className="text-2xl font-semibold">{hotelDetails.name}</h1>
                <p className="text-slate-600">{location}</p>

                <p
                    className={`mt-3 leading-relaxed text-slate-700 text-sm 
                        transition-all duration-300 ease-in-out 
                        overflow-hidden 
                        ${expanded ? "max-h-[800px] opacity-100" : "max-h-[60px] opacity-90"}
                    `}
                >
                    {expanded ? description : shortText + "..."}
                    <button
                        onClick={() => setExpanded((p) => !p)}
                        className="ml-2 text-emerald-700 font-medium hover:underline"
                    >
                        {expanded ? "Show less" : "Show more"}
                    </button>
                </p>
            </div>
        </header>
    );
}
