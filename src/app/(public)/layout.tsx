import React from 'react';
import { Header } from '@/components/storefront/Header';

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="relative flex min-h-screen flex-col">
      <Header />
      <main className="flex-1">{children}</main>
      <footer className="bg-interio-charcoal text-white py-12">
        <div className="container mx-auto px-4 text-center">
          <p className="font-heading text-2xl mb-4 text-interio-gold">Interio</p>
          <p className="text-gray-400">Transforming spaces with premium interior materials.</p>
          <p className="text-sm text-gray-500 mt-8">© {new Date().getFullYear()} Interio Home Designs. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
