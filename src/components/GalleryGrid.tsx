import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {images.map((item) => (
        <Link
          key={item.id}
          href={`/gallery/image/${item.id}`}
          className="group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white"
        >
          <Image
            src={item.url}
            alt={item.title}
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
  );
} 