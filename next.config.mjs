/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '9002',
        pathname: '/questions/**',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/quiz',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
