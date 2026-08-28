import type { Metadata } from "next";
import { Nunito_Sans } from "next/font/google";

import { Footer } from "@/components/layout/footer";
import { Navbar } from "@/components/layout/navbar";

import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "AFAP | Unidos por la salud mental",
  description:
    "AFAP une a familias, amigos y personas comprometidas con la salud mental, la inclusión y la defensa de derechos en Bolivia.",
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="es" className={nunitoSans.variable}>
      <body className="flex min-h-screen flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
