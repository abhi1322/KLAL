"use client";
import React, { useState, useEffect } from 'react';

interface UploadedImage {
  url: string;
  public_id: string;
}

interface ImageUploaderProps {
  onImagesChange: (images: UploadedImage[]) => void;
  initialImages?: UploadedImage[];
  maxFiles?: number;
}

export default function ImageUploader({ onImagesChange, initialImages = [], maxFiles = 5 }: ImageUploaderProps) {
  const [images, setImages] = useState<UploadedImage[]>([]);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (initialImages && initialImages.length > 0) {
      setImages(initialImages);
    }
  }, [initialImages]);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;
    
    setUploading(true);
    const files = Array.from(e.target.files).slice(0, maxFiles - images.length);
    
    const uploadedImages: UploadedImage[] = [];
    
    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);
      
      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });
        
        if (res.ok) {
          const data = await res.json();
          uploadedImages.push({ url: data.url, public_id: data.public_id });
        }
      } catch (error) {
        console.error("Upload failed", error);
      }
    }
    
    const newImages = [...images, ...uploadedImages];
    setImages(newImages);
    onImagesChange(newImages);
    setUploading(false);
  };

  const removeImage = (indexToRemove: number) => {
    const newImages = images.filter((_, index) => index !== indexToRemove);
    setImages(newImages);
    onImagesChange(newImages);
  };

  const setAsThumbnail = (index: number) => {
    if (index === 0) return;
    const newImages = [...images];
    const temp = newImages[0];
    newImages[0] = newImages[index];
    newImages[index] = temp;
    setImages(newImages);
    onImagesChange(newImages);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <input 
          type="file" 
          multiple 
          accept="image/*" 
          onChange={handleUpload} 
          disabled={uploading || images.length >= maxFiles}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-md file:border-0
            file:text-sm file:font-medium
            file:bg-teal-600 file:text-white
            hover:file:bg-teal-600/90 hover:file:cursor-pointer
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
        {uploading && <span className="text-sm text-gray-500 animate-pulse">Uploading...</span>}
      </div>
      
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((img, index) => (
            <div key={index} className={`relative group rounded-md overflow-hidden border ${index === 0 ? 'border-teal-600 border-2' : 'border-gray-200'}`}>
              <img src={img.url} alt={`Preview ${index}`} className="w-full h-32 object-cover" />
              
              {index === 0 && (
                <div className="absolute top-0 left-0 bg-teal-600 text-white text-xs px-2 py-1 m-1 rounded font-medium">
                  Thumbnail
                </div>
              )}

              {index !== 0 && (
                <button
                  type="button"
                  onClick={() => setAsThumbnail(index)}
                  className="absolute bottom-2 left-2 right-2 bg-gray-900/80 hover:bg-teal-600 text-white text-xs py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  Set Thumbnail
                </button>
              )}

              <button
                type="button"
                onClick={() => removeImage(index)}
                className="absolute top-2 right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
              >
                &times;
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
