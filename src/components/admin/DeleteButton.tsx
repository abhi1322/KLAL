'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash, AlertTriangle, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  url: string;
  itemType: string;
}

export default function DeleteButton({ url, itemType }: DeleteButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleDelete = async () => {
    try {
      setIsDeleting(true);
      setError(null);
      const res = await fetch(url, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete');
      }

      setIsOpen(false);
      router.refresh();
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Button 
        variant="default" 
        size="sm" 
        onClick={() => setIsOpen(true)}
        className="bg-red-500 hover:bg-red-600 text-white ml-2"
        title={`Delete ${itemType}`}
      >
        <Trash className="h-4 w-4" />
      </Button>

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-sm p-6 transform transition-all animate-in fade-in zoom-in duration-200">
            <div className="flex flex-col items-center text-center">
              <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center mb-4">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2 font-heading">
                Delete {itemType.charAt(0).toUpperCase() + itemType.slice(1)}
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Are you sure you want to delete this {itemType}? This action cannot be undone and will permanently remove this data.
              </p>

              {error && (
                <div className="w-full bg-red-50 border border-red-200 text-red-600 text-sm p-3 rounded-md mb-6 text-left">
                  <span className="font-semibold block mb-1">Error:</span>
                  {error}
                </div>
              )}

              <div className="flex gap-3 w-full">
                <Button 
                  variant="outline" 
                  className="flex-1 border-gray-200 text-gray-700 hover:bg-gray-50"
                  onClick={() => setIsOpen(false)}
                  disabled={isDeleting}
                >
                  Cancel
                </Button>
                <Button 
                  variant="default" 
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white"
                  onClick={handleDelete}
                  disabled={isDeleting}
                >
                  {isDeleting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Deleting...
                    </>
                  ) : (
                    'Yes, Delete'
                  )}
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
