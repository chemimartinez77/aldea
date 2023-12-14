/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {protocol: 'https', hostname: 'lh3.googleusercontent.com'},
        ]
    },
    // puedes tener otras configuraciones aquí
  }
  
  module.exports = nextConfig