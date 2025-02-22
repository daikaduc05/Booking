"use client";
import React, { useEffect, useState } from "react";
import BookingList from "./BookingList";
import { toast } from "react-toastify";
// import { packages } from "@/app/(element)/packages";
import { IPackages } from "@/model/packages";
import axios from "axios";

// const packagesList = packages;

const Page = () => {
  const [search, setSearch] = useState("");
  const [packages, setPackage] = useState<string>("");
  const [packageList, setPackages] = useState<IPackages[]>([]);
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  useEffect(()=>{
    const fetchPackages = async () => {
      try {
        const response = await axios.get("https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages/showAll");
        setPackages(response.data);
      }
      catch (error) {
        console.error("Error fetching packages data:", error);
      }
    }
    fetchPackages();
  })
  
  useEffect(() => {
    if (fromDate && toDate && fromDate > toDate) {
      toast.error("Ngày bắt đầu không thể lớn hơn ngày kết thúc");
      setFromDate("");
      setToDate("");
    }
    // console.log(search, packages, fromDate, toDate);
  }, [search, packages, fromDate, toDate]);
  return (
    <div className="flex justify-end w-full py-10">
      <div className="w-[83%] flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Đặt Lịch</h1>

        {/* Phần Tìm kiếm và bộ lọc */}
        <div className="flex gap-4 items-center justify-between">
          <div className="flex items-center gap-2">
            <input
              onChange={(e) => setSearch(e.target.value)}
              className="w-[300px] rounded-xl h-12 px-4 border border-gray-300 focus:outline-none"
              type="text"
              placeholder="Tìm kiếm theo tên khách hàng"
              value={search}
            />
            <div className="px-2 bg-white rounded-xl">
              <select
                onChange={(e) => setPackage(e.target.value)}
                className="w-fit rounded-xl h-12 px-4  focus:outline-none"
              >
                <option value="">Tất cả gói dịch vụ</option>
                {packageList.map((item, index) => (
                  <option key={index} value={item.name}>
                    {item.name}
                  </option>
                )) }
              </select>
            </div>
          </div>
          <div className="flex items-center gap-2  mr-10">
            <input
              onChange={(e) => setFromDate(e.target.value)}
              className="w-[200px] rounded-xl h-12 px-4 border border-gray-300 focus:outline-none"
              type="date"
              value={fromDate}
            />
            <p className="self-center">Đến</p>
            <input
              onChange={(e) => setToDate(e.target.value)}
              className="w-[200px] rounded-xl h-12 px-4 border border-gray-300 focus:outline-none"
              type="date"
              value={toDate}
            />
          </div>
        </div>

        {/* Bảng danh sách đặt lịch */}
        <div className=" border-gray-300 mr-5">
          <BookingList
            search={search}
            packageName={packages}
            fromDate={fromDate}
            toDate={toDate}
          />
        </div>
      </div>
    </div>
  );
};

export default Page;
