"use client";
import React, { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
import axios from "axios";

const RatingForm = () => {
  const router = useRouter();
  const t = useTranslations("Rating");
  const [hoverRating, setHoverRating] = useState(0);

  // Fetch IP chỉ khi chưa có trong sessionStorage
  useEffect(() => {
    const fetchIp = async () => {
      if (!sessionStorage.getItem("ip")) {
        try {
          const response = await fetch("https://api.ipify.org?format=json");
          const data = await response.json();
          sessionStorage.removeItem("ip");
          sessionStorage.setItem("ip", data.ip);
        } catch (error) {
          console.error("Error fetching IP address:", error);
        }
      }
    };
    fetchIp();
  }, []);

  // Schema validation
  const formSchema = z.object({
    email: z.string().email({
      message: t("eMessage"),
    }),
    ratingIndex: z.number().min(1).max(5),
    comment: z.string().optional(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      ratingIndex: 1,
      comment: "",
    },
  });

  // Submit Form
  async function onSubmit(values: z.infer<typeof formSchema>) {
    const data = {
      email: values.email,
      ratingIndex: values.ratingIndex,
      content: values.comment,
      ipUser: sessionStorage.getItem("ip"),
    };

    try {
      const res = await axios.post(
        "https://bookingphoto-a7d5f0gcgtdtfwaz.southeastasia-01.azurewebsites.net/ratings/create",
        data,
        {
          headers: { "Content-Type": "application/json" },
        }
      );

      if (res.status === 200 || res.status === 201) {
        router.push("/");
        form.reset();
        toast.success(t("toastSubmit"));
      } else {
        toast.error(t("toastError"));
      }
    } catch (error) {
      console.error("API Error:", error);
      toast.error(t("toastError"));
    }
  }

  return (
    <div className=" pb-5 h-fit bg-[#0B0B0B] w-full flex flex-col items-center">
        <div className="py-5 mb-16 bg-[#EDEDED] w-full">
        <h1 className="text-4xl font-bold text-center text-black mb-4 flex items-center justify-center">
          <span className="w-16 border-t-2 border-gray-800 mr-4"></span>
          {t("title")}
          <span className="w-16 border-t-2 border-gray-800 ml-4"></span>
        </h1>
      </div>
    
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 h-fit py-10 px-5 w-[40%] rounded-lg bg-white"
        >
          {/* Email Field */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder={t("ePlaceholder")} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Rating Field */}
          <FormField
            control={form.control}
            name="ratingIndex"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex pl-2 mb-10 space-x-2 size-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => field.onChange(star)}
                        className="cursor-pointer text-xl text-yellow-500"
                      >
                        {hoverRating >= star || Number(field.value) >= star ? (
                          <AiFillStar />
                        ) : (
                          <AiOutlineStar />
                        )}
                      </div>
                    ))}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Comment Field */}
          <FormField
            control={form.control}
            name="comment"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("cTitle")}</FormLabel>
                <FormControl>
                  <Textarea
                    className="resize-none h-[250px] outline-none p-4 text-lg placeholder-gray-500 w-full"
                    placeholder={t("pComment")}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Submit Button */}
          <div className="flex justify-end">
            <Button className="w-fit px-10 rounded-2xl" type="submit">
              {t("submit")}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default RatingForm;
