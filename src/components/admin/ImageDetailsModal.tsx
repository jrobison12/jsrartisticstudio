'use client';

import { useState } from 'react';
import Image from 'next/image';

interface ImageDetailsModalProps {
  image: {
    id: string;
    title: string;
    image: string;
    alt: string;
    description?: string;
  };
  onClose: () => void;
  onSave: (details: {
    title: string;
    alt: string;
    description: string;
  }) => void;
}

export default function ImageDetailsModal({ image, onClose, onSave }: ImageDetailsModalProps) {
  const [title, setTitle] = useState(image.title);
  const [alt, setAlt] = useState(image.alt);
  const [description, setDescription] = useState(image.description || '');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({ title, alt, description });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-serif text-[#2c392c] mb-6">Edit Image Details</h2>
        
        {/* Image Preview */}
        <div className="relative aspect-[4/3] mb-6">
          <Image
            src={image.image}
            alt={image.alt}
            fill
            className="object-cover rounded-lg"
          />
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-[#2c392c] font-medium mb-1">
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-3 py-2 border border-[#d4a373] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
              required
            />
          </div>

          <div>
            <label className="block text-[#2c392c] font-medium mb-1">
              Alt Text
            </label>
            <input
              type="text"
              value={alt}
              onChange={(e) => setAlt(e.target.value)}
              className="w-full px-3 py-2 border border-[#d4a373] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
              required
            />
          </div>

          <div>
            <label className="block text-[#2c392c] font-medium mb-1">
              Description
            </label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-3 py-2 border border-[#d4a373] rounded-md focus:outline-none focus:ring-2 focus:ring-[#d4a373] min-h-[100px]"
              placeholder="Add a description for this image..."
            />
          </div>

          <div className="flex justify-end gap-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-[#2c392c] hover:bg-gray-100 rounded-md transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#e6c29b] transition-colors"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
} 