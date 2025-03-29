'use client';

import Image from "next/image";

export default function ShowcasePage() {
  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-4xl font-serif text-[#2c392c] mb-8">Showcase Spotlight</h1>
        
        <div className="prose prose-lg max-w-none text-[#2c392c]">
          <p className="text-lg mb-6">
            Welcome to our Showcase Spotlight, where we feature special collections, 
            award-winning pieces, and highlighted works from our portfolio.
          </p>
          
          {/* Placeholder for showcase content */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
            <div className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white">
              <Image
                src="/images/landscape.jpg"
                alt="Featured landscape photograph"
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#2c392c]/60 flex flex-col items-center justify-center 
                            opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-[#e9e2d3] text-xl font-serif mb-2">Featured Work</h3>
                <span className="text-[#d4a373] text-sm">Coming Soon</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 