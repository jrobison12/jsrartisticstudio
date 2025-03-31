'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface PrintSize {
  size: string;
  price: number;
  description: string;
}

interface AddToCartFormProps {
  imageId: string;
  title: string;
  imageUrl: string;
  sizes: PrintSize[];
}

export default function AddToCartForm({ imageId, title, imageUrl, sizes }: AddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState(sizes[0].size);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addToCart } = useCart();

  const selectedPrintSize = sizes.find(s => s.size === selectedSize)!;

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      await addToCart({
        id: imageId,
        title,
        price: selectedPrintSize.price,
        size: selectedSize,
        image: imageUrl,
        quantity,
      });
    } catch (error) {
      console.error('Failed to add item to cart:', error);
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="size" className="block text-sm font-medium text-gray-700">
          Print Size
        </label>
        <select
          id="size"
          value={selectedSize}
          onChange={(e) => setSelectedSize(e.target.value)}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4a373] focus:ring-[#d4a373] sm:text-sm"
        >
          {sizes.map((size) => (
            <option key={size.size} value={size.size}>
              {size.size} - ${size.price.toFixed(2)} - {size.description}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
          Quantity
        </label>
        <select
          id="quantity"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#d4a373] focus:ring-[#d4a373] sm:text-sm"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </div>

      <button
        onClick={handleAddToCart}
        disabled={addingToCart}
        className="w-full bg-[#d4a373] text-white py-2 px-4 rounded-md hover:bg-[#ccd5ae] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#d4a373] disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
      </button>
    </div>
  );
} 