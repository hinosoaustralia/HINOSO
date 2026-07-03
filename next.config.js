/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // three.js ships modern ESM; let Next transpile it for the client bundle.
  transpilePackages: ["three"],
};

module.exports = nextConfig;
