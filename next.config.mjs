/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer';

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
        hostname: 'lh3.googleusercontent.com',
        port: '',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },

  async rewrites() {
    return {
      afterFiles: [
        ({
          source: '/@:username',
          destination: '/profile/:username',
        },
        {
          source: '/@:path/:slug*',
          destination: '/profile/:path/:slug*',
        }),
      ],
    };
  },
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
