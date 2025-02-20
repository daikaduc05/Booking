'use client'
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { IPackages } from "@/model/packages";

export const packages: IPackages[] = [
  {
    id: 1,
    img: "https://i.pinimg.com/474x/f8/27/56/f82756c02fe36e091bcca8c41c39b05a.jpg",
    name: "Gia đình",
    price: 3000000,
    description:
      "Chụp ảnh và video gia đình, lưu giữ những khoảnh khắc ấm áp và vui vẻ.",
    productId: [1, 2, 3, 4],
  },
  {
    id: 2,
    img: "https://i.pinimg.com/474x/1e/3f/04/1e3f048af33ee1dd91256bd795988b56.jpg",
    name: "Cặp đôi",
    price: 4000000,
    description:
      "Chụp ảnh lãng mạn và tình tứ cho các cặp đôi, ghi lại những khoảnh khắc yêu thương.",
    productId: [5, 6, 7, 8],
  },
  {
    id: 3,
    img: "https://i.pinimg.com/736x/cb/fb/ca/cbfbca54f82e9c87e091574ebdd97ce8.jpg",
    name: "Trẻ em",
    price: 7000000,
    description:
      "Chụp ảnh doanh nghiệp, sản phẩm và đội ngũ nhân viên chuyên nghiệp.",
    productId: [9, 10, 11, 12],
  },
  {
    id: 4,
    img: "https://i.pinimg.com/474x/27/1c/4d/271c4de76728b6ce52828eb0515e8f93.jpg",
    name: "Đám cưới",
    price: 9000000,
    description:
      "Chụp ảnh và quay video trong ngày cưới, từ lễ cưới đến tiệc cưới.",
    productId: [13, 14, 15, 16],
  },
  {
    id: 5,
    img: "https://i.pinimg.com/736x/92/c2/7d/92c27d8664dcbed4a0b90e27b54534c8.jpg",
    name: "Doanh nghiệp",
    price: 800000,
    description:
      "Chụp ảnh doanh nghiệp, sản phẩm và đội ngũ nhân viên chuyên nghiệp.",
    productId: [17, 18, 19, 20],
  },
];

const Packages = () => {
  const t = useTranslations("Packages");
  const router = useRouter();
  const params = useParams();
  const [formattedPrices, setFormattedPrices] = useState<{ [key: number]: string }>({});

  // Đảm bảo định dạng giá trị chỉ sau khi component được mount
  useEffect(() => {
    const newFormattedPrices = packages.reduce<{ [key: number]: string }>((acc, item) => {
      acc[item.id] = item.price.toLocaleString();
      return acc;
    }, {});
    setFormattedPrices(newFormattedPrices);
  }, []);

  return (
    <div className="bg-[#d6d6d6] py-16">
      <h1 className="text-4xl text-center mb-12">{t("title")}</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mx-10 md:mx-20">
        {packages.map((item) => (
          <div
            onClick={() => router.push(`/${params.locale}/booking/${item.id}`)}
            key={item.id}
            className="bg-white cursor-pointer hover:shadow-lg hover:scale-105 transform transition-all duration-300 rounded-xl overflow-hidden"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-full h-[300px] object-cover"
            />
            <div className="p-6">
              <h2 className="text-xl font-semibold text-gray-800 mb-2">
                {item.name}
              </h2>
              <p className="text-lg font-medium text-gray-600 mb-4">
                {formattedPrices[item.id] ? `${formattedPrices[item.id]} VNĐ` : 'Đang tải...'}
              </p>
              <p className="text-gray-500 text-sm">{item.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Packages;
