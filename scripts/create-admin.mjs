/**
 * Run this once to create the admin user in MongoDB Atlas:
 * node scripts/create-admin.mjs
 */
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
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

const AdminSchema = new mongoose.Schema({
  email: String,
  passwordHash: String,
}, { timestamps: true });

const Admin = mongoose.models.Admin || mongoose.model('Admin', AdminSchema);

// Remove any existing admin and recreate cleanly
await Admin.deleteMany({});
const hash = await bcrypt.hash('admin123', 10);
await Admin.create({ email: 'admin@interio.com', passwordHash: hash });

console.log('✅ Admin created successfully!');
console.log('   Email:    admin@interio.com');
console.log('   Password: admin123');

await mongoose.disconnect();
process.exit(0);
