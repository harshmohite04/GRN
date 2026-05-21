import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Allow mobile devices on the local network to access the dev server
  allowedDevOrigins: [
    "192.168.1.8",
    "100.69.90.120",
    // Wildcard for any other device on the same subnet:
    "192.168.1.*",
    "100.69.90.*",
  ],
};

export default nextConfig;
