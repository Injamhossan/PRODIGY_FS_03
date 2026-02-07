import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata = {
  title: "Artisan | Elevate Your Living Space",
  description: "Discover artisan-crafted pieces that blend timeless elegance with modern functionality.",
};

import { Providers } from "@/components/Providers";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased`}
      >
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
