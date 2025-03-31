import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";
import { CartProvider } from "@/contexts/CartContext";
import AnalyticsTracker from "@/components/AnalyticsTracker";

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
    <html lang="en" className="h-full">
      <body className={`${inter.className} min-h-full flex flex-col`}>
        <CartProvider>
          <Navigation />
          <main className="flex-1 pt-16 md:pt-20">
            {children}
          </main>
          <footer className="bg-[#2c392c] border-t border-[#465446] mt-auto">
            <div className="max-w-7xl mx-auto py-6 md:py-8 px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4">
                <p className="text-sm md:text-base text-[#e9e2d3]">
                  © {new Date().getFullYear()} Jeanette S. Robison Artistic Studios. All rights reserved.
                </p>
                <div className="flex justify-center space-x-4 text-xs md:text-sm text-[#e9e2d3]/60">
                  <a href="/privacy-policy" className="hover:text-[#d4a373] transition-colors">Privacy Policy</a>
                  <span>•</span>
                  <a href="/terms" className="hover:text-[#d4a373] transition-colors">Terms of Service</a>
                  <span>•</span>
                  <a href="/sitemap" className="hover:text-[#d4a373] transition-colors">Sitemap</a>
                </div>
              </div>
            </div>
          </footer>
          <AnalyticsTracker />
        </CartProvider>
      </body>
    </html>
  );
}
