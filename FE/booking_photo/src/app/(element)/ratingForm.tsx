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
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-toastify";
import { useParams, useSearchParams } from "next/navigation";

const RatingForm = () => {

  const t = useTranslations("Rating");
  const [hoverRating, setHoverRating] = useState<number>(0);
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
  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
    toast.success(t("toastSubmit"));
  }

  return (
    <div className="py-5 h-fit bg-[#5c5a5a] w-full flex flex-col items-center">
      <h1 className="text-4xl text-center w-fit h-fit py-10 px-10 text-white">
        {t("title")}
      </h1>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-8 h-fit py-10  px-5 w-[40%] rounded-lg bg-white"
        >
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
          <FormField
            control={form.control}
            name="ratingIndex"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="flex pl-2 mb-10  space-x-2 size-4">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <div
                        key={star}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        onClick={() => field.onChange(star)}
                        className="cursor-pointer text-xl text-yellow-500 "
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
                    onChange={(e) => field.onChange(e)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className=" flex justify-end">
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
