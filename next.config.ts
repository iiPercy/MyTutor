import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Preserve the repository's own instructions during next dev.
  agentRules: false,
};

export default nextConfig;
