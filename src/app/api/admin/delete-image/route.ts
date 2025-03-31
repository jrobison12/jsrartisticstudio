import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { unlink, readdir } from 'fs/promises';
import { join } from 'path';

export async function DELETE(request: Request) {
  try {
    // Verify admin authentication
    const cookieStore = await cookies();
    const authToken = cookieStore.get('auth_token');
    if (authToken?.value !== process.env.ADMIN_TOKEN) {
      console.error('Unauthorized deletion attempt');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { categoryId, imageId } = await request.json();

    if (!categoryId || !imageId) {
      return NextResponse.json(
        { error: 'Category ID and Image ID are required' },
        { status: 400 }
      );
    }

    // Find the image file
    const publicDir = join(process.cwd(), 'public', 'images', categoryId);
    const files = await readdir(publicDir);
    const imageFile = files.find((file: string) => file.startsWith(imageId));

    if (!imageFile) {
      return NextResponse.json(
        { error: 'Image not found' },
        { status: 404 }
      );
    }

    // Delete the file
    await unlink(join(publicDir, imageFile));

    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully'
    });
  } catch (error) {
    console.error('Delete error:', error);
    return NextResponse.json(
      { error: 'Failed to delete image' },
      { status: 500 }
    );
  }
} 