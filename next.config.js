/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
        { protocol: 'https', hostname: 'cf.geekdo-images.com' }, // Agrega esta línea
      ],
    },
    // ... otras configuraciones ...
  };
  
  module.exports = nextConfig;
  