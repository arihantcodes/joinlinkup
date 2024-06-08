"use client"
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ModeToggle } from "./ui/moon";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <div className="flex items-center justify-between px-4 py-2 md:justify-around  ">
        <Image src="/logo.svg" height={50} width={200} alt="Logo" />
        <div className="hidden md:flex font-bold space-x-8">
          <Link href="/" className="hover:text-cyan-500 transition-colors duration-300">
            HOME
          </Link>
          <Link href="/" className="hover:text-cyan-500 transition-colors duration-300">
            PRICING
          </Link>
          <Link href="/" className="hover:text-cyan-500 transition-colors duration-300">
            FEATURES
          </Link>
        </div>
        <div className="hidden md:flex items-center space-x-4">
          <Link href="/signup">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block transition-transform transform hover:scale-105">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-4 ring-1 ring-white/10">
                <span>Create Account</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </Link>
          <Link href="/login">
            <button className="bg-slate-800 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block transition-transform transform hover:scale-105">
              <span className="absolute inset-0 overflow-hidden rounded-full">
                <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
              </span>
              <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-1 px-7 ring-1 ring-white/10">
                <span>Login</span>
                <svg
                  fill="none"
                  height="16"
                  viewBox="0 0 24 24"
                  width="16"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M10.75 8.75L14.25 12L10.75 15.25"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
              <span className="absolute -bottom-0 left-[1.125rem] h-px w-[calc(100%-2.25rem)] bg-gradient-to-r from-emerald-400/0 via-emerald-400/90 to-emerald-400/0 transition-opacity duration-500 group-hover:opacity-40" />
            </button>
          </Link>
          <ModeToggle />
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu} className="focus:outline-none">
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          </button>
        </div>
      </div>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden flex flex-col items-center bg-gray-800 text-white space-y-2 py-2"
          >
            <Link href="/" className="py-2" onClick={toggleMenu}>
              HOME
            </Link>
            <Link href="/" className="py-2" onClick={toggleMenu}>
              PRICING
            </Link>
            <Link href="/" className="py-2" onClick={toggleMenu}>
              FEATURES
            </Link>
            <Link href="/signup" className="py-2" onClick={toggleMenu}>
              Create Account
            </Link>
            <Link href="/login" className="py-2" onClick={toggleMenu}>
              Login
            </Link>
            <ModeToggle />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;
