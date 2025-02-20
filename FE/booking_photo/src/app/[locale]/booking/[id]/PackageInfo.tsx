import { IPackages } from "@/model/packages";
import { IProduct } from "@/model/product";
import React, { useState } from "react";
import { useTranslations } from "next-intl";

const Product: IProduct[] = [
  {
    id: 1,
    img: "https://i.pinimg.com/474x/f8/27/56/f82756c02fe36e091bcca8c41c39b05a.jpg",
    packageId: 1,
  },
  {
    id: 2,
    img: "https://i.pinimg.com/474x/02/6d/50/026d50c426b1c334ba46c0f2ba1ac843.jpg",
    packageId: 1,
  },
  {
    id: 3,
    img: "https://i.pinimg.com/474x/4f/db/35/4fdb3534e6200b0a1a8309f12de7d9e9.jpg",
    packageId: 1,
  },
  {
    id: 4,
    img: "https://i.pinimg.com/474x/8f/89/05/8f890560d2a8fa410613af2e6b427128.jpg",
    packageId: 1,
  },
];

const PackageInfo = ({
  selectPackages,
}: {
  selectPackages: IPackages | undefined;
}) => {
  const t = useTranslations("PackageInfo");
  const productList = Product.filter(
    (item) =>
      (item as IProduct & { packageId: number }).packageId ===
      selectPackages?.id
  );
  const [viewProduct, setViewProduct] = useState<IProduct>(productList[0]);

  return (
    <div className="flex flex-col items-center justify-start h-fit  px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl border p-6 w-full max-w-xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
          <div className="flex flex-shrink-0 w-full sm:w-[50%] h-[300px] sm:h-[400px] justify-center bg-gray-200 rounded-xl">
            <img
              className="object-cover w-full h-full rounded-lg"
              src={viewProduct?.img}
              alt="Product view"
            />
          </div>
          <div className="flex flex-col justify-center items-start gap-4 w-full sm:w-[45%]">
            <h2 className="text-xl font-semibold">{selectPackages?.name}</h2>
            <p className="text-lg text-gray-600">
              {t("from")} {selectPackages?.price.toLocaleString()} VNĐ
            </p>
            <p className="text-sm text-gray-500">
              {selectPackages?.description}
            </p>
          </div>
        </div>

        {/* Product images thumbnails */}
        <div className="mt-8 w-full flex flex-wrap gap-4 justify-start">
          {productList.map((item, index) => (
            <div
              key={index}
              className="w-[80px] sm:w-[100px] h-[80px] hover:scale-105 hover:-translate-y-2 duration-300 sm:h-[100px] border-2 border-gray-300 rounded-md overflow-hidden cursor-pointer"
              onClick={() => setViewProduct(item)}
            >
              <img
                className="object-cover w-full h-full"
                src={item.img}
                alt="Product thumbnail"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageInfo;
