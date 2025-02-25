"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import { CldUploadWidget } from "next-cloudinary";
import { IPackagesAdmin } from "@/model/packages";
import {  IProductShow } from "@/model/product";
import { TiDelete } from "react-icons/ti";
import Swal from "sweetalert2";


const Page = () => {
  const [packages, setPackages] = useState<IPackagesAdmin[]>([]);
  const [images, setImages] = useState<IProductShow[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [loading, setLoading] = useState(false);

  const { product } = useParams();
  const router = useRouter();

  // Fetch gói và hình ảnh khi trang tải
  const fetchPackagesData = async () => {
    try {
      const token = sessionStorage.getItem("token");
      const [packageResponse, productResponse] = await Promise.all([
        axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
        axios.get(
          `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products/${product}`,
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        ),
      ]);

      setPackages(packageResponse.data);
      setImages(productResponse.data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    fetchPackagesData();
  }, [product, loading]);

  const imgView = [
    ...images.slice(0, 4),
    ...new Array(4 - images.length).fill(null),
  ];

  const handleSuccess = async (result: any) => {
    if (result.event === "success") {
      const uploadedImageUrl = result.info.secure_url;
      try {
        const token = sessionStorage.getItem("token");
        await axios.post(
          `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products/create/${product}`,
          { image: uploadedImageUrl },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setLoading(!loading);
        setIsEdit(!isEdit);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    }
  };

  const handleDelete = async (productId: number) => {
    Swal.fire({
      title: "Bạn có chắc chắn muốn xóa ảnh này?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa",
      cancelButtonText: "Hủy",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const token = sessionStorage.getItem("token");
          await axios.delete(
            `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/products/delete/${product}/${productId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setLoading(!loading);
        } catch (error) {
          console.error("Error deleting image:", error);
        }
      }
    });
  };

  const packageSelect = packages.find(
    (item) => item.packageId === Number(product)
  );

  return (
    <div className="flex justify-end h-screen w-full pt-10">
      <div className="w-[83%] flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Thông tin gói</h1>
        <h2 className="text-center text-sm font-semibold bg-gray-50 text-black rounded-2xl w-fit px-4 py-2">
          Gói {packageSelect?.name.toLowerCase()}
        </h2>

        <div className="grid grid-cols-4 gap-6 mr-10">
          {imgView.map((item, index) => (
            <div
              key={index}
              className="bg-white flex-1 h-[250px] flex items-center justify-center p-4 relative rounded-lg shadow-md"
            >
              {item ? (
                <>
                  <img
                    className="object-cover w-full h-full rounded-lg"
                    src={item?.image || "/images/checked.svg"}
                    alt={`image-${index}`}
                  />
                  <button
                    onClick={() => handleDelete(item.productId)}
                    className="absolute top-0 right-0 text-black hover:opacity-60 text-3xl transition-all duration-300"
                  >
                    <TiDelete />
                  </button>
                </>
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
      </div>
    </div>
  );
};

export default Page;
