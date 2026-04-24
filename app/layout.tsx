"use client";
// import type { Metadata } from "next";
import { Bebas_Neue, Roboto } from "next/font/google";
import "./globals.css";
import { usePathname } from "next/navigation";

import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const bebas = Bebas_Neue({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-heading",
});

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-sans",
});

// export const metadata: Metadata = {
//   title: "ITS TYRE EXPO",
//   description: "Expo Website",
// };

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const hideHeaderFooter = pathname.startsWith("/dashboard") || pathname.startsWith("/register");
  return (
    <html
      lang="en"
      className={`${bebas.variable} ${roboto.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        
        {/* ✅ Header */}
       

        {/* ✅ IMPORTANT: spacing for fixed header */}
       
           {!hideHeaderFooter && <Header />}
          {children}
      

        {/* ✅ Footer */}
        {!hideHeaderFooter && <Footer />}

      </body>
    </html>
  );
}