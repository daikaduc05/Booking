import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { IBookingFormShow } from "@/model/bookingForm";
import Swal from "sweetalert2";
import axios from "axios";

const title = [
  "Tên",
  "Email",
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
  const [filteredBookings, setFilteredBookings] = useState<IBookingFormShow[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null);

  // Lấy token từ sessionStorage chỉ khi client-side
  useEffect(() => {
    if (typeof window !== "undefined") {
      const tokenFromStorage = sessionStorage.getItem("token");
      setToken(tokenFromStorage);
    }
  }, []);

  // Fetch booking data từ API
  useEffect(() => {
    if (token) {
      const fetchBookingList = async () => {
        setLoading(true);
        try {
          const res = await axios.get(
            "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/formBookings",
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          const bookingData: IBookingFormShow[] = res.data.map((item: IBookingFormShow) => ({
            ...item,
            createAt: new Date(item.createAt),
            bookTime: new Date(item.bookTime),
          }));
          // console.log(bookingData);
          setBookingList(bookingData);
          setFilteredBookings(bookingData);
        } catch (error) {
          console.error("Error fetching booking data:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchBookingList();
    }
  }, [token]);

  useEffect(() => {
    let filteredList = [...bookingList];

    if (search) {
      filteredList = filteredList.filter((item) =>
        removeAccents(item.name)
          .toLowerCase()
          .includes(removeAccents(search).toLowerCase())
      );
    }

    if (packageName) {
      filteredList = filteredList.filter(
        (item) => item.packageName === packageName
      );
    }

    if (fromDate && toDate) {
      const fromDateObj = new Date(fromDate);
      const toDateObj = new Date(toDate);

      filteredList = filteredList.filter((item) => {
        const bookTime = new Date(item.bookTime);

        return bookTime.getDate() >= fromDateObj.getDate() && bookTime.getDate() <= toDateObj.getDate();
      });
    }

    setFilteredBookings(filteredList);
  }, [search, packageName, fromDate, toDate, bookingList]);

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
      title: "Bạn chắc chắn sẽ duyệt, bạn sẽ không thể hoàn tác?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Duyệt",
      cancelButtonText: "Hủy",
      allowOutsideClick: false,
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axios.put(
            `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/formBookings/approve/${id}`,
            {},
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (res) {
            const updatedBookingList = bookingList.map((item) =>
              item.formBookingId === id ? { ...item, status: true } : item
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
            `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/formBookings/delete/${idDelete}`,
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );
          if (res) {
            const newBookingList = bookingList.filter(
              (item) => item.formBookingId !== idDelete
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
      {loading ? (
        <div className="w-full h-[300px] font-semibold text-xl flex items-center justify-center">
          Đang tải dữ liệu...
        </div>
      ) : bookingList.length === 0 ? (
        <div className="w-full h-[300px] font-semibold text-xl flex items-center justify-center">
          Chưa có lịch đặt nào!
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
            {filteredBookings.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{item.name}</TableCell>
                <TableCell>{item.email}</TableCell>
                <TableCell>{formatDate(item.bookTime)}</TableCell>
                <TableCell>{formatTime(item.bookTime)}</TableCell>
                <TableCell>{item.packageName}</TableCell>
                <TableCell>{item.location || "Chưa có địa chỉ"}</TableCell>
                <TableCell>{formatPrice(item.pricePackage)} VNĐ</TableCell>
                <TableCell
                  className={`${
                    item.status ? "text-green-500" : "text-yellow-500"
                  } font-bold`}
                >
                  {item.status ? "Đã duyệt" : "Chờ duyệt"}
                </TableCell>
                <TableCell className="flex items-center justify-start gap-2">
                  <Button
                    onClick={() => handleDeleteItem(item.formBookingId)}
                    className="bg-red-600 hover:bg-red-500 duration-300 text-white"
                  >
                    Xóa
                  </Button>
                  {item.status === false ? (
                    <Button
                      onClick={() => handleChangeStatus(item.formBookingId)}
                      className="bg-green-500 hover:bg-green-400 duration-300 text-white"
                    >
                      Duyệt
                    </Button>
                  ) : null}
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
