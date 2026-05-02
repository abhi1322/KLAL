"use client";
import React from 'react';
import { Button } from '@/components/ui/button';
import { buildWhatsAppUrl, ProductProps } from '@/lib/whatsapp';
import { MessageCircle } from 'lucide-react';

interface WhatsAppButtonProps {
  product: ProductProps;
  qty: number;
  message?: string;
  disabled?: boolean;
}

export function WhatsAppButton({ product, qty, message, disabled = false }: WhatsAppButtonProps) {
  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (disabled) return;
    const url = buildWhatsAppUrl(product, qty, message);
    window.open(url, '_blank');
  };

  return (
    <button onClick={handleClick} disabled={disabled} className={`flex items-center justify-center gap-2 w-full px-6 py-4 rounded-xl font-inter font-semibold transition-all duration-300 shadow-sm hover:shadow-lg active:scale-[0.98] outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-copper ${disabled ? 'bg-stone-200 text-stone-500 cursor-not-allowed' : 'bg-[#25D366] hover:bg-[#1ebe5d] text-white'}`}>
      <MessageCircle className="w-5 h-5" />
      {disabled ? 'Currently Out of Stock' : 'Order via WhatsApp'}
    </button>
  );
}
