'use client';

import Image from "next/image";

export default function NaturalReflections() {
  // Sample written works - replace with actual content
  const writings = [
    {
      id: 1,
      title: "Dawn Chorus",
      excerpt: "The morning symphony of birdsong heralds the arrival of spring...",
      date: "Spring 2025",
      image: "/images/dawn-chorus.jpg",
      category: "Bird Observations"
    },
    {
      id: 2,
      title: "Seasons of Change",
      excerpt: "As autumn paints the landscape in fiery hues...",
      date: "Winter 2025",
      image: "/images/seasons.jpg",
      category: "Seasonal Reflections"
    },
    // Add more writings as needed
  ];

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-serif text-[#2c392c] mb-4">
            Natural Reflections
          </h1>
          <p className="text-lg text-[#2c392c]/80 max-w-2xl mx-auto">
            A collection of written works exploring the beauty, wonder, and wisdom found in nature&apos;s embrace.
            Join me on a journey through personal observations and reflections on wildlife and the great outdoors.
          </p>
        </header>

        {/* Writing Grid */}
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {writings.map((writing) => (
            <article 
              key={writing.id}
              className="bg-white rounded-lg shadow-lg overflow-hidden transition-transform hover:-translate-y-1"
            >
              <div className="relative h-48">
                <Image
                  src={writing.image}
                  alt={writing.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-[#d4a373]">{writing.category}</span>
                  <span className="text-sm text-[#2c392c]/60">{writing.date}</span>
                </div>
                <h2 className="text-xl font-serif text-[#2c392c] mb-3">{writing.title}</h2>
                <p className="text-[#2c392c]/80 mb-4 line-clamp-3">
                  {writing.excerpt}
                </p>
                <button className="text-[#d4a373] hover:text-[#e6c29b] transition-colors">
                  Read More →
                </button>
              </div>
            </article>
          ))}
        </div>

        {/* Categories Section */}
        <section className="mt-16">
          <h2 className="text-2xl font-serif text-[#2c392c] mb-6">Writing Categories</h2>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {['Wildlife Stories', 'Bird Observations', 'Nature Essays', 'Seasonal Reflections'].map((category) => (
              <button
                key={category}
                className="px-6 py-4 bg-white rounded-lg shadow-md text-[#2c392c] hover:bg-[#d4a373] hover:text-white transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </section>

        {/* Newsletter Section */}
        <section className="mt-16 bg-[#2c392c] rounded-lg p-8 text-center">
          <h2 className="text-2xl font-serif text-[#e9e2d3] mb-4">
            Stay Connected with Nature
          </h2>
          <p className="text-[#e9e2d3]/90 mb-6 max-w-2xl mx-auto">
            Subscribe to receive notifications when new reflections are posted and get exclusive nature writing directly in your inbox.
          </p>
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
        </section>
      </div>
    </div>
  );
} 