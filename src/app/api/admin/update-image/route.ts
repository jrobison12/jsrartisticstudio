import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

interface ImageMetadata {
  title: string;
  alt: string;
  description?: string;
}

interface ImageDetails {
  [key: string]: ImageMetadata;
}

export async function PUT(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token');
    if (authToken?.value !== process.env.ADMIN_TOKEN) {
      console.error('Unauthorized update attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { categoryId, imageId, title, alt, description } = await request.json();

    if (!categoryId || !imageId) {
      return NextResponse.json(
        { error: 'Category ID and Image ID are required' },
        { status: 400 }
      );
    }

    // Path to the metadata file for this category
    const metadataPath = join(process.cwd(), 'public', 'images', categoryId, 'metadata.json');

    // Load existing metadata or create new
    let metadata: ImageDetails = {};
    try {
      const data = await readFile(metadataPath, 'utf-8');
      metadata = JSON.parse(data);
    } catch (err) {
      // If file doesn't exist, we'll create it
      console.log('Creating new metadata file');
    }

    // Update metadata
    metadata[imageId] = {
      title,
      alt,
      ...(description && { description })
    };

    // Save updated metadata
    await writeFile(metadataPath, JSON.stringify(metadata, null, 2));

    return NextResponse.json({
      success: true,
      message: 'Image details updated successfully'
    });
  } catch (error) {
    console.error('Update error:', error);
    return NextResponse.json(
      { error: 'Failed to update image details' },
      { status: 500 }
    );
  }
} 