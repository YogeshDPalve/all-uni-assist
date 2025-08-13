import bcrypt from "bcryptjs";
import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { generateToken } from "@/utils/generateToken";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, password } = await req.json();
  if (!email || !password)
    return NextResponse.json(
      { success: false, message: "All fields required" },
      { status: 400 }
    );

  await connectDB();
  const user = await UserModel.findOne({ email });
  if (!user)
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch)
    return NextResponse.json(
      { success: false, message: "Invalid credentials" },
      { status: 400 }
    );

  return generateToken(user, `Welcome back ${user.firstName}`);
}
