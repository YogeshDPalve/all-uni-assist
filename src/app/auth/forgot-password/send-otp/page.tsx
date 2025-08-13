"use client";
import React, { useState } from "react";
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
import PageTitle from "@/components/PageTitle";

import { Loader2 } from "lucide-react";
import { toast } from "sonner";

import Link from "next/link";
import { useRouter } from "next/navigation";
import axios from "axios";

const SendOtp = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const handleSentOtp = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const User: any = await axios.post("/api/auth/forgot-password", {
        email,
      });
      console.log(User);
      toast.success(User.data.message || "Otp send on registered email");

      router.push(`/auth/reset-password?email=${email}`);
    } catch (err: any) {
      toast.error(
        err.response.data.message ||
          err?.response?.data?.errors?.[0]?.msg ||
          "Something went wrong"
      );
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-svh w-full items-center justify-center p-6 md:p-10">
      <PageTitle title={"Reset Password"} />
      <div className="w-full max-w-sm">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Forget Password</CardTitle>
              <CardDescription>
                Enter the email below to send otp
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSentOtp}>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <div className="flex items-center">
                      <Label htmlFor="number">Enter emaild</Label>
                    </div>
                    <Input
                      name="email"
                      type="email"
                      placeholder="john@email.com"
                      required
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>

                  <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? (
                      <>
                        <Loader2 className="animate-spin" />
                      </>
                    ) : (
                      "Send OTP"
                    )}
                  </Button>
                </div>
                <div className="mt-4 text-center text-sm">
                  <Link href="/auth/login">
                    <Button variant="link">Back to login</Button>
                  </Link>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SendOtp;
