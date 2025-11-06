/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'studio-8143900809-49441.appspot.com',
        port: '',
        pathname: '/**',
      }
    ],
  },
};

module.exports = nextConfig;
