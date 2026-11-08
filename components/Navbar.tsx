"use client";

import Link from "next/link";
import Image from "next/image";
import { ShoppingBag, Menu, X, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { useTheme } from "next-themes";
import { useCart } from "@/context/CartContext";
import { useSession, signOut } from "next-auth/react";

export function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const { cart, setIsCartOpen } = useCart();
  const { data: session } = useSession();

  const cartItemsCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/80 backdrop-blur-md dark:border-gray-800 dark:bg-black/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-4">
          <button
            type="button"
            className="md:hidden p-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
          <Link href="/" className="text-2xl font-serif font-bold tracking-tight text-amber-700 dark:text-amber-500">
            <div className="flex gap-2 items-center justify-center">
              <Image src="/logo.png" alt="SareeKraft Logo" width={64} height={64} className="h-16 w-auto" priority />
            </div>      
          </Link>
        </div>

        <div className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-amber-600 transition-colors">Home</Link>
          <Link href="/shop" className="hover:text-amber-600 transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-amber-600 transition-colors">About Us</Link>
          <Link href="/contact" className="hover:text-amber-600 transition-colors">Contact</Link>
          {session?.user && session.user.role === "admin" && (
            <Link href="/admin" className="text-amber-600 font-bold hover:text-amber-700 transition-colors">Admin</Link>
          )}
        </div>

        <div className="flex items-center gap-4">
          <button
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors"
          >
            <Sun className="h-5 w-5 hidden dark:block text-yellow-500" />
            <Moon className="h-5 w-5 block dark:hidden text-gray-700" />
          </button>

          {session ? (
            <div className="flex items-center gap-4">
              <span className="hidden md:inline-block text-sm text-gray-600 dark:text-gray-300">
                Hi, {session.user?.name}
              </span>
              <button onClick={() => signOut()} className="text-sm font-medium hover:text-amber-600 transition-colors">
                Logout
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link href="/login" className="text-sm font-medium hover:text-amber-600 transition-colors">
                Sign in
              </Link>
              <Link href="/signup" className="text-sm font-medium bg-amber-600 hover:bg-amber-700 text-white px-4 py-2 rounded-full transition-colors hidden sm:block">
                Sign up
              </Link>
            </div>
          )}

          <button
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full transition-colors relative"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingBag className="h-5 w-5" />
            {cartItemsCount > 0 && (
              <span className="absolute top-0 right-0 inline-flex items-center justify-center px-1.5 py-0.5 text-xs font-bold leading-none text-white transform translate-x-1/4 -translate-y-1/4 bg-amber-600 rounded-full">
                {cartItemsCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-black px-4 py-4 shadow-lg">
          <div className="flex flex-col gap-4 font-medium">
            <Link href="/shop" onClick={() => setIsMobileMenuOpen(false)}>Shop</Link>
            <Link href="/about" onClick={() => setIsMobileMenuOpen(false)}>About Us</Link>
            <Link href="/contact" onClick={() => setIsMobileMenuOpen(false)}>Contact</Link>
            {session?.user && session.user.role === "admin" && (
              <Link href="/admin" className="text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>Admin</Link>
            )}
            {!session && (
              <>
                <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>Sign in</Link>
                <Link href="/signup" className="text-amber-600" onClick={() => setIsMobileMenuOpen(false)}>Sign up</Link>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}