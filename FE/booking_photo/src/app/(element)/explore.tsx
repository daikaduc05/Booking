"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";

const Explore = () => {
  const t = useTranslations("Explore");
  const [image, setImage] = useState(
    "https://i.pinimg.com/736x/25/cd/2b/25cd2bb189bc121450decdc205bc2ef8.jpg"
  );
  const [isTransitioning, setIsTransitioning] = useState(false);

  const exploreItems = [
    {
      text: t("params1"),
      image:
        "https://i.pinimg.com/736x/3e/eb/8c/3eeb8c716957bd3a6b217778e9fab3b2.jpg",
    },
    {
      text: t("params2"),
      image:
        "https://i.pinimg.com/736x/15/8d/6f/158d6f79e964bd2c98420eb3a54759ff.jpg",
    },
    {
      text: t("params3"),
      image:
        "https://i.pinimg.com/736x/05/7f/fe/057ffe0f5adac8c51cf44e105e290d8e.jpg",
    },
    {
      text: t("params4"),
      image:
        "https://i.pinimg.com/736x/81/42/a2/8142a2a78e0830885e185d991b4e3e1d.jpg",
    },
    {
      text: t("params5"),
      image:
        "https://i.pinimg.com/474x/38/7a/28/387a284353e7c0c7b1f0adfe6e46d0c5.jpg",
    },
  ];

  const handleChangeImage = (newImage: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setImage(newImage);
      setIsTransitioning(false);
    }, 200); 
  };

  return (
    <div className="max-h-screen grid grid-cols-5 w-full max-w-screen-xl py-5 mx-auto mb-10">
      <div className="col-span-2 flex justify-center items-center">
        <Image
          width={450}
          height={450}
          src={image}
          alt="hero"
          className={`object-cover rounded-3xl transition-opacity duration-300 ${
            isTransitioning ? "opacity-0" : "opacity-100"
          }`}
        />
      </div>

      <div className="col-span-3 p-8 flex flex-col justify-center bg-gray-200 rounded-3xl shadow-lg">
        <h1 className="text-4xl font-bold text-center text-black mb-4">
          {t("title")}
        </h1>
        <p className="mb-6 text-xl text-center text-gray-700 font-medium">
          {t("title2")}
        </p>

        <ul className="list-disc pl-6 flex flex-col gap-4">
          {exploreItems.map((item, index) => (
            <li
              key={index}
              className="cursor-pointer mb-3 text-lg text-gray-700 hover:scale-105 hover:text-black hover:translate-x-4 duration-300"
              onClick={() => handleChangeImage(item.image)}
            >
              {item.text}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Explore;
