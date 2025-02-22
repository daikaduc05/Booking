"use client";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import { IPackages, IPackagesAdmin } from "@/model/packages";
import axios from "axios";
import { IProduct } from "@/model/product";

const Page = () => {
  const [packages, setPackages] = useState<IPackagesAdmin[]>([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState<IProduct[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const params = useParams();
  const product = params.product;
  
  useEffect(() => {
    try {
      const fetchPackages = async () => {
        const res = await axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (res) {
          setPackages(res.data);
        }
        const resImage = await axios.get(
          `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products/${product}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if(resImage){
          setImage(resImage.data);
        }
      };
      fetchPackages();
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  }, []);

  // Ensure imgView always has 3 items by filling with null if needed
  const imgView = [...image.slice(0, 3), ...new Array(3 - image.length).fill(null)];

  const packageSelect = packages.find(
    (item) => item.packageId === Number(product)
  );
  const router = useRouter();

  const handleSubmit = () => {
    try {
      // Add your submit logic here
    } catch (error) {
      console.error("Error fetching data:", error);
    }
    setIsEdit(!isEdit);
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
            <div key={index} className="bg-white flex-1 h-[250px] p-4 rounded-lg shadow-md">
              {!isEdit || item ? (
                // If item exists, display the image; otherwise, display placeholder
                item ? (
                  <img className="object-cover" src={item.imageUrl || "/images/checked.svg"} alt={`image-${index}`} />
                ) : (
                  <p className=" w-full font-semibold h-full justify-center items-center text-center">
                    Chưa có ảnh
                  </p>
                )
              ) : (
                <CldUploadWidget
                uploadPreset="booking_photo"
                // signatureEndpoint="cloudinary://531832965633749:mj3jQYvl5XXKMe75MfFNVuwIF54@duthdtp8y"
              >
                {({ open }) => (
                  <button
                    onClick={() => open()}
                    className="px-6 py-2 text-white bg-blue-600 hover:bg-blue-500 rounded-full flex items-center gap-2"
                  >
                    {/* You can use any icon or just text */}
                    <span>Upload Image</span>
                    {/* Optionally, add an icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M3 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H5a2 2 0 01-2-2V5zm2 0v10h12V5H5zm1 4a1 1 0 011-1h4a1 1 0 110 2H7a1 1 0 01-1-1z" clipRule="evenodd" />
                    </svg>
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
            onClick={() => setIsEdit(!isEdit)}
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

export default Page;
