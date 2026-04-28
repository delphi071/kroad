import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import ToastContainer from "./components/Toast";

const montserrat = Montserrat({
  variable: "--font-montserrat-next",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "한국의 길과 문화 — 길, 그 이상의 연결",
  description:
    "단순한 이동을 넘어, 길 위에 숨겨진 가치를 연결하는 여정이 시작되는 지점",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className={`${montserrat.variable} h-full antialiased`}>
      <body className="min-h-full bg-black text-white">
        {children}
        <ToastContainer />
      </body>
    </html>
  );
}
