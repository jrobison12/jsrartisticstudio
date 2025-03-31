import { useState } from 'react';
import Image from 'next/image';

interface ImageUploadFormProps {
  onSuccess?: (path: string) => void;
}

export default function ImageUploadForm({ onSuccess }: ImageUploadFormProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string>('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const categories = [
    { id: 'landscapes', name: 'Landscapes' },
    { id: 'artwork', name: 'Artwork' },
    { id: 'birds-blooms', name: 'Birds and Blooms' },
    { id: 'birds-interest', name: 'Birds Of Interest' },
    { id: 'birds-of-prey', name: 'Owls, Eagles and Birds of Prey' },
    { id: 'butterflies', name: 'Butterflies and Moths' },
    { id: 'ducks', name: 'Ducks In A Row' },
    { id: 'elk-expo', name: 'Winner 2019 Elk Expo' },
    { id: 'nature-things', name: 'Nature of Things' },
    { id: 'stained-glass', name: 'Stained Glass Artistry' },
    { id: 'weathered-wood', name: 'Weathered Wood and Water' },
    { id: 'wet-paint', name: 'Wet Paint' },
    { id: 'wild-wonderful', name: 'Wild and Wonderful' }
  ];

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setPreview(URL.createObjectURL(file));
      setError('');
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile || !category) {
      setError('Please select both an image and a category');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('category', category);

      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Upload failed');
      }

      setSelectedFile(null);
      setPreview('');
      setCategory('');
      onSuccess?.(data.path);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <label className="block">
          <span className="text-[#2c392c] font-medium">Category</span>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full rounded-md border-[#d4a373] shadow-sm focus:border-[#d4a373] focus:ring focus:ring-[#d4a373] focus:ring-opacity-50"
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.id}>
                {cat.name}
              </option>
            ))}
          </select>
        </label>

        <label className="block">
          <span className="text-[#2c392c] font-medium">Image</span>
          <input
            type="file"
            onChange={handleFileChange}
            accept="image/jpeg,image/png,image/webp"
            className="mt-1 block w-full text-sm text-[#2c392c]
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-full file:border-0
                     file:text-sm file:font-medium
                     file:bg-[#d4a373] file:text-white
                     hover:file:bg-[#e6c29b]"
            required
          />
        </label>

        {preview && (
          <div className="relative aspect-video w-full max-w-md mx-auto overflow-hidden rounded-lg">
            <Image
              src={preview}
              alt="Preview"
              fill
              className="object-contain"
            />
          </div>
        )}

        {error && (
          <p className="text-red-500 text-sm">{error}</p>
        )}

        <button
          type="submit"
          disabled={loading}
          className="w-full px-4 py-2 bg-[#d4a373] text-white rounded-md 
                   hover:bg-[#e6c29b] transition-colors disabled:opacity-50
                   disabled:cursor-not-allowed"
        >
          {loading ? 'Uploading...' : 'Upload Image'}
        </button>
      </div>
    </form>
  );
} 