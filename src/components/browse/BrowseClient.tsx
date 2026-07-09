'use client';

import { useMemo, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { cattleData } from '@/lib/mockData/cattleData';
import { ISortOption } from '@/types';
import Container from '../Container';
import CattleCard, { CattleCardSkeleton } from '../CattleCard';

const sortOptions: ISortOption[] = [
  { value: 'value-desc', label: 'Value Score: High to Low' },
  { value: 'price-asc', label: 'Price: Low to High' },
  { value: 'price-desc', label: 'Price: High to Low' },
];

type StatusFilter = 'all' | 'available' | 'sold';

// Derive filter options from the actual listings so there are no dead-end filters.
const breedOptions = Array.from(new Set(cattleData.map((c) => c.breed))).sort();
const locationOptions = Array.from(new Set(cattleData.map((c) => c.location))).sort();

// Price bounds for the range filter.
const PRICE_MIN = Math.min(...cattleData.map((c) => c.price));
const PRICE_MAX = Math.max(...cattleData.map((c) => c.price));

const selectClass =
  'w-full rounded-lg border border-dark-green/15 bg-cream px-3 py-2.5 text-sm text-dark-green outline-none transition-colors focus:border-dark-green focus:ring-2 focus:ring-dark-green/20';

export default function BrowseClient() {
  const [search, setSearch] = useState('');
  const [breed, setBreed] = useState('');
  const [location, setLocation] = useState('');
  const [status, setStatus] = useState<StatusFilter>('all');
  const [sort, setSort] = useState('value-desc');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  useEffect(() => {
    // Simulate API fetch delay for better UX demonstration.
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 800);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    setCurrentPage(1);
  }, [search, breed, location, status, minPrice, maxPrice]);

  const results = useMemo(() => {
    const query = search.trim().toLowerCase();
    const min = minPrice ? Number(minPrice) : null;
    const max = maxPrice ? Number(maxPrice) : null;

    const filtered = cattleData.filter((c) => {
      if (query && !c.name.toLowerCase().includes(query)) return false;
      if (breed && c.breed !== breed) return false;
      if (location && c.location !== location) return false;
      if (status !== 'all' && c.status !== status) return false;
      if (min !== null && c.price < min) return false;
      if (max !== null && c.price > max) return false;
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
  }, [search, breed, location, status, sort, minPrice, maxPrice]);

  const paginatedResults = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return results.slice(startIndex, startIndex + itemsPerPage);
  }, [results, currentPage]);

  const totalPages = Math.ceil(results.length / itemsPerPage);

  const hasActiveFilters =
    search.trim() !== '' ||
    breed !== '' ||
    location !== '' ||
    status !== 'all' ||
    minPrice !== '' ||
    maxPrice !== '';

  const clearFilters = () => {
    setSearch('');
    setBreed('');
    setLocation('');
    setStatus('all');
    setSort('value-desc');
    setMinPrice('');
    setMaxPrice('');
    setCurrentPage(1);
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

          {/* Price range row */}
          <div className="mt-3 flex flex-col gap-2 border-t border-dark-green/10 pt-3 sm:flex-row sm:items-end sm:gap-4">
            <span className="text-xs font-semibold uppercase tracking-wide text-dark-green/40 sm:w-28">
              Price (BDT)
            </span>
            <div className="flex flex-1 items-center gap-2">
              <input
                id="min-price"
                type="number"
                inputMode="numeric"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
                placeholder={`Min (${PRICE_MIN.toLocaleString()})`}
                className={selectClass}
                aria-label="Minimum price"
              />
              <span className="text-dark-green/40">–</span>
              <input
                id="max-price"
                type="number"
                inputMode="numeric"
                min={PRICE_MIN}
                max={PRICE_MAX}
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                placeholder={`Max (${PRICE_MAX.toLocaleString()})`}
                className={selectClass}
                aria-label="Maximum price"
              />
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
        {isLoading ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
              <CattleCardSkeleton key={i} />
            ))}
          </div>
        ) : paginatedResults.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {paginatedResults.map((cattle, i) => (
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

        {/* Pagination Controls */}
        {!isLoading && results.length > itemsPerPage && (
          <div className="mt-12 flex items-center justify-center gap-2">
            <button
              type="button"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage((p) => p - 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-dark-green/10 bg-white text-dark-green transition-colors hover:bg-dark-green/5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              ←
            </button>
            
            <div className="flex items-center gap-1">
              {[...Array(totalPages)].map((_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`h-10 w-10 rounded-lg text-sm font-medium transition-colors ${
                    currentPage === i + 1
                      ? 'bg-dark-green text-cream'
                      : 'text-dark-green hover:bg-dark-green/5'
                  }`}
                >
                  {i + 1}
                </button>
              ))}
            </div>

            <button
              type="button"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage((p) => p + 1)}
              className="flex h-10 w-10 items-center justify-center rounded-lg border border-dark-green/10 bg-white text-dark-green transition-colors hover:bg-dark-green/5 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              →
            </button>
          </div>
        )}
      </Container>
    </section>
  );
}
