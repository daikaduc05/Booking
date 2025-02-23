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
import { IProductShow, ISlider } from "@/model/product";

const Explore = ({ productShow }: { productShow: IProductShow[] }) => {
  const t = useTranslations("Explore");

  const groupByPackage = (products: IProductShow[]): ISlider[] => {
    const grouped: Record<number, ISlider> = {};

    products.forEach((product) => {
      if (!grouped[product.packageId]) {
        grouped[product.packageId] = {
          productId: [],
          image: [],
          packageId: product.packageId,
          namePackage: product.namePackage,
          descriptionPackage: product.descriptionPackage,
        };
      }

      grouped[product.packageId].productId.push(product.productId);
      grouped[product.packageId].image.push(product.image);
    });

    return Object.values(grouped).map((slider) => {
      return {
        ...slider,
        productId: slider.productId.slice(0, 3),
        image: slider.image.slice(0, 3),
      };
    });
  };

  const sortedProducts = [...productShow].sort(
    (a, b) => b.productId - a.productId
  );

  const sliders = groupByPackage(sortedProducts);

  return (
    <div className="bg-[#B1B0B0] h-fit pt-5">
      <h1 className="text-4xl text-center w-fit h-fit m-auto py-5 px-10 ">
        {t("title")}
      </h1>
      <div className="pt-10">
        {sliders.length === 0 ? (
          <div className="flex items-center justify-center font-semibold pb-5">
            Chưa có dữ liệu
          </div>
        ) : (
          <Carousel className="relative">
            <CarouselContent>
              {sliders.map((slider, index) => (
                <CarouselItem key={index}>
                  <Card className="bg-[#443F3F] h-fit py-16 grid grid-cols-3">
                    <div className="col-span-2 grid grid-cols-1 gap-4">
                      <div className="flex gap-2 mx-auto">
                        {slider.image.map((img, index) => (
                          <div key={index}>
                            {slider.productId[index] ? (
                              <img
                                src={img || "https://via.placeholder.com/300"} // fallback if no image
                                key={index}
                                className={`object-cover transition-all duration-500 ${
                                  index % 2 === 1 ? "mt-14" : "mb-14"
                                } h-[350px] w-[240px] rounded-3xl hover:translate-y-[-20px]`}
                              />
                            ) : (
                              <></>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                    <CardContent className="col-span-1 text-right leading-relaxed flex items-center text-white mr-14">
                      {slider.descriptionPackage}
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
