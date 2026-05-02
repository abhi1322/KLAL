"use client";
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import ImageUploader from '@/components/admin/ImageUploader';

export default function AddCategoryPage() {
  const [formData, setFormData] = useState({ name: '', image: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const res = await fetch('/api/categories', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    setLoading(false);
    if (res.ok) {
        router.push('/admin/categories');
        router.refresh();
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-lg shadow-sm border border-gray-100">
      <h1 className="text-3xl font-bold font-heading text-interio-charcoal mb-8">Add Category</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
          <Input required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. PVC Panels" />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Category Image (Optional)</label>
          <ImageUploader 
            maxFiles={1} 
            onImagesChange={(images) => {
              if (images.length > 0) {
                setFormData({...formData, image: images[0].url});
              } else {
                setFormData({...formData, image: ''});
              }
            }} 
          />
        </div>
        <Button type="submit" disabled={loading} className="w-full bg-teal-600 hover:bg-teal-600/90 text-white">
          {loading ? 'Saving...' : 'Save Category'}
        </Button>
      </form>
    </div>
  );
}
