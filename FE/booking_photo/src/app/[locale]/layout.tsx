import { notFound } from "next/navigation";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { Roboto } from "next/font/google";
import "../globals.css";
import React from "react";

// Include the 'weight' property to avoid the error
const roboto = Roboto({
  variable: "--font-roboto",
  subsets: ["latin"],
  weight: ["400", "700"],  // Specify the weights you want to load (you can adjust this)
});

export const metadata = {
  title: "Booking Photo",
};

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode,
  params: Promise<{
    locale: string
  }>
}) {
  const { locale } = await params;

  if (!locale || !routing.locales.includes(locale as "en" | "vn")) {
    notFound();
  }

  const messages = await getMessages({ locale });

  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </head>
      <body className={`${roboto.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
