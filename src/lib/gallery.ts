import { readdir, readFile, stat } from 'fs/promises';
import path from 'path';

export interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description?: string;
  category: string;
  featured?: boolean;
}

interface ImageMetadata {
  [key: string]: {
    title: string;
    alt: string;
    description?: string;
  };
}

interface ImageDetails {
  id: string;
  title: string;
  category: string;
  url: string;
  alt: string;
  description?: string;
}

// Skip API calls during build
const isBuildTime = process.env.NEXT_PHASE === 'build';

// Mock data for build time
const mockImages: GalleryImage[] = [
  {
    id: 'placeholder',
    url: '/images/placeholders/nature.jpg',
    title: 'Nature',
    category: 'landscapes',
    featured: true
  }
];

export async function getImages(category: string): Promise<GalleryImage[]> {
  if (isBuildTime) {
    return mockImages;
  }

  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const url = new URL('/api/gallery', baseUrl);
    url.searchParams.set('category', category);

    const response = await fetch(url.toString());
    if (!response.ok) {
      console.error(`Failed to fetch images for category ${category}:`, response.statusText);
      return [];
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching images for category ${category}:`, error);
    return [];
  }
}

// Helper function to get images from a category directory
export async function getImagesFromCategory(category: string): Promise<ImageDetails[]> {
  if (isBuildTime) {
    return mockImages.map(img => ({
      id: img.id,
      title: img.title,
      category: img.category,
      url: img.url,
      alt: img.title,
      description: img.description
    }));
  }

  const imagesDir = path.join(process.cwd(), 'public', 'images', category);
  const images: ImageDetails[] = [];

  try {
    const stats = await stat(imagesDir);
    if (!stats.isDirectory()) {
      console.warn(`Path is not a directory: ${imagesDir}`);
      return images;
    }

    const files = await readdir(imagesDir);
    const metadataPath = path.join(imagesDir, 'metadata.json');
    let metadata: ImageMetadata = {};

    try {
      const metadataContent = await readFile(metadataPath, 'utf-8');
      metadata = JSON.parse(metadataContent);
    } catch (error) {
      console.warn(`No metadata file found for category: ${category}`);
    }

    for (const file of files) {
      if (!file.match(/\.(jpg|jpeg|png|gif|webp)$/i)) continue;

      const filePath = path.join(imagesDir, file);
      const fileStats = await stat(filePath);
      if (!fileStats.isFile()) continue;

      const id = file.replace(/\.[^/.]+$/, '');
      const imageMetadata = metadata[id] || { title: id, alt: id };
      
      images.push({
        id,
        title: imageMetadata.title,
        category,
        url: `/images/${category}/${file}`,
        alt: imageMetadata.alt,
        description: imageMetadata.description
      });
    }
  } catch (error) {
    console.error(`Error processing category ${category}:`, error);
  }

  return images;
} 