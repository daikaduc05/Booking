"use client";
import React, { useEffect, useState } from "react";
import { FaArrowCircleDown, FaArrowCircleUp } from "react-icons/fa";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";

const Navbar = () => {
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };
  const params = useParams();
  const [language, setLanguage] = useState(params.locale);
  const t = useTranslations("Navbar");
  const router = useRouter();
  const navbar = [
    {
      title: "home",
      id: "home",
    },
    {
      title: "explore",
      id: "discover",
    },
    {
      title: "packages",
      id: "packages",
    },
    {
      title: "rating",
      id: "reviews",
    },
    {
      title: "contact",
      id: "contacts",
    },
  ];
  useEffect(() => {
    router.push(`/${language}`);
  }, [router, language]);

  return (
    <div className="bg-none">
      <div
        className={`flex flex-col fixed z-10  px-10 w-screen top-0 underline-offset-1 transition-all duration-500 ease-in-out transform`}
      >
        <div className="flex flex-col lg:flex-row items-center justify-between">
          <div className=" pl-10 h-[100px] top-0 z-50 flex flex-col lg:flex-row items-center">
            {navbar.map((item, index) => (
              <div
                onClick={() => scrollToSection(item.id)}
                key={index}
                className="h-full w-[160px] duration-300 cursor-pointer hover:underline text-white flex items-center justify-center"
              >
                {t(`${item.title}`)}
              </div>
            ))}
          </div>
          <div className="flex flex-col lg:flex-row items-center gap-5 ml-2">
            <div className="flex flex-col lg:flex-row gap-2 items-center">
              <Image
                src={`${
                  language === "vn"
                    ? "https://th.bing.com/th/id/R.58ec68d1566a4131ccf6853f2126742f?rik=R8ycwx8d5ucu7g&pid=ImgRaw&r=0"
                    : "https://th.bing.com/th/id/OIP.U-h9wYdOSH047roWjY_1TgHaE3?rs=1&pid=ImgDetMain"
                }`}
                alt="Description of the image"
                className="size-8 rounded-full object-cover"
                loading="lazy"
                width={500}
                height={500}
                title="Image Title"
                style={{ border: "2px solid #ccc" }}
                draggable={false}
              />

              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-white border-none outline-none transition-all ease-in-out cursor-pointer duration-300 hover:text-[#cfcece]"
              >
                <option value="vn">VN</option>
                <option value="en">EN</option>
              </select>
            </div>
            {/* <button
              onClick={() => scrollToSection("packages")}
              className="w-[120px] h-[50px] rounded-lg bg-[#c4c4c4] hover:bg-[#b0aeae] shadow-lg duration-300"
            >
              {t("book")}
            </button> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
