'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import ImageDetailsModal from '@/components/admin/ImageDetailsModal';

interface CategoryImage {
  id: string;
  title: string;
  image: string;
  alt: string;
  description?: string;
}

interface Category {
  id: string;
  name: string;
  images: CategoryImage[];
}

export default function CategoryManager() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);
  const [editingImage, setEditingImage] = useState<CategoryImage | null>(null);

  const categoryList = [
    { id: 'artwork', name: 'Artwork' },
    { id: 'birds', name: 'Birds' },
    { id: 'birds-blooms', name: 'Birds and Blooms' },
    { id: 'birds-interest', name: 'Birds Of Interest' },
    { id: 'birds-of-prey', name: 'Owls, Eagles and Birds of Prey' },
    { id: 'butterflies', name: 'Butterflies and Moths' },
    { id: 'ducks', name: 'Ducks In A Row' },
    { id: 'landscapes', name: 'Landscapes' },
    { id: 'stained-glass', name: 'Stained Glass Artistry' },
    { id: 'weathered-wood', name: 'Weathered Wood and Water' },
    { id: 'wild-wonderful', name: 'Wild and Wonderful' }
  ];

  useEffect(() => {
    const fetchAllCategories = async () => {
      try {
        setLoading(true);
        const fetchPromises = categoryList.map(async (cat) => {
          const response = await fetch(`/api/gallery?category=${cat.id}`);
          const data = await response.json();
          return {
            ...cat,
            images: data.images || []
          };
        });

        const categoriesData = await Promise.all(fetchPromises);
        setCategories(categoriesData);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load categories');
      } finally {
        setLoading(false);
      }
    };

    fetchAllCategories();
  }, []);

  const handleDeleteImage = async (categoryId: string, imageId: string) => {
    if (!deleteConfirm || deleteConfirm !== `${categoryId}-${imageId}`) {
      setDeleteConfirm(`${categoryId}-${imageId}`);
      return;
    }

    try {
      const response = await fetch('/api/admin/delete-image', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ categoryId, imageId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete image');
      }

      // Update local state
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.id === categoryId
            ? { ...cat, images: cat.images.filter(img => img.id !== imageId) }
            : cat
        )
      );
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete image');
    } finally {
      setDeleteConfirm(null);
    }
  };

  const handleUpdateImageDetails = async (
    categoryId: string,
    imageId: string,
    updatedDetails: { title: string; alt: string; description: string }
  ) => {
    try {
      const response = await fetch('/api/admin/update-image', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          categoryId,
          imageId,
          ...updatedDetails
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update image details');
      }

      // Update local state
      setCategories(prevCategories => 
        prevCategories.map(cat => 
          cat.id === categoryId
            ? {
                ...cat,
                images: cat.images.map(img =>
                  img.id === imageId
                    ? { ...img, ...updatedDetails }
                    : img
                )
              }
            : cat
        )
      );

      setEditingImage(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update image details');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-[#2c392c]/80">Loading categories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#f4f1ea] py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-red-500">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-serif text-[#2c392c]">Manage Categories</h1>
            <p className="text-[#2c392c]/80 mt-2">
              Click on a category to view and manage its images
            </p>
          </div>
          <Link
            href="/admin"
            className="px-4 py-2 bg-[#d4a373] text-white rounded-md hover:bg-[#e6c29b] transition-colors"
          >
            Back to Dashboard
          </Link>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {categories.map((category) => (
            <div
              key={category.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-serif text-[#2c392c] mb-4">
                  {category.name}
                </h2>
                <button
                  onClick={() => setSelectedCategory(
                    selectedCategory === category.id ? null : category.id
                  )}
                  className="w-full px-4 py-2 bg-[#d4a373] text-white rounded-md 
                           hover:bg-[#e6c29b] transition-colors mb-4"
                >
                  {selectedCategory === category.id ? 'Close Folder' : 'Open Folder'}
                </button>

                {/* Images Grid */}
                {selectedCategory === category.id && (
                  <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2">
                    {category.images.length > 0 ? (
                      category.images.map((image) => (
                        <div
                          key={image.id}
                          className="relative bg-gray-50 rounded-md overflow-hidden"
                        >
                          <Link 
                            href={`/gallery/image/${image.id}`}
                            className="block"
                          >
                            <div className="aspect-[4/3] relative cursor-pointer group">
                              <Image
                                src={image.image}
                                alt={image.alt}
                                fill
                                className="object-cover transition-opacity group-hover:opacity-90"
                              />
                            </div>
                          </Link>
                          <div className="p-2">
                            <p className="text-xs text-[#2c392c] truncate">
                              {image.title}
                            </p>
                            <div className="flex justify-between items-center gap-0.5 mt-1">
                              <button
                                onClick={() => setEditingImage(image)}
                                className="flex-1 px-1.5 py-0.5 rounded-sm text-[10px] bg-[#d4a373] hover:bg-[#e6c29b] text-white transition-colors"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => handleDeleteImage(category.id, image.id)}
                                className={`flex-1 px-1.5 py-0.5 rounded-sm text-[10px] ${
                                  deleteConfirm === `${category.id}-${image.id}`
                                    ? 'bg-red-500 hover:bg-red-600'
                                    : 'bg-[#d4a373] hover:bg-[#e6c29b]'
                                } text-white transition-colors`}
                              >
                                {deleteConfirm === `${category.id}-${image.id}`
                                  ? 'Confirm'
                                  : 'Delete'}
                              </button>
                            </div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <p className="text-[#2c392c]/80 text-center py-4 col-span-full">
                        No images in this category
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Edit Image Details Modal */}
      {editingImage && (
        <ImageDetailsModal
          image={editingImage}
          onClose={() => setEditingImage(null)}
          onSave={(details) => {
            const category = categories.find(cat => 
              cat.images.some(img => img.id === editingImage.id)
            );
            if (category) {
              handleUpdateImageDetails(category.id, editingImage.id, details);
            }
          }}
        />
      )}
    </div>
  );
} 