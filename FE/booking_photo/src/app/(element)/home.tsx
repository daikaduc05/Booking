"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { scrollToSection } from "../(component)/navbar";

const Home = () => {
  const t = useTranslations("Home");
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#d8d8d8] bg-[url('https://i.pinimg.com/736x/14/e3/10/14e310a020cc3ac402dd5aa1ffdbf9f8.jpg')] bg-cover bg-center bg-no-repeat">
      <div className="absolute inset-0 bg-black/50"></div>
      <div className="relative z-10 w-[90%] md:w-[60%] lg:w-[40%] flex flex-col items-center text-center">
        <div>
          <h1 className="text-4xl md:text-6xl font-bold text-white flex items-center justify-center fadeInUpLoop">
            <span>{t('params1')}</span>
            <span className="mx-4 text-2xl md:text-4xl">—</span>
            <span>{t('params2')}</span>
          </h1>
          <p className="text-white mt-4 text-sm md:text-base lg:text-lg fadeInUpLoop delay-300">
            {t('params3')}
          </p>
          <style jsx>{`
            @keyframes fadeInUpLoop {
              0% {
                opacity: 0;
                transform: translateY(20px);
              }
              42.86% {
                opacity: 1;
                transform: translateY(0);
              }
              100% {
                opacity: 1;
                transform: translateY(0);
              }
            }
            .fadeInUpLoop {
              animation: fadeInUpLoop 5.5s ease-out infinite;
            }
            .delay-300 {
              animation-delay: 0.3s;
            }
          `}</style>
        </div>

        <button
          onClick={() => scrollToSection("packages")}
          className="bg-white text-black px-8 py-2 z-0 rounded-full mt-8 font-semibold hover:bg-gray-400 transition duration-300"
        >
          {t('book')}
        </button>
      </div>
    </div>
  );
};

export default Home;
