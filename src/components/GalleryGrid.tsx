import Image from 'next/image';
import Link from 'next/link';

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  featured?: boolean;
}

interface GalleryGridProps {
  images: GalleryImage[];
}

export default function GalleryGrid({ images }: GalleryGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((image) => (
        <Link
          key={image.id}
          href={`/gallery/${image.category}/${image.id}`}
          className="group relative aspect-square overflow-hidden rounded-lg"
        >
          <Image
            src={image.url}
            alt={image.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-110"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
          <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="text-white text-center p-4">
              <h3 className="text-xl font-semibold mb-2">{image.title}</h3>
              {image.description && (
                <p className="text-sm">{image.description}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
} 