import React from 'react';
import { notFound } from 'next/navigation';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { ProductActions } from '@/components/storefront/ProductActions';
import { ImageGallery } from '@/components/storefront/ImageGallery';
import { Badge } from '@/components/ui/badge';

export const revalidate = 60;

export default async function ProductDetailPage({ params }: { params: { slug: string } }) {
  await connectToDatabase();
  const product = await Product.findOne({ slug: params.slug }).populate('category').lean();

  if (!product) {
    notFound();
  }

  const parsedProduct = JSON.parse(JSON.stringify(product));
  
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20 lg:py-28">
      <div className="grid md:grid-cols-2 gap-12 lg:gap-20">
        <div className="space-y-4 relative">
          <ImageGallery images={parsedProduct.images} title={parsedProduct.title} />
          
          {parsedProduct.discountPrice && parsedProduct.inStock && (
            <Badge className="absolute top-4 left-4 bg-copper text-white hover:bg-copper-dark font-inter text-sm py-1.5 px-4 tracking-wider border-none shadow-md z-10">Sale</Badge>
          )}
          {!parsedProduct.inStock && (
            <Badge className="absolute top-4 left-4 bg-stone-700 text-white hover:bg-stone-700 font-inter text-sm py-1.5 px-4 tracking-wider border-none shadow-md z-10">Out of Stock</Badge>
          )}
        </div>

        <div className="flex flex-col justify-center">
          <div className="text-sm text-stone-500 font-inter uppercase tracking-[0.2em] mb-2">
            {parsedProduct.category?.name}
          </div>
          <h1 className="font-playfair font-medium text-4xl lg:text-5xl text-charcoal mb-4">
            {parsedProduct.title}
          </h1>
          
          <div className="flex items-end space-x-4 mb-8">
            <span className="text-3xl lg:text-4xl font-semibold text-copper">
              ₹{parsedProduct.discountPrice ? parsedProduct.discountPrice.toLocaleString('en-IN') : parsedProduct.price.toLocaleString('en-IN')}
            </span>
            {parsedProduct.discountPrice && (
              <span className="text-xl text-stone-500 line-through mb-1">
                ₹{parsedProduct.price.toLocaleString('en-IN')}
              </span>
            )}
          </div>

          <div className="prose prose-stone font-inter mb-10 max-w-none text-stone-700">
            <div dangerouslySetInnerHTML={{ __html: parsedProduct.description }} />
          </div>

          <ProductActions product={parsedProduct} />
        </div>
      </div>
    </div>
  );
}
