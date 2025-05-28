import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: [
      "localhost"
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "e-commerce-t2r8.onrender.com",
        pathname: "/public/**"
      }
    ]
  }
};

export default nextConfig;
