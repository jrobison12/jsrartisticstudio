import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import GalleryGrid from '@/components/GalleryGrid';
import { getImages } from '@/lib/gallery';

export const dynamic = 'force-static';
export const revalidate = 3600; // Revalidate every hour

interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
}

const categoryTitles: { [key: string]: string } = {
  'birds-blooms': 'Birds & Blooms',
  'landscapes': 'Landscapes',
  'all': 'All Artwork'
};

export async function generateStaticParams() {
  return [
    { category: 'birds-blooms' },
    { category: 'landscapes' },
    { category: 'all' }
  ];
}

export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const title = categoryTitles[params.category] || 'Gallery';
  return {
    title: `${title} | JSR Artistic Studio`,
    description: `Browse our collection of ${title.toLowerCase()} artwork.`
  };
}

export default async function CategoryGallery({ params }: { params: { category: string } }) {
  const category = params.category;
  
  if (!categoryTitles[category]) {
    notFound();
  }

  const images = await getImages(category);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8 text-center">{categoryTitles[category]}</h1>
      {images.length > 0 ? (
        <GalleryGrid images={images} />
      ) : (
        <p className="text-center text-gray-600">No images found in this category.</p>
      )}
    </div>
  );
} 