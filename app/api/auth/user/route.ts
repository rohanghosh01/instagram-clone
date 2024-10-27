import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import cookie from "cookie"; // You might need to install this package

export async function GET(req: NextRequest) {
  // Parse cookies to get userId
  const cookies = cookie.parse(req.headers.get("cookie") || "");
  const userId = cookies.session; // Adjust this key based on your actual cookie key

  if (!userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    // Fetch posts with limit, offset, search, sort, and user info
    const result = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!result) {
      return NextResponse.json(
        { error: "Invalid credentials" },
        { status: 401 }
      );
    }

    const { password, ...data } = result;

    return NextResponse.json({ result: data }, { status: 200 });
  } catch (error) {
    console.error("Error GET posts:", error);
    return NextResponse.json({ error: "Failed to GET posts" }, { status: 500 });
  }
}
