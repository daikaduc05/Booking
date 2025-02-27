// layout.tsx
import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Lora } from "next/font/google";
import "../globals.css";
import React from "react";

const lora = Lora({
  variable: "--font-lora",
  subsets: ["latin"],
});

export const metadata = {
  title: "Booking Photo",
};


export default async function RootLayout({
  children,
  params,
}: {
  children : React.ReactNode,
  params : Promise<{
    locale : string
  }>
}) {
  const { locale  } = await params;

  if (!locale || !routing.locales.includes(locale as "en" | "vn")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${lora.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}> 
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
