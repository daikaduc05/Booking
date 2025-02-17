import type { Metadata } from "next";
import { Lora } from "next/font/google"; // Import Lora font
import "../globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

// import { getMessages } from "next-intl/server";

// Load the Lora font from Google Fonts
const lora = Lora({
  variable: "--font-lora", // Define a custom variable for the font
  subsets: ["latin"],
});


export const metadata: Metadata = {
  title: "Booking Photo",
};

export default async function RootLayout({
  children,
  params: { locale },
}: Readonly<{
  children: React.ReactNode;
  params: { locale: string };
}>) {
  const messages = await getMessages();
  // const locales = routing.locales.includes(locale as any) ? locale : routing.defaultLocale;
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  return (
    <html lang={locale}>
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
