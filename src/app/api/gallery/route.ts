import { NextResponse } from 'next/server';
import { readdir, readFile, stat } from 'fs/promises';
import { join } from 'path';

interface ImageMetadata {
  title: string;
  alt: string;
  description?: string;
}

interface ImageDetails {
  [key: string]: ImageMetadata;
}

async function getImagesFromCategory(categoryPath: string, categoryName: string) {
  try {
    // Get all files in the category directory
    const files = await readdir(categoryPath);
    
    // Filter for image files and log what we find
    const imageFiles = files.filter(file => {
      const isImage = /\.(webp|jpg|jpeg|png)$/i.test(file);
      if (isImage) {
        console.log(`Found image in ${categoryName}:`, file);
      }
      return isImage;
    });

    if (imageFiles.length === 0) {
      console.log(`No images found in category: ${categoryName}`);
      return [];
    }

    // Try to load metadata
    let metadata: ImageDetails = {};
    try {
      const metadataPath = join(categoryPath, 'metadata.json');
      const data = await readFile(metadataPath, 'utf-8');
      metadata = JSON.parse(data);
      console.log(`Loaded metadata for ${categoryName}:`, metadata);
    } catch (err) {
      console.log('No metadata file found for category:', categoryName);
    }

    // Map files to image objects with metadata
    const images = imageFiles.map(file => {
      // Extract ID from filename, handling both timestamp-based and regular filenames
      const id = file.includes('-') ? file.split('-')[0] : file.replace(/\.(webp|jpg|jpeg|png)$/i, '');
      
      // Create default title from filename
      const defaultTitle = file.includes('-') 
        ? file.split('-').slice(1).join('-').replace(/\.(webp|jpg|jpeg|png)$/i, '')
        : file.replace(/\.(webp|jpg|jpeg|png)$/i, '');
      
      const imageData = {
        id,
        title: metadata[id]?.title || defaultTitle,
        category: categoryName,
        image: `/images/${categoryName}/${file}`,
        alt: metadata[id]?.alt || defaultTitle,
        ...(metadata[id]?.description && { description: metadata[id].description })
      };

      console.log(`Processed image in ${categoryName}:`, imageData);
      return imageData;
    });

    return images;
  } catch (err) {
    console.error(`Error processing category ${categoryName}:`, err);
    return [];
  }
}

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get('category');

    if (!category) {
      return NextResponse.json({ error: 'Category is required' }, { status: 400 });
    }

    const baseDir = join(process.cwd(), 'public', 'images');
    console.log('Base directory:', baseDir);

    // Handle 'all' category specially
    if (category === 'all') {
      try {
        const items = await readdir(baseDir);
        console.log('Found items in base directory:', items);
        const allImages = [];

        // Process each directory
        for (const item of items) {
          const itemPath = join(baseDir, item);
          console.log('Processing path:', itemPath);
          try {
            const stats = await stat(itemPath);
            if (stats.isDirectory()) {
              console.log(`${itemPath} is a directory, processing...`);
              const images = await getImagesFromCategory(itemPath, item);
              console.log(`Found ${images.length} images in ${item}`);
              allImages.push(...images);
            } else {
              console.log(`${itemPath} is not a directory, skipping...`);
            }
          } catch (err) {
            console.error(`Error processing path ${itemPath}:`, err);
          }
        }

        console.log('Total images found:', allImages.length);
        
        // Sort images by ID (timestamp) to show newest first
        allImages.sort((a, b) => b.id.localeCompare(a.id));

        return NextResponse.json({ images: allImages });
      } catch (err) {
        console.error('Error processing all categories:', err);
        return NextResponse.json({ images: [] });
      }
    }

    // Handle specific category
    const categoryDir = join(baseDir, category);
    console.log('Processing specific category:', categoryDir);
    const images = await getImagesFromCategory(categoryDir, category);
    console.log(`Found ${images.length} images in ${category}`);
    
    // Sort images by ID (timestamp) to show newest first
    images.sort((a, b) => b.id.localeCompare(a.id));

    return NextResponse.json({ images });
  } catch (error) {
    console.error('Gallery fetch error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch gallery images' },
      { status: 500 }
    );
  }
} 