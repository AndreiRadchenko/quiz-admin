/** @type {import('next').NextConfig} */
const nextConfig = {
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
