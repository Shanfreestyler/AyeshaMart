'use client';

import { motion } from 'framer-motion';
import Container from '../Container';

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-cream">
      <div className="pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full bg-dark-green/5 blur-3xl" />
      <Container className="relative py-20 sm:py-28">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
          className="max-w-2xl"
        >
          <span className="inline-block rounded-full border border-dark-green/15 px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-dark-green-light">
            Premium Cattle Marketplace
          </span>
          <h1 className="mt-6 text-4xl font-bold leading-tight tracking-tight text-dark-green sm:text-5xl lg:text-6xl">
            The finest cattle for your Qurbani, sourced with trust.
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-dark-green/70">
            Browse healthy, premium local breeds from verified sources across
            Bangladesh. Transparent specs, honest value — all in one place.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <span className="cursor-default rounded-full bg-dark-green px-6 py-3 text-sm font-semibold text-cream shadow-sm transition-colors hover:bg-dark-green-light">
              Browse Cattle
            </span>
            <span className="cursor-default rounded-full border border-dark-green/20 px-6 py-3 text-sm font-semibold text-dark-green transition-colors hover:bg-dark-green/5">
              Learn More
            </span>
          </div>
        </motion.div>
      </Container>
    </section>
  );
}
