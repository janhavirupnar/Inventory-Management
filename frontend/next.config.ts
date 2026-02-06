import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "inventory-management-zydk.onrender.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;