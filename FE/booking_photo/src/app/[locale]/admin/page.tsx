"use client";
import React, { useEffect } from "react";
import Cookies from "js-cookie";
import { useParams, useRouter } from "next/navigation";
const isLogin = Cookies.get("key") ? true : false;

const page = () => {
  const router = useRouter();
  const params = useParams();
  console.log(params.locale);
  useEffect(() => {
    if (!isLogin) {
      router.push(`/${params.locale}/admin/login`);
    }
  }, []);
  return <div>
    xin chao
  </div>;
};

export default page;
