'use client';

import { motion } from 'framer-motion';
import { cattleData } from '@/lib/mockData/cattleData';
import Container from '../Container';
import CattleCard from '../CattleCard';

// Feature the highest-value available cattle first.
const featured = [...cattleData]
  .sort((a, b) => {
    if (a.status !== b.status) return a.status === 'available' ? -1 : 1;
    return b.valueScore - a.valueScore;
  })
  .slice(0, 3);

export default function FeaturedCattle() {
  return (
    <section className="py-20">
      <Container>
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight text-dark-green">
              Featured Cattle
            </h2>
            <p className="mt-2 text-dark-green/60">
              Hand-picked premium selections with the best value scores.
            </p>
          </div>
          <span className="cursor-default text-sm font-semibold text-dark-green-light">
            View all →
          </span>
        </div>

        <div className="mt-10 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((cattle, i) => (
            <motion.div
              key={cattle.id}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
            >
              <CattleCard cattle={cattle} />
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
