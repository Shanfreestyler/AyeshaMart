import Header from '@/components/Header';
import Footer from '@/components/Footer';
import BrowseClient from '@/components/browse/BrowseClient';

export const metadata = {
  title: 'Browse Cattle — QurbaniHub',
  description: 'Browse premium local cattle breeds available for Qurbani.',
};

export default function BrowsePage() {
  return (
    <>
      <Header />
      <main>
        <BrowseClient />
      </main>
      <Footer />
    </>
  );
}
