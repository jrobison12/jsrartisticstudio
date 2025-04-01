import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  id: string;
  title: string;
  category: string;
  image: string;
  alt: string;
}

const categoryTitles: { [key: string]: string } = {
  'birds-blooms': 'Birds and Blooms',
  'landscapes': 'Landscapes'
};

// Generate static params for each category
export async function generateStaticParams() {
  return Object.keys(categoryTitles).map((category) => ({
    category,
  }));
}

// Get images for a category
async function getImages(category: string): Promise<GalleryImage[]> {
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/gallery?category=${category}`, {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
}

export default async function CategoryGallery({
  params,
}: {
  params: { category: string };
}) {
  const category = params.category;
  const images = await getImages(category);
  const title = categoryTitles[category] || 'Gallery';

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
            {title}
          </h1>
        </div>

        {images.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {images.map((item) => (
              <Link
                key={item.id}
                href={`/gallery/image/${item.id}`}
                className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white"
              >
                <Image
                  src={item.image}
                  alt={item.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-[#2c392c]/60 flex items-center justify-center
                              opacity-0 group-hover:opacity-100 transition-opacity">
                  <h2 className="text-[#e9e2d3] text-xl font-serif text-center px-4">
                    {item.title}
                  </h2>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-[#2c392c]/80">No images found in this category.</p>
          </div>
        )}
      </div>
    </div>
  );
} 