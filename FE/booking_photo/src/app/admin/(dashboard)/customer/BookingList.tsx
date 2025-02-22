import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IBookingFormShow } from "@/model/bookingForm";
import Swal from "sweetalert2";
import axios from "axios";
import { headers } from "next/headers";

const title = [
  "Tên",
  "Ngày",
  "Giờ",
  "Gói",
  "Địa chỉ",
  "Giá",
  "Trạng thái",
  "Thao tác",
];

const BookingList = ({
  search,
  packageName,
  fromDate,
  toDate,
}: {
  search: string;
  packageName: string;
  fromDate: string;
  toDate: string;
}) => {
  const removeAccents = (str: string | undefined | null): string => {
    if (typeof str !== "string") {
      return "";
    }
    return str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/đ/g, "d")
      .replace(/Đ/g, "D");
  };

  const [bookingList, setBookingList] = useState<IBookingFormShow[]>([]);
  // const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/formBookings/showAll"
        );
        setBookingList(response.data);
      } catch (error) {
        console.error("Error fetching booking data:", error);
      }
    };
    fetchData();
  });

  useEffect(() => {
    let filteredList = bookingList;

    // Filter by search
    if (search) {
      filteredList = filteredList.filter((item) =>
        removeAccents(item.name)
          .toLowerCase()
          .includes(removeAccents(search).toLowerCase())
      );
    }

    // Filter by packageName
    if (packageName) {
      filteredList = filteredList.filter(
        (item) => item.packageName === packageName
      );
    }

    // Filter by date range
    if (fromDate && toDate) {
      filteredList = filteredList.filter(
        (item) =>
          item.bookingTime >= new Date(fromDate) &&
          item.bookingTime <= new Date(toDate)
      );
    }

    setBookingList(filteredList);
  }, [search, packageName, fromDate, toDate]);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString("vi-VN");
  };

  const formatTime = (date: Date): string => {
    return date.toLocaleTimeString("vi-VN");
  };

  const formatPrice = (price: number): string => {
    return price.toLocaleString("vi-VN");
  };

  const handleChangeStatus = async (id: number) => {
    Swal.fire({
      title: `Bạn chắc chắn sẽ duyệt, bạn sẽ không thể hoàn tác?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: `duyệt`,
      cancelButtonText: "Hủy",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(
            `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/formBookings/approve/${id}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );

          if (res) {
            const updatedBookingList = bookingList.map((item) =>
              item.id === id ? { ...item, status: true } : item
            );
            setBookingList(updatedBookingList);
            Swal.fire({
              title: "Đã duyệt",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error fetching booking data:", error);
          Swal.fire({
            title: "Lỗi",
            text: "Có lỗi xảy ra khi duyệt booking. Vui lòng thử lại!",
            icon: "error",
          });
        }
      }
    });
  };

  const handleDeleteItem = async (idDelete: number) => {
    Swal.fire({
      title: "Bạn chắc chắn xóa thông tin này không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.delete(
            `http://localhost:8080/formBookings/delete/${idDelete}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          if (res) {
            const newBookingList = bookingList.filter(
              (item) => item.id !== idDelete
            );
            setBookingList(newBookingList);
            Swal.fire({
              title: "Đã xóa!",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error delete booking data:", error);
          Swal.fire({
            title: "Lỗi",
            text: "Có lỗi xảy ra khi xóa item. Vui lòng thử lại!",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div>
      {bookingList.length === 0 ? (
        <div className="w-full h-[300px] font-semibold text-xl flex items-center justify-center">
          Chưa có lịch đặt nào !
        </div>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              {title.map((item, index) => (
                <TableHead key={index}>{item}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {bookingList.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{formatDate(item.bookingTime)}</TableCell>
                <TableCell>{formatTime(item.bookingTime)}</TableCell>
                <TableCell>{item.packageName}</TableCell>
                <TableCell>{item.location}</TableCell>
                <TableCell>{formatPrice(item.packagePrice)} VNĐ</TableCell>
                <TableCell
                  className={`${
                    item.status ? "text-green-500" : "text-yellow-500"
                  } font-bold`}
                >
                  {item.status ? "Đã duyệt" : "Chờ duyệt"}
                </TableCell>
                <TableCell className="flex items-center justify-start gap-2 ">
                  <Button
                    onClick={() => handleDeleteItem(item.id)}
                    className="bg-red-600 hover:bg-red-500 duration-300 text-white"
                  >
                    Xóa
                  </Button>
                  {item.status === false ? (
                    <Button
                      onClick={() => handleChangeStatus(item.id)}
                      className="bg-green-500 hover:bg-green-400 duration-300 text-white"
                    >
                      Duyệt
                    </Button>
                  ) : (
                    <></>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default BookingList;
