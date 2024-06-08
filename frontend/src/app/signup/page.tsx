"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { z } from "zod";

import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2Icon } from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const SignUpSchema = z.object({
  username: z.string().min(3).max(20),
  email: z.string().email(),
  password: z.string().min(6),
});

type SignUpFormValues = z.infer<typeof SignUpSchema>;

const Page = () => {
  const [usernameMessage, setUsernameMessage] = useState("");
  const [isCheckingUsername, setIsCheckingUsername] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const router = useRouter();

  const form = useForm<SignUpFormValues>({
    resolver: zodResolver(SignUpSchema),
  });

  const handleCheckUsername = useCallback(async (username: string) => {
    setIsCheckingUsername(true);
    try {
      const response = await axios.get(
        "http://localhost:4000/api/auth/checkusername"
       
      );
      console.log(response)
      setUsernameMessage(response.data.data);
    } catch (error: any) {
      setUsernameMessage("Error checking username");
    } finally {
      setIsCheckingUsername(false);
    }
  }, []);
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (form.watch("username")) {
        handleCheckUsername(form.watch("username"));
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [form.watch("username"), handleCheckUsername]);

  const onSubmit: SubmitHandler<SignUpFormValues> = async (data) => {
    setIsSubmitting(true);
    try {
      await axios.post("http://localhost:4000/api/auth/signup", data);
      toast.success("Account created successfully");
      router.push(`/login`);
    } catch (error) {
      toast.error("Account creation failed");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Card className="mx-auto max-w-sm mt-24">
        <CardHeader>
          <CardTitle className="text-xl">Sign Up</CardTitle>
          <CardDescription>
            Enter your information to create an account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="Username" {...field} />
                    </FormControl>
                    {isCheckingUsername && (
                      <Loader2Icon className="animate-spin" />
                    )}
                    <p
                      className={`text-sm ${
                        usernameMessage === "Username is available"
                          ? "text-red-500 font-medium"
                          : "text-green-500"
                      }`}
                    >
                      {usernameMessage}
                    </p>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email</FormLabel>
                    <FormControl>
                      <Input placeholder="Email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Password"
                        type="password"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full mt-4"
              >
                Create an account
              </Button>
            </form>
          </Form>
          <div className="mt-4 text-center text-sm">
            Already have an account?{" "}
            <Link href="/signin" className="underline">
              Sign in
            </Link>
          </div>
        </CardContent>
      </Card>
      <Toaster />
    </>
  );
};

export default Page;
