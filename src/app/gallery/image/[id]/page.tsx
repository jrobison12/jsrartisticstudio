import { notFound } from 'next/navigation';
import Image from 'next/image';
import { readFile, readdir, stat } from 'fs/promises';
import { join } from 'path';
import AddToCartForm from '@/components/gallery/AddToCartForm';

interface ImageMetadata {
  title: string;
  alt: string;
  description?: string;
}

interface ImageDetails {
  [key: string]: ImageMetadata;
}

interface PrintSize {
  size: string;
  price: number;
  dimensions: string;
}

const PRINT_SIZES: PrintSize[] = [
  { size: 'small', price: 25.00, dimensions: '8x10"' },
  { size: 'medium', price: 45.00, dimensions: '11x14"' },
  { size: 'large', price: 75.00, dimensions: '16x20"' },
  { size: 'xlarge', price: 125.00, dimensions: '20x24"' }
];

async function getImageDetails(imageId: string) {
  // Search through all category directories to find the image
  const baseDir = join(process.cwd(), 'public', 'images');
  const items = await readdir(baseDir);

  for (const item of items) {
    const itemPath = join(baseDir, item);
    
    // Check if the path is a directory
    try {
      const stats = await stat(itemPath);
      if (!stats.isDirectory()) {
        continue; // Skip if not a directory
      }

      const files = await readdir(itemPath);
      
      // Find the image file
      const imageFile = files.find(file => file.startsWith(imageId));
      if (imageFile) {
        // Try to load metadata
        let metadata: ImageDetails = {};
        try {
          const metadataPath = join(itemPath, 'metadata.json');
          const data = await readFile(metadataPath, 'utf-8');
          metadata = JSON.parse(data);
        } catch (err) {
          console.log('No metadata found for category:', item);
        }

        const defaultTitle = imageFile.split('-').slice(1).join('-').replace(/\.(webp|jpg|jpeg|png)$/i, '');
        
        return {
          id: imageId,
          title: metadata[imageId]?.title || defaultTitle,
          category: item,
          image: `/images/${item}/${imageFile}`,
          alt: metadata[imageId]?.alt || defaultTitle,
          description: metadata[imageId]?.description || '',
          sizes: PRINT_SIZES
        };
      }
    } catch (err) {
      console.log('Error processing path:', itemPath, err);
      continue; // Skip this item if there's an error
    }
  }
  return null;
}

export default async function ImagePage({ params }: { params: { id: string } }) {
  const imageDetails = await getImageDetails(params.id);

  if (!imageDetails) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea] py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Image Section */}
          <div className="relative aspect-[4/3] rounded-lg overflow-hidden shadow-lg">
            <Image
              src={imageDetails.image}
              alt={imageDetails.alt}
              fill
              className="object-cover"
              priority
            />
          </div>

          {/* Details Section */}
          <div className="space-y-8">
            <div>
              <h1 className="text-4xl font-serif text-[#2c392c] mb-4">
                {imageDetails.title}
              </h1>
              <p className="text-[#2c392c]/80 text-lg">
                {imageDetails.description || 'No description available.'}
              </p>
            </div>

            {/* Print Options */}
            <div>
              <h2 className="text-2xl font-serif text-[#2c392c] mb-4">
                Available Print Sizes
              </h2>
              <AddToCartForm 
                imageId={imageDetails.id}
                title={imageDetails.title}
                sizes={imageDetails.sizes}
                image={imageDetails.image}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 