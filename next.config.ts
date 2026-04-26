import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  transpilePackages: ["@procore/core-react", "@procore/globalization-toolkit"],
  turbopack: {
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
