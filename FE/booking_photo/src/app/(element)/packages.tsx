"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { IPackages } from "@/model/packages";
import axios from "axios";

const Packages = ({ packageList }: { packageList: IPackages[] }) => {
  const packageItem = packageList;
  const t = useTranslations("Packages");
  const router = useRouter();
  const params = useParams();
  const [formattedPrices, setFormattedPrices] = useState<{
    [key: number]: string;
  }>({});
  useEffect(() => {
    const newFormattedPrices = packageItem.reduce<{ [key: number]: string }>(
      (acc, item) => {
        acc[item.id] = item.price.toLocaleString();
        return acc;
      },
      {}
    );
    setFormattedPrices(newFormattedPrices);
  }, []);

  return (
    <div className="bg-[#d6d6d6] py-16">
      <h1 className="text-4xl text-center mb-12">{t("title")}</h1>
      {packageList.length === 0 ? (
        <div className="flex items-center justify-center font-semibold pb-5">
          Chưa có dữ liệu
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-10 md:mx-20">
          {packageList.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                router.push(`/${params.locale}/booking/${item.id}`)
              }
              className="bg-white cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-300 rounded-xl overflow-hidden"
            >
              <img
                src={item.img}
                alt={item?.name || "Package"}
                className="w-full h-[300px] object-cover"
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item?.name || "Package"}
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-4">
                  {formattedPrices[item.id]
                    ? `${formattedPrices[item.id]} VNĐ`
                    : "Chưa cập nhật giá"}
                </p>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Packages;
