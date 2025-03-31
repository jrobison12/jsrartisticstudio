'use client';

import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';

interface PrintSize {
  size: string;
  price: number;
  dimensions: string;
}

interface AddToCartFormProps {
  imageId: string;
  title: string;
  sizes: PrintSize[];
  image: string;
}

export default function AddToCartForm({ imageId, title, sizes, image }: AddToCartFormProps) {
  const [selectedSize, setSelectedSize] = useState<string>(sizes[0].size);
  const [quantity, setQuantity] = useState(1);
  const [addingToCart, setAddingToCart] = useState(false);
  const { addItem } = useCart();

  const selectedPrintSize = sizes.find(s => s.size === selectedSize)!;

  const handleAddToCart = async () => {
    setAddingToCart(true);
    try {
      addItem({
        id: imageId,
        title,
        price: selectedPrintSize.price,
        size: selectedPrintSize.dimensions,
        image,
        quantity
      });
      
      // Show success message
      alert('Added to cart successfully!');
    } catch (error) {
      console.error('Failed to add to cart:', error);
      alert('Failed to add to cart. Please try again.');
    } finally {
      setAddingToCart(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Size Selection */}
      <div className="grid grid-cols-2 gap-4">
        {sizes.map((size) => (
          <button
            key={size.size}
            onClick={() => setSelectedSize(size.size)}
            className={`p-4 rounded-lg border-2 transition-colors ${
              selectedSize === size.size
                ? 'border-[#d4a373] bg-[#d4a373]/10'
                : 'border-gray-200 hover:border-[#d4a373]/50'
            }`}
          >
            <div className="text-lg font-medium text-[#2c392c]">
              {size.dimensions}
            </div>
            <div className="text-[#2c392c]/80">
              ${size.price.toFixed(2)}
            </div>
          </button>
        ))}
      </div>

      {/* Quantity Selection */}
      <div>
        <label className="block text-[#2c392c] font-medium mb-2">
          Quantity
        </label>
        <select
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
          className="w-24 px-3 py-2 border border-[#d4a373] rounded-md 
                   focus:outline-none focus:ring-2 focus:ring-[#d4a373]
                   text-[#2c392c]"
        >
          {[1, 2, 3, 4, 5].map((num) => (
            <option key={num} value={num} className="text-[#2c392c]">
              {num}
            </option>
          ))}
        </select>
      </div>

      {/* Total Price */}
      <div className="text-xl font-medium text-[#2c392c]">
        Total: ${(selectedPrintSize.price * quantity).toFixed(2)}
      </div>

      {/* Add to Cart Button */}
      <button
        onClick={handleAddToCart}
        disabled={addingToCart}
        className="w-full px-6 py-3 bg-[#d4a373] text-white rounded-lg
                 hover:bg-[#e6c29b] transition-colors disabled:opacity-50
                 disabled:cursor-not-allowed"
      >
        {addingToCart ? 'Adding to Cart...' : 'Add to Cart'}
      </button>
    </div>
  );
} 