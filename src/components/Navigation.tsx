'use client';

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "@/contexts/CartContext";

function CartIcon() {
  const { cartItems } = useCart();
  return (
    <div className="relative">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
      </svg>
      {cartItems.length > 0 && (
        <span className="absolute -top-2 -right-2 bg-[#d4a373] text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
          {cartItems.length}
        </span>
      )}
    </div>
  );
}

export default function Navigation() {
  const pathname = usePathname();
  const { cartItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full bg-[#2c392c] border-b border-[#465446] shadow-md z-[9999]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link 
              href="/" 
              className="text-lg md:text-2xl font-serif bg-[#d4a373] text-white px-3 md:px-6 py-1.5 md:py-2 rounded-md hover:bg-[#e6c29b] transition-colors shadow-sm truncate max-w-[200px] md:max-w-none"
            >
              JSR Artistic Studio
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center">
            {/* Main Navigation Group */}
            <div className="flex items-center space-x-1 mr-8 border-r border-[#465446] pr-8">
              <Link
                href="/gallery"
                className={`px-3 py-2 rounded-md text-lg ${
                  pathname === '/gallery'
                    ? 'text-[#d4a373] font-medium'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134]'
                } transition-colors`}
              >
                Gallery
              </Link>
              <Link
                href="/showcase-spotlight"
                className={`px-3 py-2 rounded-md text-lg ${
                  pathname === '/showcase-spotlight'
                    ? 'text-[#d4a373] font-medium'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134]'
                } transition-colors`}
              >
                Showcase
              </Link>
              <Link
                href="/natural-reflections"
                className={`px-3 py-2 rounded-md text-lg ${
                  pathname === '/natural-reflections'
                    ? 'text-[#d4a373] font-medium'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134]'
                } transition-colors`}
              >
                Natural Reflections
              </Link>
            </div>

            {/* Secondary Navigation Group */}
            <div className="flex items-center space-x-1 mr-8 border-r border-[#465446] pr-8">
              <Link
                href="/purchase-info"
                className={`px-3 py-2 rounded-md text-lg ${
                  pathname === '/purchase-info'
                    ? 'text-[#d4a373] font-medium'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134]'
                } transition-colors`}
              >
                Purchase Info
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-md text-lg ${
                  pathname === '/about'
                    ? 'text-[#d4a373] font-medium'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134]'
                } transition-colors`}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`px-3 py-2 rounded-md text-lg ${
                  pathname === '/contact'
                    ? 'text-[#d4a373] font-medium'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134]'
                } transition-colors`}
              >
                Contact
              </Link>
            </div>

            {/* Utility Navigation */}
            <div className="flex items-center space-x-4">
              <Link
                href="/admin/login"
                className={`px-3 py-2 rounded-md text-sm font-medium ${
                  pathname === '/admin/login'
                    ? 'text-[#d4a373]'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134]'
                } transition-colors`}
              >
                Admin
              </Link>
              <Link 
                href="/cart" 
                className="p-2 rounded-md text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] transition-colors"
              >
                <CartIcon />
              </Link>
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="flex items-center gap-4 md:hidden">
            <Link 
              href="/cart" 
              className="p-2 rounded-md text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] transition-colors relative"
            >
              <CartIcon />
            </Link>
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#e9e2d3] hover:text-[#d4a373] transition-colors p-2 rounded-md hover:bg-[#344134] -mr-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isMenuOpen && (
        <div className="md:hidden fixed inset-0 top-16 bg-[#2c392c] z-50 overflow-y-auto pb-safe">
          <div className="px-4 pt-4 pb-safe space-y-4 bg-[#2c392c] min-h-screen">
            <div className="py-2 space-y-1 border-b border-[#465446]">
              <p className="px-3 text-sm font-medium text-[#e9e2d3]/60 uppercase tracking-wider mb-2">Main Navigation</p>
              <Link
                href="/gallery"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  pathname === '/gallery'
                    ? 'text-[#d4a373] bg-[#344134]'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] active:bg-[#3c4b3c]'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Gallery
              </Link>
              <Link
                href="/showcase-spotlight"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  pathname === '/showcase-spotlight'
                    ? 'text-[#d4a373] bg-[#344134]'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] active:bg-[#3c4b3c]'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Showcase Spotlight
              </Link>
              <Link
                href="/natural-reflections"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  pathname === '/natural-reflections'
                    ? 'text-[#d4a373] bg-[#344134]'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] active:bg-[#3c4b3c]'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Natural Reflections
              </Link>
            </div>

            <div className="py-2 space-y-1 border-b border-[#465446]">
              <p className="px-3 text-sm font-medium text-[#e9e2d3]/60 uppercase tracking-wider mb-2">Information</p>
              <Link
                href="/purchase-info"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  pathname === '/purchase-info'
                    ? 'text-[#d4a373] bg-[#344134]'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] active:bg-[#3c4b3c]'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Purchase Info
              </Link>
              <Link
                href="/about"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  pathname === '/about'
                    ? 'text-[#d4a373] bg-[#344134]'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] active:bg-[#3c4b3c]'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                href="/contact"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  pathname === '/contact'
                    ? 'text-[#d4a373] bg-[#344134]'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] active:bg-[#3c4b3c]'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
            </div>

            <div className="py-2 space-y-1">
              <p className="px-3 text-sm font-medium text-[#e9e2d3]/60 uppercase tracking-wider mb-2">Account</p>
              <Link
                href="/admin/login"
                className={`block px-4 py-3 rounded-lg text-base font-medium ${
                  pathname === '/admin/login'
                    ? 'text-[#d4a373] bg-[#344134]'
                    : 'text-[#e9e2d3] hover:text-[#d4a373] hover:bg-[#344134] active:bg-[#3c4b3c]'
                } transition-colors`}
                onClick={() => setIsMenuOpen(false)}
              >
                Admin
              </Link>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
} 