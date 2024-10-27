import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const sessionId = req.cookies.get("session")?.value;

  if (!sessionId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 400 });
  }

  // Set user offline
  await prisma.user.update({
    where: { id: sessionId },
    data: {
      isOnline: false,
      lastSeen: new Date(),
    },
  });

  const response = NextResponse.json({ message: "Logout successful" });
  response.cookies.set("session", "", {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    maxAge: -1,
    sameSite: "strict",
    path: "/",
  });

  return response;
}
