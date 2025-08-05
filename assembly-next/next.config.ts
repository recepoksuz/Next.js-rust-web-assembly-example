import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  webpack: (config, { isServer }) => {
    // Enable Web Assembly support
    config.experiments = {
      ...config.experiments,
      asyncWebAssembly: true,
    };

    // Handle .wasm files
    config.module.rules.push({
      test: /\.wasm$/,
      type: "webassembly/async",
    });

    // Fallback for Node.js modules in browser
    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
      };
    }

    return config;
  },
  // Enable static export for better deployment compatibility
  output: "standalone",
  // Disable x-powered-by header
  poweredByHeader: false,
  // Optimize images
  images: {
    unoptimized: true
  }
};

export default nextConfig;
