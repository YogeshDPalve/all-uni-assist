import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { authMiddleware } from "@/lib/auth-middleware";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const userId = await authMiddleware();
    const user = await UserModel.findById(userId).select("-password");
    if (!user)
      return NextResponse.json(
        { success: false, message: "User not found" },
        { status: 404 }
      );

    return NextResponse.json({
      success: true,
      message: "Student details fetched",
      user,
    });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 401 }
    );
  }
}
