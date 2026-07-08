import Container from './Container';

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-dark-green/10 bg-dark-green text-cream">
      <Container className="py-12">
        <div className="flex flex-col gap-8 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-sm">
            <span className="text-xl font-bold tracking-tight">
              Qurbani<span className="text-cream/70">Hub</span>
            </span>
            <p className="mt-3 text-sm leading-relaxed text-cream/70">
              Premium online cattle marketplace for Bangladesh. Sourcing the
              finest local breeds for your Qurbani.
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <span className="text-sm font-semibold uppercase tracking-wide text-cream/50">
              Explore
            </span>
            <span className="text-sm text-cream/80">Home</span>
            <span className="text-sm text-cream/50">Browse Cattle</span>
            <span className="text-sm text-cream/50">About Us</span>
          </div>
        </div>

        <div className="mt-10 border-t border-cream/10 pt-6 text-xs text-cream/50">
          © {2026} QurbaniHub. Alpha preview — for concept validation only.
        </div>
      </Container>
    </footer>
  );
}
