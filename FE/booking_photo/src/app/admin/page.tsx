"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
const isLogin = Cookies.get("key") ? true : false;

const page = () => {
  const router = useRouter();
  useEffect(() => {
    if (!isLogin) {
      router.push("/admin/login");
    }
  }, []);
  return <div>
    xin chao
  </div>;
};

export default page;
