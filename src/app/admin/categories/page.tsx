import React from 'react';
import connectToDatabase from '@/lib/mongodb';
import Category from '@/models/Category';
import Link from 'next/link';

export const revalidate = 0;

export default async function AdminCategoriesPage() {
  await connectToDatabase();
  const categories = await Category.find().sort({ name: 1 }).lean();

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold font-heading text-interio-charcoal">Categories</h1>
        <Link href="/admin/categories/new" className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-600/90 text-sm font-medium transition-colors">
          Add Category
        </Link>
      </div>
      
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden">
        <table className="w-full text-sm text-left">
          <thead className="bg-gray-50 text-gray-700">
            <tr>
              <th className="px-6 py-4 font-medium">Name</th>
              <th className="px-6 py-4 font-medium">Slug</th>
              <th className="px-6 py-4 font-medium">Image</th>
              <th className="px-6 py-4 font-medium text-right">Added</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {categories.map((category: any) => (
              <tr key={category._id.toString()} className="hover:bg-gray-50">
                <td className="px-6 py-4 font-medium text-gray-900">{category.name}</td>
                <td className="px-6 py-4 text-gray-500">{category.slug}</td>
                <td className="px-6 py-4 text-gray-500">
                  {category.image ? 'Has Image' : 'No Image'}
                </td>
                <td className="px-6 py-4 text-right">
                  {new Date(category.createdAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
            {categories.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center py-8 text-gray-500">No categories found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
