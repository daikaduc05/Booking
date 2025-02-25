"use client";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Page = () => {
  const [key, setKey] = useState(0);
  const text = "Chào mừng tới trang quản trị của chúng tôi";

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 4000);
    return () => clearInterval(interval);
  }, []);
  const router = useRouter();
  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      router.push("/admin/login");
    }
  }, []);
  return (
    <div className="bg-gray-200 w-screen h-screen flex justify-center items-center">
      <h1
        key={key}
        className="h-[400px] flex justify-center items-center text-5xl font-semibold"
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block leading-[100px] overflow-hidden animate-text-reveal`}
            style={{
              animationDelay: `${index * 0.05}s`, 
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
    </div>
  );
};

export default Page;
