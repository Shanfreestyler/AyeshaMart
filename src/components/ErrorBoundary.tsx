'use client';

import React, { Component, ErrorInfo, ReactNode } from 'react';
import Container from './Container';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
  };

  public static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      return (
        <div className="flex min-h-screen items-center justify-center px-6 py-20">
          <Container>
            <div className="mx-auto max-w-md text-center">
              <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-dark-green/10 text-3xl">
                ⚠️
              </div>
              <h1 className="text-2xl font-bold text-dark-green">Something went wrong</h1>
              <p className="mt-4 text-dark-green/60 leading-relaxed">
                We encountered an unexpected error. Please try refreshing the page or return to the home screen.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
                <button
                  onClick={() => window.location.reload()}
                  className="rounded-full bg-dark-green px-6 py-2.5 text-sm font-semibold text-cream transition hover:opacity-90"
                >
                  Refresh Page
                </button>
                <a
                  href="/"
                  className="rounded-full border border-dark-green/20 px-6 py-2.5 text-sm font-semibold text-dark-green transition hover:bg-dark-green/5 text-center"
                >
                  Back to Home
                </a>
              </div>
            </div>
          </Container>
        </div>
      );
    }

    return this.props.children;
  }
}
