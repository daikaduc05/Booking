"use client"; // Đảm bảo mã này chạy trên client-side

import React, { useEffect } from "react";
import "../globals.css";
import Sidebar from "../(component)/Sidebar";
import { usePathname } from "next/navigation";
import { ToastContainer } from "react-toastify";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const path = usePathname();

  useEffect(() => {
    // Kiểm tra nếu đang chạy trên client-side
    if (typeof window !== "undefined") {
      const isLogin = sessionStorage.getItem("token");
      // console.log(path);
      if (!isLogin && !path.includes("login")) {
        // Chuyển hướng đến trang login nếu không có token
        window.location.href = "/admin/login";
      }
    }
  }, [path]);

  return (
    <html lang="en">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className="bg-gray-200">
        {!path.includes("login") && <Sidebar />}
        <main>
          {children}
          <ToastContainer />
        </main>
      </body>
    </html>
  );
}
