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
import { Rating } from "@/model/rating";
import Swal from "sweetalert2";
import { FaStar } from "react-icons/fa";

const title = ["Email", "Sao", "Bình luận"];
const feedBack: Rating[] = [
  {
    id: 1,
    email: "user1@example.com",
    ratingIndex: 5,
    comment: "Gói dịch vụ tuyệt vời! Tôi rất hài lòng với chất lượng dịch vụ.",
  },
  {
    id: 2,
    email: "user2@example.com",
    ratingIndex: 4,
    comment: "Dịch vụ ổn, tuy nhiên tôi hy vọng có thêm nhiều lựa chọn hơn.",
  },
  {
    id: 3,
    email: "user3@example.com",
    ratingIndex: 3,
    comment: "Dịch vụ khá tốt nhưng cần cải thiện thêm thời gian phản hồi.",
  },
  {
    id: 4,
    email: "user4@example.com",
    ratingIndex: 2,
    comment:
      "Không thực sự hài lòng. Mong dịch vụ sẽ cải thiện trong tương lai.",
  },
  {
    id: 5,
    email: "user5@example.com",
    ratingIndex: 1,
    comment: "Dịch vụ không đáp ứng được kỳ vọng. Cần cải thiện rất nhiều.",
  },
];

const page = () => {
  const [rating, setRating] = useState<Rating[]>(feedBack);
  const handleDeleteItem = (id: number) => {
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
        const newRating = rating.filter((item) => item.id !== id);
        setRating(newRating);
        Swal.fire({
          title: "Đã xóa!",
          text: "Bạn đã xóa thông tin gói dịch vụ thành công.",
          icon: "success",
        });
      }
    });
  };
  return (
    <div className="flex justify-end w-full py-10">
      <div className="w-[83%] flex flex-col gap-6">
        <h1 className="text-3xl font-bold">Quản lí đánh giá</h1>
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
                <TableCell>{item.comment}</TableCell>
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
      </div>
    </div>
  );
};

export default page;
