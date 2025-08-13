import { connectDB } from "@/lib/db";
import { UserModel } from "@/models/user.model";
import { generateOTP, transporter } from "@/utils/mailSender";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email } = await req.json();
  if (!email)
    return NextResponse.json(
      { success: false, message: "Email is required" },
      { status: 400 }
    );

  await connectDB();
  const user = await UserModel.findOne({ email });
  if (!user)
    return NextResponse.json(
      { success: false, message: "User not found" },
      { status: 404 }
    );

  const otp = generateOTP();
  const expiry = new Date(Date.now() + 10 * 60 * 1000);

  try {
    console.log("from email");
    await transporter.sendMail({
      from: `Login App <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Reset Password OTP",
      html: `<h3>Your OTP is: ${otp}</h3>`,
    });

    user.emailOtp = otp;
    user.emailOtpExpiresAt = expiry;
    await user.save();

    return NextResponse.json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch {
    return NextResponse.json(
      { success: false, message: "Failed to send OTP" },
      { status: 500 }
    );
  }
}
