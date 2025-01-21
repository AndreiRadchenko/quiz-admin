/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: process.env.NEXT_PUBLIC_S3_END_POINT || 'minio-compose',
        port: process.env.NEXT_PUBLIC_S3_PORT || '9000',
        pathname: '/**',
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
