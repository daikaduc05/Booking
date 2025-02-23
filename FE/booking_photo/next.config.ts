import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Khởi tạo plugin next-intl
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false, // Tắt Strict Mode
  images: {
    domains: ["your-cloudinary-domain.com", "res.cloudinary.com"], // Đảm bảo domain này có sẵn trong cấu hình của bạn
  },
};

module.exports = withNextIntl(nextConfig);
