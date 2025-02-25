"use client";
import React from "react";
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
  const isLogin = sessionStorage.getItem("token")
  console.log(path);
  if (!isLogin&&!path.includes("login")) {
    window.location.href = "/admin/login";
  }
  return (
    <html lang="en">
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
