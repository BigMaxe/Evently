import type { Metadata } from "next";
import { Sarala, Montserrat_Alternates, Black_Han_Sans } from "next/font/google";
import "./globals.css";

const sarala = Sarala({
  variable: "--font-sarala",
  weight: ['400', '700'],
  subsets: ["latin"],
  display: "swap",
});

const montserratAlt = Montserrat_Alternates({
  variable: "--font-montserrat-alt",
  weight: [
    '100',
    '200',
    '300',
    '400',
    '500',
    '600',
    '700',
    '800',
    '900',
  ],
  subsets: ["latin"],
  display: "swap",
});

const blackHanSans = Black_Han_Sans({
  variable: "--font-black-han-sans",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
  adjustFontFallback: false,
})

export const metadata: Metadata = {
  title: "Evently - Find, book and Enjoy Events You Love",
  description: "Your one stop place for all event tickets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${sarala.variable} ${montserratAlt.variable} ${blackHanSans.variable} font-sans antialiased`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
