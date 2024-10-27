import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
const JWT_SECRET = process.env.JWT_SECRET as string;
import jwt from "jsonwebtoken";
import { verifyAndDeleteOTP } from "@/services/verify";

export async function POST(req: NextRequest) {
  const { email, otp } = await req.json();

  try {
    let { success, user, message } = await verifyAndDeleteOTP(email, otp);

    if (!success || !user) {
      return NextResponse.json({ error: message }, { status: 400 });
    }

    const { password: pass, ...data } = user;
    // Set the session token in the cookie
    const response = NextResponse.json(
      { message: "Email verified successfully!", user: data },
      { status: 200 }
    );

    response.cookies.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(">>", error);
    return NextResponse.json(
      { error: "Email verification failed" },
      { status: 500 }
    );
  }
}
