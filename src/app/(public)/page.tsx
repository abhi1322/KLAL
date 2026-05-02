import React from 'react';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import Category from '@/models/Category';
import { LandingAnimationWrapper } from '@/components/storefront/LandingAnimationWrapper';

async function getFeaturedProducts() {
  await connectToDatabase();
  const products = await Product.find({ featured: true }).limit(4).populate('category').lean();
  return JSON.parse(JSON.stringify(products));
}

export const revalidate = 60; // 1 min ISR

export default async function HomePage() {
  const featuredProducts = await getFeaturedProducts();

  return (
    <LandingAnimationWrapper featuredProducts={featuredProducts} />
  );
}
