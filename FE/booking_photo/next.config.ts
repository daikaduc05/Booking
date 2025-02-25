import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

// Khởi tạo plugin next-intl
const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  reactStrictMode: false, // Tắt Strict Mode
  images: {
    domains: ["your-cloudinary-domain.com", "res.cloudinary.com", "th.bing.com","i.pinimg.com"], // Thêm domain của Cloudinary
    
  },
  
};

module.exports = withNextIntl(nextConfig);
