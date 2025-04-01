interface GalleryImage {
  id: string;
  url: string;
  title: string;
  description: string;
  category: string;
  featured: boolean;
}

// Get images for a category
export async function getImages(category: string): Promise<GalleryImage[]> {
  try {
    // During build time, return empty array to allow static generation
    if (process.env.NEXT_PHASE === 'build') {
      return [];
    }

    // Determine base URL based on environment
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 
      (typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000');

    // Construct full URL
    const url = new URL(`/api/gallery`, baseUrl);
    url.searchParams.set('category', category);
    
    const response = await fetch(url.toString(), {
      next: { revalidate: 3600 } // Revalidate every hour
    });
    
    if (!response.ok) {
      console.error('Failed to fetch images:', response.status, response.statusText);
      return [];
    }

    const data = await response.json();
    return data.images || [];
  } catch (error) {
    console.error('Error fetching images:', error);
    return [];
  }
} 