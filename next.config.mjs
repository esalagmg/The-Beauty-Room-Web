/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "images.pexels.com" },
    ],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  eslint: {
    // TypeScript checking stays on (real type safety). Linting is run
    // separately via `npm run lint` to avoid ESLint 9 / legacy-config
    // tooling friction blocking production builds.
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
