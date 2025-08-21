"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function Navbar() {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [token, setToken] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const User_Data = localStorage.getItem("User");
    const token_ = localStorage.getItem("token");
    if (User_Data && token_) {
      const parsedUser = JSON.parse(User_Data);
      setIsAdmin(parsedUser.isAdmin);
      setToken(token_);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("User");
    setIsOpen(false);
    setToken(null);
    router.push("/login");
  };

  return (
    <nav className="bg-[#17203D] shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-16">

          {/* Logo */}
          <div className="text-2xl font-extrabold text-[#6552D0] tracking-wide">
            <Link href="/">Machine Test</Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6 text-white font-medium">
            <Link href="/" className="hover:text-[#6552D0] transition">
              Home
            </Link>

            {!token && (
              <Link href="/login" className="hover:text-[#6552D0] transition">
                Login
              </Link>
            )}

            {token && (
              <Link href="/agents" className="hover:text-[#6552D0] transition">
                Agents
              </Link>
            )}

            {isAdmin && (
              <Link
                href="/list-management"
                className="hover:text-[#6552D0] transition"
              >
                List Management
              </Link>
            )}

            {!token ? (
              <Link
                href="/signup"
                className="bg-[#6552D0] px-5 py-2 rounded-lg shadow hover:bg-[#4f3cb0] transition"
              >
                Sign Up
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-lg border border-[#6552D0] text-[#6552D0] hover:bg-[#6552D0] hover:text-white transition"
              >
                Logout
              </button>
            )}
          </div>

          {/* Mobile Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white focus:outline-none"
            >
              {isOpen ? (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              ) : (
                <svg
                  className="w-7 h-7"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-[#17203D] shadow-lg px-6 pb-4 space-y-3 text-white font-medium">
          <Link
            href="/"
            className="block hover:text-[#6552D0] transition"
            onClick={() => setIsOpen(false)}
          >
            Home
          </Link>

          {!token && (
            <Link
              href="/login"
              className="block hover:text-[#6552D0] transition"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
          )}

          {token && (
            <button
              onClick={handleLogout}
              className="block text-left w-full hover:text-[#6552D0] transition"
            >
              Logout
            </button>
          )}

          {token && (
            <Link
              href="/agents"
              className="block hover:text-[#6552D0] transition"
              onClick={() => setIsOpen(false)}
            >
              Agents
            </Link>
          )}

          {!token && (
            <Link
              href="/signup"
              className="block bg-[#6552D0] px-5 py-2 rounded-lg shadow hover:bg-[#4f3cb0] transition"
              onClick={() => setIsOpen(false)}
            >
              Sign Up
            </Link>
          )}

          {isAdmin && (
            <Link
              href="/list-management"
              className="block hover:text-[#6552D0] transition"
              onClick={() => setIsOpen(false)}
            >
              List Management
            </Link>
          )}
        </div>
      )}
    </nav>
  );
}
