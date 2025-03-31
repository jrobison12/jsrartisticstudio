'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

export default function CategoryGallery() {
  const params = useParams();
  const category = params.category as string;
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchImages = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/gallery?category=${category}`);
        const data = await response.json();
        
        if (!response.ok) {
          throw new Error(data.error || 'Failed to fetch images');
        }

        setImages(data.images);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Failed to load images');
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, [category]);

  const categoryTitles: { [key: string]: string } = {
    'all': 'All Images',
    'artwork': 'Artwork',
    'birds': 'Birds',
    'birds-blooms': 'Birds and Blooms',
    'birds-interest': 'Birds Of Interest',
    'birds-of-prey': 'Owls, Eagles and Birds of Prey',
    'butterflies': 'Butterflies and Moths',
    'ducks': 'Ducks In A Row',
    'elk-expo': 'Winner 2019 Elk Expo Patch Photo Contest',
    'landscapes': 'Landscapes',
    'stained-glass': 'Stained Glass Artistry',
    'weathered-wood': 'Weathered Wood and Water',
    'wild-wonderful': 'Wild and Wonderful'
  };

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Link 
            href="/gallery"
            className="text-[#2c392c] hover:text-[#465446] transition-colors"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              viewBox="0 0 24 24" 
              fill="currentColor" 
              className="w-6 h-6"
            >
              <path 
                fillRule="evenodd" 
                d="M7.72 12.53a.75.75 0 010-1.06l7.5-7.5a.75.75 0 111.06 1.06L9.31 12l6.97 6.97a.75.75 0 11-1.06 1.06l-7.5-7.5z" 
                clipRule="evenodd" 
              />
            </svg>
          </Link>
          <h1 className="text-4xl font-serif text-[#2c392c]">
            {categoryTitles[category] || 'Gallery'}
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-12">
            <p className="text-[#2c392c]/80">Loading images...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-500">{error}</p>
          </div>
        ) : images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/image/${item.id}`}
                className="block group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#2c392c]/60 flex flex-col items-center justify-center 
                              opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-[#e9e2d3] text-xl font-serif mb-2">{item.title}</h3>
                  <p className="text-[#e9e2d3] text-sm">Click to view details</p>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#2c392c]/80">No images available in this category yet.</p>
          </div>
        )}
      </div>
    </div>
  );
} 