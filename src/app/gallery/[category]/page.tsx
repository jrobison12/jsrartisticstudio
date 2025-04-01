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
  'all': 'All',
  'artwork': 'Artwork',
  'birds': 'Birds',
  'birds-blooms': 'Birds and Blooms',
  'birds-interest': 'Birds Of Interest',
  'birds-of-prey': 'Owls, Eagles and Birds of Prey',
  'butterflies': 'Butterflies and Moths',
  'ducks': 'Ducks In A Row',
  'elk-expo': 'Winner 2019 Elk Expo Patch Photo Contest',
  'landscapes': 'Landscapes',
  'nature-things': 'Nature of Things... Written Word and Nature Photo',
  'stained-glass': 'Stained Glass Artistry',
  'weathered-wood': 'Weathered Wood and Water',
  'wet-paint': 'Wet Paint... On The Easel... Work in Progress...',
  'wild-wonderful': 'Wild and Wonderful...'
};

// Generate static params for all categories
export async function generateStaticParams() {
  return Object.keys(categoryTitles).map((category) => ({
    category,
  }));
}

// Generate metadata for each category
export async function generateMetadata({ params }: { params: { category: string } }): Promise<Metadata> {
  const category = params.category;
  const title = categoryTitles[category] || 'Gallery';
  
  return {
    title: `${title} | JSR Artistic Studio`,
    description: `View our collection of ${title.toLowerCase()} artwork and photography.`,
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