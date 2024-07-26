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
        source: '/courses/:slug',
        destination: '/dashboard/courses/:slug',
      },
      {
        source: '/hackathons',
        destination: '/dashboard/hackathons',
      },
      {
        source: '/hackathons/:slug',
        destination: '/dashboard/hackathons/:slug',
      },
      {
        source: '/hackathons/:slug/submissions',
        destination: '/dashboard/hackathons/:slug/submissions',
      },
      {
        source: '/hackathons/:slug/submissions/:id',
        destination: '/dashboard/hackathons/:slug/submissions/:id',
      },
      {
        source: '/@:username',
        destination: `/profile/:username`,
      },
      {
        source: '/@:path/:slug*',
        destination: `/profile/:path/:slug*`,
      },
      {
        source: '/help-centers',
        destination: '/dashboard/help-centers',
      },
      {
        source: '/leaderboard',
        destination: '/dashboard/leaderboard',
      },
    ];
  },
};

export default process.env.ANALYZE === 'true'
  ? withBundleAnalyzer(nextConfig)
  : nextConfig;
