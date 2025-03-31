'use client';

import Image from "next/image";
import Link from "next/link";

export default function Gallery() {
  const categories = [
    { id: 'artwork', name: 'Artwork' },
    { id: 'birds-blooms', name: 'Birds and Blooms' },
    { id: 'birds-interest', name: 'Birds Of Interest' },
    { id: 'birds-of-prey', name: 'Owls, Eagles and Birds of Prey' },
    { id: 'ducks', name: 'Ducks In A Row' },
    { id: 'butterflies', name: 'Butterflies and Moths' },
    { id: 'landscapes', name: 'Landscapes' },
    { id: 'stained-glass', name: 'Stained Glass Artistry' },
    { id: 'weathered-wood', name: 'Weathered Wood and Water' },
    { id: 'wild-wonderful', name: 'Wild and Wonderful' }
  ];

  // Helper function to get category thumbnail
  const getCategoryThumbnail = (categoryId: string) => {
    switch (categoryId) {
      case 'artwork':
        return '/images/category-thumbnails/artwork.jpg';
      case 'birds-blooms':
        return '/images/category-thumbnails/birds-blooms.jpg';
      case 'birds-interest':
        return '/images/category-thumbnails/birds-interest.jpg';
      case 'birds-of-prey':
        return '/images/category-thumbnails/birds-of-prey.jpg';
      case 'ducks':
        return '/images/category-thumbnails/ducks.jpg';
      case 'butterflies':
        return '/images/category-thumbnails/butterfly.jpg';
      case 'landscapes':
        return '/images/category-thumbnails/landscape.jpg';
      case 'stained-glass':
        return '/images/category-thumbnails/stained-glass.jpg';
      case 'weathered-wood':
        return '/images/category-thumbnails/weathered-wood.jpg';
      case 'wild-wonderful':
        return '/images/category-thumbnails/wildlife.jpg';
      default:
        return '/images/placeholder.jpg';
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/gallery/${category.id}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white"
        >
          <Image
            src={getCategoryThumbnail(category.id)}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-[#2c392c]/60 flex items-center justify-center
                        opacity-0 group-hover:opacity-100 transition-opacity">
            <h2 className="text-[#e9e2d3] text-2xl font-serif text-center px-4">
              {category.name}
            </h2>
          </div>
        </Link>
      ))}
    </div>
  );
} 