import React from "react";
import { useTranslations } from "next-intl";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";

const Explore = () => {
  const t = useTranslations("Explore");
  const productsList = [
    {
      img: [
        "https://i.pinimg.com/474x/f8/27/56/f82756c02fe36e091bcca8c41c39b05a.jpg",
        "https://i.pinimg.com/474x/02/6d/50/026d50c426b1c334ba46c0f2ba1ac843.jpg",
        "https://i.pinimg.com/474x/4f/db/35/4fdb3534e6200b0a1a8309f12de7d9e9.jpg",
      ],
      title: t("params1"),
    },
    {
      img: [
        "https://i.pinimg.com/474x/1e/3f/04/1e3f048af33ee1dd91256bd795988b56.jpg",
        "https://i.pinimg.com/736x/af/b2/b4/afb2b41bc355d2ed4956c625006058f6.jpg",
        "https://i.pinimg.com/736x/0d/a5/aa/0da5aa9e06dd2b943d64f261855e29d3.jpg",
      ],
      title: t("params2"),
    },
    {
      img: [
        "https://i.pinimg.com/736x/cb/fb/ca/cbfbca54f82e9c87e091574ebdd97ce8.jpg",
        "https://i.pinimg.com/736x/93/85/a4/9385a43a49a0349525595370209ee9c8.jpg",
        "https://i.pinimg.com/736x/bc/74/7b/bc747b86f79a197335ef67883bf1bbc5.jpg",
      ],
      title: t("params3"),
    },
    {
      img: [
        "https://i.pinimg.com/474x/27/1c/4d/271c4de76728b6ce52828eb0515e8f93.jpg",
        "https://i.pinimg.com/474x/3c/f4/72/3cf472def9085c2182570e8490610252.jpg",
        "https://i.pinimg.com/474x/1a/7c/d9/1a7cd92e0f5d70a24b98866b3cfc01fb.jpg",
      ],
      title: t("params4"),
    },
    {
      img: [
        "https://i.pinimg.com/736x/92/c2/7d/92c27d8664dcbed4a0b90e27b54534c8.jpg",
        "https://i.pinimg.com/736x/f6/af/eb/f6afeb05655d23de13fe5d8f5f42f9c2.jpg",
        "https://i.pinimg.com/736x/99/bf/8f/99bf8f355ac7517f93b5f8b7da02ddb3.jpg",
      ],
      title: t("params5"),
    },
  ];

  return (
    <div className="bg-[#B1B0B0] h-fit pt-5">
      <h1 className="text-4xl text-center w-fit h-fit m-auto py-5 px-10 ">
        {t("title")}
      </h1>
      <div className="pt-10">
        <Carousel className="relative">
          <CarouselContent>
            {productsList.map((product, index) => (
              <CarouselItem key={index}>
                <Card className="bg-[#443F3F] h-fit py-16  grid grid-cols-3 ">
                  <div className="col-span-2 grid grid-cols-1 gap-4">
                    <div className="flex gap-2 mx-auto">
                      {product.img.map((img, index) => (
                         <img
                         src={img}
                         key={index}
                         className={`object-cover transition-all duration-500 ${
                           index % 2 === 1 ? "mt-14" : "mb-14"
                         } h-[350px] w-[240px] rounded-3xl hover:translate-y-[-20px]`}
                       />
                      ))}
                    </div>
                  </div>
                  <CardContent className="col-span-1  text-right leading-relaxed flex items-center text-white mr-14">
                    {product.title}
                  </CardContent>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute z-50 left-5 transform transition-transform hover:scale-125 duration-300 ease-in-out" />
          <CarouselNext className="absolute z-50 right-5 transform transition-transform hover:scale-125 duration-300 ease-in-out" />
        </Carousel>
      </div>
    </div>
  );
};

export default Explore;
