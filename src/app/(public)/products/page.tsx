import React from 'react';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { ProductCard } from '@/components/storefront/ProductCard';
import Category from '@/models/Category';
import Link from 'next/link';

export const revalidate = 60;

export default async function ProductsPage({ searchParams }: { searchParams: { category?: string } }) {
  await connectToDatabase();
  
  const query: any = {};
  if (searchParams.category) {
    const categoryQuery = await Category.findOne({ slug: searchParams.category }).lean();
    if (categoryQuery) {
      query.category = categoryQuery._id;
    }
  }

  const products = await Product.find(query).populate('category').lean();
  const parsedProducts = JSON.parse(JSON.stringify(products));

  const categories = await Category.find().lean();
  const parsedCategories = JSON.parse(JSON.stringify(categories));

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-8 py-12 md:py-20">
      <h1 className="font-playfair text-4xl text-charcoal mb-8">Our Collection</h1>
      
      <div className="flex flex-wrap gap-4 mb-10">
        <Link 
          href="/products" 
          className={`px-5 py-2.5 rounded-full text-sm font-inter font-medium transition-colors shadow-sm ${!searchParams.category ? 'bg-copper border border-copper text-white' : 'bg-warm-50 border border-stone-300 text-charcoal hover:bg-warm-100'}`}
        >
          All
        </Link>
        {parsedCategories.map((c: any) => (
          <Link 
            key={c._id}
            href={`/products?category=${c.slug}`} 
            className={`px-5 py-2.5 rounded-full text-sm font-inter font-medium transition-colors shadow-sm ${searchParams.category === c.slug ? 'bg-copper border border-copper text-white' : 'bg-warm-50 border border-stone-300 text-charcoal hover:bg-warm-100'}`}
          >
            {c.name}
          </Link>
        ))}
      </div>

      {parsedProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {parsedProducts.map((p: any) => (
            <ProductCard key={p._id} product={p} />
          ))}
        </div>
      ) : (
        <div className="text-center py-32 text-stone-500 font-inter bg-white rounded-2xl border border-stone-300 border-dashed shadow-sm">
          <p className="text-lg">No products found in this category.</p>
        </div>
      )}
    </div>
  );
}
