import { prisma } from "@/lib/prisma";
import { generateOTP } from "@/lib/sendMail";
import bcrypt from "bcryptjs";
export const generateAndStoreOTP = async (userId: string) => {
  const otp = String(generateOTP()); // Generates a new OTP
  const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // Set expiry (10 mins)

  // Upsert query: update if exists, create if not

  const hashedOtp = await bcrypt.hash(otp, 10);

  await prisma.oTP.upsert({
    where: { userId },
    update: { otp: hashedOtp, expiresAt },
    create: { userId, otp: hashedOtp, expiresAt },
  });

  return otp;
};

export const verifyAndDeleteOTP = async (
  email: string,
  submittedOtp: string
) => {
  let user = await prisma.user.findFirst({ where: { email } });

  if (!user) {
    return { success: false, message: "user not found" };
  }
  // Fetch OTP record from DB
  const otpRecord = await prisma.oTP.findUnique({
    where: { userId: user.id },
  });

  if (!otpRecord) {
    return { success: false, message: "OTP not found" };
  }

  let validOtp = await bcrypt.compare(submittedOtp, otpRecord.otp);

  // Check if the submitted OTP matches and is not expired
  if (!validOtp) {
    return { success: false, message: "Incorrect OTP" };
  }

  if (new Date() > otpRecord.expiresAt) {
    return { success: false, message: "OTP expired" };
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      emailVerified: true,
      status: "active",
    },
  });

  // OTP is valid, delete it
  await prisma.oTP.delete({
    where: { userId: user.id },
  });

  return { success: true, message: "OTP verified successfully", user };
};
