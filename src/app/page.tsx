'use client';

import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const collections = [
    {
      title: "Landscapes",
      image: "/images/landscape.jpg",
      alt: "Scenic mountain landscape at sunset with dramatic clouds",
      href: "/gallery/landscapes"
    },
    {
      title: "Wildlife",
      image: "/images/wildlife.jpg",
      alt: "Majestic elk in natural mountain habitat",
      href: "/gallery/wildlife"
    },
    {
      title: "Birds & Blooms",
      image: "/images/birds-blooms.jpg",
      alt: "Hummingbird feeding on vibrant flowers",
      href: "/gallery/birds-blooms"
    },
    {
      title: "Butterflies & Moths",
      image: "/images/butterfly.jpg",
      alt: "Monarch butterfly with orange and black wings on flower",
      href: "/gallery/butterflies"
    },
    {
      title: "Weathered Wood",
      image: "/images/weathered-wood.jpg",
      alt: "Historic wooden watermill with water wheel",
      href: "/gallery/weathered-wood"
    },
    {
      title: "Stained Glass",
      image: "/images/stained-glass.jpg",
      alt: "Handcrafted stained glass art piece",
      href: "/gallery/stained-glass"
    }
  ];

  // State for tracking current image index
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  // Effect for cycling through images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prevIndex) => (prevIndex + 1) % collections.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, [collections.length]); // Added collections.length as dependency

  // Check if the announcement should be shown (until July 28th, 2025)
  const announcementEndDate = new Date('2025-07-28T23:59:59');
  const shouldShowAnnouncement = new Date() <= announcementEndDate;

  return (
    <div className="min-h-screen bg-[#f8f3e8]">
      {/* Vintage-style Header */}
      <div className="relative py-8 md:py-12 bg-[#2c392c] border-b-8 border-[#d4a373]">
        <div className="max-w-7xl mx-auto px-4">
          {/* Decorative Border */}
          <div className="absolute top-0 left-0 w-full h-4 bg-repeat-x"
               style={{
                 backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'20\' height=\'4\' viewBox=\'0 0 20 4\' fill=\'none\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0L10 4L20 0H0Z\' fill=\'%23d4a373\'/%3E%3C/svg%3E")',
               }} />
          
          <div className="text-center relative">
            {/* Vintage Ornament */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-6 text-[#d4a373] text-4xl">❦</div>
            
            <h1 className="font-serif text-4xl sm:text-6xl md:text-8xl text-[#e9e2d3] mb-4 tracking-wide"
                style={{ textShadow: '2px 2px 0 #2c392c, 4px 4px 0 #d4a373' }}>
              JSR ARTISTIC STUDIOS
            </h1>
            <div className="w-24 md:w-32 h-1 bg-[#d4a373] mx-auto mb-4 md:mb-6"></div>
            <p className="text-lg md:text-2xl text-[#e9e2d3] font-serif italic mb-6 md:mb-8 px-2">
              "Capturing Nature's Timeless Beauty"
            </p>
          </div>
        </div>
      </div>

      {/* Vintage-style Hero Section */}
      <section className="relative h-[60vh] md:h-[80vh] overflow-hidden border-b-8 border-[#d4a373]">
        {/* Image Slideshow */}
        <div className="absolute inset-0">
          {collections.map((collection, index) => (
            <div
              key={collection.title}
              className={`absolute inset-0 transition-opacity duration-1000 ${
                index === currentImageIndex ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Image
                src={collection.image}
                alt={collection.alt}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={90}
              />
              {/* Vintage Photo Overlay */}
              <div className="absolute inset-0 bg-[#2c392c]/20 mix-blend-multiply" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2c392c] via-transparent to-transparent opacity-70" />
            </div>
          ))}
        </div>

        {/* Vintage Frame Overlay */}
        <div className="absolute inset-4 md:inset-8 border-[16px] md:border-[24px] border-double border-[#d4a373]/20 pointer-events-none z-10" />
        
        {/* Content */}
        <div className="relative z-20 h-full flex items-center justify-center px-4">
          <div className="text-center p-4 md:px-4 md:py-12 w-full max-w-4xl mx-auto bg-[#2c392c]/40 backdrop-blur-sm border-4 border-double border-[#d4a373]">
            <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl text-[#e9e2d3] mb-4 md:mb-6"
                style={{ textShadow: '2px 2px 0 #2c392c, 4px 4px 0 #d4a373' }}>
              Nature's Gallery
            </h2>
            <p className="text-lg sm:text-xl md:text-2xl text-[#e9e2d3] font-serif italic mb-6 md:mb-8 px-2">
              A Collection of Pennsylvania's Finest Wildlife & Landscapes
            </p>
            <Link
              href="/gallery"
              className="inline-block px-6 md:px-8 py-2 md:py-3 bg-[#d4a373] text-[#e9e2d3] font-serif border-2 border-[#d4a373]
                       hover:bg-transparent hover:text-[#d4a373] transition-colors text-lg md:text-xl"
            >
              Explore the Collection
            </Link>
          </div>
        </div>

        {/* Vintage Navigation Dots */}
        <div className="absolute bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2 md:space-x-3">
          {collections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 md:w-3 md:h-3 rounded-none transition-all border border-[#d4a373] ${
                index === currentImageIndex 
                  ? 'bg-[#d4a373]' 
                  : 'bg-transparent hover:bg-[#d4a373]/50'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Event Announcement with Vintage Style */}
      {shouldShowAnnouncement && (
        <div className="bg-[#f8f3e8] py-8 md:py-12 relative">
          <div className="max-w-4xl mx-auto px-4">
            {/* Decorative Corner Elements */}
            <div className="absolute top-0 left-0 w-8 md:w-16 h-8 md:h-16 border-t-4 border-l-4 border-[#2c392c]" />
            <div className="absolute top-0 right-0 w-8 md:w-16 h-8 md:h-16 border-t-4 border-r-4 border-[#2c392c]" />
            <div className="absolute bottom-0 left-0 w-8 md:w-16 h-8 md:h-16 border-b-4 border-l-4 border-[#2c392c]" />
            <div className="absolute bottom-0 right-0 w-8 md:w-16 h-8 md:h-16 border-b-4 border-r-4 border-[#2c392c]" />
            
            <div className="relative bg-[#fff] p-4 md:p-8 border-4 border-double border-[#2c392c] shadow-[4px_4px_0_0_#d4a373] md:shadow-[8px_8px_0_0_#d4a373]">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#f8f3e8] px-3 md:px-6 py-1">
                <span className="text-[#2c392c] font-serif text-base md:text-xl tracking-wide uppercase flex items-center gap-2 md:gap-3">
                  <span className="text-[#d4a373] text-lg md:text-2xl">❦</span>
                  Special Announcement
                  <span className="text-[#d4a373] text-lg md:text-2xl">❦</span>
                </span>
              </div>
              <h2 className="text-2xl md:text-4xl font-serif text-[#2c392c] mb-4 md:mb-6 text-center"
                  style={{ textShadow: '1px 1px 0 #d4a373' }}>
                The Great Elk Exposition
              </h2>
              <p className="text-lg md:text-xl text-[#2c392c]/80 text-center mb-4 md:mb-6 font-serif italic">
                Join us for a grand exhibition of wildlife artistry
              </p>
              <div className="flex flex-col md:flex-row justify-center gap-3 md:gap-12 text-[#2c392c]/90 font-serif text-base md:text-lg">
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <span className="text-[#d4a373] text-xl md:text-2xl">❧</span>
                  <span>July 26-27, 1925</span>
                </div>
                <div className="flex items-center justify-center gap-2 md:gap-3">
                  <span className="text-[#d4a373] text-xl md:text-2xl">❧</span>
                  <span>Benezette, Pennsylvania</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Featured Collections with Vintage Frame */}
      <section className="py-12 md:py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="inline-block font-serif text-3xl md:text-4xl text-[#2c392c] relative px-12 md:px-16">
              <span className="absolute left-0 top-1/2 -translate-y-1/2 text-[#d4a373]">❦</span>
              Featured Collections
              <span className="absolute right-0 top-1/2 -translate-y-1/2 text-[#d4a373]">❦</span>
            </h2>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-8">
            {collections.map((category) => (
              <Link 
                key={category.title} 
                href={category.href}
                className="group relative block"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  {/* Vintage Frame Border */}
                  <div className="absolute inset-0 border-8 md:border-[12px] border-double border-[#2c392c] z-10"></div>
                  <Image
                    src={category.image}
                    alt={category.alt}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-[#2c392c]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-20">
                    <h3 className="text-[#e9e2d3] text-xl md:text-2xl font-serif">{category.title}</h3>
                  </div>
                </div>
                {/* Vintage Caption */}
                <div className="text-center mt-3 md:mt-4">
                  <h3 className="font-serif text-lg md:text-xl text-[#2c392c]">{category.title}</h3>
                  <div className="w-12 md:w-16 h-px bg-[#d4a373] mx-auto mt-2"></div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section with Vintage Style */}
      <section className="py-12 md:py-16 px-4 bg-[#2c392c]">
        <div className="max-w-2xl mx-auto">
          <div className="bg-[#f8f3e8] p-4 md:p-8 border-4 border-double border-[#d4a373]">
            <div className="text-center">
              <h2 className="font-serif text-2xl md:text-3xl text-[#2c392c] mb-4 md:mb-6">
                Subscribe to Our Chronicles
              </h2>
              <div className="w-20 md:w-24 h-px bg-[#d4a373] mx-auto mb-4 md:mb-6"></div>
              <p className="text-sm md:text-base text-[#2c392c]/80 mb-6 md:mb-8 font-serif">
                Receive periodic dispatches featuring our latest artistic endeavors and exhibition notices.
              </p>
              <form className="flex flex-col sm:flex-row gap-3 md:gap-4 max-w-md mx-auto">
                <input
                  type="email"
                  placeholder="Your Electronic Mail Address"
                  className="flex-1 px-3 md:px-4 py-2 bg-white border-2 border-[#2c392c] font-serif text-sm md:text-base
                           focus:outline-none focus:border-[#d4a373]"
                />
                <button
                  type="submit"
                  className="px-4 md:px-6 py-2 bg-[#2c392c] text-[#e9e2d3] font-serif border-2 border-[#2c392c]
                           hover:bg-[#d4a373] hover:border-[#d4a373] transition-colors text-sm md:text-base whitespace-nowrap"
                >
                  Subscribe
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
