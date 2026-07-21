import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@codeverse/shared"],
  output: "standalone",
};

export default nextConfig;
