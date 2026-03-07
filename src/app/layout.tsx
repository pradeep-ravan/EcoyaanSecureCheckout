import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { fetchCheckoutData } from "@/lib/api";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Ecoyaan Checkout",
  description: "Checkout flow for Ecoyaan",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const initialData = await fetchCheckoutData();

  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-50 text-gray-900 min-h-screen flex flex-col`}
      >
        <CheckoutProvider
          initialCartItems={initialData.cartItems}
          initialShippingFee={initialData.shipping_fee}
          initialDiscount={initialData.discount_applied}
        >
          {children}
        </CheckoutProvider>
      </body>
    </html>
  );
}
