"use client";
import React from "react";
import { useTranslations } from "next-intl";
import { useParams, useRouter } from "next/navigation";
import { IProductShow, ISlider } from "@/model/product";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";


const Packages = ({ productShow }: { productShow: IProductShow[] }) => {
  const t = useTranslations("Packages");
  const router = useRouter();
  const params = useParams();
  const locale = params.locale;

  const formatStringAsList = (str: string) => {
    return (
      <ul className="list-disc list-inside space-y-2">
        {str.split("/").map((item, index) => (
          <li key={index}>
            {item.trim()}
          </li>
        ))}
      </ul>
    );
  };
 
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
  // console.log(sliders);

  return (
    <div className="bg-[#ffffff] mt-5">
      <div className="py-5 mb-5 bg-[#EDEDED]">
        <h1 className="text-4xl font-bold text-center text-black mb-4 flex items-center justify-center">
          <span className="w-16 border-t-2 border-gray-800 mr-4"></span>
          {t("title")}
          <span className="w-16 border-t-2 border-gray-800 ml-4"></span>
        </h1>
      </div>

      {sliders.length === 0 ? (
        <div className="flex items-center justify-center font-semibold pb-5">
          Chưa có dữ liệu
        </div>
      ) : (
        <Carousel className="relative">
          <CarouselContent>
            {sliders.map((slider, index) => (
              <CarouselItem key={index}>
                <Card className="bg-[#0B0B0B] h-fit py-16 px-5 grid grid-cols-5">
                  <div className="col-span-3 grid grid-cols-1 gap-4">
                    <div className="flex gap-2 mx-auto">
                      {slider.image.map((img: string, index: number) => (
                        <div key={index}>
                          {slider.productId[index] ? (
                            <Image
                              alt="Image description"
                              width={500}
                              height={300}
                              src={img || "https://via.placeholder.com/300"}
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
                  <CardContent className="flex col-span-2  flex-col items-center justify-center text-center text-white p-6 rounded-xl shadow-lg mx-auto max-w-lg">
                    <h1 className="text-3xl font-bold mb-8">
                      {slider.namePackage}
                    </h1>
                    <div className="text-lg text-left mb-6">{formatStringAsList(slider.descriptionPackage)}</div>
                    <button onClick={()=>router.push(`${locale}/booking/${slider.packageId}`)} className="bg-gray-300 text-gray-800 py-2 px-6 rounded-full text-lg font-semibold hover:bg-gray-400 transition duration-300">
                      {t("details")}
                    </button>
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
  );
};

export default Packages;
