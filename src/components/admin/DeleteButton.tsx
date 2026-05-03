'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface DeleteButtonProps {
  url: string;
  itemType: string;
}

export default function DeleteButton({ url, itemType }: DeleteButtonProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    if (!window.confirm(`Are you sure you want to delete this ${itemType}? This action cannot be undone.`)) {
      return;
    }

    try {
      setIsDeleting(true);
      const res = await fetch(url, {
        method: 'DELETE',
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to delete');
      }

      alert(`${itemType} deleted successfully.`);
      router.refresh();
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button 
      variant="destructive" 
      size="sm" 
      onClick={handleDelete}
      disabled={isDeleting}
      className="bg-red-500 hover:bg-red-600 text-white ml-2"
      title={`Delete ${itemType}`}
    >
      <Trash className="h-4 w-4" />
    </Button>
  );
}
