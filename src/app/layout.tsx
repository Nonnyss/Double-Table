import { kronaOne, lineSeed } from "@/fonts";
import "@/styles/globals.css";
import type { Metadata } from "next";
import { NextUIProvider } from "@nextui-org/system";
export const metadata: Metadata = {
  title: "Next.js 15 Starter Template",
  description: "A starter template for Next.js 15",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`antialiased ${kronaOne.variable} ${lineSeed.variable}`}
    >
      <body>
        <NextUIProvider>{children}</NextUIProvider>
      </body>
    </html>
  );
}
