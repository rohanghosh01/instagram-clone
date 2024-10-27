import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import bcrypt from "bcryptjs";
import { NextApiResponse } from "next";

export async function POST(req: NextRequest, res: NextApiResponse) {
  const { username = "", password = "" } = await req.json();

  try {
    const user = await prisma.user.findFirst({
      where: {
        OR: [{ email: username }, { username: username }],
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    if (!user?.emailVerified) {
      return NextResponse.json(
        { error: "Email not verified", email: user.email },
        { status: 401, statusText: "email_not_verified" }
      );
    }

    let checkPassword = await bcrypt.compare(password, user.password);

    if (!checkPassword) {
      return NextResponse.json({ error: "Invalid password" }, { status: 401 });
    }

    const { password: pass, ...data } = user;

    const response = NextResponse.json({
      message: "Login successful",
      user: data,
    });
    response.cookies.set("session", user.id, {
      httpOnly: true,
      secure: process.env.NODE_ENV !== "development",
      maxAge: 60 * 60 * 24 * 7, // 1 week
      sameSite: "strict",
      path: "/",
    });

    return response;
  } catch (error) {
    console.log(error);
    return NextResponse.json({ error: "Login failed" }, { status: 500 });
  }
}
