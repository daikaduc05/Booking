"use client";
import React, { useEffect, useState } from "react";
import Packages, { packages } from "@/app/(element)/packages";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import InfoForm from "./InfoForm";
import PackageInfo from "./PackageInfo";
import { useTranslations } from "next-intl";
const page = () => {
  const t = useTranslations("Booking");
  const params = useParams();
  const selectPackage = packages.find((item) => item.id === Number(params.id));
  console.log(selectPackage);
  const [language, setLanguage] = useState(params.locale);
  return (
    <div className=" flex flex-col justify-center items-center ">
      <div className="flex gap-2 items-center fixed top-0 left-0 p-4">
        <img
          src={`${
            language === "vn"
              ? "https://th.bing.com/th/id/R.58ec68d1566a4131ccf6853f2126742f?rik=R8ycwx8d5ucu7g&pid=ImgRaw&r=0"
              : "https://th.bing.com/th/id/OIP.U-h9wYdOSH047roWjY_1TgHaE3?rs=1&pid=ImgDetMain"
          }`}
          className="size-8 rounded-full object-cover"
        />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className=" text-black bg-white border-none outline-none transition-all ease-in-out cursor-pointer duration-300 hover:text-[#212020]"
        >
          <option value="vn">VN</option>
          <option value="en">EN</option>
        </select>
      </div>
      <h1 className="py-6 text-3xl font-semibold">{t("title")}</h1>
      <div className="flex justify-center items-center gap-2">
        <PackageInfo selectPackages={selectPackage} />
        <InfoForm selectPackages={selectPackage} />
      </div>
    </div>
  );
};

export default page;
