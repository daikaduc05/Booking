"use client";
import React, { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { IProductShow } from "@/model/product";


const Explore = ({ productShow }: { productShow: IProductShow[] }) => {
  const t = useTranslations("Explore");


  return (
    <div className="bg-[#B1B0B0] h-fit pt-5">
      <h1 className="text-4xl text-center w-fit h-fit m-auto py-5 px-10 ">
        {t("title")}
      </h1>
      <div className="pt-10">
        {productShow.length === 0 ? (
          <div className="flex items-center justify-center font-semibold pb-5">Chưa có dữ liệu</div>
        ) : (
          <Carousel className="relative">
            <CarouselContent>
              {productShow.map((product, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-[#443F3F] h-fit py-16  grid grid-cols-3 ">
                    <div className="col-span-2 grid grid-cols-1 gap-4">
                      <div className="flex gap-2 mx-auto">
                        {productShow.map((product, index) => (
                          <img
                            src={product.image}
                            key={index}
                            className={`object-cover transition-all duration-500 ${
                              index % 2 === 1 ? "mt-14" : "mb-14"
                            } h-[350px] w-[240px] rounded-3xl hover:translate-y-[-20px]`}
                          />
                        ))}
                      </div>
                    </div>
                    <CardContent className="col-span-1  text-right leading-relaxed flex items-center text-white mr-14">
                      {product.namePackage}
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="absolute z-50 left-5 transform transition-transform hover:scale-125 duration-300 ease-in-out" />
            <CarouselNext className="absolute z-50 right-5 transform transition-transform hover:scale-125 duration-300 ease-in-out" />
          </Carousel>
        )}
      </div>
    </div>
  );
};

export default Explore;
