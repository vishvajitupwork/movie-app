/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "marsdevs-interview-bucket.s3.ap-south-1.amazonaws.com",
      },
    ],
  },
};

module.exports = nextConfig;
