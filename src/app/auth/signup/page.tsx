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
import Link from "next/link";
import PageTitle from "@/components/PageTitle";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import axios from "axios";

const RegisterPage = () => {
  const router = useRouter();

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (e: any) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const registerUser: any = await axios.post("/api/auth/signup", formData);
      // console.log(registerUser);
      toast.success(registerUser.data.message || "Registration Successful");
      localStorage.setItem(
        "userData",
        JSON.stringify({ name: formData.email })
      );

      router.push(`/auth/edu-details?email=${formData.email}`);
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
      <PageTitle title={"Register"} />
      <div className="w-full max-w-xl">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Register</CardTitle>
              <CardDescription>
                Enter your details below for registration.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-3" onSubmit={handleRegistration}>
                <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="firstName">First Name</Label>
                    <Input
                      name="firstName"
                      type="text"
                      placeholder="John"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="grid gap-2">
                    <Label htmlFor="lastName">Last Name</Label>
                    <Input
                      name="lastName"
                      type="text"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    name="email"
                    type="email"
                    placeholder="john@doe.com"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="password">Password</Label>
                  <Input
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    placeholder="****"
                    onChange={handleChange}
                  />
                </div>

                <Button
                  type="submit"
                  className="w-full md:col-span-2"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4" /> Please Wait
                    </>
                  ) : (
                    "Register"
                  )}
                </Button>

                <div className="mt-4 text-center text-sm">
                  Already have an account?
                  <Link href="/auth/login" className="font-semibold">
                    Sign in
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

export default RegisterPage;
