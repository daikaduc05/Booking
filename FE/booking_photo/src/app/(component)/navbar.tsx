"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { AiOutlineGlobal } from "react-icons/ai";

export const scrollToSection = (sectionId: string) => {
  const section = document.getElementById(sectionId);
  if (section) {
    section.scrollIntoView({ behavior: "smooth" });
  }
};

const Navbar = () => {
  const params = useParams();
  const [language, setLanguage] = useState(params.locale);
  const [isScrolled, setIsScrolled] = useState(false);
  const [showNavbar, setShowNavbar] = useState(true);
  const [lastScrollPos, setLastScrollPos] = useState(0);
  const t = useTranslations("Navbar");
  const router = useRouter();

  const navbar = [
    { title: "home", id: "home" },
    { title: "explore", id: "discover" },
    { title: "packages", id: "packages" },
    { title: "rating", id: "reviews" },
    { title: "contact", id: "contacts" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollPos = window.scrollY;
      if (currentScrollPos > lastScrollPos) {
        setShowNavbar(false);
      } else {
        setShowNavbar(true);
      }
      setLastScrollPos(currentScrollPos);
      if (window.scrollY > 300) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollPos]);

  useEffect(() => {
    router.push(`/${language}`);
  }, [router, language]);

  return (
    <div className="w-screen underline">
      <div
        className={`
          fixed z-50 w-screen top-0 px-10 pt-[20px]
          flex flex-col transition-all duration-500 ease-in-out transform
          ${isScrolled ? "bg-black bg-opacity-90" : "bg-transparent"}
          ${showNavbar ? "translate-y-0" : "-translate-y-full"}
        `}
      >
        <div className="flex items-center justify-between">
          <div className="flex flex-col items-center justify-center">
            <div className="px-10 h-[40px] top-0 z-50 flex items-center gap-14">
              {navbar.map((item, index) => (
                <div
                  onClick={() => scrollToSection(item.id)}
                  key={index}
                  className="relative group inline-block text-xl text-white cursor-pointer duration-500"
                >
                  <span>{t(`${item.title}`)}</span>
                  <span className="absolute -bottom-2 left-0 h-[2px] bg-white w-0 transition-all duration-500 group-hover:w-1/2"></span>
                  <span className="absolute -top-1 right-0 h-[2px] bg-white w-0 transition-all duration-500 group-hover:w-1/2"></span>
                </div>
              ))}
            </div>
          </div>
          <div className="flex items-center gap-5 ml-2">
            <div className="flex gap-2 items-start">
              <AiOutlineGlobal className="text-white text-2xl" />
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="text-white border-none outline-none transition-all ease-in-out cursor-pointer duration-300 bg-transparent"
              >
                <option className="bg-black text-white" value="vn">
                  VN
                </option>
                <option className="bg-black text-white" value="en">
                  EN
                </option>
              </select>
            </div>
          </div>
        </div>
        <div className="w-full mt-2 h-[1px] bg-white"></div>
      </div>
    </div>
  );
};

export default Navbar;
