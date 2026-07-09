import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import FeaturedCattle from '@/components/home/FeaturedCattle';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export const metadata = {
  title: 'QurbaniHub — Premium Online Cattle Marketplace in Bangladesh',
  description: 'Discover the finest local cattle breeds for your Qurbani. Transparent specs, verified sellers, and honest value scores.',
};

export default function HomePage() {
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'QurbaniHub',
    url: 'https://qurbanihub.com',
    logo: 'https://qurbanihub.com/logo.png',
    description: 'Premium Online Cattle Marketplace for Bangladesh, connecting buyers with verified livestock farmers.',
    address: {
      '@type': 'PostalAddress',
      addressCountry: 'BD',
    },
    sameAs: [
      'https://facebook.com/qurbanihub',
      'https://instagram.com/qurbanihub',
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Header />
      <main>
        <Hero />
        <FeaturedCattle />
        <WhyChooseUs />
      </main>
      <Footer />
    </>
  );
}
