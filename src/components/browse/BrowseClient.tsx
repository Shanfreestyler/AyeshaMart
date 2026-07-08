'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { cattleData } from '@/lib/mockData/cattleData';
import { ISortOption } from '@/types';
import Container from '../Container';
import CattleCard from '../CattleCard';

const sortOptions: ISortOption[] = [
  { value: 'value-desc', label: 'Value Score: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

type StatusFilter = 'all' | 'available' | 'sold';

// Derive filter options from the actual listings so there are no dead-end filters.
const breedOptions = Array.from(new Set(cattleData.map((c) => c.breed))).sort();
const locationOptions = Array.from(new Set(cattleData.map((c) => c.location))).sort();

const selectClass =
  'w-full rounded-lg border border-dark-green/15 bg-cream px-3 py-2.5 text-sm text-dark-green outline-none transition-colors focus:border-dark-green focus:ring-2 focus:ring-dark-green/20';

export default function BrowseClient() {
  const [search, setSearch] = useState('');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState('value-desc');

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();

    const filtered = cattleData.filter((c) => {
      if (query && !c.name.toLowerCase().includes(query)) return false;
      if (breed && c.breed !== breed) return false;
      if (location && c.location !== location) return false;
      if (status !== 'all' && c.status !== status) return false;
      return true;
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'price-asc':
          return a.price - b.price;
        case 'price-desc':
          return b.price - a.price;
        case 'value-desc':
        default:
          return b.valueScore - a.valueScore;
      }
    });
  }, [search, breed, location, status, sort]);

  const hasActiveFilters =
    search.trim() !== '' || breed !== '' || location !== '' || status !== 'all';

  const clearFilters = () => {
    setSearch('');
    setBreed('');
    setLocation('');
    setStatus('all');
    setSort('value-desc');
  };

  return (
    <section className="py-10 sm:py-14">
      <Container>
        {/* Page heading */}
        <div className="max-w-2xl">
          <h1 className="text-3xl font-bold tracking-tight text-dark-green sm:text-4xl">
            Browse Cattle
          </h1>
          <p className="mt-2 text-dark-green/60">
            Explore premium local breeds. Filter, search, and sort to find the
            perfect animal for your Qurbani.
          </p>
        </div>

        {/* Filter panel */}
        <div className="mt-8 rounded-2xl border border-dark-green/10 bg-cream-light p-4 sm:p-5">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-5">
            <div className="sm:col-span-2 lg:col-span-1">
              <label htmlFor="search" className="sr-only">
                Search by name
              </label>
              <input
                id="search"
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search by name…"
                className={selectClass}
              />
            </div>

            <div>
              <label htmlFor="breed" className="sr-only">
                Breed
              </label>
              <select
                id="breed"
                value={breed}
                onChange={(e) => setBreed(e.target.value)}
                className={selectClass}
              >
                <option value="">All Breeds</option>
                {breedOptions.map((b) => (
                  <option key={b} value={b}>
                    {b}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="location" className="sr-only">
                Location
              </label>
              <select
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className={selectClass}
              >
                <option value="">All Locations</option>
                {locationOptions.map((l) => (
                  <option key={l} value={l}>
                    {l}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="status" className="sr-only">
                Status
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value as StatusFilter)}
                className={selectClass}
              >
                <option value="all">All Status</option>
                <option value="available">Available</option>
                <option value="sold">Sold</option>
              </select>
            </div>

            <div>
              <label htmlFor="sort" className="sr-only">
                Sort by
              </label>
              <select
                id="sort"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
                className={selectClass}
              >
                {sortOptions.map((o) => (
                  <option key={o.value} value={o.value}>
                    {o.label}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Result summary */}
        <div className="mt-6 flex items-center justify-between">
          <p className="text-sm text-dark-green/60">
            {results.length}{' '}
            {results.length === 1 ? 'listing' : 'listings'} found
          </p>
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              className="text-sm font-semibold text-dark-green-light transition-colors hover:text-dark-green"
            >
              Clear filters
            </button>
          )}
        </div>

        {/* Grid or empty state */}
        {results.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {results.map((cattle, i) => (
              <motion.div
                key={cattle.id}
                layout
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: 'easeOut', delay: i * 0.04 }}
              >
                <CattleCard cattle={cattle} />
              </motion.div>
            ))}
          </div>
        ) : (
          <div className="mt-6 flex flex-col items-center justify-center rounded-2xl border border-dashed border-dark-green/20 bg-cream-light px-6 py-20 text-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-dark-green/5 text-2xl">
              🐄
            </div>
            <h2 className="mt-5 text-lg font-semibold text-dark-green">
              No cattle match your filters
            </h2>
            <p className="mt-2 max-w-sm text-sm text-dark-green/60">
              Try adjusting or clearing your filters to see more listings.
            </p>
            {hasActiveFilters && (
              <button
                type="button"
                onClick={clearFilters}
                className="mt-6 rounded-full bg-dark-green px-6 py-2.5 text-sm font-semibold text-cream transition-colors hover:bg-dark-green-light"
              >
                Clear all filters
              </button>
            )}
          </div>
        )}
      </Container>
    </section>
  );
}
