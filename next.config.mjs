/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.hashnode.com',
        port: '',
      },
    ],
  },
  compiler: {
    styledComponents: true,
  },
};

export default nextConfig;
