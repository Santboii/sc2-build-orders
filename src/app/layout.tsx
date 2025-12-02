import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: "SC2 Build Order Trainer - Master StarCraft 2 Strategies",
  description: "Learn and master StarCraft 2 build orders for Terran, Protoss, and Zerg. Study pro builds from Clem, uThermal, PiG, MaxPax, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning>
        <nav className="glass-strong" style={{
          position: 'sticky',
          top: 0,
          zIndex: 1000,
          borderBottom: '1px solid var(--border-medium)'
        }}>
          <div className="container" style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 'var(--spacing-md) var(--spacing-lg)',
            minHeight: '64px'
          }}>
            <Link href="/" style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--spacing-sm)',
              fontSize: '1.25rem',
              fontWeight: 700
            }}>
              <Home size={24} />
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
              <Link href="/" className="text-secondary" style={{
                transition: 'color var(--transition-fast)'
              }}>
                Home
              </Link>
            </div>
          </div>
        </nav>

        <main>
          {children}
        </main>

        <footer style={{
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
      </body>
    </html>
  );
}
