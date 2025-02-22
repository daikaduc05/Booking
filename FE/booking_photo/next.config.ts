import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Khởi tạo plugin next-intl
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false, // Tắt Strict Mode
  images: {
    domains: ["res.cloudinary.com"], // Chỉ định domain cho next/image
  }
};

module.exports = withNextIntl(nextConfig);
