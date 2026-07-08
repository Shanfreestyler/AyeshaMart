import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';

export const metadata = {
  title: 'About QurbaniHub',
  description:
    'Learn how QurbaniHub connects buyers and farmers through a transparent cattle marketplace.',
};

export default function AboutPage() {
  return (
    <>
      <Header />

      <main className="py-16 sm:py-20">
        <Container>
          <div className="max-w-3xl">
            <span className="rounded-full bg-dark-green/10 px-4 py-2 text-sm font-medium text-dark-green">
              About QurbaniHub
            </span>

            <h1 className="mt-6 text-4xl font-bold text-dark-green sm:text-5xl">
              Modernizing Qurbani Cattle Discovery
            </h1>

            <p className="mt-6 text-lg leading-relaxed text-dark-green/70">
              QurbaniHub helps families discover quality cattle without spending
              hours navigating crowded livestock markets. We focus on
              transparency, convenience, and helping buyers make informed
              decisions.
            </p>
          </div>

          <div className="mt-16 grid gap-8 md:grid-cols-3">
            <div className="rounded-2xl border border-dark-green/10 bg-white p-6">
              <h2 className="text-xl font-semibold text-dark-green">
                Transparent Data
              </h2>
              <p className="mt-3 text-dark-green/70">
                Compare estimated meat yield, fat ratio, breed, weight, and
                value score before making a decision.
              </p>
            </div>

            <div className="rounded-2xl border border-dark-green/10 bg-white p-6">
              <h2 className="text-xl font-semibold text-dark-green">
                Better Buying Experience
              </h2>
              <p className="mt-3 text-dark-green/70">
                Browse and compare listings digitally instead of spending
                hours walking through crowded markets.
              </p>
            </div>

            <div className="rounded-2xl border border-dark-green/10 bg-white p-6">
              <h2 className="text-xl font-semibold text-dark-green">
                Supporting Farmers
              </h2>
              <p className="mt-3 text-dark-green/70">
                Connect rural farms with more buyers and create fairer access
                to the marketplace.
              </p>
            </div>
          </div>

          <section className="mt-16 rounded-3xl bg-dark-green p-8 text-cream sm:p-12">
            <h2 className="text-3xl font-bold">
              Why QurbaniHub Exists
            </h2>

            <p className="mt-4 max-w-3xl text-cream/80">
              Traditional cattle markets often require significant time,
              travel, and negotiation. QurbaniHub aims to make the process
              more transparent by providing meaningful information beyond
              price alone, helping buyers evaluate overall value.
            </p>
          </section>
        </Container>
      </main>

      <Footer />
    </>
  );
}