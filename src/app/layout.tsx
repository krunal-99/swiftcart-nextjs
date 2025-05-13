import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import Navbar from "@/sections/Navbar";
import Providers from "@/components/Providers";
import SocialBar from "@/sections/SocialBar";
import "./globals.css";
import { ToastContainer } from "react-toastify";
import Footer from "@/sections/Footer";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "Swiftcart | Ecommerce Store",
  description: "Best ecommerce store for your everyday needs.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable}`}>
        <Providers>
          <SocialBar />
          <ToastContainer
            position="bottom-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastClassName="custom-toast"
          />
          <Navbar />
          {children}
          <Footer />
        </Providers>
      </body>
    </html>
  );
}
