import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "nutrilab admin",
  description: "nutrilab admin interface",
  icons: {
    icon: ["./favicon.ico"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`w-screen ${inter.className}`} suppressHydrationWarning={true}>
        {children}
      </body>
    </html>
  );
}
