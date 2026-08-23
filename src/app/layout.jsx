import localFont from "next/font/local";
import Navbar from "@/components/navbar/Navbar";
import "./globals.css";

const vazir = localFont({
  src: "../../public/fonsts/Vazir-Thin.ttf",
  variable: "--font-vazir",
  display: "swap",
  weight: "100",
});

export const metadata = {
  title: {
    default: "تاپ‌تول | فروشگاه تخصصی ابزارآلات",
    template: "%s | تاپ‌تول",
  },
  openGraph: {
    type: "website",
    locale: "fa_IR",
    siteName: "تاپ‌تول",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="fa" dir="rtl" className={vazir.variable}>
      <body className={`${vazir.className} antialiased bg-white text-gray-900`}>
        <Navbar />
        <main className="pt-16 md:pt-20">{children}</main>
      </body>
    </html>
  );
}
