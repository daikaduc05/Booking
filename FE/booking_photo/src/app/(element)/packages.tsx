"use client";
import React, { useState, useMemo, useEffect } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";

import { IProductShow } from "@/model/product";

const Packages = ({ productShow }: { productShow: IProductShow[] }) => {
  const t = useTranslations("Packages");
  const router = useRouter();
  const params = useParams();
  const [formattedPrices, setFormattedPrices] = useState<{
    [key: number]: string;
  }>({});

  // Function to filter out duplicate products based on the 'packageId' field
  const filterUniqueProducts = (products: IProductShow[]) => {
    const seenIds = new Set();
    return products.filter((product) => {
      if (seenIds.has(product.packageId)) {
        return false;
      } else {
        seenIds.add(product.packageId);
        return true;
      }
    });
  };

  // Memoize the filtered products to avoid recalculating on every render
  const uniqueProductShow = useMemo(
    () => filterUniqueProducts(productShow),
    [productShow]
  );

  // Formatting prices for the packages (runs once when uniqueProductShow is updated)
  useEffect(() => {
    const newFormattedPrices = uniqueProductShow.reduce<{
      [key: number]: string;
    }>((acc, item) => {
      acc[item.packageId] = item.pricePackage.toLocaleString();
      return acc;
    }, {});
    setFormattedPrices(newFormattedPrices);
  }, [uniqueProductShow]);

  return (
    <div className="bg-[#d6d6d6] py-16">
      <h1 className="text-4xl text-center mb-12">{t("title")}</h1>
      {uniqueProductShow.length === 0 ? (
        <div className="flex items-center justify-center font-semibold pb-5">
          Chưa có dữ liệu
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-10 md:mx-20">
          {uniqueProductShow.map((item, index) => (
            <div
              key={index}
              onClick={() =>
                router.push(`/${params.locale}/booking/${item.packageId}`)
              }
              className="bg-white cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-300 rounded-xl overflow-hidden"
            >
              <img
                src={item?.image || "https://via.placeholder.com/300"}
                alt={item?.namePackage || "Package"}
                className="w-full h-[300px] object-cover "
              />
              <div className="p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">
                  {item?.namePackage || "Package"}
                </h2>
                <p className="text-lg font-medium text-gray-600 mb-4">
                  {formattedPrices[item.packageId]
                    ? `${formattedPrices[item.packageId]} VNĐ`
                    : "Chưa cập nhật giá"}
                </p>
                <p className="text-gray-500 text-sm">
                  {item.descriptionPackage}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Packages;
