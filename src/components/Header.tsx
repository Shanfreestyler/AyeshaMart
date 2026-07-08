import Link from 'next/link';
import Container from './Container';

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-dark-green/10 bg-cream/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-xl font-bold tracking-tight text-dark-green">
            Qurbani<span className="text-dark-green-light">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          <Link
            href="/"
            className="text-sm font-medium text-dark-green transition-colors hover:text-dark-green-light"
          >
            Home
          </Link>
          <Link
            href="/browse"
            className="text-sm font-medium text-dark-green transition-colors hover:text-dark-green-light"
          >
            Browse
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium text-dark-green transition-colors hover:text-dark-green-light"
          >
            About
          </Link>
        </nav>

        <span className="rounded-full bg-dark-green px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cream">
          Alpha
        </span>
      </Container>
    </header>
  );
}
