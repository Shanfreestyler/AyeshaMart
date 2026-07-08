import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import { cattleData } from '@/lib/mockData/cattleData';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

const formatBDT = (value: number) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(value);

export default async function CattleDetailsPage({ params }: Props) {
  const { id } = await params;
  const cattle = cattleData.find((c) => c.id === id);

  if (!cattle) {
    notFound();
  }

  return (
    <>
      <Header />

      <main className="py-12">
        <Container>
          <div className="grid gap-10 lg:grid-cols-2">
            <div>
              <img
                src={cattle.images[0]}
                alt={cattle.name}
                className="w-full rounded-3xl object-cover"
              />
            </div>

            <div>
              <span className="rounded-full bg-dark-green/10 px-4 py-2 text-sm text-dark-green">
                {cattle.breed}
              </span>

              <h1 className="mt-5 text-4xl font-bold text-dark-green">
                {cattle.name}
              </h1>

              <p className="mt-2 text-dark-green/60">
                {cattle.location}
              </p>

              <div className="mt-8 grid grid-cols-2 gap-4">
                <div className="rounded-2xl border border-dark-green/10 p-4">
                  <p className="text-sm text-dark-green/50">Weight</p>
                  <p className="text-xl font-semibold text-dark-green">
                    {cattle.specs.weightKg} kg
                  </p>
                </div>

                <div className="rounded-2xl border border-dark-green/10 p-4">
                  <p className="text-sm text-dark-green/50">Meat Yield</p>
                  <p className="text-xl font-semibold text-dark-green">
                    ~{cattle.specs.estimatedMeatYieldKg} kg
                  </p>
                </div>

                <div className="rounded-2xl border border-dark-green/10 p-4">
                  <p className="text-sm text-dark-green/50">Fat Ratio</p>
                  <p className="text-xl font-semibold text-dark-green">
                    {cattle.specs.fatRatio}%
                  </p>
                </div>

                <div className="rounded-2xl border border-dark-green/10 p-4">
                  <p className="text-sm text-dark-green/50">Value Score</p>
                  <p className="text-xl font-semibold text-dark-green">
                    ★ {cattle.valueScore}
                  </p>
                </div>
              </div>

              <div className="mt-8">
                <p className="text-sm text-dark-green/50">Price</p>
                <p className="text-4xl font-bold text-dark-green">
                  {formatBDT(cattle.price)}
                </p>
              </div>

              <a
                href="/browse"
                className="mt-8 inline-block rounded-full bg-dark-green px-6 py-3 font-semibold text-cream transition hover:opacity-90"
              >
                ← Back to Browse
              </a>
            </div>
          </div>
        </Container>
      </main>

      <Footer />
    </>
  );
}