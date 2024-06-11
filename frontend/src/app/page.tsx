"use client";
import { ModeToggle } from "@/components/ui/moon";
import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { HeroHighlightDemo } from "@/components/herotext";
import { Input } from "@/components/ui/input";

import { Controller, useForm, useWatch } from "react-hook-form";
import axios from "axios";
import { Loader2Icon } from "lucide-react";
import Navbar from "@/components/small";

const Page = () => {
  const initialValue = "joinlinkup/";
  const { control, handleSubmit } = useForm({ defaultValues: { username: '' } });
  const [inputValue, setInputValue] = useState(initialValue);
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value;
    if (newValue.startsWith(initialValue)) {
      setInputValue(newValue);
    }
  };

  const handleCheckUsername = useCallback(async (username: string) => {
    const actualUsername = username.replace(initialValue, '');
    setIsCheckingUsername(true);
    try {
      const response = await axios.get(
        `http://localhost:4000/api/auth/checkusername?username=${actualUsername}`
      );
      setUsernameMessage(response.data.data);
      console.log(response);
    } catch (error: any) {
      setUsernameMessage(error.response.data.data);
      console.log(error);
    } finally {
      setIsCheckingUsername(false);
    }
  }, []);

  const username = useWatch({
    control,
    name: "username",
  });

  useEffect(() => {
    if (!username) return;

    const delayDebounceFn = setTimeout(() => {
      handleCheckUsername(username);
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [username, handleCheckUsername]);

  const onSubmit = async (data: any) => {
    setIsSubmitting(true);
    const usernameAfterJoinlinkup = data.username.replace(initialValue, '');
    try {
      const response = await axios.post('http://localhost:4000/api/submit', { username: usernameAfterJoinlinkup });
      console.log(response);
    } catch (error: any) {
      console.log(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-[50rem] w-full dark:bg-black dark:bg-grid-white/[0.05] bg-grid-black/[0.07] relative">
      <Navbar/>
      <div className="flex flex-col md:flex-row justify-evenly items-center mt-12 md:mt-2 px-4">
        <div className="flex flex-col mb-0 w-full md:w-auto">
          <HeroHighlightDemo />
          <div className="flex flex-col md:flex-col justify-center items-center mt-4">
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col md:flex-row justify-center items-center mt-4 gap-3">
              <Controller
                name="username"
                control={control}
                render={({ field }) => (
                  <Input
                    {...field}
                    id="joinLinkUpInput"
                    type="text"
                    className="w-full md:w-80 h-12 font-semibold text-lg rounded-lg mb-4 md:mb-0"
                    value={inputValue}
                    onChange={(e) => {
                      field.onChange(e);
                      handleChange(e);
                    }}
                  />
                )}
              />
              {
                inputValue === "joinlinkup/" ? (
                  <Button disabled>Claim your Linkup page</Button>
                ) : (
                  <Button type="submit" disabled={isSubmitting}>Get Started</Button>
                )
              }
            </form>
            <div className="mt-5">
              {isCheckingUsername && <Loader2Icon className="animate-spin" />}
              <p className={`text-lg flex flex-col ${usernameMessage === "Username is available" ? "text-green-600 font-medium text-lg" : "text-red-700"}`}>
                {usernameMessage}
              </p>
            </div>
          </div>
        </div>
        <div className="mt-8 md:mt-0">
          <Image src="char.svg" height={400} width={400} alt="" />
        </div>
      </div>
    </div>
  );
};

export default Page;
