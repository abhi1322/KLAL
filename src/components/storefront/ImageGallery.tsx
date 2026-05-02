"use client";

import React, { useState } from 'react';
import { cn } from '@/lib/utils';

interface ImageGalleryProps {
  images: { url: string; public_id?: string }[];
  title: string;
}

export function ImageGallery({ images, title }: ImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  if (!images || images.length === 0) {
    return (
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-warm-50 border border-stone-300 shadow-sm">
        <img 
          src="https://via.placeholder.com/800x600?text=No+Image" 
          alt="No Image"
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="aspect-[4/3] overflow-hidden rounded-2xl bg-warm-50 relative border border-stone-300 shadow-sm group">
        <img 
          src={images[selectedImage]?.url} 
          alt={`${title} - image ${selectedImage + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="grid grid-cols-5 gap-3">
          {images.map((image, index) => (
            <button
              key={image.public_id || index}
              onClick={() => setSelectedImage(index)}
              className={cn(
                "aspect-square rounded-lg overflow-hidden border-2 transition-all duration-200",
                selectedImage === index 
                  ? "border-copper shadow-md scale-95" 
                  : "border-stone-200 hover:border-stone-400 opacity-70 hover:opacity-100"
              )}
            >
              <img 
                src={image.url} 
                alt={`${title} thumbnail ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
