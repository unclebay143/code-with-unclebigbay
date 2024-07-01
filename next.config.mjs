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
    return [
      {
        source: '/dashboard',
        destination: '/dashboard/overview',
      },
      {
        source: '/courses',
        destination: '/dashboard/courses',
      },
      {
        source: '/courses/:path',
        destination: '/dashboard/courses/:path',
      },
      {
        source: '/hackathons',
        destination: '/dashboard/hackathons',
      },
      {
        source: '/hackathons/:path',
        destination: '/dashboard/hackathons/:path',
      },
      {
        source: '/@:path',
        destination: `/profile/:path`,
      },
      {
        source: '/@:path/:slug*',
        destination: `/profile/:path/:slug*`,
      },
      {
        source: '/help-centers',
        destination: '/dashboard/help-centers',
      },
    ];
  },
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
