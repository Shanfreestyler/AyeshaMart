import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import { cattleData } from '@/lib/mockData/cattleData';
import { notFound } from 'next/navigation';
import { sellers } from '@/lib/mockData/sellers';
import WhatsAppButton from '@/components/WhatsAppButton';

const formatBDT = (value: number) =>
  new Intl.NumberFormat('en-BD', {
    style: 'currency',
    currency: 'BDT',
    maximumFractionDigits: 0,
  }).format(value);

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export default async function CattleDetailsPage({ params }: Props) {
  const { id } = await params;
  const cattle = cattleData.find((c) => c.id === id);
  const seller = sellers.find((s) => s.id === cattle?.sellerId);

  if (!cattle) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: cattle.name,
    image: cattle.images[0],
    description: `${cattle.breed} cattle located in ${cattle.location}. Weight: ${cattle.specs.weightKg}kg, Value Score: ${cattle.valueScore}.`,
    brand: {
      '@type': 'Brand',
      name: cattle.breed,
    },
    offers: {
      '@type': 'Offer',
      price: cattle.price,
      priceCurrency: 'BDT',
      availability: cattle.status === 'available' ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
      url: `https://qurbanihub.com/cattle/${cattle.id}`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
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

              {seller && (
                <div className="mt-8 rounded-2xl border border-dark-green/10 bg-cream-light p-5">
                  <p className="text-xs font-semibold uppercase tracking-wide text-dark-green/40">
                    Listed by
                  </p>
                  <div className="mt-3 flex items-center gap-3">
                    <img
                      src={seller.avatar}
                      alt={seller.name}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                    <div>
                      <p className="text-sm font-semibold text-dark-green">
                        {seller.name}
                      </p>
                      <p className="text-xs text-dark-green/50">
                        ★ {seller.rating.toFixed(1)} rating
                      </p>
                    </div>
                  </div>
                  {cattle.status === 'available' && (
                    <WhatsAppButton 
                      phone={seller.contacts.phone} 
                      cattleName={cattle.name} 
                    />
                  )}
                  <p className="mt-2 text-center text-xs text-dark-green/40">
                    {seller.contacts.phone}
                  </p>
                </div>
              )}

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