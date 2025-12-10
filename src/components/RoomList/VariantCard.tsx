import { memo } from 'react';
import type { RoomVariant } from '@/types/room';

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
    <div className="mt-4 rounded-2xl border border-emerald-500 bg-white shadow-sm overflow-hidden">
      <div className="px-5 py-4 space-y-2">
        <div className="space-y-1">
          <p className="text-base font-semibold text-slate-900">
            {variant.name}
          </p>

          {bedType && (
            <p className="text-sm text-slate-700">Double bed · {bedType}</p>
          )}

          {capacity && <p className="text-sm text-slate-700">{capacity}</p>}
        </div>
        <p className="text-xs text-slate-500">{variant.priceInfo}</p>

        <div className="pt-2 space-y-1">
          <div className="flex items-baseline gap-3">
            {variant.originalPrice && (
              <span className="text-sm text-slate-400 line-through">
                RM{variant.originalPrice.toLocaleString()}
              </span>
            )}

            <span className="text-xl font-bold text-slate-900">
              RM{variant.price.toLocaleString()}
            </span>

            {variant.discountPercent && (
              <span className="rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
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
        className="block w-full bg-emerald-600 px-5 py-3 text-center text-sm font-semibold text-white hover:bg-emerald-700"
      >
        Select
      </button>
    </div>
  );
}

export const VariantCard = memo(VariantCardComponent);
