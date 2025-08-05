import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config) => {
    // Enable WebAssembly support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
      topLevelAwait: true,
    };

    // Handle .wasm files
    config.module.rules.push({ 
      test: /\.wasm$/, 
      type: 'asset/resource' 
    });

    return config;
  },
};

export default nextConfig;
