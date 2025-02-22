import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Khởi tạo plugin next-intl
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false, // Tắt Strict Mode
};

module.exports = withNextIntl(nextConfig);
