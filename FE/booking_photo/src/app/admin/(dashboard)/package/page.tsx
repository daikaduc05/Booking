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
import Swal from "sweetalert2";
import { IPackages, IPackagesAdmin } from "@/model/packages";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FaPlus } from "react-icons/fa";
import NewPackage from "./NewPackage";
import axios from "axios";

const title = ["Tên gói", "Giá", "Mô tả"];

const page = () => {
  const [packageItem, setPackageItem] = useState<IPackagesAdmin[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [name, setName] = useState<string>("");
  const [price, setPrice] = useState<number>(0);
  const [description, setDescription] = useState<string>("");
  const [editId, setEditId] = useState<number>(-1);
  const [add, setAdd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchPackages = async () => {
      try {
        const res = await axios.get(
          "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages",
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        console.log(res.data);
        setPackageItem(res.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPackages();
  }, [loading]);

  const handleEditItem = (id: number) => {
    const packageToEdit = packageItem.find((item) => item.packageId === id);
    if (packageToEdit) {
      setName(packageToEdit.name);
      setPrice(packageToEdit.price);
      setDescription(packageToEdit.description);
      setEditId(id);
    }
  };

  const handleSaveEdit = async () => {
    if (editId !== -1) {
      try {
        const data = {
          name,
          price,
          description,
        }
        const res = await axios.put(
          `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages/update/${editId}`,data,
          {
            headers: {
              "Content-Type": "application/json",
              "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
            },
          }
        );
        if (res) {
          const updatedPackagesList = packageItem.map((item) =>
            item.packageId === editId
              ? { ...item, name, price, description }
              : item
          );
          setPackageItem(updatedPackagesList);
          setEditId(-1);
          Swal.fire({
            title: "Thành công!",
            text: "Bạn đã cập nhật gói dịch vụ thành công.",
            icon: "success",
          });
        }
      } catch (error) {
        console.error(error);
        Swal.fire({
          title: "Lỗi",
          text: "Có lỗi xảy ra khi cập nhật thông tin gói dịch vụ. Vui lòng thử lại!",
          icon: "error",
        });
      }
      console.log("Edit package", editId);
    } else {
      Swal.fire({
        title:
          "Bạn vui lòng lưu thông tin gói dịch vụ trước khi thực hiện thao tác này!",
        icon: "warning",
      });
    }
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
            `https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages/delete/${idDelete}`,
            {
              headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
              },
            }
          );
          if (res) {
            const newPackagesList = packageItem.filter(
              (item) => item.packageId !== idDelete
            );
            setPackageItem(newPackagesList);
            Swal.fire({
              title: "Đã xóa!",
              text: "Bạn đã xóa thông tin gói dịch vụ thành công.",
              icon: "success",
            });
          }
        } catch (error) {
          console.error("Error fetching booking data:", error);
          Swal.fire({
            title: "Lỗi",
            text: "Có lỗi xảy ra khi xóa thông tin gói dịch vụ. Vui lòng thử lại!",
            icon: "error",
          });
        }
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
          {packageItem.length === 0 ? (
           <div className="w-full h-[300px] font-semibold text-xl flex items-center justify-center">
           Không có gói dịch vụ nào !
         </div>
          ) : (
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
                    {item.packageId === editId ? (
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
                            onChange={(e) =>
                              setPrice(parseFloat(e.target.value))
                            } // Cập nhật giá khi thay đổi
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
                        onClick={() => handleViewItem(item.packageId)}
                        className="bg-blue-600 hover:bg-blue-500 duration-300 text-white"
                      >
                        Xem chi tiết
                      </Button>
                      {item.packageId === editId ? (
                        <Button
                          className="bg-green-600 hover:bg-green-500"
                          onClick={handleSaveEdit} // Lưu thông tin khi chỉnh sửa xong
                        >
                          Lưu
                        </Button>
                      ) : (
                        <Button
                          className="bg-yellow-500 hover:bg-yellow-400"
                          onClick={() => handleEditItem(item.packageId)}
                        >
                          Sửa
                        </Button>
                      )}
                      <Button
                        onClick={() => handleDeleteItem(item.packageId)}
                        className="bg-red-600 hover:bg-red-500 duration-300 text-white"
                      >
                        Xóa
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
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
          <NewPackage isAdd={add} setAdd={setAdd} setLoading={setLoading} loading={loading}/>
        </div>
      )}
    </div>
  );
};

export default Page;
