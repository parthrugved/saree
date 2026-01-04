import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "SareeKraft.in",
  description: "Premium ready-to-wear sarees crafted with elegance.",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`bg-white text-black ${geistSans.variable} ${geistMono.variable} antialiased`}>
          <Navbar />
          <div className="min-h-screen mt-30">
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </ClerkProvider>

  );
}
