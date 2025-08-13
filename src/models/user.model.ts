import { IUser } from "@/types";
import { Schema, model, models } from "mongoose";

const userSchema = new Schema<IUser>(
  {
    firstName: { required: true, type: String },
    lastName: { required: true, type: String },
    email: { required: true, unique: true, type: String },
    emailOtp: String,
    degree: String,
    college: String,
    branch: String,
    passoutYear: String,
    currentYear: String,
    cgpa: String,
    ielts: String,
    employed: String,
    emailOtpExpiresAt: Date,
    password: { required: true, type: String },
  },
  { timestamps: true }
);

export const UserModel = models.User || model<IUser>("User", userSchema);
