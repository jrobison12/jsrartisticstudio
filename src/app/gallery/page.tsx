import Image from "next/image";
import Link from "next/link";

// Define categories with valid image paths
const categories = [
  { id: 'artwork', name: 'Artwork', thumbnail: '/images/artwork/thumb.jpg' },
  { id: 'birds-blooms', name: 'Birds and Blooms', thumbnail: '/images/birds-blooms/thumb.jpg' },
  { id: 'birds-interest', name: 'Birds Of Interest', thumbnail: '/images/birds-interest/thumb.jpg' },
  { id: 'birds-of-prey', name: 'Owls, Eagles and Birds of Prey', thumbnail: '/images/birds-of-prey/thumb.jpg' },
  { id: 'ducks', name: 'Ducks In A Row', thumbnail: '/images/ducks/thumb.jpg' },
  { id: 'butterflies', name: 'Butterflies and Moths', thumbnail: '/images/butterflies/thumb.jpg' },
  { id: 'landscapes', name: 'Landscapes', thumbnail: '/images/landscapes/thumb.jpg' },
  { id: 'stained-glass', name: 'Stained Glass Artistry', thumbnail: '/images/stained-glass/thumb.jpg' },
  { id: 'weathered-wood', name: 'Weathered Wood and Water', thumbnail: '/images/weathered-wood/thumb.jpg' },
  { id: 'wild-wonderful', name: 'Wild and Wonderful', thumbnail: '/images/wild-wonderful/thumb.jpg' }
];

// Generate static params for each category
export async function generateStaticParams() {
  return categories.map((category) => ({
    category: category.id,
  }));
}

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
            priority={category.id === 'artwork'}
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