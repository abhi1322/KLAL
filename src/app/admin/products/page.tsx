import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import connectToDatabase from '@/lib/mongodb';
import Product from '@/models/Product';
import { Edit, Plus, Trash } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

export const revalidate = 0;

export default async function AdminProductsPage() {
  await connectToDatabase();
  const products = await Product.find().populate('category').sort({ createdAt: -1 }).lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-interio-charcoal">Products</h1>
        <Link href="/admin/products/new">
          <Button className="bg-teal-600 hover:bg-teal-600/90 text-white">
            <Plus className="mr-2 h-4 w-4" /> Add Product
          </Button>
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">Product</th>
              <th className="px-6 py-4 font-medium">Category</th>
              <th className="px-6 py-4 font-medium">Price</th>
              <th className="px-6 py-4 font-medium">Stock</th>
              <th className="px-6 py-4 font-medium text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {products.map((product: any) => (
              <tr key={product._id.toString()} className="hover:bg-gray-50">
                <td className="px-6 py-4 flex items-center gap-3">
                  <div className="w-10 h-10 bg-gray-100 rounded overflow-hidden">
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src={product.images?.[0]?.url || 'https://via.placeholder.com/40'} alt="" className="w-full h-full object-cover" />
                  </div>
                  <span className="font-medium text-gray-900">{product.title}</span>
                </td>
                <td className="px-6 py-4 text-gray-500">{product.category?.name}</td>
                <td className="px-6 py-4">₹{product.price}</td>
                <td className="px-6 py-4">
                  <Badge variant={product.inStock ? 'default' : 'secondary'}>
                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                  </Badge>
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/admin/products/${product._id}/edit`}>
                      <Button variant="outline" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </td>
              </tr>
            ))}
            {products.length === 0 && (
              <tr>
                <td colSpan={5} className="text-center py-8 text-gray-500">No products found. Add one to get started.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
