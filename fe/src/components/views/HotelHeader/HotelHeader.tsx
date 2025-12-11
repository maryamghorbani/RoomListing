import { getHotelDetails } from '@/services/roomService.ts';
import { useEffect, useState } from 'react';
import { APP_NAME, DEFAULT_PAGE_TITLE } from '@/constants/app.ts';
import { TEXT } from '@/constants/ui.ts';

export function HotelHeader() {
  const hotelDetails = getHotelDetails();

  useEffect(() => {
    if (!hotelDetails?.name) return;
    document.title = `${hotelDetails.name} – ${APP_NAME}`;

    return () => {
      document.title = DEFAULT_PAGE_TITLE;
    };
  }, [hotelDetails?.name]);

  const img = hotelDetails.images?.[0];

  const [expanded, setExpanded] = useState(false);

  const description = hotelDetails.description ?? '';
  const shouldTruncate = description.length > TEXT.DESCRIPTION_TRUNCATE_LENGTH;
  const displayText = expanded || !shouldTruncate ? description : description.slice(0, TEXT.DESCRIPTION_TRUNCATE_LENGTH) + '...';

  if (!img) return null;

  const base1x =
    img.twoX?.landscape ?? img.twoX?.fullscreen ?? img.twoX?.square ?? '';

  const base2x =
    img.threeX?.landscape ?? img.threeX?.fullscreen ?? img.threeX?.square ?? '';

  const src = base1x || base2x;
  if (!src) return null;

  const srcSet = [base1x && `${base1x} 1x`, base2x && `${base2x} 2x`]
    .filter(Boolean)
    .join(', ');

  const addr = hotelDetails.address;
  const location =
    addr && typeof addr === 'object'
      ? [addr.city, addr.country].filter(Boolean).join(', ')
      : '';

  return (
    <header className="w-full bg-white mb-6 md:mb-10">
      <div className="mx-auto max-w-6xl px-3 sm:px-4 pt-4 sm:pt-6">
        <div className="overflow-hidden rounded-lg sm:rounded-2xl shadow-sm">
          <img
            src={src}
            srcSet={srcSet || undefined}
            className="w-full h-48 sm:h-64 md:h-80 lg:h-[420px] object-cover"
            alt={hotelDetails.name}
          />
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-3 sm:px-4 py-4 sm:py-6">
        <h1 className="text-xl sm:text-2xl lg:text-3xl font-semibold">{hotelDetails.name}</h1>
        <p className="text-sm sm:text-base text-slate-600">{location}</p>

        <div className="mt-3">
          <p className="leading-relaxed text-slate-700 text-sm">
            {displayText}
          </p>
          {shouldTruncate && (
            <button
              onClick={() => setExpanded((p) => !p)}
              className="mt-1 text-emerald-700 font-medium hover:underline text-sm"
            >
              {expanded ? 'Show less' : 'Show more'}
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
