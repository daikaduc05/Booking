"use client";
import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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
import {  IPackagesAdmin } from "@/model/packages";

import { useTranslations } from "next-intl";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import Swal from "sweetalert2";

const formSchema = z
  .object({
    username: z.string().min(2).max(50),
    email: z.string().email(),
    packages: z.string(),
    location: z.string(),
    note: z.string().max(500).optional(),
    date: z.string().refine(
      (value) => {
        const selectedDate = new Date(value);
        const today = new Date();

        today.setHours(0, 0, 0, 0);
        return selectedDate >= today;
      },
      { message: "Ngày không hợp lệ" }
    ),
    time: z.string(),
  })
  .refine(
    (data) => {
      const today = new Date();
      const selectedDate = new Date(data.date);
      const selectTime = new Date(`${data.date}T${data.time}`);

      if (selectedDate.toDateString() === today.toDateString()) {
        return selectTime >= today;
      }

      return true;
    },
    { message: "Thời gian không hợp lệ", path: ["time"] }
  );

const InfoForm = ({
  selectPackages,
}: {
  selectPackages: IPackagesAdmin | undefined;
}) => {
  const t = useTranslations("InfoForm");
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      location: "",
      packages: selectPackages?.name || "",
      note: "",
      date: "",
      time: "",
    },
  });
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const selectedDateTime = new Date(`${values.date} ${values.time}`);
    const data = {
      email: values.email,
      name: values.username,
      bookTime: selectedDateTime,
      message: values.note,
      location: "",
    };
    try {
      const res = await axios.post(`https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/formBookings/create/${selectPackages?.packageId}`,data, {
        headers: {
          "Content-Type": "application/json",
        }
      })
      if(res){
        Swal.fire({
          title:"Đã đặt lịch thành công",
          icon:"success"
        })
        router.push("/")
      }
    } catch (error) {
      Swal.fire({
        title:"Lỗi",
        text:"Có lỗi xảy ra khi đặt lịch. Vui lòng thử lại",
        icon:"error"
      })
      console.log(error)
    }
  }
  const router = useRouter();
  const params = useParams();
  return (
    <div className="flex flex-col items-center justify-center ">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-4 border border-gray-200 p-5 rounded-3xl shadow-xl "
        >
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("name")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("pName")} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("email")}</FormLabel>
                  <FormControl>
                    <Input placeholder={t("pEmail")} {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="p-2 bg-gray-300 rounded-lg cursor-default">
              {selectPackages ? selectPackages.name : "No package selected"}
            </span>
            <span className="py-2 px-4 rounded-lg bg-gray-300 cursor-default ">
              {selectPackages
                ? selectPackages.price % 1000 === 0
                  ? selectPackages.price / 1000 +
                    "." +
                    (selectPackages.price % 1000) +
                    "00.000đ"
                  : selectPackages.price + ".000đ"
                : "No package selected"}
            </span>
          </div>
          <div className="flex items-center justify-between gap-4">
            <FormField
              control={form.control}
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("date")}</FormLabel>

                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="time"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>{t("time")}</FormLabel>
                  <FormControl>
                    <Input type="time" {...field} />
                  </FormControl>
                  {/*  */}
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("location")}</FormLabel>
                <FormControl>
                  <Input placeholder={t("pLocation")} {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("note")}</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none h-[150px]"
                    placeholder={t("pNote")}
                    {...field}
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <div className="flex justify-between">
            <Button
              onClick={() => router.push(`/${params.locale}/`)}
              className="px-7 bg-red-600 hover:bg-red-500"
              type="reset"
            >
              {t("reset")}
            </Button>
            <Button
              className="px-7 bg-blue-600 hover:bg-blue-500"
              type="submit"
            >
              {t("submit")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default InfoForm;
