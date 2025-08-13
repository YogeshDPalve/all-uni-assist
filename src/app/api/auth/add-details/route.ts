import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const {
      email,
      college,
      degree,
      branch,
      passoutYear,
      currentYear,
      cgpa,
      ielts,
      employed,
    } = await req.json();
    if (
      !college ||
      !degree ||
      !branch ||
      !passoutYear ||
      !currentYear ||
      !cgpa ||
      !ielts ||
      !employed
    ) {
      return NextResponse.json(
        { success: false, message: "All fields are required" },
        { status: 400 }
      );
    }

    await connectDB();
    const user = await UserModel.findOneAndUpdate(
      { email },
      {
        college,
        degree,
        branch,
        passoutYear,
        currentYear,
        cgpa,
        ielts,
        employed,
      }
    );
    if (!user)
      return NextResponse.json(
        { success: false, message: "Data not updated" },
        { status: 400 }
      );

    return NextResponse.json({
      success: true,
      message: "Data updated successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Internal server error" },
      { status: 500 }
    );
  }
}
