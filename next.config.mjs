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
  // Add webpack configuration to handle micromatch issue
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        micromatch: false,
      };
    }
    return config;
  },
  // Disable build traces to avoid micromatch issues
  generateBuildId: async () => 'build',
  // Optimize build process
  poweredByHeader: false,
  reactStrictMode: true,
  swcMinify: true,
};

export default nextConfig; 