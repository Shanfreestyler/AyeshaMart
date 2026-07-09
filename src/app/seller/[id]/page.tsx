import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Container from '@/components/Container';
import { sellers } from '@/lib/mockData/sellers';
import { cattleData } from '@/lib/mockData/cattleData';
import CattleCard from '@/components/CattleCard';
import { notFound } from 'next/navigation';

interface Props {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({ params }: Props) {
  const { id } = await params;
  const seller = sellers.find((s) => s.id === id);
  
  if (!seller) {
    return {
      title: 'Seller Not Found — QurbaniHub',
    };
  }

  return {
    title: `${seller.name} — QurbaniHub Seller`,
    description: `View cattle listings from ${seller.name}, a trusted seller on QurbaniHub.`,
  };
}

export default async function SellerProfilePage({ params }: Props) {
  const { id } = await params;
  const seller = sellers.find((s) => s.id === id);

  if (!seller) {
    notFound();
  }

  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: seller.name,
    url: `https://qurbanihub.com/seller/${seller.id}`,
    image: seller.avatar,
    jobTitle: 'Livestock Seller',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BD',
    },
  };

  const sellerCattle = cattleData.filter((c) => c.sellerId === id);

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main className="py-12 sm:py-20">
        <Container>
          {/* Seller Header */}
          <div className="flex flex-col items-center text-center sm:flex-row sm:items-end sm:text-left gap-6">
            <img
              src={seller.avatar}
              alt={seller.name}
              className="h-24 w-24 rounded-full object-cover border-4 border-white shadow-md"
            />
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-dark-green sm:text-4xl">
                {seller.name}
              </h1>
              <div className="mt-2 flex flex-wrap items-center justify-center gap-3 sm:justify-start">
                <span className="flex items-center gap-1 text-sm font-medium text-dark-green">
                  ★ {seller.rating.toFixed(1)} rating
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-dark-green/30 sm:block" />
                <span className="text-sm text-dark-green/60">
                  {seller.contacts.phone}
                </span>
                <span className="hidden h-1 w-1 rounded-full bg-dark-green/30 sm:block" />
                <span className="text-sm text-dark-green/60">
                  {seller.contacts.email}
                </span>
              </div>
            </div>
            <div className="hidden sm:block">
              <span className="rounded-full bg-dark-green px-4 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
                Verified Seller
              </span>
            </div>
          </div>

          {/* Content Section */}
          <div className="mt-16">
            <div className="mb-8 flex items-center justify-between">
              <h2 className="text-2xl font-bold text-dark-green">
                Available Cattle
              </h2>
              <p className="text-sm text-dark-green/60">
                {sellerCattle.length} {sellerCattle.length === 1 ? 'listing' : 'listings'}
              </p>
            </div>

            {sellerCattle.length > 0 ? (
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {sellerCattle.map((cattle) => (
                  <CattleCard key={cattle.id} cattle={cattle} />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center rounded-3xl border border-dashed border-dark-green/20 bg-cream-light py-20 text-center">
                <div className="flex h-14 w-14 items-center justify-center rounded-full bg-dark-green/5 text-2xl">
                  🐄
                </div>
                <h3 className="mt-5 text-lg font-semibold text-dark-green">
                  No listings available
                </h3>
                <p className="mt-2 max-w-sm text-sm text-dark-green/60">
                  This seller currently has no active listings. Check back later!
                </p>
              </div>
            )}
          </div>
        </Container>
      </main>
      <Footer />
    </>
  );
}
