import { IPackagesAdmin } from "@/model/packages";
import { IProductShow } from "@/model/product";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import axios from "axios";
import Image from "next/image";
import { formatStringAsList } from "@/app/(element)/packages";

const PackageInfo = ({
  selectPackages,
}: {
  selectPackages: IPackagesAdmin | undefined;
}) => {
  const t = useTranslations("PackageInfo");
  const [productList, setProductList] = useState<IProductShow[]>([]);
  const [viewProduct, setViewProduct] = useState<IProductShow | null>(null);
  
  useEffect(() => {
    const fetchProducts = async () => {
      if (!selectPackages?.packageId) {
        console.error("Package ID is not available.");
        return;
      }

      try {
        const res = await axios.get(
          `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products/${selectPackages.packageId}`,
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );

        // Ensure response data is an array
        if (Array.isArray(res.data)) {
          setProductList(res.data);
          setViewProduct(res.data[res.data.length - 1] || null); // Set to last product
        } else {
          console.error("Invalid data format received from the API");
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    // Fetch products only if packageId exists
    if (selectPackages?.packageId) {
      fetchProducts();
    }
  }, [selectPackages?.packageId]);

  const imgView: IProductShow[] = [
    ...(Array.isArray(productList)
      ? productList.sort((a, b) => b.productId - a.productId).slice(0, 4)
      : []),
    ...new Array(Math.max(0, 4 - productList.length)).fill(null),
  ];

  return (
    <div className="flex flex-col items-center justify-start h-fit px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col items-center justify-center bg-white shadow-xl rounded-2xl border p-6 w-full max-w-xl">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-8 w-full">
          <div className="flex flex-shrink-0 w-full sm:w-[50%] h-[300px] sm:h-[400px] justify-center bg-gray-200 rounded-xl">
            {viewProduct?.image ? (
              <Image
                width={400}
                height={400}
                className="object-cover w-full h-full rounded-lg"
                src={viewProduct?.image || "/images/placeholder.svg"}
                alt="Product view"
                loading="lazy"
              />
            ) : (
              <></>
            )}
          </div>
          <div className="flex flex-col justify-center items-start gap-4 w-full sm:w-[45%]">
            <h2 className="text-xl font-semibold">{selectPackages?.name}</h2>
            <p className="text-lg text-gray-600">
              {t("from")} {selectPackages?.price.toLocaleString()} VNĐ
            </p>
            <div className="text-sm text-gray-500">
              {formatStringAsList(selectPackages?.description || "")}
            </div>
          </div>
        </div>

        <div className="mt-8 w-full flex flex-wrap gap-4 justify-start">
          {imgView.map((product, index) => (
            <div
              key={index}
              className="w-[80px] sm:w-[100px] h-[80px] hover:scale-105 hover:-translate-y-2 duration-300 sm:h-[100px] border-2 border-gray-300 rounded-md overflow-hidden cursor-pointer"
              onClick={() => setViewProduct(product)}
            >
              <>
                {product?.image ? (
                  <Image
                    width={100}
                    height={100}
                    className="object-cover w-full h-full"
                    src={product?.image || "/images/placeholder.svg"}
                    alt="Product thumbnail"
                    loading="lazy"
                  />
                ) : (
                  <></>
                )}
              </>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PackageInfo;
