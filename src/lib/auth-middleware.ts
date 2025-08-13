// lib/authMiddleware.ts
import jwt from "jsonwebtoken";
import { cookies } from "next/headers";
import { UserModel } from "../models/user.model";
import { connectDB } from "./db";

export async function authMiddleware() {
  // Ensure DB connection
  await connectDB();

  // ✅ Await cookies() in Next.js 14+
  const cookieStore = await cookies();
  const token = cookieStore.get("token")?.value;

  if (!token) {
    throw new Error("Token not exists");
  }

  // Verify JWT
  let decoded: { userId: string };
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!) as { userId: string };
  } catch (err) {
    throw new Error("Invalid or expired token");
  }

  // Check user existence
  const user = await UserModel.findById(decoded.userId);
  if (!user) {
    throw new Error("User not found");
  }

  return decoded.userId; // ✅ Return userId for API routes
}
