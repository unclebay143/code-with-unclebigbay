/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'avatars.githubusercontent.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'www.hostinger.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
      },

      {
        protocol: 'https',
        hostname: 'cdn.rareblocks.xyz',
        port: '',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },

  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/overview',
      },
      {
        source: '/@:path',
        destination: `/profile/:path`,
      },
      {
        source: '/@:path/:slug*',
        destination: `/profile/:path/:slug*`,
      },
    ];
  },
};

export default nextConfig;
