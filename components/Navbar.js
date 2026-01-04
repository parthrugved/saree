"use client";
import { useState } from "react";
import { useUser } from '@clerk/nextjs'
import Link from "next/link";
import Image from "next/image";
import "./navbar.css";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from '@clerk/nextjs';
import { toast } from 'react-hot-toast';


export default function Navbar() {
  const [open, setOpen] = useState(false);
  const { user, isLoaded, isSignedIn } = useUser();
  

  return (
    <header className="text-gray-600 body-font navbar-fixed">
      <div className="container mx-auto flex p-5 items-center justify-between relative">

        {/* LOGO */}
        <Link href="/" className="flex title-font font-medium items-center text-gray-900">
          <img
            src="/logo.png"
            alt="logo"
            width={70}
            style={{ cursor: "pointer" }}
          />
        </Link>

        {/* DESKTOP NAV */}
        <nav className="md:mr-auto md:ml-4 md:py-1 md:pl-4 md:border-l md:border-gray-400 flex-wrap items-center text-base justify-center hidden md:flex ">
          <Link href="/" className="mr-5 hover:text-gray-900">Home</Link>
          <Link href="/shop" className="mr-5 hover:text-gray-900">Shop Now</Link>
          <Link href="/about" className="mr-5 hover:text-gray-900">About Us</Link>
          <Link href="/contact" className="mr-5 hover:text-gray-900">Contact Us</Link>
          <Link href="/feedback" className="mr-5 hover:text-gray-900">Customer Feedback</Link>
          <div className="auth ml-480 fixed flex gap-4">
            <div className="flex items-center justify-center">
              <SignedIn>

                <button
                  type="button"
                  className="flex items-center justify-center gap-2 text-white bg-gradient-to-r from-purple-500 to-pink-500 hover:bg-gradient-to-l focus:ring-4 focus:outline-none focus:ring-purple-200 dark:focus:ring-purple-800 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5 w-48 h-10"
                >
                  <span>Welcome {user?.firstName ?? user?.username ?? user?.fullName}</span>
                  <UserButton />
                </button>
              </SignedIn>
            </div>
            <SignedOut>

              <SignInButton>
                <button type="button" className="w-32 h-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5">
                  Sign In
                </button>
              </SignInButton>
              <SignUpButton>
                <button type="button" className="w-32 h-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5">
                  Sign Up
                </button>
              </SignUpButton>
            </SignedOut>
            <SignedIn>

            </SignedIn>
          </div>
        </nav>

        {/* MOBILE NAV */}
        <div className="md:hidden flex items-center w-full justify-end">
          <Link
            href="/shop"
            className="text-blue-600 font-semibold absolute left-1/2 transform -translate-x-1/2"
          >
            Shop Now
          </Link>

          <button
            className="text-3xl ml-4"
            onClick={() => setOpen(true)}
          >
            ☰
          </button>
        </div>
      </div>

      {/* SLIDE MENU */}
      <div
        className={`fixed top-0 right-0 h-full w-64 bg-white shadow-xl pt-20 px-6 md:hidden z-50
    ${open ? "menu-open" : "menu-close"}`}


      >
        <button
          className="absolute top-5 right-5 text-3xl"
          onClick={() => setOpen(false)}
        >
          ×
        </button>

        <Link href="/" onClick={() => setOpen(false)} className="block py-3 text-lg">Home</Link>
        <Link href="/about" onClick={() => setOpen(false)} className="block py-3 text-lg">About Us</Link>
        <Link href="/contact" onClick={() => setOpen(false)} className="block py-3 text-lg">Contact Us</Link>
        <Link href="/feedback" onClick={() => setOpen(false)} className="block py-3 text-lg">Customer Feedback</Link>
        <div className=" mt-46">
          MANAGE YOUR ACCOUNT
          <hr className="m-0 mt-48 absolute fixed" />
        </div>


        <div className="auth ml-4 mt-5 flex flex-col fixed gap-4">
          <SignedOut>

            <SignInButton>
              <button type="button" className="w-32 h-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5">
                Sign In
              </button>
            </SignInButton>
            <SignUpButton>
              <button type="button" className="w-32 h-10 text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-md text-sm px-4 py-2.5 text-center leading-5">
                Sign Up
              </button>
            </SignUpButton>
          </SignedOut>
          <SignedIn>
            <div className="w-10 h-10 flex items-center justify-center">
              <UserButton />
            </div>
          </SignedIn>
        </div>
      </div>
    </header>
  );
}
