"use client";
import { packages } from "@/app/(element)/packages";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { CldUploadButton, CldUploadWidget } from 'next-cloudinary';

const page = () => {
  const params = useParams();
  const product = params.product;
  const packageSelect = packages.find((item) => item.id === Number(product));
  const products = packageSelect?.productId.slice(0, 3);
  console.log(products);
  const handleEdit = () => {};
  const router = useRouter();
  console.log(packageSelect);
  return (
    <div className="flex justify-end h-screen w-full pt-10 ">
      <div className="w-[83%] flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Thông tin gói</h1>
        <h2 className="text-center text-sm font-semibold bg-gray-50 text-black rounded-2xl w-fit px-4 py-2">
          {" "}
          Gói {packageSelect?.name.toLocaleLowerCase()}
        </h2>
        <div className=" grid grid-cols-3 gap-6 mr-10 ">
          {products?.map((item, index) => (
            <div
              key={index}
              className="bg-white flex-1 h-[250px] p-4 rounded-lg shadow-md"
            >
              {!item ? (
                <img
                  className="object-cover"
                  src="/images/checked.svg"
                  alt="checked"
                />
              ) : (
                <CldUploadWidget uploadPreset="<Your Upload Preset>">
                {({ open }) => {
                  return (
                    <button onClick={() => open()}>
                      Upload an Image
                    </button>
                  );
                }}
              </CldUploadWidget>
              )}
            </div>
          ))}
        </div>
        <div className="bg-gray-700 font-semibold text-white h-fit mr-10 rounded-xl p-4 ">
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
        <Button
          onClick={() => handleEdit()}
          className="bg-yellow-500 hover:bg-yellow-400"
        >
          Sửa ảnh
        </Button>
      </div>
    </div>
  );
};

export default page;
