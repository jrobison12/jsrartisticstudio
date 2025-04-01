import Image from "next/image";
import Link from "next/link";

// Define categories with valid image paths
const categories = [
  { id: 'birds-blooms', name: 'Birds and Blooms', thumbnail: '/images/category-thumbnails/birds.jpg' },
  { id: 'landscapes', name: 'Landscapes', thumbnail: '/images/category-thumbnails/landscape.jpg' }
];

// Configure static generation
export const dynamic = 'force-static';

export default function Gallery() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/gallery/${category.id}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white"
        >
          <Image
            src={category.thumbnail}
            alt={category.name}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            priority={category.id === 'birds-blooms'}
            unoptimized
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