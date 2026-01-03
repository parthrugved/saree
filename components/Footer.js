import React from "react";
import "./footer.css";
import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 pt-10 pb-6 mt-16 relative overflow-hidden">
      
      <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-pink-500 to-yellow-400"></div>


      <div className="absolute -top-16 -right-16 w-40 h-40 bg-pink-600 opacity-10 blur-3xl rounded-full"></div>
      <div className="absolute -bottom-16 -left-16 w-40 h-40 bg-yellow-400 opacity-10 blur-3xl rounded-full"></div>

      <div className="container mx-auto px-5 text-center relative z-10">
        <Link href="/">
        <img
          className="logo opacity-90 hover:opacity-100 transition duration-300 mx-auto"
          src="/logo-dark.png"
          alt="SareeKraft Logo"
        /></Link>

        <br />

        <p className="text-sm text-gray-400 mb-6 italic tracking-wide drop-shadow-md">
          Where tradition meets elegance ✨
        </p>

        <div className="flex justify-center flex-wrap gap-6 text-sm mb-6">
          <Link href="/" className="f-link hover:text-white">Home</Link>
          <Link href="/shop" className="f-link hover:text-white">Shop</Link>
          <Link href="/about" className="f-link hover:text-white">About</Link>
          <Link href="/feedback" className="f-link hover:text-white">Feedback</Link>
          <Link href="/contact" className="f-link hover:text-white">Contact</Link>
        </div>

        <p className="text-gray-500 text-xs tracking-wide">
          © {new Date().getFullYear()} SareeKraft — Crafted with ❤️ in India.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
