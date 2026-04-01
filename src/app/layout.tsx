import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { CheckoutProvider } from "@/context/CheckoutContext";
import { ThemeProvider } from "@/components/ThemeProvider";
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen flex flex-col bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-50 transition-colors duration-500`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange={false}
        >
          <CheckoutProvider
            initialCartItems={initialData.cartItems}
            initialShippingFee={initialData.shipping_fee}
            initialDiscount={initialData.discount_applied}
          >
            {children}
          </CheckoutProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
