import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Montserrat, Vazirmatn } from "next/font/google";
import "./globals.css";
const serif = Cormorant_Garamond({ subsets: ["latin"], weight: ["300", "400", "500"], variable: "--f-serif" });
const sans = Montserrat({ subsets: ["latin"], weight: ["300", "400"], variable: "--f-sans" });
const fa = Vazirmatn({ subsets: ["arabic", "latin"], weight: ["300", "400", "600"], variable: "--f-fa" });
export const metadata: Metadata = {
  title: "WATCH ISLAND | Grand Opening Ceremony",
  description: "دعوت به افتتاحیه رسمی ساعت‌فروشی جزیره — یکشنبه ۸ آذر ۱۴۰۵، ساعت ۲۰:۳۰",
  openGraph: { title: "WATCH ISLAND — Grand Opening", description: "افتتاحیه رسمی ساعت‌فروشی جزیره", images: ["/logo.webp"] },
};
export const viewport: Viewport = { themeColor: "#080808", width: "device-width", initialScale: 1 };
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (<html lang="fa" dir="rtl" className={`${serif.variable} ${sans.variable} ${fa.variable}`}><body>{children}</body></html>);
}
