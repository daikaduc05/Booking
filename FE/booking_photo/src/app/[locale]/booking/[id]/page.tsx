"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter, useSearchParams } from "next/navigation";
import InfoForm from "./InfoForm";
import PackageInfo from "./PackageInfo";
import { useTranslations } from "next-intl";
import { IPackagesAdmin } from "@/model/packages";
import axios from "axios";
const Page = () => {
  const t = useTranslations("Booking");
  const params = useParams();
  const [language, setLanguage] = useState(params.locale);
  const [packageList, setPackagesList] = useState<IPackagesAdmin[]>([]);
  const [selectPackage, setSelectPackage] = useState<IPackagesAdmin>();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages",
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (res) {
          console.log(res.data);
          setPackagesList(res.data);
        }
        console.log(packageList);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPackages();
  }, []);

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

export default Page;
