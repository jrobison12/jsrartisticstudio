'use client';

import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

export default function CategoryGallery() {
  const params = useParams();
  const category = params.category as string;

  // This would eventually come from your database or CMS
  const galleryItems = [
    // Landscapes
    {
      id: 1,
      title: "Mountain Vista",
      category: "landscapes",
      image: "/images/landscape.jpg",
      alt: "Scenic mountain landscape"
    },
    // Wildlife
    {
      id: 2,
      title: "Majestic Elk",
      category: "wildlife",
      image: "/images/wildlife.jpg",
      alt: "Majestic elk in natural habitat"
    },
    // Birds & Blooms
    {
      id: 3,
      title: "Hummingbird Garden",
      category: "birds-blooms",
      image: "/images/birds-blooms.jpg",
      alt: "Hummingbird feeding on flowers"
    },
    // Butterflies
    {
      id: 4,
      title: "Monarch in Flight",
      category: "butterflies",
      image: "/images/butterfly.jpg",
      alt: "Monarch butterfly on flower"
    },
    // Weathered Wood
    {
      id: 5,
      title: "Historic Mill",
      category: "weathered-wood",
      image: "/images/weathered-wood.jpg",
      alt: "Historic wooden watermill"
    },
    // Stained Glass
    {
      id: 6,
      title: "Nature's Light",
      category: "stained-glass",
      image: "/images/stained-glass.jpg",
      alt: "Stained glass artwork"
    },
    // Artwork
    {
      id: 7,
      title: "Nature's Canvas",
      category: "artwork",
      image: "/images/artwork.jpg",
      alt: "Original artwork piece"
    },
    // Nature of Things
    {
      id: 8,
      title: "Nature's Story",
      category: "nature-things",
      image: "/images/landscape.jpg",
      alt: "Nature photography with written narrative"
    },
    // Elk Expo Winner
    {
      id: 9,
      title: "Award Winning Elk",
      category: "elk-expo",
      image: "/images/wildlife.jpg",
      alt: "Award-winning elk photograph from 2019 Expo"
    },
    // Wet Paint
    {
      id: 10,
      title: "Work in Progress",
      category: "wet-paint",
      image: "/images/artwork.jpg",
      alt: "Current artwork in progress"
    },
    // Wild and Wonderful
    {
      id: 11,
      title: "Wildlife Moments",
      category: "wild-wonderful",
      image: "/images/wildlife.jpg",
      alt: "Wonderful moment in wildlife"
    },
    // Birds of Interest
    {
      id: 12,
      title: "Bird Watching",
      category: "birds-interest",
      image: "/images/birds-blooms.jpg",
      alt: "Interesting bird behavior captured in nature"
    },
    // Birds of Prey
    {
      id: 13,
      title: "Majestic Eagle",
      category: "birds-of-prey",
      image: "/images/wildlife.jpg",
      alt: "Eagle in flight"
    },
    // Ducks in a Row
    {
      id: 14,
      title: "Duck Family",
      category: "ducks",
      image: "/images/birds-blooms.jpg",
      alt: "Family of ducks in their natural habitat"
    }
  ];

  const categoryTitles: { [key: string]: string } = {
    'all': 'All',
    'artwork': 'Artwork',
    'birds': 'Birds',
    'birds-blooms': 'Birds and Blooms',
    'birds-interest': 'Birds Of Interest',
    'birds-of-prey': 'Owls, Eagles and Birds of Prey',
    'butterflies': 'Butterflies and Moths',
    'ducks': 'Ducks In A Row',
    'elk-expo': 'Winner 2019 Elk Expo Patch Photo Contest',
    'landscapes': 'Landscapes',
    'nature-things': 'Nature of Things... Written Word and Nature Photo',
    'stained-glass': 'Stained Glass Artistry',
    'weathered-wood': 'Weathered Wood and Water',
    'wet-paint': 'Wet Paint... On The Easel... Work in Progress...',
    'wild-wonderful': 'Wild and Wonderful...'
  };

  const filteredItems = galleryItems.filter(item => item.category === category);

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

        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white"
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
                </div>
              </div>
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