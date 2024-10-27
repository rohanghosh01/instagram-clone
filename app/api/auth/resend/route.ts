import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SendEmail } from "@/lib/sendMail";
import { generateAndStoreOTP } from "@/services/verify";

export async function POST(req: Request) {
  const { email } = await req.json();

  try {
    // Check for existing user with the same email
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: email }, { username: email }],
      },
    });

    if (!user) {
      return NextResponse.json({ error: "user not exists" }, { status: 400 });
    }

    // Generate OTP
    const otp = await generateAndStoreOTP(user.id);

    // Store OTP in a cookie
    const response = NextResponse.json(
      {
        message: "Resend otp successful. Please check your email for the OTP.",
      },
      { status: 200 }
    );

    // Send OTP email
    await SendEmail({
      email: user.email,
      confirmationCode: otp,
      recipientName: user.name,
      subject: `${otp} is your Instagram code`,
    });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Resend otp failed" }, { status: 500 });
  }
}
