"use client";
import React, { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import InfoForm from "./InfoForm";
import PackageInfo from "./PackageInfo";
import { useTranslations } from "next-intl";
import { IPackagesAdmin } from "@/model/packages";
import axios from "axios";
import { AiOutlineGlobal } from "react-icons/ai";

const Page = () => {
  const t = useTranslations("Booking");
  const params = useParams();
  const router = useRouter();

  const [language, setLanguage] = useState(params.locale || "vn");
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
          setSelectPackage(
            res.data.find(
              (item: IPackagesAdmin) => item.packageId === Number(params.id)
            )
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchPackages();
  }, [params.id]);

  useEffect(() => {
    if (language !== params.locale) {
      router.push(`/${language}/booking/${params.id}`);
    }
  }, [language, params.locale, router]);

  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex gap-2 items-center fixed top-0 left-0 p-4">
        <AiOutlineGlobal className="text-black text-2xl" />
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value)}
          className="text-black border-none outline-none transition-all ease-in-out cursor-pointer duration-300 bg-transparent"
        >
          <option className="bg-black text-white" value="vn">
            VN
          </option>
          <option className="bg-black text-white" value="en">
            EN
          </option>
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
