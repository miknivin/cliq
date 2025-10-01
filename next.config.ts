import type { NextConfig } from "next";
import type { Configuration } from "webpack";

const nextConfig: NextConfig = {
  images: {
    domains: ["ik.imagekit.io"],
  },
  webpack(config: Configuration) {
    // Ensure module & rules exist
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    config.module.rules.push(
      {
        test: /\.svg$/,
        use: ['@svgr/webpack'],
      },
      {
        test: /\.ejs$/,
        use: ['raw-loader'],
      },
      {
        test: /\.js\.map$/,
        use: ['ignore-loader'],
      }
    );

    return config;
  },
};

export default nextConfig;
