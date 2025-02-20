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
import { packages } from "@/app/(element)/packages";
import { IBookingFormShow } from "@/model/bookingForm";
import Swal from "sweetalert2";

const packagesList = packages;

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

const bookingData: IBookingFormShow[] = [
  {
    id: 1,
    location: "Hà Nội, Việt Nam",
    email: "nguyenha@example.com",
    name: "Nguyễn Hà",
    message: "Chụp ảnh gia đình",
    createdAt: new Date("2025-02-17T00:00:00Z"),
    bookingTime: new Date("2025-02-17T17:50:00Z"),
    status: true,
    packageId: 1,
    packageName: "Gia đình",
    packagePrice: 3000000,
  },
  {
    id: 2,
    location: "Hồ Chí Minh, Việt Nam",
    email: "nguyenha@example.com",
    name: "Nguyễn Hà",
    message: "Chụp ảnh cặp đôi",
    createdAt: new Date("2025-02-17T00:00:00Z"),
    bookingTime: new Date("2025-02-17T17:50:00Z"),
    status: false,
    packageId: 2,
    packageName: "Cặp đôi",
    packagePrice: 3000000,
  },
  {
    id: 3,
    location: "Đà Nẵng, Việt Nam",
    email: "leminh@example.com",
    name: "Lê Minh",
    message: "Chụp ảnh đám cưới",
    createdAt: new Date("2025-02-18T00:00:00Z"),
    bookingTime: new Date("2025-02-18T14:30:00Z"),
    status: false,
    packageId: 4,
    packageName: "Đám cưới",
    packagePrice: 3000000,
  },
  {
    id: 4,
    location: "Hải Phòng, Việt Nam",
    email: "tranduy@example.com",
    name: "Trần Duy",
    message: "Chụp ảnh cặp đôi",
    createdAt: new Date("2025-02-19T00:00:00Z"),
    bookingTime: new Date("2025-02-19T10:00:00Z"),
    status: false,
    packageId: 2,
    packageName: "Cặp đôi",
    packagePrice: 3000000,
  },
  {
    id: 5,
    location: "Cần Thơ, Việt Nam",
    email: "phamlan@example.com",
    name: "Phạm Lan",
    message: "Chụp ảnh gia đình",
    createdAt: new Date("2025-02-20T00:00:00Z"),
    bookingTime: new Date("2025-02-20T09:00:00Z"),
    status: true,
    packageId: 2,
    packageName: "Cặp đôi",
    packagePrice: 3000000,
  },
];

console.log(bookingData);

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

  const [bookingList, setBookingList] = useState(bookingData);

  useEffect(() => {
    let filteredList = bookingData;

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

  const handleChangeStatus = (id: number) => {
    // Kiểm tra trạng thái hiện tại của booking để xác định hành động
    const booking = bookingList.find((item) => item.id === id);
    const action = booking?.status ? "Hủy duyệt" : "Duyệt";

    Swal.fire({
      title: `Bạn chắc chắn sẽ ${action.toLocaleLowerCase()}?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: ` ${action} `,
      cancelButtonText: "Hủy",
      allowOutsideClick: false, // Use this instead of `closeonclickoutside`
    }).then((result) => {
      if (result.isConfirmed) {
        const newBookingList = bookingList.map((item) => {
          if (item.id === id) {
            return { ...item, status: !item.status }; // Đảo ngược trạng thái
          }
          return item;
        });
        setBookingList(newBookingList);

        // Hiển thị thông báo dựa trên hành động đã thực hiện
        Swal.fire({
          title: action === "Duyệt" ? "Đã duyệt!" : "Đã hủy duyệt!",
          text:
            action === "Duyệt"
              ? "Trạng thái đã được duyệt thành công."
              : "Trạng thái đã được hủy duyệt.",
          icon: "success",
        });
      }
    });
  };

  const handleDeleteItem = (idDelete: number) => {
    Swal.fire({
      title: "Bạn chắc chắn xóa thông tin này không ?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Xóa!",
      cancelButtonText: "Hủy",
      allowOutsideClick: false,
    }).then((result) => {
      if (result.isConfirmed) {
        const newBookingList = bookingList.filter(
          (item) => item.id !== idDelete
        );
        setBookingList(newBookingList);
        Swal.fire({
          title: "Đã xóa!",
          text: "Bạn đã xóa thông tin đặt lịch thành công.",
          icon: "success",
        });
      }
    });
  };

  return (
    <div>
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
              <TableCell className="flex items-center gap-2">
                <Button
                  onClick={() => handleChangeStatus(item.id)}
                  className={`${
                    !item.status
                      ? "bg-green-500 hover:bg-green-400 duration-300"
                      : "bg-yellow-500 hover:bg-yellow-400 duration-300"
                  } text-white w-[70px]`}
                >
                  {!item.status ? "Duyệt" : "Hủy"}
                </Button>
                <Button
                  onClick={() => handleDeleteItem(item.id)}
                  className="bg-red-600 hover:bg-red-500 duration-300 text-white"
                >
                  Xóa
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default BookingList;
