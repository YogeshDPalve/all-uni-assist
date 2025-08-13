import { NextResponse } from "next/server";

export async function GET() {
  const res = NextResponse.json({
    success: true,
    message: "Logged out successfully",
  });

  res.cookies.delete("token");

  return res;
}
