export interface IUser {
  firstName: string;
  lastName: string;
  email: string;
  emailOtp?: string;
  emailOtpExpiresAt?: Date;
  password: string;
  college?: string;
  degree?: string;
  branch?: string;
  passoutYear?: string;
  currentYear?: string;
  cgpa?: string;
  ielts?: string;
  employed?: string;
}
