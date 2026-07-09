'use client';

import { useState } from 'react';
import Link from 'next/link';
import Container from './Container';

const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/browse', label: 'Browse' },
  { href: '/about', label: 'About' },
];

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-dark-green/10 bg-cream/90 backdrop-blur">
      <Container className="flex h-16 items-center justify-between">
        <Link href="/" className="flex items-center gap-2" onClick={() => setOpen(false)}>
          <span className="text-xl font-bold tracking-tight text-dark-green">
            Qurbani<span className="text-dark-green-light">Hub</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-8 sm:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm font-medium text-dark-green transition-colors hover:text-dark-green-light"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <span className="hidden rounded-full bg-dark-green px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-cream sm:inline-block">
            Alpha
          </span>

          {/* Mobile hamburger toggle */}
          <button
            type="button"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen((v) => !v)}
            className="flex h-10 w-10 items-center justify-center rounded-lg text-dark-green transition-colors hover:bg-dark-green/5 sm:hidden"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
              {open ? (
                <>
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </>
              ) : (
                <>
                  <line x1="3" y1="6" x2="21" y2="6" />
                  <line x1="3" y1="12" x2="21" y2="12" />
                  <line x1="3" y1="18" x2="21" y2="18" />
                </>
              )}
            </svg>
          </button>
        </div>
      </Container>

      {/* Mobile dropdown nav */}
      {open && (
        <nav
          id="mobile-nav"
          className="border-t border-dark-green/10 bg-cream sm:hidden"
        >
          <Container className="flex flex-col py-2">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-3 py-3 text-sm font-medium text-dark-green transition-colors hover:bg-dark-green/5"
              >
                {link.label}
              </Link>
            ))}
            <span className="mt-1 px-3 pb-2">
              <span className="inline-block rounded-full bg-dark-green px-3 py-1 text-xs font-semibold uppercase tracking-wide text-cream">
                Alpha
              </span>
            </span>
          </Container>
        </nav>
      )}
    </header>
  );
}
