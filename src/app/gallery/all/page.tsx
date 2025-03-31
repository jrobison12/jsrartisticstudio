import Image from "next/image";
import Link from "next/link";
import { readdir, access, stat, readFile } from 'fs/promises';
import { join } from 'path';

interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  title?: string;
  description?: string;
}

interface ImageMetadata {
  title: string;
  alt: string;
  description?: string;
}

interface CategoryMetadata {
  [key: string]: ImageMetadata;
}

async function getAllGalleryImages(): Promise<GalleryImage[]> {
  const publicDir = join(process.cwd(), 'public', 'images');
  const allImages: GalleryImage[] = [];
  
  try {
    // Check if the images directory exists
    await access(publicDir);
    
    // Get all categories
    const categories = await readdir(publicDir);
    
    // Process each category
    for (const category of categories) {
      const categoryPath = join(publicDir, category);
      
      try {
        // Check if it's a directory
        const stats = await stat(categoryPath);
        if (!stats.isDirectory()) {
          console.log(`Skipping ${category}: not a directory`);
          continue;
        }

        // Try to read metadata.json if it exists
        let metadata: CategoryMetadata = {};
        try {
          const metadataPath = join(categoryPath, 'metadata.json');
          const metadataContent = await readFile(metadataPath, 'utf-8');
          metadata = JSON.parse(metadataContent);
        } catch (error) {
          console.log(`No metadata found for category ${category}`);
        }

        // Get all files in the category directory
        const files = await readdir(categoryPath);
        
        // Process each file in the category
        for (const file of files) {
          if (file.endsWith('.webp')) {
            // Extract the timestamp ID from the filename
            const timestamp = file.split('-')[0];
            const imageMetadata = metadata[timestamp] || {};
            
            allImages.push({
              id: timestamp, // Use just the timestamp as the ID for linking
              src: `/images/${category}/${file}`,
              alt: imageMetadata.alt || file.replace(/\.[^/.]+$/, '').replace(/-/g, ' '),
              category,
              title: imageMetadata.title,
              description: imageMetadata.description
            });
          }
        }
      } catch (error: any) {
        // Skip if category directory doesn't exist or isn't accessible
        console.log(`Skipping category ${category}: ${error?.message || 'Unknown error'}`);
        continue;
      }
    }
  } catch (error: any) {
    // If the images directory doesn't exist, return empty array
    console.log('No images directory found:', error?.message || 'Unknown error');
  }
  
  return allImages;
}

export default async function FullGallery() {
  const allImages = await getAllGalleryImages();

  return (
    <div>
      <h1 className="text-3xl font-serif text-[#2c392c] mb-8">Full Gallery</h1>
      {allImages.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-[#2c392c] text-lg">No images found in the gallery yet.</p>
          <p className="text-[#2c392c]/80 mt-2">Please upload some images through the admin panel.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {allImages.map((image) => (
            <Link
              key={image.id}
              href={`/gallery/image/${image.id}`}
              className="block group relative aspect-[4/3] overflow-hidden rounded-lg shadow-lg bg-white"
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition-transform duration-300 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
              <div className="absolute inset-0 bg-[#2c392c]/60 flex flex-col items-center justify-center
                            opacity-0 group-hover:opacity-100 transition-opacity">
                <h3 className="text-[#e9e2d3] text-xl font-serif mb-2">{image.title || image.alt}</h3>
                <p className="text-[#e9e2d3] text-sm">Click to view details</p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
} 