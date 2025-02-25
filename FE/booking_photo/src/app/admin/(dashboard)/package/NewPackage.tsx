"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import axios from "axios";
import Swal from "sweetalert2";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.number().nonnegative({
    message: "Giá tiền không được âm !",
  }),
  description: z.string().max(200).optional(),
});

const NewPackage = ({
  setAdd,
  setLoading,
  loading
}: {
  isAdd: boolean;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  loading: boolean;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      name: values.name,
      price: values.price,
      description: values.description,
    };
    try {
      const res = await axios.post(
        "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/packages/create", data ,{
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${sessionStorage.getItem("token")}`,
          }
        }
      );
      if(res){
        Swal.fire({
          title: "Thêm gói dịch vụ mới thành công !",
          icon: "success",
        });
        setAdd(false);
        setLoading(!loading);
      }
    } catch (error) {
      Swal.fire({
        title: "Không thể thêm gói dịch vụ mới!",
        icon: "error",
      })
      console.error(error);
    }
  }
  return (
    <div className="w-[500px] bg-white p-10 rounded-xl  shadow-lg">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <div className="flex items-center justify-between">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tên gói</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[250px]"
                      placeholder="Nhập tên gói"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="price"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Giá gói</FormLabel>
                  <FormControl>
                    <Input
                      className="w-[150px]"
                      type="number"
                      placeholder="Nhập tên gói"
                      {...field}
                      onChange={(e) => field.onChange(Number(e.target.value))}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Mô tả</FormLabel>
                <FormControl>
                  <Textarea
                    onChange={(e) => field.onChange(e.target.value)}
                    value={field.value}
                    placeholder="Nhập mô tả của bạn"
                    className="resize-none h-[200px]"
                  />
                </FormControl>
              </FormItem>
            )}
          />

          <Button
            className="bg-blue-600 hover:bg-blue-500 w-[70px] h-[40px] "
            type="submit"
          >
            Gửi
          </Button>
        </form>
      </Form>
      <Button
        onClick={() => setAdd(false)}
        className="bg-gray-500 hover:bg-gray-400 w-[70px] fixed bottom-4 right-4 h-[40px]"
      >
        Trở lại
      </Button>
    </div>
  );
};

export default NewPackage;
