import React from 'react';
import Link from 'next/link';

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white/80 backdrop-blur-md">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <Link href="/" className="font-heading text-3xl font-bold text-teal-600">
          KLal
        </Link>
        <nav className="hidden md:flex gap-8">
          <Link href="/" className="text-sm font-medium hover:text-teal-600 transition-colors">Home</Link>
          <Link href="/products" className="text-sm font-medium hover:text-teal-600 transition-colors">Products</Link>
          <Link href="/about" className="text-sm font-medium hover:text-teal-600 transition-colors">About</Link>
          <Link href="/contact" className="text-sm font-medium hover:text-teal-600 transition-colors">Contact</Link>
        </nav>
      </div>
    </header>
  );
}
