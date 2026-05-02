"use client";

import React, { useState } from 'react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { LayoutDashboard, Package, FolderTree, MessageSquare, LogOut, Menu, X } from 'lucide-react';
import { signOut } from 'next-auth/react';

const navItems = [
  { label: 'Dashboard', href: '/admin', icon: LayoutDashboard },
  { label: 'Products', href: '/admin/products', icon: Package },
  { label: 'Categories', href: '/admin/categories', icon: FolderTree },
  { label: 'Orders', href: '/admin/orders', icon: MessageSquare },
];

export function AdminLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  if (pathname === '/admin/login') {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-gray-50 flex">
      <aside className="w-64 bg-white border-r border-gray-200 hidden md:flex flex-col">
        <div className="h-16 flex items-center px-6 border-b border-gray-200">
          <h1 className="font-heading text-2xl font-bold text-teal-600">Interio</h1>
        </div>
        <nav className="flex-1 px-4 mt-6 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`)) || (item.href === '/admin' && pathname === '/admin');
            const Icon = item.icon;
            return (
              <Link 
                key={item.href} 
                href={item.href}
                className={`flex items-center px-3 py-2.5 rounded-md text-sm font-medium transition-colors ${isActive ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
              >
                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="p-4 border-t border-gray-200">
          <button 
            onClick={() => signOut({ callbackUrl: '/admin/login' })}
            className="flex items-center px-3 py-2 w-full text-left rounded-md text-sm font-medium text-red-600 hover:bg-red-50"
          >
            <LogOut className="mr-3 h-5 w-5 text-red-500" />
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 flex flex-col h-screen overflow-hidden">
        <header className="h-16 bg-white border-b border-gray-200 flex justify-between items-center px-6 md:hidden">
          <h1 className="font-heading text-xl font-bold text-teal-600">Interio</h1>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="text-gray-500 hover:text-gray-700">
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </header>

        {isMobileMenuOpen && (
          <nav className="md:hidden bg-white border-b border-gray-200 shadow-sm absolute top-16 left-0 right-0 z-40">
            <div className="px-4 pt-2 pb-4 space-y-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href || (item.href !== '/admin' && pathname.startsWith(`${item.href}/`)) || (item.href === '/admin' && pathname === '/admin');
                const Icon = item.icon;
                return (
                  <Link 
                    key={item.href} 
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`flex items-center px-3 py-3 rounded-md text-base font-medium transition-colors ${isActive ? 'bg-teal-600 text-white' : 'text-gray-700 hover:bg-gray-100'}`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-white' : 'text-gray-400'}`} />
                    {item.label}
                  </Link>
                )
              })}
              <div className="pt-2 mt-2 border-t border-gray-100">
                <button 
                  onClick={() => signOut({ callbackUrl: '/admin/login' })}
                  className="flex items-center px-3 py-3 w-full text-left rounded-md text-base font-medium text-red-600 hover:bg-red-50"
                >
                  <LogOut className="mr-3 h-5 w-5 text-red-500" />
                  Sign Out
                </button>
              </div>
            </div>
          </nav>
        )}

        <div className="flex-1 p-4 md:p-8 overflow-y-auto">
          {children}
        </div>
      </main>
    </div>
  );
}
