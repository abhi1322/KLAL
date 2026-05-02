"use client";
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';
import { RichTextEditor } from '@/components/admin/RichTextEditor';

export default function EditProductPage({ params }: { params: { id: string } }) {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    title: '', description: '', price: '', discountPrice: '', category: '', inStock: true, featured: false, images: []
  });
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    fetch('/api/categories').then(res => res.json()).then(setCategories);
    fetch(`/api/products/${params.id}`).then(res => res.json()).then(data => {
      setFormData({
        title: data.title || '',
        description: data.description || '',
        price: data.price || '',
        discountPrice: data.discountPrice || '',
        category: data.category || '',
        inStock: data.inStock ?? true,
        featured: data.featured ?? false,
        images: data.images || []
      });
      setLoading(false);
    });
  }, [params.id]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`/api/products/${params.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    if (res.ok) {
        router.push('/admin/products');
        router.refresh();
    }
  };

  if (loading) return <div className="p-8 text-center text-gray-500">Loading product data...</div>;

  return (
    <div className="max-w-2xl mx-auto bg-white p-5 md:p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-2xl md:text-3xl font-bold font-heading text-interio-charcoal mb-6 md:mb-8">Edit Product</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
          <Input required value={formData.title} onChange={e => setFormData({...formData, title: e.target.value})} />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
          <RichTextEditor 
            value={formData.description} 
            onChange={(val) => setFormData({...formData, description: val})} 
            placeholder="Write product description here..."
          />
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <Input required type="number" value={formData.price} onChange={e => setFormData({...formData, price: e.target.value})} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Discount Price (Optional)</label>
            <Input type="number" value={formData.discountPrice} onChange={e => setFormData({...formData, discountPrice: e.target.value})} />
          </div>
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
          <select required className="flex h-10 w-full rounded-md border border-gray-300 px-3 py-2 text-sm" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}>
            <option value="">Select Category</option>
            {categories.map((c: any) => <option key={c._id} value={c._id}>{c.name}</option>)}
          </select>
        </div>
        
        <div className="flex items-center gap-6 pt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.inStock} onChange={e => setFormData({...formData, inStock: e.target.checked})} className="w-4 h-4 text-teal-600 rounded focus:ring-teal-600" />
            <span className="text-sm font-medium text-gray-700">In Stock</span>
          </label>
          <label className="flex items-center gap-2 cursor-pointer">
            <input type="checkbox" checked={formData.featured} onChange={e => setFormData({...formData, featured: e.target.checked})} className="w-4 h-4 text-teal-600 rounded focus:ring-teal-600" />
            <span className="text-sm font-medium text-gray-700">Featured</span>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Product Images</label>
          <ImageUploader 
            maxFiles={10} 
            initialImages={formData.images}
            onImagesChange={(images) => setFormData({...formData, images: images as any})} 
          />
        </div>
        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-600/90 text-white">Update Product</Button>
      </form>
    </div>
  );
}
