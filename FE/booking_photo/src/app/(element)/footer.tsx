import React from "react";
import { FaPhoneAlt, FaEnvelope, FaInstagram } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { useTranslations } from "next-intl";


const Footer = () => {
  const t = useTranslations("Footer");
  return (
    <div className="bg-white p-6">
      <div className="flex justify-between mx-20 items-start">
        <div className="flex flex-col">
          <h2 className="font-semibold text-lg">{t("title")}</h2>
          <div className="flex flex-col gap-2 mt-2">
            <div className="flex items-center cursor-pointer hover:translate-x-5 hover:text-green-500 hover:scale-105 duration-300 gap-2">
              <FaPhoneAlt size={16} />
              +84 123 456 789
            </div>
            <div className="flex items-center cursor-pointer hover:translate-x-5 hover:text-red-500 hover:scale-105 duration-300 gap-2">
              <FaEnvelope size={16} />
              booking@gmail.com
            </div>
            <div className="flex items-center cursor-pointer hover:translate-x-5 hover:text-purple-500 hover:scale-105 duration-300 gap-2">
              <Link target="_blank" rel="noopener noreferrer" className="flex items-center gap-2" href="https://www.instagram.com/duckb12/">
                <FaInstagram size={16} />
                duckb12
              </Link>
            </div>
          </div>
        </div>

        <div className="flex flex-col text-left">
          <h2 className="font-semibold text-lg">{t("address")}</h2>
          <a
            href="https://maps.app.goo.gl/9T9XAZ9LAztWK67z9"
            target="_blank"
            className="flex justify-end items-center gap-2 mt-2 hover:text-black text-gray-700 cursor-pointer hover:scale-105 duration-300"
          >
            <MdLocationOn size={20} />
            <p>123 Street, City, Country</p>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
