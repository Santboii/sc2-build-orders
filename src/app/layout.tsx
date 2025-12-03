import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Home } from "lucide-react";
import { Analytics } from '@vercel/analytics/next';
import { defaultMetadata } from './metadata';

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        {/* Skip to main content link for keyboard navigation */}
        <a
          href="#main-content"
          className="skip-to-content"
          style={{
            position: 'absolute',
            left: '-9999px',
            zIndex: 9999,
            padding: 'var(--spacing-md)',
            background: 'var(--bg-elevated)',
            color: 'var(--text-primary)',
            textDecoration: 'none',
            borderRadius: 'var(--radius-md)'
          }}
        >
          Skip to main content
        </a>

        <nav
          className="glass-strong"
          role="navigation"
          aria-label="Main navigation"
          style={{
            position: 'sticky',
            top: 0,
            zIndex: 1000,
            borderBottom: '1px solid var(--border-medium)'
          }}
        >
          <div className="container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            minHeight: '64px'
          }}>
            <Link
              href="/"
              aria-label="SC2 Build Orders Home"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--spacing-sm)',
                fontSize: '1.25rem',
                fontWeight: 700
              }}
            >
              <span className="text-gradient">SC2 Build Orders</span>
            </Link>

            <div style={{
              display: 'flex',
              gap: 'var(--spacing-md)',
              alignItems: 'center',
              fontSize: '0.9375rem'
            }}>
              <span style={{
                color: 'var(--text-muted)',
                fontSize: '0.875rem'
              }}>
                Patch 5.0.11
              </span>
            </div>
          </div>
        </nav>

        <main id="main-content" role="main">
          {children}
        </main>

        <footer
          role="contentinfo"
          style={{
            marginTop: 'var(--spacing-2xl)',
            padding: 'var(--spacing-xl) 0',
            borderTop: '1px solid var(--border-subtle)',
            textAlign: 'center',
            color: 'var(--text-muted)',
            fontSize: '0.875rem'
          }}>
          <div className="container">
            <p>Build orders sourced from <a href="https://lotv.spawningtool.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--terran-primary)' }}>Spawning Tool</a></p>
            <p style={{ marginTop: 'var(--spacing-sm)' }}>StarCraft 2 © Blizzard Entertainment</p>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
