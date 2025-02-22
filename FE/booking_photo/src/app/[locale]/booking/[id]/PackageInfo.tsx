import { IPackages, IPackagesAdmin } from "@/model/packages";
import { IProduct } from "@/model/product";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";



const PackageInfo = ({
  selectPackages,
}: {
  selectPackages: IPackagesAdmin | undefined;
}) => {
  const t = useTranslations("PackageInfo");
  const [productList, setProductList] = useState<IProduct[]>([]);
  const [viewProduct, setViewProduct] = useState<IProduct>(productList[0]);
  // useEffect(() => {
  //   const fetchProducts = async () => {
  //     try {
  //       const res = await axios.get(
  //         `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products/${selectPackages?.packageId}`,{
  //           headers: {
  //             "Content-Type": "application/json",
  //           }
  //         }
  //       );
  //       if (res) {
  //         setProductList(res.data);
  //         setViewProduct(res.data[0]);
  //       }
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchProducts();
  // },[])

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
