import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Task Management App",
  description: "A simple task management app built with Next.js and Prisma",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="./favicon.png" type="image/png" sizes="32x32" />
      </head>
      <body className={inter.className}>{children}</body>
    </html>
  );
}
