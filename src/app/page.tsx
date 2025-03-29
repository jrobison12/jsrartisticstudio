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
    <div className="min-h-screen">
      {/* Event Announcement */}
      {shouldShowAnnouncement && (
        <section className="bg-[#2c392c] py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-[#d4a373] rounded-lg p-4 md:p-6 shadow-lg">
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <h2 className="text-xl md:text-2xl font-serif text-[#2c392c] mb-2">
                    Join Me at the Elk Expo!
                  </h2>
                  <p className="text-[#2c392c]/80 text-base md:text-lg mb-3">
                    I&apos;m excited to announce that I&apos;ll be exhibiting at the Elk Expo in Benezette, Pennsylvania.
                  </p>
                  <div className="flex flex-wrap gap-4 text-[#2c392c]/90">
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
                      </svg>
                      <span>July 26-27, 2025</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1 1 15 0Z" />
                      </svg>
                      <span>Benezette, Pennsylvania</span>
                    </div>
                  </div>
                </div>
                <Link 
                  href="https://elkexpo.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-[#2c392c] text-[#e9e2d3] rounded-full 
                           hover:bg-[#465446] transition-colors flex items-center gap-2 text-base md:text-lg"
                >
                  Learn More
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-4 h-4 md:w-5 md:h-5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3" />
                  </svg>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-[#2c392c]/30 z-10" />
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
            </div>
          ))}
        </div>
        <div className="relative z-20 text-center px-4 max-w-4xl mx-auto">
          <div className="bg-black/20 backdrop-blur-sm px-16 py-12 rounded-full inline-block">
            <h1 className="text-5xl md:text-7xl font-serif mb-6 text-white drop-shadow-lg">
              Jeanette S. Robison
            </h1>
            <p className="text-2xl md:text-3xl text-white mb-12 drop-shadow-lg">
              Wildlife Art & Nature Photography
            </p>
            <Link
              href="/gallery"
              className="inline-block bg-[#d4a373] text-white px-8 py-3 rounded-full 
                       hover:bg-[#e6c29b] transition-colors text-lg font-medium
                       shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all"
            >
              View Gallery
            </Link>
          </div>
        </div>

        {/* Navigation Dots */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
          {collections.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-2 h-2 rounded-full transition-all ${
                index === currentImageIndex 
                  ? 'bg-white w-4' 
                  : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16 px-4 bg-[#f4f1ea]">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-serif text-center mb-12 text-[#2c392c]">Featured Collections</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {collections.map((category) => (
              <Link 
                key={category.title} 
                href={category.href}
                className="group relative overflow-hidden rounded-lg aspect-[4/3] shadow-lg cursor-pointer"
              >
                <Image
                  src={category.image}
                  alt={category.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  quality={85}
                />
                <div className="absolute inset-0 bg-[#2c392c]/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <h3 className="text-[#e9e2d3] text-2xl font-serif drop-shadow-lg">{category.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="bg-[#2c392c] py-16 px-4">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-serif mb-4 text-[#e9e2d3]">Stay Updated</h2>
          <p className="text-[#e9e2d3]/90 mb-8">Join our email list to receive updates about new artwork and exhibitions.</p>
          <form className="flex gap-4 max-w-md mx-auto">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-full border border-[#465446] bg-[#f4f1ea] focus:outline-none focus:ring-2 focus:ring-[#d4a373]"
            />
            <button
              type="submit"
              className="bg-[#d4a373] text-white px-6 py-2 rounded-full hover:bg-[#e6c29b] transition-colors"
            >
              Subscribe
            </button>
          </form>
        </div>
      </section>
    </div>
  );
}
