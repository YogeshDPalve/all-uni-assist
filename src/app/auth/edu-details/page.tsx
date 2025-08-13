"use client";
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
import { Suspense, useState } from "react";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

export default function EduDetailsWrapper() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <EduDetails />
    </Suspense>
  );
}

const EduDetails = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState({
    college: "",
    degree: "",
    branch: "",
    passoutYear: "",
    currentYear: "",
    cgpa: "",
    ielts: "",
    employed: "",
  });

  const email = searchParams.get("email");
  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  const [isLoading, setIsLoading] = useState(false);

  const handleRegistration = async (e: any) => {
    setIsLoading(true);
    try {
      e.preventDefault();
      console.log({ ...formData });
      const registerData: any = await axios.post("/api/auth/add-details", {
        ...formData,
        email,
      });
      console.log(registerData);
      toast.success(registerData?.data.message || "Data saved Successfully");
      setFormData({
        college: "",
        degree: "",
        branch: "",
        passoutYear: "",
        currentYear: "",
        cgpa: "",
        ielts: "",
        employed: "",
      });
      router.push("/auth/login");
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
      <PageTitle title={"Personal Details"} />
      <div className="w-full max-w-xl">
        <div className="flex flex-col gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl">Additional Details</CardTitle>
              <CardDescription>
                Enter your additional details below.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form className="space-y-3">
                <div className=" grid md:grid-cols-2 grid-cols-1 gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="text">College/University Name</Label>
                    <Input
                      name="college"
                      type="text"
                      placeholder="IIT Delhi"
                      required
                      value={formData.college}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">Degree</Label>
                    <Input
                      name="degree"
                      type="text"
                      placeholder="B.Tech"
                      required
                      value={formData.degree}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">Major</Label>
                    <Input
                      name="branch"
                      type="text"
                      placeholder="computer science"
                      required
                      value={formData.branch}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">Passout Year</Label>
                    <Input
                      name="passoutYear"
                      type="text"
                      placeholder="2025"
                      required
                      value={formData.passoutYear}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">Current Year</Label>
                    <Input
                      name="currentYear"
                      type="text"
                      placeholder="Third Year/ Passout"
                      required
                      value={formData.currentYear}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">CGPA</Label>
                    <Input
                      name="cgpa"
                      type="text"
                      placeholder="9.5"
                      required
                      value={formData.cgpa}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">
                      IELTS Score <span className="font-light">(optional)</span>
                    </Label>
                    <Input
                      name="ielts"
                      type="text"
                      placeholder="8.5"
                      required
                      value={formData.ielts}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="text">Employed</Label>
                    <Input
                      name="employed"
                      type="text"
                      placeholder="Yes"
                      required
                      value={formData.employed}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  className="w-full md:col-span-2 cursor-pointer mt-4"
                  disabled={isLoading}
                  onClick={handleRegistration}
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="animate-spin w-4 h-4 " />
                    </>
                  ) : (
                    "Save"
                  )}
                </Button>

                <div className=" text-center text-sm">
                  <Link href="/auth/login" className="">
                    <Button variant={"link"} className="cursor-pointer">
                      Skip
                    </Button>
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
