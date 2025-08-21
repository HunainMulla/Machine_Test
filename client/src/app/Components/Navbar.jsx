"use client";

import { useState,useEffect } from "react";
import Link from "next/link";

export default function Navbar() {

  useEffect(() => {
      const token = localStorage.getItem("token");
      if (token) {
        const parsedToken = JSON.parse(token);
        setIsAdmin(parsedToken.isAdmin);
        setToken(token);
      }
      else {
      }
  }, []);

  const[isAdmin,setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const[token,setToken] = useState(null);

  return (
    <nav className="bg-[#17203D] sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="text-2xl font-extrabold text-[#6552D0] tracking-wide">
            <Link href="/">Machine Test</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 text-white font-medium">
            <Link href="/" className="hover:text-[#6552D0] transition">
              Home
            </Link>
          {!token &&  <Link href="/login" className="hover:text-[#6552D0] transition">
              Login
            </Link>}
            {isAdmin && <Link href="/login" className="hover:text-[#6552D0] transition">
              Agents
            </Link>}
            {isAdmin && <Link href="/login" className="hover:text-[#6552D0] transition">
              List Management
            </Link>}

            {!token && <Link
              href="/signup"
              className="bg-[#6552D0] px-5 py-2 rounded-lg shadow hover:bg-[#4f3cb0] transition"
            >
              Sign Up
            </Link>}
            {token && <Link href="/login" className="hover:text-[#6552D0] transition">
              Logout
            </Link>}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              <svg
                className="w-7 h-7"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                {isOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#17203D] px-6 pb-4 space-y-3 text-white font-medium">
          <Link
            href="/"
            className="block hover:text-[#6552D0] transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>
     {!token &&       <Link
            href="/login"
            className="block hover:text-[#6552D0] transition"
            onClick={() => setIsOpen(false)}
          >
            Login
          </Link>}
          {!token && <Link
            href="/signup"
            className="block bg-[#6552D0] px-5 py-2 rounded-lg shadow hover:bg-[#4f3cb0] transition"
            onClick={() => setIsOpen(false)}
          >
            Sign Up
          </Link>}
        </div>
      )}
    </nav>
  );
}
