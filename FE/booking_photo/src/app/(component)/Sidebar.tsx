"use client";
import React, { useState } from "react";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex">
      {/* Nút mở/đóng sidebar */}
      <button
        onClick={toggleSidebar}
        className="p-2 m-4 text-white bg-blue-500 rounded z-50 fixed bottom-0 left-0"
      >
        {isOpen ? "Đóng" : "Mở"}
      </button>

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 h-full bg-gray-200 p-4 w-64 transition-transform duration-300 ease-in-out transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="text-lg font-bold mb-4">Admin Sidebar</div>
        <div className="mb-4 p-2 bg-white rounded-lg shadow-md">Đặt Lịch</div>
        <div className="mb-4 p-2 bg-white rounded-lg shadow-md">Trưng Bày</div>
        <div className="mb-4 p-2 bg-white rounded-lg shadow-md">
          Gói Dịch Vụ
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
