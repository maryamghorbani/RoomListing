import { memo } from 'react';
import type { RoomVariant } from '@/types/room';
import { formatPrice } from '@/utils/formatters';

type VariantCardProps = {
  variant: RoomVariant;
  capacity?: string;
  bedType?: string;
};

function VariantCardComponent({
  variant,
  capacity,
  bedType,
}: VariantCardProps) {
  return (
    <div className="mt-3 sm:mt-4 rounded-xl sm:rounded-2xl border border-emerald-500 bg-white shadow-sm overflow-hidden">
      <div className="px-4 sm:px-5 py-3 sm:py-4 space-y-2">
        <div className="space-y-1">
          <p className="text-sm sm:text-base font-semibold text-slate-900">
            {variant.name}
          </p>

          {bedType && (
            <p className="text-xs sm:text-sm text-slate-700">Double bed · {bedType}</p>
          )}

          {capacity && <p className="text-xs sm:text-sm text-slate-700">{capacity}</p>}
        </div>
        <p className="text-xs text-slate-500">{variant.priceInfo}</p>

        <div className="pt-2 space-y-1">
          <div className="flex flex-wrap items-baseline gap-2 sm:gap-3">
            {variant.originalPrice && (
              <span className="text-xs sm:text-sm text-slate-400 line-through">
                {formatPrice(variant.originalPrice)}
              </span>
            )}

            <span className="text-lg sm:text-xl font-bold text-slate-900">
              {formatPrice(variant.price)}
            </span>

            {variant.discountPercent && (
              <span className="rounded-full bg-indigo-600 px-2 sm:px-3 py-0.5 sm:py-1 text-xs font-semibold text-white">
                {variant.discountPercent}% off
              </span>
            )}
          </div>
        </div>

        <button
          type="button"
          className="mt-2 text-sm font-semibold text-emerald-700 hover:text-emerald-800"
        >
          Cancellation policy &gt;
        </button>
      </div>

      <button
        type="button"
        className="block w-full bg-emerald-600 px-4 sm:px-5 py-2.5 sm:py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700 active:bg-emerald-800"
      >
        Select
      </button>
    </div>
  );
}

export const VariantCard = memo(VariantCardComponent);
