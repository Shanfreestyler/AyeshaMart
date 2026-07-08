'use client';

import { motion } from 'framer-motion';
import Container from '../Container';

const reasons = [
  {
    title: 'Verified Quality',
    description:
      'Every animal is listed with transparent, honest specifications — weight, age, and realistic meat yield.',
  },
  {
    title: 'Premium Local Breeds',
    description:
      'Curated selection of the finest Bangladeshi cattle, from Red Chittagong to Sahiwal.',
  },
  {
    title: 'Fair Value Scores',
    description:
      'An at-a-glance value score helps you compare options and buy with confidence.',
  },
];

export default function WhyChooseUs() {
  return (
    <section className="bg-cream-light py-20">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-dark-green">
            Why Choose QurbaniHub
          </h2>
          <p className="mt-3 text-dark-green/60">
            Built for trust, transparency, and a premium buying experience.
          </p>
        </div>

        <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
          {reasons.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-80px' }}
              transition={{ duration: 0.4, ease: 'easeOut', delay: i * 0.08 }}
              className="rounded-2xl border border-dark-green/10 bg-cream p-8"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-dark-green/5 text-lg font-bold text-dark-green-light">
                {i + 1}
              </div>
              <h3 className="mt-5 text-lg font-semibold text-dark-green">
                {reason.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-dark-green/60">
                {reason.description}
              </p>
            </motion.div>
          ))}
        </div>
      </Container>
    </section>
  );
}
