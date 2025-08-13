import jwt from "jsonwebtoken";
import { NextResponse } from "next/server";

export function generateToken(user: any, message: string) {
  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  const res = NextResponse.json({
    success: true,
    message,
    userInfo: {
      name: `${user.firstName} ${user.lastName}`,
      email: user.email,
      degree: user.degree || "",
      college: user.college || "",
      branch: user.branch || "",
      passoutYear: user.passoutYear || "",
      currentYear: user.currentYear || "",
      cgpa: user.cgpa || "",
      ielts: user.ielts || "",
      employed: user.employed || "",
    },
  });
  res.cookies.set("token", token, {
    httpOnly: true,
    sameSite: "strict",
    secure: process.env.NODE_ENV === "production",
    maxAge: 24 * 60 * 60,
  });
  return res;
}
