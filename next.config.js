/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  child_process: "empty",
  eslint: { ignoreDuringBuilds: true },
};

module.exports = nextConfig;
