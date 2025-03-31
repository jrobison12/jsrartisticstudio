import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { writeFile, mkdir } from 'fs/promises';
import { join } from 'path';
import sharp from 'sharp';

export async function POST(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token');
    if (authToken?.value !== process.env.ADMIN_TOKEN) {
      console.error('Unauthorized upload attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const formData = await request.formData();
    const file = formData.get('file') as File;
    const category = formData.get('category') as string;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json({ error: 'Invalid file type' }, { status: 400 });
    }

    // Convert to buffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Process image with sharp
    const optimizedImage = await sharp(buffer)
      .resize(1920, 1080, { fit: 'inside', withoutEnlargement: true })
      .webp({ quality: 80 })
      .toBuffer();

    // Generate unique filename
    const timestamp = Date.now();
    const filename = `${timestamp}-${file.name.replace(/\.[^/.]+$/, '')}.webp`;
    
    // Ensure the category directory exists
    const publicDir = join(process.cwd(), 'public', 'images');
    const categoryDir = join(publicDir, category);
    
    try {
      // Create base images directory if it doesn't exist
      await mkdir(publicDir, { recursive: true });
      // Create category directory if it doesn't exist
      await mkdir(categoryDir, { recursive: true });
    } catch (err) {
      console.error('Failed to create directories:', err);
      return NextResponse.json(
        { error: 'Failed to create upload directory' },
        { status: 500 }
      );
    }

    // Save to public directory
    try {
      await writeFile(join(categoryDir, filename), optimizedImage);
    } catch (err) {
      console.error('Failed to write file:', err);
      return NextResponse.json(
        { error: 'Failed to save image' },
        { status: 500 }
      );
    }

    // Return the path relative to public directory
    const imagePath = `/images/${category}/${filename}`;
    
    return NextResponse.json({ 
      success: true, 
      path: imagePath,
      message: 'Image uploaded successfully'
    });
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Failed to upload image' },
      { status: 500 }
    );
  }
} 