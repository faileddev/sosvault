import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ThirdwebProvider } from "./thirdweb";

const montserrat = localFont({
  src: "./fonts/Montserrat-Medium.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const montserratMono = localFont({
  src: "./fonts/Montserrat-Regular.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "sUSD Vault | Stacks Of Sats",
  description: "sUSD is a decentralised, scalable and overcollateralized stablecoin that is 1:1 USD pegged.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${montserratMono.variable}`}>
      <ThirdwebProvider>
        {children}
      </ThirdwebProvider>
      </body>
    </html>
  );
}
