import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';

interface ProductCardProps {
  product: {
    _id: string;
    title: string;
    slug: string;
    price: number;
    discountPrice?: number;
    images: { url: string }[];
    category: { name: string } | string;
    inStock?: boolean;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const imageUrl = product.images?.[0]?.url || 'https://via.placeholder.com/400x300?text=No+Image';

  return (
    <Link href={`/products/${product.slug}`} className="block h-full">
      <div className="group h-full flex flex-col bg-white border border-stone-300 rounded-2xl overflow-hidden hover:shadow-lg hover:border-copper/40 transition-all duration-300">
        <div className="relative aspect-[4/3] overflow-hidden bg-warm-50">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img 
            src={imageUrl} 
            alt={product.title}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
          {product.discountPrice && product.inStock !== false && (
            <Badge className="absolute top-3 left-3 bg-copper text-white hover:bg-copper-dark font-inter border-none shadow-md tracking-wider">Sale</Badge>
          )}
          {product.inStock === false && (
            <Badge className="absolute top-3 left-3 bg-stone-700 text-white hover:bg-stone-700 font-inter border-none shadow-md tracking-wider">Out of Stock</Badge>
          )}
        </div>
        <div className="p-5 flex-grow flex flex-col">
          <p className="text-xs uppercase tracking-widest text-stone-500 mb-1 line-clamp-1">
            {typeof product.category === 'object' ? product.category?.name : 'Category'}
          </p>
          <h3 className="font-playfair text-lg text-charcoal mb-2 line-clamp-2 flex-grow">
            {product.title}
          </h3>
          <div className="flex items-center space-x-2 mt-auto pt-2">
            <span className="text-lg font-semibold text-copper">
              ₹{product.discountPrice ? product.discountPrice.toLocaleString('en-IN') : product.price.toLocaleString('en-IN')}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-stone-500 line-through">₹{product.price.toLocaleString('en-IN')}</span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}
