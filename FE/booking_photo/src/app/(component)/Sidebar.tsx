"use client";
import { Button } from "@/components/ui/button";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [fixed, setFixed] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  const path = usePathname();
  const router = useRouter();

  const sideBar = [
    {
      title: "Quản lí khách hàng",
      url: "/admin/customer",
    },
    {
      title: "Quản lí gói dịch vụ",
      url: "/admin/package",
    },
    {
      title: "Quản lí đánh giá",
      url: "/admin/rating",
    }
  ];

  // Lắng nghe sự thay đổi của đường dẫn URL
  useEffect(() => {
    if (path.includes("/customer") || path.includes("/package") || path.includes("/rating")) {
      setFixed(true);
    } else {
      setFixed(false); // Reset lại fixed nếu không phải /customer
    }
  }, [path]); // Chạy lại mỗi khi đường dẫn thay đổi

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    router.push("/admin/login");
  }

  return (
    <div className="flex">
      {!fixed && (
        <button
          onClick={toggleSidebar}
          className="p-2 m-4 text-white bg-gray-700 hover:scale-110 duration-300 rounded z-50 fixed bottom-0 left-0"
        >
          {isOpen ? "Đóng menu" : "Mở menu"}
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-100 rounded-r-xl p-4 w-fit px-8 flex flex-col items-center transition-transform duration-300 ease-in-out transform z-40 ${
          isOpen && !fixed ? "translate-x-0" : "-translate-x-full"
        } ${fixed && "translate-x-0"}`}
      >
        <div className="text-xl font-bold mb-10 mt-3 ">Quản lí menu</div>
        <div className="flex flex-col gap-5">
          {sideBar.map((item, index) => (
            <button
              key={index}
              onClick={() => {
                router.push(item.url);
                setIsOpen(false);
              }}
              className={`${
                path.includes(item.url) &&
                "bg-gray-500 text-white  shadow-lg scale-110"
              } mb-4 p-2 rounded-lg shadow-md hover:bg-gray-500 hover:text-white hover:translate-x-3 hover:shadow-lg hover:scale-110 duration-300 z-50`}
            >
              {item.title}
            </button>
          ))}
          <Button onClick={()=>handleLogout()} className="bg-red-500 text-white hover:bg-red-400 duration-300">
            Logout
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
