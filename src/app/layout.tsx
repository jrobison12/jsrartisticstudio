import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Link from "next/link";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Jeanette S. Robison | Wildlife Art & Nature Photography",
  description: "Professional wildlife art and nature photography by Jeanette S. Robison",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-[#f4f1ea]`}>
        <nav className="fixed top-0 w-full bg-[#2c392c]/95 backdrop-blur-sm border-b border-[#465446] shadow-sm z-[9999]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center py-4">
              <div className="w-full flex items-center justify-between mb-6">
                <Link 
                  href="/"
                  className="px-4 py-2 bg-[#d4a373] text-[#e9e2d3] rounded-full 
                           hover:bg-[#e6c29b] transition-colors flex items-center gap-2"
                >
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    viewBox="0 0 24 24" 
                    fill="currentColor" 
                    className="w-5 h-5"
                  >
                    <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                    <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
                  </svg>
                  Home
                </Link>
                <h1 className="text-2xl font-serif text-[#e9e2d3]">Artistic Nature by JSRArtisticStudios</h1>
                <div className="w-[88px]"></div> {/* Spacer to balance the layout */}
              </div>
              <div className="flex flex-wrap justify-center gap-8 text-base">
                <Link href="/gallery" className="text-[#d4a373] hover:text-[#e6c29b] transition-colors">
                  Gallery
                </Link>
                <Link href="/about" className="text-[#e9e2d3] hover:text-white transition-colors">
                  About
                </Link>
                <Link href="/purchase-info" className="text-[#e9e2d3] hover:text-white transition-colors">
                  Purchase Info
                </Link>
                <Link href="/contact" className="text-[#e9e2d3] hover:text-white transition-colors">
                  Contact
                </Link>
                <Link href="/natural-reflections" className="text-[#e9e2d3] hover:text-white transition-colors">
                  Natural Reflections
                </Link>
                <Link href="/showcase-spotlight" className="text-[#e9e2d3] hover:text-white transition-colors">
                  Showcase Spotlight
                </Link>
              </div>
            </div>
          </div>
        </nav>
        <main className="pt-32">
          {children}
        </main>
        <footer className="bg-[#2c392c] border-t border-[#465446]">
          <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
            <div className="text-center text-sm text-[#e9e2d3]">
              <p>© {new Date().getFullYear()} Jeanette S. Robison Artistic Studios. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </body>
    </html>
  );
}
