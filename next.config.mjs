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
  // Add webpack configuration to handle Node.js modules
  webpack: (config, { isServer }) => {
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        path: false,
        micromatch: false,
        os: false,
        crypto: false,
        net: false,
        tls: false,
        stream: false,
        zlib: false,
        http: false,
        https: false,
        buffer: false,
        util: false,
        assert: false,
        url: false,
        querystring: false,
        punycode: false,
        process: false,
        child_process: false,
        dns: false,
        dgram: false,
        cluster: false,
        module: false,
        dotenv: false,
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