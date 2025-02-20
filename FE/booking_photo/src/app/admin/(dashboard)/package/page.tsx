"use client";
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
import Swal from "sweetalert2";
import { IPackages } from "@/model/packages";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import NewPackage from "./NewPackage";

const title = ["Tên gói", "Giá", "Mô tả"];

const page = () => {
  const packagesList = packages;
  const [packageItem, setPackageItem] = useState<IPackages[]>(packagesList);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [editId, setEditId] = useState<number>(-1);
  const [add, setAdd] = useState(true);
  const router = useRouter();

  const handleEditItem = (id: number) => {
    const packageToEdit = packagesList.find((item) => item.id === id);
    if (packageToEdit) {
      setName(packageToEdit.name);
      setPrice(packageToEdit.price);
      setDescription(packageToEdit.description);
      setEditId(id);
    }
  };

  const handleSaveEdit = () => {
    if (editId !== -1) {
      const updatedPackagesList = packageItem.map((item) =>
        item.id === editId ? { ...item, name, price, description } : item
      );
      setPackageItem(updatedPackagesList);
      setEditId(-1); // Đóng form chỉnh sửa
      Swal.fire({
        title: "Thành công!",
        text: "Bạn đã cập nhật gói dịch vụ thành công.",
        icon: "success",
      });
    }
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
        const newPackagesList = packageItem.filter(
          (item) => item.id !== idDelete
        );
        setPackageItem(newPackagesList);
        Swal.fire({
          title: "Đã xóa!",
          text: "Bạn đã xóa thông tin gói dịch vụ thành công.",
          icon: "success",
        });
      }
    });
  };

  const handleViewItem = (id: number) => {
    router.push(`/admin/package/${id}`);
  };

  return (
    <div className="flex justify-end w-full py-10">
      {!add ? (
        <div className="w-[83%] flex flex-col gap-6">
          <h1 className="text-3xl font-bold">Gói dịch vụ</h1>
          <Table>
            <TableHeader>
              <TableRow>
                {title.map((item, index) => (
                  <TableHead key={index}>{item}</TableHead>
                ))}
                <TableHead className="w-[100px]">Thao tác</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {packageItem.map((item, index) => (
                <TableRow key={index}>
                  {item.id === editId ? (
                    <>
                      <TableCell className="w-[130px]">
                        <Input
                          value={name}
                          onChange={(e) => setName(e.target.value)} // Cập nhật tên khi thay đổi
                        />
                      </TableCell>
                      <TableCell className="w-[130px]">
                        <Input
                          type="number"
                          value={price}
                          onChange={(e) => setPrice(parseFloat(e.target.value))} // Cập nhật giá khi thay đổi
                        />
                      </TableCell>
                      <TableCell>
                        <Input
                          value={description}
                          onChange={(e) => setDescription(e.target.value)} // Cập nhật mô tả khi thay đổi
                        />
                      </TableCell>
                    </>
                  ) : (
                    <>
                      <TableCell>{item.name}</TableCell>
                      <TableCell>{item.price}</TableCell>
                      <TableCell>{item.description}</TableCell>
                    </>
                  )}
                  <TableCell className="flex justify-end gap-2">
                    <Button
                      onClick={() => handleViewItem(item.id)}
                      className="bg-blue-600 hover:bg-blue-500 duration-300 text-white"
                    >
                      Xem chi tiết
                    </Button>
                    {item.id === editId ? (
                      <Button
                        className="bg-green-600 hover:bg-green-500"
                        onClick={handleSaveEdit} // Lưu thông tin khi chỉnh sửa xong
                      >
                        Lưu
                      </Button>
                    ) : (
                      <Button
                        className="bg-yellow-500 hover:bg-yellow-400"
                        onClick={() => handleEditItem(item.id)}
                      >
                        Sửa
                      </Button>
                    )}
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
          <Button
            className="flex items-center w-fit py-2 px-2 fixed bottom-5 right-5 rounded-2xl bg-green-600 hover:bg-green-500 text-white"
            onClick={() => setAdd(true)}
          >
            <FaPlus className="mr-2" />
            Thêm gói dịch vụ
          </Button>
        </div>
      ) : (
        <div className="w-[83%] flex flex-col mr-10 mt-5 items-center justify-center h-full gap-6">
          <h1 className="text-xl mb-5 font-bold">Nhập thông tin gói mới</h1>
          <NewPackage isAdd={add} setAdd={setAdd} />
        </div>
      )}
    </div>
  );
};

export default page;
