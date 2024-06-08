"use client";
import { ModeToggle } from "@/components/ui/moon";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHighlightDemo } from "@/components/herotext";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/cn";
import { Spotlight } from "@/components/sunlight";

const page = () => {
  const initialValue = "joinlinkup/";
  const [inputValue, setInputValue] = useState(initialValue);

  const handleChange = (event: any) => {
    const newValue = event.target.value;
    if (newValue.startsWith(initialValue)) {
      setInputValue(newValue);
    }
  };
  return (
    <div className="h-[50rem] w-full dark:bg-black dark:bg-grid-white/[0.05] bg-grid-black/[0.07] relative">
  <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="white" />

  <div className="flex flex-col md:flex-row justify-evenly items-center mt-12 md:mt-2 px-4">
    <div className="flex flex-col mb-0 w-full md:w-auto">
      <HeroHighlightDemo />
      <div className="flex flex-col md:flex-row justify-center items-center mt-4">
        <Input
          id="joinLinkUpInput"
          type="text"
          className="w-full md:w-80 h-12 font-semibold text-lg rounded-lg mb-4 md:mb-0"
          value={inputValue}
          onChange={handleChange}
        />
        <button className="bg-slate-800 ml-0 md:ml-4 no-underline group cursor-pointer relative shadow-2xl shadow-zinc-900 rounded-full p-px text-xs font-semibold leading-6 text-white inline-block">
          <span className="absolute inset-0 overflow-hidden rounded-full">
            <span className="absolute inset-0 rounded-full bg-[image:radial-gradient(75%_100%_at_50%_0%,rgba(56,189,248,0.6)_0%,rgba(56,189,248,0)_75%)] opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
          </span>
          <div className="relative flex space-x-2 items-center z-10 rounded-full bg-zinc-950 py-2 px-4 ring-1 ring-white/10">
            <span>Claim Your Linkup Page</span>
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
      </div>
    </div>
    <div className="mt-8 md:mt-0">
      <Image src="char.svg" height={400} width={400} alt="" />
    </div>
  </div>
</div>

  );
};

export default page;
