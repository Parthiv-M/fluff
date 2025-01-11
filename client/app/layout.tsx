import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fluff",
  description: "Cloud native paste bin",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins-medium">
        {children}
      </body>
    </html>
  );
}
