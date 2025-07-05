"use client";
import { Corben, Gentium_Book_Plus } from "next/font/google";
import { ThemeProvider } from "next-themes";
import { SessionProvider } from 'next-auth/react';
import "./styles/colors.css";
import "./styles/colors.css";
import Header from "./components/Header";

const gentiumBookPlus = Gentium_Book_Plus({
  variable: "--font-gentium-book-plus",
  subsets: ["latin", "cyrillic"],
  weight: "400",
});

const corben = Corben({
  variable: "--font-corben",
  subsets: ["latin"],
  weight: "700",
});

// export const metadata = {
//   title: "VoiceBox",
//   description: "Create and manage anonymous suggestion boxes for your workplace, classroom, or community.",
// };

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${gentiumBookPlus.variable} ${corben.variable}`}>
        <SessionProvider>
          <ThemeProvider>
            <Header />
            {children}
          </ThemeProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
