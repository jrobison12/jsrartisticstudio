import { NextRequest, NextResponse } from 'next/server';
import { readdir, readFile, stat } from 'fs/promises';
import path from 'path';

// Force dynamic API route
export const dynamic = 'force-dynamic';

// Skip API calls during build
const isBuildTime = process.env.NEXT_PHASE === 'build';

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

// Mock data for build time
const mockImages = [
  {
    id: 'placeholder',
    url: '/images/placeholders/nature.jpg',
    title: 'Nature',
    category: 'landscapes',
    featured: true,
    description: 'A beautiful nature scene'
  }
];

// Helper function to get images from a category directory
async function getImagesFromCategory(category: string): Promise<ImageDetails[]> {
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

export async function GET(request: NextRequest) {
  try {
    const category = request.nextUrl.searchParams.get('category') || 'all';

    if (isBuildTime) {
      return NextResponse.json(mockImages);
    }

    if (category === 'all') {
      const categories = ['birds-blooms', 'landscapes', 'wildlife'];
      const allImages = await Promise.all(
        categories.map(cat => getImagesFromCategory(cat))
      );
      return NextResponse.json(allImages.flat());
    }

    const images = await getImagesFromCategory(category);
    return NextResponse.json(images);
  } catch (error) {
    console.error('Error in gallery API:', error);
    return NextResponse.json({ error: 'Failed to fetch images' }, { status: 500 });
  }
} 