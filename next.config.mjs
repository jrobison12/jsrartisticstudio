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
    unoptimized: false,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
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
  // Configure build output
  distDir: '.next',
  // Add static page generation settings
  staticPageGenerationTimeout: 120,
  // Configure page extensions
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
};

export default nextConfig; 