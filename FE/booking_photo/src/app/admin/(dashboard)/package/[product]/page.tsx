"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { IPackagesAdmin } from "@/model/packages";
import { IProduct, IProductShow } from "@/model/product";

const page = () => {
  const [packages, setPackages] = useState<IPackagesAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<IProductShow[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams();
  const product = params.product;
  const router = useRouter();

  const fetchPackagesData = async () => {
    try {
      const packageResponse = await axios.get(
        "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setPackages(packageResponse.data);

      const productResponse = await axios.get(
        `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products/${product}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${sessionStorage.getItem("token")}`,
          },
        }
      );
      setImage(productResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPackagesData();
  }, [loading]);

  const imgView: IProductShow[] = [
    ...(Array.isArray(image) ? image.slice(0, 3) : []),
    ...new Array(
      Math.max(0, 3 - (Array.isArray(image) ? image.length : 0))
    ).fill(null),
  ];

  const packageSelect = packages.find(
    (item) => item.packageId === Number(product)
  );

  const handleSubmit = () => {
    setIsEdit(!isEdit);
    setLoading(!loading);
  };

  debugger;
  const handleSuccess = async (result: any) => {
    if (result.event === "success") {
      try {
        const uploadedImageUrl: string = result.info.secure_url;
        await axios.post(
          `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products/create/${product}`,
          { image: uploadedImageUrl },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  return (
    <div className="flex justify-end h-screen w-full pt-10">
      <div className="w-[83%] flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Thông tin gói</h1>
        <h2 className="text-center text-sm font-semibold bg-gray-50 text-black rounded-2xl w-fit px-4 py-2">
          Gói {packageSelect?.name.toLocaleLowerCase()}
        </h2>

        <div className="grid grid-cols-3 gap-6 mr-10">
          {imgView.map((item, index) => (
            <div
              key={index}
              className="bg-white flex-1 h-[250px] p-4 rounded-lg shadow-md"
            >
              {!isEdit || item ? (
                item ? (
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={item?.image || "/images/checked.svg"}
                    alt={`image-${index}`}
                  />
                ) : (
                  <p className="w-full font-semibold h-full justify-center items-center text-center">
                    Chưa có ảnh
                  </p>
                )
              ) : (
                <CldUploadWidget
                  uploadPreset="booking_photo"
                  onSuccess={handleSuccess}
                >
                  {({ open }) => (
                    <button
                      onClick={() => open()}
                      className="bg-blue-500 text-white py-2 px-6 rounded-full shadow-md hover:bg-blue-400 transition-all duration-300"
                    >
                      Tải lên Hình ảnh
                    </button>
                  )}
                </CldUploadWidget>
              )}
            </div>
          ))}
        </div>

        <div className="bg-gray-700 font-semibold text-white h-fit mr-10 rounded-xl p-4">
          {packageSelect?.description}
        </div>
      </div>

      <div className="flex items-center fixed bottom-0 right-0 mr-10 mb-7 gap-4 z-50">
        <Button
          className="bg-blue-600 hover:bg-blue-500"
          onClick={() => router.push("/admin/package")}
        >
          Quay lại
        </Button>
        {!isEdit ? (
          <Button
            onClick={handleSubmit}
            className="bg-yellow-500 hover:bg-yellow-400"
          >
            Sửa ảnh
          </Button>
        ) : (
          <Button
            onClick={handleSubmit}
            className="bg-green-600 hover:bg-green-500"
          >
            Lưu
          </Button>
        )}
      </div>
    </div>
  );
};

export default page;
