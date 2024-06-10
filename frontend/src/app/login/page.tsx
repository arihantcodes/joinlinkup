"use client";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import axios from "axios";
import { useRef } from "react";
import { useRouter } from "next/navigation";
const LoginForm = () => {
  const email = useRef<HTMLInputElement>(null);
  const password = useRef<HTMLInputElement>(null);
  const router = useRouter()
  const loginUser = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email.current && password.current) {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/auth/signin",
          {
            email: email.current.value,
            password: password.current.value,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        router.push(`/dashboard`)
        console.log("Logged in successfully", response.data);
      } catch (error) {
        console.log("Error while logging in", error);
      }
    }
  };

  return (
    <Card className="mx-auto max-w-sm mt-12 md:mt-32">
      <CardHeader>
        <CardTitle className="text-2xl">Login</CardTitle>
        <CardDescription>
          Enter your email below to login to your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={loginUser}>
          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                ref={email}
              />
            </div>
            <div className="grid gap-2">
              <div className="flex items-center">
                <Label htmlFor="password">Password</Label>
                <Link href="#" className="ml-auto inline-block text-sm underline">
                  Forgot your password?
                </Link>
              </div>
              <Input id="password" type="password" required ref={password} />
            </div>
            <Button type="submit" className="w-full">
              Login
            </Button>
            <Button variant="outline" className="w-full">
              Login with Google
            </Button>
          </div>
          <div className="mt-4 text-center text-sm">
            Don&apos;t have an account?{" "}
            <Link href="#" className="underline">
              Sign up
            </Link>
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
