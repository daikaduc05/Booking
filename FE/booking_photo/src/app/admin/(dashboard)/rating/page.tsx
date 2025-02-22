"use client";
import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
import { Input } from "@/components/ui/input";
import { Rating, RatingShow } from "@/model/rating";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";
import axios from "axios";

const title = ["Email", "Sao", "Bình luận"];

const page = () => {
  const [rating, setRating] = useState<RatingShow[]>([]);
  useEffect(() => {
    const fetchRating = async () => {
      try {
        const res = await axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/ratings/show",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        );
        if (res) {
          setRating(res.data);
        }
      } catch (error) {
        console.error(error);
      }
    };
    fetchRating();
  }, []);

  const handleDeleteItem = async (id: number) => {
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
            `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/ratings/delete/${id}`
          );
          if (res) {
            Swal.fire({
              title: "Xóa thành công !",
              icon: "success",
            });
            setRating(rating.filter((item) => item.id !== id));
          }
        } catch (error) {
          console.error(error);
        }
      }
    });
  };

  return (
    <div className="flex justify-end w-full py-10">
      <div className="w-[83%] flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Quản lí đánh giá</h1>
        {rating.length === 0 ? (
          <div className="w-full h-[300px] font-semibold text-xl flex items-center justify-center">
              Không có đánh giá nào !
            </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                {title.map((item, index) => (
                  <TableHead key={index}>{item}</TableHead>
                ))}
                <TableHead>Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {rating.map((item, index) => (
                <TableRow key={index}>
                  <TableCell>{item.email}</TableCell>
                  <TableCell className="flex items-center gap-1">
                    {" "}
                    {Array(5)
                      .fill(0)
                      .map((_, starIndex) => (
                        <FaStar
                          key={starIndex}
                          color={
                            starIndex < item.ratingIndex ? "#ffc107" : "#e4e5e9"
                          }
                        />
                      ))}
                  </TableCell>
                  <TableCell>{item.content}</TableCell>
                  <TableCell>
                    <Button
                      onClick={() => handleDeleteItem(item.id)}
                      className=" duration-300 text-white bg-red-600 hover:bg-red-500 "
                    >
                      Xóa
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </div>
    </div>
  );
};

export default page;
