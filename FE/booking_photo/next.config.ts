import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Khởi tạo plugin next-intl
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false, // Tắt Strict Mode
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "your-cloudinary-domain.com", // Thêm domain của Cloudinary
      },
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "th.bing.com",
      },
      {
        protocol: "https",
        hostname: "i.pinimg.com",
      },
    ], // Đã thay thế images.domains với images.remotePatterns
  },
};

module.exports = withNextIntl(nextConfig);
