"use client";
import React, { useEffect, useState } from "react";
import {useTranslations} from 'next-intl';
import Image from "next/image";

const Home = () => {
  const [inViewImg1, setInViewImg1] = useState(false);
  const [inViewText1, setInViewText1] = useState(false);
  const [inViewImg2, setInViewImg2] = useState(false);
  const [inViewText2, setInViewText2] = useState(false);
  const [key, setKey] = useState(0);
  const t = useTranslations("Home");
  const text = t("text");

  useEffect(() => {
    const interval = setInterval(() => {
      setKey((prevKey) => prevKey + 1);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.id === "img1") {
              setInViewImg1(true);
            }
            if (entry.target.id === "text1") {
              setInViewText1(true);
            }
            if (entry.target.id === "img2") {
              setInViewImg2(true);
            }
            if (entry.target.id === "text2") {
              setInViewText2(true);
            }
          } else {
            if (entry.target.id === "img1") {
              setInViewImg1(false);
            }
            if (entry.target.id === "text1") {
              setInViewText1(false);
            }
            if (entry.target.id === "img2") {
              setInViewImg2(false);
            }
            if (entry.target.id === "text2") {
              setInViewText2(false);
            }
          }
        });
      },
      {
        threshold: 0.3, // Khi 30% phần tử xuất hiện trong viewport
      }
    );

    const elements = document.querySelectorAll(".animate-on-scroll");
    elements.forEach((el) => observer.observe(el));

    // Dọn dẹp observer khi component bị unmount
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="bg-[#d8d8d8] min-h-screen  flex flex-col">
      <h1
        key={key}
        className="h-[100px] flex justify-center items-center text-3xl font-semibold"
      >
        {text.split("").map((char, index) => (
          <span
            key={index}
            className={`inline-block overflow-hidden animate-text-reveal`}
            style={{
              animationDelay: `${index * 0.08}s`, // Vẫn cần phải sử dụng animation delay
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </h1>
        
      {/* First Section */}
      <div className="flex items-center justify-between h-[50%] gap-10 px-8">
        <Image
          id="img1"
          src="https://i.pinimg.com/736x/1f/9b/2a/1f9b2adfaf6052055d5754b1c49464a9.jpg"
          alt="booking_photo"
          width={700}
          height={400}
          className={`object-cover h-screen py-5  rounded-[80px] transition-all duration-1000 animate-on-scroll ${
            inViewImg1
              ? "translate-y-0 opacity-100"
              : "translate-y-[100px] opacity-0"
          }`}
        />
        <div
          id="text1"
          className={` w-[50%] pr-10 text-center  transition-all duration-1000 animate-on-scroll ${
            inViewText1 ? "opacity-100" : "opacity-0"
          }`}
        >
          <h1 className="font-semibold text-4xl pb-5">{t('title')}</h1>
          <p className="text-lg w-[90%] mx-auto leading-[50px]  text-justify">
           {t('params1')}
          </p>
        </div>
      </div>

      {/* Second Section */}
      <div className="flex items-center h-[50%] gap-10 px-8">
        <p
          id="text2"
          className={`w-[50%] text-justify leading-[50px] pr-10 pl-10 text-lg transition-all duration-1000 animate-on-scroll ${
            inViewText2 ? "opacity-100" : "opacity-0"
          }`}
        >
         {t('params2')}
        </p>
        <Image
          id="img2"
          src="https://i.pinimg.com/736x/79/aa/ea/79aaea1782152703088ae82f47fce5f9.jpg"
          alt="booking_photo_2"
          width={800}
          height={500}
          className={`object-cover h-screen py-5 rounded-[80px] transition-all duration-1000 animate-on-scroll ${
            inViewImg2
              ? "translate-y-0 opacity-100"
              : "translate-y-[100px] opacity-0"
          }`}
        />
      </div>
    </div>
  );
};

export default Home;
