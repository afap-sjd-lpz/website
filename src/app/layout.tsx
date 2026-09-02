import type {Metadata} from "next";
import {Nunito_Sans} from "next/font/google";

import {siteUrl} from "@/config/site.config";

import "./globals.css";

const nunitoSans = Nunito_Sans({
  variable: "--font-nunito-sans",
  subsets: ["latin"],
  display: "swap",
});

const isVercelPreview = process.env.VERCEL_ENV === "preview";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "AFAP | Unidos por la salud mental",
  description:
    "AFAP une a familias, amigos y personas comprometidas con la salud mental, la inclusión y la defensa de derechos en Bolivia.",
  robots: isVercelPreview
    ? {
        index: false,
        follow: false,
      }
    : undefined,
};

export default function RootLayout({
  children,
}: LayoutProps<"/">) {
  return (
    <html lang="es" className={nunitoSans.variable}>
      <body>{children}</body>
    </html>
  );
}
