'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function GalleryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const pathname = usePathname();
  const currentCategory = pathname.split('/')[2] || '';

  // Close sidebar when route changes on mobile
  useEffect(() => {
    setIsSidebarOpen(false);
  }, [pathname]);

  const birdSubcategories = [
    { id: 'birds-blooms', name: 'Birds and Blooms' },
    { id: 'birds-interest', name: 'Birds Of Interest' },
    { id: 'ducks', name: 'Ducks In A Row' },
    { id: 'birds-of-prey', name: 'Owls, Eagles and Birds of prey' }
  ];

  const categories = [
    { id: 'artwork', name: 'Artwork' },
    { id: 'birds', name: 'Birds' },
    { id: 'butterflies', name: 'Butterflies and Moths' },
    { id: 'landscapes', name: 'Landscapes' },
    { id: 'stained-glass', name: 'Stained Glass Artistry' },
    { id: 'weathered-wood', name: 'Weathered Wood and Water' },
    { id: 'wild-wonderful', name: 'Wild and Wonderful' }
  ];

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      {/* Mobile Category Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        className="md:hidden fixed bottom-6 right-6 z-50 bg-[#d4a373] text-white p-4 rounded-full shadow-lg hover:bg-[#e6c29b] transition-colors"
        aria-label="Toggle categories"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2}
          stroke="currentColor"
          className="w-6 h-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
          />
        </svg>
      </button>

      <div className="relative flex">
        {/* Category Navigation Sidebar */}
        <aside 
          className={`fixed md:static inset-y-0 left-0 w-72 bg-[#2c392c] shadow-lg z-40 transition-transform duration-300 md:translate-x-0
                     ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                     ${isDropdownOpen ? 'z-50' : 'z-40'}`}
        >
          <div className="h-full overflow-y-auto scroll-smooth pt-20 md:pt-0
                        [&::-webkit-scrollbar]:w-2
                        [&::-webkit-scrollbar-track]:bg-[#2c392c]
                        [&::-webkit-scrollbar-thumb]:bg-[#465446]
                        [&::-webkit-scrollbar-thumb]:rounded-full
                        [&::-webkit-scrollbar-thumb]:border-2
                        [&::-webkit-scrollbar-thumb]:border-[#2c392c]
                        hover:[&::-webkit-scrollbar-thumb]:bg-[#d4a373]">
            {/* Mobile Close Button */}
            <button
              onClick={() => setIsSidebarOpen(false)}
              className="md:hidden absolute top-4 right-4 text-[#e9e2d3] hover:text-[#d4a373] p-2"
              aria-label="Close categories"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={2}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>

            {/* All Categories button */}
            <Link
              href="/gallery"
              className={`block w-full text-left px-6 py-3 transition-colors border-b-2 border-[#465446]
                       text-[#e9e2d3] hover:bg-[#465446] font-medium
                       ${!currentCategory ? 'bg-[#d4a373] text-white' : ''}`}
              onClick={() => setIsSidebarOpen(false)}
            >
              All Categories
            </Link>

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
                               ${currentCategory === 'birds' || birdSubcategories.some(sub => sub.id === currentCategory)
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
                      <div className="md:fixed md:left-72 md:w-72 bg-[#2c392c] shadow-lg border-l border-[#465446]">
                        {birdSubcategories.map(subcategory => (
                          <Link
                            key={subcategory.id}
                            href={`/gallery/${subcategory.id}`}
                            onClick={() => {
                              setIsDropdownOpen(false);
                              setIsSidebarOpen(false);
                            }}
                            className={`block w-full text-left px-6 py-3 transition-colors border-b border-[#465446]
                                     text-[#e9e2d3] hover:bg-[#465446]
                                     ${currentCategory === subcategory.id ? 'bg-[#d4a373] text-white' : ''}`}
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
                    className={`block w-full text-left px-6 py-3 transition-colors border-b border-[#465446]
                             text-[#e9e2d3] hover:bg-[#465446]
                             ${currentCategory === category.id ? 'bg-[#d4a373] text-white' : ''}`}
                    onClick={() => setIsSidebarOpen(false)}
                  >
                    {category.name}
                  </Link>
                )}
              </div>
            ))}

            {/* View Full Gallery button */}
            <div className="sticky bottom-0 bg-[#2c392c] pt-4 pb-4 px-4 mt-6 border-t-2 border-[#465446] shadow-lg">
              <Link
                href="/gallery/all"
                className="block w-full text-left px-6 py-4 transition-all
                         text-[#e9e2d3] hover:bg-[#d4a373] font-medium
                         flex items-center justify-between
                         bg-[#465446]/50 hover:text-white
                         rounded-lg shadow-md"
                onClick={() => setIsSidebarOpen(false)}
              >
                <span className="text-lg">View Full Gallery</span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-5 h-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 md:pl-72">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 py-8">
            {children}
          </div>
        </main>

        {/* Overlay for mobile when sidebar is open */}
        {isSidebarOpen && (
          <div 
            className="fixed inset-0 bg-black/50 z-30 md:hidden"
            onClick={() => setIsSidebarOpen(false)}
          />
        )}
      </div>
    </div>
  );
} 