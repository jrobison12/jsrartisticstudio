'use client';

import { useCart } from '@/contexts/CartContext';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';

export default function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const [checkoutStatus, setCheckoutStatus] = useState<'idle' | 'processing' | 'success' | 'error'>('idle');

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = 10; // Fixed shipping cost
  const total = subtotal + shipping;

  const handleQuantityChange = (id: string, newQuantity: number) => {
    if (newQuantity < 1) return;
    updateQuantity(id, newQuantity);
  };

  const handleCheckout = async () => {
    setCheckoutStatus('processing');
    // TODO: Implement actual checkout logic
    // For now, just simulate a successful checkout
    setTimeout(() => {
      setCheckoutStatus('success');
    }, 2000);
  };

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-[#f4f1ea]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h1 className="text-3xl font-serif text-[#2c392c] mb-8">Shopping Cart</h1>
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <p className="text-[#2c392c]/80 mb-6">Your cart is empty</p>
            <Link
              href="/gallery"
              className="inline-block bg-[#d4a373] text-white px-6 py-3 rounded-full
                       hover:bg-[#e6c29b] transition-colors"
            >
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f4f1ea]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <h1 className="text-3xl font-serif text-[#2c392c] mb-8">Shopping Cart</h1>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={`${item.id}-${item.size}`} className="bg-white rounded-lg shadow-lg p-4 flex gap-4">
                <div className="relative w-24 h-24">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover rounded"
                  />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-serif text-[#2c392c] mb-1">{item.title}</h3>
                  <p className="text-[#2c392c]/60 text-sm mb-2">Size: {item.size}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                        className="text-[#2c392c] hover:text-[#d4a373] transition-colors"
                      >
                        -
                      </button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <button
                        onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                        className="text-[#2c392c] hover:text-[#d4a373] transition-colors"
                      >
                        +
                      </button>
                    </div>
                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="text-[#2c392c]/60 hover:text-[#d4a373] transition-colors text-sm"
                    >
                      Remove
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-medium text-[#2c392c]">${(item.price * item.quantity).toFixed(2)}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary */}
          <div className="bg-white rounded-lg shadow-lg p-6 h-fit">
            <h2 className="text-xl font-serif text-[#2c392c] mb-4">Order Summary</h2>
            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-[#2c392c]/80">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-[#2c392c]/80">
                <span>Shipping</span>
                <span>${shipping.toFixed(2)}</span>
              </div>
              <div className="border-t border-[#2c392c]/10 pt-2 mt-2">
                <div className="flex justify-between font-medium text-[#2c392c]">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>
            <button
              onClick={handleCheckout}
              disabled={checkoutStatus === 'processing'}
              className="w-full bg-[#d4a373] text-white py-3 rounded-full
                       hover:bg-[#e6c29b] transition-colors disabled:opacity-50
                       disabled:cursor-not-allowed"
            >
              {checkoutStatus === 'processing' ? 'Processing...' : 'Proceed to Checkout'}
            </button>
            {checkoutStatus === 'success' && (
              <p className="text-green-600 text-sm text-center mt-2">
                Order placed successfully! We'll contact you soon.
              </p>
            )}
            {checkoutStatus === 'error' && (
              <p className="text-red-600 text-sm text-center mt-2">
                There was an error processing your order. Please try again.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
} 