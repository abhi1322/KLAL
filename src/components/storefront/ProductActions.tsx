"use client";

import React, { useState } from 'react';
import { Minus, Plus, MessageSquare } from 'lucide-react';
import { WhatsAppButton } from './WhatsAppButton';

interface ProductActionsProps {
  product: {
    title: string;
    price: number;
    discountPrice?: number;
    inStock: boolean;
  };
}

export function ProductActions({ product }: ProductActionsProps) {
  const [quantity, setQuantity] = useState(1);
  const [message, setMessage] = useState('');

  const currentPrice = product.discountPrice || product.price;
  const estimatedTotal = currentPrice * quantity;

  const handleIncrement = () => setQuantity((prev) => prev + 1);
  const handleDecrement = () => setQuantity((prev) => (prev > 1 ? prev - 1 : 1));

  return (
    <div className="space-y-6 pt-6 border-stone-200">
      {/* Quantity Selector & Price Estimator */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-warm-50/50 p-4 rounded-2xl border border-stone-200">
        <div className="space-y-1">
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Quantity</label>
          <div className="flex items-center space-x-4">
            <button
              onClick={handleDecrement}
              disabled={!product.inStock || quantity <= 1}
              className="p-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Minus className="w-4 h-4 text-charcoal" />
            </button>
            <span className="text-lg font-semibold text-charcoal min-w-[2ch] text-center">{quantity}</span>
            <button
              onClick={handleIncrement}
              disabled={!product.inStock}
              className="p-2 rounded-full border border-stone-300 bg-white hover:bg-stone-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Plus className="w-4 h-4 text-charcoal" />
            </button>
          </div>
        </div>

        <div className="text-right">
          <label className="text-xs font-semibold text-stone-500 uppercase tracking-wider block">Estimated Total</label>
          <span className="text-2xl font-bold text-copper">
            ₹{estimatedTotal.toLocaleString('en-IN')}
          </span>
        </div>
      </div>

      {/* Message Input */}
      <div className="space-y-2">
        <label className="flex items-center gap-2 text-sm font-medium text-charcoal">
          <MessageSquare className="w-4 h-4 text-stone-400" />
          <span>Add a note (Optional)</span>
        </label>
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="I need this in a specific size / I have a custom requirement..."
          className="w-full px-4 py-3 rounded-xl border border-stone-300 focus:ring-2 focus:ring-copper/20 focus:border-copper outline-none transition-all duration-200 min-h-[100px] resize-none font-inter text-sm"
          disabled={!product.inStock}
        />
      </div>

      {/* Order Button */}
      <div className="pt-2">
        <WhatsAppButton 
          product={{ title: product.title, price: currentPrice }} 
          qty={quantity} 
          message={message}
          disabled={!product.inStock} 
        />
        <p className="text-[11px] text-center text-stone-400 font-inter mt-4 px-4">
          Clicking will open WhatsApp with your chosen quantity and requirements.
        </p>
      </div>
    </div>
  );
}
