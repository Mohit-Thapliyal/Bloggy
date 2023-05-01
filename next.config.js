/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  redirects: async () => {
    return [
      {
        source: "/",
        destination: "/guest",
        permanent: true,
      },
    ];
  },
  images: {
    domains: ["lh3.googleusercontent.com","plus.unsplash.com","images.unsplash.com","res.cloudinary.com" ],
  },
};

module.exports = nextConfig;
