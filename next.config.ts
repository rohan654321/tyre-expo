import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.itegroupnews.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'placehold.co',
        port: '',
        pathname: '/**',
      },
    ],
    // Allow unoptimized images as fallback
    unoptimized: process.env.NODE_ENV === 'development',
  },
  // Disable strict SSL for development only
  ...(process.env.NODE_ENV === 'development' && {
    serverExternalPackages: [],
  }),
};

export default nextConfig;