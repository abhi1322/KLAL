import { NextResponse } from 'next/server';
import connectToDatabase from '@/lib/mongodb';
import Category from '@/models/Category';
import Product from '@/models/Product';
import Admin from '@/models/Admin';
import bcrypt from 'bcryptjs';

export async function GET() {
  try {
    await connectToDatabase();

    // Check if already seeded
    const adminCount = await Admin.countDocuments();
    if (adminCount > 0) {
      return NextResponse.json({ message: 'Database already seeded.' });
    }

    // 1. Seed Admin
    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash('admin123', salt);
    await Admin.create({
      email: 'admin@KLal.com',
      passwordHash,
    });

    // 2. Seed Categories
    const categories = await Category.insertMany([
      { name: 'PVC Panels', slug: 'pvc-panels', image: 'https://images.unsplash.com/photo-1615529162924-f8605388461d?w=800' },
      { name: 'Wall Cladding', slug: 'wall-cladding', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800' },
      { name: 'False Ceilings', slug: 'false-ceilings', image: 'https://images.unsplash.com/photo-1513161455079-7dc1de15ef3e?w=800' },
    ]);

    // 3. Seed Products
    await Product.insertMany([
      {
        title: 'Premium Wood Texture PVC Panel',
        slug: 'premium-wood-texture-pvc',
        description: 'High-quality wood finished PVC wall panel, 10ft x 10inch.',
        price: 450,
        tags: ['wood', 'premium', 'pvc'],
        category: categories[0]._id,
        inStock: true,
        featured: true,
        images: [{ url: 'https://images.unsplash.com/photo-1615529182904-14819c35db37?w=800', public_id: 'seed-p1' }]
      },
      {
        title: 'Modern Fluted Wall Cladding',
        slug: 'modern-fluted-wall-cladding',
        description: 'Charcoal fluted wall louvers for KLalr and exterior.',
        price: 850,
        tags: ['charcoal', 'exterior', 'KLalr'],
        category: categories[1]._id,
        inStock: true,
        featured: true,
        images: [{ url: 'https://images.unsplash.com/photo-1600607686527-6fb886090705?w=800', public_id: 'seed-p2' }]
      },
      {
        title: 'Gypsum False Ceiling Board',
        slug: 'gypsum-false-ceiling',
        description: 'Moisture resistant 12mm gypsum board for KLalrs.',
        price: 320,
        discountPrice: 280,
        tags: ['gypsum', 'moisture-resistant'],
        category: categories[2]._id,
        inStock: true,
        featured: false,
        images: [{ url: 'https://images.unsplash.com/photo-1534349762230-e0cadf78f5da?w=800', public_id: 'seed-p3' }]
      }
    ]);

    return NextResponse.json({ message: 'Database seeded successfully. Admin credentials: admin@KLal.com / admin123' });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
