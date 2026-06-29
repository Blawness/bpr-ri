import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@blawness/admin-kit"],
  cacheComponents: true,
  images: {
    qualities: [75, 100],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // or specific R2 host if known
      },
    ],
  },
};

export default nextConfig;

