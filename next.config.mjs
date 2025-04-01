/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'plus.unsplash.com'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
  // Add build optimization settings
  experimental: {
    optimizePackageImports: ['@tremor/react'],
  },
  // Configure output to server-side
  output: 'standalone',
  // Optimize build process
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig; 