"use client";
import React, { useState } from "react";
import { Loader2, LogOut } from "lucide-react";
import { toast } from "sonner";

import { Button } from "./button";
import Link from "next/link";
import axios from "axios";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogout = async () => {
    setIsLoading(true);
    try {
      const data = await axios.get("/api/auth/logout");
      toast.success(data.data.message || "Logout Successful");
      router.push("/auth/login");
    } catch (err) {
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
    <div className="mt-3 flex items-center justify-around space-y-4">
      <h2 className="text-blue-400 text-3xl font-bold capitalize"> Yogesh </h2>
      <div className="space-x-3">
        <Link href="/chat">
          <Button
            className="cursor-pointer font-semibold"
            variant="outline"
            disabled={isLoading}
          >
            Chat
          </Button>
        </Link>
        <Button
          disabled={isLoading}
          className="cursor-pointer font-semibold"
          onClick={handleLogout}
        >
          {isLoading ? (
            <>
              <Loader2 className="animate-spin ml-2" />
            </>
          ) : (
            <LogOut />
          )}
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
