'use client';

import Image from "next/image";
import { useState } from "react";
import Link from "next/link";

export default function Gallery() {
  const [activeCategory] = useState('all');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const birdSubcategories = [
    { id: 'birds-blooms', name: 'Birds and Blooms' },
    { id: 'birds-interest', name: 'Birds Of Interest' },
    { id: 'ducks', name: 'Ducks In A Row' },
    { id: 'birds-of-prey', name: 'Owls, Eagles and Birds of prey' }
  ];

  const categories = [
    { id: 'all', name: 'All' },
    { id: 'artwork', name: 'Artwork' },
    { id: 'birds', name: 'Birds' },
    { id: 'butterflies', name: 'Butterflies and Moths' },
    { id: 'landscapes', name: 'Landscapes' },
    { id: 'nature-things', name: 'Nature of Things... Written Word and Nature Photo' },
    { id: 'stained-glass', name: 'Stained Glass Artistry' },
    { id: 'weathered-wood', name: 'Weathered Wood and Water' },
    { id: 'wet-paint', name: 'Wet Paint... On The Easel... Work in Progress...' },
    { id: 'wild-wonderful', name: 'Wild and Wonderful...' }
  ];

  const galleryItems = [
    // Landscapes
    {
      id: 1,
      title: "Mountain Vista",
      category: "landscapes",
      image: "/images/landscape.jpg",
      alt: "Scenic mountain landscape"
    },
    // Artwork
    {
      id: 2,
      title: "Nature's Canvas",
      category: "artwork",
      image: "/images/artwork.jpg",
      alt: "Original artwork piece"
    },
    // Butterflies and Moths
    {
      id: 3,
      title: "Monarch in Flight",
      category: "butterflies",
      image: "/images/butterfly.jpg",
      alt: "Monarch butterfly on flower"
    },
    // Weathered Wood and Water
    {
      id: 4,
      title: "Historic Mill",
      category: "weathered-wood",
      image: "/images/weathered-wood.jpg",
      alt: "Historic wooden watermill with flowing water"
    },
    // Owls, Eagles and Birds of prey
    {
      id: 5,
      title: "Majestic Eagle",
      category: "birds-of-prey",
      image: "/images/wildlife.jpg",
      alt: "Eagle in flight"
    },
    // Birds and Blooms
    {
      id: 6,
      title: "Hummingbird Garden",
      category: "birds-blooms",
      image: "/images/birds-blooms.jpg",
      alt: "Hummingbird feeding on flowers"
    },
    // Birds Of Interest
    {
      id: 7,
      title: "Bird Watching",
      category: "birds-interest",
      image: "/images/birds-blooms.jpg",
      alt: "Interesting bird behavior captured in nature"
    },
    // Wild and Wonderful
    {
      id: 8,
      title: "Wildlife Moments",
      category: "wild-wonderful",
      image: "/images/wildlife.jpg",
      alt: "Wonderful moment in wildlife"
    },
    // Wet Paint... On The Easel
    {
      id: 9,
      title: "Work in Progress",
      category: "wet-paint",
      image: "/images/artwork.jpg",
      alt: "Current artwork in progress"
    },
    // Ducks In A Row
    {
      id: 10,
      title: "Duck Family",
      category: "ducks",
      image: "/images/birds-blooms.jpg",
      alt: "Family of ducks in their natural habitat"
    },
    // Nature of Things
    {
      id: 11,
      title: "Nature's Story",
      category: "nature-things",
      image: "/images/landscape.jpg",
      alt: "Nature photography with written narrative"
    },
    // Winner 2019 Elk Expo
    {
      id: 12,
      title: "Award Winning Elk",
      category: "elk-expo",
      image: "/images/wildlife.jpg",
      alt: "Award-winning elk photograph from 2019 Expo"
    },
    // Stained Glass
    {
      id: 13,
      title: "Glass Artistry",
      category: "stained-glass",
      image: "/images/stained-glass.jpg",
      alt: "Beautiful stained glass artwork"
    }
  ];

  const filteredItems = activeCategory === 'all' 
    ? galleryItems 
    : activeCategory === 'birds'
      ? galleryItems.filter(item => birdSubcategories.some(sub => sub.id === item.category))
      : galleryItems.filter(item => item.category === activeCategory);

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <div className="relative flex">
        {/* Category Navigation Sidebar */}
        <aside className="fixed left-0 w-72 bg-[#2c392c] shadow-lg z-40 top-[7.5rem] bottom-0">
          <div className="h-full overflow-y-auto scroll-smooth
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-[#2c392c]
                        [&::-webkit-scrollbar-thumb]:bg-[#465446]
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:border-2
                        [&::-webkit-scrollbar-thumb]:border-[#2c392c]
                        hover:[&::-webkit-scrollbar-thumb]:bg-[#d4a373]">
            {/* Categories including Birds dropdown */}
            {categories.map(category => (
              <div key={category.id}>
                {category.id === 'birds' ? (
                  // Birds dropdown section
                  <div className="relative">
                    <button
                      onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                      className={`w-full text-left px-6 py-3 transition-colors border-b border-[#465446] 
                               text-[#e9e2d3] hover:bg-[#465446] flex items-center justify-between
                               ${birdSubcategories.some(sub => sub.id === activeCategory)
                                 ? 'bg-[#d4a373] text-white'
                                 : ''}`}
                    >
                      <span>{category.name}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className={`w-4 h-4 transition-transform ${isDropdownOpen ? 'rotate-90' : ''}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                    
                    {/* Bird subcategories dropdown */}
                    {isDropdownOpen && (
                      <div className="fixed left-72 w-72 bg-[#2c392c] shadow-lg border-l border-[#465446]">
                        {birdSubcategories.map(subcategory => (
                          <Link
                            key={subcategory.id}
                            href={`/gallery/${subcategory.id}`}
                            className={`block w-full text-left px-6 py-3 transition-colors border-b border-[#465446] ${
                              activeCategory === subcategory.id
                                ? 'bg-[#d4a373] text-white'
                                : 'text-[#e9e2d3] hover:bg-[#465446]'
                            }`}
                          >
                            {subcategory.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                ) : (
                  // Regular category button
                  <Link
                    href={`/gallery/${category.id}`}
                    className={`block w-full text-left px-6 py-3 transition-colors border-b border-[#465446] ${
                      activeCategory === category.id
                        ? 'bg-[#d4a373] text-white'
                        : 'text-[#e9e2d3] hover:bg-[#465446]'
                    }`}
                  >
                    {category.name}
                  </Link>
                )}
              </div>
            ))}
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 pl-72">
          <div className="max-w-6xl mx-auto px-6">
            {/* Gallery Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
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
                    <span className="text-[#d4a373] text-sm">{
                      birdSubcategories.find(sub => sub.id === item.category)?.name ||
                      categories.find(cat => cat.id === item.category)?.name
                    }</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Empty State */}
            {filteredItems.length === 0 && (
              <div className="text-center py-12">
                <p className="text-[#2c392c]/80">
                  No images available in this category yet.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
} 