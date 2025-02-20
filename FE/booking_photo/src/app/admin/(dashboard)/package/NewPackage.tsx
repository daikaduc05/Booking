import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(2).max(50),
  price: z.number().nonnegative({
    message: "Giá tiền không được âm !",
  }),
  description: z.string().max(200).optional(),
});

const NewPackage = ({
  isAdd,
  setAdd,
}: {
  isAdd: boolean;
  setAdd: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      price: 0,
      description: "",
    },
  });
  const router = useRouter();
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success("Thêm gói dịch vụ thành công !");
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
      <Button onClick={()=>setAdd(false)} className="bg-gray-500 hover:bg-gray-400 w-[70px] fixed bottom-4 right-4 h-[40px]">
        Trở lại
      </Button>
    </div>
  );
};

export default NewPackage;
