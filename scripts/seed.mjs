import mongoose from 'mongoose';
import { config } from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));
config({ path: resolve(__dirname, '../.env') });

const MONGODB_URI = process.env.MONGODB_URI;
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI not found in .env');
  process.exit(1);
}

await mongoose.connect(MONGODB_URI);

const CategorySchema = new mongoose.Schema({
  name: String,
  slug: String,
  image: String,
}, { timestamps: true });

const ProductSchema = new mongoose.Schema({
  title: String,
  slug: String,
  description: String,
  price: Number,
  discountPrice: Number,
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category' },
  tags: [String],
  images: [{ url: String, public_id: String }],
  inStock: Boolean,
  featured: Boolean,
}, { timestamps: true });

const Category = mongoose.models.Category || mongoose.model('Category', CategorySchema);
const Product = mongoose.models.Product || mongoose.model('Product', ProductSchema);

console.log('Clearing old data...');
await Product.deleteMany({});
await Category.deleteMany({});

console.log('Inserting Categories...');
const cat1 = await Category.create({ name: 'Wall Cladding', slug: 'wall-cladding', image: 'https://images.unsplash.com/photo-1505691938859-8c8314c5ce5f?w=800&q=80' });
const cat2 = await Category.create({ name: 'PVC Panels', slug: 'pvc-panels', image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80' });
const cat3 = await Category.create({ name: 'False Ceilings', slug: 'false-ceilings', image: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80' });

console.log('Inserting Products...');
await Product.create({
  title: 'Premium Wood Fluted Panel',
  slug: 'premium-wood-fluted-panel',
  description: '<p>High-quality wood fluted panel for interior wall cladding. Water-resistant and easy to install.</p>',
  price: 1200,
  discountPrice: 999,
  category: cat1._id,
  tags: ['wood', 'fluted', 'panel'],
  images: [
    { url: 'https://images.unsplash.com/photo-1533090161767-e6ffed986c88?w=800&q=80', public_id: 'sample1' },
    { url: 'https://images.unsplash.com/photo-1505691938859-8c8314c5ce5f?w=800&q=80', public_id: 'sample2' }
  ],
  inStock: true,
  featured: true,
});

await Product.create({
  title: 'Marble Finish PVC Sheet',
  slug: 'marble-finish-pvc-sheet',
  description: '<p>Glossy marble finish PVC sheet perfect for living rooms and bathrooms. Highly durable seamless design.</p>',
  price: 850,
  category: cat2._id,
  tags: ['pvc', 'marble', 'sheet'],
  images: [
    { url: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80', public_id: 'sample3' }
  ],
  inStock: true,
  featured: false,
});

await Product.create({
  title: 'Matte Charcoal False Ceiling Tile',
  slug: 'matte-charcoal-false-ceiling-tile',
  description: '<p>Elegant charcoal false ceiling drop tiles. Sound dampening and easy maintenance.</p>',
  price: 1500,
  category: cat3._id,
  tags: ['ceiling', 'charcoal', 'matte'],
  images: [
    { url: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?w=800&q=80', public_id: 'sample4' }
  ],
  inStock: false,
  featured: true,
});

console.log('✅ Seed data inserted successfully!');
await mongoose.disconnect();
process.exit(0);
