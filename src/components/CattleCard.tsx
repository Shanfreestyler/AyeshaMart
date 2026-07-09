'use client';
import Link from 'next/link';
import { ICattle } from '@/types';

interface CattleCardProps {
  cattle: ICattle;
}

const formatBDT = (value: number) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(value);

// Branded inline placeholder shown if an image URL fails to load (self-contained, cannot 404).
const FALLBACK_IMAGE =
  "data:image/svg+xml;charset=UTF-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="800" height="600" viewBox="0 0 800 600">
       <rect width="800" height="600" fill="#FFFEFB"/>
       <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
             font-family="Inter, system-ui, sans-serif" font-size="28" fill="#14532d" opacity="0.4">
         Image unavailable
     </text>
     </svg>`
  );

export function CattleCardSkeleton() {
  return (
    <div className="flex flex-col overflow-hidden rounded-2xl border border-dark-green/10 bg-cream-light shadow-sm">
      <div className="relative aspect-[4/3] bg-dark-green/5 animate-pulse" />
      <div className="flex flex-1 flex-col p-5 gap-4">
        <div className="flex justify-between items-start gap-3">
          <div className="h-5 w-3/4 bg-dark-green/10 rounded animate-pulse" />
          <div className="h-5 w-12 bg-dark-green/10 rounded animate-pulse" />
        </div>
        <div className="h-4 w-1/3 bg-dark-green/10 rounded animate-pulse" />
        <div className="grid grid-cols-2 gap-3">
          {[1, 2, 3, 4].map((i) => (
            <div key={i} className="space-y-2">
              <div className="h-3 w-full bg-dark-green/5 rounded animate-pulse" />
              <div className="h-4 w-3/4 bg-dark-green/10 rounded animate-pulse" />
            </div>
          ))}
        </div>
        <div className="mt-auto pt-5 flex justify-between items-end">
          <div className="h-7 w-1/4 bg-dark-green/10 rounded animate-pulse" />
          <div className="h-4 w-1/4 bg-dark-green/10 rounded animate-pulse" />
        </div>
      </div>
    </div>
  );
}

export default function CattleCard({ cattle }: CattleCardProps) {

  const isSold = cattle.status === 'sold';

  return (
    <Link href={`/cattle/${cattle.id}`} className="block">
      <article className="group flex flex-col overflow-hidden rounded-2xl border border-dark-green/10 bg-cream-light shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
        <div className="relative aspect-[4/3] overflow-hidden bg-dark-green/5">
        {/* Plain <img>: mock photos are external Unsplash URLs not allow-listed for next/image */}
        <img
          src={cattle.images[0]}
          alt={`${cattle.breed} — ${cattle.name}`}
          loading="lazy"
          onError={(e) => {
            const img = e.currentTarget;
            if (img.dataset.fallback) return;
            img.dataset.fallback = 'true';
            img.src = FALLBACK_IMAGE;
          }}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        <span className="absolute left-3 top-3 rounded-full bg-cream/90 px-3 py-1 text-xs font-medium text-dark-green backdrop-blur">
          {cattle.breed}
        </span>

        {isSold && (
          <span className="absolute right-3 top-3 rounded-full bg-dark-green px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
            Sold
          </span>
        )}
      </div>

      <div className="flex flex-1 flex-col p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="text-base font-semibold leading-snug text-dark-green">
            {cattle.name}
          </h3>
          <span className="shrink-0 rounded-md bg-dark-green/5 px-2 py-1 text-xs font-semibold text-dark-green-light">
            ★ {cattle.valueScore.toFixed(1)}
          </span>
        </div>

        <p className="mt-1 text-sm text-dark-green/60">{cattle.location}</p>

        <dl className="mt-4 grid grid-cols-2 gap-3 text-sm">
          <div>
            <dt className="text-xs uppercase tracking-wide text-dark-green/40">
              Weight
            </dt>
            <dd className="font-medium text-dark-green">
              {cattle.specs.weightKg} kg
            </dd>
          </div>
          <div>
            <dt className="text-xs uppercase tracking-wide text-dark-green/40">
              Meat Yield
            </dt>
            <dd className="font-medium text-dark-green">
              ~{cattle.specs.estimatedMeatYieldKg} kg
            </dd>
          </div>
        </dl>

        <div className="mt-auto flex items-end justify-between pt-5">
          <span className="text-lg font-bold text-dark-green">
            {formatBDT(cattle.price)}
          </span>
          <span
            className={`text-xs font-semibold uppercase tracking-wide ${
              isSold ? 'text-dark-green/30' : 'text-dark-green-light'
            }`}
          >
            {isSold ? 'Unavailable' : 'Available'}
          </span>
        </div>
      </div>
      </article>
    </Link>
  );
}
