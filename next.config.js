/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: ['@radix-ui/react-select', '@radix-ui/react-dialog', '@radix-ui/react-alert-dialog', '@radix-ui/react-tabs'],
  images: {
    domains: [],
  },
  experimental: {
    optimizePackageImports: ['lucide-react'],
  },
};

module.exports = nextConfig;
