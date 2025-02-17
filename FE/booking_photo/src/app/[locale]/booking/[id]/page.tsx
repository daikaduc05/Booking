"use client";
import React, { useEffect } from "react";
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useTranslations } from "next-intl";
import Packages, { packages } from "@/app/(element)/packages";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { useParams, useRouter, useSearchParams } from "next/navigation";

const packagesType = packages.map((item) => item.name);
console.log(packagesType);

const formSchema = z.object({
  username: z.string().min(2).max(50),
  email: z.string().email(),
  packages: z.enum(packagesType as [string, ...string[]]),
  location: z.string().min(2).max(50),
  note: z.string().max(500),
});

const page = () => {
  const params = useParams();
  const selectPackage = packages.find((item) => item.id === Number(params.id));
  console.log(selectPackage);
  const [select, setSelect] = React.useState<string>(selectPackage?.name || "");
  const findIdByName = (name: string) => {
    const packageItem = packages.find((item) => item.name === name);
    return packageItem ? packageItem.id : undefined;
  };

  useEffect(() => {
    params.set;
  }, [select]);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      email: "",
      packages: selectPackage?.name || "",
      location: "",
      note: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  const handleCancel = () => {
    form.reset();
  };
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center">
      <h1 className="py-5 ">Thông tin của bạn</h1>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 border border-gray-200 p-8 rounded-3xl shadow-xl "
        >
          <div className="flex items-center gap-4">
            <FormField
              control={form.control}
              name="username"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Họ và tên</FormLabel>
                  <FormControl>
                    <Input placeholder="Họ và tên của bạn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Nhập email của bạn" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="flex items-center gap-20">
            <FormField
              control={form.control}
              name="packages"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Select
                      onValueChange={(value) => {
                        field.onChange(value);
                        router.push(
                          `/${params.locale}/booking/${findIdByName(value)}`
                        );
                      }}
                      value={field.value}
                      defaultValue="Chọn gói"
                    >
                      <SelectTrigger className="w-[180px] ">
                        <SelectValue placeholder="Chọn gói" />
                      </SelectTrigger>
                      <SelectContent>
                        {packages.map((item) => (
                          <SelectItem key={item.name} value={item.name}>
                            {item.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <span className="p-2 rounded-lg bg-gray-300 ">
              {selectPackage
                ? selectPackage.price % 1000 === 0
                  ? selectPackage.price / 1000 +
                    "." +
                    (selectPackage.price % 1000) +
                    "00.000đ"
                  : selectPackage.price + ".000đ"
                : "No package selected"}
            </span>
          </div>
          <FormField
            control={form.control}
            name="location"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Địa chỉ</FormLabel>
                <FormControl>
                  <Input placeholder="Nhập địa chỉ" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="note"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lời nhắn của bạn</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none h-[150px]"
                    placeholder="Nhập lời nhắn của bạn ..."
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="flex justify-between ">
            <Button onClick={() => handleCancel()} className="px-7 bg-red-700 hover:bg-red-500">
              Hủy
            </Button>
            <Button className="px-7 bg-blue-600 hover:bg-blue-500" type="submit">
              Gửi
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default page;
