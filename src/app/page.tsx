import Header from '@/components/Header';
import Footer from '@/components/Footer';
import Hero from '@/components/home/Hero';
import FeaturedCattle from '@/components/home/FeaturedCattle';
import WhyChooseUs from '@/components/home/WhyChooseUs';

export default function HomePage() {
  return (
    <>
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
